function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

function printTriangleTable(n) {
    for (let i = 1; i <= n; i++) {
        let rowItems = [];
        for (let j = 1; j <= i; j++) {
            if (j % 3 === 0 && j % 5 === 0) {
                rowItems.push("#");
            } else if (isPrime(j)) {
                rowItems.push("*");
            } else {
                rowItems.push(j);
            }
        }
        console.log(rowItems.join(" "));
        if (i % 2 === 0) {
            console.log("-".repeat(i));
        }
    }
}