import { useState } from "react";
import axios from "../../services/api";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HealthProfileForm() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    age: "",
    weight: "",
    height: "",
    goal: "",
    condition: "",
    activityLevel: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await axios.post("/api/profile", profile, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to save profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-center">
            <h2 className="text-3xl font-bold text-white">Health Profile</h2>
            <p className="mt-2 text-blue-100">
              Help us personalize your experience
            </p>
          </div>

          {/* Form */}
          <div className="px-6 py-8 sm:p-10">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg border border-red-100 flex items-start"
              >
                <svg
                  className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>{error}</span>
              </motion.div>
            )}

            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-6 p-3 bg-green-50 text-green-600 rounded-lg border border-green-100 flex items-start"
              >
                <svg
                  className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>Profile saved successfully! Redirecting...</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {/* Age */}
                <div>
                  <label
                    htmlFor="age"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Age <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="age"
                      type="number"
                      min="1"
                      max="120"
                      required
                      className="block w-full pl-4 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      placeholder="e.g. 28"
                      value={profile.age}
                      onChange={(e) =>
                        setProfile({ ...profile, age: e.target.value })
                      }
                    />
                    <span className="absolute right-3 top-3 text-gray-400">
                      years
                    </span>
                  </div>
                </div>

                {/* Weight */}
                <div>
                  <label
                    htmlFor="weight"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Weight <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="weight"
                      type="number"
                      min="1"
                      step="0.1"
                      required
                      className="block w-full pl-4 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      placeholder="e.g. 68.5"
                      value={profile.weight}
                      onChange={(e) =>
                        setProfile({ ...profile, weight: e.target.value })
                      }
                    />
                    <span className="absolute right-3 top-3 text-gray-400">
                      kg
                    </span>
                  </div>
                </div>

                {/* Height */}
                <div>
                  <label
                    htmlFor="height"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Height <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="height"
                      type="number"
                      min="1"
                      required
                      className="block w-full pl-4 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                      placeholder="e.g. 175"
                      value={profile.height}
                      onChange={(e) =>
                        setProfile({ ...profile, height: e.target.value })
                      }
                    />
                    <span className="absolute right-3 top-3 text-gray-400">
                      cm
                    </span>
                  </div>
                </div>

                {/* Activity Level */}
                <div>
                  <label
                    htmlFor="activityLevel"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Activity Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="activityLevel"
                    required
                    className="block w-full pl-4 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 appearance-none"
                    value={profile.activityLevel}
                    onChange={(e) =>
                      setProfile({ ...profile, activityLevel: e.target.value })
                    }
                  >
                    <option value="">Select activity level</option>
                    <option value="sedentary">
                      Sedentary (little or no exercise)
                    </option>
                    <option value="light">
                      Light (exercise 1-3 days/week)
                    </option>
                    <option value="moderate">
                      Moderate (exercise 3-5 days/week)
                    </option>
                    <option value="active">
                      Active (exercise 6-7 days/week)
                    </option>
                    <option value="very_active">
                      Very Active (hard exercise daily)
                    </option>
                  </select>
                </div>

                {/* Goal */}
                <div>
                  <label
                    htmlFor="goal"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Primary Goal <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="goal"
                    required
                    className="block w-full pl-4 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 appearance-none"
                    value={profile.goal}
                    onChange={(e) =>
                      setProfile({ ...profile, goal: e.target.value })
                    }
                  >
                    <option value="">Select your goal</option>
                    <option value="weight_loss">Weight Loss</option>
                    <option value="muscle_gain">Muscle Gain</option>
                    <option value="maintain">Maintain Weight</option>
                    <option value="improve_endurance">Improve Endurance</option>
                    <option value="improve_flexibility">
                      Improve Flexibility
                    </option>
                  </select>
                </div>

                {/* Conditions */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="condition"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Medical Conditions
                  </label>
                  <input
                    id="condition"
                    type="text"
                    className="block w-full pl-4 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="e.g. Diabetes, High Blood Pressure"
                    value={profile.condition}
                    onChange={(e) =>
                      setProfile({ ...profile, condition: e.target.value })
                    }
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Please list any relevant medical conditions
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading || success}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ${
                    isLoading || success ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </>
                  ) : success ? (
                    "Saved!"
                  ) : (
                    "Save Profile"
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
