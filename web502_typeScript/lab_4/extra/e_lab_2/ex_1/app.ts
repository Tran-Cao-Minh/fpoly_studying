interface Product {
  name: string,
  price: string,
  special: boolean,
  tag: string,
  image: string
};

class ProductManager {
  private fetchLink: string;

  constructor ( fetchLink: string ) {
    this.fetchLink = fetchLink;
  }

  private getProduct = async () => {
    const response: Response = await fetch(this.fetchLink);
    const data: any = await response.json();
  
    return data;
  }

  readonly showProduct = (container: HTMLElement) => {
    this.getProduct().then((data: any) => {
      data.products.forEach((product: Product) => {
        container.innerHTML += `
          <div class="product-item ${product.special ? 'special' : null}">
            <div class="product-tag text">
              ${product.tag}
            </div>
            <div class="product-img">
              <img src="./images/products/${product.image}" alt="${product.name}">
            </div>
            <div class="product-inf">
              <div class="product-name text">
                ${product.name}
              </div>
              <div class="product-price text">
                ${product.price}
              </div>
              <div class="product-order text">
                Đặt hàng
              </div>
            </div>
          </div>
        `;
      });
    });
  };
}

const productManager = new ProductManager('./db.json');
productManager.showProduct(
  document.querySelector('#container')
);