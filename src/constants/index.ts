import { Clock, Cloud, Star, Tablet, Trash } from "lucide-react";

export const sidebarLinks = [
  {
    label: "My Drive",
    icon: Tablet,
    path: "/",
  },
  {
    label: "Starred",
    icon: Star,
    path: "/starred",
  },
  {
    label: "Recent",
    icon: Clock,
    path: "/recent",
  },
  {
    label: "Trash",
    icon: Trash,
    path: "/trash",
  },
  {
    label: "Storage",
    icon: Cloud,
    path: "/storage",
  },
];
