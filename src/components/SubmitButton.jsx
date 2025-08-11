export default function SubmitButton({ taxonomy, subtask, preferences, onResult, disabled }) {
  const handleSubmit = async () => {
    try {
      const response = await fetch(`${apiBase}/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taxonomy, subtask, preferences })
      });

      if (!response.ok) {
        throw new Error("Failed to get recommendation");
      }

      const data = await response.json();
      onResult(data);
    } catch (error) {
      console.error("Error:", error.message);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <button
      onClick={handleSubmit}
      className="submit-btn"
      disabled={disabled}
    >
      Get Recommendation
    </button>
  );
}
