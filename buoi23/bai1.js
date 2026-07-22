function formatBirthday(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

function getAge(birthDateString, currentDateString) {
  const birth = new Date(birthDateString);
  const current = new Date(currentDateString);
  let age = current.getFullYear() - birth.getFullYear();
  const cm = current.getMonth(), bm = birth.getMonth();
  if (cm < bm || (cm === bm && current.getDate() < birth.getDate())) age--;
  return age;
}

function getDayOfWeekName(dateString) {
  const days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
  return days[new Date(dateString).getDay()];
}