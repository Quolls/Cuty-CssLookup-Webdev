import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePatientQuizFlow } from "../../lib/store/patientquizflow";
import TermAgeCheckbox from "../../components/common/TermAgeCheckbox";
import WelcomeBottom from "../../components/common/WelcomeBottom";
import NavBar from "../../components/NavBar";
import QuizWelcome from "../../components/quiz/QuizWelcome";
import QuizFullName from "../../components/quiz/QuizFullName";
import QuizStateSelect from "../../components/quiz/QuizStateSelect";
import QuizBirthday from "../../components/quiz/QuizSelectDate";
import QuizSexGender from "../../components/quiz/QuizSexGender";
import QuizRegistration from "../../components/quiz/QuizRegistration";
import QuizWelcome2 from "../../components/quiz/QuizWelcome2";
import QuizAllergiesStep from "../../components/quiz/QuizAllergiesStep";
import QuizMedicationsStep from "../../components/quiz/QuizMedicationsStep";
import QuizSurgicalConditionsStep from "../../components/quiz/QuizSurgicalStep";
import QuizWHInputComponent from "../../components/quiz/QuizWH";
import QuizMedicalIssueDuration from "../../components/quiz/QuizMedicalDuration";
import QuizDS from "../../components/quiz/QuizDS";
import QuizWheterTakeViagra from "../../components/quiz/QuizWhetherTakeViagra";
import QuizExerciseFrequency from "../../components/quiz/QuizExerciseFrequency";
import QuizLifeExpectancy from "../../components/quiz/QuizLifeExpectancy";
import QuizSystolicDiastolic from "../../components/quiz/QuizSystolicDiastolic";
import QuizWhetherSafeOption from "../../components/quiz/QuizWhetherSafeOption";
import QuizDiseaseCheck from "../../components/quiz/QuizDiseaseCheck";
import QuizHowTreatmentPlan from "../../components/quiz/QuizWhetherTakeViagra";
import QuizDiagnosisCheck from "../../components/quiz/QuizDiagnosisCheck";
import QuizDiagnosisFamilyCheck from "../../components/quiz/QuizDiagnosisFamilyCheck";
import QuizOperations from "../../components/quiz/QuizOperations";

import QuizFinal from "../../components/quiz/QuizFinal";

import QuizWhetherSuitablePrescription from "../../components/quiz/QuizWhetherSuitablePrescription";
import QuizDoctorActivity from "../../components/quiz/QuizDoctorActivity";
import QuizRegularMedications from "../../components/quiz/QuizRegularMedications";
import QuizWhetherDecreaseErections from "../../components/quiz/QuizWhetherDecreaseErections";
import QuizWhetherDecreaseBlood from "../../components/quiz/QuizWhetherDecreaseBlood";
import QuizYearExam from "../../components/quiz/QuizYearExam";
import QuizAgreeFollowing from "../../components/quiz/QuizAgreeFollowing";

export default function QuizFlow() {
  const navigate = useNavigate();
  const totalSteps = 27;
  const [activeStep, setActiveStep] = useState(1);
  const progressWidth = (activeStep / totalSteps) * 100;

  const [isAnimating, setIsAnimating] = useState(false);
  const [animationClasses, setAnimationClasses] = useState("");
  const [animationDirection, setAnimationDirection] = useState("left");

  // Framework Animation
  const handleAnimationEnd = () => {
    // Called when the "exit" animation ends
    setIsAnimating(false);

    // Determine the next step and set the appropriate "enter" animation
    if (animationDirection === "left") {
      setAnimationClasses("animate-slide-in-right");
    } else {
      setAnimationClasses("animate-slide-in-left");
    }

    // Proceed to the next step or back to the previous step
    setActiveStep((prevActiveStep) => {
      if (animationDirection === "left" && prevActiveStep < totalSteps) {
        return prevActiveStep + 1;
      } else if (animationDirection === "right" && prevActiveStep > 1) {
        return prevActiveStep - 1;
      }
      return prevActiveStep;
    });
  };

  // Patient Quiz Flow State
  const {
    fullName,
    firstName,
    middleName,
    lastName,
    isChecked,
    ageChecked,
    setNames,
    setFullName,
    setIsChecked,
    setAgeChecked,

    selectedState,
    availableStates,
    isStateAvailable,
    stateEmail,
    emailValidated,
    notified,
    setSelectedState,

    selectedDate,
    isOfAge,
    setSelectedDate,
    setIsOfAge,
    sexAtBirth,
    setSexAtBirth,

    localEmail,
    localConfirmEmail,
    phone,
    isPhoneValid,
    localPassword,
    localConfirmPassword,
    emailValid,
    passwordValid,
    emailError,
    passwordError,
    setLocalEmail,
    setLocalConfirmEmail,
    setLocalPassword,
    setLocalConfirmPassword,
    validateEmails,
    validatePasswords,

    // Allergies
    hasAllergies,
    allergyInput,
    allergyDetails,
    canContinueAllergies,
    setHasAllergies,
    setAllergyInput,
    setAllergyDetails,
    setCanContinueAllergies,

    onMedication,
    medicationInput,
    medicationDetails,
    canContinueMedications,
    setOnMedication,
    setMedicationInput,
    setMedicationDetails,
    setCanContinueMedications,
    hasSurgicalConditions,
    surgicalConditionInput,
    surgicalConditionDetails,
    canContinueSurgicalConditions,
    setHasSurgicalConditions,
    setSurgicalConditionInput,
    setSurgicalConditionDetails,
    setCanContinueSurgicalConditions,

    weight,
    setWeight,
    weightUnit,
    setWeightUnit,
    convertWeight,
    validateWeight,
    weightError,
    canWeightContinue,

    // medicalIssueDuration,
    // setMedicalIssueDuration,

    drinkFrequency,
    smokes,
    setDrinkFrequency,
    setSmokes,
    canDSContinue,
    setDSCanContinue,

    // triedOtherTreatments,
    // setTriedOtherTreatments,

    exerciseFrequency,
    setExerciseFrequency,

    // lifeExpectancy,
    // setLifeExpectancy,

    systolicNumber,
    diastolicNumber,
    setSystolicNumber,
    setDiastolicNumber,

    // Medical Options Check
    selectedOptions,
    canContinueMedicalOptions,
    toggleOption,
    clearOptions,

    // Take Viagra
    whetherTakeViagra,
    setWhetherTakeViagra,

    // Diagnosed Check (change from Suffer Disease Check)
    selectedDiagnoses,
    canProceedWithDiagnosis,

    // Family Diagnosed Check
    selectedFDiagnoses,
    canProceedWithFDiagnosis,

    // Operationss
    hasOperations,
    operationsInput,
    operationsDetails,
    canContinueOperations,
    setHasOperations,
    setOperationsInput,
    setOperationsDetails,
    setCanContinueOperations,

    // Suitable Prescription
    whetherSuitablePrescription,
    setWhetherSuitablePrescription,

    // Doctor Activity
    whetherDoctorActivity,
    setWhetherDoctorActivity,

    // RegularMedications
    hasRegularMedications,
    regularMedicationsInput,
    regularMedicationsDetails,
    canContinueRegularMedications,
    setHasRegularMedications,
    setRegularMedicationsInput,
    setRegularMedicationsDetails,
    setCanContinueRegularMedications,

    // Decrease Erections
    whetherDecreaseErections,
    setWhetherDecreaseErections,

    // Decrease Blood
    whetherDecreaseBlood,
    setWhetherDecreaseBlood,

    // 2 Years Exam
    hasYearExam,
    yearExamInput,
    yearExamDetails,
    canContinueYearExam,
    setHasYearExam,
    setYearExamInput,
    setYearExamDetails,
    setCanContinueYearExam,

    // Agree Following
    checked,
  } = usePatientQuizFlow();

  const handleContinue = () => {
    if (activeStep === 2) {
      setFullName(fullName);
      setNames(fullName);
      setIsChecked(true);
      setAgeChecked(true);
    }
    if (activeStep === 3) {
      if (!selectedState) return;
    }
    if (activeStep === 4) {
      if (!selectedDate || !isOfAge) return;
    }
    if (activeStep === 5) {
      if (!sexAtBirth) return;
    }

    if (activeStep === 6) {
      if (!emailValid || !passwordValid || !isPhoneValid) return;
    }
    if (activeStep === 8) {
      if (!canContinueAllergies) return;
    }
    if (activeStep === 9) {
      if (!canContinueMedications) return;
    }
    if (activeStep === 10) {
      if (!canContinueSurgicalConditions) return;
    }
    if (activeStep === 11) {
      if (!canWeightContinue) return;
    }
    if (activeStep === 12) {
      if (canDSContinue) return;
    }
    if (activeStep === 13) {
      if (exerciseFrequency === null) return;
    }
    if (activeStep === 15) {
      if (!canContinueMedicalOptions || selectedOptions.length === 0) return;
    }
    if (activeStep === 16) {
      if (whetherTakeViagra === null) return;
    }
    if (activeStep === 17) {
      if (!canProceedWithDiagnosis || selectedDiagnoses.length === 0) return;
    }
    if (activeStep === 18) {
      if (!canProceedWithFDiagnosis || selectedFDiagnoses.length === 0) return;
    }
    if (activeStep === 19) {
      if (!canContinueOperations) return;
    }
    if (activeStep === 20) {
      if (whetherSuitablePrescription === null) return;
    }
    if (activeStep === 21) {
      if (whetherDoctorActivity === null || whetherDoctorActivity === true)
        return;
    }
    if (activeStep === 22) {
      if (!canContinueRegularMedications) return;
    }
    if (activeStep === 23) {
      if (whetherDecreaseErections === null) return;
    }
    if (activeStep === 24) {
      if (whetherDecreaseBlood === null) return;
    }
    if (activeStep === 25) {
      if (!canContinueYearExam) return;
    }
    if (activeStep === 26) {
      if (!checked) return;
    }

    setAnimationDirection("left");
    setAnimationClasses("animate-slide-out-left");
    setIsAnimating(true);
  };

  const handleBack = () => {
    setAnimationDirection("right");
    setAnimationClasses("animate-slide-out-right");
    setIsAnimating(true);
  };

  const isContinueDisabled =
    (activeStep === 2 && (!fullName.trim() || !isChecked || !ageChecked)) ||
    (activeStep === 3 &&
      (!selectedState ||
        (selectedState && !isStateAvailable && !emailValidated))) ||
    (activeStep === 4 && (!selectedDate || !isOfAge)) ||
    (activeStep === 5 && !sexAtBirth) ||
    (activeStep === 6 &&
      (!emailValid ||
        !passwordValid ||
        !localEmail ||
        !localPassword ||
        localEmail !== localConfirmEmail ||
        localPassword !== localConfirmPassword ||
        emailError ||
        passwordError ||
        !isPhoneValid)) ||
    (activeStep === 8 && !canContinueAllergies) ||
    (activeStep === 9 && !canContinueMedications) ||
    (activeStep === 10 && !canContinueSurgicalConditions) ||
    (activeStep === 11 && !canWeightContinue) ||
    // (activeStep === 13 && !canDSContinue) ||
    // (activeStep === 14 && exerciseFrequency === null) ||
    (activeStep === 15 &&
      (!canContinueMedicalOptions || selectedOptions.length === 0)) ||
    (activeStep === 16 && whetherTakeViagra === null) ||
    (activeStep === 17 &&
      (!canProceedWithDiagnosis || selectedDiagnoses.length === 0)) ||
    (activeStep === 18 &&
      (!canProceedWithFDiagnosis || selectedFDiagnoses.length === 0)) ||
    (activeStep === 19 && !canContinueOperations) ||
    (activeStep === 20 && whetherSuitablePrescription === null) ||
    (activeStep === 21 &&
      (whetherDoctorActivity === null || whetherDoctorActivity === true)) ||
    (activeStep === 22 && !canContinueRegularMedications) ||
    (activeStep === 23 && whetherDecreaseErections === null) ||
    (activeStep === 24 && whetherDecreaseBlood === null) ||
    (activeStep === 25 && !canContinueYearExam) ||
    (activeStep === 26 && !checked);

  const stepsComponents = [
    <QuizWelcome key="step1" />,
    <QuizFullName key="step2" />,
    <QuizStateSelect key="step3" />,
    <QuizBirthday key="step4" />,
    <QuizSexGender key="step5" />,
    <QuizRegistration key="step6" />,
    <QuizWelcome2 key="step7" />,
    <QuizAllergiesStep key="step8" />,
    <QuizMedicationsStep key="step9" />,
    <QuizSurgicalConditionsStep key="step10" />,
    // Change from here (weight and height)
    <QuizWHInputComponent key="step11" />,
    <QuizDS key="step12" />,
    <QuizExerciseFrequency key="step13" />,
    <QuizSystolicDiastolic key="step14" />,
    <QuizDiseaseCheck key="step15" />,
    <QuizWheterTakeViagra key="step16" />,
    // Change to Diagnosed Check (original is SufferDiseaseCheck)
    <QuizDiagnosisCheck key="step17" />,

    // 18 Family Diagnosed Check
    <QuizDiagnosisFamilyCheck key="step18" />,

    // 19 Operations Yes/No
    <QuizOperations key="step19" />,

    // 20 Suitable Prescription
    <QuizWhetherSuitablePrescription key="step20" />,

    // 21 Doctor Advice
    <QuizDoctorActivity key="step21" />,

    // 22 Regular Medications
    <QuizRegularMedications key="step22" />,

    // 23 Decrease Erections
    <QuizWhetherDecreaseErections key="step23" />,

    // 24 Decrease Blood
    <QuizWhetherDecreaseBlood key="step24" />,

    // 25 2 Years Exam
    <QuizYearExam key="step25" />,

    // 26 Agree with Following
    <QuizAgreeFollowing key="step26" />,
    // Final Quiz
    <QuizFinal key="step27" />,
  ];

  return (
    <div className="flex flex-col w-full min-h-screen gap-y-12 sm:gap-y-16 items-center overflow-hidden bg-brand-100">
      {/* Nav Bar */}
      <div className="w-full">
        <NavBar />
        <div className="w-full bg-brand-200 h-2">
          <div
            className="bg-brand-900 h-2"
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>
        {activeStep === 1 && (
          <button
            onClick={() => navigate("/login")} // Make sure the path is correct
            className="mt-4 ml-3 sm:ml-10 inline-flex items-center justify-center px-1 py-1 text-sm font-medium rounded-full text-[#0066c0] bg-white hover:bg-neutral-100 focus:outline-none focus:ring-none"
            style={{
              border: "1px solid #8FCBF8",
            }}
          >
            {/* Icon and text */}
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col gap-10 sm:gap-20 w-full justify-start sm:justify-center">
        <div
          className={`flex flex-col w-full items-center ${animationClasses}`}
          onAnimationEnd={isAnimating ? handleAnimationEnd : undefined}
        >
          {stepsComponents[activeStep - 1]}
        </div>
      </div>
      {activeStep === 1 && <WelcomeBottom />}
      {activeStep === 2 && (
        <TermAgeCheckbox
          ageChecked={ageChecked}
          setAgeChecked={setAgeChecked}
          isChecked={isChecked}
          setIsChecked={setIsChecked}
        />
      )}

      {/* Continue and Back Button */}
      {/* Step18 Continue to call backend and store data */}
      <div
        className={`flex ${
          activeStep === 1
            ? "justify-center"
            : "justify-between sm:justify-center"
        } w-full max-w-4xl mb-10 sm:mb-24`}
      >
        {activeStep !== 27 ? (
          <div
            className={`flex ${
              activeStep === 1
                ? "justify-center"
                : "justify-between sm:justify-center gap-x-0 sm:gap-x-6"
            } w-full px-2 sm:px-0`}
          >
            {activeStep > 1 && (
              <button
                onClick={handleBack}
                className="text-neutral-900 bg-white py-2 px-8 rounded-lg border border-neutral-200 hover:bg-neutral-100 transition duration-300 ease-in-out"
                style={{ maxWidth: "calc(50% - 8px)" }}
              >
                Previous
              </button>
            )}

            {activeStep < totalSteps && (
              <button
                onClick={handleContinue}
                disabled={isContinueDisabled}
                className={`text-white font-light py-2 px-8 rounded-lg -md focus:outline-none transition duration-300 ease-in-out ${
                  isContinueDisabled
                    ? "bg-brand-750"
                    : "bg-brand-900 hover:bg-brand-700"
                } ${activeStep === 1 ? "w-full sm:w-auto sm:px-10" : ""}`}
                style={{
                  maxWidth:
                    activeStep === 1 ? "calc(100% - 8px)" : "calc(50% - 8px)",
                }}
              >
                {activeStep === 1 ? "Start" : "Continue"}
              </button>
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
