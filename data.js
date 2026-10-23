// 10Yards site content. Edit here; the pages build themselves from this file.
// Videos and stills currently come from the Wix media CDN (account 0e3737).
// To add a film: add an entry to TY_WORK with a unique `slug`.
// `palette`: colours sampled from the film's own frames; they fill its title on the Work page.

window.TY_CONFIG = {
  email: "luketajones@gmail.com", // footer address (Luke's own for now)
  phone: "07474 462 477",
  // Contact page: each name links straight to that person's email.
  people: [
    { name: "Luke", email: "luketajones@gmail.com" },
    { name: "Andrzej", email: "andrzej.szymanski084@gmail.com" }
  ],
  instagram: "",                  // e.g. "https://instagram.com/10yards"
  showreel: "0e3737_0a235240756b42a78ca7843f1d53f403"
};

window.TY_WORK = [
  { slug: "caesar-the-gorilla", id: "0e3737_152ff0ea5a6344d194a6ae547a4acf94", q: "720p", palette: ["hsl(356 86% 54%)", "hsl(0 0% 100%)", "hsl(214 82% 58%)", "hsl(0 0% 100%)"], title: "Caesar the Gorilla", client: "Flight Centre with Knock Three Times", type: "Stunt", format: "16:9", runtime: 68, featured: true, lead: true,
    lines: [
      "Wakefield Council told Adele Teale to take Caesar, her giant resin gorilla, off the plinth outside her house or face a £20,000 fine. So Knock Three Times and 10Yards gave him a new home in London.",
      "Knock Three Times brought Caesar to the capital for Flight Centre and Intrepid Travel, to front their responsible tourism work in Africa. 10Yards filmed the whole journey: collecting him in a custom crate, driving him round central London in the back of a van past Big Ben, Downing Street and Piccadilly Circus, and unboxing him outside Flight Centre's South Molton Street store.",
      "It ran across the nationals, including MailOnline, The Mirror, The Sun, ITVX and GB News."
    ],
    // Film: imported to Wix media from Andre's Instagram reel (23 Aug 2026). 720p is the best Instagram had.
    filmPost: "https://www.instagram.com/anjjphoto/reel/DcZGcNrtuRZ/",
    press: [
      { name: "The film on Instagram", url: "https://www.instagram.com/anjjphoto/reel/DcZGcNrtuRZ/" },
      { name: "GB News", url: "https://www.gbnews.com/news/wakefield-news-evicted-plastic-gorilla-new-home-flight-centre-london" },
      { name: "SWNS", url: "https://discover.swns.com/2026/06/moment-council-orders-giant-gorilla-statue-removed-from-home/" },
      { name: "Yorkshire Evening Post", url: "https://www.yorkshireeveningpost.co.uk/news/people/watch-gorilla-statue-taken-wakefield-8761024" },
      { name: "Wakefield Express", url: "https://www.wakefieldexpress.co.uk/news/people/going-ape-caesar-the-wakefield-gorilla-that-hit-the-headlines-moves-to-mayfair-8758154" },
      { name: "PR Stunt Watch", url: "https://www.creativemoment.co/pr-stunt-watch-flight-centres-gorilla-adoption-m-ss-picky-bits-day-and-aunt-bessies-harry-styles-newsjack" },
      { name: "Knock Three Times on the results", url: "https://www.creativemoment.co/what-a-five-foot-plastic-gorilla-taught-us-about-ai-visibility" }
    ] },
  { slug: "together-stronger", id: "0e3737_f6d19f5ba9654b718462780a5f80bcc2", q: "1080p", palette: ["hsl(354 86% 52%)", "hsl(0 0% 100%)", "hsl(146 68% 44%)", "hsl(354 86% 52%)"], title: "Together Stronger", client: "FA Wales", type: "Brand film", format: "16:9", runtime: 155,
    // Film: 1080p with audio, rebuilt from FAW's Vimeo stream (1177329683) and uploaded to Wix media (23 Oct 2026).
    // Swap in the master export if one turns up.
    filmPost: "https://faw.cymru/news/together-stronger-one-nation-many-identities/",
    lines: [
      "A film for the Football Association of Wales about who Wales is in 2026: one nation of many identities, under one flag.",
      "It opens on a question, “Pwy ydym ni? Who are we?”, and answers it across the country, from cities to valleys to the coast, and from local clubs to The Red Wall."
    ],
    press: [ { name: "The film on FAW's site", url: "https://faw.cymru/news/together-stronger-one-nation-many-identities/" } ] },
  { slug: "mk-dons-reebok", palette: ["hsl(134 93% 56%)", "hsl(110 80% 70%)", "hsl(160 85% 48%)"], id: "0e3737_be631b9980a944e6ab39098dea5b266d", title: "MK Dons x Reebok", client: "Reebok", type: "Commercial", format: "16:9", runtime: 47, featured: true,
    lines: [
      "Most kit launches look the same: portraits, smoke machines, slow motion. The kit drew on Bletchley Park, so we took the launch there and built a story around it instead of a photo shoot.",
      "We filmed the whole piece through a night-vision head rig, so it plays like a first-person game. It pulled in a younger audience and kept the top-secret feel of the place the kit was inspired by."
    ],
    press: [ { name: "BBC News", url: "https://www.bbc.co.uk/news/articles/cx23djxn89ro" } ] },
  { slug: "home-away-from-home", palette: ["hsl(39 55% 63%)", "hsl(19 59% 56%)", "hsl(212 95% 56%)", "hsl(314 90% 56%)"], id: "0e3737_48d49e0d79c04070af59119993d3f553", title: "Home Away From Home", client: "Hilton", type: "Commercial", format: "16:9", runtime: 121, featured: true },
  { slug: "izco-heavy-soul", palette: ["hsl(26 89% 56%)", "hsl(39 95% 72%)", "hsl(14 92% 52%)", "hsl(48 95% 66%)"], id: "0e3737_4ffc6867811b4910bbc2fc08108d12c4", title: "Heavy Soul", client: "IZCO", type: "Music", format: "16:9", runtime: 72, featured: true,
    lines: ["The official visualiser for IZCO's Heavy Soul."] },
  { slug: "tower-block", palette: ["hsl(36 55% 72%)", "hsl(18 61% 56%)", "hsl(28 70% 64%)"], id: "0e3737_b5df2412f37a430f900ae38cc8da13a8", title: "Tower Block", client: "10Yards", type: "Short", format: "3:2", runtime: 72 },
  { slug: "feeling-blue", palette: ["hsl(226 72% 61%)", "hsl(75 55% 72%)", "hsl(242 95% 56%)"], id: "0e3737_4e055c0c4e5f48118cf7ddfd41059ac3", title: "Feeling Blue", client: "Chelsea", type: "Social", format: "1:1", runtime: 57, q: "720p" },
  { slug: "odyssey-in-bloom", palette: ["hsl(37 55% 56%)", "hsl(26 55% 56%)", "hsl(44 70% 70%)"], id: "0e3737_d8f7c32490a742789be05140d314a383", title: "Odyssey In Bloom", client: "10Yards", type: "Short", format: "16:9", runtime: 53 },
  { slug: "game-of-chance", palette: ["hsl(8 95% 56%)", "hsl(357 90% 56%)", "hsl(42 70% 56%)"], id: "0e3737_c5c1293fd47747c3bcd00a2b258a667c", title: "Game Of Chance", client: "10Yards", type: "Short", format: "16:9", runtime: 38 },
  { slug: "give-me-more", palette: ["hsl(192 55% 56%)", "hsl(40 95% 64%)", "hsl(20 95% 64%)", "hsl(219 55% 56%)"], id: "0e3737_3494500aa25a47beae3fe43b69f6ab87", title: "Give Me More", client: "Tim Reaper", type: "Music", format: "2.39:1", runtime: 8 },
  { slug: "iper-virtual-supermarket", palette: ["hsl(24 55% 56%)", "hsl(38 55% 65%)", "hsl(72 55% 56%)"], id: "0e3737_a8d9f446072841bcb464159cbde0df76", title: "Virtual Supermarket", client: "Iper", type: "Experience", format: "16:9", runtime: 7 },
  { slug: "ygk-rentals", palette: ["hsl(20 80% 56%)", "hsl(46 55% 70%)", "hsl(194 55% 56%)"], id: "0e3737_edb04b49b15b4f5c9b017b2d71f20084", title: "YGK Rentals", client: "YGK", type: "Social", format: "9:16", runtime: 23 },
  { slug: "stage-visualiser", palette: ["hsl(14 84% 56%)", "hsl(188 55% 56%)", "hsl(40 87% 56%)", "hsl(349 67% 56%)"], id: "0e3737_25c73ddc0bf24391ad544415d7350d05", title: "Stage Visualiser", client: "Tim Reaper", type: "Music", format: "9:16", runtime: 8 },
  { slug: "star-wars-recreation", palette: ["hsl(224 69% 56%)", "hsl(16 61% 56%)", "hsl(201 55% 72%)", "hsl(350 55% 56%)"], id: "0e3737_f0a5274187fb485f9d8cfb49f00ee32d", title: "Star Wars Recreation", client: "10Yards", type: "Animation", format: "16:9", runtime: 22 },
  { slug: "lego-episode-vi", palette: ["hsl(197 55% 72%)", "hsl(220 59% 56%)", "hsl(36 55% 56%)"], id: "0e3737_6a6367496b7a4490b6dd4061da9d27c8", title: "LEGO Episode VI", client: "10Yards", type: "Animation", format: "16:9", runtime: 27 }
];

// The "Latest" logbook: newest first. `work` links an entry to a project page.
window.TY_LATEST = [
  { date: "2026-06-24", title: "We drove a gorilla round London", work: "caesar-the-gorilla",
    text: "Caesar was evicted from Wakefield, adopted by Flight Centre and given a tour of central London in the back of our van. Made with Knock Three Times, who wrote up the shoot and thanked the crew for pulling it off. It ran on GB News, SWNS and across the regional press.",
    links: [ { name: "Knock Three Times on LinkedIn", url: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7477608670391099392" }, { name: "GB News", url: "https://www.gbnews.com/news/wakefield-news-evicted-plastic-gorilla-new-home-flight-centre-london" }, { name: "Creative Moment", url: "https://www.creativemoment.co/pr-stunt-watch-flight-centres-gorilla-adoption-m-ss-picky-bits-day-and-aunt-bessies-harry-styles-newsjack" } ] },
  { date: "2026-03-26", title: "Together Stronger for the Football Association of Wales", work: "together-stronger",
    text: "We shot Together Stronger for the FAW and the Wales national team: a film about who Wales is in 2026, one nation of many identities under one flag. Shot across the country, from cities to valleys to the coast, and from local clubs to The Red Wall. The FAW released it on 26 March.",
    links: [ { name: "The film on FAW's site", url: "https://faw.cymru/news/together-stronger-one-nation-many-identities/" } ] },
  { date: "", title: "MK Dons x Reebok makes the BBC", work: "mk-dons-reebok",
    text: "Our night-vision kit launch, shot at Bletchley Park, was picked up by BBC News.",
    links: [ { name: "BBC News", url: "https://www.bbc.co.uk/news/articles/cx23djxn89ro" } ] }
];
