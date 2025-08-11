import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/Knowledge.css";

const tips = [
  "💡 Python excels in versatility, great for data analysis and machine learning.",
  "💡 SQL is highly efficient for querying and managing large databases.",
  "💡 R offers powerful statistical analysis and visualization tools.",
  "💡 Optimize your workflow by choosing the right tool for the right task.",
  "💡 Consider both speed and ease of use when selecting a data tool."
];

const KnowledgeTips = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % tips.length);
    }, 4000); // Change tip every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="knowledge-tips">
      <h3>📘 Knowledge Tips</h3>
      <div className="tips-container">
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, x: 50 }}   // Start slightly right
            animate={{ opacity: 1, x: 0 }}    // Slide into place
            exit={{ opacity: 0, x: -50 }}     // Slide out to the left
            transition={{ duration: 0.5 }}
          >
            {tips[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default KnowledgeTips;
