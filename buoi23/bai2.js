function addDays(dateString, days) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

function getDaysBetween(date1String, date2String) {
  const diffMs = Math.abs(new Date(date2String) - new Date(date1String));
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

function isExpired(expiryDateString, currentDateString) {
  return new Date(currentDateString) > new Date(expiryDateString);
}

function getCountdown(targetDateString, currentDateString) {
  const diffMs = new Date(targetDateString) - new Date(currentDateString);
  if (diffMs <= 0) return 'Đã qua hạn';
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  return `Còn ${days} ngày ${hours} giờ`;
}