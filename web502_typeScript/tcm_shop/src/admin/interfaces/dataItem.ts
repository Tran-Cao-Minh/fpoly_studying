interface Category {
  readonly CategoryName: string,
  readonly CategoryOrder: number,
  readonly CategoryDisplay: string,
  readonly CategoryProductQuantity: number
};

interface Product {
  readonly ProductName: string,
  readonly ProductPublisher: string,
  readonly ProductDimensions: string,
  readonly ProductPublishDate: string,
  readonly ProductCategory: string,
  readonly ProductTag: string,
  readonly ProductDisplay: string,
  readonly ProductPrice: number,
  readonly ProductSalePercent: number,
  readonly ProductQuantity: number,
  readonly ProductOrder: number,
  readonly ProductPages: number,
  readonly ProductImage: string,
  readonly ProductDescription: string,
  readonly ProductSoldQuantity: number,
  readonly ProductViews: number,
};

interface Order {
  readonly OrderDate: string,
  readonly OrderTotalMoney: number,
  readonly CustomerName: string,
  readonly CustomerEmail: string,
  readonly CustomerPhoneNumber: string,
  readonly OrderAddress: string,
  readonly OrderNote: string,
  readonly OrderStatus: 'Order Success' | 'Delivering' | 'Completed' | 'Canceled',
  readonly OrderDetails: {
    [key: string]: {
      ProductId: string,
      ProductQuantity: number,
      UnitPrice: number
    }
  },
};

export {
  Category,
  Product,
  Order
};