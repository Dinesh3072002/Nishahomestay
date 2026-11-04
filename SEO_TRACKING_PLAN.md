# GOOGLE ANALYTICS 4 (GA4) & CONVERSION TRACKING PLAN: NISHA HOME STAY
**Website:** https://www.nishahomestay.com/  
**Property:** Nisha Home Stay  
**Version:** 2.0 (Phone-First & Privacy-Compliant Implementation)  
**Target Conversion Channel:** Direct Phone Inquiries (`tel:+916381397636`) + Secondary WhatsApp Inquiries  

---

## 1. Tracking Philosophy & Privacy Guardrails

1. **Zero PII Leakage:**
   In compliance with Google Analytics terms and privacy regulations (GDPR, DPDP Act 2023), guest names, personal telephone numbers, and inquiry text messages are strictly filtered out and never transmitted to Google Analytics servers.
2. **Intent Differentiation:**
   Inquiry clicks (`click_to_call`, `whatsapp_click`, `booking_form_submit`) represent top-of-funnel booking inquiries and intent leads, distinct from confirmed on-property reservations.
3. **Deduplication:**
   Form start events and section visibility events are tracked once per user session to avoid artificial inflation of engagement metrics.

---

## 2. Event Specification Matrix

| Event Name | Trigger Condition | Parameters Captured | Purpose & Funnel Stage |
| :--- | :--- | :--- | :--- |
| `click_to_call` | Click on any business `tel:+916381397636` link | `cta_location` (`header`, `hero`, `room_card`, `pricing_card`, `sticky_bar`, `footer`, `dialog`)<br>`destination`: `+916381397636`<br>`page_url`: Current URL path | **Primary Conversion Goal:** Measures immediate direct phone booking inquiries. |
| `whatsapp_click` | Click on any WhatsApp chat/enquiry link (`wa.me/916381397636`) | `cta_location` (`header_nav`, `hero_btn`, `faq_link`, `floating_btn`, `popup_btn`, `footer`)<br>`page_url`: Current URL path | **Secondary Conversion Goal:** Measures alternative messaging inquiries. |
| `click_directions` | Click on Google Maps route/location links | `destination_entity` (`nisha_homestay_map`, `isha_yoga_center_map`, `adiyogi_map`, `velliangiri_map`)<br>`cta_location`: Element identifier | **Local Intent Signal:** Measures intent to navigate or visit the property/area. |
| `view_rooms` | User views the room specs (scroll into `#stay` section or visits `/rooms/` page) | `page_type` (`rooms_page`, `homepage_section`)<br>`referrer`: Document referrer | **Consideration Stage:** Measures exploration of room options and amenities. |
| `view_location` | User views location/directions section or visits `/location/` page | `page_type` (`location_page`, `homepage_section`) | **Consideration Stage:** Measures geographic proximity checks. |
| `booking_form_start` | User focuses or types into any input in the inquiry form | `form_id` (`bookingForm`, `popupBookingForm`)<br>`field_focused`: Field name (non-PII) | **Funnel Drop-off Analysis:** Identifies users who began filling dates but didn't finish. |
| `booking_form_submit` | User submits the WhatsApp inquiry form with valid check-in/out & guests | `form_id` (`bookingForm`, `popupBookingForm`)<br>`guest_count`: Selected number of guests (1–7)<br>`stay_length_days`: Calculated duration in days | **Assisted Conversion Goal:** Validated inquiry submitted to WhatsApp. |

---

## 3. Data Privacy & Parameter Whitelist

### Parameters Permitted (Safe Attributes)
- `cta_location`: `header | hero | room_card | pricing_card | mobile_sticky | footer | popup`
- `destination`: Phone number or link domain
- `guest_count`: Integer (1 to 7)
- `stay_length_days`: Integer
- `page_url`: Canonical URL path
- `form_id`: String identifier

### Parameters Explicitly Blocked (Blacklisted PII)
- `name` (Guest full name) — Blocked
- `phone` / `tel` / `whatsapp` (Guest phone number) — Blocked
- `message` (Custom guest text) — Blocked
- `email` — Blocked

---

## 4. Implementation Snippet (`script.js`)

```javascript
/* Google Analytics 4 Unified Dispatcher */
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }

function trackSeoEvent(eventName, params = {}) {
  // PII sanitizer
  const sanitizedParams = {};
  const prohibitedKeys = ['name', 'phone', 'mobile', 'email', 'message'];
  for (const [key, value] of Object.entries(params)) {
    if (!prohibitedKeys.includes(key.toLowerCase())) {
      sanitizedParams[key] = value;
    }
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, sanitizedParams);
  }
  // Custom DOM event for automated verification
  window.dispatchEvent(new CustomEvent('seo_analytics_event', {
    detail: { eventName, params: sanitizedParams }
  }));
}
```

---

## 5. Google Tag Assistant Verification Protocol

To verify in production via Google Tag Assistant (`tagassistant.google.com`):
1. Navigate to target URL in preview mode.
2. Click the Header **Call Now** button (`tel:+916381397636`) -> Verify `click_to_call` event with `cta_location: "header"`.
3. Click the Mobile Sticky Bar **Call** button -> Verify `click_to_call` event with `cta_location: "sticky_bar"`.
4. Click Room Card **Call to Book** -> Verify `click_to_call` event with `cta_location: "room_card"`.
5. Click **Open in Google Maps** -> Verify `click_directions` event with `destination_entity: "nisha_homestay_map"`.
6. Fill in form and submit -> Verify `booking_form_start` and `booking_form_submit` fire without containing `name` or `phone`.

