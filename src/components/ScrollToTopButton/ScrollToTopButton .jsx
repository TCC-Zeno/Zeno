import S from "./scrollToTopButton.module.css";
import { useEffect, useState } from "react";
import Img from "./../../assets/bottomUp.png";

export default function ScrollToTopButton() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const calculateScrollProgress = () => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const progress = Math.min(scrollPosition / totalHeight, 1);

    setScrollProgress(progress);
    setIsVisible(scrollPosition > 100);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", calculateScrollProgress);
    calculateScrollProgress();

    return () => {
      window.removeEventListener("scroll", calculateScrollProgress);
    };
  }, []);

  return (
    <button
      className={`${S.scrollButton} ${isVisible ? S.visible : ""}`}
      onClick={scrollToTop}
    >
      <div
        className={S.clockReveal}
        style={{
          backgroundImage: `url(${Img})`, 
          "--scroll-progress": `${scrollProgress * 360}deg`,
        }}
      >
        <div className={S.image}>
        </div>
      </div>
    </button>
  );
}
