import { TSchedule } from './booking.interface';
import { isValid, parse } from 'date-fns';

export const timeConflict = (
  schedules: TSchedule[],
  newSchedule: TSchedule,
): boolean => {
  const newScheduleDate = new Date(newSchedule.date);
  const newStartTime = new Date(
    `${newSchedule.date}T${newSchedule.startTime}:00Z`,
  );
  const newEndTime = new Date(`${newSchedule.date}T${newSchedule.endTime}:00Z`);

  for (const schedule of schedules) {
    const scheduleDate = new Date(schedule.date);

    if (
      scheduleDate.getFullYear() === newScheduleDate.getFullYear() &&
      scheduleDate.getMonth() === newScheduleDate.getMonth() &&
      scheduleDate.getDate() === newScheduleDate.getDate()
    ) {
      const startTime = new Date(
        `${new Date(schedule.date).toISOString().split('T')[0]}T${schedule.startTime}:00Z`,
      );
      const endTime = new Date(
        `${new Date(schedule.date).toISOString().split('T')[0]}T${schedule.endTime}:00Z`,
      );

      if (
        (newStartTime >= startTime && newStartTime < endTime) ||
        (newEndTime > startTime && newEndTime <= endTime) ||
        (newStartTime <= startTime && newEndTime >= endTime)
      ) {
        return true; // Conflict found
      }
    }
  }

  return false; // No conflict
};

export const validateDateFormat = (dateString: string) => {
  const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
  return isValid(parsedDate);
};

export const formatDate = (dateTime: Date): string => {
  const date = new Date(dateTime);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  // Format the date as DD-MM-YYYY
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
