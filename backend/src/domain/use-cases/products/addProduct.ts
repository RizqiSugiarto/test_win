export interface AddProduct {
  perform: (params: AddProduct.Params) => Promise<AddProduct.Result>;
}

export namespace AddProduct {
  export type Params = {
    nameProduct: string;
    price: number;
    photoProduct: string;
    description: string;
  };
  export type Result = { id: string };
}
