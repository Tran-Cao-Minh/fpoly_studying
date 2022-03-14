const getData = async (url: string) => {
  const response: Response = await fetch(url);
  const data: any = await response.json();

  return data;
};

(function showData() {
  const container: HTMLElement = document.querySelector('#container');

  getData('./db.json').then((data: any) => {
    data.products.forEach((item: any) => {
      container.innerHTML += `
        <div class="product-item ${item.special ? 'special' : null}">
          <div class="product-tag text">
            ${item.tag}
          </div>
          <div class="product-img">
            <img src="./images/products/${item.image}" alt="${item.name}">
          </div>
          <div class="product-inf">
            <div class="product-name text">
              ${item.name}
            </div>
            <div class="product-price text">
              ${item.price}
            </div>
            <div class="product-order text">
              Đặt hàng
            </div>
          </div>
        </div>
      `;
    });
  });
})();