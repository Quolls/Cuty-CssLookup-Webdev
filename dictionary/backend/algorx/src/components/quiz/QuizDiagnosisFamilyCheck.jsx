import { usePatientQuizFlow } from "../../lib/store/patientquizflow";

import { Checkbox } from "../ui/checkbox";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import { AiOutlineInfoCircle } from "react-icons/ai";

const allOptions = [
  {
    option: "Peyronie’s disease or deformation of the penis",
    value: "Detail about Peyronie’s disease or deformation of the penis",
  },
  {
    option: "Loss of vision due to damage of optic nerve",
    value: "Such as non-arteritic anterior ischaemic optic neuropathy [NAION].",
  },
  {
    option: "Inherited eye disease",
    value: "Such as retinitis pigmentosa.",
  },
  {
    option: "Galactose intolerance",
    value: "Detail about galactose intolerance",
  },
  {
    option: "Lapp lactase deficiency",
    value: "Detail about Lapp lactase deficiency",
  },
  {
    option: "Glucose-galactose malabsorption",
    value: "Detail about glucose-galactose malabsorption",
  },
  {
    option: "Hepatic (liver) disease",
    value: "Such as cirrhosis of the liver.",
  },
  {
    option: "Renal (kidney) impairment",
    value: "Detail about renal (kidney) impairment",
  },
  {
    option: "Blood problems",
    value: "Such as sickle cell anemia, multiple myeloma or leukemia.",
  },
  {
    option: "Bleeding issues or active stomach ulcer",
    value: "Such as haemophilia.",
  },
  { option: "None", value: "" },
  { option: "Other", value: "" },
];

export default function QuizDiagnosisFamilyCheck() {
  const {
    selectedFDiagnoses,
    additionalFInput,
    setAdditionalFInput,
    toggleFDiagnosisOption,
    canProceedWithFDiagnosis,
    updateCanProceedWithFDiagnosis,
  } = usePatientQuizFlow();

  const handleCheckboxChange = (option) => {
    toggleFDiagnosisOption(option);
    // Directly call the update logic to ensure state consistency
    updateCanProceedWithFDiagnosis();
  };
  const handleInputValueChange = (event) => {
    const input = event.target.value;
    setAdditionalFInput(input);
    // Call the update logic immediately after setting the input
    updateCanProceedWithFDiagnosis();
  };

  return (
    <div className="flex flex-col sm:items-center px-2 sm:px-0">
      <h2 className="w-full max-w-lg text-2xl font-semibold mb-6 text-left sm:text-center">
        Have any of your immediate family members been diagnosed with any of the
        following?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 py-3">
        {allOptions.map(({ option, value }) => (
          <div key={option} className="flex items-center max-w-sm">
            <label
              className={`flex items-center bg-white p-4 py-3 rounded-lg w-full ${
                selectedFDiagnoses.includes(option)
                  ? "border-2 border-neutral-900"
                  : "border border-neutral-300"
              }`}
            >
              <Checkbox
                checked={selectedFDiagnoses.includes(option)}
                onCheckedChange={() => handleCheckboxChange(option)}
                className={`h-4 w-4 mr-3 border border-neutral-300`}
              />
              <span className="text-neutral-900">{option}</span>
              {option !== "Other" && option !== "None" && (
                <div className="ml-auto">
                  <Tooltip title={value} placement="right" arrow>
                    <Button
                      className="hover: bg-transparent p-0"
                      disableRipple
                      sx={{ justifyContent: "end" }}
                    >
                      <AiOutlineInfoCircle className="text-[#18181E]" />
                    </Button>
                  </Tooltip>
                </div>
              )}
            </label>
          </div>
        ))}
      </div>
      {selectedFDiagnoses.includes("Other") && (
        <div className="w-full mx-auto">
          <label
            htmlFor="conditionsInput"
            className="block text-sm font-semibold text-neutral-900 mb-1"
          >
            Other, please specify
          </label>
          <input
            placeholder="List all conditions"
            value={additionalFInput}
            onChange={handleInputValueChange}
            className="p-2 bg-white border-2 border-neutral-300 rounded-lg w-full focus:outline-none focus:border-black"
          />
          <p className="mt-2 text-sm text-neutral-500 text-start">
            Please separate each condition with a comma, if applicable.
          </p>
        </div>
      )}
      {!selectedFDiagnoses.includes("None") &&
        !selectedFDiagnoses.includes("Other") &&
        selectedFDiagnoses.length !== 0 && (
          <div
            className="w-full mt-2 text-sm text-neutral-900 bg-blue-100 p-2 rounded flex items-center"
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
  );
}
