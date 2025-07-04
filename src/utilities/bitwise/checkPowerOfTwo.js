
/**
 * 
### 🧠 Concept  
A number that is a power of two has **only one bit set to 1** in its binary representation. For example:  
- 1 → `0001`  
- 2 → `0010`  
- 4 → `0100`  
- 8 → `1000`  

Now here's the trick:  
When you subtract `1` from a power of two, you flip that single `1` bit to `0` and turn all lower bits to `1`.  
- For 8 → `1000`  
- 8 - 1 = 7 → `0111`  

### ⚙️ How the expression works  
```javascript
(num & (num - 1)) === 0
```
- The bitwise `AND` between `num` and `num - 1` clears the only set bit (if there's only one).
- If the result is `0`, it means **there was only one set bit**, so `num` is a power of two.
 */
export const isPowerOfTwo = (num) => {
  return (num & num - 1) === 0
}