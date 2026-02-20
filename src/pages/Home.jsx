import { useEffect, useRef, useState } from "react";

function Hero() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2, 
        rootMargin: "0px 0px -50px 0px", 
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`hero-text ${isVisible ? "show" : ""}`}
    >
      <h1>PANAYOTOV</h1>
      <p>Full Stack Developer.</p>
      <p>Creating clean, modern and impactful web experiences.</p>

      <div className="buttons buttons--center">
        <button className="hire-button">
          Available for Hire
        </button>

        <a
          href="mailto:panayotovonline@gmail.com"
          className="email-button"
        >
          <i className="fa-regular fa-envelope" aria-hidden="true"></i>
          {" "}Email Me
        </a>
      </div>
    </section>
  );
}

export default Hero;
