import {product} from "./product"

export class Shop{
    constructor(name){
        this.name = name;
        this.arrayProducts = [];
    } 

    importProduct(product){
        this.arrayProducts.push(product);
    }

    getAllProducts(){
        return this.arrayProducts;
    }

    getByIndex(index){
        return this.arrayProducts[index];
    }
}