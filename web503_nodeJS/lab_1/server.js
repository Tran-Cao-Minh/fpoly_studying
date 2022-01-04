const express = require('express');
let bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded());
const port = 3000;

// ex-2
app.get('/', function (req, res) {
  res.send('<h1>Here is home page</h1>');
})

app.get('/product', function (req, res) {
  res.send('<h1>Here is product page</h1>');
})

app.post('/product', function (req, res) {
  res.send('<h1>Here is product page after post in add product page</h1>');
})
app.get('/add-product', function (req, res) {
  res.send(`
    <form action="/product" method="POST">
      <input type="text" name="productName" id="">
      <button type="submit">
        Add product
      </button>
    </form>
  `);
})
// end ex-2

// ex-3
const inventors = [{
    id: 1,
    first: 'Albert',
    last: 'Einstein',
    year: 1879,
    passed: 1955
  },
  {
    id: 2,
    first: 'Isaac',
    last: 'Newton',
    year: 1643,
    passed: 1727
  },
  {
    id: 3,
    first: 'Galileo',
    last: 'Galilei',
    year: 1564,
    passed: 1642
  },
  {
    id: 4,
    first: 'Marie',
    last: 'Curie',
    year: 1867,
    passed: 1934
  },
  {
    id: 5,
    first: 'Johannes',
    last: 'Kepler',
    year: 1571,
    passed: 1630
  },
  {
    id: 6,
    first: 'Nicolaus',
    last: 'Copernicus',
    year: 1473,
    passed: 1543
  }
];

app.get('/inventors', function (req, res) {
  let list = '<h1>Danh sách nhà khoa học<ul>';
  inventors.forEach(inventor => {
    list += `
      <li>
        <a style="text-decoration:none;color:green;" href="/inventor/${inventor.id}">
          ${inventor.last}
        </a>
      </li>
    `;
  });
  list += '</ul></h1>';
  res.send(list);
})

app.get('/inventor/:id', function (req, res) {
  let id = parseInt(req.params.id);

  let inventor = inventors.find(inventor => inventor.id === id);
  info = `
    <h1>
      Thông tin chi tiết nhà khoa học: <br>
      Full name: ${inventor.first} ${inventor.last}, <br>
      Year: ${inventor.year}, <br>
      Passed: ${inventor.passed} <br>
    </h1>
  `;

  res.send(info);

  /* ???
    Yêu cầu thêm: Sinh viên xử lý thêm kết quả trả về (response) của trang chi tiết là
    dạng json, status 
  */
});
// end ex-3

// ex-4
app.get('/add-inventor', (req, res) => {
  res.send(`
    <h1>Thêm Nhà Khoa Học</h1>
    <form action="/inventor" method="POST">
      <input type="text" name="first" placeholder="input first name">
      <input type="text" name="last" placeholder="input last name"><br>
      <input type="number" name="year" placeholder="year">
      <input type="number" name="passed" placeholder="passed"><br><br>
      <button type="submit">
        Add Inventor
      </button>
    </form>
  `);
});

app.post('/inventor', (req, res) => {
  let newInventor = req.body;
  newInventor.id = inventors.length + 1;
  inventors.push(newInventor);
  res.redirect('/inventors');
});
// end ex-4

// ex-1
app.listen(port, function () {
  console.log(`app is running with port: ${port}`);
})
// end ex-1