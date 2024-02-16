import { usePatientQuizFlow } from '../../lib/store/patientquizflow';

const QuizMedicationsStep = () => {
  const {
    onMedication,
    medicationInput,
    setOnMedication,
    setMedicationInput,
    setMedicationDetails,
    canContinueMedications,
    setCanContinueMedications,
  } = usePatientQuizFlow();

  const handleMedicationChange = (answer) => {
    setOnMedication(answer);
    // Clear the input if "No" is selected
    if (!answer) {
      setMedicationInput("");
      setMedicationDetails([]);
      setCanContinueMedications(true);
    } else {
      // If "Yes" is selected but no input is provided, disable continuation
      setCanContinueMedications(medicationInput.trim() !== "");
    }
  };

  const handleInputValueChange = (
    event
  ) => {
    const details = event.target.value;
    setMedicationInput(details);

    // Update the canContinueMedications based on whether the input has text
    setCanContinueMedications(details.trim() !== "");

    // Convert the comma-separated string to an array when the user types
    const detailsArray = details
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    setMedicationDetails(detailsArray);
  };

  return (
    <div className='flex flex-col sm:items-center px-2 sm:px-0'>
      <h2 className="text-2xl font-semibold mb-6 text-left sm:text-center max-w-2xl">
        Are you currently on any regular medications, supplements or over the
        counter products?
      </h2>

      <div className="w-full sm:w-[500px] justify-center">
        <div className="flex w-full justify-center sm:justify-start mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 w-full">
            <label
              className={`flex w-full sm:w-[242px] items-center bg-white p-4 py-3 pr-20 rounded-lg ${
                onMedication === true
                  ? "border-neutral-900 border-2"
                  : "border-neutral-300 border"
              }`}
            >
              <input
                type="radio"
                name="medications"
                className="h-4 w-4 border-neutral-300 radio-checked"
                checked={onMedication === true}
                onChange={() => handleMedicationChange(true)}
              />
              <span className="ml-4 text-neutral-900">Yes</span>
            </label>
            <label
              className={`flex w-full sm:w-[242px] items-center bg-white p-4 py-3 pr-20 rounded-lg ${
                onMedication === false
                  ? "border-neutral-900 border-2"
                  : "border-neutral-300 border"
              }`}
            >
              <input
                type="radio"
                name="medications"
                className="h-4 w-4 border-neutral-300 radio-checked"
                checked={onMedication === false}
                onChange={() => handleMedicationChange(false)}
              />
              <span className="ml-4 text-neutral-900">No</span>
            </label>
          </div>
        </div>
        {onMedication && (
          <div className="w-full max-w-lg mx-auto">
            <label
              htmlFor="medicationInput"
              className="block text-sm font-semibold text-neutral-900 mb-1"
            >
              Which medications?
            </label>
            <textarea
              placeholder="List your medications here"
              value={medicationInput}
              onChange={handleInputValueChange}
              className="p-2 bg-white border-2 border-neutral-300 rounded-lg w-full focus:outline-none focus:border-black"
              rows={3}
            />
            <p className="mt-2 text-sm text-neutral-500 text-start">
              Please separate each medication with a comma.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizMedicationsStep;
