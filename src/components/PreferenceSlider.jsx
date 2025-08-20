/**
 * PreferenceSlider.jsx
 *
 * Purpose:
 * --------
 * Lets the user set their preferences (Speed, Ease of Use, Memory Efficiency)
 * using range sliders (0–100). 
 *
 * Features:
 * - Users can adjust sliders manually.
 * - Preset buttons (Balanced, Speed, Memory, Ease) quickly set common profiles.
 * - Taxonomy-aware defaults:
 *   * If taxonomy is "Data Visualisation" → defaults to more ease + memory
 *   * If taxonomy is "Machine Learning" → defaults to more speed
 *   * If taxonomy is "Data Cleaning & Wrangling" → balanced bias toward memory
 *   * Otherwise → neutral 50/50/50
 *
 * Props:
 * ------
 * - preferences (object): current slider values { speed, memory, ease }
 * - setPreferences (function): updates parent state with new values
 * - taxonomy (string): current selected task category
 */

import React, { useEffect } from "react";
import "../styles/PreferenceSlider.css";

// === Preset profiles for quick selection ===
const presets = {
  balanced: { speed: 50, memory: 50, ease: 50 },
  speed: { speed: 90, memory: 50, ease: 30 },
  memory: { speed: 40, memory: 90, ease: 40 },
  ease: { speed: 40, memory: 40, ease: 90 }
};

const PreferenceSlider = ({ preferences, setPreferences, taxonomy }) => {
  
  // Automatically set defaults whenever taxonomy changes
  useEffect(() => {
    if (!taxonomy) return;

    if (taxonomy.startsWith("Data Visualisation")) {
      setPreferences({ speed: 50, memory: 80, ease: 80 });
    } else if (taxonomy.startsWith("Machine Learning")) {
      setPreferences({ speed: 80, memory: 60, ease: 40 });
    } else if (taxonomy.startsWith("Data Cleaning & Wrangling")) {
      setPreferences({ speed: 60, memory: 80, ease: 60 });
    } else {
      // Default balanced values
      setPreferences({ speed: 50, memory: 50, ease: 50 });
    }
  }, [taxonomy, setPreferences]);

  // === Helper: update one slider value ===
  const update = (key, value) => {
    setPreferences({ ...preferences, [key]: Number(value) });
  };

  // === Helper: apply a preset profile ===
  const handlePreset = (type) => {
    setPreferences(presets[type]);
  };

  return (
    <div className="slider-container">
      {/* Heading */}
      <label className="slider-heading">Set Your Preference (0 to 100)</label>

      {/* Preset buttons for quick selection */}
      <div className="preset-buttons">
        <button onClick={() => handlePreset("balanced")}>Balanced</button>
        <button onClick={() => handlePreset("speed")}>Speed Priority</button>
        <button onClick={() => handlePreset("memory")}>Memory Priority</button>
        <button onClick={() => handlePreset("ease")}>Ease Priority</button>
      </div>

      {/* === Individual Sliders === */}
      <div className="slider-group">
        <label className="slider-label">Speed</label>
        <input
          type="range"
          min="0"
          max="100"
          value={preferences.speed}
          onChange={(e) => update("speed", e.target.value)}
        />
        <p className="slider-value">Current: {preferences.speed}</p>
      </div>

      <div className="slider-group">
        <label className="slider-label">Ease of Use</label>
        <input
          type="range"
          min="0"
          max="100"
          value={preferences.ease}
          onChange={(e) => update("ease", e.target.value)}
        />
        <p className="slider-value">Current: {preferences.ease}</p>
      </div>

      <div className="slider-group">
        <label className="slider-label">Memory Efficiency</label>
        <input
          type="range"
          min="0"
          max="100"
          value={preferences.memory}
          onChange={(e) => update("memory", e.target.value)}
        />
        <p className="slider-value">Current: {preferences.memory}</p>
      </div>
    </div>
  );
};

export default PreferenceSlider;
