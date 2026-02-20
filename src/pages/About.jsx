import { useState, useRef, useEffect } from "react";

function About() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const mainRef = useRef(null);
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); 
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -80px 0px",
      }
    );

    if (mainRef.current) {
      observer.observe(mainRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleClick = (index) => {
    setActiveIndex(index);

    const container = containerRef.current;
    const target = sectionRefs.current[index];

    if (container && target) {
      const offset =
        target.offsetTop -
        container.clientHeight / 2 +
        target.clientHeight / 2;

      container.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  const sections = [
    {
      title: "origin",
      content: (
        <>
          <p>
            I'm a 23-year-old developer from Bulgaria who began programming in 2024 driven purely by curiosity.
            I wanted to understand how digital systems function beneath the surface — not just how to use them,
            but how they are built, structured, and optimized. What started as experimentation quickly became
            long nights refining logic and understanding architecture.
        </p>
        <p>
            I didn’t approach programming as a shortcut to opportunity — I approached it as a discipline.
            I became fascinated by the invisible layers behind every interface: servers communicating,
            databases structuring information, algorithms making decisions in milliseconds.
            The deeper I went, the more I realized this wasn’t just a skill — it was a way of thinking.
        </p>
        </>
      ),
    },
    {
      title: "evolution",
      content: (
        <>
          <p>
            Over time, I transitioned into
            <span class="highlight"> modern web development</span>,
            building full-stack applications and studying how backend systems and frontend interfaces merge
            into scalable products. I became obsessed with clarity — writing code that is readable,
            structured, and intentional.
        </p>
        <p>
            I moved beyond simply “making things work” and focused on making them make sense.
            Clean abstractions. Predictable patterns. Thoughtful separation of concerns.
            I began treating every project as a system of moving parts — each layer designed
            to communicate clearly with the next.
        </p>
        <p>
            With every iteration, I refined not only my technical skills, but my ability to design
            software that grows without collapsing under its own complexity.
        </p>
        </>
      ),
    },
    {
      title: "work",
      content: (
        <>
          <p>
            By 2026, I began collaborating with businesses, transforming abstract ideas into structured digital solutions.
            I enjoy taking something undefined and shaping it into a reliable architecture — defining data flow,
            improving performance, and ensuring long-term maintainability.
        </p>
        <p>
            My work process starts with listening — understanding the problem before writing a single line of code.
            From there, I focus on designing systems that are not only functional today,
            but adaptable tomorrow.
        </p>
        <p>
            Whether it's optimizing queries, refining API structure, or improving frontend responsiveness,
            I aim to deliver solutions that feel seamless on the surface and robust underneath.
        </p>
        </>
      ),
    },
    {
      title: "mindset",
      content: (
        <>
          <p>
            Programming isn’t just writing syntax. It’s designing systems. Breaking complexity into logical layers.
            Iterating, refining, improving — continuously. I build with intention and evolve with every project.
        </p>
        <p>
            I believe simplicity is earned through discipline. Every clean solution is the result
            of thoughtful restructuring and careful trade-offs.
        </p>
        <p>
            I approach development with long-term vision — prioritizing maintainability,
            performance, and clarity over shortcuts. Growth, for me, is constant.
            Each project leaves me sharper than the last.
        </p>
        </>
      ),
    },
  ];

  return (
    <main
      ref={mainRef}
      className={`hero-skills ${isVisible ? "show" : ""}`}
    >
      <section className="left">
        <div className="left-details">
          <h1>Mihail Panayotov</h1>

          <div className="terminal-line">
            developer.building(systematic_solutions)
          </div>

          <div className="left-tools">
            {sections.map((section, index) => (
              <h2
                key={index}
                className={activeIndex === index ? "active" : ""}
                onClick={() => handleClick(index)}
              >
                {section.title.charAt(0).toUpperCase() +
                  section.title.slice(1)}
              </h2>
            ))}
          </div>

          <div className="footer-note">
            // always learning. always building. always refining.
          </div>
        </div>
      </section>

      <section className="right-details" ref={containerRef}>
        {sections.map((section, index) => (
          <div
            key={index}
            ref={(el) => (sectionRefs.current[index] = el)}
            className={`section ${
              activeIndex === index ? "active" : ""
            }`}
          >
            <h2>{section.title}</h2>
            {section.content}
          </div>
        ))}
      </section>
    </main>
  );
}

export default About;
