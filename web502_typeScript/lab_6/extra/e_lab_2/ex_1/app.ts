interface Product {
  name: string,
  price: string,
  special: boolean,
  tag: string,
  image: string
};

// DECORATORS
function LogCreate(constructor: Function) { // class decorator
  console.log('Log Create: ', constructor);
}

function ProductManagerLogger(logString: string) { // decorator factory: return decorator and add prameter
  return function(constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function PropertyProductManagerLogger(target: any, propertyName: string | Symbol) {
  console.log('Product Manger Class: ', target);
  console.log('Selected Property of Product Manager Class: ', propertyName);
}

function MethodProductManagerLogger(target: any, methodName: string | Symbol, propertyDescriptor: PropertyDescriptor) {
  console.log('Product Manger Class: ', target);
  console.log('Selected Method of Product Manager Class: ', methodName);
  console.log('Method Descriptor: ', propertyDescriptor);
}
// end DECORATORS

@LogCreate
@ProductManagerLogger('LOGGING - ProductManger')
class ProductManager {
  @PropertyProductManagerLogger
  private fetchLink: string;

  constructor(fetchLink: string) {
    this.fetchLink = fetchLink;
  }

  @MethodProductManagerLogger // Accesstor Decorator because it apply for SETTER or GETTER
  set newFetchLink(val: string) {
    this.fetchLink = val;
  }

  @MethodProductManagerLogger
  private async getProduct () {
    const response: Response = await fetch(this.fetchLink);
    const data: any = await response.json();

    return data;
  }

  @MethodProductManagerLogger
  public showProduct (container: HTMLElement) {
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