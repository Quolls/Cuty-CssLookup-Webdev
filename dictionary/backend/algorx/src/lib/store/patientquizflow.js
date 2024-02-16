import { create } from "zustand";
import dayjs from "dayjs";
export const usePatientQuizFlow = create((set, get) => ({
  // Set all states back to the initial value
  reset: () => {
    set({
      fullName: "",
      firstName: "",
      middleName: "",
      lastName: "",
      isChecked: false,
      ageChecked: false,
      selectedState: "",
      availableStates: [
        "al",
        "az",
        "ca",
        "co",
        "dc",
        "de",
        "fl",
        "ga",
        "gu",
        "id",
        "il",
        "in",
        "ia",
        "ks",
        "ky",
        "la",
        "me",
        "md",
        "mt",
        "ne",
        "nj",
        "nd",
        "oh",
        "ok",
        "sd",
        "tn",
        "tx",
        "ut",
        "vt",
        "wa",
        "wi",
        "wy",
      ],
      isStateAvailable: false,
      stateEmail: "",
      emailValidated: false,
      notified: false,
      selectedDate: null,
      isOfAge: false,
      sexAtBirth: "",

      validationTouched: false,
      localEmail: "",
      localConfirmEmail: "",
      phone: "",
      phoneError: "",
      isPhoneValid: false,
      localPassword: "",
      localConfirmPassword: "",
      emailValid: false,
      passwordValid: false,
      emailError: "",
      passwordError: "",
      hasAllergies: null,
      allergyInput: "",
      allergyDetails: [],
      onMedication: null,
      medicationInput: "",
      medicationDetails: [],
      canContinueMedications: false,
      hasSurgicalConditions: null,
      surgicalConditionInput: "",
      surgicalConditionDetails: [],
      canContinueSurgicalConditions: false,
      // add WH
      medicalIssueDuration: null,
      // add DS
      triedOtherTreatments: null,
      // add exercise frequency
      lifeExpectancy: null,
      // add Systolic Number and Diastolic Number

      // medical Option Check
      selectedOptions: [],
      otherOptionsInput: "",
      otherOptionsDetails: [],
      canContinueMedicalOptions: false,

      selectedSufferOptions: [],
    });
  },
  // Patient Full Name
  fullName: "",
  firstName: "",
  middleName: "",
  lastName: "",
  isChecked: false,
  ageChecked: false,
  setFullName: (fullName) => set({ fullName }),
  setNames: (fullName) => {
    const names = fullName.trim().split(/\s+/);
    set({
      firstName: names[0] || "",
      middleName: names.slice(1, -1).join(" ") || "",
      lastName: names[names.length - 1] || "",
    });
  },
  setIsChecked: (isChecked) => set({ isChecked }),
  setAgeChecked: (ageChecked) => set({ ageChecked }),

  // State Selection
  selectedState: "",
  availableStates: [
    "al",
    "az",
    "ca",
    "co",
    "dc",
    "de",
    "fl",
    "ga",
    "gu",
    "id",
    "il",
    "in",
    "ia",
    "ks",
    "ky",
    "la",
    "me",
    "md",
    "mt",
    "ne",
    "nj",
    "nd",
    "oh",
    "ok",
    "sd",
    "tn",
    "tx",
    "ut",
    "vt",
    "wa",
    "wi",
    "wy",
  ],
  isStateAvailable: false,
  stateEmail: "",
  emailValidated: false,
  notified: false,
  setSelectedState: (state) => set({ selectedState: state }),
  checkStateAvailability: (state) => {
    const isAvailable = get().availableStates.includes(state);
    set({
      selectedState: state,
      isStateAvailable: isAvailable,
      stateEmail: "",
      emailValidated: false,
      notified: false,
    });
  },
  setStateEmail: (email) => {
    set({ stateEmail: email });
  },
  validateStateEmail: () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(get().stateEmail);
    set({ emailValidated: isEmailValid });
  },
  // Set whether the user clicked the 'Notify me' button
  setNotified: (notified) => {
    set({ notified });
    // When the user clicks the 'Notify me' button, activate the 'Continue' button if the email verification passes.
    if (notified && get().emailValidated) {
      set({ isStateAvailable: true });
    }
  },

  // Date of Birth
  selectedDate: null,
  setSelectedDate: (date) => set({ selectedDate: date }),
  isOfAge: false,
  setIsOfAge: (isOfAge) => set({ isOfAge }),

  // Sex
  sexAtBirth: "",
  setSexAtBirth: (sex) => set(() => ({ sexAtBirth: sex })),

  // Email and Password
  validationTouched: false,
  localEmail: "",
  localConfirmEmail: "",
  phone: "",
  isPhoneValid: false,
  localPassword: "",
  localConfirmPassword: "",
  emailValid: false,
  passwordValid: false,
  emailError: "",
  phoneError: "",
  passwordError: "",
  setValidationTouched: (touched) => set({ validationTouched: touched }),
  setLocalEmail: (email) => set({ localEmail: email, emailError: "" }),
  setPhone: (phone) => set({ phone }),
  setIsPhoneValid: (isValid) => set({ isPhoneValid: isValid }),
  setPhoneError: () => {
    const { phone, isPhoneValid } = get();
    if (!phone || !isPhoneValid) {
      set({ phoneError: "Please enter a valid number." });
    } else {
      set({ phoneError: "" });
    }
  },
  setLocalConfirmEmail: (email) =>
    set({ localConfirmEmail: email, emailError: "" }),
  setLocalPassword: (password) =>
    set({ localPassword: password, passwordError: "" }),
  setLocalConfirmPassword: (password) =>
    set({ localConfirmPassword: password, passwordError: "" }),
  validateEmails: () => {
    const { localEmail, localConfirmEmail, validationTouched } = get();
    if (!validationTouched) return;

    // Clear the error message
    set({ emailError: "", emailValid: false });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (localEmail.trim() === "" && localConfirmEmail.trim() === "") {
      // If both mailboxes are empty, no verification will be carried out.
      return;
    } else if (!emailRegex.test(localEmail)) {
      // Verify the mailbox format
      set({ emailError: "Invalid email format.", emailValid: false });
    } else if (
      localConfirmEmail.trim() !== "" &&
      localEmail !== localConfirmEmail
    ) {
      // Verify whether the mailbox matches
      set({ emailError: "Emails do not match.", emailValid: false });
    } else {
      // The mailbox format is correct and matches
      set({ emailError: "", emailValid: true });
    }
  },
  validatePasswords: () => {
    const { localPassword, localConfirmPassword, validationTouched } = get();
    if (!validationTouched) return;

    set({ passwordError: "", passwordValid: false });

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (localPassword.trim() === "" && localConfirmPassword.trim() === "") {
      return;
    } else if (!passwordRegex.test(localPassword)) {
      set({
        passwordError:
          "Password must be at least 8 characters and include numbers, uppercase and lowercase letters.",
        passwordValid: false,
      });
    } else if (
      localConfirmPassword.trim() !== "" &&
      localPassword !== localConfirmPassword
    ) {
      set({ passwordError: "Passwords do not match.", passwordValid: false });
    } else {
      set({ passwordError: "", passwordValid: true });
    }
  },

  // Allergies
  hasAllergies: null,
  allergyInput: "",
  allergyDetails: [],
  canContinueAllergies: false,
  setHasAllergies: (hasAllergies) => set({ hasAllergies }),
  setAllergyInput: (input) => set({ allergyInput: input }),
  setAllergyDetails: (details) => set({ allergyDetails: details }),
  setCanContinueAllergies: (canContinue) =>
    set({ canContinueAllergies: canContinue }),

  // Medications
  onMedication: null,
  medicationInput: "",
  medicationDetails: [],
  canContinueMedications: false,
  setOnMedication: (onMedication) => set(() => ({ onMedication })),
  setMedicationInput: (medicationInput) => set(() => ({ medicationInput })),
  setMedicationDetails: (medicationDetails) =>
    set(() => ({ medicationDetails })),
  setCanContinueMedications: (canContinue) =>
    set(() => ({ canContinueMedications: canContinue })),

  // Surgical Conditions
  hasSurgicalConditions: null,
  surgicalConditionInput: "",
  surgicalConditionDetails: [],
  canContinueSurgicalConditions: false,
  setHasSurgicalConditions: (hasConditions) =>
    set(() => ({ hasSurgicalConditions: hasConditions })),
  setSurgicalConditionInput: (input) =>
    set(() => ({ surgicalConditionInput: input })),
  setSurgicalConditionDetails: (details) =>
    set(() => ({ surgicalConditionDetails: details })),
  setCanContinueSurgicalConditions: (canContinue) =>
    set(() => ({ canContinueSurgicalConditions: canContinue })),

  // Weight and Height
  weight: "",
  originalWeight: "",
  weightUnit: "lbs",
  weightError: "",

  setWeight: (weight) => set({ weight }),
  setOriginalWeight: (weight) => set({ originalWeight: weight }),

  setWeightUnit: (unit) => set({ weightUnit: unit }),

  // This function is now only responsible for conversion, not for setting the state.
  convertWeight: (currentWeight, currentUnit, newUnit) => {
    let convertedWeight = parseFloat(currentWeight);
    if (isNaN(convertedWeight)) {
      return; // If the conversion fails, return directly
    }

    if (currentUnit === "lbs" && newUnit === "kg") {
      convertedWeight *= 0.45359237;
    } else if (currentUnit === "kg" && newUnit === "lbs") {
      convertedWeight /= 0.45359237;
    } else if (currentUnit === "lbs" && newUnit === "st") {
      convertedWeight /= 14;
    } else if (currentUnit === "st" && newUnit === "lbs") {
      convertedWeight *= 14;
    } else if (currentUnit === "kg" && newUnit === "st") {
      convertedWeight /= 6.35029318;
    } else if (currentUnit === "st" && newUnit === "kg") {
      convertedWeight *= 6.35029318;
    }

    return convertedWeight.toFixed(2); // Return the converted weight
  },

  validateWeight: (weight) => {
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (!weight || (regex.test(weight) && parseFloat(weight) >= 0)) {
      set({ weightError: "" });
      return true;
    } else {
      set({ weightError: "Please enter a valid number." });
      return false;
    }
  },

  height: "",
  originalHeight: "",
  heightUnit: "ft/in",
  heightError: "",

  setHeight: (height) => set({ height }),
  setOriginalHeight: (height) => set({ originalHeight: height }),
  setHeightUnit: (unit) => set({ heightUnit: unit }),

  // Convert height between ft/in and cm
  convertHeight: (currentHeight, currentUnit, newUnit) => {
    let convertedHeight;

    // Conversion from ft/in to cm
    if (currentUnit === "ft/in" && newUnit === "cm") {
      const [feet, inches] = currentHeight
        .split("'")
        .map((num) => parseFloat(num));
      if (!isNaN(feet) && !isNaN(inches)) {
        convertedHeight = Math.round((feet * 12 + inches) * 2.54);
      }
    }
    // Conversion from cm to ft/in
    else if (currentUnit === "cm" && newUnit === "ft/in") {
      const totalInches = currentHeight / 2.54;
      const feet = Math.floor(totalInches / 12);
      const inches = Math.round(totalInches % 12);
      convertedHeight = `${feet}'${inches}`;
    }

    return convertedHeight?.toString() ?? ""; // Return the converted height or an empty string
  },

  // Validate height input based on the current unit
  validateHeight: (height, unit) => {
    if (unit === "ft/in") {
      // Regex to match a number followed by an optional ' and another optional number.
      // This allows the user to input partial height (e.g., '5', '5'', '5'1')
      const regexPartial = /^(\d{0,2})'?$|^(\d{0,2}'\d{0,2})$/;

      // Check if the height is either empty, complete, or a valid partial input.
      if (height === "" || regexPartial.test(height)) {
        set({ heightError: "" });
        return true; // The input is valid (including partial inputs)
      } else {
        set({
          heightError: "Enter height as X'Y (e.g., 5'2 for 5 feet 2 inches).",
        });
        return false; // The input is not valid
      }
    } else {
      // Validation for cm, simple numeric check
      const regexCm = /^[0-9]*\.?[0-9]*$/;
      if (height === "" || regexCm.test(height)) {
        set({ heightError: "" });
        return true; // The input is valid (including empty string)
      } else {
        set({ heightError: "Enter a valid number for cm." });
        return false; // The input is not valid
      }
    }
  },

  canWeightContinue: () => {
    const { weight, weightError } = get();
    return weight && !weightError;
  },

  // Medical Issue Duration
  medicalIssueDuration: null,
  setMedicalIssueDuration: (value) => set({ medicalIssueDuration: value }),

  // Drink and Smoke
  drinkFrequency: null,
  smokes: null,
  setDrinkFrequency: (frequency) => set(() => ({ drinkFrequency: frequency })),
  setSmokes: (doesSmoke) => set(() => ({ smokes: doesSmoke })),
  canDSContinue: false,
  setDSCanContinue: () =>
    set((state) => ({
      canContinue: state.drinkFrequency !== null && state.smokes !== null,
    })),

  // Tried Other Treatments
  triedOtherTreatments: null,
  setTriedOtherTreatments: (value) => set({ triedOtherTreatments: value }),

  // Excercise Frequency
  exerciseFrequency: null,
  setExerciseFrequency: (frequency) =>
    set(() => ({ exerciseFrequency: frequency })),

  // Life Expectancy
  lifeExpectancy: null,
  setLifeExpectancy: (value) => set({ lifeExpectancy: value }),

  // Systolic Number and Diastolic Number
  systolicNumber: "",
  diastolicNumber: "",
  setSystolicNumber: (number) => set(() => ({ systolicNumber: number })),
  setDiastolicNumber: (number) => set(() => ({ diastolicNumber: number })),

  // Medical Options Check
  selectedOptions: [],
  otherOptionsInput: "",
  otherOptionsDetails: [],

  canContinueMedicalOptions: false,
  clearOptions: () => set({ selectedOptions: [] }),
  clearOtherOptionsInput: () => set({ otherOptionsInput: "" }),
  clearOptionsDetail: () => set({ otherOptionsDetails: [] }),

  setOtherOptionsInput: (input) => set({ otherOptionsInput: input }),
  setOtherOptionsDetails: (details) => set({ otherOptionsDetails: details }),

  setCanContinueMedicalOptions: (canContinue) =>
    set({ canContinueMedicalOptions: canContinue }),

  toggleOption: (option) =>
    set((state) => {
      let newSelection = [...state.selectedOptions];

      // When "None" is selected, clear all other options
      if (option === "None") {
        newSelection = ["None"];
      }
      // When selecting "Other medication(s)", deal with special logic
      else if (option === "Other medication(s)") {
        if (state.selectedOptions.includes(option)) {
          newSelection = newSelection.filter((o) => o !== option);
        } else {
          newSelection = [option]; // Clear other options and keep only "Other medication(s)"
        }
      }
      // Handle other options
      else {
        // If "None" or "Other medication(s)" has been selected, remove it first
        newSelection = newSelection.filter(
          (o) => o !== "None" && o !== "Other medication(s)"
        );
        // Switch the selected status of the current option
        if (state.selectedOptions.includes(option)) {
          newSelection = newSelection.filter((o) => o !== option);
        } else {
          newSelection.push(option);
        }
      }

      // Update canContinueMedicalOptions status
      let canContinue = true;
      // If any of "Alpha-blockers", "Anticoagulants" and "CYP3A4 inhibitors" are selected, canContinue is false
      const disallowedOptions = [
        "Alpha-blockers",
        "Anticoagulants",
        "CYP3A4 inhibitors",
        "Nitrates",
        "Recreational drugs",
      ];
      if (newSelection.some((option) => disallowedOptions.includes(option))) {
        canContinue = false;
      }
      // If "Other medication(s)" is selected but no details are entered, canContinue is false
      if (
        newSelection.includes("Other medication(s)") &&
        !state.otherOptionsInput.trim()
      ) {
        canContinue = false;
      }

      return {
        selectedOptions: newSelection,
        canContinueMedicalOptions: canContinue,
      };
    }),

  // Take Viagra
  whetherTakeViagra: null,
  setWhetherTakeViagra: (value) => set({ whetherTakeViagra: value }),

  // Diagnosed Check
  selectedDiagnoses: [],
  additionalInput: "",
  additionalDetails: [],
  canProceedWithDiagnosis: false,
  clearSelectedDiagnoses: () => set({ selectedDiagnoses: [] }),
  clearAdditionalInput: () => set({ additionalInput: "" }),
  clearAdditionalDetails: () => set({ additionalDetails: [] }),
  setAdditionalInput: (input) => set({ additionalInput: input }),
  setAdditionalDetails: (details) => set({ additionalDetails: details }),
  updateCanProceedWithDiagnosis: () =>
    set((state) => {
      let canProceed = false;
      if (
        state.selectedDiagnoses.includes("None") ||
        (state.selectedDiagnoses.includes("Other") &&
          state.additionalInput.trim())
      ) {
        canProceed = true;
      }
      return { canProceedWithDiagnosis: canProceed };
    }),
  toggleDiagnosisOption: (option) =>
    set((state) => {
      let newSelectedDiagnoses = [...state.selectedDiagnoses];

      if (option === "None") {
        newSelectedDiagnoses = ["None"];
      } else if (option === "Other") {
        const index = newSelectedDiagnoses.indexOf(option);
        if (index > -1) {
          newSelectedDiagnoses.splice(index, 1);
        } else {
          newSelectedDiagnoses = ["Other"]; // Only keep the "Other" option
        }
      } else {
        const noneOrOtherIndex = newSelectedDiagnoses.findIndex(
          (o) => o === "None" || o === "Other"
        );
        if (noneOrOtherIndex > -1) {
          newSelectedDiagnoses.splice(noneOrOtherIndex, 1);
        }

        const optionIndex = newSelectedDiagnoses.indexOf(option);
        if (optionIndex > -1) {
          newSelectedDiagnoses.splice(optionIndex, 1);
        } else {
          newSelectedDiagnoses.push(option);
        }
      }

      let canProceed =
        newSelectedDiagnoses.includes("None") ||
        (newSelectedDiagnoses.includes("Other") &&
          state.additionalInput.trim());
      return {
        selectedDiagnoses: newSelectedDiagnoses,
        canProceedWithDiagnosis: canProceed,
      };
    }),

  // Diagnosed Family Check
  selectedFDiagnoses: [],
  additionalFInput: "",
  additionalFDetails: [],
  canProceedWithFDiagnosis: false,
  clearSelectedFDiagnoses: () => set({ selectedFDiagnoses: [] }),
  clearAdditionalFInput: () => set({ additionalFInput: "" }),
  clearAdditionalFDetails: () => set({ additionalFDetails: [] }),
  setAdditionalFInput: (input) => set({ additionalFInput: input }),
  setAdditionalFDetails: (details) => set({ additionalFDetails: details }),
  updateCanProceedWithFDiagnosis: () =>
    set((state) => {
      let canProceed = false;
      if (
        state.selectedFDiagnoses.includes("None") ||
        (state.selectedFDiagnoses.includes("Other") &&
          state.additionalFInput.trim())
      ) {
        canProceed = true;
      }
      return { canProceedWithFDiagnosis: canProceed };
    }),
  toggleFDiagnosisOption: (option) =>
    set((state) => {
      let newSelectedDiagnoses = [...state.selectedFDiagnoses];

      if (option === "None") {
        newSelectedDiagnoses = ["None"];
      } else if (option === "Other") {
        const index = newSelectedDiagnoses.indexOf(option);
        if (index > -1) {
          newSelectedDiagnoses.splice(index, 1);
        } else {
          newSelectedDiagnoses = ["Other"]; // Only keep the "Other" option
        }
      } else {
        const noneOrOtherIndex = newSelectedDiagnoses.findIndex(
          (o) => o === "None" || o === "Other"
        );
        if (noneOrOtherIndex > -1) {
          newSelectedDiagnoses.splice(noneOrOtherIndex, 1);
        }

        const optionIndex = newSelectedDiagnoses.indexOf(option);
        if (optionIndex > -1) {
          newSelectedDiagnoses.splice(optionIndex, 1);
        } else {
          newSelectedDiagnoses.push(option);
        }
      }

      let canProceed =
        newSelectedDiagnoses.includes("None") ||
        (newSelectedDiagnoses.includes("Other") &&
          state.additionalFInput.trim());
      return {
        selectedFDiagnoses: newSelectedDiagnoses,
        canProceedWithFDiagnosis: canProceed,
      };
    }),

  // hasOperations
  hasOperations: null,
  operationsInput: "",
  operationsDetails: [],
  canContinueOperations: false,
  setHasOperations: (hasOperations) => set({ hasOperations }),
  setOperationsInput: (input) => set({ operationsInput: input }),
  setOperationsDetails: (details) => set({ operationsDetails: details }),
  setCanContinueOperations: (canContinue) =>
    set({ canContinueOperations: canContinue }),

  // Suitable Prescription
  whetherSuitablePrescription: null,
  setWhetherSuitablePrescription: (value) =>
    set({ whetherSuitablePrescription: value }),

  // Doctor Activity
  whetherDoctorActivity: null,
  setWhetherDoctorActivity: (value) => set({ whetherDoctorActivity: value }),

  // hasRegularMedications
  hasRegularMedications: null,
  regularMedicationsInput: "",
  regularMedicationsDetails: [],
  canContinueRegularMedications: false,
  setHasRegularMedications: (hasRegularMedications) =>
    set({ hasRegularMedications }),
  setRegularMedicationsInput: (input) =>
    set({ regularMedicationsInput: input }),
  setRegularMedicationsDetails: (details) =>
    set({ regularMedicationsDetails: details }),
  setCanContinueRegularMedications: (canContinue) =>
    set({ canContinueRegularMedications: canContinue }),

  // Decrease Erections
  whetherDecreaseErections: null,
  setWhetherDecreaseErections: (value) =>
    set({ whetherDecreaseErections: value }),

  // Decrease Blood
  whetherDecreaseBlood: null,
  setWhetherDecreaseBlood: (value) => set({ whetherDecreaseBlood: value }),

  // hasYearExam
  hasYearExam: null,
  yearExamInput: "",
  yearExamDetails: [],
  canContinueYearExam: false,
  setHasYearExam: (hasYearExam) => set({ hasYearExam }),
  setYearExamInput: (input) => set({ yearExamInput: input }),
  setYearExamDetails: (details) => set({ yearExamDetails: details }),
  setCanContinueYearExam: (canContinue) =>
    set({ canContinueYearExam: canContinue }),

  // whether check terms
  checked: false,
  toggle: () => set((state) => ({ checked: !state.checked })),
}));
