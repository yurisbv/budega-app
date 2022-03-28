// eslint-disable-next-line no-shadow
export enum StockStatus {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  IN_STOCK = 'IN_STOCK',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  RUNNING_LOW = 'RUNNING_LOW'
}

export class NewProduct {
  name?: string;
  id?: string;
}

export class Image {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: any;
  size: number;
}

export class ProductId {
  id: string;
}

export class Product {
  _id: string;
  name: string;
  isActive: boolean;
  price: number;
  image: Image;
  department: ProductDepartment;
  brand: ProductBrand;
  categories: ProductCategory[];
  stock: ProductStock;
  createdAt: Date;
  updatedAt: Date;
}

export class ProductDepartment {
  _id: string;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
export class ProductBrand {
  _id?: string;
  name: string;
  description?: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ProductCategory {
  _id?: string;
  name: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ProductStock {
  _id: string;
  amount: number;
  minimumAlert: number;
  stockHistory: ProductStockHistory;
  status: StockStatus;
  createdAt: string;
  updatedAt: string;
}

// eslint-disable-next-line no-shadow
enum StockHistoryAction {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  GET = 'Get',
  // eslint-disable-next-line @typescript-eslint/naming-convention
  PUSH = 'Push'
}

export class ProductStockHistory {
  id: string;
  action: StockHistoryAction;
  agent: string; // Users Keycloak ID
  createdAt: string;
}
