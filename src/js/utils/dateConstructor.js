export function dateConstructor(date) {
  const nowDate = new Date(date);
  const months = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'.split(',');
  const dateFormat = `${nowDate.getDate()} ${months[nowDate.getMonth()]}, ${nowDate.getFullYear()}`;
  return dateFormat;
}