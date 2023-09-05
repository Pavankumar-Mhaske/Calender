import React, { useState } from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function Calender({ setRemindeAt }) {
  // const [value, setValue] = useState(dayjs("2022-04-17T15:30"));
  //   console.log(value);
  const handleChange = (newValue) => {
    // setValue(newValue);
    setRemindeAt(newValue);
  };

  const currentDateTime = new Date(); // Get the current date and time
  const currentHour = currentDateTime.getHours(); // Get the current hour
  const currentMinute = currentDateTime.getMinutes(); // Get the current minute

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
        {/* <DateTimePicker
          label="Uncontrolled picker"
          defaultValue={dayjs("2022-04-17T15:30")}
        /> */}
        <DateTimePicker
          label="Uncontrolled picker"
          // defaultValue={dayjs('2022-04-17T15:30')}
          onChange={handleChange}
          // minDate={new Date()}
          // minDate={dayjs(new Date())}
          // minTime={dayjs()
          //   .set("hour", currentHour)
          //   .set("minute", currentMinute)
          //   .set("second", 0)}
          disablePast
          // slotProps={{
          //   actionBar: { actions: ["clear"] },
          // }}

          // Apply slotProps when applySlotProps is true
          // slotProps={
          //   applySlotProps
          //     ? {
          //         actionBar: { actions: ["clear"] },
          //       }
          //     : {}
          // }
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default Calender;
