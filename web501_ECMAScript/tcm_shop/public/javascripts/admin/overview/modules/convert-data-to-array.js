const getDataArrayFormat = (
  fullData = Object(),
  data = [],
  tableColumnKeyList = [String()]
) => {
  Object.keys(fullData).map((key) => {
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
    data.push(fullData[key]);
  });
};

export default getDataArrayFormat;