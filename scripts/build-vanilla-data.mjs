import fs from 'node:fs'
import { translations } from '../src/data/translations.js'
import { animalCategories, animals } from '../src/data/animals.js'
import { attractions } from '../src/data/attractions.js'
import { news } from '../src/data/news.js'
import { faqs } from '../src/data/faqs.js'
import {
  conservationFeatures,
  conservationPillars,
  schoolVisitSteps,
} from '../src/data/conservation.js'
import { imageCredits } from '../src/data/imageCredits.js'

const attractionAlts = {
  'royal-bengal-tiger': {
    en: 'A Royal Bengal tiger resting in the shade at Bangladesh National Zoo',
    bn: 'বাংলাদেশ জাতীয় চিড়িয়াখানায় ছায়ায় বিশ্রামরত রয়েল বেঙ্গল টাইগার',
  },
  rhinoceros: {
    en: 'A white rhinoceros standing in a wide, grassy enclosure',
    bn: 'প্রশস্ত ঘাসযুক্ত আবাসে দাঁড়িয়ে থাকা সাদা গণ্ডার',
  },
  giraffe: {
    en: 'A giraffe walking across its enclosure at the zoo',
    bn: 'চিড়িয়াখানার আবাসে হেঁটে চলা জিরাফ',
  },
  'asian-elephant': {
    en: 'An Asian elephant standing under a shelter',
    bn: 'আশ্রয়ের নিচে দাঁড়িয়ে থাকা এশীয় হাতি',
  },
  'aviary-and-birds': {
    en: 'A peacock displaying its colourful train',
    bn: 'রঙিন পেখম মেলা ময়ূর',
  },
  aquarium: {
    en: 'A large, blue-lit aquarium tank filled with fish',
    bn: 'মাছে ভরা নীল আলোর বড় অ্যাকোয়ারিয়াম ট্যাংক',
  },
  'zoological-museum': {
    en: 'Natural history specimen displays inside a museum',
    bn: 'জাদুঘরে সংরক্ষিত প্রাকৃতিক ইতিহাসের নমুনা',
  },
  'childrens-park': {
    en: 'A shaded green play area for children',
    bn: 'শিশুদের জন্য ছায়াযুক্ত সবুজ খেলার এলাকা',
  },
}

const featuredAttractions = attractions.map((item) => ({
  ...item,
  imageAlt: attractionAlts[item.slug],
}))

const additional = {
  en: {
    site: {
      name: 'Bangladesh National Zoo',
      location: 'Mirpur, Dhaka',
      homeLabel: 'Bangladesh National Zoo — home',
      tagline: 'Wild Bangladesh — where nature comes alive.',
      emergencyNote:
        'In an emergency inside the zoo, contact the nearest member of zoo staff or the information centre.',
    },
    nav: {
      home: 'Home',
      visit: 'Plan a Visit',
      animals: 'Animals & Exhibits',
      map: 'Map',
      conservation: 'Learn & Conserve',
      news: 'News & Notices',
      contact: 'Contact',
    },
    common: {
      clearSearch: 'Clear search',
      closeDialog: 'Close dialog',
      loadingMap: 'Loading map…',
      opensNewTab: 'Opens in a new tab',
    },
    today: {
      hoursRange: '9:00 AM – 6:00 PM',
      childFree: 'Children up to 2 enter free',
      closedSunday: 'Closed Sundays',
      todayIs: 'Today is',
      nextOpenDay: 'Opens',
      at: 'at',
      openNote: 'Last entry 30 minutes before closing.',
      closedSundayDetail: 'The zoo is closed on Sundays. The next opening is',
      closedAfterDetail: 'The gates are closed for today. The next opening is',
      closedBeforeDetail: 'The gates open today at 9:00 AM.',
      closesDetail: 'Closes at 6:00 PM',
      closingSoonDetail: 'Closing soon — last entry is 5:30 PM',
      openProgressLabel: 'Time until closing',
    },
    stats: {
      note: 'Figures are indicative and can change with births, transfers and rescues.',
    },
    attractions: {
      photoNote:
        'Photographs are representative. Replace them with official zoo photography before launch — see the photo credits and README.',
      ctaTitle: 'See the full animal collection',
      ctaText: 'Search mammals, birds, reptiles and fish.',
    },
    animals: {
      photoNote:
        'Species photographs are representative. Some were taken at other zoos; full attribution is available in the photo credits.',
      showing: 'Showing',
      of: 'of',
      openProfile: 'Open animal profile',
    },
    visit: {
      assistantNote: 'One accompanying assistant also enters free.',
      tipsTitle: 'Good to know',
      tipsIntro: 'Small preparations make a long, warm day much easier.',
      metroNote: 'Nearest metro: Mirpur 10, then a short CNG or rickshaw ride.',
      busNote: 'Ask for Zoo Road or the National Zoo stop on Mirpur Road.',
      carNote: 'Parking is limited; ride-hailing is easiest at busy times.',
      mapCta: 'Open in Google Maps',
      ticketLabel: 'General admission',
      ageNote: 'Visitors above 2 years',
      museumNoteShort: 'Separate ticket',
      hoursNote: 'Open daily except Sunday. Public holidays can change the schedule.',
      rulesNote: 'These simple rules protect the animals and help everyone enjoy the day.',
      planCta: 'Read visitor FAQs',
    },
    social: {
      facebook: 'Facebook — official link pending',
      instagram: 'Instagram — official link pending',
      youtube: 'YouTube — official link pending',
    },
    contact: {
      phonePlaceholder: '[Add official phone number]',
      emailPlaceholder: '[Add official email address]',
      mapNote:
        'Map data © OpenStreetMap contributors. The marker shows the zoo area; follow on-site signs to the main gate.',
      mapIframeTitle: 'OpenStreetMap showing Bangladesh National Zoo in Mirpur, Dhaka',
      socialTitle: 'Official social channels',
      socialNote: '[Add official social links in js/data.js]',
      directionsLabel: 'Zoo Road, Mirpur, Dhaka-1216',
      mapCoords: '23.8127° N, 90.3445° E',
    },
    footer: {
      ministryCredit: 'An initiative of the Ministry of Fisheries and Livestock',
      socialTitle: 'Follow the zoo',
      socialNote: '[Add official social links in js/data.js]',
      concept: 'Independent design concept',
      photoCredits: 'Photo credits',
      accessibilityNote: 'Built for keyboard, screen-reader and mobile visitors.',
    },
    credits: {
      replaceNote:
        'To publish official zoo photography, replace the matching files in the images/ folder at 640, 1200 and 2000 pixels wide (keep the same base names). Update alt text in js/data.js.',
    },
    dialog: {
      close: 'Close',
      photoCredit: 'Photograph',
      readOriginal: 'View original source',
    },
    meta: {
      title: 'Bangladesh National Zoo — Plan your visit, meet the animals',
      description:
        'Bangladesh National Zoo, Mirpur, Dhaka. Opening hours, BDT 50 tickets, directions, animals, exhibits, conservation and visitor notices — everything you need in one calm place.',
    },
  },
  bn: {
    site: {
      name: 'বাংলাদেশ জাতীয় চিড়িয়াখানা',
      location: 'মিরপুর, ঢাকা',
      homeLabel: 'বাংলাদেশ জাতীয় চিড়িয়াখানা — হোম',
      tagline: 'বন্য বাংলাদেশ — যেখানে প্রকৃতি প্রাণ পায়।',
      emergencyNote:
        'চিড়িয়াখানার ভেতরে জরুরি পরিস্থিতিতে নিকটস্থ কর্মী বা তথ্যকেন্দ্রের সঙ্গে যোগাযোগ করুন।',
    },
    nav: {
      home: 'হোম',
      visit: 'ভ্রমণের পরিকল্পনা',
      animals: 'প্রাণী ও প্রদর্শনী',
      map: 'মানচিত্র',
      conservation: 'শিখুন ও সংরক্ষণ করুন',
      news: 'সংবাদ ও বিজ্ঞপ্তি',
      contact: 'যোগাযোগ',
    },
    common: {
      clearSearch: 'অনুসন্ধান মুছুন',
      closeDialog: 'ডায়ালগ বন্ধ করুন',
      loadingMap: 'মানচিত্র লোড হচ্ছে…',
      opensNewTab: 'নতুন ট্যাবে খুলবে',
    },
    today: {
      hoursRange: 'সকাল ৯:০০ – সন্ধ্যা ৬:০০',
      childFree: '২ বছর পর্যন্ত শিশু বিনামূল্যে',
      closedSunday: 'প্রতি রবিবার বন্ধ',
      todayIs: 'আজ',
      nextOpenDay: 'খুলবে',
      at: 'সময়',
      openNote: 'শেষ প্রবেশ বন্ধের ৩০ মিনিট আগে।',
      closedSundayDetail: 'রবিবার চিড়িয়াখানা বন্ধ থাকে। পরবর্তী খোলার সময়',
      closedAfterDetail: 'আজকের মতো ফটক বন্ধ। পরবর্তী খোলার সময়',
      closedBeforeDetail: 'আজ সকাল ৯টায় ফটক খুলবে।',
      closesDetail: 'সন্ধ্যা ৬টায় বন্ধ',
      closingSoonDetail: 'শিগগিরই বন্ধ — শেষ প্রবেশ বিকেল ৫:৩০',
      openProgressLabel: 'বন্ধ হওয়ার আগে সময়',
    },
    stats: {
      note: 'সংখ্যাগুলো নির্দেশক; জন্ম, বদলি ও উদ্ধারের সঙ্গে পরিবর্তন হতে পারে।',
    },
    attractions: {
      photoNote:
        'ছবিগুলো প্রতিনিধিত্বমূলক। প্রকাশের আগে সরকারি চিড়িয়াখানার ছবি দিয়ে প্রতিস্থাপন করুন — ছবির ক্রেডিট ও README দেখুন।',
      ctaTitle: 'পুরো প্রাণী সংগ্রহ দেখুন',
      ctaText: 'স্তন্যপায়ী, পাখি, সরীসৃপ ও মাছ খুঁজুন।',
    },
    animals: {
      photoNote:
        'প্রজাতির ছবি প্রতিনিধিত্বমূলক। কিছু ছবি অন্য চিড়িয়াখানায় তোলা; সম্পূর্ণ কৃতিত্ব ছবির ক্রেডিটে।',
      showing: 'দেখানো হচ্ছে',
      of: 'এর মধ্যে',
      openProfile: 'প্রাণীর প্রোফাইল খুলুন',
    },
    visit: {
      assistantNote: 'সঙ্গে আসা একজন সহায়কও বিনামূল্যে প্রবেশ করতে পারেন।',
      tipsTitle: 'জেনে রাখুন',
      tipsIntro: 'সামান্য প্রস্তুতিই গরমের দীর্ঘ দিনটিকে অনেক সহজ করে দেয়।',
      metroNote: 'নিকটতম মেট্রো: মিরপুর ১০, তারপর সিএনজি বা রিকশায় অল্প পথ।',
      busNote: 'মিরপুর রোডে বাস থেকে “জু রোড” বা “জাতীয় চিড়িয়াখানা” স্টপে নামুন।',
      carNote: 'পার্কিং সীমিত; ভিড়ের সময় রাইড-হেইলিং সবচেয়ে সহজ।',
      mapCta: 'গুগল ম্যাপে খুলুন',
      ticketLabel: 'সাধারণ প্রবেশ',
      ageNote: '২ বছরের বেশি বয়সী দর্শনার্থী',
      museumNoteShort: 'আলাদা টিকিট',
      hoursNote: 'রবিবার ছাড়া প্রতিদিন খোলা। সরকারি ছুটিতে সময়সূচি বদলাতে পারে।',
      planCta: 'দর্শনার্থীদের সাধারণ প্রশ্ন',
      rulesNote: 'এই সহজ নিয়মগুলো প্রাণীদের সুরক্ষা দেয় এবং সবাইকে দিনটি উপভোগ করতে সাহায্য করে।',
    },
    social: {
      facebook: 'ফেসবুক — সরকারি লিংক যোগ করা হয়নি',
      instagram: 'ইনস্টাগ্রাম — সরকারি লিংক যোগ করা হয়নি',
      youtube: 'ইউটিউব — সরকারি লিংক যোগ করা হয়নি',
    },
    contact: {
      phonePlaceholder: '[অফিসিয়াল ফোন নম্বর যোগ করুন]',
      emailPlaceholder: '[অফিসিয়াল ইমেইল যোগ করুন]',
      mapNote:
        'মানচিত্রের তথ্য © ওপেনস্ট্রিটম্যাপ অবদানকারী। চিহ্নটি চিড়িয়াখানা এলাকা দেখায়; প্রধান ফটকের জন্য মাঠের নির্দেশনা অনুসরণ করুন।',
      mapIframeTitle: 'মিরপুর, ঢাকার বাংলাদেশ জাতীয় চিড়িয়াখানা দেখানো ওপেনস্ট্রিটম্যাপ',
      socialTitle: 'সরকারি সামাজিক চ্যানেল',
      socialNote: '[js/data.js-এ সরকারি সোশ্যাল লিংক যোগ করুন]',
      directionsLabel: 'জু রোড, মিরপুর, ঢাকা-১২১৬',
      mapCoords: '২৩.৮১২৭° উত্তর, ৯০.৩৪৪৫° পূর্ব',
    },
    footer: {
      ministryCredit: 'মৎস্য ও প্রাণিসম্পদ মন্ত্রণালয়ের একটি উদ্যোগ',
      socialTitle: 'চিড়িয়াখানার সঙ্গে থাকুন',
      socialNote: '[js/data.js-এ সরকারি সোশ্যাল লিংক যোগ করুন]',
      concept: 'স্বতন্ত্র ডিজাইন ধারণা',
      photoCredits: 'ছবির কৃতিত্ব',
      accessibilityNote: 'কিবোর্ড, স্ক্রিন-রিডার ও মোবাইল দর্শনার্থীদের জন্য তৈরি।',
    },
    credits: {
      replaceNote:
        'সরকারি ছবি প্রকাশ করতে images/ ফোল্ডারের একই নামের ফাইল ৬৪০, ১২০০ ও ২০০০ পিক্সেল প্রস্থে প্রতিস্থাপন করুন। js/data.js-এ alt লেখাও হালনাগাদ করুন।',
    },
    dialog: {
      close: 'বন্ধ করুন',
      photoCredit: 'ছবি',
      readOriginal: 'মূল উৎস দেখুন',
    },
    meta: {
      title: 'বাংলাদেশ জাতীয় চিড়িয়াখানা — ভ্রমণ পরিকল্পনা ও প্রাণী পরিচিতি',
      description:
        'মিরপুর, ঢাকার বাংলাদেশ জাতীয় চিড়িয়াখানা। খোলার সময়, ৫০ টাকার টিকিট, দিকনির্দেশ, প্রাণী, প্রদর্শনী, সংরক্ষণ ও দর্শনার্থী বিজ্ঞপ্তি—সব এক জায়গায়।',
    },
  },
}

function merge(base, extra) {
  const output = { ...base }
  for (const [key, value] of Object.entries(extra)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      output[key] = merge(output[key] || {}, value)
    } else {
      output[key] = value
    }
  }
  return output
}

const mergedTranslations = {
  en: merge(translations.en, additional.en),
  bn: merge(translations.bn, additional.bn),
}

const selectedFaqIds = [
  'hours',
  'tickets',
  'booking',
  'getting-there',
  'duration',
  'accessibility',
  'feeding',
  'facilities',
]

const faqSubset = selectedFaqIds
  .map((id) => faqs.find((item) => item.id === id))
  .filter(Boolean)

const features = conservationFeatures.map((item, index) => ({
  ...item,
  icon: ['shield', 'school', 'microscope'][index],
  title:
    index === 2
      ? {
          en: 'Student internships',
          bn: 'শিক্ষার্থী ইন্টার্নশিপ',
        }
      : item.title,
}))

const data = {
  site: {
    name: {
      en: 'Bangladesh National Zoo',
      bn: 'বাংলাদেশ জাতীয় চিড়িয়াখানা',
    },
    established: 1974,
    tagline: {
      en: 'Wild Bangladesh — where nature comes alive.',
      bn: 'বন্য বাংলাদেশ — যেখানে প্রকৃতি প্রাণ পায়।',
    },
    address: {
      en: 'Zoo Road, Mirpur, Dhaka-1216, Bangladesh',
      bn: 'জু রোড, মিরপুর, ঢাকা-১২১৬, বাংলাদেশ',
      lines: {
        en: ['Bangladesh National Zoo', 'Zoo Road, Mirpur', 'Dhaka-1216, Bangladesh'],
        bn: ['বাংলাদেশ জাতীয় চিড়িয়াখানা', 'জু রোড, মিরপুর', 'ঢাকা-১২১৬, বাংলাদেশ'],
      },
    },
    coordinates: { lat: 23.8127, lng: 90.3445 },
    // Deliberately placeholders — never invent official contact details.
    phone: {
      en: '[Add official phone number]',
      bn: '[অফিসিয়াল ফোন নম্বর যোগ করুন]',
    },
    email: {
      en: '[Add official email address]',
      bn: '[অফিসিয়াল ইমেইল যোগ করুন]',
    },
    officialWebsite: 'https://bnzoo.gov.bd/',
    ministry: {
      en: 'Ministry of Fisheries and Livestock',
      bn: 'মৎস্য ও প্রাণিসম্পদ মন্ত্রণালয়',
    },
    government: {
      en: "Government of the People's Republic of Bangladesh",
      bn: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার',
    },
    social: [
      { id: 'facebook', url: null },
      { id: 'instagram', url: null },
      { id: 'youtube', url: null },
    ],
    mapDirections:
      'https://www.google.com/maps/dir/?api=1&destination=23.8127%2C90.3445',
    mapEmbed:
      'https://www.openstreetmap.org/export/embed.html?bbox=90.3345%2C23.8057%2C90.3545%2C23.8197&layer=mapnik&marker=23.8127%2C90.3445',
    mapLink:
      'https://www.openstreetmap.org/?mlat=23.8127&mlon=90.3445#map=17/23.8127/90.3445',
    emergencyNote: {
      en: 'In an emergency inside the zoo, contact the nearest member of zoo staff or the information centre.',
      bn: 'চিড়িয়াখানার ভেতরে জরুরি পরিস্থিতিতে নিকটস্থ কর্মী বা তথ্যকেন্দ্রের সঙ্গে যোগাযোগ করুন।',
    },
  },
  hours: {
    open: 9,
    close: 18,
    closedWeekday: 0,
    timeZone: 'Asia/Dhaka',
    ticket: 50,
    museumTicket: 10,
    lastEntryMinutes: 30,
  },
  stats: [
    { id: 'acres', value: 186, suffix: '', labelKey: 'stats.acres' },
    { id: 'species', value: 137, suffix: '+', labelKey: 'stats.species' },
    { id: 'animals', value: 3000, suffix: '+', labelKey: 'stats.animals' },
    { id: 'established', value: 1974, suffix: '', labelKey: 'stats.established' },
  ],
  attractions: featuredAttractions,
  animalCategories,
  animals,
  guidelines: [
    {
      id: 'feeding',
      icon: 'ban',
      title: { en: 'Do not feed the animals', bn: 'প্রাণীদের খাবার দেবেন না' },
      text: {
        en: 'Human food can make animals seriously ill. Leave all feeding to the zoo team.',
        bn: 'মানুষের খাবার প্রাণীদের গুরুতর অসুস্থ করে তুলতে পারে। খাওয়ানোর কাজ চিড়িয়াখানা দলের জন্য রাখুন।',
      },
    },
    {
      id: 'disturbing',
      icon: 'volume',
      title: { en: 'Do not disturb wildlife', bn: 'বন্যপ্রাণীকে বিরক্ত করবেন না' },
      text: {
        en: 'Keep voices low, never tap on glass or enclosures, and give animals space to rest.',
        bn: 'আওয়াজ কম রাখুন, কাচ বা খাঁচায় টোকা দেবেন না এবং প্রাণীদের বিশ্রামের সুযোগ দিন।',
      },
    },
    {
      id: 'waste',
      icon: 'trash',
      title: { en: 'Take waste with you', bn: 'ময়লা সঙ্গে নিয়ে যান' },
      text: {
        en: 'Use the bins provided. Plastic can harm animals and contaminate the lakes.',
        bn: 'প্রদত্ত ডাস্টবিন ব্যবহার করুন। প্লাস্টিক প্রাণীদের ক্ষতি করে এবং হ্রদের পানি দূষিত করে।',
      },
    },
    {
      id: 'children',
      icon: 'users',
      title: { en: 'Supervise children', bn: 'শিশুদের তত্ত্বাবধানে রাখুন' },
      text: {
        en: 'Keep children close, especially near water, barriers and busy paths.',
        bn: 'বিশেষ করে পানির কাছে, বেড়ার কাছে ও ভিড়ের পথে শিশুদের কাছে রাখুন।',
      },
    },
    {
      id: 'barriers',
      icon: 'fence',
      title: { en: 'Respect safety barriers', bn: 'নিরাপত্তা বেড়া সম্মান করুন' },
      text: {
        en: 'Never cross barriers or enter restricted areas, even for a photograph.',
        bn: 'ছবি তোলার জন্যও বেড়া পার হবেন না বা নিষিদ্ধ এলাকায় ঢুকবেন না।',
      },
    },
    {
      id: 'staff',
      icon: 'shield',
      title: { en: 'Follow staff instructions', bn: 'কর্মীদের নির্দেশনা অনুসরণ করুন' },
      text: {
        en: 'Staff directions keep you, other visitors and the animals safe.',
        bn: 'কর্মীদের নির্দেশনা আপনার, অন্য দর্শনার্থীদের ও প্রাণীদের নিরাপত্তার জন্য।',
      },
    },
  ],
  tips: [
    {
      id: 'early',
      icon: 'sun',
      title: { en: 'Start early', bn: 'সকালে শুরু করুন' },
      text: {
        en: 'Mornings are cooler, quieter and often the best time to see animals active.',
        bn: 'সকালে আবহাওয়া ঠান্ডা, ভিড় কম এবং প্রাণীরা প্রায়ই বেশি সক্রিয় থাকে।',
      },
    },
    {
      id: 'water',
      icon: 'droplet',
      title: { en: 'Carry water & shade', bn: 'পানি ও ছায়ার ব্যবস্থা নিন' },
      text: {
        en: 'Bring more water than you expect to need and plan a shaded break at midday.',
        bn: 'প্রয়োজনের চেয়ে বেশি পানি নিন এবং দুপুরে ছায়ায় বিরতির পরিকল্পনা করুন।',
      },
    },
    {
      id: 'shoes',
      icon: 'footsteps',
      title: { en: 'Wear comfortable shoes', bn: 'আরামদায়ক জুতা পরুন' },
      text: {
        en: 'The grounds are large and some paths are uneven. Sun protection helps too.',
        bn: 'প্রাঙ্গণ বড় এবং কিছু পথ অসমতল। রোদ থেকে সুরক্ষাও কাজে দেবে।',
      },
    },
    {
      id: 'meeting',
      icon: 'pin',
      title: { en: 'Agree a meeting point', bn: 'মিলিত হওয়ার স্থান ঠিক করুন' },
      text: {
        en: 'Keep children close near water and barriers, and agree where to meet if you separate.',
        bn: 'পানি ও বেড়ার কাছে শিশুদের কাছে রাখুন এবং আলাদা হয়ে গেলে কোথায় মিলিত হবেন ঠিক করুন।',
      },
    },
  ],
  travelModes: [
    { id: 'metro', icon: 'train', titleKey: 'visit.metro', textKey: 'visit.metroText', noteKey: 'visit.metroNote' },
    { id: 'bus', icon: 'bus', titleKey: 'visit.bus', textKey: 'visit.busText', noteKey: 'visit.busNote' },
    { id: 'car', icon: 'car', titleKey: 'visit.car', textKey: 'visit.carText', noteKey: 'visit.carNote' },
  ],
  conservation: {
    features,
    pillars: conservationPillars,
    schoolVisitSteps,
    quote: {
      en: 'A child who understands a habitat is far more likely to defend it.',
      bn: 'যে শিশু একটি আবাসস্থল বোঝে, সে তা রক্ষা করার সম্ভাবনা অনেক বেশি রাখে।',
    },
    quoteAttribution: {
      en: 'The idea behind conservation education',
      bn: 'সংরক্ষণ শিক্ষার মূল ভাবনা',
    },
    images: {
      main: 'education',
      inset: 'tiger-sundarbans',
    },
  },
  news: news.map((item) => ({ ...item, isSample: true })),
  faqs: faqSubset,
  imageCredits,
  translations: mergedTranslations,
}

const header = `/**
 * Bangladesh National Zoo — single content source.
 * ...
 */
`

fs.writeFileSync(
  'js/data.js',
  `${header}window.ZOO = ${JSON.stringify(data, null, 2)};\n`,
  'utf8',
)
console.log('Wrote js/data.js')
