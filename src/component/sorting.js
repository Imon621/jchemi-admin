// sort function
const sorter = (arr) => {
  arr.sort((a, b) => {
    return a.no - b.no;
  });
  return arr;
};
// type filtering data
const filt = (type, array) => {
  const arr = [];
  array.map((x) => {
    if (x.type === type) {
      arr.push(x);
    }
  });
  return arr;
};

export { sorter, filt };
