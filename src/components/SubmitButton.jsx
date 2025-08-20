/**
 * SubmitButton.jsx
 *
 * Purpose:
 * --------
 * This component renders a button that, when clicked,
 * sends the user's selections (taxonomy, subtask, preferences) 
 * to the backend API and retrieves a recommendation.
 *
 * Workflow:
 * ---------
 * 1. User clicks "Get Recommendation".
 * 2. Sends a POST request to `${apiBase}/recommend` with:
 *    - taxonomy (string)   → main task category
 *    - subtask (string)    → optional detailed task (if in expert mode)
 *    - preferences (object)→ user's slider settings (speed, ease, memory)
 * 3. If successful, the result is passed back via `onResult`.
 * 4. If it fails, an error is logged and an alert notifies the user.
 *
 * Props:
 * ------
 * - taxonomy (string): selected task category
 * - subtask (string | null): optional detailed task
 * - preferences (object): user slider values
 * - onResult (function): callback to pass the recommendation result up
 * - disabled (boolean): whether the button should be disabled
 * - apiBase (string): base URL for the backend API
 */

export default function SubmitButton({
  taxonomy,
  subtask,
  preferences,
  onResult,
  disabled,
  apiBase
}) {
  
  // === Handles click event (sends data to API) ===
  const handleSubmit = async () => {
    try {
      // Send POST request to backend
      const response = await fetch(`${apiBase}/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taxonomy, subtask, preferences })
      });

      // If API responds with an error status
      if (!response.ok) {
        throw new Error("Failed to get recommendation");
      }

      // Parse JSON result
      const data = await response.json();

      // Send data back to parent (Home.jsx)
      onResult(data);
    } catch (error) {
      // Log error in console for debugging
      console.error("Error:", error.message);

      // Show user-friendly alert
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <button
      onClick={handleSubmit}
      className="submit-btn"
      disabled={disabled} // Button disabled if required fields not ready
    >
      Get Recommendation
    </button>
  );
}
