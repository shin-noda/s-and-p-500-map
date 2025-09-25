import React from "react";
import "./Analysis.css";

const Analysis: React.FC = () => {
  return (
    <div className="analysis-container">
      <h1 className="analysis-title">Analysis</h1>

      <p className="analysis-intro">
        This page digs into what the <strong>S&amp;P 500 Map</strong> actually
        shows. Data is from <strong>September 25, 2025</strong>. It’s not
        updated in real-time (unless future-me gets fancy ✨).
      </p>

      <h2 className="analysis-subtitle">Key Takeaways</h2>
      <ul className="analysis-list">
        <li>
          <strong>California &amp; New York dominate</strong> — Tech in the west,
          finance in the east. No surprises, but it’s cool to <em>see</em> it on
          a map.
        </li>
        <li>
          <strong>Texas is rising</strong> — Dallas, Houston, Austin — lots of
          HQs making a stand.
        </li>
        <li>
          <strong>The Midwest is alive and kicking</strong> — Chicago and nearby
          cities host plenty of corporate heavyweights.
        </li>
        <li>
          <strong>Not all in the big hubs</strong> — A handful of companies are
          tucked away in unexpected places.
        </li>
      </ul>

      <h2 className="analysis-subtitle">A Fun Thought</h2>
      <p className="analysis-fun">
        What if in 2030, every single S&amp;P 500 company decided to move to
        Florida? 🌴 Would we rename it the{" "}
        <span className="italic">Sand &amp; Palm 500</span>?
      </p>
    </div>
  );
};

export default Analysis;