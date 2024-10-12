import { DateValue, useLocale } from "react-aria";
import { useCalendarGrid } from "react-aria";
import { CalendarState } from "react-stately";
import {
  getWeeksInMonth,
  DateDuration,
  endOfMonth,
} from "@internationalized/date";
import { CalendarCell } from "./CalendarCell";
export const CalendarGrid = ({
  state,
  offset = {},
  isDateUnavailable,
}: {
  state: CalendarState;
  offset?: DateDuration;
  isDateUnavailable?: (date: DateValue) => boolean;
}) => {
  const startDate = state.visibleRange.start.add(offset);
  const endDate = endOfMonth(startDate);
  let { locale } = useLocale();
  let { gridProps, headerProps, weekDays } = useCalendarGrid(
    { startDate, endDate, weekdayStyle: "short" },
    state
  );
  const weeksInMonth = getWeeksInMonth(startDate, locale);
  return (
    <table {...gridProps} cellPadding={0} className="flex-1">
      <thead {...headerProps} className="text-sm font-medium">
        <tr>
          {weekDays.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell
                    currentMonth={startDate}
                    key={i}
                    state={state}
                    date={date}
                    isDateUnavailable={isDateUnavailable?.(date)}
                  />
                ) : (
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
