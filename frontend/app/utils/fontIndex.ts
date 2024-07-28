import { Lato, Nunito_Sans, Roboto } from "next/font/google";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
});

export { lato, nunitoSans, roboto };
