import { usePatientQuizFlow } from "../../lib/store/patientquizflow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

// Custom styled MUI components
const CustomFormControl = styled(FormControl)(() => ({
  ".MuiInputBase-root": {
    borderRadius: "8px", // Adjust border-radius as per your design
    backgroundColor: "white", // Replace with color code if needed
  },
  ".MuiOutlinedInput-notchedOutline": {
    border: "none", // Removes border
  },
  ".MuiSelect-select": {
    padding: "10px 24px", // Adjust padding as per your design
  },
  ".MuiSvgIcon-root": {
    color: "rgba(0, 0, 0, 0.54)", // Adjust arrow icon color as per your design
  },
}));

const DropdownIcon = (props) => {
  return <FontAwesomeIcon icon={faChevronDown} {...props} />;
};

function getStateMessage(state) {
  switch (state) {
    case "al":
      return "Alabama";
    case "ak":
      return "Alaska";
    case "az":
      return "Arizona";
    case "ar":
      return "Arkansas";
    case "ca":
      return "California";
    case "co":
      return "Colorado";
    case "ct":
      return "Connecticut";
    case "dc":
      return "District of Columbia";
    case "de":
      return "Delaware";
    case "fl":
      return "Florida";
    case "ga":
      return "Georgia";
    case "gu":
      return "Guam";
    case "hi":
      return "Hawaii";
    case "id":
      return "Idaho";
    case "il":
      return "Illinois";
    case "in":
      return "Indiana";
    case "ia":
      return "Iowa";
    case "ks":
      return "Kansas";
    case "ky":
      return "Kentucky";
    case "la":
      return "Louisiana";
    case "me":
      return "Maine";
    case "md":
      return "Maryland";
    case "ma":
      return "Massachusetts";
    case "mi":
      return "Michigan";
    case "mn":
      return "Minnesota";
    case "ms":
      return "Mississippi";
    case "mo":
      return "Missouri";
    case "mt":
      return "Montana";
    case "ne":
      return "Nebraska";
    case "nv":
      return "Nevada";
    case "nh":
      return "New Hampshire";
    case "nj":
      return "New Jersey";
    case "nm":
      return "New Mexico";
    case "ny":
      return "New York";
    case "nc":
      return "North Carolina";
    case "nd":
      return "North Dakota";
    case "oh":
      return "Ohio";
    case "ok":
      return "Oklahoma";
    case "or":
      return "Oregon";
    case "pa":
      return "Pennsylvania";
    case "ri":
      return "Rhode Island";
    case "sc":
      return "South Carolina";
    case "sd":
      return "South Dakota";
    case "tn":
      return "Tennessee";
    case "tx":
      return "Texas";
    case "ut":
      return "Utah";
    case "vt":
      return "Vermont";
    case "va":
      return "Virginia";
    case "wa":
      return "Washington";
    case "wv":
      return "West Virginia";
    case "wi":
      return "Wisconsin";
    case "wy":
      return "Wyoming";
    default:
      return "";
  }
}

const QuizStateSelect = () => {
  const {
    firstName,
    selectedState,
    setSelectedState,
    checkStateAvailability,
    stateEmail,
    setStateEmail,
    validateStateEmail,
    emailValidated,
    setNotified,
    isStateAvailable,
  } = usePatientQuizFlow();

  const handleStateChange = (e) => {
    const newState = e.target.value;
    setSelectedState(newState);
    checkStateAvailability(newState);
  };
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setStateEmail(newEmail);
    validateStateEmail();
  };
  const handleEmailBlur = () => {
    validateStateEmail();
  };
  const handleNotifyClick = () => {
    // Here can call an API or set the relevant status
    setNotified(true);
    // If necessary, this can be an asynchronous operation.
  };

  return (
    <div className="flex flex-col sm:items-center max-w-2xl gap-y-6 px-2 sm:px-0">
      <h2 className="text-2xl font-semibold text-neutral-900 text-left sm:text-center">
        Hi {firstName},<span className="block sm:hidden mb-6 sm:mb-0"></span>{" "}
        <span className="sm:hidden">First</span>
        <span className="hidden sm:inline">first</span> we need to make sure we
        have healthcare providers in your location.
      </h2>
      <div className="w-full sm: max-w-sm">
        <Box sx={{ minWidth: 120 }}>
          <CustomFormControl fullWidth>
            <label
              htmlFor="state-select-label"
              className="font-semibold mb-1 block sm:hidden"
            >
              State
            </label>
            <Select
              fullWidth
              labelId="state-select-label"
              id="state-select"
              value={selectedState}
              displayEmpty
              IconComponent={DropdownIcon}
              onChange={handleStateChange}
              renderValue={
                selectedState !== ""
                  ? undefined
                  : () => <span style={{ opacity: 0.5 }}>Select the state</span>
              }
              sx={{
                // Increase the width of the select box
                width: "100%", // or any specific value you prefer
              }}
            >
              <MenuItem value={"al"}>Alabama</MenuItem>
              <MenuItem value={"ak"}>Alaska</MenuItem>
              <MenuItem value={"az"}>Arizona</MenuItem>
              <MenuItem value={"ar"}>Arkansas</MenuItem>
              <MenuItem value={"ca"}>California</MenuItem>
              <MenuItem value={"co"}>Colorado</MenuItem>
              <MenuItem value={"ct"}>Connecticut</MenuItem>
              <MenuItem value={"dc"}>District of Columbia</MenuItem>
              <MenuItem value={"de"}>Delaware</MenuItem>
              <MenuItem value={"fl"}>Florida</MenuItem>
              <MenuItem value={"ga"}>Georgia</MenuItem>
              <MenuItem value={"gu"}>Guam</MenuItem>
              <MenuItem value={"hi"}>Hawaii</MenuItem>
              <MenuItem value={"id"}>Idaho</MenuItem>
              <MenuItem value={"il"}>Illinois</MenuItem>
              <MenuItem value={"in"}>Indiana</MenuItem>
              <MenuItem value={"ia"}>Iowa</MenuItem>
              <MenuItem value={"ks"}>Kansas</MenuItem>
              <MenuItem value={"ky"}>Kentucky</MenuItem>
              <MenuItem value={"la"}>Louisiana</MenuItem>
              <MenuItem value={"me"}>Maine</MenuItem>
              <MenuItem value={"md"}>Maryland</MenuItem>
              <MenuItem value={"ma"}>Massachusetts</MenuItem>
              <MenuItem value={"mi"}>Michigan</MenuItem>
              <MenuItem value={"mn"}>Minnesota</MenuItem>
              <MenuItem value={"ms"}>Mississippi</MenuItem>
              <MenuItem value={"mo"}>Missouri</MenuItem>
              <MenuItem value={"mt"}>Montana</MenuItem>
              <MenuItem value={"ne"}>Nebraska</MenuItem>
              <MenuItem value={"nv"}>Nevada</MenuItem>
              <MenuItem value={"nh"}>New Hampshire</MenuItem>
              <MenuItem value={"nj"}>New Jersey</MenuItem>
              <MenuItem value={"nm"}>New mexico</MenuItem>
              <MenuItem value={"ny"}>New York</MenuItem>
              <MenuItem value={"nc"}>North Carolina</MenuItem>
              <MenuItem value={"nd"}>North Dakota</MenuItem>
              <MenuItem value={"oh"}>Ohio</MenuItem>
              <MenuItem value={"ok"}>Oklahoma</MenuItem>
              <MenuItem value={"or"}>Oregon</MenuItem>
              <MenuItem value={"pa"}>Pennsylvania</MenuItem>
              <MenuItem value={"ri"}>Rhode Island</MenuItem>
              <MenuItem value={"sc"}>South Carolina</MenuItem>
              <MenuItem value={"sd"}>South Dakota</MenuItem>
              <MenuItem value={"tn"}>Tennessee</MenuItem>
              <MenuItem value={"tx"}>Texas</MenuItem>
              <MenuItem value={"ut"}>Utah</MenuItem>
              <MenuItem value={"vt"}>Vermont</MenuItem>
              <MenuItem value={"va"}>Virginia</MenuItem>
              <MenuItem value={"wa"}>Washington</MenuItem>
              <MenuItem value={"wv"}>West Virginia</MenuItem>
              <MenuItem value={"wi"}>Wisconsin</MenuItem>
              <MenuItem value={"wy"}>Wyoming</MenuItem>
            </Select>
          </CustomFormControl>
        </Box>
      </div>
      {selectedState !== "" && !isStateAvailable && (
        <div className="mt-4 flex flex-col bg-white p-6 rounded-lg shadow-sm w-full max-w-lg">
          <p className="text-sm mb-0 text-black">
            It seems we’re not yet in {getStateMessage(selectedState)}. But we’d
            love to keep you updated. Enter your email below, and we'll notify
            you as soon as our services reach your location.
          </p>
          <div className="mt-4 flex flex-col justify-between">
            <label htmlFor="select-state-email" className="mb-1 font-semibold">
              Email
            </label>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 w-full justify-between">
              <div className="w-full sm:w-[76%]">
                <TextField
                  fullWidth
                  placeholder="Email"
                  value={stateEmail}
                  onChange={handleEmailChange}
                  error={!emailValidated && stateEmail !== ""}
                  helperText={
                    !emailValidated && stateEmail
                      ? "Please enter a valid email address."
                      : ""
                  }
                  sx={{
                    width: "100%",
                    ".MuiInputBase-input": {
                      width: "100%",
                      padding: "9px 5px",
                    },
                    ".MuiOutlinedInput-notchedOutline": {
                      width: "100%",
                    },
                  }}
                  FormHelperTextProps={{
                    sx: {
                      marginLeft: "0",
                    },
                  }}
                />
              </div>

              <div className="w-full sm:w-[24%]">
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleNotifyClick}
                  disabled={!emailValidated} // Only enable the Notify me button if the email is validated
                  className="items-center py-2 px-3 disabled:bg-brand-750 text-white"
                  sx={{
                    textTransform: "none", // This will keep the original case of the text.
                  }}
                >
                  Notify me
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizStateSelect;
