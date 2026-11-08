/**
 * Featured attractions — the zoo's headline animals and experiences.
 * `imageNote: 'illustrative'` is surfaced in the UI wherever a photograph
 * is representative rather than a verified picture of the named exhibit.
 */

export const attractions = [
  {
    slug: 'royal-bengal-tiger',
    name: { en: 'Royal Bengal Tiger', bn: 'রয়েল বেঙ্গল টাইগার' },
    category: 'wildlife',
    image: 'tiger-portrait',
    position: '50% 42%',
    order: 1,
    blurb: {
      en: 'The national animal, and the wild heart of the Sundarbans.',
      bn: 'জাতীয় প্রাণী, সুন্দরবনের বন্য হৃদয়।',
    },
    intro: {
      en: 'Meet the most iconic presence at Bangladesh National Zoo — a living link to the mangrove forests of the south.',
      bn: 'বাংলাদেশ জাতীয় চিড়িয়াখানার সবচেয়ে পরিচিত বাসিন্দার সঙ্গে পরিচিত হোন—দক্ষিণের ম্যানগ্রোভ বনের জীবন্ত সংযোগ।',
    },
    description: [
      {
        en: 'The Royal Bengal Tiger is inseparable from the story of Bangladesh. It is the national animal, a symbol of strength and a flagship for the protection of the Sundarbans. Seeing one at the zoo is an invitation to learn about the wild landscapes it represents.',
        bn: 'রয়েল বেঙ্গল টাইগার বাংলাদেশের ইতিহাসের অবিচ্ছেদ্য অংশ। এটি জাতীয় প্রাণী, শক্তির প্রতীক এবং সুন্দরবন সুরক্ষার প্রধান প্রতিনিধি। চিড়িয়াখানায় একটিকে দেখা মানে তার প্রতিনিধিত্ব করা বন্য পরিবেশ সম্পর্কে জানার আমন্ত্রণ।',
      },
      {
        en: 'Tigers are solitary, powerful and surprisingly at home in water. A visit to the enclosure is a chance to observe the pace of a big cat at rest — the slow walk, the alert ears, the sudden stillness.',
        bn: 'বাঘ একাকী, শক্তিশালী এবং অবাক করার মতো পানিতে দক্ষ। খাঁচায় গিয়ে বড় বিড়ালের বিশ্রামের ছন্দ দেখা যায়—ধীর চলা, সতর্ক কান, হঠাৎ নিঃশব্দ হয়ে যাওয়া।',
      },
    ],
    highlights: [
      { en: 'National animal of Bangladesh', bn: 'বাংলাদেশের জাতীয় প্রাণী' },
      { en: 'Flagship species of the Sundarbans', bn: 'সুন্দরবনের প্রধান প্রতিনিধি প্রজাতি' },
      { en: 'A powerful swimmer, unlike most cats', bn: 'অনেক বিড়ালজাতীয় প্রাণীর বিপরীতে দক্ষ সাঁতারু' },
    ],
    relatedAnimals: ['royal-bengal-tiger', 'chital', 'mugger-crocodile'],
  },
  {
    slug: 'rhinoceros',
    name: { en: 'Rhinoceros', bn: 'গণ্ডার' },
    category: 'wildlife',
    image: 'rhino-wide',
    position: '50% 50%',
    order: 2,
    blurb: {
      en: 'A grassland giant with a calm presence and a prehistoric silhouette.',
      bn: 'শান্ত উপস্থিতি ও প্রাগৈতিহাসিক আকৃতির এক তৃণভূমির দানব।',
    },
    intro: {
      en: 'A close encounter with one of the largest land mammals on Earth.',
      bn: 'পৃথিবীর বৃহত্তম স্থলজ স্তন্যপায়ীদের একটির সঙ্গে কাছাকাছি পরিচয়।',
    },
    description: [
      {
        en: 'The rhinoceros is a grazing giant with a broad muzzle and horns made of keratin. At first glance it seems unhurried; in reality it is alert, agile and capable of surprising speed.',
        bn: 'গণ্ডার প্রশস্ত মুখ ও কেরাটিনের শিংয়ের অধিকারী এক তৃণভোজী দানব। প্রথম দেখায় ধীরগতির মনে হলেও এটি সতর্ক, চটপটে এবং অবাক করা গতিতে ছুটতে সক্ষম।',
      },
      {
        en: 'Rhinos use scent to understand their world. Watching one move between shade, water and grazing ground is a lesson in the quiet routines of a large herbivore.',
        bn: 'গণ্ডার গন্ধ দিয়ে চারপাশ বুঝে নেয়। ছায়া, পানি ও চারণভূমির মধ্যে তার চলাচল বড় তৃণভোজীর শান্ত রুটিন সম্পর্কে শেখায়।',
      },
    ],
    highlights: [
      { en: 'Broad, square lip adapted for grazing', bn: 'ঘাস খাওয়ার জন্য উপযোগী প্রশস্ত ঠোঁট' },
      { en: 'Two horns made of keratin', bn: 'কেরাটিনে তৈরি দুটি শিং' },
      { en: 'A wallow is a favourite place on hot days', bn: 'গরমের দিনে কাদার গর্ত প্রিয় স্থান' },
    ],
    relatedAnimals: ['white-rhinoceros', 'hippopotamus', 'giraffe'],
  },
  {
    slug: 'giraffe',
    name: { en: 'Giraffe', bn: 'জিরাফ' },
    category: 'wildlife',
    image: 'giraffe-wide',
    position: '50% 45%',
    order: 3,
    blurb: {
      en: 'The tallest animal on Earth, seen eye to eye from the viewing path.',
      bn: 'পৃথিবীর সবচেয়ে লম্বা প্রাণী, দেখার পথ থেকে চোখে চোখ।',
    },
    intro: {
      en: 'A gentle giant that turns a simple walk into a study in scale and grace.',
      bn: 'একটি সাধারণ হাঁটাকে আকার ও কমনীয়তার পাঠে পরিণত করা এক শান্ত দানব।',
    },
    description: [
      {
        en: 'A giraffe’s height is built on an unusually long neck and legs, yet it carries itself with a slow, deliberate rhythm. The patterned coat is unique to each animal and helps it disappear into dappled shade.',
        bn: 'জিরাফের উচ্চতা অস্বাভাবিক লম্বা গলা ও পায়ের উপর তৈরি, তবুও তার চলনে ধীর, সচেতন ছন্দ। ডোরাকাটা নকশা প্রতিটি প্রাণীর জন্য আলাদা এবং গাছের ছায়ায় মিশে যেতে সাহায্য করে।',
      },
      {
        en: 'Giraffes browse at heights other herbivores cannot reach, using a long, muscular tongue to strip leaves from thorny branches. Their eyes are large and placed high, giving them a wide view of the ground around them.',
        bn: 'জিরাফ এমন উচ্চতায় পাতা খায় যেখানে অন্য তৃণভোজীরা পৌঁছায় না; লম্বা, পেশিবহুল জিহ্বা দিয়ে কাঁটাযুক্ত ডাল থেকে পাতা ছিঁড়ে নেয়। বড় চোখ মাথার উঁচুতে থাকায় আশপাশের মাঠ তাদের বিস্তৃত দেখা যায়।',
      },
    ],
    highlights: [
      { en: 'Tallest living land animal', bn: 'সবচেয়ে লম্বা জীবিত স্থলজ প্রাণী' },
      { en: 'Unique coat pattern in every individual', bn: 'প্রতিটি জিরাফের আলাদা নকশা' },
      { en: 'A long tongue adapted for thorny leaves', bn: 'কাঁটাযুক্ত পাতা খাওয়ার উপযোগী লম্বা জিহ্বা' },
    ],
    relatedAnimals: ['giraffe', 'zebra', 'white-rhinoceros'],
  },
  {
    slug: 'asian-elephant',
    name: { en: 'Asian Elephant', bn: 'এশীয় হাতি' },
    category: 'wildlife',
    image: 'elephant-shelter',
    position: '50% 45%',
    order: 4,
    blurb: {
      en: 'A deeply intelligent, social giant with an extraordinary trunk.',
      bn: 'অসাধারণ শুঁড়ের অধিকারী গভীর বুদ্ধিমান, সামাজিক দানব।',
    },
    intro: {
      en: 'Slow down at the elephant enclosure. The longer you watch, the more you notice.',
      bn: 'হাতির খাঁচার সামনে একটু ধীর হন। যত বেশি দেখবেন, তত বেশি লক্ষ্য করবেন।',
    },
    description: [
      {
        en: 'Asian elephants are social animals with strong family bonds. The trunk — a fusion of nose and upper lip — is used for breathing, smelling, drinking, feeding, touching and producing sound.',
        bn: 'এশীয় হাতি সামাজিক প্রাণী; পারিবারিক বন্ধন দৃঢ়। শুঁড়—নাক ও উপরের ঠোঁটের মিলিত রূপ—শ্বাস, গন্ধ, পানি পান, খাদ্য গ্রহণ, স্পর্শ ও শব্দ তৈরিতে ব্যবহৃত হয়।',
      },
      {
        en: 'The zoo is home to elephants that require expert daily care. Watching keepers work with them is a reminder that a modern zoo is as much about animal welfare as it is about display.',
        bn: 'চিড়িয়াখানায় হাতিদের প্রতিদিন বিশেষজ্ঞ যত্ন প্রয়োজন। কর্মীদের সঙ্গে তাদের কাজ দেখা মনে করিয়ে দেয়—আধুনিক চিড়িয়াখানা প্রদর্শনীর পাশাপাশি প্রাণীকল্যাণেরও জায়গা।',
      },
    ],
    highlights: [
      { en: 'Highly social, family-led herds', bn: 'অত্যন্ত সামাজিক, পরিবার-নেতৃত্বাধীন দল' },
      { en: 'A trunk with thousands of uses', bn: 'হাজারো কাজে ব্যবহারযোগ্য শুঁড়' },
      { en: 'Long-distance low-frequency calls', bn: 'দূর পর্যন্ত পৌঁছানো নিম্ন-কম্পাঙ্কের ডাক' },
    ],
    relatedAnimals: ['asian-elephant', 'hippopotamus', 'white-rhinoceros'],
  },
  {
    slug: 'aviary-and-birds',
    name: { en: 'Aviary & Birds', bn: 'পাখিশালা ও পাখি' },
    category: 'experience',
    image: 'peacock',
    position: '50% 45%',
    order: 5,
    blurb: {
      en: 'Colour, movement and song — the zoo’s birds bring the grounds to life.',
      bn: 'রঙ, নড়াচড়া আর গান—চিড়িয়াখানার পাখিরা প্রাঙ্গণকে প্রাণ দেয়।',
    },
    intro: {
      en: 'From displaying peafowl to lake birds and aviary residents, the bird collection is one of the zoo’s great pleasures.',
      bn: 'পাখা মেলা ময়ূর থেকে হ্রদের পাখি ও পাখিশালার বাসিন্দা—পাখির সংগ্রহ চিড়িয়াখানার অন্যতম আনন্দ।',
    },
    description: [
      {
        en: 'The zoo’s aviaries and open grounds hold a wide range of birdlife, from familiar peafowl to larger flightless species and waterbirds. Each has its own way of moving, feeding and interacting with the landscape.',
        bn: 'চিড়িয়াখানার পাখিশালা ও খোলা প্রাঙ্গণে নানা পাখির বাস—পরিচিত ময়ূর থেকে বড় উড়ালহীন প্রজাতি ও জলপাখি। প্রতিটির চলাফেরা, খাদ্য গ্রহণ ও পরিবেশের সঙ্গে সম্পর্ক আলাদা।',
      },
      {
        en: 'Birds are especially rewarding for young visitors: a pair of binoculars (or simply patience) can turn a walk into a wildlife expedition. Look for feeding behaviour, calls and the small interactions within a flock.',
        bn: 'শিশুদের জন্য পাখি বিশেষ আনন্দের: একজোড়া দূরবীন (বা শুধু ধৈর্য) হাঁটাকে বন্যপ্রাণী অভিযানে বদলে দিতে পারে। খাদ্য গ্রহণ, ডাক ও দলের ভেতরের ছোট মিথস্ক্রিয়া লক্ষ্য করুন।',
      },
    ],
    highlights: [
      { en: 'Free-roaming peafowl in some areas', bn: 'কিছু এলাকায় মুক্ত ময়ূর' },
      { en: 'Waterbirds around the zoo lakes', bn: 'চিড়িয়াখানার হ্রদে জলপাখি' },
      { en: 'Aviary exhibits across the grounds', bn: 'প্রাঙ্গণজুড়ে পাখিশালা' },
    ],
    relatedAnimals: ['indian-peafowl', 'ostrich', 'emu', 'great-white-pelican', 'greater-flamingo'],
  },
  {
    slug: 'aquarium',
    name: { en: 'Aquarium', bn: 'অ্যাকোয়ারিয়াম' },
    category: 'experience',
    image: 'aquarium',
    position: '50% 50%',
    order: 6,
    imageNote: 'illustrative',
    blurb: {
      en: 'A quieter, blue-lit world of fish from rivers and distant waters.',
      bn: 'নদী ও দূরের পানির মাছের শান্ত, নীল আলোর পৃথিবী।',
    },
    intro: {
      en: 'Step out of the sun and into the slow, suspended world of the aquarium.',
      bn: 'রোদ থেকে সরে অ্যাকোয়ারিয়ামের ধীর, ভাসমান পৃথিবীতে ঢুকে পড়ুন।',
    },
    description: [
      {
        en: 'The aquarium gives visitors a different kind of animal encounter: close, calm and full of movement at a smaller scale. Fish displays reveal forms and behaviours that are easy to miss in a lake or river.',
        bn: 'অ্যাকোয়ারিয়াম দর্শনার্থীদের অন্য ধরনের প্রাণী-অভিজ্ঞতা দেয়: কাছে, শান্ত এবং ছোট পরিসরে নড়াচড়ায় ভরা। মাছের প্রদর্শনী হ্রদ বা নদীতে সহজে চোখে না পড়া আকৃতি ও আচরণ দেখায়।',
      },
      {
        en: 'Look for the arapaima rising to breathe, the coordinated movement of a piranha school, or the bright patterns of ornamental carp. The dim light is part of the experience — give your eyes a moment to adjust.',
        bn: 'আরাপাইমা শ্বাস নিতে উপরে উঠছে, পিরানহার দল একসঙ্গে চলছে, কিংবা অলংকার কার্পের উজ্জ্বল নকশা—এসব লক্ষ্য করুন। মৃদু আলো অভিজ্ঞতার অংশ—চোখকে খাপ খাওয়াতে একটু সময় দিন।',
      },
    ],
    highlights: [
      { en: 'Freshwater and exotic fish displays', bn: 'মিঠাপানির ও বিদেশি মাছের প্রদর্শনী' },
      { en: 'A calm, indoor experience', bn: 'শান্ত, ভেতরের অভিজ্ঞতা' },
      { en: 'A good stop for younger visitors', bn: 'শিশুদের জন্য ভালো বিরতি' },
    ],
    relatedAnimals: ['arapaima', 'red-bellied-piranha', 'koi-carp'],
  },
  {
    slug: 'zoological-museum',
    name: { en: 'Zoological Museum', bn: 'প্রাণিবিজ্ঞান জাদুঘর' },
    category: 'experience',
    image: 'museum',
    position: '50% 50%',
    order: 7,
    imageNote: 'illustrative',
    blurb: {
      en: 'Natural history displays that reward a slower, closer look.',
      bn: 'ধীরে, কাছ থেকে দেখলে বেশি কিছু শেখানো প্রকৃতির ইতিহাসের সংগ্রহ।',
    },
    intro: {
      en: 'A separate-ticket museum for visitors who want to look beyond the living collection.',
      bn: 'জীবন্ত সংগ্রহ ছাড়িয়ে আরও জানতে চাওয়া দর্শনার্থীদের জন্য আলাদা টিকিটের জাদুঘর।',
    },
    description: [
      {
        en: 'The Zoological Museum adds an important dimension to a zoo visit: preserved specimens and displays that let you study anatomy, scale and diversity up close. It is especially useful for school groups and curious young naturalists.',
        bn: 'প্রাণিবিজ্ঞান জাদুঘর চিড়িয়াখানা ভ্রমণে গুরুত্বপূর্ণ মাত্রা যোগ করে: সংরক্ষিত নমুনা ও প্রদর্শনী, যা শরীরের গঠন, আকার ও বৈচিত্র্য কাছ থেকে দেখতে দেয়। স্কুল দল ও কৌতূহলী তরুণ প্রকৃতিপ্রেমীদের জন্য বিশেষ উপযোগী।',
      },
      {
        en: 'Museum entry is ticketed separately from the main zoo admission. Check the current price and opening arrangements at the gate or information desk before your visit.',
        bn: 'জাদুঘরে প্রবেশের জন্য চিড়িয়াখানার মূল টিকিটের অতিরিক্ত টিকিট প্রয়োজন। ভ্রমণের আগে গেট বা তথ্যকেন্দ্রে বর্তমান মূল্য ও খোলার সময় জেনে নিন।',
      },
    ],
    highlights: [
      { en: 'Natural history exhibits', bn: 'প্রকৃতির ইতিহাসের প্রদর্শনী' },
      { en: 'Separate BDT 10 entry ticket', bn: 'আলাদা ১০ টাকার প্রবেশ টিকিট' },
      { en: 'Useful for school and study groups', bn: 'স্কুল ও পড়াশোনার দলের জন্য উপযোগী' },
    ],
    relatedAnimals: ['indian-python', 'mugger-crocodile', 'aldabra-giant-tortoise'],
  },
  {
    slug: 'childrens-park',
    name: { en: "Children's Park", bn: 'শিশুপার্ক' },
    category: 'family',
    image: 'children-park',
    position: '50% 50%',
    order: 8,
    imageNote: 'illustrative',
    blurb: {
      en: 'A place to pause, play and let younger visitors burn off some energy.',
      bn: 'বিশ্রাম, খেলা আর ছোটদের প্রাণশক্তি বের করার জায়গা।',
    },
    intro: {
      en: 'A family stop between the animals, the lakes and the long walk home.',
      bn: 'প্রাণী, হ্রদ আর ফেরার দীর্ঘ পথের মাঝে পারিবারিক বিরতি।',
    },
    description: [
      {
        en: 'The children’s park gives families a dedicated place to rest and play within the zoo grounds. It is designed for younger visitors, but the surrounding paths and shade make it a useful pause for everyone.',
        bn: 'শিশুপার্ক পরিবারগুলোকে চিড়িয়াখানার ভেতরে বিশ্রাম ও খেলার আলাদা জায়গা দেয়। এটি ছোটদের জন্য তৈরি, তবে আশপাশের পথ ও ছায়া সবাইকের জন্য উপযোগী বিরতি।',
      },
      {
        en: 'Children should always be supervised around play equipment and near the zoo’s water bodies. Combine the stop with a visit to the nearby lakes and birdlife for a slower family afternoon.',
        bn: 'খেলার সরঞ্জাম ও চিড়িয়াখানার পানির কাছে শিশুদের সবসময় তত্ত্বাবধানে রাখুন। পাশের হ্রদ ও পাখি দেখার সঙ্গে এই বিরতি মিলিয়ে পরিবারের জন্য শান্ত বিকেল তৈরি করুন।',
      },
    ],
    highlights: [
      { en: 'Dedicated play area', bn: 'আলাদা খেলার এলাকা' },
      { en: 'Family-friendly resting point', bn: 'পরিবারবান্ধব বিশ্রামস্থল' },
      { en: 'Close to the lakes and main paths', bn: 'হ্রদ ও প্রধান পথের কাছে' },
    ],
    relatedAnimals: ['rhesus-macaque', 'indian-peafowl', 'koi-carp'],
  },
]

export function getAttraction(slug) {
  return attractions.find((attraction) => attraction.slug === slug)
}
