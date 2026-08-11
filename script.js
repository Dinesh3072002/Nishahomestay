/* =========================================
   NISHA HOME STAY
   JavaScript
========================================= */


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {

  const isOpen = nav.classList.toggle("active");

  menuToggle.setAttribute(
    "aria-expanded",
    isOpen
  );

  document.body.classList.toggle(
    "menu-open",
    isOpen
  );

});


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav a").forEach((link) => {

  link.addEventListener("click", () => {

    nav.classList.remove("active");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    document.body.classList.remove(
      "menu-open"
    );

  });

});


/* =========================================
   HEADER SCROLL
========================================= */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

  if (window.scrollY > 30) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

});


/* =========================================
   REVEAL ANIMATION
========================================= */

const revealElements =
  document.querySelectorAll(".reveal");

const revealObserver =
  new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );


revealElements.forEach((element) => {
  revealObserver.observe(element);
});


/* =========================================
   FAQ ACCORDION
========================================= */

const faqItems =
  document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

  const question =
    item.querySelector(".faq-question");

  const answer =
    item.querySelector(".faq-answer");

  question.addEventListener("click", () => {

    const isActive =
      item.classList.contains("active");


    /* Close all other FAQs */

    faqItems.forEach((otherItem) => {

      if (otherItem !== item) {

        otherItem.classList.remove("active");

        const otherAnswer =
          otherItem.querySelector(".faq-answer");

        otherAnswer.style.maxHeight = null;

      }

    });


    /* Toggle selected FAQ */

    if (!isActive) {

      item.classList.add("active");

      answer.style.maxHeight =
        answer.scrollHeight + "px";

    } else {

      item.classList.remove("active");

      answer.style.maxHeight = null;

    }

  });

});


/* =========================================
   GALLERY LIGHTBOX
========================================= */

const galleryItems =
  document.querySelectorAll(".gallery-item");

const lightbox =
  document.getElementById("lightbox");

const lightboxImage =
  document.getElementById("lightboxImage");

const lightboxClose =
  document.getElementById("lightboxClose");


galleryItems.forEach((item) => {

  item.addEventListener("click", () => {

    const image =
      item.dataset.image;

    lightboxImage.src = image;

    lightboxImage.alt =
      item.querySelector("img").alt;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

  });

});


function closeLightbox() {

  lightbox.classList.remove("active");

  document.body.style.overflow = "";

}


lightboxClose.addEventListener(
  "click",
  closeLightbox
);


lightbox.addEventListener(
  "click",
  (event) => {

    if (event.target === lightbox) {
      closeLightbox();
    }

  }
);


document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      lightbox.classList.contains("active")
    ) {
      closeLightbox();
    }

  }
);


/* =========================================
   BOOKING FORM → WHATSAPP
========================================= */

const bookingForm =
  document.getElementById("bookingForm");


bookingForm.addEventListener(
  "submit",
  (event) => {

    event.preventDefault();


    const name =
      document.getElementById("name")
        .value.trim();

    const phone =
      document.getElementById("phone")
        .value.trim();

    const checkin =
      document.getElementById("checkin")
        .value;

    const checkout =
      document.getElementById("checkout")
        .value;

    const guests =
      document.getElementById("guests")
        .value;

    const message =
      document.getElementById("message")
        .value.trim();


    if (!name || !phone || !checkin || !checkout || !guests) {

      alert(
        "Please fill in all required fields."
      );

      return;

    }


    /* Check dates */

    const checkinDate =
      new Date(checkin);

    const checkoutDate =
      new Date(checkout);


    if (checkoutDate <= checkinDate) {

      alert(
        "Check-out date must be after the check-in date."
      );

      return;

    }


    /* Format dates */

    const formattedCheckin =
      formatDate(checkin);

    const formattedCheckout =
      formatDate(checkout);


    /* Create WhatsApp message */

    const whatsappMessage = `Nisha Home Stay – Booking Enquiry

Hello Nisha Home Stay,

I would like to check availability for a stay.

Guest Details
Name: ${name}
WhatsApp: ${phone}

Stay Details
Check-in: ${formattedCheckin}
Check-out: ${formattedCheckout}
Guests: ${guests}

${message ? `Message:
${message}

` : ""}Please confirm availability and the total price.

Thank you.`;


    /* Nisha WhatsApp number */

    const ownerNumber =
      "916381397636";


    const whatsappURL =
      `https://wa.me/${ownerNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`;


    /* Open WhatsApp */

    window.open(
      whatsappURL,
      "_blank",
      "noopener"
    );

  }
);


/* =========================================
   DATE FORMATTER
========================================= */

function formatDate(dateString) {

  const date =
    new Date(dateString + "T00:00:00");

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }
  );

}


/* =========================================
   CHECK-IN DATE
   Prevent past dates
========================================= */

const checkinInput =
  document.getElementById("checkin");

const checkoutInput =
  document.getElementById("checkout");


const today =
  new Date()
    .toISOString()
    .split("T")[0];


checkinInput.min = today;

checkoutInput.min = today;


/* When check-in changes,
   checkout cannot be earlier */

checkinInput.addEventListener(
  "change",
  () => {

    checkoutInput.min =
      checkinInput.value;

    if (
      checkoutInput.value &&
      checkoutInput.value <= checkinInput.value
    ) {

      checkoutInput.value = "";

    }

  }
);