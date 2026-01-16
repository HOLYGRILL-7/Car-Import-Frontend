import CEO from "../assets/Team/CEO.jpg";
import COO from "../assets/Team/COO.jpg";
import LOG from "../assets/Team/LOG.jpg";
import news1 from "../assets/News/world-trade.jpg";
import fleet from "../assets/News/fleet.jpg";
import AI from "../assets/News/AI.jpg";
import EV from "../assets/News/EV.jpg";
import JAP from "../assets/News/JAP.jpg";
import HAP from "../assets/News/happy.jpg";

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
          "Promoted to CEO in 2023, Bismark brings over 15 years of experience in international automotive trade and logistics. His vision has transformed the company into a global leader.",
        linkedin: "", // Add if available
        email: "", // Add if available
      },
      {
        id: "coo-jr-bismark-jones-oduro",
        name: "Jr. Bismark Jones-Oduro",
        position: "Chief Operations Officer",
        image: COO,
        imageAlt: "Jr. Bismark Jones-Oduro, Chief Operations Officer",
        description:
          "Leading our day-to-day operations with excellence, ensuring seamless service delivery across all departments and maintaining our high standards.",
        linkedin: "",
        email: "",
      },
      {
        id: "log-bernice-jones-oduro",
        name: "Bernice Jones-Oduro",
        position: "Head of Logistics",
        image: LOG,
        imageAlt: "Bernice Jones-Oduro, Head of Logistics",
        description:
          "Manages our global shipping network and customs operations, ensuring vehicles and cargo reach clients on time, every time.",
        linkedin: "",
        email: "",
      },
    ],
  },
  joinTeam: {
    title: "Want to Join Our Team?",
    description:
      "We're always looking for talented individuals who are passionate about excellence and innovation.",
    buttonText: "View Open Positions",
    buttonLink: "/careers",
  },
};

export const PRESS_CONTENT = {
  header: {
    title: "PRESS & MEDIA",
    subtitle: "Latest news, press releases, and media coverage about CarWise",
  },
  newsItems: [
    {
      id: "expansion-2025",
      image: news1,
      imageAlt: "Global trade and international expansion",
      title: "CarWise Expands Operations to Three New Countries",
      date: "2025-11-20",
      displayDate: "November 20, 2025",
      excerpt:
        "Breaking into European and Asian markets with new partnerships...",
      source: "Auto Trade Journal",
      link: "/press/expansion-2025", // Add actual links
    },
    {
      id: "record-year-2025",
      image: fleet,
      imageAlt: "Fleet of delivered vehicles",
      title: "Record-Breaking Year: 10,000+ Vehicles Delivered",
      date: "2025-11-15",
      displayDate: "November 15, 2025",
      excerpt: "Celebrating our biggest year yet with unprecedented growth...",
      source: "Business Daily",
      link: "/press/record-year-2025",
    },
    {
      id: "ai-launch-2025",
      image: AI,
      imageAlt: "AI technology interface",
      title: "CarWise Launches AI-Powered Vehicle Sourcing",
      date: "2025-11-10",
      displayDate: "November 10, 2025",
      excerpt:
        "New technology platform makes importing cars easier than ever...",
      source: "Tech Automotive",
      link: "/press/ai-launch-2025",
    },
    {
      id: "carbon-neutral-2025",
      image: EV,
      imageAlt: "Electric vehicle and sustainability",
      title: "Sustainability Initiative: Going Carbon Neutral by 2026",
      date: "2025-10-28",
      displayDate: "October 28, 2025",
      excerpt:
        "Our commitment to environmental responsibility and green logistics...",
      source: "Green Business News",
      link: "/press/carbon-neutral-2025",
    },
    {
      id: "japan-partnership-2025",
      image: JAP,
      imageAlt: "Japanese automotive partnership",
      title: "Partnership with Major Japanese Dealers Announced",
      date: "2025-10-15",
      displayDate: "October 15, 2025",
      excerpt: "Exclusive access to JDM vehicles for our customers...",
      source: "Import Car Magazine",
      link: "/press/japan-partnership-2025",
    },
    {
      id: "satisfaction-rating-2025",
      image: HAP,
      imageAlt: "Happy customer with vehicle",
      title: "Customer Satisfaction Rate Hits 98%",
      date: "2025-10-05",
      displayDate: "October 5, 2025",
      excerpt: "Independent survey ranks CarWise as top automotive importer...",
      source: "Consumer Reports",
      link: "/press/satisfaction-rating-2025",
    },
  ],
  mediaContact: {
    title: "Media Inquiries",
    description:
      "For press inquiries, interviews, or media kits, please contact our communications team.",
    email: "press@carwise.com",
    mediaKitUrl: "/media-kit.pdf",
  },
  viewAllButton: {
    text: "View All Press Releases",
    link: "/press/all",
  },
};
