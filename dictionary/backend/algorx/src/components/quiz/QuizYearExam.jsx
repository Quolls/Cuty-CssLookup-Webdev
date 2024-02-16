import { usePatientQuizFlow } from "../../lib/store/patientquizflow";

const QuizYearExam = () => {
  const {
    hasYearExam,
    yearExamInput,
    setHasYearExam,
    setYearExamInput,
    setYearExamDetails,
    canContinueYearExam,
    setCanContinueYearExam,
  } = usePatientQuizFlow();

  const handleYearExamChange = (answer) => {
    setHasYearExam(answer);
    // Clear the input if "No" is selected
    if (!answer) {
      setYearExamInput("");
      setYearExamDetails([]);
      setCanContinueYearExam(true);
    } else {
      // If "Yes" is selected but no input is provided, disable continuation
      setCanContinueYearExam(yearExamInput.trim() !== "");
    }
  };

  const handleInputValueChange = (event) => {
    const details = event.target.value;
    setYearExamInput(details);

    // Update the canContinueYearExam based on whether the input has text
    setCanContinueYearExam(details.trim() !== "");

    // Convert the comma-separated string to an array when the user types
    const detailsArray = details
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    setYearExamDetails(detailsArray);
  };

  return (
    <div className="flex flex-col w-full sm:items-center px-2 sm:px-0">
      <h2 className="text-2xl font-semibold mb-6 text-left sm:text-center max-w-xl">
        Have you had a physical exam by a healthcare provider within the last 2
        years that included a genital exam?
      </h2>

      <div className="w-full sm:w-[500px] justify-center">
        <div className="flex w-full justify-center sm:justify-start mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 w-full">
            <label
              className={`flex w-full sm:w-[242px] items-center bg-white p-4 py-3 pr-20 rounded-lg ${
                hasYearExam === true
                  ? "border-neutral-900 border-2"
                  : "border-neutral-300 border"
              }`}
            >
              <input
                type="radio"
                name="YearExam"
                className="h-4 w-4 border-neutral-300 radio-checked"
                checked={hasYearExam === true}
                onChange={() => handleYearExamChange(true)}
              />
              <span className="ml-4 text-neutral-900">Yes</span>
            </label>
            <label
              className={`flex w-full sm:w-[242px] items-center bg-white p-4 py-3 pr-20 rounded-lg ${
                hasYearExam === false
                  ? "border-neutral-900 border-2"
                  : "border-neutral-300 border"
              }`}
            >
              <input
                type="radio"
                name="YearExam"
                className="h-4 w-4 border-neutral-300 radio-checked"
                checked={hasYearExam === false}
                onChange={() => handleYearExamChange(false)}
              />
              <span className="ml-4 text-neutral-900">No</span>
            </label>
          </div>
        </div>
        {hasYearExam && (
          <div className="w-full max-w-lg mx-auto">
            <label
              htmlFor="yearExamInput"
              className="block text-sm font-semibold text-neutral-900 mb-1"
            >
              Please list
            </label>
            <textarea
              placeholder="List the exams here"
              value={yearExamInput}
              onChange={handleInputValueChange}
              className="p-2 bg-white border-2 border-neutral-300 rounded-lg w-full focus:outline-none focus:border-black"
              rows={3}
            />
            <p className="mt-2 text-sm text-neutral-500 text-start">
              Please separate each exam with a comma.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizYearExam;
