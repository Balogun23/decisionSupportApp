/**
 * Home.jsx
 * 
 * This is the main landing page of the app. 
 * It lets the user:
 *  1. Pick "Beginner" or "Expert" mode.
 *  2. Select a taxonomy (and subtask, if in Expert mode).
 *  3. Adjust preferences with sliders.
 *  4. Submit the form to get a recommended tool.
 *  5. See results in a modal, with options for single-tool or hybrid workflows.
 */

import { useEffect, useState } from "react";
import PreferenceSlider from "../components/PreferenceSlider";
import TaskSelector from "../components/TaskSelector";
import SubmitButton from "../components/SubmitButton";
import KnowledgeTips from "../components/KnowledgeTips";
import Modal from "../components/Modal";
import Tabs from "../components/Tabs"; 
import "../styles/Home.css";

const Home = () => {
  // === State variables ===
  // tasks: holds all available taxonomies & subtasks (fetched from API)
  const [tasks, setTasks] = useState({});
  // currently chosen taxonomy & subtask
  const [taxonomy, setTaxonomy] = useState("");
  const [subtask, setSubtask] = useState("");
  // results from API
  const [recommendation, setRecommendation] = useState(null); // single tool recommendation
  const [hybridFlow, setHybridFlow] = useState(null);         // hybrid workflow recommendation
  // modal control (open/close)
  const [isModalOpen, setIsModalOpen] = useState(false);
  // beginner vs expert mode
  const [mode, setMode] = useState("beginner");
  // user preferences (sliders)
  const [preferences, setPreferences] = useState({
    speed: 50,
    ease: 50,
    memory: 50,
  });

  // env keys that connect the frontend to the backend
  const API = import.meta.env.VITE_API_BASE_URL;

  // === Fetch taxonomy & subtasks on page load ===
  useEffect(() => {
    fetch(`${API}/metadata/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);

        // auto-select the first taxonomy + subtask for convenience
        const firstTaxonomy = Object.keys(data)[0];
        const firstSubtask = data[firstTaxonomy][0];
        setTaxonomy(firstTaxonomy);
        setSubtask(firstSubtask);
      })
      .catch((err) => console.error("Error loading tasks:", err));
  }, [API]);

  // === Reset selections ===
  const handleReset = () => {
    // reset subtask if available
    if (taxonomy && tasks[taxonomy]) {
      setSubtask(tasks[taxonomy][0]);
    }
    // reset sliders
    setPreferences({ speed: 50, ease: 50, memory: 50 });
    // clear results and modal
    setRecommendation(null);
    setHybridFlow(null);
    setIsModalOpen(false);
  };

  // === Callback for single recommendation result ===
  const handleSingleRecommendation = (result) => {
    setRecommendation(result);
    setIsModalOpen(true); // open modal when results are ready
  };

  // === Fetch hybrid workflow (multi-tool pipeline) ===
  const fetchHybrid = () => {
    fetch(`${API}/recommend/hybrid`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taxonomy, preferences }),
    })
      .then((res) => res.json())
      .then((data) => setHybridFlow(data))
      .catch((err) => console.error("Error fetching hybrid workflow:", err));
  };

  return (
    <div className="home-container">
      <h1>Tool Selector</h1>

      {/* === Mode Toggle (Beginner vs Expert) === */}
      <div className="mode-toggle">
        <label>
          <input
            type="radio"
            name="mode"
            value="beginner"
            checked={mode === "beginner"}
            onChange={() => setMode("beginner")}
          />{" "}
          Beginner Mode – Pick taxonomy & preferences only
        </label>

        <label style={{ marginLeft: "15px" }}>
          <input
            type="radio"
            name="mode"
            value="expert"
            checked={mode === "expert"}
            onChange={() => setMode("expert")}
          />{" "}
          Expert Mode – Pick taxonomy, subtask & preferences
        </label>
      </div>

      <div className="result-layout">
        {/* === Main Selection Area === */}
        <div className="main-box">
          {/* Dropdowns for taxonomy + subtask */}
          <TaskSelector
            tasks={tasks}
            taxonomy={taxonomy}
            setTaxonomy={setTaxonomy}
            subtask={subtask}
            setSubtask={setSubtask}
          />

          {/* Preference sliders (speed, ease, memory) */}
          <PreferenceSlider
            preferences={preferences}
            setPreferences={setPreferences}
            taxonomy={taxonomy}
          />

          {/* Instruction text */}
          <p className="placeholder">
            💡 Select a taxonomy
            {mode === "expert" && ", choose a subtask"}, set your preferences,
            and click <strong>Get Recommendation</strong> to find the best tool
            for your needs.
          </p>

          {/* Submit button */}
          <SubmitButton
            taxonomy={taxonomy}
            subtask={mode === "expert" ? subtask : null}
            preferences={preferences}
            onResult={handleSingleRecommendation}
            disabled={!taxonomy || (mode === "expert" && !subtask)}
            apiBase={API}
          />
          
          {/* Reset button */}
          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>

        {/* === Sidebar with Knowledge Tips === */}
        <div className="side-box">
          <KnowledgeTips />
        </div>
      </div>

      {/* === Modal for displaying results (single + hybrid tabs) === */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Tabs
          singleToolData={recommendation}
          hybridData={hybridFlow}
          onHybridSelected={fetchHybrid}
          taxonomy={taxonomy}
          subtask={subtask}
          metrics={preferences}
        />
      </Modal>
    </div>
  );
};

export default Home;
