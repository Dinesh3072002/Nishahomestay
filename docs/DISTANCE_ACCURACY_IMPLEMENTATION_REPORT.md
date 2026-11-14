# Nisha Home Stay – Distance Accuracy Implementation Report

**Date of Implementation:** 13 November 2026  
**Auditor / Engineer:** Principal Technical SEO Engineer, Local SEO & Google Maps Analyst, Senior Web QA Architect  
**Website:** [https://www.nishahomestay.com/](https://www.nishahomestay.com/)  
**Document Location:** `docs/DISTANCE_ACCURACY_IMPLEMENTATION_REPORT.md`  

---

## 1. Executive Summary

This report documents the website-wide implementation of verified geographical distances and driving times for Nisha Home Stay (`330/1, NGR Street, Semmedu, Coimbatore, Tamil Nadu 641114`).

All previously outdated, inflated, or conflated values (`6.5 km`, `7.5 km`, `10–12 mins`, `12–15 mins`) have been replaced with the official ground truth figures:
1. **Isha Yoga Center (Main Entrance / Dhyanalinga):** **Approximately 1.8 km** (approximately **8 minutes driving**).
2. **Adiyogi Shiva Statue (Public Entrance & Parking):** **Approximately 2.2 km** (approximately **10 minutes driving**).

Standardized format applied across all visible prose and schema:
* *"Isha Yoga Center is approximately 1.8 km from Nisha Home Stay (8 minutes driving)."*
* *"Adiyogi Shiva Statue is approximately 2.2 km from Nisha Home Stay (10 minutes driving)."*

---

## 2. Centralized Configuration

All location data is centralized in [`data/locations.json`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/data/locations.json) and exposed to client-side scripts via `window.NISHA_LOCATIONS` in [`script.js`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/script.js):

```json
{
  "property": {
    "name": "Nisha Home Stay",
    "address": "330/1, NGR Street, Semmedu, Coimbatore, Tamil Nadu 641114",
    "coordinates": { "latitude": 10.9548572, "longitude": 76.7594586 },
    "phone": "+916381397636"
  },
  "destinations": {
    "ishaYogaCenter": {
      "name": "Isha Yoga Center",
      "distance": { "value": 1.8, "unit": "km", "display": "Approximately 1.8 km" },
      "travelTime": { "driving": "Approximately 8 minutes", "display": "8 mins drive" },
      "standardDescription": "Isha Yoga Center is approximately 1.8 km from Nisha Home Stay (8 minutes driving)."
    },
    "adiyogi": {
      "name": "Adiyogi Shiva Statue",
      "distance": { "value": 2.2, "unit": "km", "display": "Approximately 2.2 km" },
      "travelTime": { "driving": "Approximately 10 minutes", "display": "10 mins drive" },
      "standardDescription": "Adiyogi Shiva Statue is approximately 2.2 km from Nisha Home Stay (10 minutes driving)."
    }
  }
}
```

---

## 3. File Modification Inventory

| File Path | Modifications Made |
|:---|:---|
| [`data/locations.json`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/data/locations.json) | Centralized ground truth: updated `ishaYogaCenter` to 1.8 km / 8 mins, `adiyogi` to 2.2 km / 10 mins. |
| [`script.js`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/script.js) | Updated `window.NISHA_LOCATIONS` runtime object to 1.8 km / 8 mins and 2.2 km / 10 mins. |
| [`index.html`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/index.html) | Updated JSON-LD FAQ, hero badge (`8 Mins to Isha • 10 Mins to Adiyogi`), overview copy, feature card, nearby attractions, map subtitle, and footer links. |
| [`homestay-near-isha-yoga-center/index.html`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/homestay-near-isha-yoga-center/index.html) | Updated meta descriptions, JSON-LD, hero badge (`8 MINUTES TO ISHA FOUNDATION`), hero lead, callout card, FAQ accordion, and footer links. |
| [`rooms-near-adiyogi/index.html`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/rooms-near-adiyogi/index.html) | Updated `og:description`, JSON-LD FAQ, hero badge (`JUST 10 MINUTES FROM ADIYOGI SHIVA STATUE`), hero lead, body copy, laser show highlight, and footer links. |
| [`location/index.html`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/location/index.html) | Updated meta tags, lead paragraph (`8 minutes from Isha Yoga Center (~1.8 km) and 10 minutes from Adiyogi (~2.2 km)`), key travel distances table, and footer links. |
| [`rooms/index.html`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/rooms/index.html) | Updated footer nearby links to `Isha Yoga Center (1.8 km)` and `Adiyogi Shiva (2.2 km)`. |
| [`404.html`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/404.html) | Updated quick link (`Homestay Near Isha Yoga Center (~1.8 km)`) and footer summary. |
| [`scripts/update_schema.js`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/scripts/update_schema.js) | Synchronized FAQ question/answer schema generator templates with 1.8 km / 2.2 km values. |
| [`scripts/audit_distances.js`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/scripts/audit_distances.js) | Scans all files and confirms 0 occurrences of deprecated `6.5 km` or `7.5 km` strings. |
| [`scripts/verify_new_distances.js`](file:///c:/Users/dhars/OneDrive/Documents/nisha-home-stay-updated/scripts/verify_new_distances.js) | Validates presence of new 1.8 km, 2.2 km, 8 min, and 10 min values across all pages. |

---

## 4. Verification & QA Results

1. **Automated Distance Audits:**
   * `scripts/audit_distances.js`: **0 stale distance strings found**.
   * `scripts/verify_new_distances.js`: **All new distance and travel-time assertions passed**.
2. **Schema Validation:**
   * `scripts/validate_all_schemas.js`: **5 / 5 pages valid**, complete `@graph` hierarchy, zero validation warnings or errors.
3. **Playwright End-to-End Suite:**
   * `scripts/run_qa_tests.js`: **134 / 134 assertions passed** with 0 failures across all mobile viewports (320px, 360px, 375px, 390px, 430px) and desktop.
4. **Hero CTA Mobile Optimization:**
   * `scripts/verify_hero_buttons.js`: Verified side-by-side alignment, 50–52px height, single-line labels ("Call Now", "WhatsApp →"), 0px horizontal overflow at 320px width.
