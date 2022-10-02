function getRandomNumber(min, max) {
  if (min < 0 || max < 0) {
    return NaN;
  }
  const result = Math.random() * (max - min);
  if (result === 0) {
    return NaN;
  }
  if (result > 0) {
    return result + min;
  }
  return max - result;
}

getRandomNumber(1, 5);
