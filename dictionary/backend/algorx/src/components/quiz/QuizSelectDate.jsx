import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { useState } from "react";
import { usePatientQuizFlow } from "../../lib/store/patientquizflow";

export default function QuizBirthday() {
  const { selectedDate, setSelectedDate, setIsOfAge } = usePatientQuizFlow();
  const [value, setValue] = useState(null);

  const handleDateChange = (newValue) => {
    setValue(newValue);
    setSelectedDate(newValue);
    if (newValue) {
      const age = dayjs().diff(newValue, "year");
      setIsOfAge(age >= 18 && age <= 100);
    } else {
      setIsOfAge(false);
    }
  };

  // Set the minimum date to today 18 years ago
  const maxDate = dayjs().subtract(18, "year");

  const minDate = dayjs().subtract(100, "year");

  return (
    <div className="flex flex-col w-full sm:max-w-sm sm:items-center gap-y-6 px-2 sm:px-0">
      <div>
        <h2 className="text-2xl font-semibold text-neutral-900 text-left sm:text-center">
          What is your date of birth?
        </h2>
      </div>
      <div className="w-full">
        <label
          htmlFor="date-select-label"
          className="font-semibold mb-1 block sm:hidden"
        >
          Date
        </label>

        <div className="w-full">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              fullWidth
              className={`w-full bg-white focus:outline-none focus:ring-0 rounded-lg`}
              format="DD/MM/YYYY"
              value={selectedDate}
              onChange={handleDateChange}
              minDate={minDate}
              maxDate={maxDate}
              slotProps={{
                textField: {
                  InputProps: {
                    color: "primary",
                  },
                },
                popper: { placement: "bottom" },
                inputAdornment: { position: "end" },
              }}
            />
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
}
