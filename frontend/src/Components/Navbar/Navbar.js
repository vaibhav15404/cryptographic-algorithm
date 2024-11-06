// import React, { useState, useEffect } from "react";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [scrollToId, setScrollToId] = useState(null);
//   const [activeSection, setActiveSection] = useState("home"); // Default to 'home'

//   // Scroll to specific section logic
//   useEffect(() => {
//     if (scrollToId && location.pathname === "/") {
//       const element = document.getElementById(scrollToId);
//       if (element) {
//         element.scrollIntoView({ behavior: "smooth" });
//         setScrollToId(null);
//       }
//     }
//   }, [location, scrollToId]);

//   // Detect scroll position and set the active section
//   useEffect(() => {
//     const handleScroll = () => {
//       const sections = ["about", "services", "contact"];
//       let currentSection = "home"; // Default section

//       sections.forEach((section) => {
//         const element = document.getElementById(section);
//         if (element) {
//           const rect = element.getBoundingClientRect();
//           if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
//             currentSection = section;
//           }
//         }
//       });

//       setActiveSection(currentSection);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   // Handle page and section navigation
//   const handleScroll = (e, id) => {
//     e.preventDefault();
//     if (location.pathname !== "/") {
//       setScrollToId(id);
//       navigate("/");
//     } else {
//       const element = document.getElementById(id);
//       if (element) {
//         element.scrollIntoView({ behavior: "smooth" });
//       }
//     }
//   };

//   return (
//     <div className="container">
//       <div className="navbar">
//         <div className="navbar-logo">
//           <NavLink to="/" className="navbar-logo-link">
//             CryptoTech
//           </NavLink>
//         </div>
//         <div className="navbar-links">
//           <ul>
//             <li>
//               <NavLink
//                 exact="true"
//                 to="/"
//                 className={location.pathname === "/" ? "active-link" : ""}
//               >
//                 Home
//               </NavLink>
//             </li>
//             <li>
//               <a
//                 href="#about"
//                 onClick={(e) => handleScroll(e, "about")}
//                 className={activeSection === "about" ? "active-link" : ""}
//               >
//                 Algorithms
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#services"
//                 onClick={(e) => handleScroll(e, "services")}
//                 className={activeSection === "services" ? "active-link" : ""}
//               >
//                 Services
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#contact"
//                 onClick={(e) => handleScroll(e, "contact")}
//                 className={activeSection === "contact" ? "active-link" : ""}
//               >
//                 Contact
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;









import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrollToId, setScrollToId] = useState(null);
  const [activeSection, setActiveSection] = useState("home"); // Default to 'home'

  // Scroll to specific section logic
  useEffect(() => {
    if (scrollToId && location.pathname === "/") {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0; // Adjust based on your navbar class
      const element = document.getElementById(scrollToId);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - navbarHeight, // Adjust for navbar height
          behavior: "smooth",
        });
        setScrollToId(null);
      }
    }
  }, [location, scrollToId]);

  // Detect scroll position and set the active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "services", "contact"];
      let currentSection = "home"; // Default section

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
            currentSection = section;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle page and section navigation
  const handleScroll = (e, id) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      setScrollToId(id);
      navigate("/");
    } else {
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0; // Adjust based on your navbar class
      const element = document.getElementById(id);
      if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - navbarHeight, // Adjust for navbar height
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div className="container">
      <div className="navbar">
        <div className="navbar-logo">
          <NavLink to="/" className="navbar-logo-link">
            CryptoTech
          </NavLink>
        </div>
        <div className="navbar-links">
          <ul>
            <li>
              <a
                href="#home"
                onClick={(e) => handleScroll(e, "home")}
                className={activeSection === "home" ? "active-link" : ""}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={(e) => handleScroll(e, "about")}
                className={activeSection === "about" ? "active-link" : ""}
              >
                Algorithms
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={(e) => handleScroll(e, "services")}
                className={activeSection === "services" ? "active-link" : ""}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => handleScroll(e, "contact")}
                className={activeSection === "contact" ? "active-link" : ""}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
