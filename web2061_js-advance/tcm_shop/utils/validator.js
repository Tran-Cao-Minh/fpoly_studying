exports.checkPattern = function (
  value = String(),
  pattern = RegExp(),
) {
  return pattern.test(value);
}

exports.checkNumber = function (
  value = Number(),
  min = Number(),
  max = Number(),
  step = Number(),
) {
  let check = false;

  if (
    isNaN(value) === false &&
    value >= min &&
    value <= max &&
    (value / step) % 1 === 0
  ) {
    check = true;
  };

  return check;
}



// check img size