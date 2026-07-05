const examResults = [
  { student: "An", scores: [8.5, 7, 9, 6.5] },
  { student: "Bình", scores: [10, 9.5, 8, 10] },
  { student: "Chi", scores: [5, 4.5, 6, 5.5] },
  { student: "Duy", scores: [7, 7, 7, 7] },
];

function getAverage(scores) {
  const sum = scores.reduce((acc, s) => acc + s, 0);
  const avg = sum / scores.length;
  return Number(avg.toFixed(1));
}

function classifyStudent(average) {
  if (average >= 9) return "Xuất sắc";
  if (average >= 8) return "Giỏi";
  if (average >= 6.5) return "Khá";
  if (average >= 5) return "Trung bình";
  return "Yếu";
}

function isValidScore(score) {
  return Number.isFinite(score) && score >= 0 && score <= 10;
}

function getReportCard(examResults) {
  return examResults.map(({ student, scores }) => {
    const average = getAverage(scores);
    return {
      student,
      average,
      classification: classifyStudent(average),
    };
  });
}