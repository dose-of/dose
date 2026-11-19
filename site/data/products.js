// DOSE product catalogue.
// Placeholder data from the design handoff — replace names, prices, stones,
// codes and images with the real collection when ready.
//
// Code format: D{collection}·{part letter}{nn} · AG925+{STONE3}
// img / pos / zoom: which photo to crop for the card until real product shots exist.

const PHOTOS = {
  street: "assets/photos/jaipur-street-two-models.jpg",
  necklaces: "assets/photos/jaipur-necklaces.jpg",
  teaHouse: "assets/photos/jaipur-tea-house.jpg",
  stoneCutting: "assets/photos/jaipur-stone-cutting.jpg",
};

const PRODUCTS = [
  { id: 1, slug: "citrine-drop-earrings", name: "Citrine Drop Earrings", price: 140, part: "Ear", stone: "Citrine", code: "D01·E01 · AG925+CIT", img: PHOTOS.necklaces, pos: "50% 38%", zoom: 1.8 },
  { id: 2, slug: "pyrite-chain-necklace", name: "Pyrite Chain Necklace", price: 180, part: "Neck", stone: "Pyrite", code: "D01·N01 · AG925+PYR", img: PHOTOS.street, pos: "35% 55%", zoom: 1.6 },
  { id: 3, slug: "old-city-signet", name: "Old City Signet", price: 160, part: "Finger", stone: "Fluorite", code: "D01·F01 · AG925+FLU", img: PHOTOS.teaHouse, pos: "50% 70%", zoom: 1.7, sized: true },
  { id: 4, slug: "bench-cuff", name: "Bench Cuff", price: 210, part: "Wrist", stone: "None, raw silver", code: "D01·W01 · AG925", img: PHOTOS.stoneCutting, pos: "50% 50%", zoom: 1.4 },
  { id: 5, slug: "pearl-silver-choker", name: "Pearl & Silver Choker", price: 190, part: "Neck", stone: "Freshwater pearl", code: "D01·N02 · AG925+PRL", img: PHOTOS.teaHouse, pos: "50% 45%", zoom: 1.5 },
  { id: 6, slug: "stone-hoops", name: "Stone Hoops", price: 120, part: "Ear", stone: "Citrine", code: "D01·E02 · AG925+CIT", img: PHOTOS.street, pos: "65% 35%", zoom: 1.7 },
  { id: 7, slug: "cutters-ring", name: "Cutter's Ring", price: 110, part: "Finger", stone: "Pyrite", code: "D01·F02 · AG925+PYR", img: PHOTOS.stoneCutting, pos: "40% 60%", zoom: 1.8, sized: true },
  { id: 8, slug: "fluorite-pendant", name: "Fluorite Pendant", price: 150, part: "Neck", stone: "Fluorite", code: "D01·N03 · AG925+FLU", img: PHOTOS.necklaces, pos: "50% 62%", zoom: 1.6 },
];

const PRODUCT_DESCRIPTION =
  "Made at the bench in Jaipur's old city. The silver is shaped and linked by hand, the stone cut and set by the same people who taught the studio.";

const COLLECTIONS = [
  { no: "No. 01", city: "Jaipur", craft: "Silver & stone", status: "Available", soon: false },
  { no: "No. 02", city: "To be announced", craft: "Next city, next craft", status: "Soon", soon: true },
];

const PARTS = ["All", "Ear", "Neck", "Finger", "Wrist"];
const SIZES = ["50", "52", "54", "56"];
