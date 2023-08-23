"use client";

import { Footer } from "flowbite-react";

export default function DefaultFooter() {
  return (
    <Footer container className="font-Raleway">
      <Footer.Copyright by="¨PomodoroKai" href="#" year={2023} />
      <Footer.LinkGroup>
        <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}
