import { useState } from "react";

export default function HealthProfileForm() {
  const [profile, setProfile] = useState({
    age: "",
    weight: "",
    height: "",
    goal: "",
    condition: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/profile", profile, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Profile saved!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Age"
        onChange={(e) => setProfile({ ...profile, age: e.target.value })}
      />
      <input
        placeholder="Weight"
        onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
      />
      <input
        placeholder="Height"
        onChange={(e) => setProfile({ ...profile, height: e.target.value })}
      />
      <select
        onChange={(e) => setProfile({ ...profile, goal: e.target.value })}
      >
        <option value="">Select Goal</option>
        <option value="weight_loss">Weight Loss</option>
        <option value="muscle_gain">Muscle Gain</option>
        <option value="maintain">Maintain</option>
      </select>
      <input
        placeholder="Conditions (e.g., diabetes)"
        onChange={(e) => setProfile({ ...profile, condition: e.target.value })}
      />
      <button type="submit">Save</button>
    </form>
  );
}
