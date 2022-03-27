const getDataArrayFormat = (
  fullData = Object(),
  tableColumnKeyList = [String()]
) => {
  const data = Object.keys(fullData).map((key) => {
    Object.keys(fullData[key]).map((column) => {
      let isDeleted = true;

      tableColumnKeyList.forEach(columnKey => {
        if (columnKey === column) {
          isDeleted = false;
        };
      });

      if (isDeleted) {
        delete fullData[key][column];
      };
    });

    fullData[key].FireBaseKey = key;
    return fullData[key];
  });

  return data;
};

export default getDataArrayFormat;