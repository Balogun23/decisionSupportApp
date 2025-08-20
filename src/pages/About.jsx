import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="about-container">
      <h1>About This App</h1>
      <p>
        This Decision Support App is designed to help users choose the most suitable programming tool 
        for specific data-related tasks. Whether you're working on data cleaning, regression modelling, 
        visualisation, text mining, or SQL querying, this tool provides a tailored recommendation 
        based on your preferences
      </p>

      <h2>How It Works</h2>
      <p>
        Users select a task and adjust their preferences in terms of speed, ease of use, and memory efficiency. 
        The app then processes this information and returns a tool recommendation (e.g., Python, R, or SQL) 
        along with a breakdown of the reasoning behind the choice.
      </p>

      <h2>Why Use This App?</h2>
      <ul>
        <li>Quick decision-making support based on your specific needs</li>
        <li>Easy-to-use interface with sliders and dropdowns</li>
        <li>Backed by data science task profiling and scoring logic</li>
      </ul>

      <p>
        This project was developed as part of an academic dissertation focused on benchmarking 
        data science tools across key workflow stages such as data wrangling, modelling, and deployment.
      </p>
    </div>
  );
};

export default About;
