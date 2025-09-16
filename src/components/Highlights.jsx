import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import { rightImg, watchImg } from "../utils";
import VideoCarousel from "./VideoCarousel";

const Highlights = () => {
  useGSAP(() => {
    const anitime = gsap.timeline();
    anitime.to("#title", {
      opacity: 1,
      y: 0,
    });
    anitime.to(".link", { opacity: 1, y: 0, stagger: 0.1, duration: 1 });
  }, []);
  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden  sm:py-32 py-20 sm:px-10 px-10 bg-zinc-950"
    >
      <div className="screen-max-width ">
        <div className="mb-12 w-full md:flex items-end justify-between ">
          <h1
            id="title"
            className="text-gray-400 lg:text-6xl md:text-5xl text-3xl lg:mb-0 mb-5 font-medium opacity-0 translate-y-20"
          >
            Get the highlights.
          </h1>
          <div className="flex flex-wrap items-end gap-5">
            <p className="link text-blue-400 hover:underline cursor-pointer flex items-center text-[18px] lg:text-xl opacity-0 translate-y-20">
              Watch the flim
              <img src={watchImg} alt="watch" className="ml-2" />
            </p>
            <p className="link text-blue-400 hover:underline cursor-pointer flex items-center text-[18px] lg:text-xl opacity-0 translate-y-20">
              Watch the event
              <img src={rightImg} alt="event" className="ml-2" />
            </p>
          </div>
        </div>
        {/* Custom Carousel */}
        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
