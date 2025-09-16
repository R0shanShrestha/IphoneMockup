import React, { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import gsap from "gsap";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isPlaying: false,
    isLastVideo: false,
  });

  const [loadedData, setloadedData] = useState([]);
  const { isEnd, isLastVideo, startPlay, videoId, isPlaying } = video;

  // ScrollTrigger fix for mobile/Android
  useEffect(() => {
    ScrollTrigger.defaults({
      markers: false,
      toggleActions: "play none none none",
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize",
    });
    
  }, []);

  useGSAP(() => {
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });

    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    // Make sure ScrollTrigger is refreshed on mobile
    ScrollTrigger.refresh();

    // Use this for mobile momentum scrolling fix
    const touchStart = () => ScrollTrigger.update();
    window.addEventListener("touchstart", touchStart);
    window.addEventListener("touchmove", touchStart);

    return () => {
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchmove", touchStart);
    };
  }, []);

  useEffect(() => {
    let currentProgress = 0;
    let span = videoSpanRef.current;
    if (span[videoId]) {
      let animate = gsap.to(span[videoId], {
        onUpdate: () => {
          let progress = Math.ceil(animate.progress() * 100);
          if (progress !== currentProgress) currentProgress = progress;

          gsap.to(videoDivRef.current[videoId], {
            width:
              window.innerWidth < 760
                ? "10vw"
                : window.innerWidth < 1200
                ? "10vw"
                : "4vw",
          });
          gsap.to(span[videoId], {
            width: `${currentProgress}%`,
            backgroundColor: "white",
          });
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], { width: "12px" });
            gsap.to(span[videoId], { backgroundColor: "#afafaf" });
          }
        },
      });

      if (videoId === 0) animate.restart();

      const animUpdate = () => {
        animate.progress(
          videoRef?.current[videoId]?.currentTime /
            hightlightsSlides[videoId]?.videoDuration
        );
      };

      if (isPlaying) gsap.ticker.add(animUpdate);
      else gsap.ticker.remove(animUpdate);
    }
  }, [videoId, startPlay]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) videoRef.current[videoId].pause();
      else startPlay && videoRef.current[videoId].play();
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  const handleLoadedData = (i, e) => {
    setloadedData((pre) => [...pre, e]);
  };

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        setVideo((preVideo) => ({ ...preVideo, isEnd: true, videoId: i + 1 }));
        break;
      case "video-last":
        setVideo((preVideo) => ({ ...preVideo, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo((preVideo) => ({
          ...preVideo,
          isLastVideo: false,
          videoId: 0,
        }));
        break;
      case "play":
      case "pause":
        setVideo((preVideo) => ({
          ...preVideo,
          isPlaying: !preVideo.isPlaying,
        }));
        break;
      default:
        return video;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="sm:pr-20 pr-10">
            <div className="relative sm:w-[70vw] w-[88vw] md:h-[70vh] sm:h-[50vh] h-[35vh]">
              <div className="w-full h-full flex items-center justify-center rounded-3xl overflow-hidden bg-black">
                <video
                  className={`${
                    list.id === 2 && "translate-x-44"
                  } pointer-events-none`}
                  muted
                  src={list.video}
                  id="video"
                  preload="auto"
                  onEnded={() =>
                    i !== 3
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last")
                  }
                  ref={(el) => (videoRef.current[i] = el)}
                  onPlay={() =>
                    setVideo((pre) => ({ ...pre, isPlaying: true }))
                  }
                  onLoadedMetadata={(e) => handleLoadedData(i, e)}
                />
              </div>
              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text) => (
                  <p key={text} className="md:text-2xl text-xl font-medium">
                    {text}{" "}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative flex items-center justify-center mt-10">
        <div className="flex items-center justify-center px-7 py-5 bg-gray-500 backdrop-blur rounded-full">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className="mx-2 w-3 h-3 bg-gray-700 rounded-full relative cursor-pointer"
            >
              <span
                className="absolute h-full w-full rounded-full"
                ref={(el) => (videoSpanRef.current[i] = el)}
              />
            </span>
          ))}
        </div>

        <button className="ml-4 cursor-pointer p-4 rounded-full bg-gray-300 backdrop-blur flex items-center justify-center">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={() => {
              isLastVideo
                ? handleProcess("video-reset")
                : !isPlaying
                ? handleProcess("play")
                : handleProcess("pause");
            }}
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
