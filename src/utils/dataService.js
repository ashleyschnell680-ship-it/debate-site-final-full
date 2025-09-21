// Central data service to manage categories with new debate format
const getDefaultCategories = () => [
  {
    id: 1,
    title: 'Government & Constitution',
    subItems: [
      {
        name: 'Limited Government',
        topic: 'Should the federal government have limited power with more authority left to individual states?',
        republican: {
          summary: 'The federal government should have restricted powers, allowing states to govern themselves according to local needs and values.',
          reasoning: 'Believes in constitutional limits, individual liberty, local control, and that government closest to the people governs best.',
          sources: [
            'Heritage Foundation study showing state-level solutions are more responsive to citizen needs (2020)',
            'Tenth Amendment Center research on federalism effectiveness',
            'https://www.heritage.org'
          ]
        },
        democratic: {
          summary: 'Federal government needs sufficient power to ensure equal rights, national standards, and address issues that cross state lines.',
          reasoning: 'Believes in equity, civil rights protection, national unity, and preventing a patchwork of conflicting state laws.',
          sources: [
            'Brookings Institution analysis of federal role in civil rights enforcement',
            'Economic Policy Institute data on interstate commerce regulation benefits',
            'Historical examples of federal intervention ensuring equal rights'
          ]
        },
        vocabulary: [
          'Federalism vs States Rights',
          'Constitutional originalism vs Living Constitution',
          'Local control vs National standards',
          'Tenth Amendment vs Commerce Clause'
        ],
        myTake: 'This section allows users to write their own analysis after reviewing both perspectives.'
      },
      {
        name: 'Individual Liberty',
        topic: 'How should we balance individual freedoms with collective safety and social responsibility?',
        republican: {
          summary: 'Individual rights and freedoms should be maximally protected, with minimal government interference in personal choices.',
          reasoning: 'Values personal responsibility, constitutional rights, limited government, and believes freedom leads to prosperity and happiness.',
          sources: [
            'Cato Institute research on economic freedom correlating with prosperity',
            'Constitutional analysis of Bill of Rights protections',
            'https://www.cato.org'
          ]
        },
        democratic: {
          summary: 'Individual freedoms are important but must be balanced with collective welfare and preventing harm to others.',
          reasoning: 'Believes in social responsibility, common good, protecting vulnerable populations, and that some restrictions prevent greater harms.',
          sources: [
            'Public health studies on collective action benefits',
            'Social science research on community welfare vs individual choice',
            'Historical analysis of regulated freedoms improving society'
          ]
        },
        vocabulary: [
          'Liberty vs License',
          'Positive rights vs Negative rights',
          'Personal responsibility vs Social safety net',
          'Individual choice vs Collective good'
        ],
        myTake: 'This section allows users to write their own analysis after reviewing both perspectives.'
      }
    ]
  },
  {
    id: 2,
    title: 'Economy & Taxes',
    subItems: [
      {
        name: 'Lower Taxes',
        topic: 'Should taxes be reduced to stimulate economic growth, or maintained/increased to fund government services?',
        republican: {
          summary: 'Lower taxes stimulate economic growth by allowing individuals and businesses to keep more of their earnings for investment and spending.',
          reasoning: 'Believes in supply-side economics, individual ownership of earnings, free market efficiency, and that prosperity benefits everyone.',
          sources: [
            'Tax Foundation analysis showing correlation between low taxes and economic growth',
            'Historical data from Reagan and Kennedy tax cuts',
            'https://taxfoundation.org'
          ]
        },
        democratic: {
          summary: 'Adequate taxation is necessary to fund essential services, infrastructure, and social programs that benefit society.',
          reasoning: 'Believes in progressive taxation, social investment, income inequality reduction, and that public services require funding.',
          sources: [
            'Congressional Budget Office analysis of public investment returns',
            'International comparisons of tax rates and social outcomes',
            'Economic research on infrastructure spending multiplier effects'
          ]
        },
        vocabulary: [
          'Supply-side vs Demand-side economics',
          'Tax burden vs Public investment',
          'Trickle-down vs Bottom-up economics',
          'Fiscal responsibility vs Social spending'
        ],
        myTake: 'This section allows users to write their own analysis after reviewing both perspectives.'
      }
    ]
  },
  {
    id: 3,
    title: 'Society & Culture',
    subItems: [
      {
        name: 'Traditional Family Values',
        topic: 'What role should traditional family structures play in society and policy-making?',
        republican: {
          summary: 'Traditional family structures (married parents with children) provide stability and should be supported through policy and culture.',
          reasoning: 'Values stability, proven social structures, religious principles, and believes strong families create strong communities.',
          sources: [
            'Social science research on child outcomes in two-parent households',
            'Heritage Foundation studies on family structure and economic mobility',
            'https://www.heritage.org'
          ]
        },
        democratic: {
          summary: 'Families come in many forms and all should be supported equally, without privileging one structure over others.',
          reasoning: 'Values diversity, inclusion, equality, and believes love and commitment matter more than specific family configurations.',
          sources: [
            'American Psychological Association research on diverse family outcomes',
            'Studies showing success across various family structures',
            'Legal analysis of equal protection under family law'
          ]
        },
        vocabulary: [
          'Traditional vs Non-traditional families',
          'Nuclear family vs Extended family',
          'Family values vs Family diversity',
          'Moral foundation vs Social evolution'
        ],
        myTake: 'This section allows users to write their own analysis after reviewing both perspectives.'
      }
    ]
  }
]

export const getCategories = () => {
  const saved = localStorage.getItem('debateCategories')
  if (saved) {
    return JSON.parse(saved)
  }
  
  // If no saved data, initialize with defaults
  const defaults = getDefaultCategories()
  localStorage.setItem('debateCategories', JSON.stringify(defaults))
  return defaults
}

export const saveCategories = (categories) => {
  localStorage.setItem('debateCategories', JSON.stringify(categories))
}