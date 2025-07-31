var lengthOfLongestSubstring = function(str) {
    if (str.length < 2) return str.length;

    let maxLength = 0;
    let start = 0;
    const charIndexMap = new Map();

    for (let end = 0; end < str.length; end++) {
        const currentChar = str[end];
        if (charIndexMap.has(currentChar) && charIndexMap.get(currentChar) >= start) {
            start = charIndexMap.get(currentChar) + 1;
        }
        charIndexMap.set(currentChar, end);
        maxLength = Math.max(maxLength, end - start + 1);
    }
    return maxLength;
};

// console.log(lengthOfLongestSubstring("abcbabdcabc"))
// console.log(lengthOfLongestSubstring("baaabcabcabc"))
// console.log(lengthOfLongestSubstring("pwwpkewn"))

export default lengthOfLongestSubstring;