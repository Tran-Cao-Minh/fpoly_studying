// use async/await and Promise to rewrite code
const fs = require('fs');
const axios = require('axios');

(async function loadData() {
  try {
    const fileData = await new Promise((resolve) => {
      fs.readFile(
        './data.json', {
          encoding: 'utf8'
        },
        (err, data) => {
          if (err)
            throw err;
          resolve(data);
        }
      );
    });
    console.log('Data loaded from disk', fileData);

    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const apiData = await axios.get(url);
    console.log('Data downloaded from url', apiData);

  } catch (err) {
    console.log(err);
  };
})();