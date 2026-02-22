# Implementation Plan: Login and Signup Navbar Integration

## Task Summary
Add Login and Signup buttons to the navbar, make navbar responsive, and integrate with the existing auth system.

## Files to be Created/Modified

### 1. Create `navbar-auth.js` - Navbar Authentication Module
**Purpose**: Handle navbar auth state management
**Content**:
- Check user login status on page load
- Render Login/Signup buttons OR User profile dropdown
- Handle logout functionality
- Update navbar dynamically based on auth state

### 2. Update `white.css` - Add Navbar Auth Styles
**Purpose**: Style the Login/Signup buttons in navbar
**Add**:
- `.nav-auth-buttons` container styles
- `.nav-login-btn` and `.nav-signup-btn` button styles
- `.nav-user-menu` dropdown styles for logged-in users
- Responsive styles for mobile
- Hover effects and transitions

### 3. Update `home.html` - Add Navbar Auth Buttons
**Purpose**: Add auth buttons to navbar
**Modify**:
- Add `.nav-auth-buttons` div with Login/Signup buttons
- Add user profile dropdown for logged-in state
- Include `navbar-auth.js` script

### 4. Update Other HTML Pages
**Pages to Update**:
- `rehab.html`
- `about.html`
- `prevention.html`
- `resources.html`
- `booking.html`
- `rehab-details.html`
- `rehab-programs.html`
- `rehab-therapy.html`
- `rehab-facilities.html`
- `rehab-blog.html`
- `rehab-contact.html`
- `blog.html`
- `browse.html`
- `clinics.html`
- `trusted-rehabs.html`
- `treatments.html`

## Implementation Steps

### Step 1: Create navbar-auth.js
- [ ] Create new file with auth state management
- [ ] Implement `updateNavbarAuth()` function
- [ ] Implement `renderAuthButtons()` function
- [ ] Implement `renderUserMenu()` function  
- [ ] Implement `logout()` function

### Step 2: Update white.css
- [ ] Add `.nav-auth-buttons` styles
- [ ] Add `.nav-login-btn` and `.nav-signup-btn` styles
- [ ] Add `.nav-user-profile` dropdown styles
- [ ] Add mobile responsive styles
- [ ] Add hover effects

### Step 3: Update home.html
- [ ] Add auth buttons container to navbar
- [ ] Include navbar-auth.js script
- [ ] Test functionality

### Step 4: Update All Other Pages
- [ ] Add same navbar changes to all HTML pages
- [ ] Ensure consistent styling across all pages

## API Endpoints (Already Available)
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

## Success Criteria
1. Login/Signup buttons visible in navbar on right side
2. Clicking Login opens auth.html in login mode
3. Clicking Signup opens auth.html in signup mode
4. When logged in, show user name with dropdown menu
5. Navbar is responsive on mobile (hamburger menu includes auth)
6. Active state highlighted when user is logged in

