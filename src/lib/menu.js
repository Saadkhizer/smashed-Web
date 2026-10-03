// Real menu pulled from SMASHED's foodpanda listing (Bahria Enclave)
// Deal compositions verified against foodpanda. `bestseller` flags come from
// foodpanda's "popular" section. Photos come from SMASHED's Facebook page —
// sides & deals w/o dedicated shots render a designed gradient tile instead.

export const CATEGORIES = [
  { id: "beef", label: "Beef" },
  { id: "chicken", label: "Chicken" },
  { id: "sides", label: "Sides" },
  { id: "deals", label: "Deals" },
];

export const MENU = [
  // BEEF
  { id: "og-smashed", name: "OG Smashed", short: "OG SMASHED", category: "beef", price: 1620, tagline: "Double stack. The one that started it.", stack: "Double patty · Triple cheese", heat: 1, signature: true, img: "/images/og-smashed.jpg" },
  { id: "classic-beef", name: "Classic Beef Smashed", short: "CLASSIC", category: "beef", price: 780, tagline: "American cheese, house pickles, secret sauce.", stack: "Single patty · House sauce", heat: 1, bestseller: true, img: "/images/classic-beef.jpg" },
  { id: "smokey-bbq", name: "Smokey BBQ Smashed", short: "SMOKEY", category: "beef", price: 930, tagline: "Chargrilled, hickory smoke, crispy onions.", stack: "Hickory glaze · Onion crisp", heat: 1, img: "/images/smokey-bbq.jpg" },
  { id: "shroom", name: "Shroom Smashed", short: "SHROOM", category: "beef", price: 960, tagline: "Sautéed button mushrooms, Swiss, truffle mayo.", stack: "Mushroom · Truffle mayo", heat: 0, img: "/images/shroom.jpg" },
  { id: "breakfast", name: "Breakfast Burger", short: "AM SHIFT", category: "beef", price: 930, tagline: "Runny yolk, streaky beef, hash brown crown.", stack: "Yolk · Bacon · Hash", heat: 0, img: "/images/breakfast.jpg" },

  // CHICKEN
  { id: "grilled-chicken", name: "Grilled Chicken", short: "GRILLED", category: "chicken", price: 690, tagline: "Marinated 24h, chargrilled, cool ranch.", stack: "24h marinate · Cool ranch", heat: 0, bestseller: true, img: "/images/grilled-chicken.jpg" },
  { id: "dynamite", name: "Dynamite Chicken", short: "DYNAMITE", category: "chicken", price: 810, tagline: "Crispy tenders, dynamite sauce, slaw.", stack: "Crispy · Slaw", heat: 2, bestseller: true, img: "/images/dynamite.jpg" },
  { id: "fiery", name: "Fiery Chicken", short: "FIERY", category: "chicken", price: 900, tagline: "Nashville-style, ghost pepper glaze.", stack: "Ghost pepper glaze", heat: 3, signature: true, img: "/images/fiery.jpg" },
  { id: "messy-mozzarella", name: "Messy Mozzarella", short: "MESSY MOZZ", category: "chicken", price: 1175, tagline: "Fried mozzarella patty, marinara, basil.", stack: "Mozz patty · Marinara", heat: 0, img: "/images/messy-mozz.jpg" },

  // SIDES (bestsellers first)
  { id: "loaded-fries", name: "Dynamite Loaded Fries", short: "LOADED", category: "sides", price: 850, tagline: "Chicken, dynamite sauce, jalapeños.", stack: "Chicken · Jalapeño", bestseller: true, tile: "tile-fries-loaded" },
  { id: "plain-fries", name: "Plain Fries", short: "FRIES", category: "sides", price: 350, tagline: "Twice-cooked, sea salt.", stack: "Twice-cooked", bestseller: true, tile: "tile-fries-plain" },
  { id: "masala-fries", name: "Masala Fries", short: "MASALA", category: "sides", price: 350, tagline: "House chaat masala.", stack: "Chaat masala", bestseller: true, tile: "tile-fries-masala" },
  { id: "onion-rings", name: "Onion Rings", short: "RINGS", category: "sides", price: 450, tagline: "Beer-battered, crackle crust.", stack: "Beer batter", tile: "tile-onion" },
  { id: "mozz-sticks", name: "Mozzarella Sticks", short: "MOZZ STICKS", category: "sides", price: 800, tagline: "Panko-fried, marinara dip.", stack: "Panko · Marinara", tile: "tile-mozz-sticks" },
  { id: "tenders", name: "Chicken Tenders", short: "TENDERS", category: "sides", price: 820, tagline: "5 pieces, choose a sauce.", stack: "5 pieces · Choose sauce", tile: "tile-tenders" },

  // DEALS (real compositions from foodpanda)
  { id: "deal-2", name: "Deal 2", short: "DEAL 2", category: "deals", price: 3599, tagline: "2 Classic Beef + 2 Jr. Dynamite + 6 Onion Rings + 2 Fries + 1.5L drink.", stack: "Feeds four · Rs. 3,599", img: "/images/deal-2.jpg" },
  { id: "dual-box", name: "Dual Box Deal", short: "DUAL BOX", category: "deals", price: 1899, tagline: "Jr. Classic Beef + Jr. Dynamite + 3 Onion Rings + dip + fries + 350ml drink.", stack: "For one hungry · Rs. 1,899", tile: "tile-deal" },
  { id: "2for2", name: "2 For 2", short: "2 FOR 2", category: "deals", price: 2599, tagline: "2 Dynamite Burgers + 6 Onion Rings + dip + two 350ml drinks.", stack: "For two · Rs. 2,599", tile: "tile-deal" },
  { id: "munchie", name: "Smashed Munchie Box", short: "MUNCHIE", category: "deals", price: 1999, tagline: "2 Tenders + 2 Mozz Sticks + 4 Onion Rings + dip + Jr. loaded fries + two 350ml drinks.", stack: "Sides platter · Rs. 1,999", tile: "tile-deal" },
  { id: "big-bang", name: "Big Bang 6", short: "BIG BANG", category: "deals", price: 7799, tagline: "2 Grilled Chicken + 2 Dynamite + 2 Classic Beef + 4 Mozz Sticks + 6 Onion Rings + 2 Fries + 1.5L drink.", stack: "Feeds the crew · Rs. 7,799", tile: "tile-deal" },
];

export const SAUCES = ["BBQ", "Dynamite", "Fiery", "Garlic Herb"];

// Real customer testimonials pulled from foodpanda reviews (4.9 / 100+ reviews)
export const TESTIMONIALS = [
  { name: "Usman", stars: 5, body: "The best burger place in Bahria Enclave. They know how to make really good beef burgers yet have the best prices." },
  { name: "Hamza", stars: 5, body: "Dynamite burger was pretty good and fresh, the sauce with mozzarella sticks was yummy." },
  { name: "Muhammad", stars: 5, body: "Everything I ever order from Smashed is always warm, fresh and delicious till doorstep." },
  { name: "Ayesha", stars: 5, body: "Burgers are amazing." },
  { name: "Muhammad", stars: 5, body: "Food quality and taste both are amazing, keep it up." },
  { name: "Muhammad", stars: 5, body: "Best as always." },
];
