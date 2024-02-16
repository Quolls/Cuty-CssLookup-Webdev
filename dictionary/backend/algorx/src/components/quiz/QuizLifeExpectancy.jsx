import { usePatientQuizFlow } from '../../lib/store/patientquizflow';


export default function QuizLifeExpectancy() {
  const { lifeExpectancy, setLifeExpectancy } = usePatientQuizFlow();

  const handleLifeExpectancyChange = (value) => {
    setLifeExpectancy(value);
  };

  return (
    <div className="flex flex-col sm:items-center px-2 sm:px-0">
      <h2 className="text-2xl font-semibold mb-6 text-left sm:text-center max-w-2xl">
        Are you in palliative care or do you have a life expectancy of less than
        12 months?
      </h2>
      <div className="w-full sm:w-[500px] justify-center">
        <div className="flex w-full justify-center sm:justify-start mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 w-full">
            <label
              className={`flex w-full sm:w-[242px] items-center bg-white p-4 py-3 pr-20 rounded-lg ${
                lifeExpectancy === true
                  ? "border-neutral-900 border-2"
                  : "border-neutral-300 border"
              }`}
            >
              <input
                type="radio"
                name="handleLifeExpectancy"
                className="h-4 w-4 border-neutral-300 radio-checked"
                value="yes"
                checked={lifeExpectancy === true}
                onChange={() => handleLifeExpectancyChange(true)}
              />
              <span className="ml-4 text-neutral-900">Yes</span>
            </label>
            <label
              className={`flex w-full sm:w-[242px] items-center bg-white p-4 py-3 pr-20 rounded-lg ${
                lifeExpectancy === false
                  ? "border-neutral-900 border-2"
                  : "border-neutral-300 border"
              }`}
            >
              <input
                type="radio"
                name="handleLifeExpectancy"
                className="h-4 w-4 border-neutral-300 radio-checked"
                value="no"
                checked={lifeExpectancy === false}
                onChange={() => handleLifeExpectancyChange(false)}
              />
              <span className="ml-4 text-neutral-900">No</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
