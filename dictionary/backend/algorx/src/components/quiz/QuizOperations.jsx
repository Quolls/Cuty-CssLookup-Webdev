import { usePatientQuizFlow } from "../../lib/store/patientquizflow";

const QuizOperations = () => {
  const {
    hasOperations,
    operationsInput,
    setHasOperations,
    setOperationsInput,
    setOperationsDetails,
    canContinueOperations,
    setCanContinueOperations,
  } = usePatientQuizFlow();

  const handleOperationsChange = (answer) => {
    setHasOperations(answer);
    // Clear the input if "No" is selected
    if (!answer) {
      setOperationsInput("");
      setOperationsDetails([]);
      setCanContinueOperations(true);
    } else {
      // If "Yes" is selected but no input is provided, disable continuation
      setCanContinueOperations(operationsInput.trim() !== "");
    }
  };

  const handleInputValueChange = (event) => {
    const details = event.target.value;
    setOperationsInput(details);

    // Update the canContinueOperations based on whether the input has text
    setCanContinueOperations(details.trim() !== "");

    // Convert the comma-separated string to an array when the user types
    const detailsArray = details
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    setOperationsDetails(detailsArray);
  };

  return (
    <div className="flex flex-col w-full sm:items-center px-2 sm:px-0">
      <h2 className="text-2xl font-semibold mb-6 text-left sm:text-center max-w-xl">
        Are there any operations or illnesses that you have currently or have
        had previously?
      </h2>
      <p className='text-xl text-neutral-500 font-normal mb-6 text-left sm:text-center max-w-xl'>
        This will help the prescriber in deciding on a prescription suitable for
        you.
      </p>
      <div className="w-full sm:w-[500px] justify-center">
        <div className="flex w-full justify-center sm:justify-start mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 w-full">
            <label
              className={`flex w-full sm:w-[242px] items-center bg-white p-4 py-3 pr-20 rounded-lg ${
                hasOperations === true
                  ? "border-neutral-900 border-2"
                  : "border-neutral-300 border"
              }`}
            >
              <input
                type="radio"
                name="Operations"
                className="h-4 w-4 border-neutral-300 radio-checked"
                checked={hasOperations === true}
                onChange={() => handleOperationsChange(true)}
              />
              <span className="ml-4 text-neutral-900">Yes</span>
            </label>
            <label
              className={`flex w-full sm:w-[242px] items-center bg-white p-4 py-3 pr-20 rounded-lg ${
                hasOperations === false
                  ? "border-neutral-900 border-2"
                  : "border-neutral-300 border"
              }`}
            >
              <input
                type="radio"
                name="Operations"
                className="h-4 w-4 border-neutral-300 radio-checked"
                checked={hasOperations === false}
                onChange={() => handleOperationsChange(false)}
              />
              <span className="ml-4 text-neutral-900">No</span>
            </label>
          </div>
        </div>
        {hasOperations && (
          <div className="w-full max-w-lg mx-auto">
            <label
              htmlFor="operationsInput"
              className="block text-sm font-semibold text-neutral-900 mb-1"
            >
              Please list
            </label>
            <textarea
              placeholder="List your conditions here"
              value={operationsInput}
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

export default QuizOperations;
