import { Menu } from "@/models/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Principale",
    path: "/main",
    newTab: false,
  },
  {
    id: 2,
    title: "Réservez",
    path: "/main/reservation",
    newTab: false,
  },
  {
    id: 3,
    title: "À Propos",
    path: "/main/about",
    newTab: false,
  },
  {
    id: 4,
    title: "Services",
    path: "/main/services",
    newTab: false,
  },
  {
    id: 5,
    title: "Contact",
    path: "/main/contact",
    newTab: false,
  },
];

export default menuData;