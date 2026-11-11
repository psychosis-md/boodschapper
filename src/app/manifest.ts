import type { MetadataRoute } from "next";

// Makes the web app installable on a phone's home screen (PWA). There are no
// native apps.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Boodschapper",
    short_name: "Boodschapper",
    description:
      "Compare grocery prices across stores and shop smarter on a student budget.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffbf6",
    theme_color: "#fffbf6",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
