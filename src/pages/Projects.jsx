import { useState, useRef, useEffect } from "react";

const projects = [
  {
    title: "Finance Dashboard",
    tag: "Fullstack",
    live: false,
    desc: "React SPA for tracking income/expenses, visualizing spending via interactive charts, and enforcing monthly budget thresholds. Every transaction is categorized and persisted in PostgreSQL via a Django REST backend. Problem solved: full cash flow visibility in one place — no more guessing where your money went.",
    tech: ["Django REST", "React", "Charts", "PostgreSQL", "JWT"],
    github: "https://github.com/panayotovv/finance-dashboard-frontend",
  },
  {
    title: "DEV.BG Job Tracker",
    tag: "Fullstack",
    live: false,
    desc: "Custom job aggregator for dev.bg. A Python scraper runs two cron jobs — a full daily sweep and a 15-min delta refresh — piping 1,600+ listings into PostgreSQL via a FastAPI backend. React frontend handles auth, analytics, and full application lifecycle tracking. Problem solved: Instead of manually tracking applications across tabs and notes, users get a real-time system for managing every stage of the hiring pipeline.",
    tech: ["Python", "FastAPI", "PostgreSQL", "React", "Cron"],
    github: "https://github.com/panayotovv/job-tracker-frontend",
  },
  {
    title: "Revenue Reconciliation Engine",
    tag: "Backend",
    live: false,
    desc: "Automated Stripe-to-order reconciliation engine with exact and fuzzy matching strategies. Assigns confidence scores per match across amount, timestamp, customer ID, and metadata — categorizing results as Matched / Unmatched / Missing. Real-time Slack alerts fire on anomalies like duplicates or missing orders. Problem solved: zero manual cross-referencing — finance teams get reliable reconciliation with clear confidence levels.",
    tech: ["Python", "Stripe API", "Matching Engine", "Confidence Scoring", "Slack Alerts", "PostgreSQL"],
    github: "https://github.com/panayotovv/revenue-reconciliation-engine",
  },
  {
    title: "Portfolio Website",
    tag: "Frontend",
    live: true,
    desc: "Developer portfolio built in React with motion-driven animations, a procedural 3D star field via Three.js, and fluid UI transitions across all sections. Problem solved: a living, interactive resume that stands out beyond a plain PDF.",
    tech: ["React", "Three.js"],
    github: "https://github.com/panayotovv/portfolio-website",
  },
];

const filters = ["All", "Fullstack", "Backend", "Frontend"];

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isVisible, setIsVisible] = useState(false);

  const mainRef = useRef(null);
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -80px 0px" }
    );

    if (mainRef.current) observer.observe(mainRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.tag === activeFilter);

  const handleCardClick = (index) => {
    const next = activeIndex === index ? null : index;
    setActiveIndex(next);

    if (next !== null) {
      const container = containerRef.current;
      const target = cardRefs.current[next];
      if (container && target) {
        const offset =
          target.offsetTop -
          container.clientHeight / 2 +
          target.clientHeight / 2;
        container.scrollTo({ top: offset, behavior: "smooth" });
      }
    }
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setActiveIndex(null);
  };

  return (
    <main
      ref={mainRef}
      className={`hero-skills ${isVisible ? "show" : ""}`}
    >
      <section className="left">
        <div className="left-details">
          <h1>Projects</h1>
          <p>A look at what I do and how I do it.</p>

          <div className="left-tools">
            {filters.map((filter) => (
              <h2
                key={filter}
                className={activeFilter === filter ? "active" : ""}
                onClick={() => handleFilterClick(filter)}
              >
                {filter}
              </h2>
            ))}
          </div>
        </div>
      </section>

      <section className="right-details" ref={containerRef}>
        {filteredProjects.map((project, index) => (
          <div
            key={project.title}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`right-box project-card ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={() => handleCardClick(index)}
            style={{ padding: "1.4rem" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: "0.8rem",
              }}
            >
              <span style={{ fontSize: "1.15rem", fontWeight: 600 }}>
                {project.title}
              </span>
              <span
                style={{
                  fontSize: "0.72rem",
                  padding: "0.25rem 0.6rem",
                  borderRadius: "0.5rem",
                  border: "1px solid rgba(255,255,255,0.2)",
                  opacity: 0.75,
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  whiteSpace: "nowrap",
                }}
              >
                {project.live && (
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "#00f5c4",
                      display: "inline-block",
                      boxShadow: "0 0 5px rgba(0,245,196,0.6)",
                    }}
                  />
                )}
                {project.live ? "Live" : project.tag}
              </span>
            </div>

            <p
              style={{
                fontSize: "0.85rem",
                opacity: 0.55,
                lineHeight: 1.65,
                marginBottom: "1rem",
              }}
            >
              {project.desc}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.4rem",
                marginBottom: "1rem",
              }}
            >
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: "0.72rem",
                    padding: "0.2rem 0.55rem",
                    borderRadius: "0.4rem",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    opacity: 0.8,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <div
              style={{ display: "flex", gap: "0.6rem" }}
              onClick={(e) => e.stopPropagation()}
            >
              <a
                href={project.github} target="_blank"
                className="hire-button"
                style={{
                  fontSize: "0.8rem",
                  padding: "0.4rem 0.9rem",
                  borderRadius: "0.6rem",
                }}
              >
                GitHub ↗
              </a>
              {project.demo && (
                <a
                  href={project.demo}
                  className="email-button"
                  style={{
                    fontSize: "0.8rem",
                    padding: "0.4rem 0.9rem",
                    borderRadius: "0.6rem",
                  }}
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}