var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
// DECORATORS
function LogCreate(constructor) {
    console.log('Log Create: ', constructor);
}
function ProductManagerLogger(logString) {
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
function PropertyProductManagerLogger(target, propertyName) {
    console.log('Product Manger Class: ', target);
    console.log('Selected Property of Product Manager Class: ', propertyName);
}
function MethodProductManagerLogger(target, methodName, propertyDescriptor) {
    console.log('Product Manger Class: ', target);
    console.log('Selected Method of Product Manager Class: ', methodName);
    console.log('Method Descriptor: ', propertyDescriptor);
}
// end DECORATORS
let ProductManager = class ProductManager {
    constructor(fetchLink) {
        this.fetchLink = fetchLink;
    }
    set newFetchLink(val) {
        this.fetchLink = val;
    }
    getProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(this.fetchLink);
            const data = yield response.json();
            return data;
        });
    }
    showProduct(container) {
        this.getProduct().then((data) => {
            data.products.forEach((product) => {
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
    }
    ;
};
__decorate([
    PropertyProductManagerLogger
], ProductManager.prototype, "fetchLink", void 0);
__decorate([
    MethodProductManagerLogger // Accesstor Decorator because it apply for SETTER or GETTER
], ProductManager.prototype, "newFetchLink", null);
__decorate([
    MethodProductManagerLogger
], ProductManager.prototype, "getProduct", null);
__decorate([
    MethodProductManagerLogger
], ProductManager.prototype, "showProduct", null);
ProductManager = __decorate([
    LogCreate,
    ProductManagerLogger('LOGGING - ProductManger')
], ProductManager);
const productManager = new ProductManager('./db.json');
productManager.showProduct(document.querySelector('#container'));
