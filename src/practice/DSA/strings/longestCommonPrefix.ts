// https://leetcode.com/problems/longest-common-prefix/

class TrieNode {
  children: Record<string, TrieNode>;
  endOfWord: boolean;
  constructor() {
    this.children = {};
    this.endOfWord = false;
  }
}

class Trie {
  root: TrieNode;
  constructor() {
    this.root = new TrieNode();
  }

  insertWord(str: string): void {
    let curr = this.root;
    for (let char of str) {
      if (!(char in curr.children)) {
        curr.children[char] = new TrieNode();
      }
      curr = curr.children[char]!;
    }
    curr.endOfWord = true;
  }

  insertEmptyStr(): void {
    let curr = this.root;
    const char = "";
    if (!(char in curr.children)) {
      curr.children[char] = new TrieNode();
    }
    curr = curr.children[char]!;
    curr.endOfWord = true;
  }
}

function longestCommonPrefix(strs: string[]): string {
  let result = "";
  let minLength = Infinity;
  const charTree: Trie = new Trie();

  for (let str of strs) {
    str.length ? charTree.insertWord(str) : charTree.insertEmptyStr();
    minLength = Math.min(minLength, str.length);
  }

  // console.log(minLength, charTree);

  let curr = charTree.root;
  while (
    Object.keys(curr.children).length === 1 &&
    result.length !== minLength
  ) {
    const char = Object.keys(curr.children)[0];
    result += char;
    curr = curr.children[char];
  }
  return result;
}

// const strs = ["flower", "flow", "flight"];
// const strs1 = ["dog", "racecar", "car"];
// const strs2 = ["", "b"];
// const strs3 = ["ab", "a"];
// console.log(longestCommonPrefix(strs));
// console.log(longestCommonPrefix(strs1));
// console.log(longestCommonPrefix(strs2));
// console.log(longestCommonPrefix(strs3));
