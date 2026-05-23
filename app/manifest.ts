import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jonathan Rodríguez López — Full Stack Developer",
    short_name: "Jonathan Portfolio",
    description:
      "Portfolio of Jonathan Rodríguez López — Full Stack Developer specialized in React, Node.js, Python and Web3.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#f1ebe1",
    theme_color: "#f1ebe1",
    lang: "es",
    dir: "ltr",
    categories: ["portfolio", "developer", "technology"],
    icons: [
      {
        src: "/favicon.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
    screenshots: [
      {
        src: "/og-image.jpg",
        sizes: "1200x630",
        type: "image/jpeg",
        form_factor: "wide",
        label: "Jonathan Rodríguez López — Portfolio homepage",
      },
    ],
  };
}
