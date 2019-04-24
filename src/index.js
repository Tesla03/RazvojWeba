import { Product } from "./product"
import { Shop } from "./shop"

const shop1 = new Shop("Tempo");
const shop2 = new Shop("Maxi");
const shop3 = new Shop("Idea");

shop1.importProduct(new Product("Kecap", 25, 50));
shop1.importProduct(new Product("Majonez", 30, 120));
shop1.importProduct(new Product("Pavlaka", 5, 90));
shop1.importProduct(new Product("Mleko", 15, 55));
shop1.importProduct(new Product("Sir", 3, 400));
shop1.importProduct(new Product("Makarone", 10, 85));
shop1.importProduct(new Product("Krompir", 23, 100));
shop1.importProduct(new Product("Krastavac", 51, 50));
shop1.importProduct(new Product("Pirinac", 4, 150));
shop1.importProduct(new Product("Nektar", 12, 115));
shop1.importProduct(new Product("Sladoled", 27, 150));
shop1.importProduct(new Product("Vino", 2, 450));


function randomNumber(){
    return parseInt(Math.random() * 12);
}

function updateQuantity(array,num){
    array.forEach(el=>{
        el.quantity+=num;
    })
    return array;
}

console.log(updateQuantity(shop1.arrayProducts,-1));

