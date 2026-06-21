function classifyUser(user) {
    const displayName = user.name || "Ẩn danh";
    const isAdult = user.age >= 18;
    const hasEmail = typeof user.email === 'string' && user.email.length > 0;
    const role = (user.role !== null && user.role !== undefined) ? user.role : "guest";
    let status = "new";
    if (user.score >= 80) {
        status = "vip";
    } else if (user.score >= 50) {
        status = "normal";
    }
    const canAccess = isAdult && role !== "guest";
    return {
        displayName,
        isAdult,
        hasEmail,
        role,
        status,
        canAccess
    };
}