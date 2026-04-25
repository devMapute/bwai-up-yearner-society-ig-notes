export interface Song {
  id: string;
  title: string;
  artist: string;
  spotifyId: string;
  lyrics: string;
  noteSnippet: string;
  moodTags: string[];
}

export const musicData: Song[] = [
  {
    id: "1",
    title: "Leaves",
    artist: "Ben&Ben",
    spotifyId: "6v996vTIdZid4u96996vTI",
    lyrics: "Leaves will soon grow from the bareness of trees, and all will be alright in time.",
    noteSnippet: "Leaves will soon grow 🍃",
    moodTags: ["hopeful", "yearning", "healing", "patience"]
  },
  {
    id: "2",
    title: "Kathang Isip",
    artist: "Ben&Ben",
    spotifyId: "38996vTIdZid4u96996vTI",
    lyrics: "Pasensya ka na, sa mga kathang isip kong ito. Wari'y napaniwala ang sarili sa hindi totoong pag-ibig.",
    noteSnippet: "Kathang isip lang pala... 💭",
    moodTags: ["heartbroken", "delusional", "yearning", "sad"]
  },
  {
    id: "3",
    title: "Mundo",
    artist: "IV of Spades",
    spotifyId: "18996vTIdZid4u96996vTI",
    lyrics: "Sinta, sa 'yong mundo lang ako... Limutin ang mundo, hayaan mong tayo lang dalawa.",
    noteSnippet: "Sa 'yong mundo lang ako 🌎",
    moodTags: ["love", "obsessed", "yearning", "devotion"]
  },
  {
    id: "4",
    title: "vampire empire",
    artist: "Big Thief",
    spotifyId: "28996vTIdZid4u96996vTI",
    lyrics: "You give me heart and soul, I give you anything and everything to keep you close.",
    noteSnippet: "Vampire empire of yearning 🧛‍♀️",
    moodTags: ["intense", "raw", "yearning", "indie"]
  },
  {
    id: "5",
    title: "Tahanan",
    artist: "Adie",
    spotifyId: "48996vTIdZid4u96996vTI",
    lyrics: "Sa pag-uwi ko, ikaw ang aking tahanan. Sa 'yo lang ako kampante.",
    noteSnippet: "Ikaw ang aking tahanan 🏠",
    moodTags: ["comfort", "longing", "yearning", "home"]
  },
  {
    id: "6",
    title: "Tadhana",
    artist: "Up Dharma Down",
    spotifyId: "58996vTIdZid4u96996vTI",
    lyrics: "Ba't 'di pa sabihin ang nararamdaman? 'Di ba't ikaw ang tanging hanap-hanap ko?",
    noteSnippet: "Ba't 'di pa sabihin? ✨",
    moodTags: ["destiny", "fate", "yearning", "hesitant"]
  },
  {
    id: "7",
    title: "Bawat Piyesa",
    artist: "Munimuni",
    spotifyId: "68996vTIdZid4u96996vTI",
    lyrics: "Bawat piyesa ng aking pagkatao ay iyong-iyo.",
    noteSnippet: "Bawat piyesa ay iyong-iyo 🧩",
    moodTags: ["surrender", "deep", "yearning", "poetic"]
  },
  {
    id: "8",
    title: "Parallel Universe",
    artist: "Clara Benin",
    spotifyId: "78996vTIdZid4u96996vTI",
    lyrics: "In a parallel universe, we are together, and it's not just a dream.",
    noteSnippet: "In a parallel universe... 🌌",
    moodTags: ["dreamy", "what-if", "yearning", "cosmic"]
  },
  {
    id: "9",
    title: "Raining in Manila",
    artist: "Lola Amour",
    spotifyId: "88996vTIdZid4u96996vTI",
    lyrics: "It's raining in Manila, hindi ka ba nilalamig? Mahirap bang mag-isa?",
    noteSnippet: "Raining in Manila... 🌧️",
    moodTags: ["rainy", "nostalgic", "yearning", "miss"]
  },
  {
    id: "10",
    title: "Burnout",
    artist: "Sugarfree",
    spotifyId: "98996vTIdZid4u96996vTI",
    lyrics: "O, kay tagal din kitang minahal. Kay tagal din kitang minahal.",
    noteSnippet: "O, kay tagal kitang minahal ⌛",
    moodTags: ["exhausted", "classic", "yearning", "old-love"]
  }
];
