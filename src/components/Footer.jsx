import React from "react";
import { footerLinks } from "../constants";

const Footer = () => {
  return (
    <footer className="py-5 sm:px-10 px-5">
      <div className="screen-max-width">
        <div className="">
          <p className="font-semibold text-gray-500 text-xs">
            Mores ways to Contact me:
            <a
              href="https://roshanshrestha.vercel.app/"
              className="underline text-blue-500"
            >
              {" "}
              Find my Portfoli{" "}
            </a>
            or Whatsapp
            {" : "}
            <span className="underline text-blue-500">977-9703299634</span> Me.
          </p>
          <p className="font-semibold text-gray-500 text-xs">
            else you can call{" "}
            <span className="underline text-blue-500">977-9807960410</span>
          </p>
        </div>

        <div className="bg-neutral-700 my-5 h-[1px] w-full"></div>
        <div className="flex md:flex-row flex-col md:items-center justify-between">
          <p className="font-semibold text-gray-500 text-xs">
            Coyright @ 2024 Roshan Shrestha. All rights reserved.
          </p>
          <div className="flex gap-2">
            {footerLinks.map((links, i) => (
              <p key={links} className="font-semibold text-gray-500 text-xs">
                {links}{" "}
                {i !== links.length - 1 && <span className="mx-2"> | </span>}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
