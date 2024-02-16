import { usePatientQuizFlow } from "../../lib/store/patientquizflow";

const QuizRegularMedications = () => {
  const {
    hasRegularMedications,
    regularMedicationsInput,
    setHasRegularMedications,
    setRegularMedicationsInput,
    setRegularMedicationsDetails,
    canContinueRegularMedications,
    setCanContinueRegularMedications,
  } = usePatientQuizFlow();

  const handleRegularMedicationsChange = (answer) => {
    setHasRegularMedications(answer);
    // Clear the input if "No" is selected
    if (!answer) {
      setRegularMedicationsInput("");
      setRegularMedicationsDetails([]);
      setCanContinueRegularMedications(true);
    } else {
      // If "Yes" is selected but no input is provided, disable continuation
      setCanContinueRegularMedications(regularMedicationsInput.trim() !== "");
    }
  };

  const handleInputValueChange = (event) => {
    const details = event.target.value;
    setRegularMedicationsInput(details);

    // Update the canContinueRegularMedications based on whether the input has text
    setCanContinueRegularMedications(details.trim() !== "");

    // Convert the comma-separated string to an array when the user types
    const detailsArray = details
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    setRegularMedicationsDetails(detailsArray);
  };

  return (
    <div className="flex flex-col w-full sm:items-center px-2 sm:px-0">
      <h2 className="text-2xl font-semibold mb-6 text-left sm:text-center max-w-xl">
        Are you currently on any regular medications, supplements or over the
        counter products?
      </h2>

      <div className="w-full sm:w-[500px] justify-center">
        <div className="flex w-full justify-center sm:justify-start mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 w-full">
            <label
              className={`flex w-full sm:w-[242px] items-center bg-white p-4 py-3 pr-20 rounded-lg ${
                hasRegularMedications === true
                  ? "border-neutral-900 border-2"
                  : "border-neutral-300 border"
              }`}
            >
              <input
                type="radio"
                name="RegularMedications"
                className="h-4 w-4 border-neutral-300 radio-checked"
                checked={hasRegularMedications === true}
                onChange={() => handleRegularMedicationsChange(true)}
              />
              <span className="ml-4 text-neutral-900">Yes</span>
            </label>
            <label
              className={`flex w-full sm:w-[242px] items-center bg-white p-4 py-3 pr-20 rounded-lg ${
                hasRegularMedications === false
                  ? "border-neutral-900 border-2"
                  : "border-neutral-300 border"
              }`}
            >
              <input
                type="radio"
                name="RegularMedications"
                className="h-4 w-4 border-neutral-300 radio-checked"
                checked={hasRegularMedications === false}
                onChange={() => handleRegularMedicationsChange(false)}
              />
              <span className="ml-4 text-neutral-900">No</span>
            </label>
          </div>
        </div>
        {hasRegularMedications && (
          <div className="w-full max-w-lg mx-auto">
            <label
              htmlFor="regularMedicationsInput"
              className="block text-sm font-semibold text-neutral-900 mb-1"
            >
              Please list
            </label>
            <textarea
              placeholder="List your conditions here"
              value={regularMedicationsInput}
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

export default QuizRegularMedications;
