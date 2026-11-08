/**
 * Editorial samples.
 *
 * Every entry is `isSample: true`. These are evergreen editorial articles,
 * not official zoo notices, and they deliberately carry no invented dates,
 * event claims, prices or office contact details. Replace with verified
 * official content before publishing the site for real.
 */
export const newsCategories = [
  { id: 'all', labelKey: 'news.allCategories' },
  { id: 'guide', labelKey: 'news.categories.guide' },
  { id: 'wildlife', labelKey: 'news.categories.wildlife' },
  { id: 'education', labelKey: 'news.categories.education' },
  { id: 'seasons', labelKey: 'news.categories.seasons' },
  { id: 'photography', labelKey: 'news.categories.photography' },
]

export const news = [
  {
    slug: 'first-timer-route-through-the-zoo',
    isSample: true,
    featured: true,
    category: 'guide',
    readTime: 5,
    image: 'gate',
    imageAlt: {
      en: 'The main entrance gate of Bangladesh National Zoo',
      bn: 'বাংলাদেশ জাতীয় চিড়িয়াখানার প্রধান প্রবেশপথ',
    },
    title: {
      en: 'A first-timer’s route through the zoo',
      bn: 'প্রথমবার চিড়িয়াখানায়: একটি সহজ রুট',
    },
    excerpt: {
      en: 'A calm, flexible way to see the big animals, the birds and the lakes without trying to do everything at once.',
      bn: 'সব কিছু একসঙ্গে না দেখে বড় প্রাণী, পাখি ও হ্রদ—শান্ত ও নমনীয়ভাবে দেখার একটি পরামর্শ।',
    },
    body: [
      {
        en: 'The first decision at the gate is not which animal to see, but how to pace the day. The grounds are large, the weather is often warm, and the most memorable moments tend to happen when you slow down rather than rush between enclosures.',
        bn: 'ফটকে প্রথম সিদ্ধান্তটি কোন প্রাণী দেখবেন তা নয়, বরং দিনটির গতি কীভাবে রাখবেন। প্রাঙ্গণ বড়, আবহাওয়া প্রায়ই গরম, আর সবচেয়ে স্মরণীয় মুহূর্তগুলো আসে যখন খাঁচা থেকে খাঁচায় দৌড় না দিয়ে ধীর হন।',
      },
      {
        en: 'A simple rhythm works well: start with the birds while the morning is still cool, move to the large mammals while they are active, take a shaded break around midday, and leave the lakes for the afternoon. The museum and aquarium make good hot-weather pauses, but remember that the museum needs its own ticket.',
        bn: 'সহজ একটি ছন্দ ভালো কাজ করে: সকালের ঠান্ডায় পাখি দিয়ে শুরু করুন, সক্রিয় থাকার সময় বড় স্তন্যপায়ীদের দেখুন, দুপুরে ছায়ায় বিশ্রাম নিন এবং বিকেলের জন্য হ্রদ রাখুন। জাদুঘর ও অ্যাকোয়ারিয়াম গরমের সময় ভালো বিরতি, তবে মনে রাখবেন জাদুঘরের জন্য আলাদা টিকিট লাগে।',
      },
      {
        en: 'Treat this as an editorial suggestion, not an official schedule. Crowds, weather and animal activity change from day to day. The best route is the one that leaves room to stop when something catches your eye.',
        bn: 'এটি সম্পাদকীয় পরামর্শ, সরকারি সময়সূচি নয়। ভিড়, আবহাওয়া ও প্রাণীদের সক্রিয়তা প্রতিদিন বদলায়। সেরা রুট হলো সেইটি, যেখানে চোখে পড়া কিছু দেখতে থামার জায়গা থাকে।',
      },
    ],
  },
  {
    slug: 'why-the-royal-bengal-tiger-still-matters',
    isSample: true,
    featured: false,
    category: 'wildlife',
    readTime: 6,
    image: 'tiger-sundarbans',
    imageAlt: {
      en: 'A Royal Bengal tiger walking through mangrove forest in the Sundarbans',
      bn: 'সুন্দরবনের ম্যানগ্রোভ অরণ্যে হাঁটছে রয়েল বেঙ্গল টাইগার',
    },
    title: {
      en: 'Why the Royal Bengal tiger still matters',
      bn: 'রয়েল বেঙ্গল টাইগার কেন এখনো গুরুত্বপূর্ণ',
    },
    excerpt: {
      en: 'The national animal is more than a symbol. It is a measure of how well an entire mangrove landscape is doing.',
      bn: 'জাতীয় প্রাণীটি কেবল প্রতীক নয়। এটি পুরো ম্যানগ্রোভ পরিবেশের অবস্থার একটি মাপকাঠি।',
    },
    body: [
      {
        en: 'The Royal Bengal tiger sits at the top of the food chain in the Sundarbans. That position makes it a useful indicator: when tigers have space, prey and clean water, the wider ecosystem is usually holding together.',
        bn: 'রয়েল বেঙ্গল টাইগার সুন্দরবনের খাদ্য শৃঙ্খলের শীর্ষে। এই অবস্থানই তাকে গুরুত্বপূর্ণ সূচক করে: বাঘ যখন জায়গা, খাদ্য ও পরিষ্কার পানি পায়, তখন সাধারণত পুরো বাস্তুতন্ত্রও টিকে থাকে।',
      },
      {
        en: 'Tigers are powerful swimmers and solitary hunters, adapted to a world of tidal channels, mud and dense mangrove roots. Seeing one at the zoo is a chance to look closely at those adaptations — the broad paws, the low-slung walk, the stillness before movement.',
        bn: 'বাঘ শক্তিশালী সাঁতারু ও একাকী শিকারি; জোয়ারের খাল, কাদা ও ঘন ম্যানগ্রোভ শিকড়ের জগতে তাদের অভিযোজন। চিড়িয়াখানায় একটি বাঘ দেখা মানে এই অভিযোজনগুলো কাছ থেকে দেখা—চওড়া থাবা, নিচু ভঙ্গিতে হাঁটা, নড়াচড়ার আগের নিঃশব্দতা।',
      },
      {
        en: 'Conservation is not only about the animal in front of you. It is about the mangrove forests, rivers and communities that share its range. A zoo visit can be the beginning of that larger story, not the end of it.',
        bn: 'সংরক্ষণ কেবল সামনের প্রাণীটির বিষয় নয়। এটি তার বিচরণক্ষেত্রের ম্যানগ্রোভ বন, নদী ও জনগোষ্ঠীর বিষয়। চিড়িয়াখানার ভ্রমণ সেই বড় গল্পের শুরু হতে পারে, শেষ নয়।',
      },
    ],
  },
  {
    slug: 'planning-a-school-visit-that-teaches',
    isSample: true,
    featured: false,
    category: 'education',
    readTime: 5,
    image: 'education',
    imageAlt: {
      en: 'Children taking part in an outdoor nature education activity',
      bn: 'বাইরের প্রকৃতি শিক্ষা কার্যক্রমে অংশ নিচ্ছে শিশুরা',
    },
    title: {
      en: 'Planning a school visit that actually teaches',
      bn: 'স্কুল ভ্রমণ যেভাবে সত্যিই শেখাবে',
    },
    excerpt: {
      en: 'A little preparation turns a walk between enclosures into a lesson children remember for years.',
      bn: 'সামান্য প্রস্তুতি খাঁচার মাঝের হাঁটাকে বছরের পর বছর মনে রাখার পাঠে বদলে দেয়।',
    },
    body: [
      {
        en: 'The difference between a school trip and a school lesson often comes down to preparation. Before arriving, ask children to choose one animal or habitat to observe closely. A single focused question — how does this animal move, feed or rest? — can organise the whole visit.',
        bn: 'স্কুল ভ্রমণ আর পাঠের মধ্যে পার্থক্য প্রায়ই প্রস্তুতিতে। আসার আগে শিশুদের একটি প্রাণী বা আবাসস্থল বেছে নিতে বলুন, যা তারা কাছ থেকে পর্যবেক্ষণ করবে। একটি নির্দিষ্ট প্রশ্ন—এই প্রাণী কীভাবে চলে, খায় বা বিশ্রাম নেয়?—পুরো ভ্রমণকে গুছিয়ে দিতে পারে।',
      },
      {
        en: 'Set clear expectations about quiet voices, staying with the group and never feeding the animals. Teachers remain responsible for supervision throughout the visit. If you want a guided or structured programme, contact the zoo office well in advance to ask what is currently possible.',
        bn: 'নিচু কণ্ঠস্বর, দলের সঙ্গে থাকা এবং প্রাণীদের খাবার না দেওয়ার বিষয়ে স্পষ্ট নির্দেশনা দিন। পুরো ভ্রমণে শিক্ষকদের তত্ত্বাবধানের দায়িত্ব থাকে। গাইডসহ বা কাঠামোবদ্ধ কর্মসূচি চাইলে যথেষ্ট আগে চিড়িয়াখানা অফিসে যোগাযোগ করে বর্তমান সুযোগ জেনে নিন।',
      },
      {
        en: 'Back in the classroom, the visit can continue through drawing, writing or a small research project. The aim is not to memorise a list of species, but to build a habit of looking carefully and asking better questions.',
        bn: 'শ্রেণিকক্ষে ফিরে ভ্রমণ চলতে পারে আঁকা, লেখা বা ছোট গবেষণা প্রকল্পের মাধ্যমে। উদ্দেশ্য প্রজাতির তালিকা মুখস্থ করা নয়, বরং মনোযোগ দিয়ে দেখা ও আরও ভালো প্রশ্ন করার অভ্যাস গড়া।',
      },
    ],
  },
  {
    slug: 'monsoon-at-the-zoo',
    isSample: true,
    featured: false,
    category: 'seasons',
    readTime: 4,
    image: 'lake',
    imageAlt: {
      en: 'Greenery and water at Bangladesh National Zoo',
      bn: 'বাংলাদেশ জাতীয় চিড়িয়াখানার সবুজ ও জলাশয়',
    },
    title: {
      en: 'Monsoon at the zoo: watching a landscape change',
      bn: 'বর্ষায় চিড়িয়াখানা: বদলে যাওয়া এক পরিবেশ',
    },
    excerpt: {
      en: 'Rain changes the sound, colour and rhythm of the grounds — and the behaviour of the animals that live there.',
      bn: 'বৃষ্টি প্রাঙ্গণের শব্দ, রং ও ছন্দ বদলে দেয়—আর সেখানে থাকা প্রাণীদের আচরণও।',
    },
    body: [
      {
        en: 'Bangladesh’s seasons reshape the outdoors, and a zoo is no exception. During the monsoon, the greens deepen, the lakes fill, and the air carries the smell of wet earth. Birds often become more vocal; some animals choose shelter, while others seem to enjoy the cooler air.',
        bn: 'বাংলাদেশের ঋতুগুলো বাইরের পরিবেশ বদলে দেয়, চিড়িয়াখানাও তার ব্যতিক্রম নয়। বর্ষায় সবুজ গাঢ় হয়, হ্রদ ভরে ওঠে এবং বাতাসে ভেজা মাটির গন্ধ থাকে। পাখির ডাক প্রায়ই বাড়ে; কিছু প্রাণী আশ্রয় বেছে নেয়, আবার কিছু ঠান্ডা বাতাস উপভোগ করে।',
      },
      {
        en: 'Practical advice matters more in the rain: carry a light raincoat, wear shoes with grip, and expect some paths to be wet or uneven. Never take shelter inside a barrier or climb over a fence to escape the rain.',
        bn: 'বৃষ্টিতে ব্যবহারিক পরামর্শ আরও গুরুত্বপূর্ণ: হালকা রেইনকোট নিন, গ্রিপযুক্ত জুতা পরুন এবং কিছু পথ ভেজা বা অসমতল হতে পারে—এটি মাথায় রাখুন। বৃষ্টি এড়াতে কখনো বেড়ার ভেতরে আশ্রয় নেবেন না বা বেড়া ডিঙাবেন না।',
      },
      {
        en: 'The monsoon is also a reminder that weather can change opening arrangements. Check official guidance before a long journey, and be prepared to adjust your plan.',
        bn: 'বর্ষা মনে করিয়ে দেয়, আবহাওয়া খোলার ব্যবস্থাও বদলাতে পারে। দীর্ঘ যাত্রার আগে সরকারি নির্দেশনা দেখে নিন এবং পরিকল্পনা বদলানোর জন্য প্রস্তুত থাকুন।',
      },
    ],
  },
  {
    slug: 'photographing-wildlife-with-respect',
    isSample: true,
    featured: false,
    category: 'photography',
    readTime: 4,
    image: 'peacock',
    imageAlt: {
      en: 'Indian peafowl at Bangladesh National Zoo',
      bn: 'বাংলাদেশ জাতীয় চিড়িয়াখানায় ভারতীয় ময়ূর',
    },
    title: {
      en: 'How to photograph wildlife without disturbing it',
      bn: 'বন্যপ্রাণীকে বিরক্ত না করে ছবি তোলার উপায়',
    },
    excerpt: {
      en: 'Patience, a quiet stance and a little restraint make better pictures — and a better day for the animals.',
      bn: 'ধৈর্য, শান্ত ভঙ্গি ও একটু সংযম ভালো ছবি তোলে—আর প্রাণীদের জন্যও ভালো একটি দিন তৈরি করে।',
    },
    body: [
      {
        en: 'The best wildlife photographs usually come from waiting, not chasing. Find a comfortable spot, keep your movements slow and let the animal behave naturally. A picture of an animal at rest, doing something ordinary, is often more revealing than a forced close-up.',
        bn: 'সেরা বন্যপ্রাণীর ছবি সাধারণত তাড়া করে নয়, অপেক্ষা করে আসে। আরামদায়ক জায়গা খুঁজে নিন, ধীরে চলুন এবং প্রাণীকে স্বাভাবিক আচরণ করতে দিন। বিশ্রামরত প্রাণীর সাধারণ কোনো কাজের ছবি অনেক সময় জোর করে তোলা কাছের ছবির চেয়ে বেশি কিছু বলে।',
      },
      {
        en: 'Avoid flash near animals, never tap on glass or fencing, and never cross a barrier for a better angle. If an animal moves away or shows stress, that is your signal to stop. Respect other visitors’ views as well — a clear sightline is shared.',
        bn: 'প্রাণীদের কাছে ফ্ল্যাশ এড়িয়ে চলুন, কাচ বা বেড়ায় কখনো টোকা দেবেন না এবং ভালো অ্যাঙ্গেলের জন্য বেড়া পার হবেন না। প্রাণী সরে গেলে বা চাপের লক্ষণ দেখালে থেমে যান। অন্য দর্শনার্থীদের দেখার সুযোগও সম্মান করুন—পরিষ্কার দৃশ্যপট الجميعর জন্য।',
      },
      {
        en: 'For commercial or professional photography, and for any drone use, seek permission from the zoo office in advance. The rules protect the animals first; good photographs follow from that respect.',
        bn: 'বাণিজ্যিক বা পেশাদার ফটোগ্রাফি এবং ড্রোন ব্যবহারের জন্য আগে থেকে চিড়িয়াখানা অফিসের অনুমতি নিন। নিয়ম সবার আগে প্রাণীদের সুরক্ষা করে; সেই সম্মান থেকেই ভালো ছবি আসে।',
      },
    ],
  },
  {
    slug: 'small-things-that-make-a-family-visit-easier',
    isSample: true,
    featured: false,
    category: 'guide',
    readTime: 4,
    image: 'children-park',
    imageAlt: {
      en: 'A shaded children’s play area',
      bn: 'ছায়াযুক্ত শিশুদের খেলার এলাকা',
    },
    title: {
      en: 'Six small things that make a family visit easier',
      bn: 'পারিবারিক ভ্রমণ সহজ করার ছয়টি ছোট পরামর্শ',
    },
    excerpt: {
      en: 'Water, shade, snacks, a plan for tired legs — the unglamorous details that decide how the day feels.',
      bn: 'পানি, ছায়া, নাস্তা, ক্লান্ত পায়ের জন্য পরিকল্পনা—দিনটি কেমন হবে তা ঠিক করে দেয় এই সাধারণ বিষয়গুলো।',
    },
    body: [
      {
        en: 'Start early. The morning is cooler, the animals are often more active and the paths are quieter. Bring more water than you think you need, and plan a shaded break before anyone becomes tired or overheated.',
        bn: 'সকালে শুরু করুন। সকালের আবহাওয়া ঠান্ডা, প্রাণীরা প্রায়ই বেশি সক্রিয় এবং পথ কম ভিড়ের হয়। যতটা প্রয়োজন মনে করছেন তার চেয়ে বেশি পানি নিন এবং কেউ ক্লান্ত বা অতিরিক্ত গরম হওয়ার আগেই ছায়ায় বিরতির পরিকল্পনা করুন।',
      },
      {
        en: 'Choose two or three must-see animals rather than a long checklist. Let children set the pace sometimes, and use the children’s park or a lake-side bench as a proper pause rather than an afterthought. Comfortable shoes and sun protection make a bigger difference than any itinerary.',
        bn: 'দীর্ঘ তালিকার বদলে দু-তিনটি অবশ্যই দেখার প্রাণী বেছে নিন। মাঝে মাঝে শিশুদের গতি নির্ধারণ করতে দিন এবং শিশুপার্ক বা হ্রদের পাশের বেঞ্চকে শেষের না ভেবে সত্যিকারের বিরতি হিসেবে ব্যবহার করুন। আরামদায়ক জুতা ও রোদ থেকে সুরক্ষা যেকোনো পরিকল্পনার চেয়ে বেশি কাজে দেয়।',
      },
      {
        en: 'Keep children close near water and barriers, and agree on a meeting point in case anyone gets separated. If you need help, the information centre is the first place to ask. Small preparations leave more room for the good parts: curiosity, surprise and a slower look at the animals.',
        bn: 'পানি ও বেড়ার কাছে শিশুদের কাছে রাখুন এবং কেউ আলাদা হয়ে গেলে মিলিত হওয়ার একটি জায়গা ঠিক করে নিন। সাহায্য প্রয়োজন হলে প্রথমে তথ্যকেন্দ্রে জিজ্ঞাসা করুন। ছোট প্রস্তুতি ভালো দিকগুলোর জন্য বেশি জায়গা রাখে: কৌতূহল, বিস্ময় এবং প্রাণীদের ধীরে দেখা।',
      },
    ],
  },
]

export function getNewsBySlug(slug) {
  return news.find((article) => article.slug === slug)
}

export function getRelatedNews(article, limit = 3) {
  return news
    .filter((item) => item.slug !== article.slug)
    .sort((a, b) => {
      const aMatch = a.category === article.category ? 1 : 0
      const bMatch = b.category === article.category ? 1 : 0
      return bMatch - aMatch
    })
    .slice(0, limit)
}
