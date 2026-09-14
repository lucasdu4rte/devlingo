import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "devlingo",
    short_name: "devlingo",
    description: "Learn React one lesson at a time and ace tech interviews.",
    start_url: "/",
    display: "standalone",
    background_color: "#0f1117",
    theme_color: "#8b7cff",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
