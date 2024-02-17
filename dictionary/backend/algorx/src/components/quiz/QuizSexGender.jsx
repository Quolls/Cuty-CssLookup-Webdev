import React, { useState } from 'react';
import { usePatientQuizFlow } from '../../lib/store/patientquizflow';

const options = {
  sexAtBirth: ["Male", "Female"],
};

const QuizSexGender = () => {
  const { sexAtBirth, setSexAtBirth } = usePatientQuizFlow();

  return (
    <div className="flex flex-col w-full sm:max-w-xl sm:items-center px-2 sm:px-0">
      <h2 className="text-2xl font-semibold mb-6 text-left sm:text-center">
        What was your sex at birth?
      </h2>
      <div className="w-full sm:w-[500px] mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {options.sexAtBirth.map((option) => (
            <label
              key={option}
              className={`flex items-center p-4 py-3 bg-white text-base rounded-lg ${
                sexAtBirth === option
                  ? "border-neutral-900 border-2"
                  : "border-neutral-300 border"
              }`}
            >
              <input
                type="radio"
                value={option}
                checked={sexAtBirth === option}
                onChange={() => setSexAtBirth(option)}
                className="h-4 w-4 border-neutral-300 radio-checked"
              />
              <span className="ml-2 sm:ml-3">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizSexGender;
