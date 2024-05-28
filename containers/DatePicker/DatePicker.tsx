"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Error } from "@/components/text";

type Props = {
  date: Date | null;
  setDate: (date: Date | null) => void;
  placeholder?: string;
  dateOnly?: boolean;
  minDate?: Date;
  maxDate?: Date;
  showYearDropdown?: boolean;
  fieldErrors?: string[];
  className?: string;
};

export default (props: Props) => {
  return (
    <div className={`w-full flex flex-col ${props.className}`}>
      <DatePicker
        selected={props.date}
        onChange={(date) => props.setDate(date)}
        timeInputLabel="Time:"
        onFocus={e => e.target.blur()}
        dateFormat={props.dateOnly ? "dd/MM/yyyy" : "dd/MM/yyyy h:mm aa"}
        showTimeInput={!props.dateOnly}
        className={`w-full py-1 px-2 text-secondary bg-card placeholder-secondary placeholder-opacity-100 my-3 rounded-lg ${props.fieldErrors?.length ? "!bg-red-600 !text-white !placeholder-white" : ""}`}
        placeholderText={props.placeholder}
        minDate={props.minDate}
        maxDate={props.maxDate}
        showYearDropdown={props.showYearDropdown}
        dropdownMode="select"
      />
      <Error>{props.fieldErrors?.join(" ") || ""}</Error>
    </div>
  );
};
