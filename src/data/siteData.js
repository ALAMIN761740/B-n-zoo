/**
 * Central identity + visitor information.
 * Verified facts are from the brief and public zoo reporting. Items marked
 * `needsVerification` must be confirmed with the zoo before launch.
 */

export const site = {
  name: {
    en: 'Bangladesh National Zoo',
    bn: 'বাংলাদেশ জাতীয় চিড়িয়াখানা',
  },
  legalName: {
    en: 'Bangladesh National Zoo',
    bn: 'বাংলাদেশ জাতীয় চিড়িয়াখানা',
  },
  shortName: {
    en: 'National Zoo',
    bn: 'জাতীয় চিড়িয়াখানা',
  },
  tagline: {
    en: 'Wild Bangladesh — where nature comes alive.',
    bn: 'বন্য বাংলাদেশ — যেখানে প্রকৃতি প্রাণ পায়।',
  },
  description: {
    en: 'A 186-acre national zoo in Mirpur, Dhaka, caring for wildlife and connecting people with nature since 1974.',
    bn: '১৯৭৪ সাল থেকে বন্যপ্রাণীর যত্ন ও প্রকৃতির সঙ্গে মানুষের সম্পর্ক গড়ে তোলা মিরপুর, ঢাকার ১৮৬ একরের জাতীয় চিড়িয়াখানা।',
  },
  established: 1974,
  domain: 'https://bnzoo.gov.bd',
  officialWebsite: 'https://bnzoo.gov.bd/',
  ministry: {
    en: 'Ministry of Fisheries and Livestock',
    bn: 'মৎস্য ও প্রাণিসম্পদ মন্ত্রণালয়',
  },
  government: {
    en: "Government of the People's Republic of Bangladesh",
    bn: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার',
  },
  address: {
    en: 'Zoo Road, Mirpur, Dhaka-1216, Bangladesh',
    bn: 'জু রোড, মিরপুর, ঢাকা-১২১৬, বাংলাদেশ',
    lines: {
      en: ['Bangladesh National Zoo', 'Zoo Road, Mirpur', 'Dhaka-1216, Bangladesh'],
      bn: ['বাংলাদেশ জাতীয় চিড়িয়াখানা', 'জু রোড, মিরপুর', 'ঢাকা-১২১৬, বাংলাদেশ'],
    },
  },
  coordinates: { lat: 23.812674, lng: 90.346923 },
  // Deliberately blank until the official channels are confirmed.
  phone: null,
  email: null,
  social: [],
  mapDirections:
    'https://www.google.com/maps/dir/?api=1&destination=23.812674%2C90.346923&travelmode=transit',
  mapEmbed:
    'https://www.openstreetmap.org/?mlat=23.812674&mlon=90.346923#map=17/23.812674/90.346923',
  emergencyNote: {
    en: 'In an emergency inside the zoo, contact the nearest member of zoo staff or the information centre.',
    bn: 'চিড়িয়াখানার ভেতরে জরুরি পরিস্থিতিতে নিকটস্থ কর্মী বা তথ্যকেন্দ্রের সঙ্গে যোগাযোগ করুন।',
  },
}

export const openingHours = {
  seasons: [
    { id: 'summer', open: 9, close: 18, months: [4, 9], labelKey: 'today.seasonAprSep' },
    { id: 'winter', open: 9, close: 17, months: [10, 3], labelKey: 'today.seasonOctMar' },
  ],
  closedWeekday: 0,
  lastEntryMinutes: 30,
  holidayNote: true,
}

export const tickets = [
  { id: 'general', price: 50, labelKey: 'visit.tickets.general', noteKey: null },
  {
    id: 'student',
    price: 25,
    labelKey: 'visit.tickets.student',
    noteKey: 'visit.tickets.studentNote',
  },
  {
    id: 'child',
    price: 0,
    labelKey: 'visit.tickets.child',
    noteKey: 'visit.tickets.childNote',
  },
  {
    id: 'disability',
    price: 0,
    labelKey: 'visit.tickets.disability',
    noteKey: 'visit.tickets.disabilityNote',
  },
  {
    id: 'museum',
    price: 10,
    labelKey: 'visit.tickets.museum',
    noteKey: 'visit.tickets.museumNote',
  },
]

export const statistics = [
  { id: 'acres', value: 186, suffix: '', labelKey: 'stats.acres' },
  { id: 'species', value: 191, suffix: '+', labelKey: 'stats.species' },
  { id: 'animals', value: 2150, suffix: '+', labelKey: 'stats.animals' },
  { id: 'established', value: 1974, suffix: '', labelKey: 'stats.established' },
]

export const facilities = [
  {
    id: 'info',
    icon: 'Info',
    name: { en: 'Information centre', bn: 'তথ্যকেন্দ্র' },
    description: {
      en: 'Visitor information and lost-and-found support near the main entrance.',
      bn: 'মূল ফটকের কাছে দর্শনার্থী তথ্য ও হারানো জিনিসের সহায়তা।',
    },
  },
  {
    id: 'toilets',
    icon: 'Accessibility',
    name: { en: 'Public toilets', bn: 'পাবলিক টয়লেট' },
    description: {
      en: 'Public toilet facilities are located at several points across the grounds.',
      bn: 'চিড়িয়াখানার বিভিন্ন স্থানে পাবলিক টয়লেট রয়েছে।',
    },
  },
  {
    id: 'prayer',
    icon: 'Moon',
    name: { en: 'Prayer facilities', bn: 'নামাজের ব্যবস্থা' },
    description: {
      en: 'Prayer facilities are available within the zoo grounds.',
      bn: 'চিড়িয়াখানার ভেতরে নামাজের ব্যবস্থা রয়েছে।',
    },
  },
  {
    id: 'parking',
    icon: 'Car',
    name: { en: 'Parking', bn: 'পার্কিং' },
    description: {
      en: 'Limited parking is available near the entrance. Public transport is recommended.',
      bn: 'প্রবেশপথের কাছে সীমিত পার্কিং রয়েছে। গণপরিবহন ব্যবহারের পরামর্শ দেওয়া হচ্ছে।',
    },
  },
  {
    id: 'resting',
    icon: 'Armchair',
    name: { en: 'Resting areas', bn: 'বিশ্রামের স্থান' },
    description: {
      en: 'Shaded seating and resting areas are available along the main paths.',
      bn: 'প্রধান পথের পাশে ছায়াযুক্ত বসার ও বিশ্রামের ব্যবস্থা রয়েছে।',
    },
  },
  {
    id: 'children',
    icon: 'ToyBrick',
    name: { en: "Children's park", bn: 'শিশুপার্ক' },
    description: {
      en: 'A dedicated play area for younger visitors, inside the zoo grounds.',
      bn: 'ছোটদের জন্য চিড়িয়াখানার ভেতরে আলাদা খেলার জায়গা।',
    },
  },
  {
    id: 'museum',
    icon: 'Landmark',
    name: { en: 'Zoological Museum', bn: 'প্রাণিবিজ্ঞান জাদুঘর' },
    description: {
      en: 'A separate-ticket museum with natural history displays.',
      bn: 'প্রকৃতির ইতিহাসের সংগ্রহ নিয়ে আলাদা টিকিটের জাদুঘর।',
    },
  },
  {
    id: 'accessibility',
    icon: 'Accessibility',
    name: { en: 'Accessibility support', bn: 'প্রতিবন্ধী সহায়তা' },
    description: {
      en: 'Support is available on request. Please confirm current facilities at the information desk.',
      bn: 'অনুরোধে সহায়তা পাওয়া যায়। বর্তমান সুবিধা সম্পর্কে তথ্যকেন্দ্রে নিশ্চিত হোন।',
    },
  },
]

export const guidelines = [
  {
    id: 'feeding',
    icon: 'Ban',
    title: { en: 'Do not feed the animals', bn: 'প্রাণীদের খাবার দেবেন না' },
    text: {
      en: 'Human food can make animals seriously ill. Please leave feeding to the zoo team.',
      bn: 'মানুষের খাবার প্রাণীদের গুরুতর অসুস্থ করে তুলতে পারে। খাওয়ানোর কাজ চিড়িয়াখানা দলের জন্য রাখুন।',
    },
  },
  {
    id: 'disturbing',
    icon: 'VolumeX',
    title: { en: 'Do not disturb wildlife', bn: 'বন্যপ্রাণীকে বিরক্ত করবেন না' },
    text: {
      en: 'Keep voices low, never tap on glass or enclosures, and give animals space to rest.',
      bn: 'আওয়াজ কম রাখুন, কাচ বা খাঁচায় টোকা দেবেন না এবং প্রাণীদের বিশ্রামের সুযোগ দিন।',
    },
  },
  {
    id: 'waste',
    icon: 'Trash2',
    title: { en: 'Take waste with you', bn: 'ময়লা সঙ্গে নিয়ে যান' },
    text: {
      en: 'Use the bins provided. Plastic can harm animals and contaminate the lakes.',
      bn: 'প্রদত্ত ডাস্টবিন ব্যবহার করুন। প্লাস্টিক প্রাণীদের ক্ষতি করে এবং হ্রদের পানি দূষিত করে।',
    },
  },
  {
    id: 'staff',
    icon: 'ShieldCheck',
    title: { en: 'Follow zoo staff instructions', bn: 'কর্মীদের নির্দেশনা অনুসরণ করুন' },
    text: {
      en: 'Staff directions are there to keep you, other visitors and the animals safe.',
      bn: 'কর্মীদের নির্দেশনা আপনার, অন্য দর্শনার্থীদের ও প্রাণীদের নিরাপত্তার জন্য।',
    },
  },
  {
    id: 'children',
    icon: 'Users',
    title: { en: 'Supervise children', bn: 'শিশুদের তত্ত্বাবধানে রাখুন' },
    text: {
      en: 'Keep children close, especially near water, barriers and busy paths.',
      bn: 'বিশেষ করে পানির কাছে, বেড়ার কাছে ও ভিড়ের পথে শিশুদের কাছে রাখুন।',
    },
  },
  {
    id: 'barriers',
    icon: 'Fence',
    title: { en: 'Respect safety barriers', bn: 'নিরাপত্তা বেড়া সম্মান করুন' },
    text: {
      en: 'Never cross barriers or enter restricted areas, even for a photograph.',
      bn: 'ছবি তোলার জন্যও বেড়া পার হবেন না বা নিষিদ্ধ এলাকায় ঢুকবেন না।',
    },
  },
]

export const travelModes = [
  {
    id: 'metro',
    icon: 'TrainFront',
    titleKey: 'visit.directions.metro',
    textKey: 'visit.directions.metroText',
  },
  {
    id: 'bus',
    icon: 'BusFront',
    titleKey: 'visit.directions.bus',
    textKey: 'visit.directions.busText',
  },
  {
    id: 'car',
    icon: 'CarFront',
    titleKey: 'visit.directions.car',
    textKey: 'visit.directions.carText',
  },
]

export const editorialNotes = {
  statistics: {
    en: 'Collection figures are based on the most recent public counts and should be verified with zoo authorities before publication.',
    bn: 'সংগ্রহসংখ্যা সর্বশেষ প্রকাশিত গণনার ভিত্তিতে; প্রকাশের আগে চিড়িয়াখানা কর্তৃপক্ষের সঙ্গে যাচাই করা উচিত।',
  },
  contact: {
    en: 'Verified phone and email details were not available for this redesign. Please use the official website for zoo office enquiries.',
    bn: 'এই রিডিজাইনের জন্য যাচাইকৃত ফোন ও ইমেইল পাওয়া যায়নি। চিড়িয়াখানা অফিসের জিজ্ঞাসার জন্য সরকারি ওয়েবসাইট ব্যবহার করুন।',
  },
  photography: {
    en: 'Species photographs are representative; some were taken at other zoos. See photography credits for full attribution.',
    bn: 'প্রজাতির ছবি প্রতিনিধিত্বমূলক; কিছু ছবি অন্য চিড়িয়াখানায় তোলা। সম্পূর্ণ স্বীকৃতির জন্য ছবির ক্রেডিট দেখুন।',
  },
  map: {
    en: 'Illustrative map. Marker positions are indicative and do not represent an official zoo layout.',
    bn: 'চিত্রণমূলক ম্যাপ। মার্কারগুলোর অবস্থান আনুমানিক এবং এটি সরকারি চিড়িয়াখানা লেআউট নয়।',
  },
  news: {
    en: 'These entries are clearly labelled editorial samples. Replace them with verified official notices before publication.',
    bn: 'এই লেখাগুলো স্পষ্টভাবে চিহ্নিত সম্পাদকীয় নমুনা। প্রকাশের আগে যাচাইকৃত সরকারি বিজ্ঞপ্তি দিয়ে প্রতিস্থাপন করুন।',
  },
}
