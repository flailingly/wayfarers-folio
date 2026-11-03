// Citizen Sleeper-style vignette encounters with progress clocks
export const ENCOUNTERS = [
  {
    id: "dolores_runes",
    sectorId: "dolores_lawn",
    title: "The Whispering Bastion: Lower Cellar Runes",
    icon: "🏰",
    text: "While surveying the southern terrace of Dolores Great Lawn, you notice glowing runes etched into the historic retaining wall. The leyline hums faintly. How do you investigate?",
    clock: {
      name: "Conduit Decipherment",
      segments: 4,
      current: 2
    },
    choices: [
      {
        id: "decipher",
        title: "Decipher Arcane Inscriptions",
        desc: "Spend 5 minutes decoding the leyline resonance frequency (+80 Lore XP, advances clock).",
        rewardXP: 80,
        advanceClock: 1,
        itemGain: null,
        feedback: "The inscriptions align with the 18th Street sewer fault. Leyline charted!"
      },
      {
        id: "forage_lichen",
        title: "Harvest Night-Blooming Lichen",
        desc: "Forage cooling lichen from the granite mortar (+2x Night-Blooming Lichen).",
        rewardXP: 40,
        advanceClock: 0,
        itemGain: "night_lichen",
        feedback: "Two clumps of cool lichen placed into your satchel for tonight's knee wrap."
      }
    ]
  },
  {
    id: "julian_herbary",
    sectorId: "san_francisco_de_asis",
    title: "Archivist Julian's Botanical Herbary",
    icon: "🌿",
    text: "Archivist Julian stands among the raised comfrey beds behind Mission Dolores. He inspects your stride and gestures toward a stone bench.",
    clock: {
      name: "Julian's Trust",
      segments: 4,
      current: 1
    },
    choices: [
      {
        id: "gait_check",
        title: "Submit to Stride Evaluation",
        desc: "Demonstrate your heel-to-toe gait along the courtyard pavers.",
        rewardXP: 60,
        advanceClock: 1,
        itemGain: "mission_comfrey",
        feedback: "Julian nods: 'Better extension. Take this fresh comfrey—steep it before bed.'"
      },
      {
        id: "rest_fountain",
        title: "Rest at the Adobe Cistern",
        desc: "Unload your joint for 10 minutes while listening to garden lore.",
        rewardXP: 50,
        advanceClock: 1,
        itemGain: null,
        feedback: "Your joint cools down. Julian tells you about the 1791 buried cemetery creek."
      }
    ]
  }
];
