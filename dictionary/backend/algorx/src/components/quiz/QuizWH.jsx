import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import { usePatientQuizFlow } from "../../lib/store/patientquizflow";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  components: {
    MuiButtonBase: {
      // This will affect all components that use ButtonBase, such as Button
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiInputBase: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          padding: "12px 16px",
          "&.Mui-selected": {
            color: "white",
            backgroundColor: "#0066C0",
            borderColor: "transparent", // No border when selected
            "&:hover": {
              backgroundColor: "#0066C0", // When selected, hover the mouse to keep the background color unchanged.
            },
          },
          "&:not(.Mui-selected)": {
            color: "#18181B", // Text color when not selected
            backgroundColor: "white", // Background color when not selected
            borderColor: "#E4E4E7", // Border color when not selected
          },
          // Eliminate the hover effect in all states
          "&:hover": {
            backgroundColor: "white", // Keep the background color unchanged when hovering
            borderColor: "#E4E4E7", // Keep the border color unchanged when the mouse hovers.
          },
          // Style in the disabled state
          "&.Mui-disabled": {
            color: "#18181B", // Text color when disabled
            backgroundColor: "white", // Background color when disabled
            borderColor: "#E4E4E7", // Border color when disabled
            "&.Mui-selected": {
              backgroundColor: "white", // When disabled and selected, the background color
              color: "#18181B", // Text color when disabled and selected
              opacity: 1, // Transparency can be adjusted to distinguish
            },
          },
        },
      },
    },
  },
});

function QuizWHInputComponent() {
  const {
    weight,
    setWeight,
    originalWeight,
    setOriginalWeight,
    weightUnit,
    setWeightUnit,
    convertWeight,
    validateWeight,
    weightError,

    height,
    originalHeight,
    heightUnit,
    heightError,
    setHeight,
    setOriginalHeight,
    setHeightUnit,
    convertHeight,
    validateHeight,

    canWeightContinue,
  } = usePatientQuizFlow();

  const handleWeightChange = (event) => {
    const newWeight = event.target.value;
    const isValid = validateWeight(newWeight);

    if (isValid) {
      // handle accuracy loss
      setOriginalWeight(newWeight);
      setWeight(newWeight); // Update the weight only after verification
    }
  };

  const handleUnitChange = (e, newUnit) => {
    // console.log("TEST: ", e.target.value, newUnit);
    if (newUnit !== null && newUnit !== weightUnit && weight) {
      // handle accuracy loss
      setWeightUnit(newUnit); // Update the unit
      if (newUnit !== "lbs") {
        const converted = convertWeight(weight, weightUnit, newUnit);
        if (converted) {
          // setWeight(Math.round(converted));
          setWeight(converted); // Update the converted weight
        }
      } else {
        setWeight(originalWeight);
      }
    }
  };

  const handleHeightChange = (event) => {
    const newHeight = event.target.value;

    if (heightUnit === "cm") {
      if (validateHeight(newHeight, "cm")) {
        setHeight(newHeight);
      }
    } else {
      // Remove leading zeros for foot value
      const normalizedHeight = newHeight.replace(/^0+/, "");

      if (validateHeight(normalizedHeight, "ft/in")) {
        setOriginalHeight(normalizedHeight);
        setHeight(normalizedHeight);
      }
    }
  };

  const handleHeightUnitChange = (event, newUnit) => {
    if (newUnit !== null && newUnit !== heightUnit) {
      setHeightUnit(newUnit);

      //  ->
      // Use rounding
      if (newUnit === "cm" && heightUnit === "ft/in") {
        // Convert from ft/in to cm
        const converted = convertHeight(originalHeight, "ft/in", "cm");
        setHeight(converted ?? "");
      }

      // <-
      // Use rounding
      else if (newUnit === "ft/in" && heightUnit === "cm") {
        // Convert from cm to ft/in
        const converted = convertHeight(height, "cm", "ft/in");
        setOriginalHeight(converted ?? "");
        setHeight(converted ?? "");
      }
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <div className="w-full flex flex-col items-center space-y-8">
          {/* Weight Input and Switch */}
          <div className="flex flex-col items-center mb-4 space-y-2">
            <label
              htmlFor="weight-input"
              className="text-2xl font-semibold mb-4"
            >
              What is your weight?
            </label>

            <div className="flex flex-col sm:flex-row w-full justify-between gap-2">
              <TextField
                id="weight-input"
                value={weight}
                onChange={handleWeightChange}
                error={!!weightError}
                helperText={weightError}
                autoComplete="off"
                disabled={weightUnit !== "lbs"}
                sx={{
                  width: "204px",
                  ".MuiInputBase-input": {
                    backgroundColor: "white",
                    borderRadius: "0.5rem",
                    width: "194px",
                    padding: "9px 5px",
                  },
                  ".MuiOutlinedInput-notchedOutline": {
                    width: "204px",
                  },
                }}
                FormHelperTextProps={{
                  sx: {
                    marginLeft: "0",
                  },
                }}
              />

              <ToggleButtonGroup
                color="primary"
                value={weightUnit}
                exclusive
                onChange={handleUnitChange}
                sx={{
                  height: "40px",
                }}
              >
                <ToggleButton value="lbs" className="mr-2 rounded-xl border">
                  lbs
                </ToggleButton>
                <ToggleButton value="kg" className="mr-2 rounded-xl border">
                  kg
                </ToggleButton>
                <ToggleButton value="st" className="mr-2 rounded-xl border">
                  st
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>

          {/* Height Input and Switch */}
          <div className="flex flex-col items-center mb-4 space-y-2">
            <label
              htmlFor="height-input"
              className="text-2xl font-semibold mb-4"
            >
              What is your height?
            </label>

            <div className="flex flex-col sm:flex-row w-full justify-between gap-2">
              <TextField
                id="height-input"
                value={heightUnit === "ft/in" ? originalHeight : height}
                onChange={handleHeightChange}
                error={!!heightError}
                helperText={
                  heightUnit === "ft/in"
                    ? "Use ' to separate feet and inches." || heightError
                    : "Please enter the number." || heightError
                }
                autoComplete="off"
                // Add sx props or className for styling
                sx={{
                  width: "204px",
                  ".MuiInputBase-input": {
                    backgroundColor: "white",
                    borderRadius: "0.5rem",
                    width: "194px",
                    padding: "9px 5px",
                  },
                  ".MuiOutlinedInput-notchedOutline": {
                    width: "204px",
                  },
                }}
                FormHelperTextProps={{
                  sx: {
                    margin: "0",
                    color: "#1297F3",
                  },
                }}
              />

              <ToggleButtonGroup
                color="primary"
                value={heightUnit}
                exclusive
                onChange={handleHeightUnitChange}
                // Add sx props or className for styling
                sx={{
                  height: "40px",
                }}
              >
                <ToggleButton value="ft/in" className="mr-2 rounded-xl border">
                  ft/in
                </ToggleButton>
                <ToggleButton value="cm" className="mr-12 rounded-xl border">
                  cm
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default QuizWHInputComponent;
