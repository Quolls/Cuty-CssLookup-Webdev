import React from "react";
import { usePatientQuizFlow } from "../../lib/store/patientquizflow";

const levels = {
  Low: "bg-[#EFF6FF] text-blue-800",
  Lower: "bg-[#E8FFFA] text-teal-800",
  Normal: "bg-[#F0FDF4] text-green-600",
  High: "bg-[#FEFCE8] text-yellow-800",
  "Very high": "bg-[#FEF2F2] text-red-800",
};
const borderColor = {
  Low: "#3B82F6",
  Lower: "#0D9488",
  Normal: "#16A34A",
  High: "#EAB308",
  "Very high": "#EF4444",
};
const dotlevels = {
  Low: "fill-blue-500",
  Lower: "fill-teal-700",
  Normal: "fill-green-700",
  High: "fill-yellow-400",
  "Very high": "fill-red-600",
};

const QuizSystolicDiastolic = () => {
  const {
    systolicNumber,
    diastolicNumber,
    setSystolicNumber,
    setDiastolicNumber,
  } = usePatientQuizFlow();

  const systolicOptions = [
    { value: "<90", label: "Less than 90", level: "Low" },
    { value: "90-109", label: "90-109", level: "Lower" },
    { value: "110-140", label: "110-140", level: "Normal" },
    { value: "141-160", label: "141-160", level: "High" },
    { value: ">160", label: "Greater than 160", level: "Very high" },
  ];

  const diastolicOptions = [
    { value: "<60", label: "Less than 60", level: "Low" },
    { value: "60-69", label: "60-69", level: "Lower" },
    { value: "70-85", label: "70-85", level: "Normal" },
    { value: "86-95", label: "86-95", level: "High" },
    { value: ">95", label: "Greater than 95", level: "Very high" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl text-neutral-900 font-semibold mb-4 text-center">
        What was your last blood pressure reading?
      </h2>
      <p className="text-sm text-neutral-900 w-full max-w-2xl mx-auto mb-8 text-center">
        To properly evaluate you for your treatment, we require a recent blood
        pressure reading taken within the last 6 months.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div>
          <h3 className="text-2xl text-neutral-900 font-semibold mb-2 text-center">
            What is your systolic number?
          </h3>
          <p className="mb-4 text-sm text-neutral-900 text-center">
            Top Number
          </p>
          <div className="flex flex-col gap-2 w-full max-w-xl">
            {systolicOptions.map((option) => (
              <label
                key={option.value}
                className={`flex w-full items-center bg-white p-4 py-3 pr-20 rounded-lg ${
                  systolicNumber === option.value
                    ? "border-neutral-900 border-2"
                    : "border-neutral-300 border"
                }`}
              >
                <input
                  type="radio"
                  name="systolicNumber"
                  value={option.value}
                  onChange={() => setSystolicNumber(option.value)}
                  checked={systolicNumber === option.value}
                  className="h-4 w-4 border-neutral-300 radio-checked mr-4"
                />

                <span className="flex-grow">{option.label}</span>
                <span
                  className={`inline-flex items-center gap-x-1.5 justify-between rounded-full px-3 py-1 text-sm font-medium ${
                    levels[option.level]
                  }`}
                  style={{
                    borderStyle: "solid",
                    borderWidth: "1px",
                    borderColor: borderColor[option.level],
                  }}
                >
                  <svg
                    className={`h-1.5 w-1.5 ${dotlevels[option.level]}`}
                    viewBox="0 0 6 6"
                    aria-hidden="true"
                  >
                    <circle cx={3} cy={3} r={3} />
                  </svg>
                  {option.level}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl text-neutral-900 font-semibold mb-2 text-center">
            What is your diastolic number?
          </h3>
          <p className="mb-4 text-sm text-neutral-900 text-center">
            Bottom Number
          </p>
          <div className="flex flex-col gap-2 w-full max-w-xl">
            {diastolicOptions.map((option) => (
              <label
                key={option.value}
                className={`flex w-full items-center bg-white p-4 py-3 pr-20 rounded-lg ${
                  diastolicNumber === option.value
                    ? "border-neutral-900 border-2"
                    : "border-neutral-300 border"
                }`}
              >
                <input
                  type="radio"
                  name="diastolicNumber"
                  value={option.value}
                  onChange={() => setDiastolicNumber(option.value)}
                  checked={diastolicNumber === option.value}
                  className="h-4 w-4 border-neutral-300 radio-checked mr-4"
                />
                <span className="flex-grow">{option.label}</span>
                <span
                  className={`inline-flex items-center gap-x-1.5 justify-between rounded-full px-3 py-1 text-sm font-medium ${
                    levels[option.level]
                  }`}
                  style={{
                    borderStyle: "solid",
                    borderWidth: "1px",
                    borderColor: borderColor[option.level],
                  }}
                >
                  <svg
                    className={`h-1.5 w-1.5 ${dotlevels[option.level]}`}
                    viewBox="0 0 6 6"
                    aria-hidden="true"
                  >
                    <circle cx={3} cy={3} r={3} />
                  </svg>
                  {option.level}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizSystolicDiastolic;
