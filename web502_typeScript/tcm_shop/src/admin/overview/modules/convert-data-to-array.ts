const getDataArrayFormat = (
  fullData: { [key: string]: any },
  data: Array<Object>,
): void => {
  Object.keys(fullData).map((key: string) => {
    fullData[key].FireBaseKey = key;
    data.push(fullData[key]);
  });
};

export default getDataArrayFormat;