import React, { useState } from "react";
import { usePatientQuizFlow } from "../../lib/store/patientquizflow";

const QuizFullName = () => {
  const { fullName, setFullName } = usePatientQuizFlow();
  const [error, setError] = useState("");

  const handleNameChange = (e) => {
    const name = e.target.value;
    setFullName(name);
    // Set the error if the name is empty, otherwise clear the error
    setError(name.trim() ? "" : "Please enter at least one character.");
  };

  // Conditional class to add if there is an error
  const inputClassName = error
    ? "mb-2 p-2 border-red-500 border rounded-lg w-full focus:outline-none"
    : "mb-2 p-2 border-neutral-300 border rounded-lg w-full focus:outline-none focus:outline-none focus:border-black";

  const labelClassName = error
    ? "self-start mb-1 text-red-500 font-semibold"
    : "self-start mb-1 font-semibold";

  return (
    <div className="flex flex-col w-full sm:items-center gap-y-6 px-4">
      <div className="max-w-md text-left sm:text-center">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-4">
          What is your name?
        </h1>
      </div>
      <div className="w-full max-w-md">
        <label htmlFor="full-name" className={labelClassName}>
          Full name
        </label>
        <input
          id="full-name"
          type="text"
          value={fullName}
          placeholder="Write your full name here"
          className={inputClassName}
          onChange={handleNameChange}
        />
        <p className="text-neutral-500 text-sm self-start mb-4 w-full">
          Only letters, no symbols or special characters.
        </p>
        {/* Display error message if error state is not empty */}
        {error && <p className="text-red-500 text-sm self-start">{error}</p>}
      </div>
    </div>
  );
};

export default QuizFullName;
