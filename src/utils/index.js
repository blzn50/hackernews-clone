import dayjs from 'dayjs';

// manipulating date/time e.g. 2 minutes ago, 5 hours ago
export const timeManipulator = (time) => {
  const convertedDate = dayjs.unix(time);
  const now = dayjs();
  const tooltipTime = convertedDate.toDate().toString();
  let manipulatedTime;

  const minute = now.diff(convertedDate, 'minute');
  const hour = now.diff(convertedDate, 'hour');
  const day = now.diff(convertedDate, 'day');
  const year = now.diff(convertedDate, 'year');

  if (minute < 60) {
    if (minute < 2) {
      manipulatedTime = `${minute} minute`;
    } else {
      manipulatedTime = `${minute} minutes`;
    }
  } else if (hour < 24) {
    if (hour === 1) {
      manipulatedTime = `1 hour`;
    } else {
      manipulatedTime = `${hour} hours`;
    }
  } else if (day < 365) {
    if (day === 1) {
      manipulatedTime = '1 day';
    } else {
      manipulatedTime = `${day} days`;
    }
  } else {
    if (year === 1) {
      manipulatedTime = '1 year';
    } else {
      manipulatedTime = `${year} years`;
    }
  }

  return { manipulatedTime, tooltipTime };
};
