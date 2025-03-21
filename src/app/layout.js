import { PT_Serif } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

const ptSerif = PT_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Tristan's Portfolio",
  description: "A record of my work and projects as a software engineer.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${ptSerif.className}`}>
        <NavBar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
