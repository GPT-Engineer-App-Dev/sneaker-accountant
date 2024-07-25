import { Home, DollarSign } from "lucide-react";
import Index from "./pages/Index.jsx";
import SneakerAccounting from "./pages/SneakerAccounting.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Sneaker Accounting",
    to: "/sneaker-accounting",
    icon: <DollarSign className="h-4 w-4" />,
    page: <SneakerAccounting />,
  },
];
