import { useEffect, useRef, useState } from "react";

function Hero() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const roles = [
    "Full Stack Web Developer.",
    "Frontend Developer.",
    "Backend Developer.",
  ];

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);


  useEffect(() => {
    if (!isVisible) return;

    const current = roles[index];

    const baseSpeed = isDeleting ? 40 : 90;
    const randomOffset = Math.random() * 60 - 30; 
    const delay = Math.max(30, baseSpeed + randomOffset);

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.substring(0, text.length + 1));

        if (text === current) {
          setTimeout(() => setIsDeleting(true), 800); 
        }
      } else {
        setText(current.substring(0, text.length - 1));

        if (text === "") {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, isVisible]);

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
      <p className="typing">
        {text}<span className="cursor">|</span>
      </p>
      <p>Creating clean, modern and impactful web experiences.</p>

      <div className="buttons buttons--center">

        <a
          href="https://github.com/panayotovv" target="_blank"
          className="hire-button"
        >
          <i className="fa-brands fa-github" aria-hidden="true"></i>
          {" "}GitHub
        </a>

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
