import React, { useEffect, useState } from "react";
import PreferenceSlider from "../components/PreferenceSlider";
import TaskSelector from "../components/TaskSelector";
import SubmitButton from "../components/SubmitButton";
import KnowledgeTips from "../components/KnowledgeTips";
import Modal from "../components/Modal";
import Tabs from "../components/Tabs"; 
import "../styles/Home.css";

const Home = () => {
  const [tasks, setTasks] = useState({});
  const [taxonomy, setTaxonomy] = useState("");
  const [subtask, setSubtask] = useState("");
  const [recommendation, setRecommendation] = useState(null);
  const [hybridFlow, setHybridFlow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("beginner");
  const [preferences, setPreferences] = useState({
    speed: 50,
    ease: 50,
    memory: 50,
  });

  // ✅ Base API URL from Vite environment variable
  const API = import.meta.env.VITE_API_BASE_URL;

  // Fetch taxonomy/subtasks
  useEffect(() => {
    fetch(`${API}/metadata/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        const firstTaxonomy = Object.keys(data)[0];
        const firstSubtask = data[firstTaxonomy][0];
        setTaxonomy(firstTaxonomy);
        setSubtask(firstSubtask);
      })
      .catch((err) => console.error("Error loading tasks:", err));
  }, [API]);

  // Reset selections
  const handleReset = () => {
    if (taxonomy && tasks[taxonomy]) {
      setSubtask(tasks[taxonomy][0]);
    }
    setPreferences({ speed: 50, ease: 50, memory: 50 });
    setRecommendation(null);
    setHybridFlow(null);
    setIsModalOpen(false);
  };

  const handleSingleRecommendation = (result) => {
    setRecommendation(result);
    setIsModalOpen(true);
  };

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

      {/* Mode Toggle */}
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
        {/* Main Selection Area */}
        <div className="main-box">
          <TaskSelector
            tasks={tasks}
            taxonomy={taxonomy}
            setTaxonomy={setTaxonomy}
            subtask={subtask}
            setSubtask={setSubtask}
          />

          <PreferenceSlider
            preferences={preferences}
            setPreferences={setPreferences}
            taxonomy={taxonomy}
          />

          <p className="placeholder">
            💡 Select a taxonomy
            {mode === "expert" && ", choose a subtask"}, set your preferences
            and click <strong>Get Recommendation</strong> to find the best tool
            for your needs.
          </p>

          <SubmitButton
            taxonomy={taxonomy}
            subtask={mode === "expert" ? subtask : null}
            preferences={preferences}
            onResult={handleSingleRecommendation}
            disabled={!taxonomy || (mode === "expert" && !subtask)}
          />
          
          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>

        {/* Knowledge Tips Sidebar */}
        <div className="side-box">
          <KnowledgeTips />
        </div>
      </div>

      {/* Modal for Recommendations */}
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
