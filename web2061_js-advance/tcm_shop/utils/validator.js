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

exports.checkDate = function (
  value = String(),
  min = {
    day: Number(),
    month: Number(),
    year: Number(), // >= 100 - recommend
  },
  max = {
    day: Number(),
    month: Number(),
    year: Number(),
  }
) {
  const minDateTime = new Date(min.year, (min.month - 1), min.day).getTime();
  const maxDateTime = new Date(max.year, (max.month - 1), max.day).getTime();

  let check = false;
  if (value !== '') {
    const date = value.split(/\D/);
    const year = Number(date[0]);
    const month = Number(date[1]) - 1;
    const day = Number(date[2]);

    const dateTime = new Date(year, month, day).getTime();
    if (
      dateTime >= minDateTime &&
      dateTime <= maxDateTime
    ) {
      check = true;
    };
  };

  return check;
}

exports.checkFile = function (
  file = new File(),
  fileMIMETypeList = [String()],
  minMbSize = Number(),
  maxMbSize = Number()
) {
  const bytesPerMegabyte = 1048576;
  const minByteSize = minMbSize * bytesPerMegabyte;
  const maxByteSize = maxMbSize * bytesPerMegabyte;

  let checkFileMIMEType = false;
  fileMIMETypeList.forEach(MIMEType => {
    if (file.mimetype === MIMEType) {
      checkFileMIMEType = true;
    };
  });

  if (
    checkFileMIMEType &&
    file.size >= minByteSize &&
    file.size <= maxByteSize
  ) {
    return true;

  } else {
    return false;
  };
}

// check img size