function getRandomNumber(min, max) {
  if (min < 0 || max < 0) {
    return NaN;
  }
  if ((max - min) === 0) {
    return NaN;
  }
  const result = Math.random() * (max - min);
  if ((max - min) > 0) {
    return Math.round(result + min);
  }
  return Math.round(max - result);
}

function getRandomFloat(min, max, numberOfDecimalPlases) {
  if (min < 0 || max < 0 || numberOfDecimalPlases < 0) {
    return NaN;
  }

  if ((max - min) === 0) {
    return NaN;
  }
  let count = 1;
  for (let i = 0; i < numberOfDecimalPlases; i++) {
    count = count * 10;
  }
  const result = Math.random() * (max - min);

  if ((max - min) > 0) {

    return Math.round((result + min) * count) / count;
  }
  return Math.round((max - result) * count) / count;
}
getRandomNumber(1, 5);
getRandomFloat(1, 5, 1);
