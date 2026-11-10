
import React, { useState, useEffect } from "react";
import "./App.css";

const initialData = {
  name: "Namana N",
  usn: "Enter Your USN",
  college: "Atria Institute of Technology",
  phone: "Enter Your Phone Number",
  email: "Enter Your Email Address",
  course: "B.E. – Information Science and Engineering",
  about:
    "I am a 5th semester Information Science and Engineering student at Atria Institute of Technology. I am interested in software development, web technologies and Artificial Intelligence. I enjoy learning new technologies and building practical projects.",

  photo: "",

  education: [
    {
      degree: "School Education",
      branch: "School Education",
      college: "Vivekananda School",
      year: "2022"
    },
    {
      degree: "Pre-University (PU)",
      branch: "PU Education",
      college: "Base PU College",
      year: "2024"
    },
    {
      degree: "Bachelor of Engineering (B.E.)",
      branch: "Information Science and Engineering",
      college: "Atria Institute of Technology",
      year: "5th Semester – Currently Pursuing"
    }
  ],

  projects: [
    {
      title: "Neuro Nest",
      description:
        "An academic project focused on developing a technology-based solution. Add the project's main features and your contribution here.",
      tech: "Add the technologies used",
      link: ""
    },
    {
      title: "Hoppy – Digital Drawing Application",
      description:
        "A digital drawing application that provides users with a simple interactive space to create and work on drawings.",
      tech: "Add the technologies used",
      link: ""
    },
    {
      title: "Seed Sowing Machine",
      description:
        "An academic project focused on helping with the seed-sowing process. Add the machine's working details and your contribution here.",
      tech: "Add the tools and components used",
      link: ""
    }
  ],

  skills: [
    { name: "Python", level: 70 },
    { name: "C Programming", level: 65 },
    { name: "Java", level: 60 },
    { name: "React.js", level: 60 },
    { name: "HTML", level: 75 },
    { name: "CSS", level: 70 },
    { name: "Communication", level: 75 }
  ],

  certificates: [
    {
      title: "Artificial Intelligence",
      organization: "Add Organization",
      date: "Add Year",
      link: ""
    },
    {
      title: "Agentic AI Workshop",
      organization: "Add Organization",
      date: "Add Year",
      link: ""
    },
    {
      title: "Basics of Python",
      organization: "Add Organization",
      date: "Add Year",
      link: ""
    },
    {
      title: "Mastering in Python",
      organization: "Add Organization",
      date: "Add Year",
      link: ""
    },
    {
      title: "C Programming",
      organization: "Add Organization",
      date: "Add Year",
      link: ""
    }
  ]
};

function App() {
  const [editMode, setEditMode] = useState(false);

  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem("myPortfolio");
      return saved
        ? { ...initialData, ...JSON.parse(saved) }
        : initialData;
    } catch {
      return initialData;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("myPortfolio", JSON.stringify(data));
    } catch {
      alert("Storage is full. Please upload a smaller profile photo.");
    }
  }, [data]);

  const updateField = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const updateItem = (section, index, field, value) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addItem = (section, item) => {
    setData(prev => ({
      ...prev,
      [section]: [...prev[section], item]
    }));
  };

  const deleteItem = (section, index) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handlePhoto = e => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    if (file.size > 1024 * 1024) {
      alert("Please select an image smaller than 1 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => updateField("photo", reader.result);
    reader.readAsDataURL(file);
  };

  const Field = ({ field, placeholder }) =>
    editMode ? (
      <input
        value={data[field] || ""}
        placeholder={placeholder}
        onChange={e => updateField(field, e.target.value)}
      />
    ) : (
      <span>{data[field]}</span>
    );

  const TextField = ({ field }) =>
    editMode ? (
      <textarea
        value={data[field] || ""}
        onChange={e => updateField(field, e.target.value)}
      />
    ) : (
      <p>{data[field]}</p>
    );

  return (
    <div className="portfolio">

      {/* NAVBAR */}
      <nav className="navbar">
        <a className="logo" href="#home">
          MY<span>PORTFOLIO.</span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#education">Education</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#certificates">Certificates</a>
          <a href="#contact">Contact</a>
        </div>

        <button
          className="edit-btn"
          onClick={() => setEditMode(!editMode)}
        >
          {editMode ? "✓ Save Changes" : "✎ Edit Portfolio"}
        </button>
      </nav>

      {/* HOME */}
      <section className="hero" id="home">
        <div className="hero-content">
          <p className="welcome">WELCOME TO MY PORTFOLIO</p>

          <h1>
            Hi, I'm{" "}
            <span>
              <Field field="name" placeholder="Your Name" />
            </span>
          </h1>

          <h2>
            <Field field="course" placeholder="Your Course" />
          </h2>

          <p className="hero-text">
            <TextField field="about" />
          </p>

          <p className="usn">
            USN: <Field field="usn" placeholder="Your USN" />
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="primary-btn">
              Explore My Work
            </a>
            <a href="#contact" className="secondary-btn">
              Contact Me
            </a>
          </div>
        </div>

        <div className="profile-container">
          <div className="profile-circle">
            {data.photo ? (
              <img src={data.photo} alt="Profile" />
            ) : (
              <div className="profile-placeholder">👩‍🎓</div>
            )}
          </div>

          {editMode && (
            <label className="photo-upload">
              Change Profile Photo
              <input
                type="file"
                accept="image/*"
                onChange={handlePhoto}
              />
            </label>
          )}
        </div>
      </section>

      {/* ABOUT */}
      <section className="section about" id="about">
        <p className="section-label">GET TO KNOW ME</p>
        <h2>About <span>Me</span></h2>

        <div className="details-grid">
          <div className="detail-card">
            <span>👤 Full Name</span>
            <Field field="name" placeholder="Enter name" />
          </div>

          <div className="detail-card">
            <span>🎓 College</span>
            <Field field="college" placeholder="Enter college" />
          </div>

          <div className="detail-card">
            <span>🆔 USN</span>
            <Field field="usn" placeholder="Enter USN" />
          </div>

          <div className="detail-card">
            <span>📱 Mobile Number</span>
            <Field field="phone" placeholder="Enter phone" />
          </div>

          <div className="detail-card">
            <span>✉️ Email Address</span>
            <Field field="email" placeholder="Enter email" />
          </div>

          <div className="detail-card">
            <span>💻 Course</span>
            <Field field="course" placeholder="Enter course" />
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="section" id="education">
        <p className="section-label">MY ACADEMIC JOURNEY</p>
        <h2>My <span>Education</span></h2>

        <div className="cards-grid">
          {data.education.map((edu, index) => (
            <div className="content-card" key={index}>
              <div className="card-icon">🎓</div>

              {editMode ? (
                <>
                  <input
                    value={edu.degree}
                    placeholder="Degree"
                    onChange={e =>
                      updateItem("education", index, "degree", e.target.value)
                    }
                  />

                  <input
                    value={edu.branch}
                    placeholder="Course or branch"
                    onChange={e =>
                      updateItem("education", index, "branch", e.target.value)
                    }
                  />

                  <input
                    value={edu.college}
                    placeholder="School or college"
                    onChange={e =>
                      updateItem("education", index, "college", e.target.value)
                    }
                  />

                  <input
                    value={edu.year}
                    placeholder="Graduation year or current semester"
                    onChange={e =>
                      updateItem("education", index, "year", e.target.value)
                    }
                  />

                  <button
                    className="delete-btn"
                    onClick={() => deleteItem("education", index)}
                  >
                    Delete Education
                  </button>
                </>
              ) : (
                <>
                  <h3>{edu.degree}</h3>
                  <p>{edu.branch}</p>
                  <p>{edu.college}</p>
                  <p className="tech">{edu.year}</p>
                </>
              )}
            </div>
          ))}
        </div>

        {editMode && (
          <button
            className="add-btn"
            onClick={() =>
              addItem("education", {
                degree: "New Qualification",
                branch: "Course or Branch",
                college: "Institution Name",
                year: "Year"
              })
            }
          >
            + Add Education
          </button>
        )}
      </section>

      {/* PROJECTS */}
      <section className="section" id="projects">
        <p className="section-label">MY WORK</p>
        <h2>My <span>Projects</span></h2>

        <div className="cards-grid">
          {data.projects.map((project, index) => (
            <div className="content-card" key={index}>
              <div className="card-icon">💻</div>

              {editMode ? (
                <>
                  <input
                    value={project.title}
                    placeholder="Project name"
                    onChange={e =>
                      updateItem("projects", index, "title", e.target.value)
                    }
                  />

                  <textarea
                    value={project.description}
                    placeholder="Project description"
                    onChange={e =>
                      updateItem("projects", index, "description", e.target.value)
                    }
                  />

                  <input
                    value={project.tech}
                    placeholder="Technologies used"
                    onChange={e =>
                      updateItem("projects", index, "tech", e.target.value)
                    }
                  />

                  <input
                    value={project.link}
                    placeholder="GitHub / Project URL"
                    onChange={e =>
                      updateItem("projects", index, "link", e.target.value)
                    }
                  />

                  <button
                    className="delete-btn"
                    onClick={() => deleteItem("projects", index)}
                  >
                    Delete Project
                  </button>
                </>
              ) : (
                <>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <p className="tech">{project.tech}</p>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Project ↗
                    </a>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {editMode && (
          <button
            className="add-btn"
            onClick={() =>
              addItem("projects", {
                title: "New Project",
                description: "Project description",
                tech: "Technologies used",
                link: ""
              })
            }
          >
            + Add Project
          </button>
        )}
      </section>

      {/* SKILLS */}
      <section className="section skills-section" id="skills">
        <p className="section-label">WHAT I KNOW</p>
        <h2>My <span>Skills</span></h2>

        <div className="skills-container">
          {data.skills.map((skill, index) => (
            <div className="skill-item" key={index}>
              <div className="skill-heading">
                {editMode ? (
                  <input
                    value={skill.name}
                    onChange={e =>
                      updateItem("skills", index, "name", e.target.value)
                    }
                  />
                ) : (
                  <strong>{skill.name}</strong>
                )}

                {editMode ? (
                  <input
                    className="level-input"
                    type="number"
                    min="0"
                    max="100"
                    value={skill.level}
                    onChange={e =>
                      updateItem(
                        "skills",
                        index,
                        "level",
                        Math.min(100, Math.max(0, Number(e.target.value)))
                      )
                    }
                  />
                ) : (
                  <span>{skill.level}%</span>
                )}
              </div>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>

              {editMode && (
                <button
                  className="delete-btn"
                  onClick={() => deleteItem("skills", index)}
                >
                  Delete Skill
                </button>
              )}
            </div>
          ))}
        </div>

        {editMode && (
          <button
            className="add-btn"
            onClick={() =>
              addItem("skills", { name: "New Skill", level: 50 })
            }
          >
            + Add Skill
          </button>
        )}
      </section>

      {/* CERTIFICATES */}
      <section className="section" id="certificates">
        <p className="section-label">MY ACHIEVEMENTS</p>
        <h2>My <span>Certificates</span></h2>

        <div className="cards-grid">
          {data.certificates.map((cert, index) => (
            <div className="content-card" key={index}>
              <div className="card-icon">🏆</div>

              {editMode ? (
                <>
                  <input
                    value={cert.title}
                    onChange={e =>
                      updateItem("certificates", index, "title", e.target.value)
                    }
                  />

                  <input
                    value={cert.organization}
                    onChange={e =>
                      updateItem(
                        "certificates",
                        index,
                        "organization",
                        e.target.value
                      )
                    }
                  />

                  <input
                    value={cert.date}
                    onChange={e =>
                      updateItem("certificates", index, "date", e.target.value)
                    }
                  />

                  <input
                    value={cert.link}
                    placeholder="Certificate URL"
                    onChange={e =>
                      updateItem("certificates", index, "link", e.target.value)
                    }
                  />

                  <button
                    className="delete-btn"
                    onClick={() => deleteItem("certificates", index)}
                  >
                    Delete Certificate
                  </button>
                </>
              ) : (
                <>
                  <h3>{cert.title}</h3>
                  <p>{cert.organization}</p>
                  <p className="tech">{cert.date}</p>

                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Certificate ↗
                    </a>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {editMode && (
          <button
            className="add-btn"
            onClick={() =>
              addItem("certificates", {
                title: "New Certificate",
                organization: "Organization",
                date: "Year",
                link: ""
              })
            }
          >
            + Add Certificate
          </button>
        )}
      </section>

      {/* CONTACT */}
      <section className="section contact-section" id="contact">
        <p className="section-label">LET'S CONNECT</p>
        <h2>Contact <span>Me</span></h2>

        <div className="contact-card">
          <p>
            Have a project or opportunity? Feel free to contact me.
          </p>

          <p>
            📧 <Field field="email" placeholder="Your email" />
          </p>

          <p>
            📱 <Field field="phone" placeholder="Your phone" />
          </p>

          <a
            className="primary-btn"
            href={`mailto:${data.email}`}
          >
            Send Me an Email
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>
          © {new Date().getFullYear()} {data.name}. All Rights Reserved.
        </p>
        <a href="#home">Back to Top ↑</a>
      </footer>

    </div>
  );
}

export default App;
