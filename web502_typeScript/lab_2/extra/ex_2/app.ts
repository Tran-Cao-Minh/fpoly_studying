const getData = async (url: string) => {
  const response: Response = await fetch(url);
  const data: any = await response.json();

  return data;
};

(function showData() {
  const container: HTMLElement = document.querySelector('#container');

  getData('./db.json').then((data: any) => {
    data.students.forEach((item: any) => {
      container.innerHTML += `
        <div class="row">
          <div class="col image">
            <img src="./images/${item.image}" alt="${item.name}">
          </div>
          <div class="col name">
            ${item.name}
          </div>
          <div class="col birthday">
            ${item.birthday}
          </div>
          <div class="col gender">
            ${item.gender}
          </div>
          <div class="col score">
            ${item.score}
          </div>
        </div>
      `;
    });
  });
})();