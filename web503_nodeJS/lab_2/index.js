const express = require('express');
const formidable = require('formidable');
const fs = require('fs');

let app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

// ex-1
app.get('/', (req, res) => {
  let toDay = new Date();
  let currentDay = toDay.getDay();
  let day;

  switch (currentDay) {
    case 0:
      day = 'Sunday';
      break;
    case 1:
      day = 'Monday';
      break;
    case 2:
      day = 'Tuesday';
      break;
    case 3:
      day = 'Wednesday';
      break;
    case 4:
      day = 'Thursday';
      break;
    case 5:
      day = 'Friday';
      break;
    case 6:
      day = 'Saturday';
      break;
    default:
      console.log(`Error: ${currentDay}`);
  }

  res.render('home', {
    kindOfDay: day
  });
})
// end ex-1

// ex-2
let listProduct = [{
    id: 1,
    title: 'What I Learned from the Trees',
    slug: 'what-i-learned-from-the-trees',
    price: 17.56,
    description: `
      What I Learned from the Trees delves into the intricate relationship 
      between humans and nature, and how these often overlooked, everyday 
      interactions affect us as individuals, families, and communities.
    `,
    imageURL: 'what-i-learned-from-the-trees.png',
  },
  {
    id: 2,
    title: 'You Better Be Lightning',
    slug: 'you-better-be-lightning',
    price: 18.2,
    description: `
      You Better Be Lightning by Andrea Gibson is a queer, political, and 
      feminist collection guided by self-reflection.
    `,
    imageURL: 'you-better-be-lightning.png',
  },
  {
    id: 3,
    title: 'Born in a Second Language',
    slug: 'born-in-a-second-language',
    price: 16.33,
    description: `
      Born in a Second Language investigates how translation shapes and 
      alters both language and identity as speakers travel through space and time.
    `,
    imageURL: 'born-in-a-second-language.png',
  },
  {
    id: 4,
    title: 'Fly Away Home',
    slug: 'fly-away-home',
    price: 15.64,
    description: `
      From one of the nation's most beloved writers, Fly Away Home is an unforgettable 
      story of a mother and two daughters who seek refuge in an old Connecticut beach house.
    `,
    imageURL: 'fly-away-home.jpg',
  },
  {
    id: 5,
    title: 'Billionaires: The Lives of the Rich and Powerful',
    slug: 'billionaires-the-lives-of-the-rich-and-powerful',
    price: 22.95,
    description: `
      An informative and funny deconstruction of how the giants of American capitalism 
      shape our world. In Billionaires: The Lives of the Rich and Powerful, Darryl Cunningham 
      offers an illuminating analysis of the origins and ideological evolutions of four key 
      players in the American private sector.
    `,
    imageURL: 'billionaires-the-lives-of-the-rich-and-powerful.webp',
  },
  {
    id: 6,
    title: 'I Will Fly Away',
    slug: 'i-will-fly-away',
    price: 14.72,
    description: `
      In his stunningly intimate, highly anticipated follow up to Helium, Rudy 
      Francisco has created a collection of poems that savor the day-to-day, treating 
      it as worship, turning it into an opportunity to plant new seeds of growth.
    `,
    imageURL: 'i-will-fly-away.jpg',
  },
];

app.get('/shop', (req, res) => {
  res.render('shop', {
    products: listProduct
  });
})
// end ex-2

// ex-3
app.get('/add-new', (req, res) => {
  res.render('add-product');

})

app.post('/add-new', (req, res) => {
  let form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    let pathFile = files.productImage.filepath;
    let fileExtension = files.productImage.mimetype.split('/').pop();
    let productName = fields.productName;
    let productPrice = fields.productPrice;
    let productDescription = fields.productDescription;

    let slug = productName.toLowerCase().trim().replace(/[^A-Za-z0-9\ ]/g, '').replace(/[\ ]+/g, '-');
    let fileName = slug + '.' + fileExtension;
    let destPath = __dirname + '\\public\\images\\' + fileName;

    fs.copyFile(pathFile, destPath, (err) => {
      if (err) {
        throw err;
      }
      fs.unlink(pathFile, () => {
        console.log('Temp file is deleted ' + pathFile);
      })
      console.log('Uploaded file ' + fileName);
    })

    let productID = listProduct.length + 1;
    listProduct.push({
      id: productID,
      title: productName,
      slug: slug,
      price: productPrice,
      description: productDescription,
      imageURL: fileName,
    });

    res.redirect('/shop');
  })
})
// end ex-3

// ex-4
app.get('/detail/:productId', (req, res) => {
  let product;
  let productID = parseInt(req.params.productId);
  listProduct.forEach(productItem => {
    if (productItem.id === productID) {
      product = productItem;
    }
  });

  res.render('product-detail', {
    product: product
  });
})
// end ex-4

app.listen(port, () => {
  console.log(`app is running with port ${port}`);
})