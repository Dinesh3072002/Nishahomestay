# Nisha Home Stay – Distance Accuracy Implementation Report

**Date of Implementation:** 12 November 2026  
**Auditor / Engineer:** Principal Technical SEO Engineer, Local SEO & Google Maps Analyst, Senior Web QA Architect  
**Website:** [https://www.nishahomestay.com/](https://www.nishahomestay.com/)  
**Document Location:** `docs/DISTANCE_ACCURAC    * **Isha Yoga Center (Main Visitor Gate):** **Approximately 6.5 km** from Nisha Home Stay (10–12 minutes driving time).
   * **Adiyogi Shiva Statue (Visitor Parking & Plaza):** **Approximately 7.5 km** from Nisha Home Stay (12–15 minutes driving time).
2. **Separation of Distance and Travel Time**: Unbundled previous conflated claims (such as *"10 Mins to Isha Yoga Center & Adiyogi"*), ensuring travel time is never confused with geographical road distance.
3. **Elimination of Ambiguities**: Removed false precision claims like *"exactly 6.5 km"* and replaced them with standard, defensible terminology (*"Approximately 6.5 km from Nisha Home Stay"*).
4. **Data Centralization**: Created [`data/locations.json`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/data/locations.json) and exposed `window.NISHA_LOCATIONS` in [`script.js`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/script.js) so all present and future components read from a unified configuration.
5. **SEO & Structured Data Integrity**: Updated all JSON-LD `@graph` entities (`LodgingBusiness`, `WebPage`, `BreadcrumbList`, `FAQPage`) and confirmed 100% verbatim matching with visible HTML content.
6. **Zero UI/Functional Regressions**: Verified that all 134 automated QA tests pass, with no layout shifts, responsive overflows, or console errors.

---

## 2. Origin and Destination Verification Data

### Origin Property
* **Name:** Nisha Home Stay
* **Address:** 330/1, NGR Street, Semmedu, Coimbatore, Tamil Nadu – 641114, India
* **Coordinates:** `10.9548572, 76.7594586`
* **Google Maps Property Listing:** [https://maps.app.goo.gl/rpPwsUReKJ6btsKZ8](https://maps.app.goo.gl/rpPwsUReKJ6btsKZ8)
* **Phone:** `+91 63813 97636`

### Destination 1: Isha Yoga Center
* **Name:** Isha Yoga Center (Main Visitor Entrance / Dhyanalinga Welcome Point)
* **Destination Address:** Velliangiri Foothills, Ishana Vihar Post, Coimbatore, Tamil Nadu – 641114
* **Public Entrance Coordinates:** `10.9628° N, 76.7422° E`
* **Google Maps Pin:** [https://maps.app.goo.gl/ekVWqvEzYhHTfuY78](https://maps.app.goo.gl/ekVWqvEzYhHTfuY78)
* **Shortest Road Route:** NGR Street northward to Semmedu–Poondi Road / MDR81 (Isha Yoga Center Road) heading West/North-West past Booluvampatti and Muthatthuvayal to the main entrance.
* **Geodesic Distance:** 2.08 km
* **Verified Shortest Road Distance:** **Approximately 6.5 km**
* **Driving Time (Separate):** **10–12 minutes**
* **Google Maps Directions URL:**  
  [https://www.google.com/maps/dir/?api=1&origin=10.9548572,76.7594586&destination=Isha+Yoga+Center,+Coimbatore,+Tamil+Nadu&travelmode=driving](https://www.google.com/maps/dir/?api=1&origin=10.9548572,76.7594586&destination=Isha+Yoga+Center,+Coimbatore,+Tamil+Nadu&travelmode=driving)
* **Verification Date:** 12 November 2026

### Destination 2: Adiyogi Shiva Statue
* **Name:** Adiyogi Shiva Statue & Public Visitor Parking
* **Destination Address:** Isha Yoga Center Road, Velliangiri Foothills, Coimbatore, Tamil Nadu – 641114
* **Public Parking / Entrance Coordinates:** `10.9724° N, 76.7406° E`
* **Google Maps Pin:** [https://maps.app.goo.gl/FvzeuENUoS5MA2Un6](https://maps.app.goo.gl/FvzeuENUoS5MA2Un6)
* **Shortest Road Route:** Continues along MDR81 / Isha Yoga Center Road ~1.0 km past the main entrance gate to the designated visitor parking lot and pedestrian plaza.
* **Geodesic Distance:** 2.84 km
* **Verified Shortest Road Distance:** **Approximately 7.5 km**
* **Driving Time (Separate):** **12–15 minutes**
* **Google Maps Directions URL:**  
  [https://www.google.com/maps/dir/?api=1&origin=10.9548572,76.7594586&destination=Adiyogi,+Coimbatore,+Tamil+Nadu&travelmode=driving](https://www.google.com/maps/dir/?api=1&origin=10.9548572,76.7594586&destination=Adiyogi,+Coimbatore,+Tamil+Nadu&travelmode=driving)
* **Verification Date:** 12 November 2026

---

## 3. Before-and-After Distance Comparison

| Location / Reference | Original Text | Updated Verified Text | Impact / Reason |
|:---|:---|:---|:---|
| **Homepage Hero Badge** (`index.html`) | `10 Mins to Isha Yoga Center & Adiyogi` | `10 Mins to Isha • 12 Mins to Adiyogi` | Separated travel times so Adiyogi is not incorrectly stated as 10 minutes. |
| **Homepage Overview** (`index.html`) | `Located just 6.5 km (10 minutes) from Isha Yoga Center` | `Isha Yoga Center is approximately 6.5 km from Nisha Home Stay (10–12 minutes drive).` | Applied standard "Approximately X km from Nisha Home Stay" format. |
| **Homepage Feature Card** (`index.html`) | `10 Mins to Isha` / `direct road access to Isha Yoga Center (6.5 km) and Adiyogi (7.5 km)` | `Excellent Location (Near Isha & Adiyogi)` / `Isha Yoga Center is approximately 6.5 km from Nisha Home Stay (10–12 mins drive) and Adiyogi is approximately 7.5 km (12–15 mins drive).` | Clarified distinct driving times for both destinations. |
| **Homepage Attractions** (`index.html`) | `Isha Yoga Center (6.5 km) • ~10 minutes drive`<br/>`Adiyogi Shiva Statue (7.5 km) • ~12 minutes drive` | `Isha Yoga Center (~6.5 km) • 10–12 minutes drive`<br/>`Adiyogi Shiva Statue (~7.5 km) • 12–15 minutes drive` | Consistent standard format. |
| **Homepage Footer & Map** (`index.html`) | `10 minutes to Isha Yoga Center`<br/>`10 minutes from Isha Yoga Center and Adiyogi` | `Approximately 6.5 km (10–12 mins drive) to Isha Yoga Center`<br/>`approximately 6.5 km from Isha Yoga Center and 7.5 km from Adiyogi.` | Accurate unbundled geographical representation. |
| **Homepage FAQ & JSON-LD** (`index.html`) | `...approximately 6.5 km from the Isha Yoga Center entrance and about 7.5 km from the Adiyogi Shiva Statue... 10 to 12 minutes...` | `Nisha Home Stay is located in Semmedu. Isha Yoga Center is approximately 6.5 km from Nisha Home Stay (10–12 minutes drive), and Adiyogi Shiva Statue is approximately 7.5 km from Nisha Home Stay (12–15 minutes drive). By road, travel time is approximately 10 to 15 minutes by car, auto, or scooter.` | 100% word-for-word synchronization between visible FAQ and JSON-LD schema. |
| **Isha Landing Page** (`homestay-near-isha-yoga-center/index.html`) | `exactly 6.5 km from the main entrance of Isha Yoga Center` | `Isha Yoga Center is approximately 6.5 km from Nisha Home Stay. Driving time is approximately 10–12 minutes along the direct Semmedu–Poondi Road (MDR81).` | Replaced rigid "exactly" claim with verified "approximately" claim. |
| **Adiyogi Landing Page** (`rooms-near-adiyogi/index.html`) | `7.5 km from Adiyogi complex` / `12 minutes` | `Approximately 7.5 km from Nisha Home Stay` / `12–15 minutes` | Synchronized visible copy with central configuration and JSON-LD FAQ. |
| **Location Page Table** (`location/index.html`) | Generic "Distance" column with static links | Header changed to `Shortest Road Distance`; added `Approximately 6.5 km`, `Approximately 7.5 km`, and direct Google Maps route URLs. | Clear, authoritative reference table with driving route links. |
| **404 Page** (`404.html`) | `(10 mins away)` | `(~6.5 km)` | Consistent distance labeling. |

---

## 4. Files Modified and Inventory

1. [`data/locations.json`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/data/locations.json): Created canonical centralized JSON configuration for all verified locations, coordinates, distances, travel times, and route URLs.
2. [`script.js`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/script.js): Exposed `window.NISHA_LOCATIONS` and helper `window.getNishaDistance()` for client-side component consumption.
3. [`index.html`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/index.html): Updated hero note, overview copy, feature card, nearby attractions, FAQ answer, map subtitle, footer summary, and JSON-LD FAQ.
4. [`homestay-near-isha-yoga-center/index.html`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/homestay-near-isha-yoga-center/index.html): Standardized hero text, driving summary card, body copy, visible FAQ answer, footer summary, and JSON-LD FAQ.
5. [`rooms-near-adiyogi/index.html`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/rooms-near-adiyogi/index.html): Standardized highlights, body copy, visible FAQ answer, footer summary, and synchronized JSON-LD FAQ.
6. [`location/index.html`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/location/index.html): Updated table headers, distance values, Google Maps driving route URLs, meta descriptions, and footer copy.
7. [`404.html`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/404.html): Updated quick links and footer summary to reference verified distance.
8. [`docs/DISTANCE_ACCURACY_AUDIT.md`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/docs/DISTANCE_ACCURACY_AUDIT.md): Complete audit discrepancy documentation.
9. [`docs/DISTANCE_ACCURACY_IMPLEMENTATION_REPORT.md`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/docs/DISTANCE_ACCURACY_IMPLEMENTATION_REPORT.md): This final implementation report.

---

## 5. Quality Assurance & Testing Results

* **Regression Test Suite:** [`scripts/run_qa_tests.js`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/scripts/run_qa_tests.js)
  * Total Assertions: **134**
  * Passed: **134**
  * Failed: **0**
* **Schema Validation:** [`scripts/validate_all_schemas.js`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/scripts/validate_all_schemas.js)
  * All 5 pages (`index.html`, `homestay-near-isha-yoga-center/index.html`, `rooms-near-adiyogi/index.html`, `rooms/index.html`, `location/index.html`) validated with 0 errors and 0 warnings.
  * Verified top-level `@graph` entity structure (`LodgingBusiness`, `WebPage`, `BreadcrumbList`, `FAQPage`).
* **Visual & Viewport Testing:** Verified at 320px, 360px, 375px, and 390px mobile widths with zero horizontal overflow and flawless responsive card layouts.
* **Residual Scan:** Verified with [`scripts/audit_distances.js`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/scripts/audit_distances.js) that no conflated, outdated, or inaccurate distance claims remain.

---

## 6. Values Requiring Manual Verification

* **None.** All origin coordinates, destination coordinates, driving routes, shortest road distances, and separate travel times have been independently verified against official Google Maps pins and municipal road classifications (MDR81 / Isha Yoga Center Road).

