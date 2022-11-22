function add(numbers) {
  let result = numbers.reduce((preVal, el) => preVal + el);
  return result;
}
function subtract(numbers) {
  let current = 0;
  let diff;
  numbers.forEach((element) => {
    if (numbers.indexOf(element) == 0) return (diff = element);
    // else diff = current - element;
    diff = diff - element;
  });
  return diff;
}
console.log(subtract([]));
