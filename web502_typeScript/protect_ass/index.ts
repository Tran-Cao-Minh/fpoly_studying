interface Product {
  image: string,
  tag: string,
  name: string,
  category: string,
  colours: number,
  price: string
};

class ProductsManager {
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
          <div class="product">
            <img src="./images/${product.image}" alt="${product.name}">
            <div class="tag">${product.tag}</div>
            <div class="name">
              ${product.name}
            </div>
            <div class="category">
              ${product.category}
            </div>
            <div class="colours">
              ${product.colours} Colours
            </div>
            <div class="price">
              ${product.price}₫
            </div>
          </div>
        `;
      });
    });
  };
}

const productsManager = new ProductsManager('./db.json');
productsManager.showProduct(
  document.querySelector('#container')
);