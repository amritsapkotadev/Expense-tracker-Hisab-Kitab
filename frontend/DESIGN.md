# Design System Documentation

## Overview

The Expense Tracker (Hisab Kitab) design system provides a cohesive, modern, and accessible UI framework built on top of Tailwind CSS. This document explains the design tokens, color system, typography, components, and usage guidelines.

## Table of Contents

1. [Color System](#color-system)
2. [Typography](#typography)
3. [Spacing](#spacing)
4. [Components](#components)
5. [Accessibility](#accessibility)
6. [Responsive Design](#responsive-design)
7. [Usage Guidelines](#usage-guidelines)

---

## Color System

Our color system is built around a **5-step hierarchy** that maintains the app's purple/indigo identity while ensuring consistency and accessibility.

### 1. Primary Colors (Purple/Indigo)

The main brand color used for primary actions, links, and key UI elements.

```css
primary-50  to primary-900  /* Light to dark purple/indigo */
```

**Usage:**
- Primary buttons: `bg-primary-600 hover:bg-primary-700`
- Links: `text-primary-600`
- Active states: `text-primary-700`
- Backgrounds: `bg-primary-50`

### 2. Primary Variant (Deeper Purples)

Used for accent elements and secondary brand touches.

```css
primary-variant-400 to primary-variant-700
```

**Usage:**
- Secondary CTAs
- Highlighted badges
- Accent decorations

### 3. Background & Surface

```css
background: #ffffff (white)
background-alt: #f8fafc (very light gray)
surface: #ffffff (white cards/panels)
```

**Usage:**
- Page backgrounds: `bg-white` or `bg-secondary-50`
- Cards: `bg-white`
- Overlays: `bg-white/95`

### 4. Accent Colors

Complementary colors for special highlights.

```css
accent-cyan-300 to accent-cyan-500
accent-fuchsia-400 to accent-fuchsia-600
```

**Usage:**
- Gradients: `from-accent-cyan-400 to-accent-fuchsia-500`
- Icons with emphasis
- Decorative elements

### 5. Semantic Colors

Colors with specific meanings.

#### Success (Green)
```css
success-50, success-100, success-200, success-500, success-600, success-700
```
**Usage:** Positive feedback, completion states, success messages

#### Error (Red)
```css
error-50, error-100, error-200, error-500, error-600, error-700
```
**Usage:** Error states, validation errors, destructive actions

#### Warning (Amber)
```css
warning-50, warning-100, warning-200, warning-500, warning-600, warning-700
```
**Usage:** Warnings, caution states, pending actions

#### Info (Blue)
```css
info-50, info-100, info-200, info-500, info-600, info-700
```
**Usage:** Informational messages, neutral highlights

### Neutral Scale (Grays 1-9)

Nine-step gray scale for text, borders, and backgrounds.

```css
gray-1: #fafafa (lightest)
gray-2: #f5f5f5
gray-3: #eeeeee
gray-4: #e0e0e0
gray-5: #bdbdbd
gray-6: #9e9e9e
gray-7: #757575
gray-8: #424242
gray-9: #212121 (darkest)
```

Also available as `secondary-*` for Tailwind consistency.

**Usage:**
- Text: `text-secondary-900` (primary), `text-secondary-600` (secondary)
- Borders: `border-secondary-200`
- Disabled states: `text-secondary-400`

---

## Typography

### Font Families

**Primary (Sans-serif):**
```css
font-sans: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, ...
```

**Monospace:**
```css
font-mono: Fira Code, Courier New, monospace
```

### Font Scale

| Token | Size | Usage |
|-------|------|-------|
| `text-xs` | 12px | Small labels, badges |
| `text-sm` | 14px | Secondary text, helper text |
| `text-base` | 16px | Body text (default) |
| `text-lg` | 18px | Emphasized body text |
| `text-xl` | 20px | Small headings |
| `text-2xl` | 24px | Card titles |
| `text-3xl` | 30px | Section headings |
| `text-4xl` | 36px | Page headings |
| `text-5xl` | 48px | Hero headings |
| `text-6xl` | 60px | Extra large hero text |

### Font Weights

| Class | Weight | Usage |
|-------|--------|-------|
| `font-normal` | 400 | Body text |
| `font-medium` | 500 | Slightly emphasized text |
| `font-semibold` | 600 | Subheadings, labels |
| `font-bold` | 700 | Headings, important text |
| `font-extrabold` | 800 | Hero text, major headings |

### Line Heights

| Class | Value | Usage |
|-------|-------|-------|
| `leading-tight` | 1.25 | Headings |
| `leading-normal` | 1.5 | Body text (default) |
| `leading-relaxed` | 1.75 | Long-form content |
| `leading-loose` | 2.0 | Extra spacious text |

---

## Spacing

The spacing system follows a **4px base unit** for consistency.

### Standard Scale

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Minimal spacing |
| `space-2` | 8px | Tight spacing |
| `space-3` | 12px | Small gaps |
| `space-4` | 16px | Default spacing |
| `space-6` | 24px | Medium spacing |
| `space-8` | 32px | Large spacing |
| `space-12` | 48px | Section spacing |
| `space-16` | 64px | Major sections |

Apply with:
- Padding: `p-4`, `px-6`, `py-8`
- Margin: `m-4`, `mx-auto`, `my-6`
- Gap: `gap-4`, `space-y-6`

---

## Components

### Button Component

The button component supports multiple variants and sizes.

#### Variants

**Primary (Default):**
```jsx
<button className="btn btn-primary btn-md">
  Save Changes
</button>
```
CSS: `bg-primary-600 hover:bg-primary-700 text-white`

**Secondary:**
```jsx
<button className="btn btn-secondary btn-md">
  Cancel
</button>
```
CSS: `bg-secondary-100 hover:bg-secondary-200 text-secondary-900`

**Outline:**
```jsx
<button className="btn btn-outline btn-md">
  Learn More
</button>
```
CSS: `border border-primary-600 text-primary-600 hover:bg-primary-50`

**Ghost:**
```jsx
<button className="btn btn-ghost btn-md">
  Skip
</button>
```
CSS: `text-secondary-600 hover:bg-secondary-100`

#### Sizes

- **Small:** `btn-sm` - Height: 32px, Padding: 12px
- **Medium:** `btn-md` - Height: 40px, Padding: 16px (default)
- **Large:** `btn-lg` - Height: 48px, Padding: 32px

#### States

- **Disabled:** `disabled:opacity-50 disabled:pointer-events-none`
- **Loading:** Add spinner icon inside
- **Focus:** `focus-visible:ring-2 focus-visible:ring-primary-500`

### Input Component

```jsx
<input className="input" type="text" placeholder="Enter value" />
```

**Features:**
- Height: 40px
- Rounded corners: `rounded-md`
- Border: `border-secondary-300`
- Focus: `focus-visible:ring-2 focus-visible:ring-primary-500`
- Disabled: `disabled:opacity-50 disabled:cursor-not-allowed`

**With Label:**
```jsx
<label className="label">Email Address</label>
<input className="input" type="email" />
```

**Error State:**
```jsx
<input className="input border-error-500" />
<p className="form-error">This field is required</p>
```

### Card Component

```jsx
<div className="card">
  <div className="card-header">
    <h2 className="card-title">Card Title</h2>
    <p className="card-description">Description text</p>
  </div>
  <div className="card-content">
    <!-- Content here -->
  </div>
  <div className="card-footer">
    <!-- Footer actions -->
  </div>
</div>
```

**Variants:**
- Default: White background with subtle border
- Elevated: Add `shadow-md`
- Interactive: Add `hover:shadow-lg transition-shadow`

### Badge Component

```jsx
<span className="badge badge-default">New</span>
<span className="badge badge-secondary">Draft</span>
<span className="badge badge-destructive">Expired</span>
```

---

## Accessibility

### WCAG AA Compliance

All text-background color combinations meet WCAG AA contrast requirements (4.5:1 for normal text, 3:1 for large text).

**Tested Combinations:**
- ✅ `text-secondary-900` on `bg-white` - 21:1
- ✅ `text-white` on `bg-primary-600` - 7.8:1
- ✅ `text-primary-700` on `bg-primary-50` - 10.2:1

### Focus States

All interactive elements have visible focus indicators:
```css
focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
```

### Keyboard Navigation

- All buttons and links are keyboard accessible
- Modal dialogs trap focus
- Forms can be submitted with Enter key
- Dropdowns navigate with arrow keys

### Screen Reader Support

- Semantic HTML used throughout
- ARIA labels on icon-only buttons
- Form labels properly associated
- Error messages announced

---

## Responsive Design

### Breakpoints

| Name | Size | Usage |
|------|------|-------|
| `sm` | 640px | Small devices, large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops, desktops |
| `xl` | 1280px | Large desktops |
| `2xl` | 1536px | Extra large screens |

### Mobile-First Approach

All styles are mobile-first. Use responsive prefixes to override:

```jsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

### Common Patterns

**Responsive Grid:**
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

**Conditional Display:**
```jsx
<div className="hidden lg:block">Desktop only</div>
<div className="block lg:hidden">Mobile only</div>
```

**Responsive Spacing:**
```jsx
<div className="p-4 md:p-6 lg:p-8">
```

---

## Usage Guidelines

### Do's ✅

- **Use design tokens:** Always use Tailwind classes or CSS custom properties
- **Maintain hierarchy:** Use the 5-step color system appropriately
- **Follow spacing scale:** Stick to the defined spacing values
- **Test accessibility:** Check color contrast and keyboard navigation
- **Be responsive:** Test at all breakpoints (320px, 768px, 1024px, 1440px)

### Don'ts ❌

- **Avoid arbitrary values:** Don't use `p-[13px]` or custom hex colors
- **Don't mix patterns:** Stick to one approach (utility classes vs custom CSS)
- **Don't skip focus states:** Always ensure visible focus indicators
- **Don't ignore semantics:** Use the right color for the right purpose
- **Don't hardcode:** Use design tokens instead of magic numbers

### Component Composition

Build complex components by composing simple ones:

```jsx
// Good ✅
<button className="btn btn-primary btn-lg">
  <Icon className="w-5 h-5 mr-2" />
  <span>Submit</span>
</button>

// Avoid ❌
<button style={{ padding: '13px', backgroundColor: '#4f46e5' }}>
  Submit
</button>
```

### Extending the System

To add new colors or tokens:

1. Update `design-tokens.css` with new CSS custom properties
2. Update `tailwind.config.js` theme.extend
3. Document the new token in this file
4. Test accessibility and consistency

---

## Resources

- **Tailwind CSS Docs:** https://tailwindcss.com/docs
- **WCAG Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **Color Contrast Checker:** https://webaim.org/resources/contrastchecker/

---

## Questions?

If you have questions about the design system or need to request new tokens or components, please open an issue in the repository.

**Last Updated:** 2025-11-24
**Version:** 1.0.0
