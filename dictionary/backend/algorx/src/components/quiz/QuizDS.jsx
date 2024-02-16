import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { usePatientQuizFlow } from "../../lib/store/patientquizflow";

const QuizDS = () => {
  const {
    drinkFrequency,
    smokes,
    setDrinkFrequency,
    setSmokes,
    canDSContinue,
    setDSCanContinue,
  } = usePatientQuizFlow();

  const handleDrinkFrequencyChange = (frequency) => {
    setDrinkFrequency(frequency);
    setDSCanContinue();
  };

  const handleSmokingChange = (doesSmoke) => {
    setSmokes(doesSmoke);
    setDSCanContinue();
  };

  return (
    <div className="flex flex-col w-full sm:items-center px-2 sm:px-0 space-y-12">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col w-full sm:items-center px-2 sm:px-0">
          <h2 className="text-2xl font-semibold mb-6 text-left sm:text-center max-w-2xl">
            How often do you drink?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 w-full max-w-2xl">
            {[
              "Everyday",
              "A few times a week",
              "Rarely",
              "I don't drink at all",
            ].map((option) => (
              <label
                key={option}
                className={`flex w-full items-center bg-white p-4 py-3 pr-20 rounded-lg ${
                  drinkFrequency === option
                    ? "border-neutral-900 border-2"
                    : "border-neutral-300 border"
                }`}
              >
                <input
                  type="radio"
                  name="drinkFrequency"
                  value={option}
                  onChange={() => handleDrinkFrequencyChange(option)}
                  checked={drinkFrequency === option}
                  className="h-4 w-4 border-neutral-300 radio-checked mr-4"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
        {drinkFrequency && drinkFrequency !== "I don't drink at all" && drinkFrequency !== "Rarely" && (
          <div
            className="w-full max-w-2xl mt-2 text-sm text-neutral-900 bg-blue-100 p-2 rounded flex items-start"
            style={{
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "#3B82F6",
            }}
          >
            <AiOutlineInfoCircle
              className="text-blue-600 mr-2 -mt-1.5"
              size={32}
            />
            <span>
              Alcohol can contribute to erectile dysfunction (ED) and other
              health issues. For guidance on moderating alcohol consumption,
              please visit the{" "}
              <strong>
                <a
                  href="https://www.cdc.gov/alcohol/fact-sheets/moderate-drinking.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black underline"
                >
                  CDC's page on health tips for quitting drinking.
                </a>
              </strong>
            </span>
          </div>
        )}
      </div>

      <div className="w-full max-w-2xl">
        <div className="flex flex-col w-full sm:items-center px-2 sm:px-0">
          <h2 className="text-2xl font-semibold mb-6 text-left sm:text-center max-w-2xl">
            Do you smoke?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 w-full max-w-md">
            {["Yes", "No"].map((option) => (
              <label
                key={option}
                className={`flex w-full items-center bg-white p-4 py-3 pr-20 rounded-lg ${
                  smokes === (option === "Yes")
                    ? "border-neutral-900 border-2"
                    : "border-neutral-300 border"
                }`}
              >
                <input
                  type="radio"
                  name="smokes"
                  value={option}
                  onChange={() => handleSmokingChange(option === "Yes")}
                  checked={smokes === (option === "Yes")}
                  className="h-4 w-4 border-neutral-300 radio-checked mr-4"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
        {smokes && smokes !== "No" && (
          <div
            className="w-full max-w-2xl mt-2 text-sm text-neutral-900 bg-blue-100 p-2 rounded flex items-start"
            style={{
              borderStyle: "solid",
              borderWidth: "1px",
              borderColor: "#3B82F6",
            }}
          >
            <AiOutlineInfoCircle
              className="text-blue-600 mr-2 -mt-1.5"
              size={32}
            />
            <span>
              Smoking can contribute to erectile dysfunction (ED) and other
              health issues. For assistance with smoking cessation, please refer
              to the{" "}
              <strong>
                <a
                  href="https://www.cdc.gov/tobacco/campaign/tips/quit-smoking/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black underline"
                >
                  CDC's advice on health tips for quitting smoking.
                </a>
              </strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizDS;
