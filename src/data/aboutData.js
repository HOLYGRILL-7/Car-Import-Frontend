export const navItems = [
  { path: "/about", label: "About Us" },
  { path: "/about/team", label: "Our Team" },
  { path: "/about/press", label: "Press & Media" },
];

export const aboutHeader = {
  title: "ABOUT US",
  subtitle: "Learn more about our company and mission.",
};

export const ctaSection = {
  title: "Ready to Start Your Journey?",
  subtitle: "Let us help you source and import your dream vehicle today",
  buttons: [
    { text: "Get Started", path: "/usedCars", primary: true },
    { text: "Contact Us", path: "/contact", primary: false },
  ],
};

export const ABOUT_CONTENT = {
  hero: {
    title: "SOURCING AND IMPORTING HAS",
    subtitle: "NEVER BEEN THIS EASY",
  },
  sections: [
    {
      id: "story",
      title: "OUR STORY",
      borderColor: "border-accent",
      content:
        "Xtra Motors is a family-run used car import and sales business based in Achimota, Accra, Ghana. With more than 10 years of experience, we focus on importing, selling and servicing quality used vehicles for customers in Ghana.",
    },
    {
      id: "what-we-do",
      title: "WHAT WE DO",
      borderColor: "border-secondary",
      content:
        "We import and sell used vehicles, and we can source a specific car for you on request. We also look after the vehicles we sell: our in-house garage and mechanics handle servicing and maintenance. And when we ship a vehicle, its container sometimes has room to spare, which we offer for household goods such as furniture and mattresses. It's a small, hands-on business, and we keep our services focused on what we know.",
    },
    {
      id: "passion",
      title: "PASSIONATE ABOUT CARS?",
      borderColor: "border-accent",
      content:
        "We're always open to hearing from people who share our passion for cars and customer service.",
    },
  ],
  // Replaces the old "Our Investors" section (fake investor logos and a "backed
  // by leading venture capital firms" claim, none of it true).
  invest: {
    heading: "Interested in investing in Xtra Motors?",
    description: "We'd love to talk.",
    buttonText: "Contact Us",
    buttonPath: "/contact",
  },
};
