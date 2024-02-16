import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/pro-regular-svg-icons";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import { usePatientQuizFlow } from "../../lib/store/patientquizflow";
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";

const QuizRegistration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailDebounceTimer, setEmailDebounceTimer] = useState(null);
  const [emailConfirmDebounceTimer, setEmailConfirmDebounceTimer] =
    useState(null);

  const [passwordDebounceTimer, setPasswordDebounceTimer] = useState(null);
  const [passwordConfirmDebounceTimer, setPasswordConfirmDebounceTimer] =
    useState(null);

  // Debounce Validation
  const debounceValidation = (
    callback,
    value,
    timer,
    setTimer,
    delay = 500
  ) => {
    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      callback(); // Only call the verification function after the user stops typing.
    }, delay);
    setTimer(newTimer);
  };

  const {
    localEmail,
    localConfirmEmail,
    phone,
    isPhoneValid,
    phoneError,
    localPassword,
    localConfirmPassword,
    emailError,
    passwordError,
    validationTouched,
    setLocalEmail,
    setLocalConfirmEmail,
    setPhone,
    setIsPhoneValid,
    setPhoneError,
    validatePhone,
    setLocalPassword,
    setLocalConfirmPassword,
    validateEmails,
    validatePasswords,
    setValidationTouched,
  } = usePatientQuizFlow();

  // Email and Password input change handlers
  const handleEmailChange = (e) => {
    const newValue = e.target.value;
    if (!validationTouched) setValidationTouched(true);
    setLocalEmail(newValue);
    debounceValidation(
      validateEmails,
      newValue,
      emailDebounceTimer,
      setEmailDebounceTimer
    );
  };

  const handleConfirmEmailChange = (e) => {
    const newValue = e.target.value;
    if (!validationTouched) setValidationTouched(true);
    setLocalConfirmEmail(newValue);
    debounceValidation(
      validateEmails,
      newValue,
      emailConfirmDebounceTimer,
      setEmailConfirmDebounceTimer
    );
  };

  const handlePasswordChange = (e) => {
    const newValue = e.target.value;
    if (!validationTouched) setValidationTouched(true);
    setLocalPassword(newValue);
    debounceValidation(
      validatePasswords,
      newValue,
      passwordDebounceTimer,
      setPasswordDebounceTimer
    );
  };

  const handleConfirmPasswordChange = (e) => {
    const newValue = e.target.value;
    if (!validationTouched) setValidationTouched(true);
    setLocalConfirmPassword(newValue);
    debounceValidation(
      validatePasswords,
      newValue,
      passwordConfirmDebounceTimer,
      setPasswordConfirmDebounceTimer
    );
  };

  const handlePhoneChange = (value) => {
    // console.log("Phone value: ", value);
    // console.log("Phone value formated: ", formatPhoneNumber(value));
    // console.log("Phone value formated Intl: ", formatPhoneNumberIntl(value));
    setPhone(value);
  };
  const handlePhoneOnBlur = (e) => {
    console.log(e.target.value);
  };
  const handlePhoneBlur = () => {
    if (phone && isPossiblePhoneNumber(phone)) {
      setIsPhoneValid(true);
      setPhoneError();
    } else if (phone) {
      setIsPhoneValid(false);
      setPhoneError();
    }
  };

  useEffect(() => {
    if (phone && isPossiblePhoneNumber(phone)) {
      setIsPhoneValid(true);
      setPhoneError();
      // Here you can execute other logic that needs to be executed when the phone number is valid.
    } else {
      setIsPhoneValid(false);
    }
  }, [phone]);

  return (
    <div className="flex flex-col w-full sm:items-center bg-transparent px-2 sm:px-0 gap-4 py-3">
      {/* Mobile View */}
      <h2 className="text-xl font-semibold text-start block sm:hidden">
        Ready to start?
      </h2>
      <p className="text-start text-neutral-600 block sm:hidden">
        Create an account to access your dashboard
      </p>
      <ul className="list-none pl-0 space-y-1 block sm:hidden">
        <li className="flex font-semibold text-brand-900 items-center">
          <CheckBadgeIcon className="h-5 w-5 text-brand-900 mr-2" />
          Easy way to speak to your doctor
        </li>
        <li className="flex font-semibold text-brand-900 items-center">
          <CheckBadgeIcon className="h-5 w-5 text-brand-900 mr-2" />
          Manage your prescriptions
        </li>
        <li className="flex font-semibold text-brand-900 items-center">
          <CheckBadgeIcon className="h-5 w-5 text-brand-900 mr-2" />
          Track your orders
        </li>
      </ul>

      {/* Desktop View */}
      <h3 className="text-2xl font-semibold text-center hidden sm:block">
        Let's proceed with setting up your account.
      </h3>
      <p className="mb-8 sm:mb-0 text-center text-neutral-900 hidden sm:block">
        Access your dashboard to speak to your doctor, manage your prescriptions
        and track your orders.
      </p>

      {/* Form input of Email and Password */}
      <form className="w-full max-w-md space-y-4 mt-1">
        <label className="block">
          <span className="text-black font-medium ml-1">Email</span>
          <input
            className="p-2 bg-white border border-neutral-300 rounded-lg w-full focus:outline-none "
            type="email"
            placeholder="Email"
            value={localEmail}
            onChange={handleEmailChange}
            autoComplete="new-username"
          />
        </label>

        <label className="block">
          <span className="text-black font-medium ml-1">
            Confirm your email
          </span>
          <input
            className="p-2 bg-white border border-neutral-300 rounded-lg w-full focus:outline-none "
            type="email"
            placeholder="Email"
            value={localConfirmEmail}
            onChange={handleConfirmEmailChange}
            autoComplete="new-username"
          />
        </label>

        {/* National Phone Number input */}
        <label className="block">
          <span className="text-black font-medium ml-1">Ph Number</span>
          <PhoneInput
            className="flex p-2 bg-white border border-neutral-300 rounded-lg w-full focus:outline-none "
            placeholder="Contact Number"
            defaultCountry="US"
            value={phone}
            onChange={handlePhoneChange}
            onBlur={handlePhoneBlur}
            autoComplete="new-phone"
          />

          {/* <div className="text-sm mt-1">
            Is possible:{" "}
            {phone && isPossiblePhoneNumber(phone) ? "true" : "false"}
          </div> */}
          {/* <div className="text-sm mt-1">
            Is valid: {phone && isPossiblePhoneNumber(phone) ? "true" : "false"}
            Valid: State: {isPhoneValid ? "true" : "false"}
          </div> */}
          {/* <div className="text-sm mt-1">
            National: {phone && formatPhoneNumber(phone)}
          </div>
          <div className="text-sm mt-1">
            International: {phone && formatPhoneNumberIntl(phone)}
          </div> */}
        </label>

        <label className="block relative">
          <span className="text-black font-medium ml-1">Create a password</span>
          <div className="relative">
            <input
              className="p-2 bg-white border border-neutral-300 rounded-lg w-full focus:outline-none "
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={localPassword}
              onChange={handlePasswordChange}
              autoComplete="new-password"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {/* use awesomefont to change the symbol */}
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </div>
          </div>
        </label>

        <label className="block relative">
          <span className="text-black font-medium ml-1">
            Confirm your password
          </span>
          <div className="relative">
            <input
              className="p-2 bg-white border border-neutral-300 rounded-lg w-full focus:outline-none "
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={localConfirmPassword}
              onChange={handleConfirmPasswordChange}
              autoComplete="new-password"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </div>
          </div>
        </label>
        {validationTouched && emailError && (
          <p className="text-red-500 text-sm mt-2">{emailError}</p>
        )}
        {validationTouched && passwordError && (
          <p className="text-red-500 text-sm mt-2">{passwordError}</p>
        )}
        {phoneError && (
          <p className="text-red-500 text-sm mt-2">{phoneError}</p>
        )}
      </form>
    </div>
  );
};

export default QuizRegistration;
