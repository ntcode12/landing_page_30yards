import React, { useState, useEffect } from "react";
import "./App.css";

// Define the sections for the page
const sections = [
  {
    title: "Section 1",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    title: "Section 2",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    title: "Section 3",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    title: "Section 4",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
];

// Define the App component
function App() {
  // Set up state variables for the active section and whether the menu is open
  const [activeSection, setActiveSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Function to toggle the menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Use an effect to add event listeners for scrolling and resizing
  useEffect(() => {
    const handleScroll = () => {
      // Check which section is currently in view and set it as active
      const scrollPosition = window.scrollY;
      const sections = document.querySelectorAll(".section");
      sections.forEach((section, index) => {
        const top = section.offsetTop - 50;
        const height = section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(index);
        }
      });
    };
    const handleResize = () => {
      // Close the menu on resize
      setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Render the App component
  return (
    <div className="App">
      <header>
        <h1>30 Yards Out</h1>
        {/* Add a button to toggle the menu */}
        <button className="menu-button" onClick={toggleMenu}>
          {menuOpen ? "Close" : "Menu"}
        </button>
        {/* Add the navigation menu */}
        <nav className={menuOpen ? "menu-open" : "menu-closed"}>
          {sections.map((section, index) => (
            <a
              key={index}
              className={index === activeSection ? "active" : ""}
              href={`#section-${index + 1}`}
              onClick={() => setMenuOpen(false)}
            >
              {section.title}
            </a>
          ))}
        </nav>
      </header>
      {/* Add the sections */}
      {sections.map((section, index) => (
        <section key={index} id={`section-${index + 1}`} className="section">
          <h2>{section.title}</h2>
          <p>{section.content}</p>
        </section>
      ))}
      {/* Add a button to scroll to the top of the page */}
      <button className="top-button" onClick={scrollToTop}>
        Top
      </button>
    </div>
  );
}

export default App;

