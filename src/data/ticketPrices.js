/**
 * Published gate and museum prices. Student, child and accessibility
 * concessions are subject to the zoo's official conditions at the gate.
 */
export const ticketPrices = [
  {
    id: 'general',
    label: { en: 'General admission', bn: 'সাধারণ প্রবেশ' },
    price: 50,
    note: {
      en: 'Main gate, visitors above 2 years',
      bn: 'প্রধান ফটক, ২ বছরের বেশি বয়সীদের জন্য',
    },
    highlight: true,
  },
  {
    id: 'student',
    label: { en: 'Students', bn: 'শিক্ষার্থী' },
    price: 25,
    note: {
      en: 'With a valid institutional ID, subject to official conditions',
      bn: 'বৈধ শিক্ষাপ্রতিষ্ঠানের পরিচয়পত্রসহ, অফিসিয়াল শর্ত প্রযোজ্য',
    },
  },
  {
    id: 'child',
    label: { en: 'Children up to 2 years', bn: '২ বছর পর্যন্ত শিশু' },
    price: 0,
    note: { en: 'Free entry', bn: 'বিনামূল্যে প্রবেশ' },
  },
  {
    id: 'accessibility',
    label: { en: 'Visitors with disabilities', bn: 'প্রতিবন্ধী দর্শনার্থী' },
    price: 0,
    note: {
      en: 'Free entry, subject to official policy',
      bn: 'বিনামূল্যে প্রবেশ, অফিসিয়াল নীতিমালা প্রযোজ্য',
    },
  },
  {
    id: 'museum',
    label: { en: 'Zoological Museum', bn: 'প্রাণিবিজ্ঞান জাদুঘর' },
    price: 10,
    note: {
      en: 'Separate ticket in addition to main gate entry',
      bn: 'প্রধান ফটকের টিকিটের অতিরিক্ত আলাদা টিকিট',
    },
  },
]
