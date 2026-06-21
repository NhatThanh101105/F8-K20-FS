function analyzeClass(scores) {
    let xuatSac = 0, gioi = 0, kha = 0, trungBinh = 0, yeu = 0;
    let invalidCount = 0;
    let validCount = 0;
    let sum = 0;
    
    let maxScore = -1;
    let minScore = 11;

    for (let i = 0; i < scores.length; i++) {
        let score = scores[i];
        
        if (score < 0 || score > 10 || typeof score !== 'number' || isNaN(score)) {
            invalidCount++;
            continue;
        }

        validCount++;
        sum += score;

        if (score > maxScore) maxScore = score;
        if (score < minScore) minScore = score;

        if (score >= 9 && score <= 10) {
            xuatSac++;
        } else if (score >= 8 && score < 9) {
            gioi++;
        } else if (score >= 6.5 && score < 8) {
            kha++;
        } else if (score >= 5 && score < 6.5) {
            trungBinh++;
        } else {
            yeu++;
        }
    }

    if (validCount === 0) {
        return {
            phanLoai: { xuatSac: 0, gioi: 0, kha: 0, trungBinh: 0, yeu: 0 },
            diemCaoNhat: null,
            diemThapNhat: null,
            diemTrungBinh: 0,
            soDiemKhongHopLe: invalidCount,
            nhanXet: "Không có dữ liệu hợp lệ"
        };
    }

    let rawAvg = sum / validCount;
    let diemTrungBinh = Math.round(rawAvg * 100) / 100;

    let nhanXet = "";
    let khaTroLen = xuatSac + gioi + kha;

    if (khaTroLen > validCount / 2) {
        nhanXet = "Lớp học tốt";
    } else if (yeu > validCount / 2) {
        nhanXet = "Cần cải thiện";
    } else {
        nhanXet = "Lớp học ở mức ổn";
    }

    return {
        phanLoai: { xuatSac, gioi, kha, trungBinh, yeu },
        diemCaoNhat: maxScore,
        diemThapNhat: minScore,
        diemTrungBinh: diemTrungBinh,