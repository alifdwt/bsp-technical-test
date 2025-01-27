export const products = [
  {
    title: "Kebakaran",
    href: "/product/fire",
  },
  {
    title: "Gempa Bumi",
    href: "/product/earthquake",
  },
  {
    title: "Kendaraan Bermotor",
    href: "/product/vehicle",
  },
  {
    title: "Kecelakaan Diri",
    href: "/product/personal-accident",
  },
  {
    title: "Kesehatan",
    href: "/product/health",
  },
];

export type TProduct = (typeof products)[number];
