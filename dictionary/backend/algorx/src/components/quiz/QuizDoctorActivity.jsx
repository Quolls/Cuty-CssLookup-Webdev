import { AiOutlineInfoCircle } from "react-icons/ai";
import { usePatientQuizFlow } from "../../lib/store/patientquizflow";

export default function QuizDoctorActivity() {
  const { whetherDoctorActivity, setWhetherDoctorActivity } =
    usePatientQuizFlow();

  return (
    <div className="flex flex-col sm:items-center px-2 sm:px-0 gap-4 py-3">
      <h1 className="text-2xl font-semibold max-w-xl mb-4 text-left sm:text-center">
        Have you been told by your doctor to not engage in vigorous exercise or
        sexual activity?
      </h1>
      <div className="w-full sm:w-[500px] justify-center">
        <div className="flex flex-col w-full justify-center sm:justify-start mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 w-full">
            <label
              className={`flex w-full sm:w-[242px] items-center bg-white p-4 py-3 pr-20 rounded-lg ${
                whetherDoctorActivity === true
                  ? "border-neutral-900 border-2"
                  : "border-neutral-300 border"
              }`}
            >
              <input
                type="radio"
                name="allergies"
                className="h-4 w-4 border-neutral-300 radio-checked"
                checked={whetherDoctorActivity === true}
                onChange={() => setWhetherDoctorActivity(true)}
              />
              <span className="ml-4 text-neutral-900">Yes</span>
            </label>
            <label
              className={`flex w-full sm:w-[242px] items-center bg-white p-4 py-3 pr-20 rounded-lg ${
                whetherDoctorActivity === false
                  ? "border-neutral-900 border-2"
                  : "border-neutral-300 border"
              }`}
            >
              <input
                type="radio"
                name="allergies"
                className="h-4 w-4 border-neutral-300 radio-checked"
                checked={whetherDoctorActivity === false}
                onChange={() => setWhetherDoctorActivity(false)}
              />
              <span className="ml-4 text-neutral-900">No</span>
            </label>
          </div>
          {whetherDoctorActivity === true && (
            <div
              className="flex w-full max-w-2xl mt-2 text-sm text-neutral-900 bg-blue-100 p-2 rounded items-center"
              style={{
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "#3B82F6",
              }}
            >
              <AiOutlineInfoCircle className="text-blue-600 mr-2" size={16} />
              <span>
                This condition selection may not be compatible with this
                treatment.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
