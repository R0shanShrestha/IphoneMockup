import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useState } from "react";
import { heroVideo, smallHeroVideo } from "../utils";

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(
    window.innerWidth < 760 ? smallHeroVideo : heroVideo
  );

  const handlerVideo = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handlerVideo);
    return () => {
      window.removeEventListener("resize", handlerVideo);
    };
  }, []);
  useGSAP(() => {
    const tl = gsap.timeline()
    tl.to("#hero", {
      opacity: 1,
      y: -10,
      delay: 1.5,
      ease:"power1.in"
    });
    tl.to("#cta", {
      opacity: 1,
      y: -50,
      delay: 0.5,
    });
  }, []);
  return (
    <section className="w-full bg-black  relative h-[calc(100vh-60px)]  ">
      <div className="min-h-5/6 w-full flex flex-col items-center  justify-center">
        <p
          id="hero"
          className="text-center font-semibold text-3xl text-gray-100 opacity-0 max-md:mb-10"
        >
          <i>IPhone 15 Pro</i>
        </p>
        <div className="md:10/12 w-9/12">
          <video
            className="pointer-events-none "
            src={videoSrc}
            playsInline={true}
            autoPlay
            muted
            key={videoSrc}
          />
        </div>
      </div>

      <div
        id="cta"
        className="flex flex-col items-center opacity-0 translate-y-20  "
      >
        <a
          href="#higlights"
          className="px-5 py-2  rounded-3xl bg-blue-400 my-5 hover:bg-transparent border border-transparent hover:border hover:text-blue-400 hover:border-blue-400
 "
        >
          Buy
        </a>
        <p className="font-normal text-[18px] md:text-xl">
          From $199/months or $999
        </p>
      </div>
    </section>
  );
};

export default Hero;
