
const comments = [
  { id: 1, user: "An", content: "Sản phẩm rất tốt!", rating: 5, verified: true, likes: 12 },
  { id: 2, user: "", content: "ok", rating: 3, verified: false, likes: 0 },
  { id: 3, user: "Bình", content: "Mua lần 2 rồi, vẫn chất lượng", rating: 4, verified: true, likes: 8 },
  { id: 4, user: "Chi", content: "   ", rating: null, verified: false, likes: 2 },
  { id: 5, user: "Duy", content: "Giao hàng nhanh, đóng gói cẩn thận, sẽ ủng hộ tiếp!", rating: 5, verified: true, likes: 20 },
  { id: 6, user: null, content: "Tệ quá", rating: 1, verified: false, likes: 0 },
  { id: 7, user: "Em", content: "Bình thường", rating: 3, verified: true, likes: 1 },
];

function isValidComment(comment) {
  const { user, content, rating } = comment;
  const validUser = typeof user === "string" && user.trim().length > 0;
  const validContent = typeof content === "string" && content.trim().length >= 5;
  const validRating = typeof rating === "number" && rating >= 1 && rating <= 5;
  return validUser && validContent && validRating;
}

function filterValidComments(comments) {
  return comments.filter(isValidComment);
}

function getCommentStats(validComments) {
  const total = validComments.length;
  const totalLikes = validComments.reduce((sum, c) => sum + c.likes, 0);
  const avgRating = Math.round(
    (validComments.reduce((sum, c) => sum + c.rating, 0) / total) * 10
  ) / 10;
  const verifiedCount = validComments.filter(c => c.verified).length;
  const topComment = validComments.reduce((top, c) => (c.likes > top.likes ? c : top));
  return { total, avgRating, totalLikes, verifiedCount, topComment };
}

function formatComment(comment) {
  const stars = "⭐".repeat(comment.rating);
  const name = (comment.user ?? "Ẩn danh") + (comment.verified ? " ✓" : "");
  return `${stars} | ${name} | ${comment.content} | 👍 ${comment.likes}`;
}


console.log(isValidComment(comments[0])); 
console.log(isValidComment(comments[1])); 
console.log(isValidComment(comments[3])); 
console.log(isValidComment(comments[5])); 

const valid = filterValidComments(comments);
console.log(valid.map(c => c.id)); 

console.log(getCommentStats(valid));

console.log(formatComment(comments[0]));
console.log(formatComment(comments[2]));
console.log(formatComment(comments[6]));

module.exports = { isValidComment, filterValidComments, getCommentStats, formatComment };