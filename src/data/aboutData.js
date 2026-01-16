import Bendub from "../assets/Logo/Bendub-noBg.png";

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
    { text: "Get Started", path: "/newArrivals", primary: true },
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
        "What started as a simple idea in a small garage has grown into a leading international automotive sourcing and logistics company. Founded by passionate car enthusiasts who struggled with the complexities of importing vehicles, we set out to revolutionize the industry. Today, we've helped thousands of clients find and import their dream vehicles from around the globe, making the impossible possible with our streamlined process and dedicated team.",
    },
    {
      id: "group",
      title: "CARWISE GROUP",
      borderColor: "border-secondary",
      content:
        "Our group has expanded beyond just vehicle imports. We now offer comprehensive automotive solutions including general cargo shipping, maintenance services, and logistics consulting. With operations spanning three continents and partnerships with over 500 dealers worldwide, CarWise Group has become a trusted name in international automotive trade. Our commitment to transparency, efficiency, and customer satisfaction drives everything we do.",
    },
    {
      id: "join",
      title: "JOIN US",
      borderColor: "border-accent",
      content:
        "We have one of the most dynamic and passionate teams in the automotive industry. From sourcing specialists to logistics coordinators, customs experts to customer service representatives—every team member is dedicated to making your experience seamless. We're always looking for talented individuals who share our vision of making global automotive trade accessible to everyone. If you're passionate about cars and customer excellence, we'd love to hear from you.",
    },
  ],
  investors: {
    heading: "OUR INVESTORS",
    description:
      "Backed by leading venture capital firms and strategic partners who believe in our mission",
    list: [
      {
        id: "bendub-1",
        name: "Bendub Capital",
        logo: Bendub, // Replace with actual import path
        description: "Strategic automotive investment partner",
      },
      {
        id: "bendub-2",
        name: "Bendub Ventures",
        logo: Bendub, // Replace with actual import path
        description: "Global logistics innovation fund",
      },
    ],
  },
  cta: {
    enabled: false, // Set to true when ready to display
    title: "Ready to Start Your Journey?",
    description: "Let us help you source and import your dream vehicle today",
    buttonText: "Get Started",
    buttonAction: "/contact", // or callback function
  },
};
