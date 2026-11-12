const fs = require('fs');
const path = require('path');

const newSchemaIndex = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LodgingBusiness",
      "@id": "https://www.nishahomestay.com/#business",
      "name": "Nisha Home Stay",
      "alternateName": "Nisha Homestay Semmedu",
      "description": "Peaceful family homestay in Semmedu, Coimbatore, offering three furnished 1BHK units with AC and Non-AC room choices and private attached bathrooms near Isha Yoga Center and Adiyogi. Accommodates families, couples, and groups up to 7 guests per unit with home-cooked meals.",
      "url": "https://www.nishahomestay.com/",
      "telephone": "+916381397636",
      "currenciesAccepted": "INR",
      "paymentAccepted": "Cash, UPI",
      "priceRange": "₹1500 - ₹3500",
      "image": [
        "https://www.nishahomestay.com/images/hero.webp",
        "https://www.nishahomestay.com/images/exterior.webp",
        "https://www.nishahomestay.com/images/living-room2.webp",
        "https://www.nishahomestay.com/images/bedroom2.webp",
        "https://www.nishahomestay.com/images/bathroom2.webp",
        "https://www.nishahomestay.com/images/kitchen2.webp",
        "https://www.nishahomestay.com/images/surroundings.webp"
      ],
      "logo": "https://www.nishahomestay.com/images/nisha-logo-small.webp",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "330/1, NGR Street",
        "addressLocality": "Semmedu",
        "addressRegion": "Tamil Nadu",
        "postalCode": "641114",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 10.9548572,
        "longitude": 76.7594586
      },
      "hasMap": "https://maps.app.goo.gl/rpPwsUReKJ6btsKZ8",
      "sameAs": [
        "https://maps.app.goo.gl/rpPwsUReKJ6btsKZ8",
        "https://www.airbnb.co.in/rooms/1475270097498216913",
        "https://www.google.com.pk/travel/hotels/entity/CgsIseun8ZDT5_X5ARAB"
      ],
      "checkinTime": "12:00",
      "checkoutTime": "11:00",
      "numberOfRooms": 3,
      "petsAllowed": false,
      "amenityFeature": [
        {
          "@type": "LocationFeatureSpecification",
          "name": "Air conditioning",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Non-AC room option",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Private attached bathroom",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Free Wi-Fi",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Free vehicle parking",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Refrigerator",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Hot water / Geyser",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Power backup",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Kitchen facilities",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Home-cooked meals on request",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "Scooter rental assistance",
          "value": true
        },
        {
          "@type": "LocationFeatureSpecification",
          "name": "C-Form foreign visitor support",
          "value": true
        }
      ],
      "makesOffer": [
        {
          "@type": "Offer",
          "name": "1BHK Room for 1 Guest (per 24-hour stay)",
          "price": "1500",
          "priceCurrency": "INR"
        },
        {
          "@type": "Offer",
          "name": "1BHK Room for 2 Guests (per 24-hour stay)",
          "price": "2000",
          "priceCurrency": "INR"
        },
        {
          "@type": "Offer",
          "name": "1BHK Room for 3 Guests (per 24-hour stay)",
          "price": "2500",
          "priceCurrency": "INR"
        },
        {
          "@type": "Offer",
          "name": "1BHK Room for 4-5 Guests (per 24-hour stay)",
          "price": "3000",
          "priceCurrency": "INR"
        },
        {
          "@type": "Offer",
          "name": "1BHK Room for 6-7 Guests (per 24-hour stay)",
          "price": "3500",
          "priceCurrency": "INR"
        }
      ]
    },
    {
      "@type": "WebPage",
      "@id": "https://www.nishahomestay.com/#webpage",
      "url": "https://www.nishahomestay.com/",
      "name": "Homestay Near Isha Yoga Center & Adiyogi | Nisha Home Stay",
      "description": "Homestay in Semmedu, Coimbatore, near Isha Yoga Center and Adiyogi. Furnished AC and Non-AC 1BHK rooms with attached bathrooms for families and up to 7 guests. Stays from ₹1,500.",
      "inLanguage": "en-IN",
      "mainEntity": "https://www.nishahomestay.com/#business",
      "about": "https://www.nishahomestay.com/#business",
      "primaryImageOfPage": {
        "@type": "ImageObject",
        "url": "https://www.nishahomestay.com/images/hero.webp",
        "width": 1376,
        "height": 768
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.nishahomestay.com/#breadcrumbs",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.nishahomestay.com/"
        }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.nishahomestay.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How far is Nisha Home Stay from Isha Yoga Center and Adiyogi?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Nisha Home Stay is located in Semmedu, approximately 6.5 km from the Isha Yoga Center entrance and about 7.5 km from the Adiyogi Shiva Statue. By road, travel time is approximately 10 to 12 minutes by car, auto, or scooter."
          }
        },
        {
          "@type": "Question",
          "name": "Are AC and Non-AC rooms available?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We offer both Air-Conditioned (AC) and Non-AC 1BHK rooms to suit your preference and budget. Both options include clean linen, attached bathrooms, and access to all amenities."
          }
        },
        {
          "@type": "Question",
          "name": "Do all rooms have private attached bathrooms?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Every 1BHK unit at Nisha Home Stay features a private, clean attached bathroom with modern sanitary fittings and continuous hot water (geyser) facilities."
          }
        },
        {
          "@type": "Question",
          "name": "Can you accommodate families and groups up to 7 people?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Each furnished 1BHK unit has a bedroom and a spacious hall, comfortably accommodating solo travelers, couples, families, and groups of up to 7 guests per unit."
          }
        },
        {
          "@type": "Question",
          "name": "What are the room rates per 24-hour stay?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our transparent room rates per 24-hour stay are: ₹1,500 for 1 guest, ₹2,000 for 2 guests, ₹2,500 for 3 guests, ₹3,000 for 4–5 guests, and ₹3,500 for 6–7 guests. Call +91 63813 97636 to confirm your dates."
          }
        },
        {
          "@type": "Question",
          "name": "How do I book a room? Is phone call preferred?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Direct phone call to +91 63813 97636 is the fastest and primary booking method. We confirm instant availability and reserve your unit immediately. You may also send an inquiry via our WhatsApp booking form."
          }
        },
        {
          "@type": "Question",
          "name": "Is parking available at the property?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Secure vehicle parking is provided on-site for cars and two-wheelers, with additional free open parking available nearby on NGR Street."
          }
        },
        {
          "@type": "Question",
          "name": "Can meals be arranged during our stay?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Wholesome home-cooked South Indian vegetarian meals can be prepared in our family kitchen upon advance request, subject to daily availability."
          }
        },
        {
          "@type": "Question",
          "name": "Can I rent a 1BHK unit for longer stays or Isha volunteer programs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Our furnished 1BHK accommodation in Semmedu is available for weekly, monthly, and yearly stays. Contact us at +91 63813 97636 for special long-stay rates and advance arrangements."
          }
        },
        {
          "@type": "Question",
          "name": "Do you assist international visitors with C-Form registration?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. We welcome international guests traveling to Isha Foundation from all countries and provide complete guidance and support with official C-Form registration."
          }
        }
      ]
    }
  ]
};

// 1. Update index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');
const scriptRegex = /<script type="application\/ld\+json">[\s\S]*?<\/script>/i;
const newScriptTag = `<script type="application/ld+json">${JSON.stringify(newSchemaIndex, null, 2)}</script>`;
indexHtml = indexHtml.replace(scriptRegex, newScriptTag);
fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('Successfully updated index.html schema!');

// 2. Subpages business entity & WebPage references
const subpages = [
  'homestay-near-isha-yoga-center/index.html',
  'rooms-near-adiyogi/index.html',
  'rooms/index.html',
  'location/index.html'
];

subpages.forEach(sub => {
  const filePath = path.resolve(sub);
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');
  const match = html.match(scriptRegex);
  if (!match) return;

  const json = JSON.parse(match[0].replace(/<script type="application\/ld\+json">|<\/script>/gi, ''));
  // Update LodgingBusiness @id to https://www.nishahomestay.com/#business
  const lb = json['@graph'].find(e => e['@type'] === 'LodgingBusiness');
  if (lb) {
    lb['@id'] = 'https://www.nishahomestay.com/#business';
    lb.hasMap = 'https://maps.app.goo.gl/rpPwsUReKJ6btsKZ8';
    lb.geo = {
      "@type": "GeoCoordinates",
      "latitude": 10.9548572,
      "longitude": 76.7594586
    };
  }
  const wp = json['@graph'].find(e => e['@type'] === 'WebPage');
  if (wp) {
    wp.about = 'https://www.nishahomestay.com/#business';
    wp.mainEntity = 'https://www.nishahomestay.com/#business';
    if (wp.isPartOf) {
      delete wp.isPartOf; // Avoid intermediate WebSite swallowing
    }
  }

  const updatedScript = `<script type="application/ld+json">${JSON.stringify(json, null, 2)}</script>`;
  html = html.replace(scriptRegex, updatedScript);
  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Successfully updated ${sub} schema!`);
});

