
const players = [
  { id: 1, name: "DragonSlayer", scores: [120, 85, 200, 95], level: 8, badge: "gold" },
  { id: 2, name: "NightWolf",    scores: [60, 75, 50],        level: 5, badge: null },
  { id: 3, name: "StarQueen",    scores: [300, 250, 180, 90, 120], level: 12, badge: "diamond" },
  { id: 4, name: "IronFist",     scores: [40, 30],             level: 2, badge: null },
  { id: 5, name: "ShadowBlade",  scores: [150, 200, 175],      level: 9, badge: "silver" },
];

function getTotalScore(player) {
  return player.scores.reduce((sum, s) => sum + s, 0);
}

function getRanking(players) {
  return players
    .map(p => ({ name: p.name, totalScore: getTotalScore(p), badge: p.badge ?? "none" }))
    .sort((a, b) => b.totalScore - a.totalScore)
    .map((p, i) => ({ rank: i + 1, ...p }));
}

function getTopPlayers(players, n) {
  return getRanking(players).slice(0, n).map(p => p.name);
}

function formatPlayerCard(player) {
  const totalScore = getTotalScore(player);
  const badgeMap = {
    diamond: "💎 DIAMOND",
    gold: "🏅 GOLD",
    silver: "🥈 SILVER",
  };
  let card = `${player.name} | Lv.${player.level} | ${totalScore} điểm`;
  if (player.badge && badgeMap[player.badge]) {
    card += ` | ${badgeMap[player.badge]}`;
  }
  return card;
}


console.log(getTotalScore(players[0])); // 500
console.log(getTotalScore(players[3])); // 70

console.log(getRanking(players));

console.log(getTopPlayers(players, 3)); // ["StarQueen", "ShadowBlade", "DragonSlayer"]
console.log(getTopPlayers(players, 1)); // ["StarQueen"]

console.log(formatPlayerCard(players[0])); // DragonSlayer | Lv.8 | 500 điểm | 🏅 GOLD
console.log(formatPlayerCard(players[1])); // NightWolf | Lv.5 | 185 điểm
console.log(formatPlayerCard(players[2])); // StarQueen | Lv.12 | 940 điểm | 💎 DIAMOND

module.exports = { getTotalScore, getRanking, getTopPlayers, formatPlayerCard };