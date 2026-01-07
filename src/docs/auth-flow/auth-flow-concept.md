# Authentication Journey Map - ATJ-ERP

## 🎯 Overview

This document maps the complete authentication journey for ATJ-ERP, a comprehensive ERP system for small and medium-sized businesses. The journey covers new user signup, returning user login, onboarding, and error handling.

**App Context:** ATJ-ERP helps SMBs manage inventory, production, accounting, HR, and operations in one unified platform.

**Main App Route:** `/dashboard` (protected route after authentication)

---

## 🆕 New User Path

### Step 1: Landing Page (Unauthenticated)
**Route:** `/`  
**Status:** Public, no authentication required

**What the user sees:**
- Hero section with tagline: "Streamline Your Business Operations with Modern ERP Solutions"
- Problem & Audience section explaining SMB challenges
- Solution section highlighting ATJ-ERP benefits:
  - Unified data across departments
  - Real-time inventory and financial tracking
  - Automated workflows
  - Scalable & affordable pricing
- Call-to-action section with email signup form (currently for early access)
- Footer with copyright

**What actions they can take:**
- Scroll to read about the product
- Enter email for early access (current implementation)
- **Future:** Click "Get Started" or "Sign Up" button (will redirect to `/sign-up`)

**What happens next:**
- User clicks "Get Started" → Redirects to `/sign-up`
- User clicks "Sign In" (if available) → Redirects to `/sign-in`
- User stays on page → Can continue reading or sign up later

**Decision points:**
- New user → Proceed to signup
- Returning user → Navigate to login
- Just browsing → Stay on landing page

---

### Step 2: Signup Page
**Route:** `/sign-up`  
**Status:** Public, accessible to unauthenticated users

**What the user sees:**
- Clerk `<SignUp />` component
- Email/password signup form
- Form fields:
  - Email address (required)
  - Password (required, with strength indicator)
  - Password confirmation (if configured)
- "Sign up" button
- Link to sign in page ("Already have an account? Sign in")
- Loading state during submission

**What actions they can take:**
- Enter email address
- Enter and confirm password
- Click "Sign up" button
- Click "Sign in" link to go to login page
- View password requirements (if shown)

**What happens next:**
- **Success:** Account created → Redirects to `/onboarding` (first-time user)
- **Error:** Show error message → User stays on page to fix issue
- **Email exists:** Show "Email already registered" → Suggest signing in instead

**Decision points:**
- Valid credentials → Proceed to onboarding
- Invalid email format → Show validation error
- Weak password → Show password requirements
- Email exists → Suggest login instead

---

### Step 3: Account Creation (Backend Process)
**Status:** Automatic, happens during signup

**What happens (behind the scenes):**
- Clerk creates user account
- User record created in Clerk's database
- Session token generated
- User metadata initialized (onboardingComplete: false)
- Supabase integration syncs user ID (if configured)

**What the user sees:**
- Brief loading state
- Success message (if shown)
- Automatic redirect to next step

**What happens next:**
- **First-time user:** Redirects to `/onboarding`
- **Error during creation:** Show error, stay on signup page

---

### Step 4: First Login / Session Start
**Route:** Automatic redirect after signup  
**Status:** Authenticated, session active

**What the user sees:**
- Brief loading state
- Session being established
- Automatic redirect to onboarding

**What happens (behind the scenes):**
- Clerk session token stored in cookies
- User authenticated state set
- Middleware checks authentication
- Onboarding status checked (onboardingComplete: false)

**What happens next:**
- User has not completed onboarding → Redirects to `/onboarding`
- User has completed onboarding → Redirects to `/dashboard` (shouldn't happen for new users)

---

### Step 5: Onboarding (3 Screens)
**Route:** `/onboarding`  
**Status:** Protected, requires authentication

**What the user sees:**

**Screen 1: Welcome**
- Headline: "Welcome to ATJ-ERP"
- Subheading: Core value proposition (e.g., "Your complete business management solution")
- Visual: Icon or illustration representing the platform
- Progress indicator: "1 of 3"
- Buttons:
  - "Next" (primary button)
  - "Skip" (secondary/link style)

**Screen 2: Key Feature**
- Headline: Explaining main feature (e.g., "Unified Data Management")
- Supporting text: Benefits of unified data across departments
- Tip box: Helpful context about the feature
- Visual: Icon or illustration
- Progress indicator: "2 of 3"
- Buttons:
  - "Next" (primary)
  - "Skip" (secondary/link)
  - "Back" (ghost/link style)

**Screen 3: Get Started**
- Headline: Prompting first action (e.g., "Ready to Get Started?")
- Quick tip: Encouragement or next steps
- Visual: Icon or illustration
- Progress indicator: "3 of 3"
- Buttons:
  - "Get Started" (primary)
  - "Skip" (secondary/link)
  - "Back" (ghost/link)

**What actions they can take:**
- Navigate between screens using "Next" and "Back" buttons
- Skip onboarding at any point using "Skip" button
- Complete onboarding by clicking "Get Started" on screen 3
- View progress through the 3 screens

**What happens next:**
- **User clicks "Get Started" or "Skip":**
  - Metadata updated: `onboardingComplete: true`
  - JWT token refreshed
  - Redirects to `/dashboard`
- **User navigates between screens:**
  - State updates, screen changes
  - Progress indicator updates
- **User clicks "Back":**
  - Returns to previous screen
  - Progress indicator decreases

**Decision points:**
- Complete onboarding → Go to dashboard
- Skip onboarding → Go to dashboard (same result)
- Navigate screens → Continue through onboarding

---

### Step 6: Main App Experience
**Route:** `/dashboard`  
**Status:** Protected, requires authentication + completed onboarding

**What the user sees:**
- Header with:
  - App logo/branding
  - Navigation menu
  - UserButton (avatar in top-right) with dropdown:
    - "Manage account" option
    - "Sign out" option
- Sidebar with module navigation:
  - Dashboard (current)
  - Warehouse
  - Production
  - Ledger
  - HR
  - Audit
  - Admin (if user has permissions)
- Main content area:
  - Dashboard home with:
    - Welcome message
    - Key metrics/stats
    - Recent activities
    - Quick actions
- Footer with copyright/links

**What actions they can take:**
- Navigate to different modules via sidebar
- View dashboard metrics and data
- Access user account via UserButton
- Sign out via UserButton dropdown
- Perform business operations (inventory, production, etc.)

**What happens next:**
- User navigates to modules → Loads module-specific pages
- User clicks UserButton → Opens account management modal
- User signs out → Redirects to landing page or sign-in
- User refreshes page → Session persists, stays on dashboard

**Decision points:**
- Navigate to module → Load module page
- Manage account → Open account settings
- Sign out → End session, return to public pages

---

## 🔄 Returning User Path

### Step 1: Direct Visit or Login Page
**Route:** `/` (landing) or `/sign-in` (direct)  
**Status:** Public, accessible to unauthenticated users

**What the user sees:**
- **If landing on `/`:** Same landing page as new users
- **If landing on `/sign-in`:** Clerk `<SignIn />` component with:
  - Email input field
  - Password input field
  - "Sign in" button
  - "Forgot password?" link (if configured)
  - Link to signup page ("Don't have an account? Sign up")
  - Loading state during submission

**What actions they can take:**
- Click "Sign In" from landing page → Go to `/sign-in`
- Enter email and password
- Click "Sign in" button
- Click "Forgot password?" (if available)
- Click "Sign up" link (if they don't have account)

**What happens next:**
- **Valid credentials:** Sign in successful → Redirects to `/dashboard`
- **Invalid credentials:** Show error → Stay on page
- **Session exists:** If already logged in → Redirects to `/dashboard`

**Decision points:**
- Valid login → Proceed to dashboard
- Invalid credentials → Show error, retry
- Forgot password → Go to password reset flow

---

### Step 2: Login (Authentication)
**Route:** `/sign-in`  
**Status:** Public, accessible to unauthenticated users

**What the user sees:**
- Clerk sign-in form
- Email and password fields
- "Sign in" button
- Error messages (if login fails)
- Loading state during authentication

**What actions they can take:**
- Enter email address
- Enter password
- Click "Sign in" button
- Click "Forgot password?" link
- Click "Sign up" link

**What happens (behind the scenes):**
- Clerk validates credentials
- Session token generated
- User metadata checked (onboardingComplete status)
- Middleware verifies authentication

**What happens next:**
- **Success + Onboarding complete:** Redirects to `/dashboard`
- **Success + Onboarding incomplete:** Redirects to `/onboarding` (unlikely for returning users)
- **Failure:** Show error message, stay on page

**Decision points:**
- Successful login → Go to dashboard
- Failed login → Show error, allow retry
- Onboarding incomplete → Redirect to onboarding (edge case)

---

### Step 3: Skip Onboarding (Already Seen)
**Route:** Automatic redirect  
**Status:** Authenticated, onboarding already completed

**What happens (behind the scenes):**
- Middleware checks `onboardingComplete` in session claims
- Status is `true` → Skip onboarding
- User redirected directly to `/dashboard`

**What the user sees:**
- Brief loading state
- Direct redirect to dashboard
- No onboarding screens shown

**What happens next:**
- User lands on `/dashboard`
- Can immediately start using the app

---

### Step 4: Main App Experience
**Route:** `/dashboard`  
**Status:** Protected, authenticated, onboarding complete

**What the user sees:**
- Same dashboard interface as new users after onboarding
- Full access to all modules based on permissions
- UserButton in header
- Sidebar navigation
- Dashboard content

**What actions they can take:**
- All actions available to authenticated users
- Navigate modules
- Perform business operations
- Manage account
- Sign out

**What happens next:**
- User continues working in the app
- Session persists across page refreshes
- Can access all protected routes

---

## ⚠️ Error States

### Error 1: Invalid Credentials
**When it occurs:** During login attempt

**What the user sees:**
- Error message: "Invalid email or password"
- Form remains filled (email stays, password cleared)
- Sign-in button re-enabled
- Option to retry

**What actions they can take:**
- Re-enter password
- Check email address
- Click "Forgot password?" if available
- Retry login

**What happens next:**
- **User corrects credentials:** Retry login → Success → Proceed to dashboard
- **User clicks "Forgot password":** Go to password reset flow
- **User gives up:** Stay on page or navigate away

**Recovery path:**
1. User sees error
2. User corrects email/password
3. User retries login
4. Success → Redirects to dashboard

---

### Error 2: Email Already Exists
**When it occurs:** During signup attempt

**What the user sees:**
- Error message: "An account with this email already exists"
- Suggestion: "Sign in instead?"
- Link to sign-in page
- Form remains (email stays)

**What actions they can take:**
- Click "Sign in" link → Go to login page
- Try different email address
- Use password reset if they forgot password

**What happens next:**
- **User clicks "Sign in":** Redirects to `/sign-in` with email pre-filled (if supported)
- **User uses different email:** Can proceed with signup
- **User stays:** Can retry with different email

**Recovery path:**
1. User sees "email exists" error
2. User clicks "Sign in" link
3. User goes to login page
4. User signs in with existing account
5. Success → Redirects to dashboard

---

### Error 3: Network Errors
**When it occurs:** During any auth operation (signup, login, session refresh)

**What the user sees:**
- Error message: "Network error. Please check your connection and try again."
- Retry button or option
- Loading state clears

**What actions they can take:**
- Check internet connection
- Click "Retry" button
- Refresh the page
- Try again later

**What happens next:**
- **Connection restored:** User retries → Success → Proceeds normally
- **Still offline:** User sees error, can try again later
- **Partial failure:** May need to refresh page

**Recovery path:**
1. User sees network error
2. User checks connection
3. User clicks "Retry"
4. Operation succeeds
5. User proceeds to next step

---

### Error 4: Session Expired
**When it occurs:** User's session token expires while using the app

**What the user sees:**
- Automatic redirect to `/sign-in`
- Message: "Your session has expired. Please sign in again."
- Option to sign in again
- Previous page URL preserved in redirect_url parameter

**What actions they can take:**
- Sign in again with credentials
- Session will be restored
- Redirected back to original page

**What happens next:**
- **User signs in:** Session restored → Redirects to original page (via redirect_url)
- **User doesn't sign in:** Stays on sign-in page

**Recovery path:**
1. User's session expires
2. User redirected to `/sign-in?redirect_url=/dashboard`
3. User signs in
4. User redirected back to `/dashboard`
5. User continues where they left off

---

### Error 5: Weak Password
**When it occurs:** During signup

**What the user sees:**
- Password validation error
- Password requirements shown:
  - Minimum length (e.g., 8 characters)
  - Must contain uppercase letter
  - Must contain lowercase letter
  - Must contain number
  - May require special character
- Password field highlighted
- Submit button disabled until requirements met

**What actions they can take:**
- Update password to meet requirements
- View password requirements
- See real-time validation feedback

**What happens next:**
- **Password meets requirements:** Validation passes → Can submit
- **Password still weak:** Cannot submit, must fix

**Recovery path:**
1. User enters weak password
2. User sees requirements
3. User updates password
4. Validation passes
5. User can submit signup

---

### Error 6: Invalid Email Format
**When it occurs:** During signup or login

**What the user sees:**
- Email validation error: "Please enter a valid email address"
- Email field highlighted
- Submit button disabled (or shows error on submit)

**What actions they can take:**
- Correct email format
- Check for typos
- Use valid email address

**What happens next:**
- **Valid email entered:** Validation passes → Can proceed
- **Still invalid:** Cannot proceed, must fix

**Recovery path:**
1. User enters invalid email
2. User sees validation error
3. User corrects email format
4. Validation passes
5. User can proceed

---

## 🔀 Decision Points & Branches

### Branch 1: New User vs Returning User
**Decision point:** User arrives at landing page

**New User Path:**
- Clicks "Get Started" → `/sign-up` → Account creation → Onboarding → Dashboard

**Returning User Path:**
- Clicks "Sign In" → `/sign-in` → Login → Dashboard (skip onboarding)

---

### Branch 2: Complete vs Skip Onboarding
**Decision point:** User on onboarding screens

**Complete Path:**
- Navigates through all 3 screens → Clicks "Get Started" → Dashboard

**Skip Path:**
- Clicks "Skip" on any screen → Dashboard (same result, metadata updated)

---

### Branch 3: Valid vs Invalid Credentials
**Decision point:** User submits login form

**Valid Path:**
- Credentials correct → Session created → Dashboard

**Invalid Path:**
- Credentials incorrect → Error shown → User can retry

---

### Branch 4: Onboarding Complete vs Incomplete
**Decision point:** Middleware checks onboarding status

**Complete Path:**
- `onboardingComplete: true` → Skip onboarding → Dashboard

**Incomplete Path:**
- `onboardingComplete: false` → Redirect to onboarding → Complete → Dashboard

---

### Branch 5: Authenticated vs Unauthenticated
**Decision point:** User tries to access protected route

**Authenticated Path:**
- Has valid session → Access granted → Load page

**Unauthenticated Path:**
- No session → Redirect to `/sign-in?redirect_url=/dashboard` → Login → Return to original page

---

## 📊 Journey Flow Diagram

```
┌─────────────────┐
│  Landing Page   │
│       (/)       │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌────────┐
│Sign Up │ │Sign In│
└───┬────┘ └───┬───┘
    │          │
    ▼          │
┌──────────────┘
│ Account Created
└───┬──────────────┐
    │              │
    ▼              │
┌──────────────┐   │
│  Onboarding  │   │
│  (3 screens) │   │
└───┬──────────┘   │
    │              │
    ▼              │
┌──────────────┐   │
│   Dashboard  │◄──┘
│  (Main App)  │
└──────────────┘
```

---

## 🎯 Key User Experience Principles

1. **Frictionless Signup:** Make account creation as simple as possible
2. **Clear Onboarding:** Help users understand value quickly (3 screens max)
3. **Skippable Onboarding:** Don't force users through if they want to skip
4. **Helpful Error Messages:** Clear, actionable error messages
5. **Session Persistence:** Users stay logged in across sessions
6. **Smart Redirects:** Return users to where they were trying to go
7. **Mobile-Friendly:** All flows work smoothly on mobile devices

---

## 📝 Notes for Implementation

- **Landing Page CTA:** Update "Get Early Access" form to redirect to `/sign-up` instead of just collecting email
- **Onboarding Content:** Customize 3 screens with ATJ-ERP-specific value propositions
- **Error Handling:** Implement clear, user-friendly error messages
- **Loading States:** Show appropriate loading indicators during auth operations
- **Redirect Logic:** Ensure users return to intended destination after login
- **Session Management:** Handle session expiration gracefully

---

**This journey map serves as the foundation for implementing the authentication flow with Clerk and Supabase.** 🚀
