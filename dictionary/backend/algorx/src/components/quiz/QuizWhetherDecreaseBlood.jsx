import { usePatientQuizFlow } from "../../lib/store/patientquizflow";

export default function QuizWhetherDecreaseBlood() {
  const { whetherDecreaseBlood, setWhetherDecreaseBlood } =
    usePatientQuizFlow();

  return (
    <div className="flex flex-col sm:items-center px-2 sm:px-0 gap-4 py-3">
      <h1 className="text-2xl font-semibold max-w-xl mb-4 text-left sm:text-center">
        Have you experienced a decrease in blood flow (pumps and vascularity)
        while exercising?{" "}
      </h1>
      <div className="w-full sm:w-[500px] justify-center">
        <div className="flex w-full justify-center sm:justify-start mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 w-full">
            <label
              className={`flex w-full sm:w-[242px] items-center bg-white p-4 py-3 pr-20 rounded-lg ${
                whetherDecreaseBlood === true
                  ? "border-neutral-900 border-2"
                  : "border-neutral-300 border"
              }`}
            >
              <input
                type="radio"
                name="allergies"
                className="h-4 w-4 border-neutral-300 radio-checked"
                checked={whetherDecreaseBlood === true}
                onChange={() => setWhetherDecreaseBlood(true)}
              />
              <span className="ml-4 text-neutral-900">Yes</span>
            </label>
            <label
              className={`flex w-full sm:w-[242px] items-center bg-white p-4 py-3 pr-20 rounded-lg ${
                whetherDecreaseBlood === false
                  ? "border-neutral-900 border-2"
                  : "border-neutral-300 border"
              }`}
            >
              <input
                type="radio"
                name="allergies"
                className="h-4 w-4 border-neutral-300 radio-checked"
                checked={whetherDecreaseBlood === false}
                onChange={() => setWhetherDecreaseBlood(false)}
              />
              <span className="ml-4 text-neutral-900">No</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
