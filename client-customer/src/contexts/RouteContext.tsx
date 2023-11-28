/* eslint-disable react-refresh/only-export-components */
import { createContext, ReactNode } from "react";
import { useStickyState } from "../hooks/useStickyState";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RoutesContext = createContext<unknown>(null);

type IProps = {
  children: ReactNode;
};

const navbarFeatures = [
  {
    name: "New & Features",
    features: [
      {
        name: "New Arrivals",
        description: "New Arrivals",
        href: "/nike/new-arrivals",
      },
      {
        name: "Bestsellers",
        description: "Bestsellers",
        href: "/nike/best-sellers",
      },
    ],
  },
  {
    name: "Shop Icons",
    features: [
      {
        name: "Air Force 1",
        description: "Nike Air Force 1",
        href: "/nike/icons-air-force-1",
      },
      {
        name: "Air Jordan 1",
        description: "Jordan 1 Shoes",
        href: "/nike/icons-jordan-1",
      },
      {
        name: "Air Max",
        description: "Air Max Shoes",
        href: "/nike/icons-air-max",
      },
      {
        name: "Dunk",
        description: "Nike Dunk Shoes",
        href: "/nike/icons-dunk",
      },
    ],
  },
  {
    name: "Men",
    features: [
      {
        name: "Men's Lifestyle",
        description: "Men's Lifestyle",
        href: "/nike/mens-lifestyle",
      },
      {
        name: "All Shoes",
        description: "Men's Shoes",
        href: "/nike/mens-shoes",
      },
    ],
  },
  {
    name: "Women",
    features: [
      {
        name: "Women's Lifestyle",
        description: "Women's Lifestyle",
        href: "/nike/womens-lifestyle",
      },
      {
        name: "All Shoes",
        description: "Women's Shoes",
        href: "/nike/womens-shoes",
      },
    ],
  },
  {
    name: "Sale",
    features: [
      {
        name: "Men's Sale",
        description: "Men's Sale",
        href: "/nike/mens-sale",
      },
      {
        name: "Women's Sale",
        description: "Women's Sale",
        href: "/nike/womens-sale",
      },
    ],
  },
];

const sortOptions = [
  { name: "Most Popular", href: "/nike/best-sellers", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "/nike/new-arrivals", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];
const subCategories = [
  { name: "Nike Air Force 1", href: "/nike/icons-air-force-1" },
  { name: "Jordan 1 Shoes", href: "/nike/icons-jordan-1" },
  { name: "Air Max Shoes", href: "/nike/icons-air-max" },
  { name: "Nike Dunk Shoes", href: "/nike/icons-dunk" },
];
const filters = [
  {
    id: "sex",
    name: "Sex",
    options: [
      { value: "men", label: "Men", checked: true },
      { value: "women", label: "Women", checked: false },
    ],
  },
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "best-seller", label: "Bestsellers", checked: true },
      { value: "shop-icons", label: "Shop Icons", checked: false },
      { value: "sale", label: "Sale", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "1", label: "EU 36", checked: true },
      { value: "2", label: "EU 36.5", checked: false },
      { value: "3", label: "EU 37.5", checked: false },
      { value: "4", label: "EU 38", checked: false },
      { value: "5", label: "EU 38.5", checked: false },
      { value: "6", label: "EU 39", checked: false },
    ],
  },
];

const RoutesProvider: React.FC<IProps> = ({ children }) => {
  const [currentPage, setCurrentPage] = useStickyState("home", "current_page");

  // const navigate = useNavigate();

  // useEffect(() => {
  //   navigate(`${currentPage}`);
  // }, []);

  return (
    <RoutesContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </RoutesContext.Provider>
  );
};

export {
  RoutesProvider,
  RoutesContext,
  navbarFeatures,
  sortOptions,
  subCategories,
  filters,
};
