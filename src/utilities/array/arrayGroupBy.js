Array.prototype.groupBy = function (fn) {
  return this.reduce((acc, item) => {
    const key = fn(item);
    if (!(key in acc)) {
        acc[key] = []
    }
    acc.push(item);
    return acc
  }, {});
};
