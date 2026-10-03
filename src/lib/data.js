// Menu & prices pulled from SMASHED's foodpanda listing (Bahria Enclave).
// Add-on prices below are DEMO values — replace with the real ones from the owner.
// Photos: /public/images/menu/<id>.jpg — swap any file for a real photo of the same
// name (square, 1000px+) and nothing else changes.

export const WHATSAPP = "923167627433"; // TODO: owner's WhatsApp number (country code, no +)
export const FOODPANDA =
  "https://www.foodpanda.pk/restaurant/uj5m/smashed-bharia-enclave";
export const DELIVERY_FEE = 150;
export const MIN_ORDER = 500;

export const CATS = [
  { id: "beef", label: "Beef", emoji: "🍔" },
  { id: "chicken", label: "Chicken", emoji: "🍗" },
  { id: "sides", label: "Sides", emoji: "🍟" },
  { id: "deals", label: "Deals", emoji: "🔥" },
];
export const CATLABEL = {
  beef: "Beef",
  chicken: "Chicken",
  sides: "Sides",
  deals: "Deals",
};

const I = (id) => `/images/menu/${id}.jpg`;

export const MENU = [
  {
    id: "og-smashed",
    name: "OG Smashed",
    cat: "beef",
    price: 1620,
    tag: "Double stack. The one that started it.",
    heat: 1,
    sig: true,
    img: I("og-smashed"),
  },
  {
    id: "classic-beef",
    name: "Classic Beef Smashed",
    cat: "beef",
    price: 780,
    tag: "American cheese, house pickles, secret sauce.",
    heat: 1,
    bestseller: true,
    img: I("classic-beef"),
  },
  {
    id: "smokey-bbq",
    name: "Smokey BBQ Smashed",
    cat: "beef",
    price: 930,
    tag: "Chargrilled, hickory smoke, crispy onions.",
    heat: 1,
    img: I("smokey-bbq"),
  },
  {
    id: "shroom",
    name: "Shroom Smashed",
    cat: "beef",
    price: 960,
    tag: "Sautéed button mushrooms, Swiss, truffle mayo.",
    heat: 0,
    img: I("shroom"),
  },
  {
    id: "breakfast",
    name: "Breakfast Burger",
    cat: "beef",
    price: 930,
    tag: "Runny yolk, streaky beef, hash brown crown.",
    heat: 0,
    img: I("breakfast"),
  },
  {
    id: "grilled-chicken",
    name: "Grilled Chicken",
    cat: "chicken",
    price: 690,
    tag: "Marinated 24h, chargrilled, cool ranch.",
    heat: 0,
    bestseller: true,
    img: I("grilled-chicken"),
  },
  {
    id: "dynamite",
    name: "Dynamite Chicken",
    cat: "chicken",
    price: 810,
    tag: "Crispy tenders, dynamite sauce, slaw.",
    heat: 2,
    bestseller: true,
    img: I("dynamite"),
  },
  {
    id: "fiery",
    name: "Fiery Chicken",
    cat: "chicken",
    price: 900,
    tag: "Nashville-style, ghost pepper glaze.",
    heat: 3,
    sig: true,
    img: I("fiery"),
  },
  {
    id: "messy-mozz",
    name: "Messy Mozzarella",
    cat: "chicken",
    price: 1175,
    tag: "Fried mozzarella patty, marinara, basil.",
    heat: 0,
    img: I("messy-mozz"),
  },
  {
    id: "loaded-fries",
    name: "Dynamite Loaded Fries",
    cat: "sides",
    price: 850,
    tag: "Chicken, dynamite sauce, jalapeños.",
    heat: 2,
    bestseller: true,
    img: I("loaded-fries"),
  },
  {
    id: "plain-fries",
    name: "Plain Fries",
    cat: "sides",
    price: 350,
    tag: "Twice-cooked, sea salt.",
    heat: 0,
    bestseller: true,
    img: I("plain-fries"),
  },
  {
    id: "masala-fries",
    name: "Masala Fries",
    cat: "sides",
    price: 350,
    tag: "House chaat masala.",
    heat: 1,
    bestseller: true,
    img: I("masala-fries"),
  },
  {
    id: "onion-rings",
    name: "Onion Rings",
    cat: "sides",
    price: 450,
    tag: "Beer-battered, crackle crust.",
    heat: 0,
    img: I("onion-rings"),
  },
  {
    id: "mozz-sticks",
    name: "Mozzarella Sticks",
    cat: "sides",
    price: 800,
    tag: "Panko-fried, marinara dip.",
    heat: 0,
    img: I("mozz-sticks"),
  },
  {
    id: "tenders",
    name: "Chicken Tenders",
    cat: "sides",
    price: 820,
    tag: "5 pieces, choose a sauce.",
    heat: 0,
    img: I("tenders"),
  },
  {
    id: "deal-2",
    name: "Deal 2",
    cat: "deals",
    price: 3599,
    tag: "2 Classic Beef + 2 Jr. Dynamite + 6 Onion Rings + 2 Fries + 1.5L drink.",
    feeds: "Feeds 4",
    img: I("deal-2"),
  },
  {
    id: "dual-box",
    name: "Dual Box Deal",
    cat: "deals",
    price: 1899,
    tag: "Jr. Classic Beef + Jr. Dynamite + 3 Onion Rings + dip + fries + 350ml drink.",
    feeds: "For one hungry",
    img: I("dual-box"),
  },
  {
    id: "2for2",
    name: "2 For 2",
    cat: "deals",
    price: 2599,
    tag: "2 Dynamite Burgers + 6 Onion Rings + dip + two 350ml drinks.",
    feeds: "For two",
    img: I("2for2"),
  },
  {
    id: "munchie",
    name: "Smashed Munchie Box",
    cat: "deals",
    price: 1999,
    tag: "2 Tenders + 2 Mozz Sticks + 4 Onion Rings + dip + Jr. loaded fries + two 350ml drinks.",
    feeds: "Sides platter",
    img: I("munchie"),
  },
  {
    id: "big-bang",
    name: "Big Bang 6",
    cat: "deals",
    price: 7799,
    tag: "2 Grilled Chicken + 2 Dynamite + 2 Classic Beef + 4 Mozz Sticks + 6 Onion Rings + 2 Fries + 1.5L drink.",
    feeds: "Feeds the crew",
    img: I("big-bang"),
  },
];

// Customiser option groups (DEMO prices). type: "radio" | "check"
export function optionsFor(item) {
  if (item.cat === "beef" || item.cat === "chicken") {
    return [
      {
        id: "size",
        label: "Make it",
        type: "radio",
        required: true,
        choices: [
          { id: "single", label: "Regular", add: 0 },
          { id: "double", label: "Double patty", add: 350 },
        ],
      },
      {
        id: "meal",
        label: "Turn it into a meal",
        type: "radio",
        required: true,
        choices: [
          { id: "alone", label: "Burger only", add: 0 },
          { id: "meal", label: "+ Fries & 350ml drink", add: 450 },
        ],
      },
      {
        id: "extras",
        label: "Extras",
        type: "check",
        choices: [
          { id: "cheese", label: "Extra cheese", add: 80 },
          { id: "jalapeno", label: "Jalapeños", add: 50 },
          { id: "sauce", label: "Extra sauce", add: 60 },
          { id: "bacon", label: "Streaky bacon", add: 150 },
        ],
      },
    ];
  }
  if (item.cat === "sides") {
    return [
      {
        id: "size",
        label: "Size",
        type: "radio",
        required: true,
        choices: [
          { id: "reg", label: "Regular", add: 0 },
          { id: "large", label: "Large", add: 150 },
        ],
      },
      {
        id: "dip",
        label: "Dips",
        type: "check",
        choices: [
          { id: "dyn", label: "Dynamite dip", add: 70 },
          { id: "ranch", label: "Cool ranch", add: 70 },
          { id: "marinara", label: "Marinara", add: 70 },
        ],
      },
    ];
  }
  return [
    {
      id: "drink",
      label: "Swap the drink",
      type: "radio",
      required: true,
      choices: [
        { id: "cola", label: "Cola", add: 0 },
        { id: "lemon", label: "Lemon-lime", add: 0 },
        { id: "orange", label: "Orange", add: 0 },
      ],
    },
  ];
}

export const STEPS = [
  {
    n: "01",
    title: "A ball of beef",
    body: "Fresh, never frozen. Rolled by hand and dropped on a ripping-hot cast-iron plate.",
    img: "/images/menu/step-1.jpg",
  },
  {
    n: "02",
    title: "Smash. Hold. Flip.",
    body: "Pressed flat in seconds so the edges go lacy and crisp, caramelised in about 60 seconds.",
    img: "/images/menu/step-2.jpg",
  },
  {
    n: "03",
    title: "Stack it high",
    body: "Two patties, American cheese on the way down, sesame bun, house pickles. Served hot.",
    img: "/images/menu/step-3.jpg",
  },
];

export const QUOTES = [
  {
    name: "Usman",
    body: "The best burger place in Bahria Enclave. They know how to make really good beef burgers yet have the best prices.",
  },
  {
    name: "Hamza",
    body: "Dynamite burger was pretty good and fresh, the sauce with mozzarella sticks was yummy.",
  },
  {
    name: "Muhammad",
    body: "Everything I ever order from Smashed is always warm, fresh and delicious till doorstep.",
  },
  { name: "Ayesha", body: "Burgers are amazing." },
  {
    name: "Muhammad",
    body: "Food quality and taste both are amazing, keep it up.",
  },
  { name: "Muhammad", body: "Best as always." },
];

export function matches(it, q) {
  const extra = [];
  if (it.heat >= 2) extra.push("spicy hot fiery");
  if (it.heat === 0 && it.cat !== "deals") extra.push("mild");
  if (it.bestseller) extra.push("bestseller popular");
  if (it.sig) extra.push("signature");
  const h = (
    it.name +
    " " +
    it.tag +
    " " +
    CATLABEL[it.cat] +
    " " +
    extra.join(" ")
  ).toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((t) => h.includes(t));
}

export const fmt = (n) => "Rs. " + Math.round(n).toLocaleString("en-US");
