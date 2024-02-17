import React from "react";
import { Checkbox } from "../ui/checkbox";
import { usePatientQuizFlow } from "../../lib/store/patientquizflow";

const agreementStatements = [
  "You will contact us if you experience any side effects of treatment, start new medication or develop or have a change in your medical conditions.",
  "The treatment is solely for your own use.",
  "You have answered all the questions accurately and truthfully.",
  "You understand our prescribers take your answers in good faith and base their prescribing decisions accordingly, and that incorrect information can be hazardous to your health.",
  "You will read the patient information leaflet supplied with your medication.",
  "You will notify your primary care physician about your treatment from AlgoRX.",
];

export default function QuizAgreeFollowing() {
  const { checked, toggle } = usePatientQuizFlow();

  return (
    <div className="flex flex-col w-full sm:items-center px-2 sm:px-0">
      <h2 className="text-2xl font-semibold mb-8 text-left sm:text-center max-w-xl">
        Do you agree to the following?
      </h2>
      <ul className="flex flex-col justify-center item-start sm:items-center space-y-6 w-full max-w-2xl p-0">
        {agreementStatements.map((statement, index) => (
          <li key={index} className="flex items-start space-x-2 ">
            {/* Custom bullet */}
            <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 bg-neutral-500 rounded-full" />
            <p className="flex-1 text-neutral-500 text-center mb-0">
              {statement}
            </p>
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center space-x-2 bg-transparent mt-[180px] sm:mt-[100px]">
        <div className="bg-white w-4 h-4 flex items-center justify-center rounded-md">
          <Checkbox
            id="term-following"
            className="border border-neutral-300"
            checked={checked}
            onCheckedChange={toggle}
          />
        </div>
        <label
          htmlFor="term-following"
          className="text-sm peer-disabled:cursor-not-allowed"
        >
          I accept the terms above.*
        </label>
      </div>
    </div>
  );
}
