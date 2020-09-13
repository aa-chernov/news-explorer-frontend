export function dater(data) {
  const year = data.getFullYear();
  let month = data.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = data.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`
}

