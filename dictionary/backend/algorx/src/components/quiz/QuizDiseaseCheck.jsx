import { usePatientQuizFlow } from "../../lib/store/patientquizflow";
import { useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/pro-regular-svg-icons";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

import { Checkbox } from "../ui/checkbox";
import { AiOutlineInfoCircle } from "react-icons/ai";

const allOptions = [
  {
    option: "Alpha-blockers",
    value:
      "Such as Tamsulosin (Flomax), alfuzosin, or doxazosin (usually for enlarged prostate (benign prostatic hyperplasia) or to treat high blood pressure?",
  },
  {
    option: "Anticoagulants",
    value:
      "E.g. warfarin (Coumadin), rivaroxaban (Xarelto), dabigatran (Pradaxa), apixaban (Eliquis), clopidogrel (Plavix)or related drugs?",
  },
  {
    option: "CYP3A4 inhibitors",
    value:
      "E.g. Cobicistat containing products for HIV infection: Genvoya, Stribild, Symtuza, Prezcobix and Evotaz. Ritonivir (for HIV), Itraconazole or ketoconazole (to treat fungal infections), erythromycin, Clarithromycin (antibiotics), diltiazem?",
  },
  {
    option: "Nitrates",
    value:
      "Nicorandil or other nitric oxide donors e.g. glyceryl trinitrate, isosorbide mononitrate or dinitrate, nicorandil.",
  },
  {
    option: "Recreational drugs",
    value:
      "Drugs called ‘poppers’ for recreational purposes (e.g. amyl nitrite)?",
  },
  { option: "None", value: "" },
  { option: "Other medication(s)", value: "" },
];

const popupOptions = [
  "Alpha-blockers",
  "Anticoagulants",
  "CYP3A4 inhibitors",
  "Nitrates",
  "Recreational drugs",
];

export default function QuizDiseaseCheck() {
  const {
    selectedOptions,
    otherOptionsInput,
    otherOptionsDetails,

    canContinueMedicalOptions,
    setCanContinueMedicalOptions,

    setOtherOptionsInput,
    setOtherOptionsDetails,
    clearOtherOptionsInput,
    clearOptionsDetail,
    toggleOption,
  } = usePatientQuizFlow();

  const handleCheckboxChange = (option) => {
    toggleOption(option);
    clearOtherOptionsInput();
    clearOptionsDetail();
  };

  const handleInputValueChange = (event) => {
    const details = event.target.value;
    setOtherOptionsInput(details);

    // Update canContinue Logic here!
    setCanContinueMedicalOptions(details.trim() !== "");

    // Convert the comma-separated string to an array when the user types
    const detailsArray = details
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
    setOtherOptionsDetails(detailsArray);
  };

  return (
    <div className="flex flex-col sm:items-center px-2 sm:px-0">
      <h2 className="w-full max-w-lg text-2xl font-semibold mb-6 text-left sm:text-center">
        Are you taking any of the following medications?
      </h2>
      <div className="flex flex-col w-full max-w-lg gap-4 py-3">
        {allOptions.map(({ option, value }) => (
          <div key={option} className="flex items-center">
            <label
              className={`flex items-center bg-white p-4 py-3 rounded-lg w-full ${
                selectedOptions.includes(option)
                  ? "border-2 border-neutral-900"
                  : "border border-neutral-300"
              }`}
            >
              <Checkbox
                checked={selectedOptions.includes(option)}
                onCheckedChange={() => handleCheckboxChange(option)}
                className={`h-4 w-4 mr-3 border border-neutral-300`}
              />

              <span className="text-neutral-900">{option}</span>
              <div className="ml-auto">
                {option !== "Other medication(s)" && option !== "None" && (
                  <Tooltip title={value} placement="right" arrow>
                    <Button
                      className="hover: bg-transparent p-0"
                      disableRipple
                      sx={{ justifyContent: "end" }}
                    >
                      <FontAwesomeIcon
                        icon={faCircleInfo}
                        className="text-[#18181E]"
                      />
                    </Button>
                  </Tooltip>
                )}
              </div>
            </label>
          </div>
        ))}
        {/* Conditional rendering part*/}
        {selectedOptions.includes("Other medication(s)") && (
          <div className="w-full max-w-lg mx-auto">
            <label
              htmlFor="medicationsInput"
              className="block text-sm font-semibold text-neutral-900 mb-1"
            >
              Other, please list
            </label>
            <input
              placeholder="List all medications"
              value={otherOptionsInput}
              onChange={handleInputValueChange}
              className="p-2 bg-white border-2 border-neutral-300 rounded-lg w-full focus:outline-none focus:border-black"
            />
            <p className="mt-2 text-sm text-neutral-500 text-start">
              Please separate each medication with a comma.
            </p>
          </div>
        )}
        {selectedOptions.some((e) => popupOptions.includes(e)) && (
          <div
            className="w-full max-w-2xl mt-2 text-sm text-neutral-900 bg-blue-100 p-2 rounded flex items-center"
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
  );
}
