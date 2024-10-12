"use client";
import { DateValue, useCalendar, useLocale } from "react-aria";
import { useCalendarState } from "react-stately";
import { CalendarProps } from "@react-types/calendar";
import { createCalendar } from "@internationalized/date";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
export const Calendar = (
  props: CalendarProps<DateValue> & {
    isDateUnavailable?: (date: DateValue) => boolean;
  }
) => {
  const { locale } = useLocale();
  let state = useCalendarState({
    ...props,
    visibleDuration: { months: 1 },
    locale: locale,
    createCalendar,
  });
  let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    props,
    state
  );

  return (
    <div className="inline-block" {...calendarProps}>
      <CalendarHeader
        state={state}
        calendarProps={calendarProps}
        prevButtonProps={prevButtonProps}
        nextButtonProps={nextButtonProps}
      />
      <div className="flex gap-8">
        <CalendarGrid
          state={state}
          isDateUnavailable={props.isDateUnavailable}
        />
      </div>
    </div>
  );
};
