const express = require('express');
let bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded());
const port = 5000;

app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

function includeBoostrap(res) {
  res.write(`
    <script language="javascript" src="js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="css/bootstrap.min.css"/>
  `);
}

// ex-2
app.get('/', function (req, res) {
  includeBoostrap(res);
  res.end(`
    <h1 class="text-success text-center py-5 my-5 bg-light">
      Here is home page
    </h1>
  `);
})

app.get('/product', function (req, res) {
  includeBoostrap(res);
  res.end(`
    <h1 class="text-success text-center py-5 my-5 bg-light">
      Here is product page
    </h1>
  `);
})

app.post('/product', function (req, res) {
  includeBoostrap(res);
  res.end(`
    <h1 class="text-success text-center py-5 my-5 bg-light">
      Here is product page after post in add product page
    </h1>
  `);
})

app.get('/add-product', function (req, res) {
  includeBoostrap(res);
  res.end(`
    <form class="col-5 mx-auto my-5 px-2 py-5 bg-light" action="/product" method="POST">
      <h1 class="text-success text-center mb-3 bg-light">
        Add product page
      </h1>
      <div class="mb-5">
        <label for="productName" class="form-label">Product Name</label>
        <input type="text" class="form-control" id="productName" placeholder="Product name">
      </div>
      <button type="submit" class="btn btn-success px-5 mx-auto d-block">
        Add product
      </button>
    </form>
  `);
})
// end ex-2

// ex-3
const inventors = [{
    id: 1,
    first: 'albert',
    last: 'einstein',
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
  let list = `
    <div class="col-6 mx-auto mt-5">
    <h1 class="d-block mb-4 text-dark">Inventor List</h1>
    <ul class="h2 list-group">
  `;
  inventors.forEach(inventor => {
    list += `
      <li class="list-group-item list-group-item-action">
        <a class="d-block col-12 text-decoration-none text-success py-2" href="/inventor/${inventor.id}">
          ${inventor.last.toUpperCase()}
        </a>
      </li>
    `;
  });
  list += `
    </ul></div>
    <a href="add-inventor" class="text-decoration-none">
      <button type="button" class="btn btn-success mt-3 px-5 mx-auto d-block mx-auto">
        <span class="h3">Add Inventor</span>
      </button>
    </a>`
  ;
  includeBoostrap(res);
  res.end(list);
})

app.get('/inventor/:id', function (req, res) {
  let id = parseInt(req.params.id);

  let inventor = inventors.find(inventor => inventor.id === id);
  info = `
    <h1 class="text-success bg-light p-5 d-block mx-auto col-6 mt-5 lh-lg">
      <span class="text-dark">Inventor Detail:</span> <br>
      <span class="h2 lh-lg">
      Full name: ${inventor.first.toUpperCase()} ${inventor.last.toUpperCase()} <br>
      Year: ${inventor.year} <br>
      Passed: ${inventor.passed} <br>
      </span>
    </h1>
    <a href="../inventors">
      <button type="button" class="btn btn-primary px-5 mx-auto d-block mx-auto">
        Turn Back
      </button>
    </a>
  `;

  res.write(`
    <script language="javascript" src="../js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="../css/bootstrap.min.css"/>
  `);
  res.end(info);
});
// end ex-3

// ex-4
app.get('/add-inventor', (req, res) => {
  includeBoostrap(res);
  res.end(`
    <form class="col-5 mx-auto my-5 px-2 py-5 bg-light" action="/inventor" method="POST">
      <h1 class="text-success text-center mb-3 bg-light">
        Add Inventor
      </h1>
      <div class="mb-3">
        <label for="firstName" class="form-label">Inventor first name</label>
        <input required type="text" name="first" class="form-control" id="firstName" placeholder="First name">
      </div>
      <div class="mb-3">
        <label for="lastName" class="form-label">Inventor last name</label>
        <input required type="text" name="last" class="form-control" id="lastName" placeholder="Last name">
      </div>
      <div class="mb-3">
        <label for="birthYear" class="form-label">Inventor birth year</label>
        <input required min="1000" max="2022" type="number" name="year" class="form-control" id="birthYear" placeholder="1400">
      </div>
      <div class="mb-4">
        <label for="passYear" class="form-label">Inventor passed year</label>
        <input required min="1000" max="2022" type="number" name="passed" class="form-control" id="passYear" placeholder="1450">
      </div>
      <button type="submit" class="btn btn-success px-5 mx-auto d-inline">
        Add Inventor
      </button>
      <a href="./inventors">
        <button type="button" class="btn btn-primary px-5 mx-auto d-inline">
          Turn Back
        </button>
      </a>
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

// extra-ex
const students = [{
    id: 1,
    first: 'Minh',
    last: 'Tran Cao',
    major: 'Website Designer - Front End',
  },
  {
    id: 2,
    first: 'Khoi',
    last: 'Dao Duc Minh',
    major: 'Website Designer - Front End',
  },
  {
    id: 3,
    first: 'Cuong',
    last: 'Tran Minh',
    major: 'Website Designer - Back End',
  },
  {
    id: 4,
    first: 'Thanh',
    last: 'Nguyen Dang',
    major: 'Website Designer - Front End',
  }
];

app.get('/students', function (req, res) {
  let list = `
    <div class="col-8 mx-auto my-5">
    <h1 class="d-block mb-4 text-dark">Student List</h1>
    <ul class="h2 list-group">
  `;
  students.forEach(student => {
    list += `
      <li class="list-group-item list-group-item-action">
        <span class="d-block col-12 text-decoration-none text-success py-2">
          ${student.last} ${student.first} | ${student.major}
        </span>
      </li>
    `;
  });
  list += '</ul></div>';
  includeBoostrap(res);
  res.end(list);
})
// end extra-ex

// ex-1
app.listen(port, function () {
  console.log(`app is running with port: ${port}`);
})
// end ex-1