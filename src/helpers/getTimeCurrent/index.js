export function getTimeCurrent() {
  const date = new Date();
  let seconds = date.getSeconds();
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  let minutes = date.getMinutes();
  minutes = minutes > 9 ? minutes : `0${minutes}`;
  let hours = date.getHours();
  hours = hours > 9 ? hours : `0${hours}`;
  let day = date.getDate();
  day = day > 9 ? day : `0${day}`;
  let month = date.getMonth() + 1; // Tháng bắt đầu từ 0
  month = month > 9 ? month : `0${month}`;
  const year = date.getFullYear(); // ✅ đặt đúng chỗ

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
