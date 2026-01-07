"use client";

import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Navbar() {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
      </div>
    </>
  );
}
