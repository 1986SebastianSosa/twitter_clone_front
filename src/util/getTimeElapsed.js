function getTimeElapsed(date) {
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
    return `${Math.floor(difference / second)} sec ago`;
  }
  if (difference < hour) {
    return `${Math.floor(difference / minute)} min ago`;
  }
  if (difference < day) {
    return `${Math.floor(difference / hour)} hr ago`;
  }
  if (difference < month) {
    return `${Math.floor(difference / day)} days ago`;
  }
  if (difference < year) {
    return `${Math.floor(difference / month)} months ago`;
  } else {
    return `${Math.floor(difference / year)} years ago`;
  }
}

export default getTimeElapsed;
