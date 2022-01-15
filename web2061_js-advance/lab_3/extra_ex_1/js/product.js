const productReader = {
  __proto__: dataReader,
};

productReader.fetchLink = 'http://localhost:3000/api/product';
productReader.tableHeaderColumnList = [
  'Product ID',
  'Product Name',
  'Product Category',
  'Product Price',
];
productReader.tableColumnKeyList = [
  'productId',
  'productName',
  'productCategory',
  'productPrice',
];

let tableContainer = document.querySelector('.table');
productReader.readData(tableContainer);
