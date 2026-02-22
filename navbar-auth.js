/**
 * ========================================
 * REHABCARE NAVBAR AUTHENTICATION
 * ========================================
 * Handles authentication state in the navbar
 * Updates UI based on user login status
 * 
 * Works with auth.js for authentication
 */

// ========================================
// CONFIGURATION
// ========================================

// LocalStorage keys (matching auth.js)
const TOKEN_KEY = 'rehabcare_token';
const USER_KEY = 'rehabcare_user';

// ========================================
// DOM ELEMENTS
// ========================================

// This will be called to update navbar based on auth state
function initNavbarAuth() {
    const authContainer = document.getElementById('navAuthContainer');
    if (!authContainer) return;

    updateNavbarAuth();
}

// ========================================
// AUTH STATE MANAGEMENT
// ========================================

/**
 * Check if user is logged in
 * @returns {boolean}
 */
function isLoggedIn() {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = localStorage.getItem(USER_KEY);
    return !!(token && user);
}

/**
 * Get stored user data
 * @returns {object|null}
 */
function getUser() {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
}

/**
 * Get stored token
 * @returns {string|null}
 */
function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

/**
 * Logout user - clear session data
 */
function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    // Show logout message
    showAlert('You have been logged out successfully', 'success');

    // Update navbar
    setTimeout(() => {
        updateNavbarAuth();
    }, 500);

    // Redirect to home after short delay
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 1000);
}

// ========================================
// NAVBAR RENDERING
// ========================================

/**
 * Update navbar based on auth state
 */
function updateNavbarAuth() {
    const authContainer = document.getElementById('navAuthContainer');
    if (!authContainer) return;

    if (isLoggedIn()) {
        const user = getUser();
        renderUserMenu(authContainer, user);
    } else {
        renderAuthButtons(authContainer);
    }
}

/**
 * Render Login/Signup buttons
 * @param {HTMLElement} container
 */
function renderAuthButtons(container) {
    container.innerHTML = `
        <a href="auth.html?tab=login" class="nav-auth-btn nav-login-btn">
            <i class="fas fa-sign-in-alt"></i>
            <span>Login</span>
        </a>
        <a href="auth.html?tab=signup" class="nav-auth-btn nav-signup-btn">
            <i class="fas fa-user-plus"></i>
            <span>Sign Up</span>
        </a>
    `;
}

/**
 * Render user dropdown menu
 * @param {HTMLElement} container
 * @param {object} user
 */
function renderUserMenu(container, user) {
    const userName = user ? (user.name || user.email || 'User') : 'User';
    const firstName = userName.split(' ')[0];

    container.innerHTML = `
        <div class="nav-user-menu">
            <button class="nav-user-toggle" onclick="toggleUserMenu()">
                <div class="nav-user-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <span class="nav-user-name">${firstName}</span>
                <i class="fas fa-chevron-down nav-user-arrow"></i>
            </button>
            <div class="nav-user-dropdown" id="userDropdown">
                <div class="nav-user-header">
                    <span class="nav-user-fullname">${userName}</span>
                    <span class="nav-user-email">${user.email || ''}</span>
                </div>
                <div class="nav-user-divider"></div>
                <a href="home.html" class="nav-user-item">
                    <i class="fas fa-th-large"></i>
                    <span>Dashboard</span>
                </a>
                <a href="home.html" class="nav-user-item">
                    <i class="fas fa-user-circle"></i>
                    <span>My Profile</span>
                </a>
                <a href="booking.html" class="nav-user-item">
                    <i class="fas fa-calendar-alt"></i>
                    <span>My Bookings</span>
                </a>
                <div class="nav-user-divider"></div>
                <button class="nav-user-item nav-user-logout" onclick="handleLogout()">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>Logout</span>
                </button>
            </div>
        </div>
    `;
}

/**
 * Toggle user dropdown menu
 */
function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    const toggle = document.querySelector('.nav-user-toggle');

    if (dropdown && toggle) {
        dropdown.classList.toggle('active');
        toggle.classList.toggle('active');
    }
}

/**
 * Handle logout button click
 */
function handleLogout() {
    logout();
}

/**
 * Show alert message (simplified version)
 * @param {string} message 
 * @param {string} type 
 */
function showAlert(message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `nav-alert nav-alert-${type}`;
    alert.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    // Add to body
    document.body.appendChild(alert);

    // Show alert
    setTimeout(() => alert.classList.add('show'), 10);

    // Remove after delay
    setTimeout(() => {
        alert.classList.remove('show');
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

// Close dropdown when clicking outside
document.addEventListener('click', function (e) {
    const userMenu = document.querySelector('.nav-user-menu');
    const dropdown = document.getElementById('userDropdown');

    if (userMenu && dropdown && !userMenu.contains(e.target)) {
        dropdown.classList.remove('active');
        document.querySelector('.nav-user-toggle')?.classList.remove('active');
    }
});

// ========================================
// URL PARAMETER HANDLING FOR AUTH PAGE
// ========================================

/**
 * Handle URL parameters for auth page
 * This allows opening auth.html with ?tab=login or ?tab=signup
 */
function handleAuthUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');

    if (tab === 'login' || tab === 'signup') {
        // Call switchTab from auth.js if available
        if (typeof switchTab === 'function') {
            switchTab(tab);
        }
    }
}

// ========================================
// INITIALIZATION
// ========================================

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function () {
    initNavbarAuth();

    // Handle URL params if on auth page
    if (window.location.href.includes('auth.html')) {
        handleAuthUrlParams();
    }
});

// Make functions available globally
window.navbarAuth = {
    isLoggedIn,
    getUser,
    getToken,
    logout,
    updateNavbarAuth,
    toggleUserMenu,
    handleLogout
};

console.log('Navbar Auth loaded successfully!');

