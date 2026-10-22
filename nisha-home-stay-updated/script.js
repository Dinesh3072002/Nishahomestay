'use strict';
const nav = document.getElementById('nav');
const menu = document.getElementById('menuToggle');
function closeMenu(){nav.classList.remove('active');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation menu');document.body.classList.remove('menu-open');}
menu.addEventListener('click',()=>{const open=nav.classList.toggle('active');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation menu':'Open navigation menu');document.body.classList.toggle('menu-open',open);});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
matchMedia('(min-width: 1101px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
const enquiry=document.getElementById('enquiryDialog');
const lightbox=document.getElementById('lightbox');
let prompted=false;
try{prompted=sessionStorage.getItem('nisha-enquiry-seen')==='1';}catch{}
function markPrompted(){prompted=true;try{sessionStorage.setItem('nisha-enquiry-seen','1');}catch{}}
function onScroll(){
 document.getElementById('header').classList.toggle('scrolled',scrollY>30);
 const travel=document.documentElement.scrollHeight-innerHeight;
 if(!prompted && travel>0 && scrollY/travel>=0.1 && !document.querySelector('dialog[open]') && !document.body.classList.contains('menu-open') && !document.activeElement.closest('form') && typeof enquiry.showModal==='function'){
  markPrompted();enquiry.showModal();
 }
}
window.addEventListener('scroll',onScroll,{passive:true});
document.getElementById('header').classList.toggle('scrolled',scrollY>30);
document.querySelectorAll('a[href="#booking"],a[href="#bookingForm"]').forEach(a=>a.addEventListener('click',markPrompted));
document.querySelectorAll('dialog').forEach(dialog=>{
 dialog.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>dialog.close()));
 dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
});

document.querySelectorAll('.gallery-item').forEach(button=>button.addEventListener('click',()=>{
 const img=document.getElementById('lightboxImage');img.src=button.dataset.image;img.alt=button.querySelector('img').alt;lightbox.showModal();
}));
document.querySelectorAll('.faq-item').forEach((item,i)=>{
 const button=item.querySelector('.faq-question'),answer=item.querySelector('.faq-answer');
 answer.id=`faq-answer-${i}`;answer.hidden=true;button.setAttribute('aria-controls',answer.id);button.setAttribute('aria-expanded','false');
 button.addEventListener('click',()=>{const open=answer.hidden;answer.hidden=!open;button.setAttribute('aria-expanded',String(open));item.classList.toggle('active',open);});
});
document.querySelectorAll('#bookingForm, #popupBookingForm').forEach(form => {
const checkin=form.querySelector('[name=checkin]'),checkout=form.querySelector('[name=checkout]');
function localDate(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
checkin.min=localDate(new Date());
function updateCheckout(){const day=new Date((checkin.value||checkin.min)+'T12:00:00');day.setDate(day.getDate()+1);checkout.min=localDate(day);checkout.setCustomValidity('');if(checkout.value && checkout.value<checkout.min)checkout.value='';}
updateCheckout();checkin.addEventListener('change',updateCheckout);checkout.addEventListener('input',()=>checkout.setCustomValidity(''));
form.addEventListener('submit',event=>{
 event.preventDefault();
 checkin.min=localDate(new Date());
 if(!form.reportValidity())return;
 if(checkout.value<=checkin.value){checkout.setCustomValidity('Please choose a check-out date after check-in.');checkout.reportValidity();return;}
 const data=new FormData(form);
 const message=`Nisha Home Stay – Booking Enquiry\n\nName: ${String(data.get('name')).trim()}\nPhone: ${String(data.get('phone')).trim()}\nCheck-in: ${data.get('checkin')}\nCheck-out: ${data.get('checkout')}\nGuests: ${data.get('guests')}\nMessage: ${String(data.get('message')||'').trim()}\n\nPlease confirm availability and the total price.`;
 markPrompted();window.open(`https://wa.me/916381397636?text=${encodeURIComponent(message)}`,'_blank','noopener,noreferrer');
});

});
const backToTop=document.getElementById("backToTop");
function updateBackToTop(){backToTop.hidden=scrollY<400;}
window.addEventListener("scroll",updateBackToTop,{passive:true});
updateBackToTop();
backToTop.addEventListener("click",()=>{window.scrollTo({top:0,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});document.querySelector(".header .logo").focus({preventScroll:true});});

/* Reveal content once; content remains visible if JavaScript is unavailable. */
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const revealTargets = document.querySelectorAll('.reveal:not(.review-card), .feature-card, .why-card, .gallery-layout, .amenity');
if ('IntersectionObserver' in window && !motionPreference.matches) {
 const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
   if (entry.isIntersecting) {
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
   }
  });
 }, {threshold: 0.08});
 revealTargets.forEach((element, index) => {
  element.classList.add('scroll-reveal');
  element.style.setProperty('--reveal-delay', `${index % 3 * 70}ms`);
  revealObserver.observe(element);
 });
 motionPreference.addEventListener('change', event => {
  if (event.matches) {
   revealTargets.forEach(element => element.classList.add('is-visible'));
   revealObserver.disconnect();
  }
 });
}

/* Native scroll-snap carousel: touch swiping requires no external library. */
const reviewTrack = document.querySelector('.reviews-grid');
const reviews = [...reviewTrack.querySelectorAll('.review-card')];
const reviewSection = document.getElementById('reviews');
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
function reviewStep() { return reviews[0].getBoundingClientRect().width + parseFloat(getComputedStyle(reviewTrack).columnGap); }
function lastReviewIndex() { return Math.max(0, Math.round((reviewTrack.scrollWidth - reviewTrack.clientWidth) / reviewStep())); }
function updateReviewDots() {
 [...dots.children].forEach((dot, index) => {
  dot.setAttribute('aria-current', String(index === reviewIndex));
 });
}
function showReview(index) {
 const last = lastReviewIndex();
 reviewIndex = (index + last + 1) % (last + 1);
 reviewTrack.scrollTo({left: reviewIndex * reviewStep(), behavior: motionPreference.matches ? 'instant' : 'smooth'});
 updateReviewDots();
}
function scheduleReviews() {
 clearInterval(reviewTimer);
 if (!reviewPaused && !motionPreference.matches && reviewVisible && !reviewHovered && !document.hidden && !reviewSection.contains(document.activeElement) && !document.querySelector('dialog[open]')) {
  reviewTimer = setInterval(() => showReview(reviewIndex + 1), 5000);
 }
}
function rebuildReviewDots() {
 reviewIndex = Math.min(reviewIndex, lastReviewIndex());
 dots.replaceChildren();
 for (let i = 0; i <= lastReviewIndex(); i++) {
  const dot = document.createElement('button');
  dot.type = 'button'; dot.setAttribute('aria-label', `Show reviews starting with review ${i + 1}`);
  dot.setAttribute('aria-controls', 'reviewSlider');
  dot.addEventListener('click', () => {showReview(i); scheduleReviews();});
  dots.append(dot);
 }
 reviewTrack.scrollTo({left: reviewIndex * reviewStep(), behavior: 'instant'});
 updateReviewDots(); scheduleReviews();
}
controls.querySelector('.review-prev').addEventListener('click', () => showReview(reviewIndex - 1));
controls.querySelector('.review-next').addEventListener('click', () => showReview(reviewIndex + 1));
function updateAutoplayLabel() { autoplayButton.textContent = reviewPaused ? 'Play slideshow' : 'Pause slideshow'; }
autoplayButton.addEventListener('click', () => {reviewPaused = !reviewPaused; updateAutoplayLabel(); scheduleReviews();});
reviewTrack.addEventListener('keydown', event => {
 if (event.target !== reviewTrack || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
 event.preventDefault(); showReview(reviewIndex + (event.key === 'ArrowRight' ? 1 : -1));
});
reviewTrack.addEventListener('scroll', () => {
 reviewIndex = Math.min(lastReviewIndex(), Math.round(reviewTrack.scrollLeft / reviewStep())); updateReviewDots();
}, {passive: true});
reviewSection.addEventListener('mouseenter', () => {reviewHovered = true; scheduleReviews();});
reviewSection.addEventListener('mouseleave', () => {reviewHovered = false; scheduleReviews();});
reviewSection.addEventListener('focusin', scheduleReviews);
reviewSection.addEventListener('focusout', () => setTimeout(scheduleReviews, 0));
reviewTrack.addEventListener('pointerdown', () => clearInterval(reviewTimer), {passive: true});
reviewTrack.addEventListener('pointerup', scheduleReviews, {passive: true});
reviewTrack.addEventListener('pointercancel', scheduleReviews, {passive: true});
document.addEventListener('visibilitychange', scheduleReviews);
new MutationObserver(scheduleReviews).observe(document.body, {subtree: true, attributes: true, attributeFilter: ['open']});
if ('IntersectionObserver' in window) {
 new IntersectionObserver(entries => {reviewVisible = entries[0].isIntersecting; scheduleReviews();}, {threshold: 0.2}).observe(reviewTrack);
}
window.addEventListener('resize', rebuildReviewDots);
motionPreference.addEventListener('change', () => {reviewPaused = motionPreference.matches; updateAutoplayLabel(); scheduleReviews();});
updateAutoplayLabel(); rebuildReviewDots();
function syncMotionControl(){
 autoplayButton.disabled=motionPreference.matches;
 if(motionPreference.matches)autoplayButton.textContent='Motion paused';
}
motionPreference.addEventListener('change',syncMotionControl);
syncMotionControl();
