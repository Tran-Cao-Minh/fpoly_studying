const categoryReader = {
  __proto__: dataReader,
};

categoryReader.fetchLink = 'http://localhost:3000/api/category';
categoryReader.tableHeaderColumnList = [
  'Category ID',
  'Category Name',
];
categoryReader.tableColumnKeyList = [
  'categoryId',
  'categoryName',
];

let tableContainer = document.querySelector('.table');
categoryReader.readData(tableContainer);
