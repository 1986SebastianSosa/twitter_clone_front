export const getTimeElapsed = (date) => {
  const second = 1000;
  const minute = 1000 * 60;
  const hour = 1000 * 60 * 60;
  const day = 1000 * 60 * 60 * 24;
  const month = 1000 * 60 * 60 * 24 * 30;
  const year = 1000 * 60 * 60 * 24 * 30 * 12;
  let difference = Date.now() - Date.parse(date);

  if (difference < second) {
    return "Now";
  }
  if (difference < minute) {
    return `${Math.floor(difference / second)}s`;
  }
  if (difference < hour) {
    return `${Math.floor(difference / minute)}min`;
  }
  if (difference < day) {
    return `${Math.floor(difference / hour)}hr`;
  }
  if (difference < month) {
    return `${Math.floor(difference / day)}d`;
  }
  if (difference < year) {
    return `${Math.floor(difference / month)}mth`;
  } else {
    return `${Math.floor(difference / year)}y`;
  }
};
