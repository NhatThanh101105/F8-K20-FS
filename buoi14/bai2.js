function calculateScore(level, kills, boosted) {
    if (
        typeof level !== 'number' || 
        typeof kills !== 'number' || 
        isNaN(level) || 
        isNaN(kills) || 
        level < 0 || 
        kills < 0
    ) {
        return "Dữ liệu không hợp lệ";
    }
    const isBoosted = boosted === true;

    const baseScore = kills * 10;
    const bonusScore = level >= 5 ? baseScore * 0.5 : baseScore * 0.2;
    const finalScore = isBoosted ? (baseScore + bonusScore) * 2 : baseScore + bonusScore;

    return Math.floor(finalScore);
}