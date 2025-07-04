export function count_one(n) {
    let count = 0
    while(n) {
        n = n&(n-1);
        count++;
    }
    return count;
}

export function Geek(num) {
    let count = 0;
    while (num > 0) {
        count += num & 1;     // Check if the least significant bit is 1 
        // 8 & 1 = 0
        // 7 & 1 = 1
        num >>= 1;            // Shift bits right by 1 (drop the checked bit)
    }
    return count;             // Return total number of 1s
}


// console.log("here comes -- ", count_one(7))