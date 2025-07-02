

function memoize(fn) {
    const cache = new Map();
    // fn.calls = 0;
    return (...args) => {
        let currentCache = cache;
        // Traverse the cache structure based on the arguments
        // Each argument creates a new level in the cache
        args.forEach((arg) => {
            if(!currentCache.has(arg)) {
                currentCache.set(arg, new Map());
            }
            currentCache = currentCache.get(arg);
        });
        if (currentCache.has("result")) {
            return currentCache.get("result")
        }
        const result = fn.apply(this, args);
        // fn.calls++;
        currentCache.set("result", result);
        return result
    }
}


// const getInputs = () => [[2,2],[2,2],[1,2]]
// const fn = function (a, b) { return a + b; }
// const getInputs = () => [[{},{}],[{},{}],[{},{}]] 
// const fn = function (a, b) { return ({...a, ...b}); }
// const getInputs = () => { const o = {}; return [[o,o],[o,o],[o,o]]; }
// const fn = function (a, b) { return ({...a, ...b}); }
// const memoizedFn = memoize(fn);
// Output: [{"val":4,"calls":1},{"val":4,"calls":1},{"val":3,"calls":2}]
// const result = getInputs().map((input) => {
//     return memoizedFn(...input);
// });

// console.log(`Memoized result: ${JSON.stringify(result)}`);

export default memoize;