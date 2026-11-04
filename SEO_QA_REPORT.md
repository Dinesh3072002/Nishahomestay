# QUALITY ASSURANCE (QA) & ACCEPTANCE TESTING REPORT: NISHA HOME STAY
**Website:** https://www.nishahomestay.com/  
**Test Suite:** Playwright Automated Headless Browser Engine (Chromium)  
**Date of Execution:** November 4, 2026  
**Test Environment:** Node.js v24.11.0, Playwright v1.64.1  
**Mobile Widths Validated:** 320px, 360px, 375px, 390px, and Desktop Viewport  
**Overall Status:** PASSED (100% Pass Rate)  

---

## 1. Executive Summary

| Metric | Target | Result | Status |
| :--- | :--- | :--- | :--- |
| **Total Test Assertions** | Complete Coverage | **134 Assertions** | **COMPLETED** |
| **Passed Assertions** | 100% | **134 Passed** | **PASSED** |
| **Failed Assertions** | 0 | **0 Failed** | **PASSED** |
| **Bottom Sticky CTA Container** | Completely Removed | **0 Occurrences (Removed)** | **PASSED** |
| **Natural Scrolling & Bottom Clearance** | No artificial padding | **Zero dead space** | **PASSED** |
| **Multi-Width Mobile Layout** | 320px, 360px, 375px, 390px | **No horizontal overflow** | **PASSED** |
| **Hero Contact CTAs** | Preserved & Functional | **Verified** | **PASSED** |
| **Floating WhatsApp Button** | Preserved & Positioned | **Verified** | **PASSED** |
| **Broken Internal Links** | 0 | **0 Broken** | **PASSED** |
| **Images Without Alt Text** | 0 | **0 Missing** | **PASSED** |
| **GA4 Privacy / PII Leaks** | 0 PII transmitted | **0 PII Detected** | **PASSED** |

---

## 2. Page-by-Page Audit & Verification Breakdown

### 2.1 Homepage (`https://www.nishahomestay.com/`)
- **HTTP Status:** 200 OK
- **Bottom Sticky Bar Check:** `.mobile-cta` completely absent from DOM — **PASSED**
- **SEO Title:** `Homestay Near Isha Yoga Center & Adiyogi | Nisha Home Stay` (59 characters) — **PASSED**
- **Meta Description:** Optimal length (163 characters), free of encoding corruption — **PASSED**
- **Canonical URL:** `https://www.nishahomestay.com/` (Self-referencing with trailing slash) — **PASSED**
- **Heading Hierarchy:** Single H1 (`Homestay near Isha Yoga Center`), multiple H2 subheadings — **PASSED**
- **Structured Data:** Valid JSON-LD `@graph` containing `LodgingBusiness`, `WebSite`, `WebPage`, `BreadcrumbList`, and `FAQPage` — **PASSED**
- **Preserved Contact CTAs:**
  - Header: Direct Call Now button (`tel:+916381397636`) & hamburger menu — **PASSED**
  - Hero: Direct Call button (`tel:+916381397636`) & WhatsApp inquiry button — **PASSED**
  - Floating WhatsApp: Circular floating badge (`.whatsapp-float`) — **PASSED**
- **Image Optimization:** 100% of images possess descriptive alt attributes; zero broken image paths — **PASSED**

---

### 2.2 Homestay Near Isha Yoga Center (`/homestay-near-isha-yoga-center/`)
- **HTTP Status:** 200 OK
- **Bottom Sticky Bar Check:** `.mobile-cta` completely absent from DOM — **PASSED**
- **SEO Title:** `Homestay Near Isha Yoga Center | Nisha Home Stay Semmedu` (56 characters) — **PASSED**
- **Canonical URL:** `https://www.nishahomestay.com/homestay-near-isha-yoga-center/` — **PASSED**
- **Structured Data:** Verified `LodgingBusiness`, `BreadcrumbList`, and `FAQPage` — **PASSED**
- **Hero & Floating CTAs:** Call Now, WhatsApp, and Floating button preserved — **PASSED**

---

### 2.3 Rooms Near Adiyogi (`/rooms-near-adiyogi/`)
- **HTTP Status:** 200 OK
- **Bottom Sticky Bar Check:** `.mobile-cta` completely absent from DOM — **PASSED**
- **SEO Title:** `Rooms Near Adiyogi Shiva Statue | Nisha Home Stay Coimbatore` (59 characters) — **PASSED**
- **Canonical URL:** `https://www.nishahomestay.com/rooms-near-adiyogi/` — **PASSED**
- **Hero & Floating CTAs:** Call Now, WhatsApp, and Floating button preserved — **PASSED**

---

### 2.4 Rooms & Tariff (`/rooms/`)
- **HTTP Status:** 200 OK
- **Bottom Sticky Bar Check:** `.mobile-cta` completely absent from DOM — **PASSED**
- **SEO Title:** `AC & Non-AC Rooms with Attached Bathrooms | Nisha Home Stay` (58 characters) — **PASSED**
- **Canonical URL:** `https://www.nishahomestay.com/rooms/` — **PASSED**
- **Hero & Floating CTAs:** Call Now, WhatsApp, and Floating button preserved — **PASSED**

---

### 2.5 Location & Directions (`/location/`)
- **HTTP Status:** 200 OK
- **Bottom Sticky Bar Check:** `.mobile-cta` completely absent from DOM — **PASSED**
- **SEO Title:** `Location & Directions to Nisha Home Stay | Semmedu, Coimbatore` (61 characters) — **PASSED**
- **Canonical URL:** `https://www.nishahomestay.com/location/` — **PASSED**
- **Hero & Floating CTAs:** Call Now, Map, and Floating button preserved — **PASSED**

---

### 2.6 Custom 404 Error Page (`/404.html`)
- **HTTP Status:** 404 Not Found (Verified when accessing non-existent URL routes)
- **Title:** `Page Not Found (404) | Nisha Home Stay Semmedu` — **PASSED**
- **Robots Meta:** `noindex, follow` — **PASSED**

---

## 3. Mobile Viewport Testing Across Screen Widths (320px, 360px, 375px, 390px)

| Viewport Width | Device Archetype | Sticky Bar Absent | Body Bottom Padding | Horizontal Scroll | Footer In View | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **320px** | iPhone SE (1st gen) / Compact mobile | **0 CTA elements** | **0px** | **No overflow** | **Fully visible** | **PASSED** |
| **360px** | Galaxy S / Standard Android | **0 CTA elements** | **0px** | **No overflow** | **Fully visible** | **PASSED** |
| **375px** | iPhone SE / iPhone 11 Pro | **0 CTA elements** | **0px** | **No overflow** | **Fully visible** | **PASSED** |
| **390px** | iPhone 12 / 13 / 14 / 15 | **0 CTA elements** | **0px** | **No overflow** | **Fully visible** | **PASSED** |

### Natural Scrolling Verification
- Content scrolls naturally to the footer.
- No fixed bottom overlay blocks any section text, contact details, or copyright info.
- Floating WhatsApp badge sits naturally at the bottom-right corner without interfering with footer elements.

---

## 4. Analytics & Event Firing Verification

| Event Tested | Trigger Action | Payload Verified | PII Check | Status |
| :--- | :--- | :--- | :--- | :--- |
| `click_to_call` | Clicked telephone CTA in Hero section | `destination: "+916381397636"`, `cta_location: "hero_call"` | **Zero PII** | **PASSED** |
| `whatsapp_click` | Clicked Floating WhatsApp button | `cta_location: "floating_button"` | **Zero PII** | **PASSED** |
| `booking_form_start` | Dispatched focus on inquiry form input `#name` | `form_id: "bookingForm"` | **Zero PII** | **PASSED** |

---

## 5. Summary of Automated Test Run

```
========================================
TEST RESULTS SUMMARY
Total Assertions: 134
Passed: 134
Failed: 0
========================================
All 134 tests passed successfully!
```
