const text = "javascript là ngôn ngữ lập trình phổ biến javascript chạy trên trình duyệt và javascript cũng chạy trên server";

function getWords(text) {
  return text.split(" ");
}

function countWord(text, word) {
  return getWords(text).filter(w => w === word).length;
}

function getUniqueWords(text) {
  return [...new Set(getWords(text))].sort((a, b) => a.localeCompare(b));
}

function getTopWords(text, n) {
  const wordCounts = getWords(text).reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(wordCounts)
    .map(word => ({ word, count: wordCounts[word] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, n);
}

function highlight(text, word) {
  return text.replace(new RegExp(`\\b${word}\\b`, 'g'), `**${word}**`);
}