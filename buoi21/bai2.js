const students = [
  { id: 1, name: "Khoa Nguyen" },
  { id: 2, name: "My Tran" },
  { id: 3, name: "Phong Le" },
  { id: 4, name: "Yen Vo" },
  { id: 5, name: "Bao Pham" },
];

const answerKey = [
  { question: 1, correctAnswer: "A", point: 2 },
  { question: 2, correctAnswer: "C", point: 1 },
  { question: 3, correctAnswer: "B", point: 3 },
  { question: 4, correctAnswer: "D", point: 2 },
  { question: 5, correctAnswer: "A", point: 2 },
];

const submissions = [
  {
    studentId: 1,
    submittedAt: "2026-07-10T08:00:00",
    answers: [
      { question: 1, answer: "A" },
      { question: 2, answer: "C" },
      { question: 3, answer: "B" },
      { question: 4, answer: "A" },
      { question: 5, answer: "A" },
    ],
  },
  {
    studentId: 2,
    submittedAt: "2026-07-10T08:05:00",
    answers: [
      { question: 1, answer: "A" },
      { question: 2, answer: "B" },
      { question: 3, answer: "B" },
      { question: 4, answer: "D" },
      { question: 5, answer: "C" },
    ],
  },
  {
    studentId: 3,
    submittedAt: "2026-07-10T07:58:00",
    answers: [
      { question: 1, answer: "A" },
      { question: 2, answer: "C" },
      { question: 3, answer: "B" },
      { question: 4, answer: "D" },
      { question: 5, answer: "A" },
    ],
  },
  {
    studentId: 4,
    submittedAt: "2026-07-10T08:02:00",
    answers: [
      { question: 1, answer: "B" },
      { question: 2, answer: "C" },
    ],
  },
  {
    studentId: 5,
    submittedAt: "2026-07-10T08:01:00",
    answers: [
      { question: 1, answer: "A" },
      { question: 2, answer: "C" },
      { question: 3, answer: "B" },
      { question: 4, answer: "D" },
      { question: 5, answer: "A" },
    ],
  },
];

function gradeExam(students, answerKey, submissions) {
  const submissionMap = new Map();
  for (const sub of submissions) {
    if (!Array.isArray(sub.answers)) continue;
    submissionMap.set(sub.studentId, sub);
  }

  const raw = students.map((student) => {
    const sub = submissionMap.get(student.id);
    let score = 0;
    let correctCount = 0;
    const wrongQuestions = [];

    if (sub) {
      const answerMap = new Map(sub.answers.map((a) => [a.question, a.answer]));
      for (const key of answerKey) {
        const studentAnswer = answerMap.get(key.question);
        if (studentAnswer === key.correctAnswer) {
          score += key.point;
          correctCount++;
        } else {
          wrongQuestions.push(key.question);
        }
      }
    } else {
      for (const key of answerKey) {
        wrongQuestions.push(key.question);
      }
    }

    wrongQuestions.sort((a, b) => a - b);

    return {
      id: student.id,
      name: student.name,
      score,
      correctCount,
      wrongQuestions,
      submittedAt: sub ? sub.submittedAt : null,
    };
  });

  // Competition ranking: đồng điểm -> đồng rank, rank sau nhảy cóc
  const rankSorted = [...raw].sort((a, b) => b.score - a.score);
  const rankMap = new Map();
  let currentRank = 0;
  let previousScore = null;

  rankSorted.forEach((item, idx) => {
    if (previousScore === null || item.score !== previousScore) {
      currentRank = idx + 1;
      previousScore = item.score;
    }
    rankMap.set(item.id, currentRank);
  });

  const finalSorted = [...raw].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const aTime = a.submittedAt ? new Date(a.submittedAt).getTime() : Infinity;
    const bTime = b.submittedAt ? new Date(b.submittedAt).getTime() : Infinity;
    return aTime - bTime;
  });

  return finalSorted.map((item) => ({
    id: item.id,
    name: item.name,
    score: item.score,
    correctCount: item.correctCount,
    wrongQuestions: item.wrongQuestions,
    rank: rankMap.get(item.id),
  }));
}

module.exports = { gradeExam };

const result = gradeExam(students, answerKey, submissions);
console.log(JSON.stringify(result, null, 2));