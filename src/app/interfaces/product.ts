export interface Product {
    id:number;
    name:string;
    description:string;
    price:number;
    stockQuantity:number;
    category:string;
    createdAt:Date;
    updatedAt:Date;
}

export type createProductDto=Omit<Product,'id'|'createdAt'|'updatedAt'>;
