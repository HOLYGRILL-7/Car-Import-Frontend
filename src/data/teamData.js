import CEO from "../assets/Team/CEO.jpg";
import COO from "../assets/Team/COO.jpg";
import LOG from "../assets/Team/LOG.jpg";
// Used only by the press items that are commented out below:
// import news1 from "../assets/News/world-trade.jpg";
// import fleet from "../assets/News/fleet.jpg";
// import AI from "../assets/News/AI.jpg";
// import EV from "../assets/News/EV.jpg";
// import JAP from "../assets/News/JAP.jpg";
// import HAP from "../assets/News/happy.jpg";

export const TEAM_CONTENT = {
  header: {
    title: "OUR TEAM",
    subtitle: "Meet the passionate professionals driving our mission forward",
  },
  leadership: {
    heading: "Leadership Team",
    members: [
      {
        id: "ceo-bismark-jones-oduro",
        name: "Bismark Jones Oduro",
        position: "CEO & Founder",
        image: CEO,
        imageAlt: "Bismark Jones Oduro, CEO & Founder",
        description:
          "Bismark founded Xtra Motors and leads the business. He brings 10+ years of experience importing and selling used vehicles in Ghana.",
        linkedin: "", // Add if available
        email: "", // Add if available
      },
      {
        id: "digital-jr-bismark-jones-oduro",
        name: "Jr. Bismark Jones-Oduro",
        position: "Digital Operations & Marketing",
        image: COO,
        imageAlt: "Jr. Bismark Jones-Oduro, Digital Operations & Marketing",
        description:
          "Builds and maintains the Xtra Motors website, photographs our inventory, and runs our social media presence.",
        linkedin: "",
        email: "",
      },
      {
        id: "hr-bernice-jones-oduro",
        name: "Bernice Jones-Oduro",
        position: "HR Manager",
        image: LOG,
        imageAlt: "Bernice Jones-Oduro, HR Manager",
        description:
          "Bernice is our HR Manager. She also works as a tax auditor.",
        linkedin: "",
        email: "",
      },
    ],
  },
  // COMMENTED OUT: the "Want to Join Our Team?" section (see Team.jsx). Uncomment
  // both together if the business starts hiring.
  // joinTeam: {
  //   title: "Want to Join Our Team?",
  //   description:
  //     "We're always looking for talented individuals who are passionate about excellence and innovation.",
  //   buttonText: "View Open Positions",
  //   buttonLink: "/careers",
  // },
};

export const PRESS_CONTENT = {
  header: {
    title: "PRESS & MEDIA",
    subtitle: "Latest news, press releases, and media coverage about Xtra Motors",
  },
  // COMMENTED OUT: everything below is placeholder content (invented articles,
  // outlets, dates and a press@carwise.com address), not real press coverage.
  // Kept here so it's easy to reinstate real items in the same shape later.
  // newsItems: [
  //   {
  //     id: "expansion-2025",
  //     image: news1,
  //     imageAlt: "Global trade and international expansion",
  //     title: "Xtra Motors Expands Operations to Three New Countries",
  //     date: "2025-11-20",
  //     displayDate: "November 20, 2025",
  //     excerpt:
  //       "Breaking into European and Asian markets with new partnerships...",
  //     source: "Auto Trade Journal",
  //     link: "/press/expansion-2025", // Add actual links
  //   },
  //   {
  //     id: "record-year-2025",
  //     image: fleet,
  //     imageAlt: "Fleet of delivered vehicles",
  //     title: "Record-Breaking Year: 10,000+ Vehicles Delivered",
  //     date: "2025-11-15",
  //     displayDate: "November 15, 2025",
  //     excerpt: "Celebrating our biggest year yet with unprecedented growth...",
  //     source: "Business Daily",
  //     link: "/press/record-year-2025",
  //   },
  //   {
  //     id: "ai-launch-2025",
  //     image: AI,
  //     imageAlt: "AI technology interface",
  //     title: "Xtra Motors Launches AI-Powered Vehicle Sourcing",
  //     date: "2025-11-10",
  //     displayDate: "November 10, 2025",
  //     excerpt:
  //       "New technology platform makes importing cars easier than ever...",
  //     source: "Tech Automotive",
  //     link: "/press/ai-launch-2025",
  //   },
  //   {
  //     id: "carbon-neutral-2025",
  //     image: EV,
  //     imageAlt: "Electric vehicle and sustainability",
  //     title: "Sustainability Initiative: Going Carbon Neutral by 2026",
  //     date: "2025-10-28",
  //     displayDate: "October 28, 2025",
  //     excerpt:
  //       "Our commitment to environmental responsibility and green logistics...",
  //     source: "Green Business News",
  //     link: "/press/carbon-neutral-2025",
  //   },
  //   {
  //     id: "japan-partnership-2025",
  //     image: JAP,
  //     imageAlt: "Japanese automotive partnership",
  //     title: "Partnership with Major Japanese Dealers Announced",
  //     date: "2025-10-15",
  //     displayDate: "October 15, 2025",
  //     excerpt: "Exclusive access to JDM vehicles for our customers...",
  //     source: "Import Car Magazine",
  //     link: "/press/japan-partnership-2025",
  //   },
  //   {
  //     id: "satisfaction-rating-2025",
  //     image: HAP,
  //     imageAlt: "Happy customer with vehicle",
  //     title: "Customer Satisfaction Rate Hits 98%",
  //     date: "2025-10-05",
  //     displayDate: "October 5, 2025",
  //     excerpt: "Independent survey ranks Xtra Motors as top automotive importer...",
  //     source: "Consumer Reports",
  //     link: "/press/satisfaction-rating-2025",
  //   },
  // ],
  // mediaContact: {
  //   title: "Media Inquiries",
  //   description:
  //     "For press inquiries, interviews, or media kits, please contact our communications team.",
  //   email: "press@carwise.com",
  //   mediaKitUrl: "/media-kit.pdf",
  // },
  // viewAllButton: {
  //   text: "View All Press Releases",
  //   link: "/press/all",
  // },
  // };
};
