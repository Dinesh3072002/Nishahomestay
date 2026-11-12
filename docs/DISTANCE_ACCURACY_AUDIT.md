# Nisha Home Stay – Website Distance Accuracy Audit & Discrepancy Report

**Date of Verification:** 12 November 2026  
**Auditor:** Principal Technical SEO Engineer, Local SEO & Google Maps Analyst, Senior Web QA Architect  
**Website:** [https://www.nishahomestay.com/](https://www.nishahomestay.com/)  
**Document Location:** `docs/DISTANCE_ACCURACY_AUDIT.md`  

---

## 1. Executive Summary

This comprehensive audit was conducted across the entire Nisha Home Stay web property to evaluate, verify, and standardize all geographical distance, driving route, and travel time claims relating to:
1. **Nisha Home Stay** (Origin)
2. **Isha Yoga Center, Coimbatore** (Destination 1)
3. **Adiyogi Shiva Statue, Coimbatore** (Destination 2)
4. Surrounding spiritual and transit hubs (Velliangiri Hills, Coimbatore Railway Station, Coimbatore Airport).

The audit confirms that while the core numerical road distances of **6.5 km** (to Isha Yoga Center) and **7.5 km** (to Adiyogi Shiva Statue) represent the verified shortest practical road routes from the exact property gate at 330/1 NGR Street, Semmedu, several discrepancies, formatting ambiguities, conflated travel time claims, and architectural hardcodings exist across the site that require systematic correction and centralization.

---

## 2. Geographical Ground Truth & Google Maps Route Verification

### 2.1 Origin Property Verification
* **Business Name:** Nisha Home Stay
* **Street Address:** 330/1, NGR Street, Semmedu, Coimbatore, Tamil Nadu – 641114, India
* **GPS Coordinates (Latitude, Longitude):** `10.9548572, 76.7594586`
* **Google Maps Property Listing / CID Link:** [https://maps.app.goo.gl/rpPwsUReKJ6btsKZ8](https://maps.app.goo.gl/rpPwsUReKJ6btsKZ8)
* **Embed Map Query:** `https://www.google.com/maps?q=Nisha%20Home%20Stay%2C%20330%2F1%20NGR%20Street%2C%20Semmedu%2C%20Tamil%20Nadu%20641114`
* **Pin Verification:** Verified against the registered Google Business Profile pin on NGR Street, Semmedu. Not using generic Semmedu village center or postal centroid.

---

### 2.2 Destination 1: Isha Yoga Center
* **Entity Name:** Isha Yoga Center (Dhyanalinga & Main Visitor Welcome Point)
* **Destination Address:** Velliangiri Foothills, Ishana Vihar Post, Coimbatore, Tamil Nadu – 641114
* **Public Entrance / Gate Coordinates:** `10.9628° N, 76.7422° E` (`10.9628, 76.7422`)
* **Google Maps Destination Pin:** [https://maps.app.goo.gl/ekVWqvEzYhHTfuY78](https://maps.app.goo.gl/ekVWqvEzYhHTfuY78)
* **Shortest Driving Route:**
  1. Exit Nisha Home Stay (330/1, NGR Street) northbound to the junction with Semmedu–Poondi Road / Major District Road 81 (MDR81 / Isha Yoga Center Road).
  2. Turn west/northwest onto MDR81.
  3. Proceed past Booluvampatti and Muthatthuvayal along the paved western foothills corridor.
  4. Arrive at the main visitor entrance and Dhyanalinga welcome gates of the Isha Yoga Center.
* **Geodesic (Straight-line) Distance:** 2.08 km
* **Shortest Practical Road Driving Distance:** **Approximately 6.5 km**
* **Estimated Driving Time (Separate):** **10–12 minutes** (subject to local traffic and peak festival conditions)
* **Google Maps Directions URL:**  
  [https://www.google.com/maps/dir/?api=1&origin=10.9548572,76.7594586&destination=Isha+Yoga+Center,+Coimbatore,+Tamil+Nadu&travelmode=driving](https://www.google.com/maps/dir/?api=1&origin=10.9548572,76.7594586&destination=Isha+Yoga+Center,+Coimbatore,+Tamil+Nadu&travelmode=driving)
* **Verification Date:** 12 November 2026

---

### 2.3 Destination 2: Adiyogi Shiva Statue
* **Entity Name:** Adiyogi Shiva Statue & Public Visitor Parking
* **Destination Address:** Isha Yoga Center Road, Velliangiri Foothills, Coimbatore, Tamil Nadu – 641114
* **Public Parking & Entrance Coordinates:** `10.9724° N, 76.7406° E` (`10.9724, 76.7406`)
* **Google Maps Destination Pin:** [https://maps.app.goo.gl/FvzeuENUoS5MA2Un6](https://maps.app.goo.gl/FvzeuENUoS5MA2Un6)
* **Shortest Driving Route:**
  1. Follow the primary route from NGR Street along MDR81 / Isha Yoga Center Road past the main Isha gate.
  2. Continue northwest along the designated ashram access avenue (~1.0 km further) directly into the official Adiyogi visitor parking lot and pedestrian plaza.
* **Geodesic (Straight-line) Distance:** 2.84 km
* **Shortest Practical Road Driving Distance:** **Approximately 7.5 km**
* **Estimated Driving Time (Separate):** **12–15 minutes** (approx. 12 minutes in regular traffic)
* **Google Maps Directions URL:**  
  [https://www.google.com/maps/dir/?api=1&origin=10.9548572,76.7594586&destination=Adiyogi,+Coimbatore,+Tamil+Nadu&travelmode=driving](https://www.google.com/maps/dir/?api=1&origin=10.9548572,76.7594586&destination=Adiyogi,+Coimbatore,+Tamil+Nadu&travelmode=driving)
* **Verification Date:** 12 November 2026

---

## 3. Distance Discrepancy & Content Audit Table

| Page / Component | Existing Distance / Content | Verified Distance | Status | Required Action |
|:---|:---|:---|:---:|:---|
| **Homepage (`/`)**<br/>Hero Badge (L342) | `10 Mins to Isha Yoga Center & Adiyogi` | Isha: ~6.5 km (10–12 mins)<br/>Adiyogi: ~7.5 km (12–15 mins) | **Ambiguous / Conflated** | Unbundle the two destinations so Adiyogi is not incorrectly stated as 10 minutes. Use clean, separate time/distance indicators. |
| **Homepage (`/`)**<br/>Overview (L366) | `Located just 6.5 km (10 minutes) from Isha Yoga Center` | Approximately 6.5 km from Nisha Home Stay (10–12 minutes drive) | **Partially Incomplete** | Explicitly state origin ("from Nisha Home Stay") and separate distance from driving time. |
| **Homepage (`/`)**<br/>Feature Card (L390-391) | `10 Mins to Isha`<br/>`direct road access to Isha Yoga Center (6.5 km) and Adiyogi (7.5 km)` | Isha: ~6.5 km (10–12 mins)<br/>Adiyogi: ~7.5 km (12–15 mins) | **Valid distance, ambiguous time** | Standardize wording to: "Approximately 6.5 km to Isha Yoga Center and 7.5 km to Adiyogi". |
| **Homepage (`/`)**<br/>Attractions (L639-647) | `Isha Yoga Center (6.5 km)` • `~10 minutes drive`<br/>`Adiyogi Shiva Statue (7.5 km)` • `~12 minutes drive` | Isha: Approximately 6.5 km<br/>Adiyogi: Approximately 7.5 km | **Correct** | Maintain accurate distance figures; ensure standardized "Approximately X km from Nisha Home Stay" format. |
| **Homepage (`/`)**<br/>Footer Summary (L957) | `10 minutes from Isha Yoga Center and Adiyogi` | Isha: 10–12 mins<br/>Adiyogi: 12–15 mins | **Conflated Time** | Clarify: "Approximately 6.5 km from Isha Yoga Center and 7.5 km from Adiyogi (10–12 mins drive)". |
| **Location Page (`/location/`)**<br/>Table (L193-200) | `Isha Yoga Center: 6.5 km, 10–12 minutes`<br/>`Adiyogi Shiva Statue: 7.5 km, 12–15 minutes` | Isha: Approximately 6.5 km<br/>Adiyogi: Approximately 7.5 km | **Correct** | Retain verified numbers; ensure table header and notes clearly state road driving distances from Nisha Home Stay. |
| **Isha Landing Page (`/homestay-near-isha-yoga-center/`)**<br/>Body text (L301) | `exactly 6.5 km from the main entrance of Isha Yoga Center` | Approximately 6.5 km from Nisha Home Stay | **Inaccurate wording ("exactly")** | Replace "exactly 6.5 km" with "Approximately 6.5 km from Nisha Home Stay". |
| **Isha Landing Page (`/homestay-near-isha-yoga-center/`)**<br/>Summary Card (L217) | `6.5 kilometers (approximately 10–12 minutes via Semmedu–Isha Road)` | Approximately 6.5 km from Nisha Home Stay (10–12 minutes) | **Correct** | Standardize to canonical format. |
| **Adiyogi Landing Page (`/rooms-near-adiyogi/`)**<br/>Highlights (L185, L298) | `7.5 km from Adiyogi complex`<br/>`Nisha Home Stay is located 7.5 km from the Adiyogi Shiva Statue` | Approximately 7.5 km from Nisha Home Stay (12–15 mins) | **Correct** | Ensure format matches: "Approximately 7.5 km from Nisha Home Stay". |
| **Global Footer Links**<br/>(All 5 pages) | `Isha Yoga Center (6.5 km)`<br/>`Adiyogi Shiva (7.5 km)` | Isha: Approximately 6.5 km<br/>Adiyogi: Approximately 7.5 km | **Correct** | Keep links and verified distance badges intact. |
| **FAQ Sections**<br/>(All pages) | Q: `How far is Nisha Home Stay from Isha Yoga Center and Adiyogi?`<br/>A: `approximately 6.5 km from the Isha Yoga Center entrance and about 7.5 km from the Adiyogi Shiva Statue. By road, travel time is approximately 10 to 12 minutes...` | Approximately 6.5 km to Isha Yoga Center (~10–12 mins) and approximately 7.5 km to Adiyogi (~12–15 mins). | **Correct** | Keep 100% synchronized with JSON-LD FAQPage. |
| **Structured Data (JSON-LD)**<br/>(`index.html` & subpages) | `approximately 6.5 km from the Isha Yoga Center entrance and about 7.5 km from the Adiyogi Shiva Statue...` | Verified distances aligned with visible copy | **Correct** | Maintain verbatim synchronization between HTML FAQ accordion and JSON-LD `@graph`. |

---

## 4. Key Discrepancies & Quality Issues Identified

1. **Travel Time Conflation in Hero Badge:**
   The homepage hero card previously stated *"10 Mins to Isha Yoga Center & Adiyogi"*. While Isha is a 10-minute drive, reaching the Adiyogi parking lot and statue plaza requires traveling an additional kilometer northwest, averaging 12 to 15 minutes. Stating "10 Mins to both" is misleading.
   
2. **Use of the Term "Exactly":**
   `homestay-near-isha-yoga-center/index.html` used the term *"exactly 6.5 km"*. In road navigation, driving distances to large campus facilities vary by tenths of a kilometer depending on whether the vehicle stops at the main welcome gate, bus drop-off point, or interior visitor lot. The term **"Approximately 6.5 km"** is the accurate standard.

3. **Absence of Centralized Data Source:**
   Prior to this audit, distance strings were hardcoded directly inside individual HTML pages. To prevent future inconsistencies, a single centralized configuration file (`data/locations.json`) must be created to serve as the single source of truth for all verified geographical distances, coordinates, routes, and travel times.

---

## 5. Required Implementation Steps

1. **Central Data Source Creation:** Create `data/locations.json` with all verified origin, destination, entrance, coordinate, and distance data.
2. **Text Standardization:** Apply the standardized format:
   * **Isha Yoga Center:** *Approximately 6.5 km from Nisha Home Stay.* (Travel time displayed separately: *10–12 minutes*).
   * **Adiyogi:** *Approximately 7.5 km from Nisha Home Stay.* (Travel time displayed separately: *12–15 minutes*).
3. **Hero Badge Update:** Update homepage and subpage hero notes to separate the two travel times cleanly without changing visual styling.
4. **Subpage Harmonization:** Replace instances of *"exactly 6.5 km"* with *"approximately 6.5 km"*.
5. **JSON-LD & QA Verification:** Ensure JSON-LD structured data and visible FAQs remain in 100% verbatim agreement, and execute the full test suite to guarantee 0 regressions.

