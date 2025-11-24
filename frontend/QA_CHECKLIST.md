# QA Checklist - UI Redesign

## Accessibility Testing

### Color Contrast (WCAG AA)
- [ ] Primary text on white background (contrast ratio ≥ 4.5:1)
- [ ] Secondary text on white background (contrast ratio ≥ 4.5:1)
- [ ] White text on primary-600 background (contrast ratio ≥ 4.5:1)
- [ ] Button text contrast meets requirements
- [ ] Link text contrast meets requirements
- [ ] Error message text contrast meets requirements
- [ ] Success message text contrast meets requirements
- [ ] Large text (≥18pt) on colored backgrounds (contrast ratio ≥ 3:1)

### Keyboard Navigation
- [ ] All interactive elements are keyboard accessible (Tab key)
- [ ] Focus indicators are clearly visible on all focusable elements
- [ ] Focus order is logical and follows visual layout
- [ ] Modal dialogs trap focus correctly
- [ ] Dropdown menus can be navigated with arrow keys
- [ ] Forms can be submitted with Enter key
- [ ] ESC key closes modals and dropdowns
- [ ] No keyboard traps (can always tab away)

### Screen Reader Support
- [ ] All images have appropriate alt text
- [ ] Form labels are properly associated with inputs
- [ ] Icon-only buttons have aria-labels
- [ ] Error messages are announced
- [ ] Page titles are descriptive
- [ ] Headings follow proper hierarchy (h1, h2, h3, etc.)
- [ ] Interactive elements have descriptive names
- [ ] Loading states are announced

### ARIA and Semantic HTML
- [ ] Semantic HTML elements used (nav, main, aside, etc.)
- [ ] ARIA roles used appropriately
- [ ] ARIA states updated dynamically (aria-expanded, aria-selected, etc.)
- [ ] ARIA live regions for dynamic content
- [ ] No redundant ARIA (don't add role="button" to <button>)

---

## Responsive Design Testing

### Breakpoint Testing

#### Mobile - 320px (iPhone SE)
- [ ] All content is readable without horizontal scroll
- [ ] Touch targets are at least 44x44px
- [ ] Navigation is accessible (mobile menu works)
- [ ] Forms are usable on small screens
- [ ] Cards stack properly
- [ ] Images scale appropriately
- [ ] Text doesn't overflow containers
- [ ] Bottom navigation is visible and functional

#### Mobile - 375px (iPhone 12)
- [ ] Layout looks balanced
- [ ] Spacing is appropriate
- [ ] All features are accessible

#### Tablet - 768px (iPad)
- [ ] Layout transitions smoothly from mobile
- [ ] Grid layouts appear (2 columns where appropriate)
- [ ] Sidebar transitions appropriately
- [ ] Forms use available space well
- [ ] Charts and graphs are readable

#### Desktop - 1024px (iPad Pro, Small Laptop)
- [ ] Sidebar is visible (desktop layout)
- [ ] 3-column grids appear where appropriate
- [ ] Content doesn't look stretched
- [ ] Navigation is in desktop mode
- [ ] All components use desktop styling

#### Large Desktop - 1440px (Standard Desktop)
- [ ] Content is centered with max-width
- [ ] Images maintain quality
- [ ] Layout doesn't feel empty
- [ ] 4-column grids appear where appropriate

#### Extra Large - 1920px+ (4K Monitors)
- [ ] Content has appropriate max-width
- [ ] No excessive white space
- [ ] Text remains readable
- [ ] Images scale well

### Orientation Testing
- [ ] Landscape mode works on mobile/tablet
- [ ] Portrait mode works on mobile/tablet
- [ ] Content reflows appropriately

---

## Visual Consistency Testing

### Typography
- [ ] Consistent font family across all pages
- [ ] Proper heading hierarchy (h1 > h2 > h3)
- [ ] Line heights are comfortable for reading
- [ ] Text alignment is appropriate
- [ ] Font sizes follow the design system scale

### Spacing
- [ ] Consistent padding on cards
- [ ] Consistent margins between sections
- [ ] Consistent gap in grid layouts
- [ ] No unusual spacing inconsistencies
- [ ] Proper use of spacing scale (4px increments)

### Colors
- [ ] Primary colors used consistently for CTAs
- [ ] Secondary colors used consistently for cancel/back actions
- [ ] Error states use error color consistently
- [ ] Success states use success color consistently
- [ ] Warning states use warning color consistently
- [ ] Info states use info color consistently
- [ ] Neutral grays used consistently for text/borders

### Components
- [ ] All buttons follow same style patterns
- [ ] All inputs follow same style patterns
- [ ] All cards follow same style patterns
- [ ] All badges follow same style patterns
- [ ] All modals follow same style patterns
- [ ] All toasts/alerts follow same style patterns

---

## Functional Testing

### Authentication Pages

#### Welcome Page
- [ ] Hero section displays correctly
- [ ] Feature cards are visible and styled
- [ ] CTA buttons work (navigate to signup/login)
- [ ] Responsive layout at all breakpoints
- [ ] Animations load smoothly

#### Login Page
- [ ] Form fields are styled correctly
- [ ] Password toggle (show/hide) works
- [ ] Validation errors display properly
- [ ] Submit button shows loading state
- [ ] "Forgot Password" link works
- [ ] "Sign up" link works
- [ ] Form submits correctly

#### Signup Page
- [ ] All form fields styled correctly
- [ ] Password strength indicator works
- [ ] Password requirements are visible
- [ ] Confirm password validation works
- [ ] Form validation works
- [ ] Submit button shows loading state
- [ ] "Sign in" link works

#### Forgot Password Page
- [ ] Form is styled correctly
- [ ] Email validation works
- [ ] Submit button shows loading state
- [ ] Success/error messages display

#### Reset Password Page
- [ ] New password field styled
- [ ] Confirm password field styled
- [ ] Password strength indicator works
- [ ] Form validation works
- [ ] Submit button shows loading state

#### Verify OTP Page
- [ ] OTP input fields styled
- [ ] Resend OTP button works
- [ ] Validation works
- [ ] Success/error messages display

### Dashboard Pages

#### Dashboard
- [ ] Summary cards display correctly
- [ ] Stats are formatted properly
- [ ] Charts render correctly
- [ ] Recent expenses list displays
- [ ] "Add Expense" button works
- [ ] "View All" link works
- [ ] Loading states work
- [ ] Empty states display when no data

#### Expense List
- [ ] Table/list displays correctly
- [ ] Pagination works
- [ ] Filters work
- [ ] Search works
- [ ] Sort functionality works
- [ ] Edit/Delete actions work
- [ ] Empty state displays when no expenses

#### Add/Edit Expense
- [ ] Form fields styled correctly
- [ ] Date picker works
- [ ] Category dropdown works
- [ ] Amount input validates
- [ ] Form validation works
- [ ] Submit button shows loading state
- [ ] Success message displays
- [ ] Redirects after save

#### Profile Page
- [ ] User info displays correctly
- [ ] Avatar/profile picture displays
- [ ] Edit form works
- [ ] Save button shows loading state
- [ ] Success/error messages display

#### Reports Page
- [ ] Charts render correctly
- [ ] Filters work
- [ ] Date range selector works
- [ ] Download buttons work
- [ ] Data displays accurately

#### Download CSV
- [ ] Date range selector works
- [ ] Download button works
- [ ] File downloads correctly
- [ ] Success message displays

### Navigation

#### Sidebar (Desktop)
- [ ] All menu items visible
- [ ] Active state shows current page
- [ ] Icons display correctly
- [ ] Hover states work
- [ ] Links navigate correctly
- [ ] Logout link works
- [ ] Profile section displays user info

#### Mobile Navigation
- [ ] Bottom nav bar displays
- [ ] All icons visible
- [ ] Active state shows current page
- [ ] Tap targets are large enough
- [ ] Navigation works correctly

---

## Browser Compatibility

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers
- [ ] Safari iOS (latest)
- [ ] Chrome Android (latest)
- [ ] Samsung Internet
- [ ] Firefox Mobile

---

## Performance Testing

### Load Time
- [ ] Initial page load < 3 seconds
- [ ] Fonts load without FOUT/FOIT
- [ ] Images load progressively
- [ ] CSS loads without blocking

### Animations
- [ ] Animations are smooth (60fps)
- [ ] No janky transitions
- [ ] Reduced motion respected (prefers-reduced-motion)
- [ ] Loading spinners don't freeze

### Bundle Size
- [ ] CSS bundle size is reasonable
- [ ] No unused CSS included
- [ ] Images are optimized
- [ ] No duplicate dependencies

---

## Edge Cases

### Error States
- [ ] Form validation errors display clearly
- [ ] Network error messages are helpful
- [ ] 404 page is styled
- [ ] 500 error page is styled
- [ ] Empty states are informative

### Long Content
- [ ] Long names/titles don't break layout
- [ ] Long amounts display correctly
- [ ] Long descriptions wrap properly
- [ ] Overflow is handled with ellipsis or scroll

### Empty States
- [ ] No expenses: helpful empty state with CTA
- [ ] No reports: informative empty state
- [ ] No search results: clear message
- [ ] Loading states are visible

---

## Notes

Document any issues found during testing:

```
Issue: [Description]
Page: [Page name]
Breakpoint: [320px, 768px, etc.]
Browser: [Chrome, Safari, etc.]
Severity: [Low, Medium, High, Critical]
Status: [Open, Fixed, Deferred]
```

---

**Testing Date:** ___________
**Tested By:** ___________
**Sign-off:** ___________
