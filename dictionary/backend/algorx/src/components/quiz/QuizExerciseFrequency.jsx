import React from "react";
import { usePatientQuizFlow } from "../../lib/store/patientquizflow";

const QuizExerciseFrequency = () => {
  const { exerciseFrequency, setExerciseFrequency } = usePatientQuizFlow();

  const handleExerciseFrequencyChange = (frequency) => {
    setExerciseFrequency(frequency);
  };

  return (
    <div className="flex flex-col w-full sm:items-center px-2 sm:px-0">
      <h2 className="text-2xl font-semibold mb-6 text-left sm:text-center max-w-2xl">
        How often do you exercise per week?
      </h2>
      <div className="flex flex-col gap-4 py-2 w-full max-w-md">
        {["Everyday", "A few times a week", "Rarely"].map((option) => (
          <label
            key={option}
            className={`flex w-full items-center bg-white p-4 py-3 pr-20 rounded-lg ${
              exerciseFrequency === option
                ? "border-neutral-900 border-2"
                : "border-neutral-300 border"
            }`}
          >
            <input
              type="radio"
              name="exerciseFrequency"
              value={option}
              onChange={() => handleExerciseFrequencyChange(option)}
              checked={exerciseFrequency === option}
              className="h-4 w-4 border-neutral-300 radio-checked mr-4"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuizExerciseFrequency;
