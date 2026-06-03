export type Property = {
  id: string;
  video: string;
  title: string;
  location: string;
  size: string;
  type: string;
  description: string;
  tone: string;
  reveal: "clip" | "curtain" | "stagger" | "slide" | "scale";
};

export const properties: Property[] = [
  {
    id: "01",
    video: "/videos/home-1.mp4",
    title: "Modern Minimalist Villa",
    location: "Malibu Hills",
    size: "8,400 sq ft",
    type: "Private Residence",
    description:
      "A calm architectural escape defined by open spaces, warm materials, and panoramic views.",
    tone: "Warm concrete, sea air, and quiet horizontal lines.",
    reveal: "clip"
  },
  {
    id: "02",
    video: "/videos/home-2.mp4",
    title: "Glass Pavilion Estate",
    location: "Beverly Crest",
    size: "11,200 sq ft",
    type: "Hillside Estate",
    description:
      "A luminous residence where floor-to-ceiling glass dissolves the edge between interior and sky.",
    tone: "Transparent volumes suspended above the city lights.",
    reveal: "curtain"
  },
  {
    id: "03",
    video: "/videos/home-3.mp4",
    title: "Stone Courtyard House",
    location: "Palm Springs",
    size: "6,950 sq ft",
    type: "Desert Retreat",
    description:
      "A sheltered modern retreat arranged around water, shadow, and sculptural stone planes.",
    tone: "Desert quiet with cinematic mid-century restraint.",
    reveal: "stagger"
  },
  {
    id: "04",
    video: "/videos/home-4.mp4",
    title: "Skyline Penthouse",
    location: "Manhattan West",
    size: "5,300 sq ft",
    type: "Private Penthouse",
    description:
      "A high-altitude residence composed for skyline drama, soft reflection, and late-night entertaining.",
    tone: "City glass, graphite metal, and precise evening light.",
    reveal: "slide"
  },
  {
    id: "05",
    video: "/videos/home-5.mp4",
    title: "Coastal Gallery Home",
    location: "Montecito Coast",
    size: "9,100 sq ft",
    type: "Collector Residence",
    description:
      "An artful coastal home shaped as a sequence of galleries, terraces, and horizon-facing rooms.",
    tone: "Soft limestone, framed views, and gallery-like calm.",
    reveal: "scale"
  }
];
