const getDataArrayFormat = (
  fullData = Object(),
  data = [],
) => {
  Object.keys(fullData).map((key) => {
    fullData[key].FireBaseKey = key;
    data.push(fullData[key]);
  });
};

export default getDataArrayFormat;