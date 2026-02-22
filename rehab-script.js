/**
 * Rehab Centers Script
 * Handles dynamic content loading, URL parsing, and functionality
 * Includes modal functionality for contact form
 */

// Global function to get URL parameters
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Get center data by slug or ID
function getCenterBySlug(slug) {
    if (!slug) return rehabCentersData[0];
    return rehabCentersData.find(center => center.slug === slug) || rehabCentersData[0];
}

function getCenterById(id) {
    if (!id) return rehabCentersData[0];
    return rehabCentersData.find(center => center.id === parseInt(id)) || rehabCentersData[0];
}

// =========================================
// MODAL FUNCTIONALITY
// =========================================

/**
 * Open the contact modal with center information
 * @param {string} slug - The center slug
 */
function openContactModal(slug) {
    const modal = document.getElementById('contactModal');
    const centerNameEl = document.getElementById('modalCenterName');
    const centerSlugInput = document.getElementById('modalCenterSlug');
    const form = document.getElementById('modalContactForm');
    const successEl = document.getElementById('modalSuccess');

    // Get center data
    const center = getCenterBySlug(slug);

    // Set center name in modal
    centerNameEl.textContent = center.name;
    centerSlugInput.value = center.slug;

    // Reset form and hide success message
    form.reset();
    form.classList.remove('hidden');
    successEl.classList.remove('active');

    // Show modal with animation
    modal.classList.add('active');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

/**
 * Close the contact modal
 */
function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.remove('active');

    // Restore body scroll
    document.body.style.overflow = '';
}

/**
 * Handle modal form submission
 * @param {Event} event - Form submit event
 */
function handleModalFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const centerSlug = document.getElementById('modalCenterSlug').value;
    const center = getCenterBySlug(centerSlug);

    // Get form values
    const name = document.getElementById('modalName').value;
    const phone = document.getElementById('modalPhone').value;
    const email = document.getElementById('modalEmail').value;
    const message = document.getElementById('modalMessage').value;

    // Simple validation
    if (!name || !phone || !email) {
        alert('Please fill in all required fields.');
        return;
    }

    // Hide form, show success message
    form.classList.add('hidden');
    const successEl = document.getElementById('modalSuccess');
    successEl.classList.add('active');

    // Log the submission (in real app, this would send to server)
    console.log('Form submitted for center:', center.name);
    console.log('Form data:', { name, phone, email, message });

    // Note: In a real application, you would send this data to a server
    // For demo purposes, we just show the success message
}

// Initialize modal event listeners
function initializeModal() {
    const modal = document.getElementById('contactModal');
    const closeBtn = document.getElementById('modalClose');
    const successCloseBtn = document.getElementById('successClose');
    const form = document.getElementById('modalContactForm');

    // Close modal when clicking close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeContactModal);
    }

    // Close modal when clicking success close button
    if (successCloseBtn) {
        successCloseBtn.addEventListener('click', closeContactModal);
    }

    // Close modal when clicking overlay
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeContactModal();
            }
        });
    }

    // Close modal when pressing Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeContactModal();
        }
    });

    // Handle form submission
    if (form) {
        form.addEventListener('submit', handleModalFormSubmit);
    }
}

// =========================================
// CARD GENERATION
// =========================================

/**
 * Handle View Details button click
 * @param {string} slug - The center slug
 */
function handleViewDetails(slug) {
    // Redirect to details page with center slug
    window.location.href = `rehab-details.html?center=${slug}`;
}

/**
 * Handle Contact Center button click
 * @param {string} slug - The center slug
 */
function handleContactCenter(slug) {
    openContactModal(slug);
}

// Load center cards on main listing page
function loadRehabCards() {
    const container = document.getElementById('rehab-cards-container');
    if (!container) return;

    let html = '';
    rehabCentersData.forEach(center => {
        html += createRehabCardHTML(center);
    });
    container.innerHTML = html;
}

/**
 * Create HTML for a single rehab center card
 * @param {Object} center - The center data object
 * @returns {string} - HTML string for the card
 */
function createRehabCardHTML(center) {
    return `
        <article class="rehab-full-card" data-id="${center.id}" data-name="${center.name}" data-slug="${center.slug}" data-city="${center.city}" data-location="${center.location}">
            <div class="rehab-card-img" style="background-image: url('${center.images.card}');" role="img" aria-label="${center.name} - ${center.location}"></div>
            <div class="rehab-card-info">
                <span class="location-tag">${center.location}</span>
                <h2>${center.name}</h2>
                <p>${center.description}</p>
                <div class="facility-pills">
                    ${center.programs.slice(0, 4).map(p => `<span class="f-pill">${p.title.split(' ')[0]}</span>`).join('')}
                </div>
                <div class="card-buttons">
                    <button type="button" class="btn-inquire" onclick="handleContactCenter('${center.slug}')" aria-label="Contact ${center.name}">
                        Contact Center
                    </button>
                    <button type="button" class="btn-details" onclick="handleViewDetails('${center.slug}')" aria-label="View details of ${center.name}">
                        View Details
                    </button>
                </div>
            </div>
        </article>
    `;
}

// =========================================
// FILTER FUNCTIONALITY
// =========================================

/**
 * Filter rehab centers based on selected criteria
 * Checks both city and treatment type filters
 */
function filterRehabCenters() {
    const container = document.getElementById('rehab-cards-container');
    const noResultsMessage = document.getElementById('noResultsMessage');

    // Get filter values
    const cityFilter = document.getElementById('cityFilter');
    const treatmentFilter = document.getElementById('treatmentFilter');

    const selectedCity = cityFilter ? cityFilter.value : '';
    const selectedTreatment = treatmentFilter ? treatmentFilter.value : '';

    // Filter the centers based on criteria
    let filteredCenters = rehabCentersData;

    // Filter by city if selected
    if (selectedCity) {
        filteredCenters = filteredCenters.filter(center => {
            // Match by city or location (case-insensitive)
            const cityMatch = center.city && center.city.toLowerCase() === selectedCity.toLowerCase();
            const locationMatch = center.location && center.location.toLowerCase().includes(selectedCity.toLowerCase());
            return cityMatch || locationMatch;
        });
    }

    // Filter by treatment type if selected
    if (selectedTreatment) {
        filteredCenters = filteredCenters.filter(center => {
            // Check if any program matches the treatment type
            const programMatch = center.programs && center.programs.some(program =>
                program.title && program.title.toLowerCase().includes(selectedTreatment.toLowerCase())
            );

            // Check facility tags as well
            const facilityMatch = center.programs && center.programs.some(program => {
                // Check title and description for treatment type keywords
                const titleMatch = program.title && program.title.toLowerCase().includes(selectedTreatment.toLowerCase());
                const descMatch = program.description && program.description.toLowerCase().includes(selectedTreatment.toLowerCase());
                return titleMatch || descMatch;
            });

            return programMatch || facilityMatch;
        });
    }

    // Render filtered results or show no results message
    if (filteredCenters.length > 0) {
        // Hide no results message
        if (noResultsMessage) {
            noResultsMessage.style.display = 'none';
        }

        // Show filtered cards
        let html = '';
        filteredCenters.forEach(center => {
            html += createRehabCardHTML(center);
        });
        container.innerHTML = html;
    } else {
        // Show no results message
        if (noResultsMessage) {
            noResultsMessage.style.display = 'block';
        }
        // Clear container
        container.innerHTML = '';
    }
}

/**
 * Reset all filters and show all rehab centers
 */
function resetFilters() {
    const cityFilter = document.getElementById('cityFilter');
    const treatmentFilter = document.getElementById('treatmentFilter');
    const noResultsMessage = document.getElementById('noResultsMessage');
    const container = document.getElementById('rehab-cards-container');

    // Clear dropdown selections
    if (cityFilter) {
        cityFilter.value = '';
    }
    if (treatmentFilter) {
        treatmentFilter.value = '';
    }

    // Hide no results message
    if (noResultsMessage) {
        noResultsMessage.style.display = 'none';
    }

    // Show all centers
    let html = '';
    rehabCentersData.forEach(center => {
        html += createRehabCardHTML(center);
    });
    container.innerHTML = html;
}

/**
 * Initialize filter event listeners
 */
function initializeFilters() {
    const searchBtn = document.getElementById('searchBtn');
    const resetBtn = document.getElementById('resetBtn');

    // Search button click handler
    if (searchBtn) {
        searchBtn.addEventListener('click', filterRehabCenters);
    }

    // Reset button click handler
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }

    // Optional: Allow pressing Enter in dropdowns to trigger search
    const cityFilter = document.getElementById('cityFilter');
    const treatmentFilter = document.getElementById('treatmentFilter');

    if (cityFilter) {
        cityFilter.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                filterRehabCenters();
            }
        });
    }

    if (treatmentFilter) {
        treatmentFilter.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                filterRehabCenters();
            }
        });
    }
}

// Load center details on rehab-details.html
function loadCenterDetails() {
    const slug = getUrlParameter('center');
    const center = getCenterBySlug(slug);

    // Update page title
    document.title = center.seo.title;

    // Update meta tags
    updateMetaTags(center.seo.title, center.seo.description, center.seo.keywords);

    // Load hero section
    const heroSection = document.getElementById('hero-section');
    if (heroSection) {
        heroSection.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${center.images.hero}')`;
    }

    // Load center name and details
    const centerName = document.getElementById('center-name');
    if (centerName) centerName.textContent = center.name;

    const centerLocation = document.getElementById('center-location');
    if (centerLocation) centerLocation.textContent = center.location;

    const centerDescription = document.getElementById('center-description');
    if (centerDescription) centerDescription.textContent = center.fullDescription;

    // Load highlights
    const highlights = document.getElementById('highlights');
    if (highlights) {
        highlights.innerHTML = `
            <div class="highlight-card">
                <i class="fas fa-star"></i>
                <h4>Rating</h4>
                <p>${center.rating} / 5</p>
            </div>
            <div class="highlight-card">
                <i class="fas fa-check-circle"></i>
                <h4>Verified</h4>
                <p>${center.verified ? 'Yes' : 'No'}</p>
            </div>
            <div class="highlight-card">
                <i class="fas fa-rupee-sign"></i>
                <h4>Price Range</h4>
                <p>${center.priceRange}</p>
            </div>
        `;
    }

    // Load gallery
    const gallery = document.getElementById('gallery-grid');
    if (gallery && center.images.gallery) {
        gallery.innerHTML = center.images.gallery.map(img =>
            `<div class="gallery-item"><img src="${img}" alt="${center.name} - Gallery Image" loading="lazy"></div>`
        ).join('');
    }

    // Update navigation links with center slug
    updateNavigationLinks(center.slug);
}

// Load programs on rehab-programs.html
function loadPrograms() {
    const slug = getUrlParameter('center');
    const center = getCenterBySlug(slug);

    // Update SEO
    document.title = `${center.name} - Programs | RehabCare`;
    updateMetaTags(
        `${center.name} Treatment Programs`,
        `View treatment programs offered at ${center.name} in ${center.location}.`,
        `treatment programs, recovery programs, addiction treatment`
    );

    // Update header
    const centerName = document.getElementById('center-name');
    if (centerName) centerName.textContent = center.name;

    // Load programs
    const programsContainer = document.getElementById('programs-container');
    if (programsContainer) {
        programsContainer.innerHTML = center.programs.map(program => `
            <div class="program-card">
                <div class="program-header">
                    <h3>${program.title}</h3>
                    <span class="program-duration"><i class="far fa-clock"></i> ${program.duration}</span>
                </div>
                <p>${program.description}</p>
                <div class="program-features">
                    ${program.features.map(f => `<span class="feature-tag"><i class="fas fa-check"></i> ${f}</span>`).join('')}
                </div>
                <a href="rehab-contact.html?center=${center.slug}" class="btn-inquire">Enroll Now</a>
            </div>
        `).join('');
    }

    updateNavigationLinks(center.slug);
}

// Load therapy on rehab-therapy.html
function loadTherapy() {
    const slug = getUrlParameter('center');
    const center = getCenterBySlug(slug);

    // Update SEO
    document.title = `${center.name} - Therapy & Treatment | RehabCare`;
    updateMetaTags(
        `${center.name} Therapy Programs`,
        `Explore therapy and treatment methods at ${center.name} in ${center.location}.`,
        `therapy, treatment methods, counseling, medical support`
    );

    const centerName = document.getElementById('center-name');
    if (centerName) centerName.textContent = center.name;

    // Load therapy methods
    const methodsContainer = document.getElementById('therapy-methods');
    if (methodsContainer) {
        methodsContainer.innerHTML = center.therapy.methods.map(method => `
            <div class="therapy-card">
                <i class="fas fa-heartbeat"></i>
                <h4>${method}</h4>
            </div>
        `).join('');
    }

    // Load counseling
    const counselingContainer = document.getElementById('counseling-types');
    if (counselingContainer) {
        counselingContainer.innerHTML = center.therapy.counseling.map(c => `
            <div class="counseling-item">
                <i class="fas fa-check"></i>
                <span>${c}</span>
            </div>
        `).join('');
    }

    // Load medical support
    const medicalContainer = document.getElementById('medical-support');
    if (medicalContainer) {
        medicalContainer.innerHTML = center.therapy.medical.map(m => `
            <div class="medical-item">
                <i class="fas fa-plus-circle"></i>
                <span>${m}</span>
            </div>
        `).join('');
    }

    updateNavigationLinks(center.slug);
}

// Load facilities on rehab-facilities.html
function loadFacilities() {
    const slug = getUrlParameter('center');
    const center = getCenterBySlug(slug);

    // Update SEO
    document.title = `${center.name} - Facilities | RehabCare`;
    updateMetaTags(
        `${center.name} Facilities`,
        `View world-class facilities at ${center.name} in ${center.location}.`,
        `facilities, accommodation, recovery environment`
    );

    const centerName = document.getElementById('center-name');
    if (centerName) centerName.textContent = center.name;

    // Load accommodation
    const accommodationContainer = document.getElementById('accommodation');
    if (accommodationContainer) {
        accommodationContainer.innerHTML = center.facilities.accommodation.map(a => `
            <div class="facility-item">
                <i class="fas fa-bed"></i>
                <span>${a}</span>
            </div>
        `).join('');
    }

    // Load common facilities
    const commonContainer = document.getElementById('common-facilities');
    if (commonContainer) {
        commonContainer.innerHTML = center.facilities.common.map(f => `
            <div class="facility-item">
                <i class="fas fa-building"></i>
                <span>${f}</span>
            </div>
        `).join('');
    }

    // Load wellness facilities
    const wellnessContainer = document.getElementById('wellness-facilities');
    if (wellnessContainer) {
        wellnessContainer.innerHTML = center.facilities.wellness.map(w => `
            <div class="facility-item">
                <i class="fas fa-spa"></i>
                <span>${w}</span>
            </div>
        `).join('');
    }

    updateNavigationLinks(center.slug);
}

// Load blog content on rehab-blog.html
function loadBlog() {
    const slug = getUrlParameter('center');
    const center = getCenterBySlug(slug);

    // Update SEO
    document.title = `${center.name} - Blog & Stories | RehabCare`;
    updateMetaTags(
        `${center.name} Blog & Success Stories`,
        `Read articles and success stories from ${center.name}.`,
        `blog, success stories, recovery tips`
    );

    const centerName = document.getElementById('center-name');
    if (centerName) centerName.textContent = center.name;

    // Load articles
    const articlesContainer = document.getElementById('articles');
    if (articlesContainer) {
        articlesContainer.innerHTML = center.blogContent.articles.map(article => `
            <article class="blog-card">
                <span class="article-category">${article.category}</span>
                <h3>${article.title}</h3>
                <p>${article.excerpt}</p>
                <span class="article-date"><i class="far fa-calendar"></i> ${formatDate(article.date)}</span>
            </article>
        `).join('');
    }

    // Load success stories
    const storiesContainer = document.getElementById('success-stories');
    if (storiesContainer) {
        storiesContainer.innerHTML = center.blogContent.successStories.map(story => `
            <div class="story-card">
                <div class="story-content">
                    <i class="fas fa-quote-left"></i>
                    <p>${story.story}</p>
                </div>
                <div class="story-author">
                    <strong>${story.name}</strong>
                    <span>${story.duration}</span>
                </div>
            </div>
        `).join('');
    }

    // Load tips
    const tipsContainer = document.getElementById('recovery-tips');
    if (tipsContainer) {
        tipsContainer.innerHTML = center.blogContent.tips.map(tip => `
            <div class="tip-item">
                <i class="fas fa-lightbulb"></i>
                <span>${tip}</span>
            </div>
        `).join('');
    }

    updateNavigationLinks(center.slug);
}

// Load contact page with center info
function loadContact() {
    const slug = getUrlParameter('center');
    const center = getCenterBySlug(slug);

    // Update SEO
    document.title = `Contact ${center.name} | RehabCare`;
    updateMetaTags(
        `Contact ${center.name}`,
        `Contact ${center.name} in ${center.location} for addiction treatment.`,
        `contact, phone, email, address`
    );

    // Update center name in form
    const formCenterName = document.getElementById('form-center-name');
    if (formCenterName) formCenterName.textContent = center.name;

    // Update contact info
    const phoneEl = document.getElementById('contact-phone');
    if (phoneEl) phoneEl.textContent = center.contact.phone;

    const emailEl = document.getElementById('contact-email');
    if (emailEl) emailEl.textContent = center.contact.email;

    const addressEl = document.getElementById('contact-address');
    if (addressEl) addressEl.textContent = center.contact.address;

    const emergencyEl = document.getElementById('emergency-phone');
    if (emergencyEl) emergencyEl.textContent = center.contact.emergencyPhone;

    const hoursEl = document.getElementById('contact-hours');
    if (hoursEl) hoursEl.textContent = center.contact.hours;

    // Store center slug for form submission
    const form = document.getElementById('contact-form');
    if (form) {
        form.setAttribute('data-center', center.slug);
    }

    updateNavigationLinks(center.slug);
}

// Update meta tags dynamically
function updateMetaTags(title, description, keywords) {
    // Title
    const titleTag = document.querySelector('meta[name="title"]');
    if (titleTag) titleTag.setAttribute('content', title);

    // Description
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute('content', description);

    // Keywords
    const keyTag = document.querySelector('meta[name="keywords"]');
    if (keyTag) keyTag.setAttribute('content', keywords);
}

// Update navigation links with center parameter
function updateNavigationLinks(slug) {
    // Update nav links in header if they exist
    const detailsLink = document.getElementById('nav-details');
    if (detailsLink) detailsLink.href = `rehab-details.html?center=${slug}`;

    const programsLink = document.getElementById('nav-programs');
    if (programsLink) programsLink.href = `rehab-programs.html?center=${slug}`;

    const therapyLink = document.getElementById('nav-therapy');
    if (therapyLink) therapyLink.href = `rehab-therapy.html?center=${slug}`;

    const facilitiesLink = document.getElementById('nav-facilities');
    if (facilitiesLink) facilitiesLink.href = `rehab-facilities.html?center=${slug}`;

    const blogLink = document.getElementById('nav-blog');
    if (blogLink) blogLink.href = `rehab-blog.html?center=${slug}`;

    const contactLink = document.getElementById('nav-contact');
    if (contactLink) contactLink.href = `rehab-contact.html?center=${slug}`;

    // Update breadcrumb
    const breadcrumbName = document.getElementById('breadcrumb-name');
    if (breadcrumbName) breadcrumbName.textContent = 'Details';

    // Update CTA buttons
    const ctaContact = document.getElementById('cta-contact');
    if (ctaContact) ctaContact.href = `rehab-contact.html?center=${slug}`;

    const ctaDetails = document.getElementById('cta-details');
    if (ctaDetails) ctaDetails.href = `rehab-details.html?center=${slug}`;
}

// Handle contact form submission
function handleContactForm(event) {
    event.preventDefault();

    const form = event.target;
    const centerSlug = form.getAttribute('data-center');
    const center = getCenterBySlug(centerSlug);

    // Get form values
    const name = form.querySelector('#name').value;
    const phone = form.querySelector('#phone').value;
    const email = form.querySelector('#email').value;
    const message = form.querySelector('#message').value;

    // Simple validation
    if (!name || !phone || !email) {
        alert('Please fill in all required fields.');
        return;
    }

    // Show success message (in real app, this would send to server)
    alert(`Thank you for contacting ${center.name}! We will reach out to you at ${phone} or ${email} shortly.`);

    // Reset form
    form.reset();
}

// Format date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', function () {
    // Initialize modal functionality
    initializeModal();

    // Initialize filter buttons
    initializeFilters();

    // Load rehab cards on main listing
    if (document.getElementById('rehab-cards-container')) {
        loadRehabCards();
    }

    // Load details page
    if (document.getElementById('center-name') && document.getElementById('hero-section')) {
        loadCenterDetails();
    }

    // Load programs
    if (document.getElementById('programs-container')) {
        loadPrograms();
    }

    // Load therapy
    if (document.getElementById('therapy-methods')) {
        loadTherapy();
    }

    // Load facilities
    if (document.getElementById('accommodation')) {
        loadFacilities();
    }

    // Load blog
    if (document.getElementById('articles')) {
        loadBlog();
    }

    // Load contact
    if (document.getElementById('form-center-name')) {
        loadContact();
    }

    // Attach form handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            navMenu.classList.toggle('active');
        });
    }
});
