'use strict';

/* --- Centralized Verified Geographical Location & Distance Configuration --- */
window.NISHA_LOCATIONS = {
  origin: {
    name: 'Nisha Home Stay',
    address: '330/1, NGR Street, Semmedu, Coimbatore, Tamil Nadu 641114',
    coordinates: { latitude: 10.9548572, longitude: 76.7594586 },
    telephone: '+916381397636',
    googleMapsUrl: 'https://maps.app.goo.gl/rpPwsUReKJ6btsKZ8',
    verificationStatus: 'verified',
    verificationDate: '2026-11-12'
  },
  destinations: {
    ishaYogaCenter: {
      name: 'Isha Yoga Center',
      entrance: 'Main Visitor Entrance / Dhyanalinga Welcome Point',
      distanceKm: 6.5,
      distanceDisplay: 'Approximately 6.5 km from Nisha Home Stay',
      travelTime: '10–12 minutes',
      travelTimeDisplay: '10–12 minutes drive',
      route: 'Direct via Semmedu–Poondi Road (MDR81 / Isha Yoga Center Road)',
      googleMapsUrl: 'https://maps.app.goo.gl/ekVWqvEzYhHTfuY78',
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=10.9548572,76.7594586&destination=Isha+Yoga+Center,+Coimbatore,+Tamil+Nadu&travelmode=driving',
      verificationStatus: 'verified'
    },
    adiyogi: {
      name: 'Adiyogi Shiva Statue',
      entrance: 'Adiyogi Visitor Entrance & Dedicated Visitor Parking',
      distanceKm: 7.5,
      distanceDisplay: 'Approximately 7.5 km from Nisha Home Stay',
      travelTime: '12–15 minutes',
      travelTimeDisplay: '12–15 minutes drive',
      route: 'Via Isha Yoga Center Road (MDR81) to Adiyogi Parking Avenue',
      googleMapsUrl: 'https://maps.app.goo.gl/FvzeuENUoS5MA2Un6',
      directionsUrl: 'https://www.google.com/maps/dir/?api=1&origin=10.9548572,76.7594586&destination=Adiyogi,+Coimbatore,+Tamil+Nadu&travelmode=driving',
      verificationStatus: 'verified'
    },
    velliangiriFoothills: {
      name: 'Velliangiri Hills Trekking Starting Point',
      distanceKm: 8.0,
      distanceDisplay: 'Approximately 8.0 km from Nisha Home Stay',
      travelTime: '15 minutes',
      travelTimeDisplay: '15 minutes drive',
      verificationStatus: 'verified'
    },
    coimbatoreJunction: {
      name: 'Coimbatore Junction Railway Station (CBE)',
      distanceKm: 28.0,
      distanceDisplay: 'Approximately 28.0 km from Nisha Home Stay',
      travelTime: '45–55 minutes',
      travelTimeDisplay: '45–55 minutes drive',
      verificationStatus: 'verified'
    },
    coimbatoreAirport: {
      name: 'Coimbatore International Airport (CJB)',
      distanceKm: 38.0,
      distanceDisplay: 'Approximately 38.0 km from Nisha Home Stay',
      travelTime: '60–75 minutes',
      travelTimeDisplay: '60–75 minutes drive',
      verificationStatus: 'verified'
    },
    gandhipuramBusStand: {
      name: 'Gandhipuram Central Bus Stand',
      distanceKm: 29.0,
      distanceDisplay: 'Approximately 29.0 km from Nisha Home Stay',
      travelTime: '50–60 minutes',
      travelTimeDisplay: '50–60 minutes drive',
      verificationStatus: 'verified'
    }
  }
};

window.getNishaDistance = function(key) {
  return window.NISHA_LOCATIONS.destinations[key] || null;
};

/* --- Google Analytics 4 & Conversion Tracking Framework --- */
window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }

function trackSeoEvent(eventName, params = {}) {
  const sanitized = {};
  const prohibited = ['name', 'phone', 'mobile', 'email', 'message'];
  for (const [key, val] of Object.entries(params)) {
    if (!prohibited.includes(key.toLowerCase())) {
      sanitized[key] = val;
    }
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, sanitized);
  }
  window.dispatchEvent(new CustomEvent('seo_analytics_event', {
    detail: { eventName, params: sanitized }
  }));
}

// Global delegated click tracking for phone calls, WhatsApp, and Google Maps directions
document.addEventListener('click', event => {
  const telLink = event.target.closest('a[href^="tel:"]');
  if (telLink) {
    const href = telLink.getAttribute('href') || '';
    if (href.includes('6381397636')) {
      const loc = telLink.dataset.track || 
        (telLink.closest('.header') ? 'header' :
         telLink.closest('.hero, .page-hero') ? 'hero' :
         telLink.closest('.feature-card') ? 'room_card' :
         telLink.closest('.price-card') ? 'pricing_card' :
         telLink.closest('.footer') ? 'footer' : 'content_link');
      trackSeoEvent('click_to_call', {
        cta_location: loc,
        destination: '+916381397636',
        page_url: window.location.pathname
      });
    }
  }

  const waLink = event.target.closest('a[href*="wa.me"]');
  if (waLink) {
    const loc = waLink.dataset.track ||
      (waLink.classList.contains('whatsapp-float') ? 'floating_button' :
       waLink.closest('.header') ? 'header' :
       waLink.closest('.footer') ? 'footer' :
       waLink.closest('dialog') ? 'popup' : 'in_page_link');
    trackSeoEvent('whatsapp_click', {
      cta_location: loc,
      page_url: window.location.pathname
    });
  }

  const mapLink = event.target.closest('a[href*="maps.app.goo.gl"], a[href*="maps.google.com"], a[href*="google.com/maps"]');
  if (mapLink) {
    const href = mapLink.getAttribute('href') || '';
    let dest = 'nisha_homestay_map';
    if (href.includes('ekVWqvEzYhHTfuY78')) dest = 'isha_yoga_center_map';
    else if (href.includes('FvzeuENUoS5MA2Un6')) dest = 'adiyogi_map';
    else if (href.includes('Velliangiri')) dest = 'velliangiri_map';
    trackSeoEvent('click_directions', {
      destination_entity: dest,
      page_url: window.location.pathname
    });
  }
});

// Section visibility tracking
if ('IntersectionObserver' in window) {
  let roomsViewed = false;
  let locationViewed = false;
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.id === 'stay' && !roomsViewed) {
          roomsViewed = true;
          trackSeoEvent('view_rooms', { page_type: 'homepage_section' });
        }
        if (entry.target.id === 'location' && !locationViewed) {
          locationViewed = true;
          trackSeoEvent('view_location', { page_type: 'homepage_section' });
        }
      }
    });
  }, { threshold: 0.25 });

  const staySection = document.getElementById('stay');
  if (staySection) sectionObserver.observe(staySection);
  const locationSection = document.getElementById('location');
  if (locationSection) sectionObserver.observe(locationSection);
}

// Subpage direct view tracking
if (window.location.pathname.includes('/rooms')) {
  trackSeoEvent('view_rooms', { page_type: 'rooms_landing_page' });
} else if (window.location.pathname.includes('/location')) {
  trackSeoEvent('view_location', { page_type: 'location_landing_page' });
}

/* --- Navigation & Menu Controls --- */
const nav = document.getElementById('nav');
const menu = document.getElementById('menuToggle');
function closeMenu(){
  if (nav && menu) {
    nav.classList.remove('active');
    menu.setAttribute('aria-expanded','false');
    menu.setAttribute('aria-label','Open navigation menu');
    document.body.classList.remove('menu-open');
  }
}
if (menu && nav) {
  menu.addEventListener('click',()=>{
    const open = nav.classList.toggle('active');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    document.body.classList.toggle('menu-open', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
matchMedia('(min-width: 1101px)').addEventListener('change', e => { if (e.matches) closeMenu(); });

/* --- Inquiry Dialog & Lightbox --- */
const enquiry = document.getElementById('enquiryDialog');
const lightbox = document.getElementById('lightbox');
let prompted = false;
try { prompted = sessionStorage.getItem('nisha-enquiry-seen') === '1'; } catch {}
function markPrompted(){
  prompted = true;
  try { sessionStorage.setItem('nisha-enquiry-seen', '1'); } catch {}
}

function onScroll(){
  const header = document.getElementById('header');
  if (header) header.classList.toggle('scrolled', window.scrollY > 30);
  const travel = document.documentElement.scrollHeight - window.innerHeight;
  if (!prompted && travel > 0 && (window.scrollY / travel >= 0.15) && 
      !document.querySelector('dialog[open]') && 
      !document.body.classList.contains('menu-open') && 
      !document.activeElement.closest('form') && 
      enquiry && typeof enquiry.showModal === 'function') {
    markPrompted();
    enquiry.showModal();
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
const initialHeader = document.getElementById('header');
if (initialHeader) initialHeader.classList.toggle('scrolled', window.scrollY > 30);

document.querySelectorAll('a[href="#booking"], a[href="#bookingForm"]').forEach(a => a.addEventListener('click', markPrompted));
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('click', e => {
    if (e.target === dialog) {
      const r = dialog.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close();
    }
  });
});

document.querySelectorAll('.gallery-item').forEach(button => button.addEventListener('click', () => {
  if (lightbox) {
    const img = document.getElementById('lightboxImage');
    if (img) {
      img.src = button.dataset.image;
      const thumb = button.querySelector('img');
      img.alt = thumb ? thumb.alt : 'Property photo';
    }
    lightbox.showModal();
  }
}));

/* --- FAQ Accordion --- */
document.querySelectorAll('.faq-item').forEach((item, i) => {
  const button = item.querySelector('.faq-question'), answer = item.querySelector('.faq-answer');
  if (button && answer) {
    answer.id = answer.id || `faq-answer-${i}`;
    answer.hidden = true;
    button.setAttribute('aria-controls', answer.id);
    button.setAttribute('aria-expanded', 'false');
    button.addEventListener('click', () => {
      const open = answer.hidden;
      answer.hidden = !open;
      button.setAttribute('aria-expanded', String(open));
      item.classList.toggle('active', open);
    });
  }
});

/* --- Booking Forms Validation & WhatsApp Dispatch --- */
document.querySelectorAll('#bookingForm, #popupBookingForm').forEach(form => {
  let formStarted = false;
  form.addEventListener('focusin', () => {
    if (!formStarted) {
      formStarted = true;
      trackSeoEvent('booking_form_start', { form_id: form.id });
    }
  });

  const checkin = form.querySelector('[name=checkin]'), checkout = form.querySelector('[name=checkout]');
  function localDate(d){
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  if (checkin && checkout) {
    checkin.min = localDate(new Date());
    function updateCheckout(){
      const day = new Date((checkin.value || checkin.min) + 'T12:00:00');
      day.setDate(day.getDate() + 1);
      checkout.min = localDate(day);
      checkout.setCustomValidity('');
      if (checkout.value && checkout.value < checkout.min) checkout.value = '';
    }
    updateCheckout();
    checkin.addEventListener('change', updateCheckout);
    checkout.addEventListener('input', () => checkout.setCustomValidity(''));
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (checkin) checkin.min = localDate(new Date());
    if (!form.reportValidity()) return;
    if (checkout && checkin && checkout.value <= checkin.value) {
      checkout.setCustomValidity('Please choose a check-out date after check-in.');
      checkout.reportValidity();
      return;
    }
    const data = new FormData(form);
    
    // Track submission without any PII (no name, no phone, no message)
    trackSeoEvent('booking_form_submit', {
      form_id: form.id,
      guest_count: String(data.get('guests') || ''),
      has_dates: Boolean(data.get('checkin') && data.get('checkout'))
    });

    const message = `Nisha Home Stay – Booking Enquiry\n\nName: ${String(data.get('name')).trim()}\nPhone: ${String(data.get('phone')).trim()}\nCheck-in: ${data.get('checkin')}\nCheck-out: ${data.get('checkout')}\nGuests: ${data.get('guests')}\nMessage: ${String(data.get('message') || '').trim()}\n\nPlease confirm availability and the total price.`;
    markPrompted();
    window.open(`https://wa.me/916381397636?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  });
});

/* --- Back to Top --- */
const backToTop = document.getElementById("backToTop");
if (backToTop) {
  function updateBackToTop(){ backToTop.hidden = window.scrollY < 400; }
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    const logo = document.querySelector(".header .logo");
    if (logo) logo.focus({ preventScroll: true });
  });
}

/* --- Scroll Reveal Animations --- */
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const revealTargets = document.querySelectorAll('.reveal:not(.review-card), .feature-card, .why-card, .gallery-layout, .amenity, .spec-card');
if ('IntersectionObserver' in window && !motionPreference.matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealTargets.forEach((element, index) => {
    element.classList.add('scroll-reveal');
    element.style.setProperty('--reveal-delay', `${(index % 3) * 70}ms`);
    revealObserver.observe(element);
  });
  motionPreference.addEventListener('change', event => {
    if (event.matches) {
      revealTargets.forEach(element => element.classList.add('is-visible'));
      revealObserver.disconnect();
    }
  });
}

/* --- Reviews Slider --- */
const reviewTrack = document.querySelector('.reviews-grid');
if (reviewTrack) {
  const reviews = [...reviewTrack.querySelectorAll('.review-card')];
  const reviewSection = document.getElementById('reviews');
  if (reviews.length > 0) {
    reviewTrack.classList.add('review-slider');
    reviewTrack.id = 'reviewSlider';
    reviewTrack.setAttribute('role', 'region');
    reviewTrack.setAttribute('aria-roledescription', 'carousel');
    reviewTrack.setAttribute('aria-label', 'Guest reviews');
    reviewTrack.tabIndex = 0;
    reviews.forEach((card, index) => {
      card.setAttribute('role', 'group');
      card.setAttribute('aria-roledescription', 'slide');
      card.setAttribute('aria-label', `${index + 1} of ${reviews.length}`);
    });
    const controls = document.createElement('div');
    controls.className = 'review-controls';
    controls.innerHTML = '<button type="button" class="review-prev" aria-label="Previous reviews" aria-controls="reviewSlider">←</button><div class="review-dots" aria-label="Choose reviews"></div><button type="button" class="review-next" aria-label="Next reviews" aria-controls="reviewSlider">→</button><button type="button" class="review-autoplay">Pause slideshow</button>';
    reviewTrack.after(controls);
    const dots = controls.querySelector('.review-dots');
    const autoplayButton = controls.querySelector('.review-autoplay');
    let reviewIndex = 0, reviewTimer, reviewVisible = false, reviewHovered = false;
    let reviewPaused = motionPreference.matches;
    function reviewStep() { return reviews[0].getBoundingClientRect().width + (parseFloat(getComputedStyle(reviewTrack).columnGap) || 25); }
    function lastReviewIndex() { return Math.max(0, Math.round((reviewTrack.scrollWidth - reviewTrack.clientWidth) / reviewStep())); }
    function updateReviewDots() {
      [...dots.children].forEach((dot, index) => {
        dot.setAttribute('aria-current', String(index === reviewIndex));
      });
    }
    function showReview(index) {
      const last = lastReviewIndex();
      reviewIndex = (index + last + 1) % (last + 1);
      reviewTrack.scrollTo({ left: reviewIndex * reviewStep(), behavior: motionPreference.matches ? 'instant' : 'smooth' });
      updateReviewDots();
    }
    function scheduleReviews() {
      clearInterval(reviewTimer);
      if (!reviewPaused && !motionPreference.matches && reviewVisible && !reviewHovered && !document.hidden && (!reviewSection || !reviewSection.contains(document.activeElement)) && !document.querySelector('dialog[open]')) {
        reviewTimer = setInterval(() => showReview(reviewIndex + 1), 5000);
      }
    }
    function rebuildReviewDots() {
      reviewIndex = Math.min(reviewIndex, lastReviewIndex());
      dots.replaceChildren();
      for (let i = 0; i <= lastReviewIndex(); i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Show reviews starting with review ${i + 1}`);
        dot.setAttribute('aria-controls', 'reviewSlider');
        dot.addEventListener('click', () => { showReview(i); scheduleReviews(); });
        dots.append(dot);
      }
      reviewTrack.scrollTo({ left: reviewIndex * reviewStep(), behavior: 'instant' });
      updateReviewDots();
      scheduleReviews();
    }
    controls.querySelector('.review-prev').addEventListener('click', () => showReview(reviewIndex - 1));
    controls.querySelector('.review-next').addEventListener('click', () => showReview(reviewIndex + 1));
    function updateAutoplayLabel() { autoplayButton.textContent = reviewPaused ? 'Play slideshow' : 'Pause slideshow'; }
    autoplayButton.addEventListener('click', () => { reviewPaused = !reviewPaused; updateAutoplayLabel(); scheduleReviews(); });
    reviewTrack.addEventListener('keydown', event => {
      if (event.target !== reviewTrack || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      showReview(reviewIndex + (event.key === 'ArrowRight' ? 1 : -1));
    });
    reviewTrack.addEventListener('scroll', () => {
      reviewIndex = Math.min(lastReviewIndex(), Math.round(reviewTrack.scrollLeft / reviewStep()));
      updateReviewDots();
    }, { passive: true });
    if (reviewSection) {
      reviewSection.addEventListener('mouseenter', () => { reviewHovered = true; scheduleReviews(); });
      reviewSection.addEventListener('mouseleave', () => { reviewHovered = false; scheduleReviews(); });
      reviewSection.addEventListener('focusin', scheduleReviews);
      reviewSection.addEventListener('focusout', () => setTimeout(scheduleReviews, 0));
    }
    reviewTrack.addEventListener('pointerdown', () => clearInterval(reviewTimer), { passive: true });
    reviewTrack.addEventListener('pointerup', scheduleReviews, { passive: true });
    reviewTrack.addEventListener('pointercancel', scheduleReviews, { passive: true });
    document.addEventListener('visibilitychange', scheduleReviews);
    new MutationObserver(scheduleReviews).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'] });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => { reviewVisible = entries[0].isIntersecting; scheduleReviews(); }, { threshold: 0.2 }).observe(reviewTrack);
    }
    window.addEventListener('resize', rebuildReviewDots);
    motionPreference.addEventListener('change', () => { reviewPaused = motionPreference.matches; updateAutoplayLabel(); scheduleReviews(); });
    updateAutoplayLabel();
    rebuildReviewDots();
    function syncMotionControl(){
      autoplayButton.disabled = motionPreference.matches;
      if (motionPreference.matches) autoplayButton.textContent = 'Motion paused';
    }
    motionPreference.addEventListener('change', syncMotionControl);
    syncMotionControl();
  }
}
