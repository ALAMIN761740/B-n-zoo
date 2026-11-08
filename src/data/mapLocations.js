/**
 * Illustrative map points. Approximate positions are placed around the zoo's
 * OpenStreetMap location for wayfinding demonstration only. They are NOT an
 * official survey of enclosure locations. Replace with verified coordinates
 * when the zoo publishes an authoritative map.
 */
export const mapCentre = [23.8127, 90.3446]

export const mapCategories = [
  { id: 'all', label: { en: 'All places', bn: 'সব স্থান' } },
  { id: 'highlights', label: { en: 'Animal highlights', bn: 'প্রাণী প্রদর্শনী' } },
  { id: 'attractions', label: { en: 'Attractions', bn: 'আকর্ষণ' } },
  { id: 'nature', label: { en: 'Nature & lakes', bn: 'প্রকৃতি ও হ্রদ' } },
  { id: 'facilities', label: { en: 'Visitor facilities', bn: 'দর্শনার্থী সুবিধা' } },
]

export const mapLocations = [
  {
    id: 'main-entrance',
    name: { en: 'Main entrance', bn: 'প্রধান ফটক' },
    category: 'facilities',
    position: [23.8089, 90.3452],
    description: {
      en: 'Ticketing, information centre and the starting point for your visit.',
      bn: 'টিকিট, তথ্যকেন্দ্র এবং ভ্রমণ শুরুর স্থান।',
    },
    icon: 'gate',
  },
  {
    id: 'tiger',
    name: { en: 'Royal Bengal Tiger', bn: 'রয়েল বেঙ্গল টাইগার' },
    category: 'highlights',
    position: [23.8141, 90.3429],
    description: {
      en: 'The zoo’s signature big-cat exhibit. Allow time for a quiet, patient look.',
      bn: 'চিড়িয়াখানার বিশেষ বড় বিড়াল প্রদর্শনী। শান্তভাবে সময় নিয়ে দেখুন।',
    },
    icon: 'paw',
    animal: 'royal-bengal-tiger',
  },
  {
    id: 'elephant',
    name: { en: 'Elephant enclosure', bn: 'হাতির আবাস' },
    category: 'highlights',
    position: [23.8152, 90.3458],
    description: {
      en: 'Home to the zoo’s Asian elephants, with a spacious outdoor area.',
      bn: 'চিড়িয়াখানার এশীয় হাতিদের প্রশস্ত বাইরের আবাস।',
    },
    icon: 'paw',
    animal: 'asian-elephant',
  },
  {
    id: 'giraffe',
    name: { en: 'Giraffe area', bn: 'জিরাফ এলাকা' },
    category: 'highlights',
    position: [23.8136, 90.3471],
    description: {
      en: 'Tall viewing points make this a favourite stop for families.',
      bn: 'উঁচু থেকে দেখার ব্যবস্থা থাকায় পরিবারগুলোর প্রিয় স্থান।',
    },
    icon: 'paw',
    animal: 'giraffe',
  },
  {
    id: 'rhino',
    name: { en: 'Rhinoceros enclosure', bn: 'গণ্ডারের আবাস' },
    category: 'highlights',
    position: [23.8149, 90.3417],
    description: {
      en: 'A large open enclosure for the zoo’s white rhinoceros.',
      bn: 'সাদা গণ্ডারের জন্য বড় খোলা আবাসস্থল।',
    },
    icon: 'paw',
    animal: 'white-rhinoceros',
  },
  {
    id: 'aviary',
    name: { en: 'Aviary & birds', bn: 'পাখিশালা ও পাখি' },
    category: 'attractions',
    position: [23.8116, 90.3424],
    description: {
      en: 'Walk through a chorus of peafowl, storks, pelicans and more.',
      bn: 'ময়ূর, সারস, পেলিকানসহ নানা পাখির কোলাহলের মাঝ দিয়ে হাঁটুন।',
    },
    icon: 'bird',
  },
  {
    id: 'aquarium',
    name: { en: 'Aquarium', bn: 'অ্যাকুরিয়াম' },
    category: 'attractions',
    position: [23.8118, 90.3462],
    description: {
      en: 'An indoor gallery of fish and aquatic life. A calmer, cooler stop.',
      bn: 'মাছ ও জলজ প্রাণীর ইনডোর গ্যালারি। শান্ত ও ঠান্ডা একটি বিরতি।',
    },
    icon: 'fish',
  },
  {
    id: 'museum',
    name: { en: 'Zoological Museum', bn: 'প্রাণিবিজ্ঞান জাদুঘর' },
    category: 'attractions',
    position: [23.8105, 90.3448],
    description: {
      en: 'Natural-history displays. Entry requires a separate BDT 10 ticket.',
      bn: 'প্রাকৃতিক ইতিহাসের সংগ্রহ। প্রবেশে আলাদা ১০ টাকা টিকিট প্রয়োজন।',
    },
    icon: 'museum',
  },
  {
    id: 'childrens-park',
    name: { en: "Children's Park", bn: 'শিশুদের পার্ক' },
    category: 'attractions',
    position: [23.8095, 90.3468],
    description: {
      en: 'An open, shaded space for younger visitors and family breaks.',
      bn: 'ছোট দর্শনার্থী ও পারিবারিক বিশ্রামের জন্য ছায়াযুক্ত খোলা জায়গা।',
    },
    icon: 'children',
  },
  {
    id: 'lake',
    name: { en: 'Zoo lakes', bn: 'চিড়িয়াখানার হ্রদ' },
    category: 'nature',
    position: [23.8161, 90.3445],
    description: {
      en: 'Water, reeds and birdlife — a slower corner of the grounds.',
      bn: 'পানি, নলখাগড়া ও পাখিদের বিচরণ — চিড়িয়াখানার শান্ত এক কোণ।',
    },
    icon: 'waves',
  },
  {
    id: 'botanical-edge',
    name: { en: 'Green walking route', bn: 'সবুজ হাঁটার পথ' },
    category: 'nature',
    position: [23.8130, 90.3438],
    description: {
      en: 'A leafy route through the heart of the zoo. Follow on-site signs.',
      bn: 'চিড়িয়াখানার প্রাণকেন্দ্র দিয়ে সবুজ হাঁটার পথ। মাঠের নির্দেশনা অনুসরণ করুন।',
    },
    icon: 'leaf',
  },
  {
    id: 'food',
    name: { en: 'Food & refreshments', bn: 'খাবার ও পানীয়' },
    category: 'facilities',
    position: [23.8108, 90.3436],
    description: {
      en: 'Snacks and drinks are available on site. Outside food rules may vary.',
      bn: 'চিড়িয়াখানায় খাবার ও পানীয় পাওয়া যায়। বাইরের খাবার সংক্রান্ত নিয়ম ভিন্ন হতে পারে।',
    },
    icon: 'food',
  },
  {
    id: 'toilets',
    name: { en: 'Public toilets', bn: 'জনসাধারণের টয়লেট' },
    category: 'facilities',
    position: [23.8120, 90.3458],
    description: {
      en: 'Visit the information desk if you need help finding the nearest facility.',
      bn: 'নিকটতম সুবিধা খুঁজে পেতে সাহায্যের জন্য তথ্যকেন্দ্রে যান।',
    },
    icon: 'toilet',
  },
  {
    id: 'prayer',
    name: { en: 'Prayer facilities', bn: 'নামাজের ব্যবস্থা' },
    category: 'facilities',
    position: [23.8128, 90.3438],
    description: {
      en: 'Designated prayer spaces are available within the zoo grounds.',
      bn: 'চিড়িয়াখানার ভেতরে নির্ধারিত নামাজের স্থান রয়েছে।',
    },
    icon: 'prayer',
  },
  {
    id: 'resting',
    name: { en: 'Resting area', bn: 'বিশ্রামের স্থান' },
    category: 'facilities',
    position: [23.8124, 90.3466],
    description: {
      en: 'Shaded seating for a pause between exhibits.',
      bn: 'প্রদর্শনীর মাঝে বিশ্রামের জন্য ছায়াযুক্ত বসার ব্যবস্থা।',
    },
    icon: 'resting',
  },
]

export const mapNote = {
  en: 'Marker positions are illustrative, not an official zoo layout. Follow on-site signs and ask at the information centre.',
  bn: 'মানচিত্রে চিহ্নগুলোর অবস্থান কেবল প্রদর্শনীমূলক, এটি অফিসিয়াল চিড়িয়াখানা লেআউট নয়। মাঠের নির্দেশনা অনুসরণ করুন এবং তথ্যকেন্দ্রে জিজ্ঞাসা করুন।',
}
