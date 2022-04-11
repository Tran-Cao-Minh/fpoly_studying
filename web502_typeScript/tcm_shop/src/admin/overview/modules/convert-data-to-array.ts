const getDataArrayFormat = (
  fullData = Object(),
  data: Array<Object>,
) => {
  Object.keys(fullData).map((key) => {
    fullData[key].FireBaseKey = key;
    data.push(fullData[key]);
  });
};

export default getDataArrayFormat;