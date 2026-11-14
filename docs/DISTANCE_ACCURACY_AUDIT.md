# Nisha Home Stay – Website Distance Accuracy Audit & Discrepancy Report

**Date of Verification:** 13 November 2026  
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

Following initial audit measurements and direct business-owner ground-truth review, the official business-specified distances and driving times are confirmed as:
* **Isha Yoga Center:** **Approximately 1.8 km** (approximately **8 minutes driving**).
* **Adiyogi Shiva Statue:** **Approximately 2.2 km** (approximately **10 minutes driving**).

All previous outdated references (`6.5 km`, `7.5 km`, `10–12 minutes`, `12–15 minutes`) and ambiguous conflations (*"10 Mins to Isha Yoga Center & Adiyogi"*) have been audited and replaced website-wide with consistent, centralized data.

---

## 2. Geographical Ground Truth & Location Verification

### 2.1 Origin Property Verification
* **Business Name:** Nisha Home Stay
* **Street Address:** 330/1, NGR Street, Semmedu, Coimbatore, Tamil Nadu – 641114, India
* **GPS Coordinates (Latitude, Longitude):** `10.9548572, 76.7594586`
* **Google Maps Property Listing / CID Link:** [https://maps.app.goo.gl/rpPwsUReKJ6btsKZ8](https://maps.app.goo.gl/rpPwsUReKJ6btsKZ8)
* **Embed Map Query:** `https://www.google.com/maps?q=Nisha%20Home%20Stay%2C%20330%2F1%20NGR%20Street%2C%20Semmedu%2C%20Tamil%20Nadu%20641114`
* **Pin Verification:** Verified against the registered Google Business Profile pin on NGR Street, Semmedu.

---

### 2.2 Destination 1: Isha Yoga Center
* **Entity Name:** Isha Yoga Center (Dhyanalinga & Main Visitor Welcome Point)
* **Destination Address:** Velliangiri Foothills, Ishana Vihar Post, Coimbatore, Tamil Nadu – 641114
* **Public Entrance / Gate Coordinates:** `10.9628° N, 76.7422° E` (`10.9628, 76.7422`)
* **Google Maps Destination Pin:** [https://maps.app.goo.gl/ekVWqvEzYhHTfuY78](https://maps.app.goo.gl/ekVWqvEzYhHTfuY78)
* **Business-Specified Ground Truth Distance:** **Approximately 1.8 km**
* **Driving Time:** **Approximately 8 minutes**
* **Standardized Sentence Format:** *"Isha Yoga Center is approximately 1.8 km from Nisha Home Stay (8 minutes driving)."*
* **Verification Date:** 13 November 2026

---

### 2.3 Destination 2: Adiyogi Shiva Statue
* **Entity Name:** Adiyogi Shiva Statue & Public Visitor Parking
* **Destination Address:** Isha Yoga Center Road, Velliangiri Foothills, Coimbatore, Tamil Nadu – 641114
* **Public Parking & Entrance Coordinates:** `10.9724° N, 76.7406° E` (`10.9724, 76.7406`)
* **Google Maps Destination Pin:** [https://maps.app.goo.gl/FvzeuENUoS5MA2Un6](https://maps.app.goo.gl/FvzeuENUoS5MA2Un6)
* **Business-Specified Ground Truth Distance:** **Approximately 2.2 km**
* **Driving Time:** **Approximately 10 minutes**
* **Standardized Sentence Format:** *"Adiyogi Shiva Statue is approximately 2.2 km from Nisha Home Stay (10 minutes driving)."*
* **Verification Date:** 13 November 2026

---

## 3. Website-Wide Distance Discrepancy & Resolution Table

| Page / Component | Outdated Distance / Content | Updated Ground Truth | Status | Action Taken |
|:---|:---|:---|:---:|:---|
| **Homepage (`/`)**<br/>Hero Badge (L342) | `10 Mins to Isha Yoga Center & Adiyogi` | `8 Mins to Isha • 10 Mins to Adiyogi` | **Resolved** | Unbundled the two destinations into distinct accurate travel times. |
| **Homepage (`/`)**<br/>Overview (L366) | `Located just 6.5 km (10 minutes) from Isha Yoga Center` | `Isha Yoga Center is approximately 1.8 km from Nisha Home Stay (8 minutes driving).` | **Resolved** | Applied standardized format with exact business values. |
| **Homepage (`/`)**<br/>Feature Card (L390-391) | `10 Mins to Isha`<br/>`6.5 km to Isha / 7.5 km to Adiyogi` | `8 MINS TO ISHA`<br/>`~1.8 km to Isha Yoga Center and ~2.2 km to Adiyogi` | **Resolved** | Updated badge and copy with 8 mins and 1.8 km / 2.2 km. |
| **Homepage (`/`)**<br/>Attractions (L639-647) | `Isha Yoga Center (6.5 km)` • `~10 minutes drive`<br/>`Adiyogi Shiva (7.5 km)` • `~12 minutes drive` | `Isha Yoga Center (~1.8 km)` • `~8 minutes driving`<br/>`Adiyogi Shiva Statue (~2.2 km)` • `~10 minutes driving` | **Resolved** | Standardized distance and travel-time metrics. |
| **Homepage (`/`)**<br/>Map Subtitle | `10 mins drive to Isha` | `Approximately 1.8 km (8 mins drive) to Isha Yoga Center` | **Resolved** | Updated map section subtext. |
| **Homepage (`/`)**<br/>Footer Summary & Links | `10 minutes from Isha`<br/>`Isha (6.5 km)` / `Adiyogi (7.5 km)` | `8 minutes from Isha Yoga Center (~1.8 km)`<br/>`Isha Yoga Center (1.8 km)` / `Adiyogi Shiva (2.2 km)` | **Resolved** | Updated footer summary and quick links. |
| **Isha Page (`/homestay-near-isha-yoga-center/`)**<br/>Hero & Meta | `~6.5 km, 10–12 mins`<br/>`10 MINUTES TO ISHA FOUNDATION` | `~1.8 km, 8 mins`<br/>`8 MINUTES TO ISHA FOUNDATION` | **Resolved** | Updated meta description, og:description, hero badge, and copy. |
| **Adiyogi Page (`/rooms-near-adiyogi/`)**<br/>Hero & Body | `12 minutes from Adiyogi`<br/>`7.5 km from Adiyogi complex` | `10 minutes from Adiyogi (~2.2 km)`<br/>`Approximately 2.2 km from Nisha Home Stay` | **Resolved** | Updated hero lead, spec cards, and copy. |
| **Location Page (`/location/`)**<br/>Table & Body | `Isha: 6.5 km (10–12 mins)`<br/>`Adiyogi: 7.5 km (12–15 mins)` | `Isha: Approximately 1.8 km (8 minutes)`<br/>`Adiyogi: Approximately 2.2 km (10 minutes)` | **Resolved** | Updated travel distance table and lead content. |
| **Rooms Page (`/rooms/`)**<br/>Footer Links | `Isha (6.5 km)` / `Adiyogi (7.5 km)` | `Isha Yoga Center (1.8 km)` / `Adiyogi Shiva (2.2 km)` | **Resolved** | Synchronized footer links. |
| **404 Page (`404.html`)**<br/>Quick Link & Footer | `Isha (~6.5 km)` / `10 minutes from Isha` | `Isha (~1.8 km)` / `8 minutes (~1.8 km)` | **Resolved** | Synchronized quick links and footer summary. |
| **All FAQ Sections & JSON-LD** | `approximately 6.5 km... about 7.5 km... 10 to 12 minutes` | `approximately 1.8 km from Nisha Home Stay (8 minutes driving) and Adiyogi Shiva Statue is approximately 2.2 km (10 minutes driving)` | **Resolved** | 100% verbatim synchronization between visible HTML accordions and JSON-LD schema. |

---

## 4. Centralization & Quality Assurance Verification

1. **Centralized Data Sources:**
   * [`data/locations.json`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/data/locations.json) configured as the master source of truth.
   * `window.NISHA_LOCATIONS` in [`script.js`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/script.js) exposed for client runtime components.
2. **Automated Audits:**
   * `scripts/audit_distances.js`: Confirmed **0 occurrences** of outdated distances (`6.5 km`, `7.5 km`, `10–12 minutes`, `12–15 minutes`).
   * `scripts/verify_new_distances.js`: Confirmed all new 1.8 km and 2.2 km values are correctly positioned and formatted.
3. **Structured Data Validation:**
   * `scripts/validate_all_schemas.js`: Validated all 5 pages against schema requirements with **0 errors and 0 warnings**.
4. **End-to-End Regression Test Suite:**
   * `scripts/run_qa_tests.js`: **134 / 134 assertions passed** across 5 viewports (320px, 360px, 375px, 390px, 1280px).
