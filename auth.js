/**
 * ========================================
 * REHABCARE AUTHENTICATION JAVASCRIPT
 * ========================================
 * Handles login/signup form submission,
 * API calls to backend, and user session management
 * 
 * Backend API Endpoints:
 * - POST /api/auth/signup
 * - POST /api/auth/login
 */

// ========================================
// CONFIGURATION
// ========================================

// Backend API URL - Update this if your backend runs on different port
const API_BASE_URL = 'http://localhost:3000';

// LocalStorage keys
const TOKEN_KEY = 'rehabcare_token';
const USER_KEY = 'rehabcare_user';

// ========================================
// DOM ELEMENTS
// ========================================

// Toggle elements
const loginTab = document.getElementById('loginTab');
const signupTab = document.getElementById('signupTab');
const toggleSlider = document.getElementById('toggleSlider');

// Forms
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

// Buttons
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');

// Alert container
const alertContainer = document.getElementById('alertContainer');

// ========================================
// INITIALIZATION
// ========================================

// Check if user is already logged in on page load
document.addEventListener('DOMContentLoaded', function () {
    checkExistingSession();
    updateSliderPosition('login');
});

// ========================================
// TAB TOGGLE FUNCTIONALITY
// ========================================

/**
 * Switch between login and signup tabs
 * @param {string} tab - 'login' or 'signup'
 */
function switchTab(tab) {
    // Update tab buttons
    loginTab.classList.toggle('active', tab === 'login');
    signupTab.classList.toggle('active', tab === 'signup');

    // Update slider position
    updateSliderPosition(tab);

    // Show/hide appropriate form
    loginForm.classList.toggle('active', tab === 'login');
    signupForm.classList.toggle('active', tab === 'signup');

    // Clear any alerts when switching
    clearAlerts();
}

/**
 * Update the slider position for toggle animation
 * @param {string} tab - Current tab name
 */
function updateSliderPosition(tab) {
    const slider = document.getElementById('toggleSlider');
    if (tab === 'login') {
        slider.style.left = '5px';
        slider.style.transform = 'translateX(0)';
    } else {
        slider.style.left = '50%';
        slider.style.transform = 'translateX(0)';
    }
}

// Add click event listeners to toggle buttons
loginTab.addEventListener('click', () => switchTab('login'));
signupTab.addEventListener('click', () => switchTab('signup'));

// ========================================
// PASSWORD TOGGLE FUNCTIONALITY
// ========================================

/**
 * Toggle password visibility
 * @param {string} inputId - ID of the password input
 * @param {string} iconId - ID of the toggle icon
 */
function togglePassword(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// ========================================
// ALERT MESSAGES
// ========================================

/**
 * Display an alert message
 * @param {string} message - Alert message text
 * @param {string} type - Alert type: 'success', 'error', or 'warning'
 */
function showAlert(message, type = 'error') {
    // Clear previous alerts
    clearAlerts();

    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;

    // Set icon based on type
    let icon = 'info-circle';
    if (type === 'success') icon = 'check-circle';
    if (type === 'error') icon = 'exclamation-circle';
    if (type === 'warning') icon = 'exclamation-triangle';

    alert.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <span>${message}</span>
    `;

    // Add to container
    alertContainer.appendChild(alert);

    // Auto-remove after 5 seconds (except for success)
    if (type !== 'success') {
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
}

/**
 * Clear all alert messages
 */
function clearAlerts() {
    alertContainer.innerHTML = '';
}

// ========================================
// FORM SUBMISSION HANDLERS
// ========================================

// Login Form Submit
loginForm.addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission

    // Get form values
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    // Validate inputs
    if (!email || !password) {
        showAlert('Please enter both email and password', 'error');
        return;
    }

    // Show loading state
    setLoading(loginBtn, true);

    try {
        // Make API call
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        // Parse response
        const data = await response.json();

        if (data.success) {
            // Login successful
            showAlert('Login successful! Redirecting...', 'success');

            // Save token and user data
            saveAuthData(data.data.token, data.data.user);

            // Redirect to home page after short delay
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1500);
        } else {
            // Login failed - show error message
            showAlert(data.message || 'Invalid email or password', 'error');
        }

    } catch (error) {
        // Network error
        console.error('Login error:', error);
        showAlert('Unable to connect to server. Please check your connection.', 'error');
    } finally {
        // Remove loading state
        setLoading(loginBtn, false);
    }
});

// Signup Form Submit
signupForm.addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission

    // Get form values
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
        showAlert('Please fill in all fields', 'error');
        return;
    }

    // Validate name (at least 2 characters)
    if (name.length < 2) {
        showAlert('Please enter a valid name', 'error');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email address', 'error');
        return;
    }

    // Validate password length
    if (password.length < 6) {
        showAlert('Password must be at least 6 characters', 'warning');
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        showAlert('Passwords do not match', 'error');
        return;
    }

    // Show loading state
    setLoading(signupBtn, true);

    try {
        // Make API call
        const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        // Parse response
        const data = await response.json();

        if (data.success) {
            // Signup successful
            showAlert('Account created successfully! Redirecting to login...', 'success');

            // Clear signup form
            signupForm.reset();

            // Switch to login tab after short delay
            setTimeout(() => {
                switchTab('login');
                // Pre-fill email for convenience
                document.getElementById('loginEmail').value = email;
            }, 1500);
        } else {
            // Signup failed - show error message
            showAlert(data.message || 'Unable to create account', 'error');
        }

    } catch (error) {
        // Network error
        console.error('Signup error:', error);
        showAlert('Unable to connect to server. Please check your connection.', 'error');
    } finally {
        // Remove loading state
        setLoading(signupBtn, false);
    }
});

// ========================================
// LOADING STATE
// ========================================

/**
 * Set button loading state
 * @param {HTMLElement} button - The button element
 * @param {boolean} isLoading - Whether to show loading state
 */
function setLoading(button, isLoading) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

// ========================================
// AUTH DATA MANAGEMENT
// ========================================

/**
 * Save authentication data to localStorage
 * @param {string} token - JWT token
 * @param {object} user - User data object
 */
function saveAuthData(token, user) {
    try {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        console.log('Auth data saved successfully');
    } catch (error) {
        console.error('Error saving auth data:', error);
    }
}

/**
 * Get stored authentication token
 * @returns {string|null} - JWT token or null
 */
function getToken() {
    return localStorage.getItem(TOKEN_KEY);
}

/**
 * Get stored user data
 * @returns {object|null} - User data object or null
 */
function getUser() {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
}

/**
 * Check if user is already logged in
 */
function checkExistingSession() {
    const token = getToken();
    const user = getUser();

    if (token && user) {
        console.log('User is already logged in:', user.name);
        // Optional: Redirect to home if already logged in
        // window.location.href = 'home.html';
    }
}

/**
 * Logout user - clear session data
 */
function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    console.log('User logged out');
    // Redirect to auth page
    window.location.href = 'auth.html';
}

// ========================================
// API HELPER FUNCTIONS
// ========================================

/**
 * Make authenticated API request
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise} - Fetch response
 */
async function authenticatedFetch(endpoint, options = {}) {
    const token = getToken();

    // Add authorization header if token exists
    if (token) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        };
    }

    return fetch(`${API_BASE_URL}${endpoint}`, options);
}

// ========================================
// FORM INPUT VALIDATION (Optional Enhancements)
// ========================================

// Add real-time validation feedback
const inputs = document.querySelectorAll('.input-wrapper input');

inputs.forEach(input => {
    // Validation on blur
    input.addEventListener('blur', function () {
        validateInput(this);
    });

    // Clear error on focus
    input.addEventListener('focus', function () {
        this.style.borderColor = '';
    });
});

/**
 * Validate individual input field
 * @param {HTMLElement} input - Input element
 */
function validateInput(input) {
    const value = input.value.trim();
    const id = input.id;

    // Skip validation for empty fields (handled by 'required')
    if (!value) return;

    // Email validation
    if (id === 'loginEmail' || id === 'signupEmail') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            input.style.borderColor = 'var(--error)';
            return false;
        }
    }

    // Password validation
    if (id === 'signupPassword' && value.length < 6) {
        input.style.borderColor = 'var(--warning)';
        return false;
    }

    // Name validation
    if (id === 'signupName' && value.length < 2) {
        input.style.borderColor = 'var(--error)';
        return false;
    }

    // Reset border color if valid
    input.style.borderColor = 'var(--success)';
    return true;
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

// Submit form on Enter key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        // Find active form
        const activeForm = loginForm.classList.contains('active') ? loginForm : signupForm;

        // Check if we're not in a button (to avoid double submission)
        if (e.target.tagName !== 'BUTTON') {
            // Let the form handle submit normally
        }
    }
});

// ========================================
// EXPORT FUNCTIONS (for use in other files)
// ========================================

// Make functions available globally
window.authFunctions = {
    switchTab,
    togglePassword,
    showAlert,
    clearAlerts,
    logout,
    getToken,
    getUser,
    authenticatedFetch
};

console.log('Auth JavaScript loaded successfully!');

