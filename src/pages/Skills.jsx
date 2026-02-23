import { useState, useRef, useEffect } from "react";


function Skills() {
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

  const leftItems = [
    "Frameworks",
    "Hosting Platforms",
    "Tools",
    "Languages",
  ];

  return (
    <main
      ref={mainRef}
      className={`hero-skills ${isVisible ? "show" : ""}`}
    >
      <section className="left">
        <div className="left-details">
          <h1>Skills</h1>
          <p>Animated interfaces powered by solid backend architecture.</p>

          <div className="left-tools">
            {leftItems.map((item, index) => (
              <h2
                key={index}
                className={activeIndex === index ? "active" : ""}
                onClick={() => handleClick(index)}
              >
                {item}
              </h2>
            ))}
          </div>
        </div>
      </section>

      <section className="right-details" ref={containerRef}>
        {[
          {
            title: "Frameworks",
            tools: [
              ["devicon-django-plain", "Django"],
              ["devicon-djangorest-plain", "Django REST"],
              ["devicon-fastapi-plain", "FastAPI"],
              ["devicon-react-original", "React"],
              ["devicon-nodejs-plain-wordmark", "Node.js"],
            ],
          },
          {
            title: "Hosting Platforms",
            tools: [
              ["devicon-vercel-original", "Vercel"],
              ["devicon-netlify-plain", "Netlify"]
            ],
          },
          {
            title: "Tools",
            tools: [
              ["devicon-git-plain", "Git"],
              ["devicon-vscode-plain", "VS Code"],
              ["devicon-pycharm-plain", "PyCharm"],
              ["devicon-sqlalchemy-plain", "SQLAlchemy"],
              ["devicon-tailwindcss-original", "Tailwind CSS"],
              ["devicon-postgresql-plain", "PostgreSQL"],
            ],
          },
          {
            title: "Languages",
            tools: [
              ["devicon-python-plain", "Python"],
              ["devicon-javascript-plain", "JavaScript"],
              ["devicon-html5-plain", "HTML5"],
              ["devicon-css3-plain", "CSS3"],
              ["devicon-azuresqldatabase-plain", "SQL"],
            ],
          },
        ].map((section, index) => (
          <section
            key={index}
            ref={(el) => (sectionRefs.current[index] = el)}
            className={`right-box ${
              activeIndex === index ? "active" : ""
            }`}
          >
            <h1>{section.title}</h1>
            <div className="right-tools">
              {section.tools.map(([icon, name], i) => (
                <div className="tool" key={i}>
                  <i className={icon} />
                  <h2>{name}</h2>
                </div>
              ))}
            </div>
          </section>
        ))}
      </section>
    </main>
  );
}

export default Skills;
