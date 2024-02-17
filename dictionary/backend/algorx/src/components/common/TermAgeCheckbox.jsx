import React from "react";
import { Checkbox } from "../ui/checkbox";

const TermAgeCheckbox = ({
  ageChecked,
  setAgeChecked,
  isChecked,
  setIsChecked,
}) => {
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleCheckboxAgeChange = () => {
    setAgeChecked(!ageChecked);
  };

  return (
    <div className="absolute bottom-[10rem] sm:bottom-[168px] w-full max-w-4xl flex justify-center p-2 px-3">
      <div className="flex flex-col justify-center items-start sm:items-center gap-y-2">
        <div className="flex items-center space-x-2 bg-transparent">
          <div className="bg-white w-4 h-4 flex items-center justify-center rounded-md">
            <Checkbox
              id="age"
              className="border border-neutral-300"
              checked={ageChecked}
              onCheckedChange={handleCheckboxAgeChange}
            />
          </div>
          <label
            htmlFor="age"
            className="text-sm peer-disabled:cursor-not-allowed"
          >
            I confirm that I am 18 years old or over.
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-white w-4 h-4 flex items-center justify-center rounded-md">
            <Checkbox
              id="terms"
              className="border border-neutral-300"
              checked={isChecked}
              onCheckedChange={handleCheckboxChange}
            />
          </div>
          <label
            htmlFor="terms"
            className="text-sm peer-disabled:cursor-not-allowed"
          >
            I acknowledge the{" "}
            <a
              href="/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sm underline text-neutral-900 hover:text-neutral-600"
            >
              Terms and Conditions
            </a>
            ,{" "}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sm underline text-neutral-900 hover:text-neutral-600"
            >
              Privacy Policy
            </a>
            , and{" "}
            <a
              href="/telehealth"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sm underline text-neutral-900 hover:text-neutral-600"
            >
              Telehealth Consent
            </a>
            .
          </label>
        </div>
      </div>
    </div>
  );
};

export default TermAgeCheckbox;
