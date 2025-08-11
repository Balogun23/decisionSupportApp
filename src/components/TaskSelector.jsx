import React from "react";
import "../styles/TaskSelector.css";

const TaskSelector = ({ tasks, taxonomy, setTaxonomy, subtask, setSubtask }) => {
  return (
    <div className="task-selector">
      <label htmlFor="taxonomy" className="task-label">Select Taxonomy</label>
      <select
        id="taxonomy"
        className="task-dropdown"
        value={taxonomy}
        onChange={(e) => {
          const selected = e.target.value;
          setTaxonomy(selected);
          setSubtask(tasks[selected]?.[0] || "");
        }}
      >
        {Object.keys(tasks).map((tax) => (
          <option key={tax} value={tax}>
            {tax}
          </option>
        ))}
      </select>

      <label htmlFor="subtask" className="task-label">Select Subtask</label>
      <select
        id="subtask"
        className="task-dropdown"
        value={subtask}
        onChange={(e) => setSubtask(e.target.value)}
      >
        {tasks[taxonomy]?.map((task) => (
          <option key={task} value={task}>
            {task}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TaskSelector;
