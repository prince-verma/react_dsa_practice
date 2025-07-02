export function count_one(n) {
    let count = 0
    while(n) {
        n = n&(n-1);
        count++;
    }
    return count;
}

// console.log("here comes -- ", count_one(7))