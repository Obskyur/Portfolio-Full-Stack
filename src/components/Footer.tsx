import React from "react";
import "@/styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        &copy; {new Date().getFullYear()} - Tristan Miller
      </p>
    </footer>
  );
}