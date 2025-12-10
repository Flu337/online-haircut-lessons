import React from "react";
import Hero from "../../components/Hero";
import Advantages from "../../components/Advantages";
import Program from "../../components/Program";
import Teachers from "../../components/Teachers";
import Formats from "../../components/Formats";
import Cost from "../../components/Cost";
import FAQ from "../../components/FAQ";
import Reviews from "../../components/Reviews";
import Contacts from "../../components/Contacts";
import Navigation from "../../components/Navigation";
import ThemeToggle from "../../components/ThemeToggle";
import PBtn from "../../components/PBtn";



function HomePage({ theme, toggleTheme }) {
  return (
    <div className="App">

      <Navigation theme={theme} toggleTheme={toggleTheme} />

      <PBtn />


      
      <section id="hero-section" className="hero-section">
        <Hero />
      </section>

      <section id="advantages-section" className="advantages-section">
        <Advantages />
      </section>

      <section id="program-section" className="program-section">
        <Program />
      </section>

      <section id="teachers-section" className="teachers-section">
        <Teachers />
      </section>

      <section id="formats-section" className="formats-section">
        <Formats />
      </section>

      <section id="cost-section" className="cost-section">
        <Cost />
      </section>

      <section id="faq-section" className="faq-section">
        <FAQ />
      </section>

      <section id="reviews-section" className="reviews-section">
        <Reviews />
      </section>

      <section id="contacts-section" className="contacts-section">
        <Contacts />
      </section>


      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}

export default HomePage;