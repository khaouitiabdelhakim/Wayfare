import { Menu } from "@/models/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Tableau de bord",
    path: "/admin",
    newTab: false,
  },
  {
    id: 2,
    title: "Utilisateurs",
    path: "/admin/users",
    newTab: false,
  },
  {
    id: 3,
    title: "Bus",
    path: "/admin/bus",
    newTab: false,
  },
  {
    id: 4,
    title: "Lignes",
    path: "/admin/lines",
    newTab: false,
  }
];
export default menuData;
