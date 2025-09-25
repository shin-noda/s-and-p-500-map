// css
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1>About the S&P 500 Map</h1>

      {/* Table of Contents */}
      <nav className="about-toc">
        <h2>Table of Contents</h2>
        <ul>
          <li>
            <a href="#data-collection">1. Data Collection</a>
          </li>
          <li>
            <a href="#data-processing">2. Data Processing</a>
          </li>
          <li>
            <a href="#react-building">3. React Building Time</a>
          </li>
        </ul>
      </nav>

      {/* Sections */}
      <section id="data-collection">
        <h2>1. Data Collection</h2>
        <p>
          This step involved gathering the headquarters locations of all S&P
          500 companies. Data was sourced from [Yahoo Finance, company websites,
          etc.] and saved in a structured JSON format.
        </p>
      </section>

      <section id="data-processing">
        <h2>2. Data Processing</h2>
        <p>
          Once collected, the data was cleaned, normalized, and enriched with
          latitude and longitude coordinates. Any inconsistencies or missing
          data points were manually verified.
        </p>
      </section>

      <section id="react-building">
        <h2>3. React Building Time</h2>
        <p>
          Finally, the frontend was built in React, using Leaflet.js for the
          map visualization. Features include clickable markers, zoom, and
          popups showing company details.
        </p>
      </section>
      
    </div>
  );
};

export default About;