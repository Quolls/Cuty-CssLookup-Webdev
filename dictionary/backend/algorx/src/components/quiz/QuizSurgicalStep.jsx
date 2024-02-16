import { usePatientQuizFlow } from '../../lib/store/patientquizflow';

const QuizSurgicalConditionsStep = () => {
  const {
    hasSurgicalConditions,
    surgicalConditionInput,
    setHasSurgicalConditions,
    setSurgicalConditionInput,
    setSurgicalConditionDetails,
    canContinueSurgicalConditions,
    setCanContinueSurgicalConditions,
  } = usePatientQuizFlow();

  const handleSurgicalConditionChange = (answer) => {
    setHasSurgicalConditions(answer);
    // Clear the input if "No" is selected
    if (!answer) {
      setSurgicalConditionInput("");
      setSurgicalConditionDetails([]);
      setCanContinueSurgicalConditions(true);
    } else {
      // If "Yes" is selected but no input is provided, disable continuation
      setCanContinueSurgicalConditions(surgicalConditionInput.trim() !== "");
    }
  };

  const handleInputValueChange = (
    event
  ) => {
    const details = event.target.value;
    setSurgicalConditionInput(details);

    // Update the canContinueSurgicalConditions based on whether the input has text
    setCanContinueSurgicalConditions(details.trim() !== "");

    // Convert the comma-separated string to an array when the user types
    const detailsArray = details
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    setSurgicalConditionDetails(detailsArray);
  };

  return (
    <div className="flex flex-col sm:items-center px-2 sm:px-0">
      <h2 className="text-2xl font-semibold mb-6 text-left sm:text-center max-w-2xl">
        Do you have any underlying medical or past surgical conditions we need
        to know about?
      </h2>

      <div className="w-full sm:w-[500px] justify-center">
        <div className="flex w-full justify-center sm:justify-start mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 w-full">
            <label
              className={`flex w-full sm:w-[242px] items-center bg-white p-4 py-3 pr-20 rounded-lg ${
                hasSurgicalConditions === true
                  ? "border-neutral-900 border-2"
                  : "border-neutral-300 border"
              }`}
            >
              <input
                type="radio"
                name="surgicalConditions"
                className="h-4 w-4 border-neutral-300 radio-checked"
                checked={hasSurgicalConditions === true}
                onChange={() => handleSurgicalConditionChange(true)}
              />
              <span className="ml-4 text-neutral-900">Yes</span>
            </label>
            <label
              className={`flex w-full sm:w-[242px] items-center bg-white p-4 py-3 pr-20 rounded-lg ${
                hasSurgicalConditions === false
                  ? "border-neutral-900 border-2"
                  : "border-neutral-300 border"
              }`}
            >
              <input
                type="radio"
                name="surgicalConditions"
                className="h-4 w-4 border-neutral-300 radio-checked"
                checked={hasSurgicalConditions === false}
                onChange={() => handleSurgicalConditionChange(false)}
              />
              <span className="ml-4 text-neutral-900">No</span>
            </label>
          </div>
        </div>
        {hasSurgicalConditions && (
          <div className="w-full max-w-lg mx-auto">
            <label
              htmlFor="surgicalConditionInput"
              className="block text-sm font-semibold text-neutral-900 mb-1"
            >
              Which conditions?
            </label>
            <textarea
              placeholder="List your conditions here"
              value={surgicalConditionInput}
              onChange={handleInputValueChange}
              className="p-2 bg-white border-2 border-neutral-300 rounded-lg w-full focus:outline-none focus:border-black"
              rows={3}
            />
            <p className="mt-2 text-sm text-neutral-500 text-start">
              Please separate each condition with a comma.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizSurgicalConditionsStep;
