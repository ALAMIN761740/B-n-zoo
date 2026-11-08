/**
 * Central animal dataset.
 *
 * `image` maps to responsive derivatives in /public/images.
 * These profiles describe the species; collection details can change as
 * animals are born, transferred or rehomed. A visitor-facing note on the
 * Animals page makes that clear.
 */
export const animalCategories = [
  { id: 'all', label: { en: 'All animals', bn: 'সব প্রাণী' } },
  { id: 'mammals', label: { en: 'Mammals', bn: 'স্তন্যপায়ী' } },
  { id: 'birds', label: { en: 'Birds', bn: 'পাখি' } },
  { id: 'reptiles', label: { en: 'Reptiles', bn: 'সরীসৃপ' } },
  { id: 'fish', label: { en: 'Fish', bn: 'মাছ' } },
]

export const categoryLabel = {
  mammals: { en: 'Mammal', bn: 'স্তন্যপায়ী' },
  birds: { en: 'Bird', bn: 'পাখি' },
  reptiles: { en: 'Reptile', bn: 'সরীসৃপ' },
  fish: { en: 'Fish', bn: 'মাছ' },
}

export const animals = [
  {
    slug: 'royal-bengal-tiger',
    name: { en: 'Royal Bengal Tiger', bn: 'রয়েল বেঙ্গল টাইগার' },
    scientific: 'Panthera tigris tigris',
    category: 'mammals',
    image: 'tiger-portrait',
    imageAlt: {
      en: 'Royal Bengal tiger resting at Bangladesh National Zoo',
      bn: 'বাংলাদেশ জাতীয় চিড়িয়াখানায় বিশ্রামরত রয়েল বেঙ্গল টাইগার',
    },
    intro: {
      en: 'Bangladesh’s national animal and the enduring symbol of the Sundarbans.',
      bn: 'বাংলাদেশের জাতীয় প্রাণী এবং সুন্দরবনের চিরন্তন প্রতীক।',
    },
    description: {
      en: 'The Royal Bengal tiger is a powerful, solitary hunter adapted to mangrove forests, grasslands and wetlands. Its unmistakable stripes help it disappear into tall reeds and dappled shade. In Bangladesh, the tiger is inseparable from the identity of the Sundarbans.',
      bn: 'রয়েল বেঙ্গল টাইগার শক্তিশালী ও একাকী শিকারি, যা ম্যানগ্রোভ অরণ্য, তৃণভূমি ও জলাভূমির সঙ্গে খাপ খেয়ে বেঁচে থাকে। এর অনন্য ডোরাকাটা দাগ নলখাগড়া ও ছায়াঘেরা বনে মিশে যেতে সাহায্য করে। বাংলাদেশে বাঘ সুন্দরবনের পরিচয়ের অবিচ্ছেদ্য অংশ।',
    },
    habitat: { en: 'Mangroves, forests and grasslands of South Asia', bn: 'দক্ষিণ এশিয়ার ম্যানগ্রোভ, অরণ্য ও তৃণভূমি' },
    diet: { en: 'Deer, wild boar and other mammals', bn: 'হরিণ, বন্য শূকর ও অন্যান্য স্তন্যপায়ী' },
    fact: {
      en: 'Every tiger’s stripe pattern is unique — no two tigers look exactly alike.',
      bn: 'প্রতিটি বাঘের ডোরাকাটা নকশা আলাদা — দুটি বাঘ হুবহু একরকম দেখায় না।',
    },
    mapFocus: 'tiger',
    featured: true,
  },
  {
    slug: 'asian-elephant',
    name: { en: 'Asian Elephant', bn: 'এশীয় হাতি' },
    scientific: 'Elephas maximus',
    category: 'mammals',
    image: 'elephant',
    imageAlt: {
      en: 'Asian elephant standing in a green enclosure at Bangladesh National Zoo',
      bn: 'বাংলাদেশ জাতীয় চিড়িয়াখানার সবুজ আবাসে দাঁড়িয়ে থাকা এশীয় হাতি',
    },
    intro: {
      en: 'A highly intelligent, social giant of South and Southeast Asian forests.',
      bn: 'দক্ষিণ ও দক্ষিণ-পূর্ব এশিয়ার অরণ্যের বুদ্ধিমান ও সামাজিক এক বিশাল প্রাণী।',
    },
    description: {
      en: 'Asian elephants live in close-knit family groups led by experienced females. They use their trunks to explore, drink, greet one another and handle food. Their presence in a landscape shapes the forest itself, from seed dispersal to the trails they create.',
      bn: 'এশীয় হাতি অভিজ্ঞ নারী হাতির নেতৃত্বে ঘনিষ্ঠ পারিবারিক দলে বাস করে। তারা শুঁড় দিয়ে চারপাশের পরিবেশ অনুসন্ধান করে, পানি পান করে, একে অন্যকে অভিবাদন জানায় ও খাবার পরিচালনা করে। তাদের উপস্থিতি বীজ ছড়ানো থেকে পথ তৈরি পর্যন্ত বনের চেহারাই বদলে দেয়।',
    },
    habitat: { en: 'Forests and grasslands of South and Southeast Asia', bn: 'দক্ষিণ ও দক্ষিণ-পূর্ব এশিয়ার অরণ্য ও তৃণভূমি' },
    diet: { en: 'Grasses, bark, leaves and fruit', bn: 'ঘাস, গাছের ছাল, পাতা ও ফল' },
    fact: {
      en: 'An elephant’s trunk is strong enough to lift a heavy log and delicate enough to pick up a small fruit.',
      bn: 'হাতির শুঁড় ভারী গাছের গুঁড়ি তোলার মতো শক্তিশালী, আবার ছোট ফলের মতো সূক্ষ্মও।',
    },
    mapFocus: 'elephant',
    featured: true,
  },
  {
    slug: 'giraffe',
    name: { en: 'Giraffe', bn: 'জিরাফ' },
    scientific: 'Giraffa camelopardalis',
    category: 'mammals',
    image: 'giraffe',
    imageAlt: {
      en: 'Close-up portrait of a giraffe at Bangladesh National Zoo',
      bn: 'বাংলাদেশ জাতীয় চিড়িয়াখানায় জিরাফের কাছ থেকে তোলা প্রতিকৃতি',
    },
    intro: {
      en: 'The world’s tallest land animal, built for browsing the tops of trees.',
      bn: 'পৃথিবীর সবচেয়ে লম্বা স্থলজ প্রাণী, গাছের ডগা থেকে খাওয়ার জন্য বিশেষভাবে তৈরি।',
    },
    description: {
      en: 'Giraffes use their long necks and prehensile tongues to reach leaves that other herbivores cannot. Their coat patterns are as individual as fingerprints. In the wild they roam the savannahs and open woodlands of Africa, often in loose, moving herds.',
      bn: 'জিরাফ তার লম্বা গলা ও নমনীয় জিহ্বা দিয়ে এমন পাতায় পৌঁছায় যেখানে অন্য তৃণভোজীরা পারে না। তাদের গায়ের নকশা আঙুলের ছাপের মতোই আলাদা। বন্য পরিবেশে তারা আফ্রিকার সাভানা ও খোলা বনে বিচরণ করে, প্রায়ই ঢিলেঢালা দলে।',
    },
    habitat: { en: 'African savannahs and open woodlands', bn: 'আফ্রিকান সাভানা ও খোলা বনভূমি' },
    diet: { en: 'Leaves, shoots and flowers, especially acacia', bn: 'পাতা, কচি ডাল ও ফুল, বিশেষ করে বাবলা গাছ' },
    fact: {
      en: 'A giraffe has seven neck vertebrae — the same number as a human.',
      bn: 'জিরাফের গলায় সাতটি কশেরুকা থাকে — মানুষের মতোই।',
    },
    mapFocus: 'giraffe',
    featured: true,
  },
  {
    slug: 'white-rhinoceros',
    name: { en: 'White Rhinoceros', bn: 'সাদা গণ্ডার' },
    scientific: 'Ceratotherium simum',
    category: 'mammals',
    image: 'rhino',
    imageAlt: {
      en: 'White rhinoceros resting at Bangladesh National Zoo',
      bn: 'বাংলাদেশ জাতীয় চিড়িয়াখানায় বিশ্রামরত সাদা গণ্ডার',
    },
    intro: {
      en: 'A massive grazing rhino with a wide, square lip and a calm bearing.',
      bn: 'চওড়া চারকোনা ঠোঁট ও শান্ত ভঙ্গিমার এক বিশাল তৃণভোজী গণ্ডার।',
    },
    description: {
      en: 'The white rhinoceros is one of the largest land mammals, with a broad mouth adapted for cropping short grass. Despite its size it can move quickly when needed. Its horn is made of keratin — the same material as human hair and fingernails.',
      bn: 'সাদা গণ্ডার পৃথিবীর সবচেয়ে বড় স্থলজ স্তন্যপায়ীদের একটি; চওড়া মুখ ছোট ঘাস কাটার জন্য উপযোগী। আকার বড় হলেও প্রয়োজন হলে এটি দ্রুত দৌড়াতে পারে। এর শিং কেরাটিন দিয়ে তৈরি — মানুষের চুল ও নখের মতোই।',
    },
    habitat: { en: 'Grasslands and savannahs of southern Africa', bn: 'দক্ষিণ আফ্রিকার তৃণভূমি ও সাভানা' },
    diet: { en: 'Short grasses', bn: 'ছোট ঘাস' },
    fact: {
      en: 'The name “white” likely comes from a mistranslation of a Dutch word for “wide”, describing its mouth.',
      bn: '“সাদা” নামটি সম্ভবত ডাচ ভাষার “চওড়া” শব্দের ভুল অনুবাদ থেকে এসেছে, যা এর মুখের আকৃতি বোঝায়।',
    },
    mapFocus: 'rhino',
    featured: true,
  },
  {
    slug: 'hippopotamus',
    name: { en: 'Hippopotamus', bn: 'জলহস্তী' },
    scientific: 'Hippopotamus amphibius',
    category: 'mammals',
    image: 'hippo',
    imageAlt: {
      en: 'Hippopotamus at Bangladesh National Zoo',
      bn: 'বাংলাদেশ জাতীয় চিড়িয়াখানায় জলহস্তী',
    },
    intro: {
      en: 'A semi-aquatic heavyweight that spends its days cooling off in water.',
      bn: 'আধা-জলজ বিশাল প্রাণী, যা দিনের বড় অংশ পানি में ঠান্ডা হয়ে কাটায়।',
    },
    description: {
      en: 'Hippos live in rivers, lakes and wetlands, leaving the water at night to graze on grasses. Their eyes, ears and nostrils sit high on the skull so they can stay alert while mostly submerged. Though they look placid, wild hippos are powerful and should always be given space.',
      bn: 'জলহস্তী নদী, হ্রদ ও জলাভূমিতে বাস করে; রাতে পানির বাইরে গিয়ে ঘাস খায়। তাদের চোখ, কান ও নাক মাথার ওপরে অবস্থান করে, তাই প্রায় পুরো শরীর পানির নিচে রেখেও সতর্ক থাকতে পারে। দেখতে শান্ত হলেও বন্য জলহস্তী অত্যন্ত শক্তিশালী, তাই সবসময় দূরত্ব রাখা উচিত।',
    },
    habitat: { en: 'Rivers, lakes and wetlands of sub-Saharan Africa', bn: 'সাব-সাহারান আফ্রিকার নদী, হ্রদ ও জলাভূমি' },
    diet: { en: 'Grasses, mostly grazed at night', bn: 'ঘাস, বেশিরভাগ রাতে খায়' },
    fact: {
      en: 'Hippos secrete a reddish fluid often called “blood sweat”, which helps protect their skin from the sun.',
      bn: 'জলহস্তী লালচে তরল নিঃসৃত করে, যাকে অনেক সময় “রক্তঘাম” বলা হয়; এটি ত্বককে রোদ থেকে রক্ষা করতে সাহায্য করে।',
    },
  },
  {
    slug: 'plains-zebra',
    name: { en: 'Plains Zebra', bn: 'সমতলের জেব্রা' },
    scientific: 'Equus quagga',
    category: 'mammals',
    image: 'zebra',
    imageAlt: {
      en: 'Plains zebras at Bangladesh National Zoo',
      bn: 'বাংলাদেশ জাতীয় চিড়িয়াখানায় সমতলের জেব্রা',
    },
    intro: {
      en: 'A wild horse of the African savannah, marked by an unforgettable coat.',
      bn: 'আফ্রিকান সাভানার বন্য ঘোড়া, যার গায়ের নকশা সহজে ভোলার নয়।',
    },
    description: {
      en: 'Zebras are social grazers that often associate with wildebeest and other herbivores for safety. Each animal’s stripe pattern is unique, and the stripes appear to play a role in confusing biting flies and predators. They communicate with calls, ear position and body language.',
      bn: 'জেব্রা সামাজিক তৃণভোজী প্রাণী, নিরাপত্তার জন্য প্রায়ই উইলডেবিস্ট ও অন্য তৃণভোজীদের সঙ্গে থাকে। প্রতিটি জেব্রার ডোরাকাটা নকশা আলাদা; এই ডোরা কামড়ানো মাছি ও শিকারিকে বিভ্রান্ত করতে সাহায্য করে। তারা ডাক, কানের অবস্থান ও শরীরী ভাষায় যোগাযোগ করে।',
    },
    habitat: { en: 'Savannahs and grasslands of Africa', bn: 'আফ্রিকার সাভানা ও তৃণভূমি' },
    diet: { en: 'Grasses', bn: 'ঘাস' },
    fact: {
      en: 'No two zebras share exactly the same stripe pattern.',
      bn: 'দুটি জেব্রার ডোরাকাটা নকশা হুবহু এক হয় না।',
    },
  },
  {
    slug: 'chital',
    name: { en: 'Chital', bn: 'চিত্রা হরিণ' },
    scientific: 'Axis axis',
    category: 'mammals',
    image: 'chital',
    imageAlt: {
      en: 'Chital deer herd at Bangladesh National Zoo',
      bn: 'বাংলাদেশ জাতীয় চিড়িয়াখানায় চিত্রা হরিণের দল',
    },
    intro: {
      en: 'A gracefully spotted deer of the Indian subcontinent’s forests and grasslands.',
      bn: 'ভারতীয় উপমহাদেশের অরণ্য ও তৃণভূমির সুন্দর চিত্রবিচিত্র হরিণ।',
    },
    description: {
      en: 'Chital, also called spotted deer, are highly social and often move in herds. Their spotted coats provide camouflage in dappled forest light. They are alert animals, quick to respond to alarm calls from birds and other deer.',
      bn: 'চিত্রা হরিণ, যা চিত্রিত হরিণ নামেও পরিচিত, বেশ সামাজিক এবং প্রায়ই দলবদ্ধভাবে চলাফেরা করে। ছোপ ছোপ গায়ের রং বনের আলোছায়ায় ছদ্মবেশ দেয়। তারা সতর্ক প্রাণী; পাখি বা অন্য হরিণের বিপদসংকেত দ্রুত বুঝে নেয়।',
    },
    habitat: { en: 'Woodlands, forest edges and grasslands of South Asia', bn: 'দক্ষিণ এশিয়ার বনভূমি, বনের প্রান্ত ও তৃণভূমি' },
    diet: { en: 'Grasses, leaves and shrubs', bn: 'ঘাস, পাতা ও গুল্ম' },
    fact: {
      en: 'Chital often follow langur monkeys, benefiting from fruit and leaves dropped from the canopy.',
      bn: 'চিত্রা হরিণ প্রায়ই লাঙ্গুর বানরের পিছু পিছু চলে, গাছ থেকে পড়া ফল ও পাতার সুবিধা নেয়।',
    },
  },
  {
    slug: 'sambar-deer',
    name: { en: 'Sambar Deer', bn: 'সম্বর হরিণ' },
    scientific: 'Rusa unicolor',
    category: 'mammals',
    image: 'sambar',
    imageAlt: {
      en: 'Sambar deer standing in a grassy woodland',
      bn: 'ঘাসের বনভূমিতে দাঁড়িয়ে থাকা সম্বর হরিণ',
    },
    intro: {
      en: 'A large, dusk-loving deer of South and Southeast Asian forests.',
      bn: 'দক্ষিণ ও দক্ষিণ-পূর্ব এশিয়ার অরণ্যের বড়, গোধূলিপ্রিয় হরিণ।',
    },
    description: {
      en: 'Sambar are the largest deer of the region, with a shaggy mane and sturdy build. They browse on leaves, fruits and grasses, usually near cover and often around dawn or dusk. When alarmed, they give a loud, sharp call that carries through the forest.',
      bn: 'সম্বর হরিণ এই অঞ্চলের সবচেয়ে বড় হরিণ, ঘন কেশর ও শক্তিশালী শরীরের অধিকারী। তারা সাধারণত আশ্রয়ের কাছে ভোর বা গোধূলির দিকে পাতা, ফল ও ঘাস খায়। বিপদ টের পেলে জোরে, তীক্ষ্ণ ডাক দেয় যা বনে দূর পর্যন্ত ছড়িয়ে পড়ে।',
    },
    habitat: { en: 'Dense forests and woodland edges across South Asia', bn: 'দক্ষিণ এশিয়ার ঘন অরণ্য ও বনপ্রান্ত' },
    diet: { en: 'Leaves, fruit, grasses and bark', bn: 'পাতা, ফল, ঘাস ও গাছের ছাল' },
    fact: {
      en: 'Sambar are strong swimmers and will cross rivers to reach fresh grazing.',
      bn: 'সম্বর হরিণ দক্ষ সাঁতারু এবং নতুন চারণভূমিতে পৌঁছাতে নদী পার হয়।',
    },
  },
  {
    slug: 'olive-baboon',
    name: { en: 'Olive Baboon', bn: 'অলিভ বেবুন' },
    scientific: 'Papio anubis',
    category: 'mammals',
    image: 'baboon',
    imageAlt: {
      en: 'Olive baboon walking across open ground',
      bn: 'খোলা মাঠে হেঁটে চলা অলিভ বেবুন',
    },
    intro: {
      en: 'A highly social primate with a complex world of gestures and hierarchy.',
      bn: 'অত্যন্ত সামাজিক এক প্রাইমেট, যার ইশারা ও সামাজিক স্তরের জগৎ জটিল।',
    },
    description: {
      en: 'Olive baboons live in large troops and spend much of the day foraging. They are adaptable omnivores, eating fruit, seeds, grasses, insects and small animals. Social bonds, grooming and communication are central to troop life.',
      bn: 'অলিভ বেবুন বড় দলে বাস করে এবং দিনের বড় অংশ খাবারের খোঁজে ব্যয় করে। তারা সহজে খাপ খাওয়ানো সর্বভুক — ফল, বীজ, ঘাস, পোকামাকড় ও ছোট প্রাণী খায়। সামাজিক বন্ধন, পরস্পরের পরিচর্যা ও যোগাযোগ তাদের দলজীবনের কেন্দ্রে।',
    },
    habitat: { en: 'Savannahs, woodlands and grasslands of Africa', bn: 'আফ্রিকার সাভানা, বনভূমি ও তৃণভূমি' },
    diet: { en: 'Fruit, seeds, grasses, insects and small animals', bn: 'ফল, বীজ, ঘাস, পোকামাকড় ও ছোট প্রাণী' },
    fact: {
      en: 'Baboons use a wide repertoire of facial expressions, vocalisations and gestures to communicate.',
      bn: 'বেবুন মুখভঙ্গি, ডাক ও ইশারার বিস্তৃত ভাষা ব্যবহার করে যোগাযোগ করে।',
    },
  },
  {
    slug: 'rhesus-macaque',
    name: { en: 'Rhesus Macaque', bn: 'লালমুখো বানর' },
    scientific: 'Macaca mulatta',
    category: 'mammals',
    image: 'rhesus',
    imageAlt: {
      en: 'Male rhesus macaque sitting in natural surroundings',
      bn: 'প্রাকৃতিক পরিবেশে বসে থাকা পুরুষ লালমুখো বানর',
    },
    intro: {
      en: 'An intelligent and adaptable monkey found across South and Central Asia.',
      bn: 'দক্ষিণ ও মধ্য এশিয়ায় পাওয়া বুদ্ধিমান ও সহজে খাপ খাওয়ানো বানর।',
    },
    description: {
      en: 'Rhesus macaques are skilled climbers and swimmers with a varied diet. They live in structured social groups where grooming helps maintain alliances. Their adaptability has allowed them to live in forests, villages and cities alike.',
      bn: 'লালমুখো বানর দক্ষ গাছবাই এবং সাঁতারু; খাদ্যাভ্যাসও বৈচিত্র্যময়। তারা সুগঠিত সামাজিক দলে বাস করে, যেখানে পরস্পরের যত্ন নেওয়া বন্ধন রক্ষা করে। খাপ খাওয়ানোর ক্ষমতার কারণে তারা অরণ্য, গ্রাম ও শহরে সমানভাবে বেঁচে থাকতে পারে।',
    },
    habitat: { en: 'Forests, woodlands and urban areas across South Asia', bn: 'দক্ষিণ এশিয়ার অরণ্য, বনভূমি ও শহরাঞ্চল' },
    diet: { en: 'Fruit, leaves, seeds, insects and small animals', bn: 'ফল, পাতা, বীজ, পোকামাকড় ও ছোট প্রাণী' },
    fact: {
      en: 'Rhesus macaques have cheek pouches that let them carry food while foraging.',
      bn: 'রেসাস ম্যাকাকের গালে থলি থাকে, যা খাবারের খোঁজে চলার সময় খাবার বহন করতে দেয়।',
    },
  },
  {
    slug: 'indian-peafowl',
    name: { en: 'Indian Peafowl', bn: 'ভারতীয় ময়ূর' },
    scientific: 'Pavo cristatus',
    category: 'birds',
    image: 'peacock',
    imageAlt: {
      en: 'Peacock displaying its iridescent train',
      bn: 'রঙচঢ় পেখম মেলা ময়ূর',
    },
    intro: {
      en: 'The national bird of India, famous for the male’s shimmering display.',
      bn: 'ভারতের জাতীয় পাখি, পুরুষ ময়ূরের ঝলমলে পেখমের জন্য বিখ্যাত।',
    },
    description: {
      en: 'Male Indian peafowl fan their long upper-tail coverts into a spectacular display during courtship. The birds are ground-feeders, picking up seeds, insects and small reptiles. Their loud calls are a familiar sound in woods and parks across the region.',
      bn: 'প্রজননকালে পুরুষ ভারতীয় ময়ূর লম্বা উপরের লেজ-আবরণ পাখা মেলে করে দর্শনীয় প্রদর্শনী। এরা মাটিতে খাবার খোঁজে — বীজ, পোকামাকড় ও ছোট সরীসৃপ খায়। এই অঞ্চলের বন ও পার্কে তাদের জোরালো ডাক পরিচিত শব্দ।',
    },
    habitat: { en: 'Open forests, scrub and farmland of South Asia', bn: 'দক্ষিণ এশিয়ার খোলা বন, ঝোপঝাড় ও কৃষিজমি' },
    diet: { en: 'Seeds, insects, small reptiles and plant matter', bn: 'বীজ, পোকামাকড়, ছোট সরীসৃপ ও উদ্ভিদ' },
    fact: {
      en: 'Only the male carries the long train; the female peahen is more subdued in colour.',
      bn: 'শুধু পুরুষ ময়ূরের লম্বা পেখম থাকে; নারী ময়ূরের রং অনেকটাই অনুজ্জ্বল।',
    },
    featured: true,
  },
  {
    slug: 'ostrich',
    name: { en: 'Ostrich', bn: 'উটপাখি' },
    scientific: 'Struthio camelus',
    category: 'birds',
    image: 'ostrich',
    imageAlt: {
      en: 'Ostrich standing in its enclosure at Bangladesh National Zoo',
      bn: 'বাংলাদেশ জাতীয় চিড়িয়াখানার আবাসে দাঁড়িয়ে থাকা উটপাখি',
    },
    intro: {
      en: 'The world’s largest living bird — a record-breaking runner that cannot fly.',
      bn: 'পৃথিবীর সবচেয়ে বড় জীবিত পাখি — দ্রুতগামী, তবে উড়তে পারে না।',
    },
    description: {
      en: 'Ostriches are built for the open savannah, with long legs, excellent eyesight and powerful running strides. They eat plants, seeds and the occasional insect or small animal. Males use elaborate courtship displays, including wing-shaking and bowing.',
      bn: 'উটপাখি খোলা সাভানার জন্য তৈরি — লম্বা পা, তীক্ষ্ণ দৃষ্টি ও শক্তিশালী দৌড়। তারা উদ্ভিদ, বীজ এবং মাঝে মাঝে পোকামাকড় বা ছোট প্রাণী খায়। পুরুষ উটপাখি ডানা ঝাঁকানো ও মাথা নত করার মতো বিস্তৃত প্রণয়প্রদর্শন করে।',
    },
    habitat: { en: 'Open savannahs and semi-arid plains of Africa', bn: 'আফ্রিকার খোলা সাভানা ও আধা-শুষ্ক সমতল' },
    diet: { en: 'Plants, seeds, insects and small animals', bn: 'উদ্ভিদ, বীজ, পোকামাকড় ও ছোট প্রাণী' },
    fact: {
      en: 'An ostrich can sprint at speeds that make it one of the fastest land animals on two legs.',
      bn: 'উটপাখি এত দ্রুত দৌড়াতে পারে যে দুই পায়ের প্রাণীদের মধ্যে এটি অন্যতম দ্রুতগামী।',
    },
  },
  {
    slug: 'emu',
    name: { en: 'Emu', bn: 'ইমু' },
    scientific: 'Dromaius novaehollandiae',
    category: 'birds',
    image: 'emu',
    imageAlt: {
      en: 'Emu walking through a natural enclosure',
      bn: 'প্রাকৃতিক আবাসে হেঁটে চলা ইমু',
    },
    intro: {
      en: 'A tall, flightless bird of Australia with a shaggy, hair-like coat.',
      bn: 'অস্ট্রেলিয়ার লম্বা, উড্ডয়নহীন পাখি, যার পালক চুলের মতো ঘন।',
    },
    description: {
      en: 'Emus are nomadic birds that travel in search of food and water. They eat fruit, seeds, insects and plant matter, and can go for long periods without eating. After laying eggs, the female may leave incubation to the male, who tends the nest for weeks.',
      bn: 'ইমু যাযাবর পাখি, খাদ্য ও পানির খোঁজে দীর্ঘ পথ চলে। তারা ফল, বীজ, পোকামাকড় ও উদ্ভিদ খায় এবং দীর্ঘ সময় খাবার ছাড়াও থাকতে পারে। ডিম দেওয়ার পর নারী ইমু প্রায়ই সেবার দায়িত্ব পুরুষের কাছে রেখে যায়; পুরুষ কয়েক সপ্তাহ বাসা পাহারা দেয়।',
    },
    habitat: { en: 'Woodlands, scrub and grasslands of Australia', bn: 'অস্ট্রেলিয়ার বনভূমি, ঝোপঝাড় ও তৃণভূমি' },
    diet: { en: 'Fruit, seeds, insects and plant matter', bn: 'ফল, বীজ, পোকামাকড় ও উদ্ভিদ' },
    fact: {
      en: 'Emus are strong swimmers and can cover long distances on foot.',
      bn: 'ইমু ভালো সাঁতারু এবং পায়ে হেঁটে দীর্ঘ দূরত্ব পাড়ি দিতে পারে।',
    },
  },
  {
    slug: 'great-white-pelican',
    name: { en: 'Great White Pelican', bn: 'সাদা পেলিকান' },
    scientific: 'Pelecanus onocrotalus',
    category: 'birds',
    image: 'pelican',
    imageAlt: {
      en: 'Great white pelican on the water',
      bn: 'পানিতে সাদা পেলিকান',
    },
    intro: {
      en: 'A large waterbird with a remarkable pouch and a steady, social nature.',
      bn: 'অসাধারণ থলিযুক্ত বড় জলচর পাখি, শান্ত ও সামাজিক স্বভাবের।',
    },
    description: {
      en: 'Great white pelicans feed mainly on fish, often working together to herd prey into shallow water. Their elastic throat pouch expands to hold a large catch. They are strong fliers and travel in orderly flocks between wetlands.',
      bn: 'সাদা পেলিকান প্রধানত মাছ খায়, প্রায়ই দলবদ্ধভাবে শিকারকে অগভীর পানিতে চালিত করে। তাদের স্থিতিস্থাপক গলার থলি অনেক খাবার ধরে রাখতে পারে। এরা শক্তিশালী ওড়াউড়ি করে এবং জলাভূমির মধ্যে সুশৃঙ্খল দলে চলাচল করে।',
    },
    habitat: { en: 'Lakes, rivers and wetlands of Africa, Asia and Europe', bn: 'আফ্রিকা, এশিয়া ও ইউরোপের হ্রদ, নদী ও জলাভূমি' },
    diet: { en: 'Fish', bn: 'মাছ' },
    fact: {
      en: 'The pouch beneath the beak can hold several litres of water and fish.',
      bn: 'ঠোঁটের নিচের থলিতে কয়েক লিটার পানি ও মাছ ধরে রাখা যায়।',
    },
  },
  {
    slug: 'greater-flamingo',
    name: { en: 'Greater Flamingo', bn: 'বড় ফ্লেমিঙ্গো' },
    scientific: 'Phoenicopterus roseus',
    category: 'birds',
    image: 'flamingo',
    imageAlt: {
      en: 'Greater flamingo wading in shallow water',
      bn: 'অগভীর পানিতে হেঁটে চলা বড় ফ্লেমিঙ্গো',
    },
    intro: {
      en: 'A tall wading bird whose pink colour comes from the food it eats.',
      bn: 'লম্বা জলচর পাখি, যার গোলাপি রং খাবারের সঙ্গে আসে।',
    },
    description: {
      en: 'Flamingos filter-feed in shallow, often salty water, straining algae and tiny invertebrates through specialised bills. Their vivid colour deepens with a carotenoid-rich diet. They nest in large colonies, building mud mounds for their eggs.',
      bn: 'ফ্লেমিঙ্গো অগভীর, প্রায়ই লবণাক্ত পানিতে বিশেষ ঠোঁট দিয়ে শৈবাল ও ক্ষুদ্র অমেরুদণ্ডী প্রাণী ছেঁকে খায়। ক্যারোটিনয়েডসমৃদ্ধ খাবারের সঙ্গে তাদের উজ্জ্বল রং গাঢ় হয়। তারা বড় কলোনিতে বাসা বাঁধে, ডিমের জন্য কাদার ঢিবি তৈরি করে।',
    },
    habitat: { en: 'Saline lakes, lagoons and coastal wetlands', bn: 'লবণাক্ত হ্রদ, উপহ্রদ ও উপকূলীয় জলাভূমি' },
    diet: { en: 'Algae, small invertebrates and crustaceans', bn: 'শৈবাল, ক্ষুদ্র অমেরুদণ্ডী ও ক্রাস্টেশন' },
    fact: {
      en: 'Flamingos often stand on one leg to conserve body heat.',
      bn: 'শরীরের উষ্ণতা ধরে রাখতে ফ্লেমিঙ্গো প্রায়ই এক পায়ে দাঁড়ায়।',
    },
    featured: true,
  },
  {
    slug: 'black-necked-stork',
    name: { en: 'Black-necked Stork', bn: 'কালাগলা সারস' },
    scientific: 'Ephippiorhynchus asiaticus',
    category: 'birds',
    image: 'stork',
    imageAlt: {
      en: 'Black-necked stork standing tall at Bangladesh National Zoo',
      bn: 'বাংলাদেশ জাতীয় চিড়িয়াখানায় দাঁড়িয়ে থাকা কালাগলা সারস',
    },
    intro: {
      en: 'A tall, striking stork of South Asian wetlands.',
      bn: 'দক্ষিণ এশিয়ার জলাভূমির এক লম্বা, দর্শনীয় সারস।',
    },
    description: {
      en: 'Black-necked storks hunt in shallow water and wet grassland, taking fish, frogs and other small aquatic animals with their long bills. They are usually seen alone or in pairs and build large stick nests in tall trees.',
      bn: 'কালাগলা সারস অগভীর পানি ও ভেজা তৃণভূমিতে শিকার করে; লম্বা ঠোঁট দিয়ে মাছ, ব্যাঙ ও ছোট জলজ প্রাণী ধরে। সাধারণত একা বা জোড়ায় দেখা যায় এবং উঁচু গাছে বড় ডালের বাসা বানায়।',
    },
    habitat: { en: 'Wetlands, marshes and flooded grassland across South Asia', bn: 'দক্ষিণ এশিয়ার জলাভূমি, হাওর ও প্লাবিত তৃণভূমি' },
    diet: { en: 'Fish, frogs, reptiles and aquatic invertebrates', bn: 'মাছ, ব্যাঙ, সরীসৃপ ও জলজ অমেরুদণ্ডী' },
    fact: {
      en: 'It is one of the tallest storks in the world, standing up to about 1.5 metres.',
      bn: 'এটি পৃথিবীর সবচেয়ে লম্বা সারসদের একটি; উচ্চতা প্রায় ১.৫ মিটার পর্যন্ত হয়।',
    },
  },
  {
    slug: 'mugger-crocodile',
    name: { en: 'Mugger Crocodile', bn: 'মিঠাপানির কুমির' },
    scientific: 'Crocodylus palustris',
    category: 'reptiles',
    image: 'mugger',
    imageAlt: {
      en: 'Mugger crocodile at Bangladesh National Zoo',
      bn: 'বাংলাদেশ জাতীয় চিড়িয়াখানায় মিঠাপানির কুমির',
    },
    intro: {
      en: 'A broad-snouted freshwater crocodile of the Indian subcontinent.',
      bn: 'ভারতীয় উপমহাদেশের চওড়া মুখের মিঠাপানির কুমির।',
    },
    description: {
      en: 'Mugger crocodiles live in rivers, lakes and marshes, where they bask on banks and wait patiently for prey. They are powerful swimmers but can also move overland between water bodies. The species is named from “magar”, a local word for crocodile.',
      bn: 'মিঠাপানির কুমির নদী, হ্রদ ও জলাভূমিতে বাস করে; তীরে রোদ পোহায় এবং ধৈর্য ধরে শিকারের অপেক্ষা করে। তারা শক্তিশালী সাঁতারু, আবার স্থলপথে এক জলাশয় থেকে অন্যত্রও যেতে পারে। “মাগর” শব্দ থেকে এর ইংরেজি নাম মাগার এসেছে।',
    },
    habitat: { en: 'Freshwater rivers, lakes and marshes of South Asia', bn: 'দক্ষিণ এশিয়ার মিঠাপানির নদী, হ্রদ ও জলাভূমি' },
    diet: { en: 'Fish, amphibians, reptiles and small mammals', bn: 'মাছ, উভচর, সরীসৃপ ও ছোট স্তন্যপায়ী' },
    fact: {
      en: 'Crocodiles can replace lost teeth throughout their lives.',
      bn: 'কুমির জীবনে বারবার হারানো দাঁতের জায়গায় নতুন দাঁত গজাতে পারে।',
    },
    featured: true,
  },
  {
    slug: 'indian-python',
    name: { en: 'Indian Python', bn: 'অজগর' },
    scientific: 'Python molurus',
    category: 'reptiles',
    image: 'python',
    imageAlt: {
      en: 'Indian python coiled on a branch',
      bn: 'ডালে প্যাঁচানো অজগর',
    },
    intro: {
      en: 'A large, non-venomous constrictor of South Asian forests and wetlands.',
      bn: 'দক্ষিণ এশিয়ার অরণ্য ও জলাভূমির বড়, বিষহীন অজগর।',
    },
    description: {
      en: 'Indian pythons are ambush hunters, using heat-sensitive pits to detect warm-blooded prey. They swallow food whole and can go for weeks between meals. Despite their size they are generally shy and avoid conflict with people.',
      bn: 'অজগর ওতপেতে শিকার করে; উষ্ণ রক্তের প্রাণী শনাক্ত করতে তাপসংবেদী গর্ত ব্যবহার করে। তারা খাবার একবারে গিলে খায় এবং কয়েক সপ্তাহ খাবার ছাড়া থাকতে পারে। আকার বড় হলেও সাধারণত লাজুক এবং মানুষের সঙ্গে সংঘর্ষ এড়িয়ে চলে।',
    },
    habitat: { en: 'Forests, grasslands and wetlands of South Asia', bn: 'দক্ষিণ এশিয়ার অরণ্য, তৃণভূমি ও জলাভূমি' },
    diet: { en: 'Mammals and birds', bn: 'স্তন্যপায়ী ও পাখি' },
    fact: {
      en: 'Pythons do not inject venom; they subdue prey by constriction.',
      bn: 'অজগর বিষ ঢালে না; শিকারকে পেঁচিয়ে শান্ত করে।',
    },
  },
  {
    slug: 'aldabra-giant-tortoise',
    name: { en: 'Aldabra Giant Tortoise', bn: 'অ্যালডাব্রা দৈত্য কচ্ছপ' },
    scientific: 'Aldabrachelys gigantea',
    category: 'reptiles',
    image: 'tortoise',
    imageAlt: {
      en: 'Aldabra giant tortoise on grassy ground',
      bn: 'ঘাসের মাটিতে অ্যালডাব্রা দৈত্য কচ্ছপ',
    },
    intro: {
      en: 'One of the world’s largest tortoises, with a famously long lifespan.',
      bn: 'পৃথিবীর সবচেয়ে বড় কচ্ছপদের একটি, দীর্ঘ আয়ুর জন্য বিখ্যাত।',
    },
    description: {
      en: 'Aldabra giant tortoises graze on grasses, leaves and fruit, playing an important role in seed dispersal. Their slow pace hides remarkable resilience: some individuals are thought to live well over a century. They are native to the Aldabra atoll in the Seychelles.',
      bn: 'অ্যালডাব্রা দৈত্য কচ্ছপ ঘাস, পাতা ও ফল খায় এবং বীজ ছড়িয়ে দিতে গুরুত্বপূর্ণ ভূমিকা রাখে। ধীর গতির পেছনে লুকিয়ে আছে অসাধারণ সহনশীলতা; কিছু কচ্ছপ এক শতাব্দীরও বেশি বাঁচে বলে ধারণা করা হয়। তাদের আদি বাসস্থান সেশেলসের অ্যালডাব্রা অ্যাটল।',
    },
    habitat: { en: 'Grassland and scrub on the Aldabra atoll, Seychelles', bn: 'সেশেলসের অ্যালডাব্রা অ্যাটলের তৃণভূমি ও ঝোপ' },
    diet: { en: 'Grasses, leaves, fruit and herbs', bn: 'ঘাস, পাতা, ফল ও ভেষজ' },
    fact: {
      en: 'Some Aldabra tortoises are estimated to be more than 100 years old.',
      bn: 'কিছু অ্যালডাব্রা কচ্ছপের বয়স ১০০ বছরের বেশি বলে অনুমান করা হয়।',
    },
  },
  {
    slug: 'asian-water-monitor',
    name: { en: 'Asian Water Monitor', bn: 'গোসাপ' },
    scientific: 'Varanus salvator',
    category: 'reptiles',
    image: 'monitor',
    imageAlt: {
      en: 'Asian water monitor on the ground near vegetation',
      bn: 'গাছপালার কাছে মাটিতে গোসাপ',
    },
    intro: {
      en: 'A large, adaptable lizard at home on land and in water.',
      bn: 'বড়, সহজে খাপ খাওয়ানো টিকটিকি, যা ডাঙা ও পানিতে সমানভাবে চলতে পারে।',
    },
    description: {
      en: 'Asian water monitors are excellent swimmers and powerful climbers. They scavenge and hunt fish, eggs, insects and small animals. Their long, muscular tails help them swim, and their forked tongues carry scent information to a specialised organ.',
      bn: 'গোসাপ দক্ষ সাঁতারু ও শক্তিশালী গাছবাই। তারা মরা প্রাণী খায় এবং মাছ, ডিম, পোকামাকড় ও ছোট প্রাণী শিকার করে। লম্বা পেশীবহুল লেজ সাঁতারে সাহায্য করে, আর দ্বিখণ্ডিত জিহ্বা গন্ধের তথ্য বিশেষ অঙ্গে পৌঁছে দেয়।',
    },
    habitat: { en: 'Wetlands, riverbanks and forests across South and Southeast Asia', bn: 'দক্ষিণ ও দক্ষিণ-পূর্ব এশিয়ার জলাভূমি, নদীতীর ও অরণ্য' },
    diet: { en: 'Fish, eggs, insects, carrion and small animals', bn: 'মাছ, ডিম, পোকামাকড়, মরা প্রাণী ও ছোট প্রাণী' },
    fact: {
      en: 'Water monitors can hold their breath underwater for a considerable time.',
      bn: 'গোসাপ পানির নিচে দীর্ঘ সময় শ্বাস আটকে রাখতে পারে।',
    },
  },
  {
    slug: 'arapaima',
    name: { en: 'Arapaima', bn: 'অ্যারাপাইমা' },
    scientific: 'Arapaima gigas',
    category: 'fish',
    image: 'arapaima',
    imageAlt: {
      en: 'Large arapaima swimming in an aquarium',
      bn: 'অ্যাকুরিয়ামে সাঁতার কাটা বড় অ্যারাপাইমা',
    },
    intro: {
      en: 'One of the world’s largest freshwater fish, from the Amazon basin.',
      bn: 'আমাজন অববাহিকার বিশ্বের সবচেয়ে বড় মিঠাপানির মাছদের একটি।',
    },
    description: {
      en: 'Arapaima can grow extremely large and need to surface regularly to breathe air. They are predatory fish with armoured scales and powerful bodies. Their dependence on atmospheric oxygen makes them vulnerable to certain fishing methods, and conservation efforts focus on sustainable management.',
      bn: 'অ্যারাপাইমা অনেক বড় হতে পারে এবং শ্বাস নেওয়ার জন্য নিয়মিত পানির ওপরে আসতে হয়। তারা শিকারি মাছ, শক্ত আঁশের বর্ম ও শক্তিশালী শরীরের অধিকারী। বাতাসের অক্সিজেনের ওপর নির্ভরতা তাদের কিছু মাছ ধরার পদ্ধতিতে ঝুঁকিপূর্ণ করে তোলে; টেকসই ব্যবস্থাপনায় সংরক্ষণ প্রচেষ্টা চলে।',
    },
    habitat: { en: 'Slow-moving rivers, lakes and floodplains of the Amazon', bn: 'আমাজনের ধীরগতির নদী, হ্রদ ও প্লাবনভূমি' },
    diet: { en: 'Fish and other aquatic animals', bn: 'মাছ ও অন্যান্য জলজ প্রাণী' },
    fact: {
      en: 'Arapaima must come to the surface to breathe air.',
      bn: 'অ্যারাপাইমাকে শ্বাস নিতে পানির ওপরে আসতেই হয়।',
    },
  },
  {
    slug: 'red-bellied-piranha',
    name: { en: 'Red-bellied Piranha', bn: 'লালপেট পিরানহা' },
    scientific: 'Pygocentrus nattereri',
    category: 'fish',
    image: 'piranha',
    imageAlt: {
      en: 'Red-bellied piranha underwater',
      bn: 'পানির নিচে লালপেট পিরানহা',
    },
    intro: {
      en: 'A schooling Amazonian fish with a fearsome reputation and a complex social life.',
      bn: 'আমাজনের দলবদ্ধ মাছ, ভয়ংকর খ্যাতির পাশাপাশি জটিল সামাজিক জীবন।',
    },
    description: {
      en: 'Red-bellied piranhas live in groups and communicate through sound and body signals. They feed on fish, insects and plant matter, and their reputation as indiscriminate killers is exaggerated. Like all wild animals, they are best observed without interference.',
      bn: 'লালপেট পিরানহা দলে বাস করে এবং শব্দ ও শরীরী সংকেতে যোগাযোগ করে। তারা মাছ, পোকামাকড় ও উদ্ভিদ খায়; নির্বিচারে হত্যাকারী হিসেবে তাদের খ্যাতি অতিরঞ্জিত। সব বন্য প্রাণীর মতো এদেরও হস্তক্ষেপ ছাড়াই দেখা উচিত।',
    },
    habitat: { en: 'Amazon basin rivers, lakes and flooded forests', bn: 'আমাজন অববাহিকার নদী, হ্রদ ও প্লাবিত বন' },
    diet: { en: 'Fish, insects and plant matter', bn: 'মাছ, পোকামাকড় ও উদ্ভিদ' },
    fact: {
      en: 'Piranhas produce barking and drumming sounds to communicate.',
      bn: 'পিরানহা যোগাযোগের জন্য ঘেউ ঘেউ ও ঢোলের মতো শব্দ তৈরি করে।',
    },
  },
  {
    slug: 'koi-carp',
    name: { en: 'Koi Carp', bn: 'কই কার্প' },
    scientific: 'Cyprinus rubrofuscus',
    category: 'fish',
    image: 'koi',
    imageAlt: {
      en: 'Colourful koi carp swimming in a pond',
      bn: 'পুকুরে সাঁতার কাটা রঙিন কই কার্প',
    },
    intro: {
      en: 'Ornamental carp bred for centuries into a living palette of colour.',
      bn: 'শতাব্দী ধরে প্রজননের মাধ্যমে রঙের জীবন্ত প্যালেটে পরিণত হওয়া কার্প মাছ।',
    },
    description: {
      en: 'Koi are domesticated carp selected for their colour and pattern. They are omnivorous, feeding on insects, algae and plant material. In the right conditions they can live for decades, and they are a familiar sight in ornamental ponds across Asia.',
      bn: 'কই কার্প হলো রঙ ও নকশার জন্য নির্বাচিত গৃহপালিত কার্প মাছ। তারা সর্বভুক — পোকামাকড়, শৈবাল ও উদ্ভিদ খায়। উপযুক্ত পরিবেশে তারা কয়েক দশক বাঁচতে পারে এবং এশিয়ার শোভা-পুকুরে এদের দেখা মেলে।',
    },
    habitat: { en: 'Freshwater ponds and slow rivers; kept worldwide as ornamental fish', bn: 'মিঠাপানির পুকুর ও ধীরগতির নদী; বিশ্বজুড়ে শোভা-মাছ হিসেবে পালিত' },
    diet: { en: 'Insects, algae, seeds and plant matter', bn: 'পোকামাকড়, শৈবাল, বীজ ও উদ্ভিদ' },
    fact: {
      en: 'Koi can be trained to recognise the person who feeds them.',
      bn: 'কই কার্পকে খাবার দেওয়া ব্যক্তিকে চিনতে প্রশিক্ষণ দেওয়া যায়।',
    },
  },
]

export const getAnimalBySlug = (slug) => animals.find((animal) => animal.slug === slug)

export const relatedAnimals = (animal, limit = 3) =>
  animals
    .filter((item) => item.category === animal.category && item.slug !== animal.slug)
    .slice(0, limit)
