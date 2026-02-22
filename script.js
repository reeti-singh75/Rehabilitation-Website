// ===============================
// BACKEND API SEARCH FUNCTIONS
// ===============================

// API Base URL - Change port if needed
const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Search for people from the MongoDB backend
 * Connects to /api/search endpoint
 */
async function searchFromAPI() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();

    if (!searchTerm) {
        alert('Please enter a search term');
        return;
    }

    try {
        // Show loading state
        showSearchLoading();

        // Make API call to backend
        const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(searchTerm)}`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();

        // Display results
        displaySearchResults(result.data, searchTerm);

    } catch (error) {
        console.error('Search error:', error);
        showSearchError(error);
    }
}

/**
 * Display search results on the page
 */
function displaySearchResults(data, searchTerm) {
    const searchResults = document.getElementById('searchResults');
    const searchResultsContent = document.getElementById('searchResultsContent');

    if (!searchResults || !searchResultsContent) return;

    if (data.length === 0) {
        searchResultsContent.innerHTML = `
            <div class="no-results">
                <p>No results found for "<strong>${searchTerm}</strong>"</p>
                <p>Try searching for a different name or city (e.g., Delhi, Mumbai, Goa, Rishikesh)</p>
            </div>
        `;
    } else {
        // Create HTML for each result
        const resultsHTML = data.map(person => `
            <div class="search-result-card">
                <div class="result-info">
                    <h4>${person.name}</h4>
                    <p><strong>Age:</strong> ${person.age} | <strong>Category:</strong> ${person.category}</p>
                    <p><strong>City:</strong> ${person.city}</p>
                </div>
            </div>
        `).join('');

        searchResultsContent.innerHTML = `
            <p class="results-count">Found ${data.length} result(s) for "<strong>${searchTerm}</strong>"</p>
            <div class="results-list">
                ${resultsHTML}
            </div>
        `;
    }

    // Show the results section
    searchResults.style.display = 'block';

    // Scroll to results
    searchResults.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Show loading state during search
 */
function showSearchLoading() {
    const searchResultsContent = document.getElementById('searchResultsContent');
    const searchResults = document.getElementById('searchResults');

    if (searchResultsContent) {
        searchResultsContent.innerHTML = '<div class="loading">Searching...</div>';
    }
    if (searchResults) {
        searchResults.style.display = 'block';
    }
}

/**
 * Show error message if search fails
 */
function showSearchError(error) {
    const searchResultsContent = document.getElementById('searchResultsContent');

    if (searchResultsContent) {
        searchResultsContent.innerHTML = `
            <div class="search-error">
                <p>Unable to search. Please make sure the backend server is running.</p>
                <p class="error-detail">Error: ${error.message}</p>
                <p class="help-text">Start the server with: cd backend && npm start</p>
            </div>
        `;
    }

    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.style.display = 'block';
    }
}

/**
 * Close search results
 */
function closeSearchResults() {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.style.display = 'none';
    }
}

// Allow pressing Enter to search
document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                searchFromAPI();
            }
        });
    }
});

// ===============================
// LUXURY REHAB SECTION SCRIPT
// ===============================

// 1️⃣ Data
const luxuryRehabs = [
    {
        name: "Sanctum Wellness",
        location: "New Delhi",
        image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=60",
        speciality: "Executive Detox & VIP Suites",
        description: "Premium luxury rehab offering private villas, gourmet meals and 1:1 therapy sessions."
    },
    {
        name: "Samarpan Recovery",
        location: "Pune, Maharashtra",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=60",
        speciality: "International Clinical Standards",
        description: "International level treatment with yoga, scenic views and structured aftercare."
    },
    {
        name: "Abhasa Wellness",
        location: "Coimbatore, Tamil Nadu",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=60",
        speciality: "Organic Lifestyle & Forest Healing",
        description: "Holistic healing in a peaceful forest environment with spa & ayurveda therapies."
    },

    {
        name: "Veda Wellness",
        location: "Mumbai, Maharashtra",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=500&q=60",
        speciality: "Celebrity Focused Privacy",
        tags: ["Confidential", "Gym", "Art Therapy"]
    },
    {
        name: "Alpha Healing Center",
        location: "Vadodara, Gujarat",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=60",
        speciality: "Evidence-Based Clinical Recovery",
        tags: ["Medical Detox", "High Success Rate", "Luxury Decor"]
    },
    {
        name: "Anatta Rehabilitation",
        location: "Mahabaleshwar, MH",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=60",
        speciality: "Non-Medical Voluntary Program",
        tags: ["No Medicines", "Lush Greenery", "Elite Privacy"]
    },
    {
        name: "Safe House Wellness",
        location: "New Delhi",
        image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=500&q=60",
        speciality: "Boutique Rehab Experience",
        tags: ["Individual Care", "Prime Location", "24/7 Support"]
    },
    {
        name: "The Hermitage Rehab",
        location: "Amritsar, Punjab",
        image: "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?auto=format&fit=crop&w=500&q=60",
        speciality: "Psychological & Holistic Care",
        tags: ["Clean Environment", "Spiritual Growth", "Modern Tech"]
    },
    {
        name: "Zorbacare",
        location: "Pune, Maharashtra",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=500&q=60",
        speciality: "Home-like Luxury Environment",
        tags: ["Pet Friendly", "Flexible Stays", "Personal Chef"]
    },
    {
        name: "Lotus Wellness",
        location: "Pollachi, Kerala Border",
        image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=500&q=60",
        speciality: "Naturopathy & Holistic Rehab",
        tags: ["Infinity Pool", "Nature Walks", "Detox Diet"]
    }


];

// 2️⃣ Elements
const luxGrid = document.getElementById("lux-rehabGrid");
const luxOverlay = document.getElementById("lux-detailOverlay");
const luxModalContent = document.getElementById("lux-modalContent");

// 3️⃣ Render Cards
function renderLuxuryRehabs() {
    if (!luxGrid) return;

    luxGrid.innerHTML = luxuryRehabs.map((item, index) => `
        <div class="lux-card" onclick="openLuxDetails(${index})">
            <div class="lux-card-img" 
                 style="background-image:url('${item.image}')">
            </div>
            <div class="lux-card-content">
                <h3>${item.name}</h3>

                <p class="lux-location">
                    <span class="lux-location-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                             viewBox="0 0 24 24" 
                             width="16" height="16" 
                             fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 
                            7-13c0-3.87-3.13-7-7-7zm0 
                            9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 
                            6.5 12 6.5s2.5 1.12 2.5 
                            2.5S13.38 11.5 12 11.5z"/>
                        </svg>
                    </span>
                    ${item.location}
                </p>

                <p class="lux-speciality">${item.speciality}</p>
            </div>
        </div>
    `).join("");
}

// 4️⃣ Open Modal
function openLuxDetails(index) {
    const item = luxuryRehabs[index];

    luxModalContent.innerHTML = `
        <img src="${item.image}" 
             style="width:100%; border-radius:12px; margin-bottom:15px;">
        <h2>${item.name}</h2>
        <p><strong>Location:</strong> ${item.location}</p>
        <p><strong>Speciality:</strong> ${item.speciality}</p>
        <p style="margin-top:10px;">${item.description}</p>
    `;

    luxOverlay.style.display = "flex";
}

// 5️⃣ Close Modal
function closeLuxDetails() {
    luxOverlay.style.display = "none";
}

// Close on outside click
window.addEventListener("click", function (e) {
    if (e.target === luxOverlay) {
        closeLuxDetails();
    }
});

// Initial Load
document.addEventListener("DOMContentLoaded", renderLuxuryRehabs);







































































const trustedRehabs = [
    {
        name: "Hope Trust",
        location: "Hyderabad",
        rating: 4.9,
        reviews: 320,
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80",
        desc: "India's most veteran facility for dual diagnosis and addiction."
    },
    {
        name: "Cadabams Anunaya",
        location: "Bangalore",
        rating: 4.8,
        reviews: 215,
        image: "https://images.unsplash.com/photo-1586773860418-d3b97976c661?auto=format&fit=crop&w=600&q=80",
        desc: "Specialized in holistic recovery with world-class psychiatric support."
    },
    {
        name: "Phoenix Foundation",
        location: "Hyderabad",
        rating: 4.7,
        reviews: 180,
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=600&q=80",
        desc: "Focuses on 12-step program with high success in long-term sobriety."
    },
    {
        name: "Wisdom Matters",
        location: "Pune",
        rating: 4.9,
        reviews: 150,
        image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80",
        desc: "Renowned for its compassionate approach and family counseling."
    },
    {
        name: "Naya Savera",
        location: "New Delhi",
        rating: 4.6,
        reviews: 290,
        image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80",
        desc: "Affordable yet high-quality treatment with modern amenities."
    },
    {
        name: "Simran Health",
        location: "Noida",
        rating: 4.7,
        reviews: 110,
        image: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=600&q=80",
        desc: "Dedicated team of psychologists and 24/7 medical supervision."
    },
    {
        name: "Roar Wellness",
        location: "South Delhi",
        rating: 4.8,
        reviews: 140,
        image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80",
        desc: "Premium facility focusing on behavioral health and detox."
    },
    {
        name: "Punarjani Rehab",
        location: "Kerala",
        rating: 4.9,
        reviews: 195,
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
        desc: "Natural healing environment combined with clinical expertise."
    },
    {
        name: "Sunshine Wellness",
        location: "Mumbai",
        rating: 4.5,
        reviews: 230,
        image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=600&q=80",
        desc: "Highly rated for its alcohol de-addiction and relapse prevention."
    },
    {
        name: "True Care Foundation",
        location: "Mumbai",
        rating: 4.7,
        reviews: 165,
        image: "https://images.unsplash.com/photo-1631217818202-90ef4a851c58?auto=format&fit=crop&w=600&q=80",
        desc: "Expert medical detox and cognitive behavioral therapy."
    }
];

function displayTrustedRehabs() {
    const trustGrid = document.getElementById('trust-rehabGrid');
    if (!trustGrid) return;

    // Function ke andar ka template bas itna update karein:
    trustGrid.innerHTML = trustedRehabs.map(item => `
    <div class="trust-card">
        <span class="trust-badge"><i class="fas fa-check-circle"></i> Verified</span>
        <div class="img-container">
            <img src="${item.image}" class="trust-img" alt="${item.name}">
        </div>
        <div class="trust-card-body">
            <div class="rating-stars">
                ${'★'.repeat(Math.floor(item.rating))}${item.rating % 1 !== 0 ? '½' : ''} 
                <span class="review-count">(${item.rating} | ${item.reviews} Reviews)</span>
            </div>
            <h3>${item.name}</h3>
            
            
             <p class="trust-loc">
                    <span class="trust-loc-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                             viewBox="0 0 24 24" 
                             width="16" height="16" 
                             fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 
                            7-13c0-3.87-3.13-7-7-7zm0 
                            9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 
                            6.5 12 6.5s2.5 1.12 2.5 
                            2.5S13.38 11.5 12 11.5z"/>
                        </svg>
                    </span>
                    ${item.location}
                </p>
            <p class="trust-desc">${item.desc}</p>
            <button class="trust-btn">Contact Center</button>
        </div>
    </div>
`).join('');
}

// Initializing the function
document.addEventListener('DOMContentLoaded', displayTrustedRehabs);




























const trustedHospitals = [
    { name: "Apollo Hospitals", location: "New Delhi/Chennai", rating: 4.9, reviews: 1500, image: "https://images.unsplash.com/photo-1587351591046-34316458374a?w=600", desc: "India's pioneer in private healthcare with multi-speciality expertise." },
    { name: "Fortis Memorial", location: "Gurugram", rating: 4.8, reviews: 1200, image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600", desc: "A world-class quaternary care hospital with advanced robotic surgery." },
    { name: "Medanta - The Medicity", location: "Gurugram", rating: 4.8, reviews: 2100, image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?w=600", desc: "A massive facility dedicated to cardiac, liver, and kidney transplants." },
    { name: "Max Super Speciality", location: "New Delhi", rating: 4.7, reviews: 950, image: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?w=600", desc: "Providing world-class medical services across 30+ specialities." },
    { name: "Lilavati Hospital", location: "Mumbai", rating: 4.6, reviews: 880, image: "https://images.unsplash.com/photo-1586773860418-d3b97976c661?w=600", desc: "Premier multi-speciality tertiary care hospital in the heart of Mumbai." },
    { name: "Manipal Hospital", location: "Bangalore", rating: 4.7, reviews: 1100, image: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=600", desc: "Known for patient-centric care and high-end diagnostic technology." },
    { name: "Nanavati Max", location: "Mumbai", rating: 4.5, reviews: 750, image: "https://images.unsplash.com/photo-1631217818202-90ef4a851c58?w=600", desc: "One of the oldest and most trusted names in Western India." },
    { name: "Kokilaben Dhirubhai Ambani", location: "Mumbai", rating: 4.9, reviews: 1300, image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600", desc: "India's most advanced social-capital hospital with 24/7 care." },
    { name: "Sir Ganga Ram Hospital", location: "New Delhi", rating: 4.7, reviews: 1050, image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600", desc: "Renowned for its excellence in clinical research and patient care." },
    { name: "Christian Medical College (CMC)", location: "Vellore", rating: 4.9, reviews: 3500, image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600", desc: "A world-renowned medical college and hospital for complex cases." }
];

function displayTrustedHospitals() {
    const hospGrid = document.getElementById('hosp-grid');
    if (!hospGrid) return;

    hospGrid.innerHTML = trustedHospitals.map(h => `
        <div class="hosp-card">
            <span class="hosp-badge">ISO Certified</span>
            <div class="hosp-img-container">
                <img src="${h.image}" class="hosp-img" alt="${h.name}">
            </div>
            <div class="hosp-body">
                <div class="hosp-rating">
                    ${'★'.repeat(Math.floor(h.rating))} <span style="color:#64748b; font-size:12px">(${h.rating} | ${h.reviews} Reviews)</span>
                </div>
                <h3>${h.name}</h3>

                 
             <p class="trust-loc">
                    <span class="trust-loc-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" 
                             viewBox="0 0 24 24" 
                             width="16" height="16" 
                             fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 
                            7-13c0-3.87-3.13-7-7-7zm0 
                            9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 
                            6.5 12 6.5s2.5 1.12 2.5 
                            2.5S13.38 11.5 12 11.5z"/>
                        </svg>
                    </span>
                    ${h.location}</p>
                <p class="hosp-info">${h.desc}</p>
                <button class="hosp-btn">Book Consultation</button>
            </div>
        </div>
    `).join('');
}

// Call function on load
document.addEventListener('DOMContentLoaded', () => {
    displayTrustedRehabs(); // From previous code
    displayTrustedHospitals(); // New hospital function
});































const trustedClinics = [
    { name: "Clove Dental", type: "Dental Care", location: "New Delhi", rating: 4.8, reviews: 5000, image: "https://images.unsplash.com/photo-1629908176625-50a100d1bc58?w=600", desc: "India's largest dental clinic chain with painless laser technology." },
    { name: "Dr. Batra's", type: "Homeopathy", location: "Mumbai", rating: 4.5, reviews: 3200, image: "https://images.unsplash.com/photo-1559839734-2b71f1e3c770?w=600", desc: "Leading global homeopathy clinic specializing in hair and skin." },
    { name: "Vasan Eye Care", type: "Eye Clinic", location: "Chennai", rating: 4.7, reviews: 4100, image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600", desc: "State-of-the-art vision care and advanced LASIK surgery center." },
    { name: "Kaya Clinic", type: "Dermatology", location: "Bangalore", rating: 4.6, reviews: 2800, image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600", desc: "Expert skin transformations and anti-aging treatments by top dermats." },
    { name: "Mindful Mental Health", type: "Psychiatry", location: "Pune", rating: 4.9, reviews: 900, image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600", desc: "Compassionate psychiatric care and evidence-based therapy sessions." },
    { name: "OrthoMove Clinic", type: "Orthopaedic", location: "Gurugram", rating: 4.8, reviews: 1200, image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=600", desc: "Specialized in sports injuries and non-surgical joint recovery." },
    { name: "Indira IVF Clinic", type: "Fertility", location: "Mumbai", rating: 4.7, reviews: 8500, image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=600", desc: "India's most successful chain of IVF and fertility clinics." },
    { name: "Skin & Soul", type: "Aesthetics", location: "Delhi", rating: 4.8, reviews: 1050, image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600", desc: "Boutique aesthetic clinic offering premium skin rejuvenation." },
    { name: "PathLab Diagnostics", type: "Pathology", location: "Noida", rating: 4.5, reviews: 4000, image: "https://images.unsplash.com/photo-1579154236594-e178f0469b11?w=600", desc: "Accurate health checkups and diagnostic services with home collection." },
    { name: "Kids Care Clinic", type: "Paediatric", location: "Hyderabad", rating: 4.9, reviews: 1300, image: "https://images.unsplash.com/photo-1631217818202-90ef4a851c58?w=600", desc: "Friendly and expert childcare for newborns and teenagers." }
];

function displayTrustedClinics() {
    const clinicGrid = document.getElementById('clinic-grid');
    if (!clinicGrid) return;

    clinicGrid.innerHTML = trustedClinics.map(c => `
        <div class="clinic-card">
            <div class="clinic-img-box">
                <span class="clinic-category">${c.type}</span>
                <img src="${c.image}" alt="${c.name}">
            </div>
            <div class="clinic-content">
                <div class="clinic-rating-box">
                    ${'★'.repeat(Math.floor(c.rating))} <span>(${c.rating})</span>
                </div>
                <h3>${c.name}</h3>
                <div class="clinic-location">🌍  ${c.location}</div>
                <p class="clinic-desc">${c.desc}</p>
                <button class="clinic-action-btn">Book Appointment</button>
            </div>
        </div>
    `).join('');
}

// Call inside DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    if (typeof displayTrustedRehabs === 'function') displayTrustedRehabs();
    if (typeof displayTrustedHospitals === 'function') displayTrustedHospitals();
    displayTrustedClinics();

});














function showCategory(category) {
    // 1. Sabhi sections ko select karein
    const rehabSection = document.querySelector('.lux-wrapper');
    const trustSection = document.querySelector('.trust-wrapper');
    const hospSection = document.querySelector('.hosp-wrapper');
    const clinicSection = document.querySelector('.clinic-wrapper');
    const whyChooseSection = document.querySelector('.container'); // Why choose hospitals

    // 2. Pehle sabko hide kar dein
    rehabSection.style.display = 'none';
    trustSection.style.display = 'none';
    hospSection.style.display = 'none';
    clinicSection.style.display = 'none';
    whyChooseSection.style.display = 'none';

    // 3. Buttons ki 'active' class remove karein
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // 4. Clicked category ke hisaab se show karein
    if (category === 'rehab') {
        rehabSection.style.display = 'block';
        trustSection.style.display = 'block';
        event.currentTarget.classList.add('active');
    } else if (category === 'hosp') {
        hospSection.style.display = 'block';
        whyChooseSection.style.display = 'block';
        event.currentTarget.classList.add('active');
    } else if (category === 'clinic') {
        clinicSection.style.display = 'block';
        event.currentTarget.classList.add('active');
    }
}

// Default call taaki page load hote hi sirf Rehab dikhe
window.onload = function () {
    showCategory('rehab');
};



















function toggleView(type, btn) {
    // 1. Sirf niche wale sections ko target karein (Hospitals aur Clinics)
    // Luxury wala upar hi rahega
    const trustSec = document.querySelector('.trust-wrapper');
    const hospitalSecs = document.querySelectorAll('.hosp-wrapper, .container');
    const clinicSecs = document.querySelectorAll('.clinic-wrapper');

    // 2. Buttons active state update
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // 3. Sabko hide karein (Sirf niche ke cards ko)
    const sectionsToToggle = [trustSec, ...hospitalSecs, ...clinicSecs];
    sectionsToToggle.forEach(s => {
        if (s) {
            s.style.display = 'none';
            s.style.opacity = '0';
        }
    });

    // 4. Clicked category ke hisaab se dikhayein
    let activeItems = [];
    if (type === 'rehab') activeItems = [trustSec];
    else if (type === 'hosp') activeItems = hospitalSecs;
    else if (type === 'clinic') activeItems = clinicSecs;

    activeItems.forEach(s => {
        if (s) {
            s.style.display = 'block';
            setTimeout(() => { s.style.opacity = '1'; }, 50);
        }
    });

    // 5. Scroll to top logic
    const navPos = document.getElementById('filter-nav');
    if (navPos) {
        window.scrollTo({
            top: navPos.offsetTop - 20,
            behavior: 'smooth'
        });
    }
}























document.addEventListener('DOMContentLoaded', () => {
    // Sabhi pills ko select karein
    const pills = document.querySelectorAll('.treatment-pills .pill');

    pills.forEach(pill => {
        pill.addEventListener('click', function () {
            // 1. Pehle us pill se 'active' class hatayein jo pehle se active hai
            const currentActive = document.querySelector('.treatment-pills .pill.active');
            if (currentActive) {
                currentActive.classList.remove('active');
            }

            // 2. Click kiye gaye pill par 'active' class add karein
            this.classList.add('active');
        });
    });
});








