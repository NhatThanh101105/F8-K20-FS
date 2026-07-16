const members = [
  { id: 1, name: "Minh Tran", email: "minh@example.com" },
  { id: 2, name: "Lan Pham", email: "lan@example.com" },
  { id: 3, name: "Huy Nguyen", email: "huy@example.com" },
  { id: 4, name: "Trang Le", email: "trang@example.com" },
  { id: 5, name: "Duc Vo", email: "duc@example.com" },
];

const books = [
  { id: 201, title: "Clean Code", finePerDay: 5000 },
  { id: 202, title: "Atomic Habits", finePerDay: 3000 },
  { id: 203, title: "Sapiens", finePerDay: 4000 },
  { id: 204, title: "Deep Work", finePerDay: 2000 },
  { id: 205, title: "The Pragmatic Programmer", finePerDay: 6000 },
];

const borrowRecords = [
  {
    id: 3001,
    memberId: 1,
    lines: [
      { bookId: 201, lateDays: 2 },
      { bookId: 202, lateDays: 0 },
    ],
  },
  {
    id: 3002,
    memberId: 2,
    lines: [
      { bookId: 202, lateDays: 1 },
      { bookId: 203, lateDays: 3 },
    ],
  },
  {
    id: 3003,
    memberId: 3,
    lines: [
      { bookId: 204, lateDays: 5 },
      { bookId: 205, lateDays: 2 },
    ],
  },
  {
    id: 3004,
    memberId: 4,
    lines: [
      { bookId: 201, lateDays: 1 },
      { bookId: 203, lateDays: 2 },
    ],
  },
  {
    id: 3005,
    memberId: 5,
    lines: [{ bookId: 205, lateDays: 10 }],
  },
  {
    id: 3006,
    memberId: 1,
    lines: [
      { bookId: 201, lateDays: 1 },
      { bookId: 205, lateDays: 3 },
    ],
  },
  {
    id: 3007,
    memberId: 2,
    lines: [
      { bookId: 204, lateDays: 2 },
      { bookId: 203, lateDays: 1 },
    ],
  },
  {
    id: 3008,
    memberId: 3,
    lines: [{ bookId: 202, lateDays: 2 }],
  },
  {
    id: 3009,
    memberId: 4,
    lines: [
      { bookId: 201, lateDays: 1 },
      { bookId: 202, lateDays: 1 },
    ],
  },
  {
    id: 3010,
    memberId: 5,
    lines: [
      { bookId: 203, lateDays: 4 },
      { bookId: 204, lateDays: 3 },
    ],
  },
];

function getMemberFineStatistics(members, books, borrowRecords) {
  const bookMap = new Map(books.map((b) => [b.id, b]));

  // memberId -> Map(bookId -> tổng lateDays)
  const memberBookAgg = new Map();

  for (const record of borrowRecords) {
    const { memberId, lines } = record;
    if (!Array.isArray(lines)) continue;

    if (!memberBookAgg.has(memberId)) {
      memberBookAgg.set(memberId, new Map());
    }
    const bookAgg = memberBookAgg.get(memberId);

    for (const line of lines) {
      const { bookId, lateDays } = line;
      bookAgg.set(bookId, (bookAgg.get(bookId) || 0) + lateDays);
    }
  }

  const result = members.map((member) => {
    const bookAgg = memberBookAgg.get(member.id);
    let totalFine = 0;
    let bookList = [];

    if (bookAgg) {
      bookList = Array.from(bookAgg.entries()).map(([bookId, lateDays]) => {
        const bookInfo = bookMap.get(bookId);
        const finePerDay = bookInfo ? bookInfo.finePerDay : 0;
        const title = bookInfo ? bookInfo.title : "Unknown";
        const fine = finePerDay * lateDays;
        totalFine += fine;
        return { title, lateDays, fine };
      });

      bookList.sort((a, b) => b.fine - a.fine);
    }

    return {
      id: member.id,
      name: member.name,
      totalFine,
      books: bookList,
    };
  });

  result.sort((a, b) => b.totalFine - a.totalFine);

  return result;
}

module.exports = { getMemberFineStatistics };

const result = getMemberFineStatistics(members, books, borrowRecords);
console.log(JSON.stringify(result, null, 2));