function analyzeValue(value) {
    const type = typeof value;
    const isTruthy = !!value;
    const isNullOrUndefined = value === null || value === undefined;
    const isReferenceType = (type === 'object' && value !== null) || type === 'function';
    return {
        input: value,
        type: type,
        isTruthy: isTruthy,
        isNullOrUndefined: isNullOrUndefined,
        isReferenceType: isReferenceType
    };
}