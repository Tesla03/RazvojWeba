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
shop2.importProduct(new Product("Kecap", 30, 43));
shop2.importProduct(new Product("Majonez", 40, 110));
shop2.importProduct(new Product("Pavlaka", 10, 80));
shop2.importProduct(new Product("Mleko", 20, 50));
shop2.importProduct(new Product("Sir", 4, 390));
shop2.importProduct(new Product("Makarone", 12, 95));
shop3.importProduct(new Product("Kecap", 27, 61));
shop3.importProduct(new Product("Majonez", 41, 102));
shop3.importProduct(new Product("Pavlaka", 6, 82));
shop3.importProduct(new Product("Mleko", 17, 72));
shop3.importProduct(new Product("Sir", 7, 420));
shop3.importProduct(new Product("Makarone", 21, 91));


function randomNumber(){
    return parseInt(Math.random() * 6);
}

function updateQuantity(array,num){
    array.forEach(el=>{
        el.quantity+=num;
    })
    return array;
}

console.log(updateQuantity(shop1.arrayProducts,-1));

function compare(product1,product2){
    return product1.price < product2.price ? product1 : product2;
}

function asyncGetByIndex(index,shop){
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(shop.getByIndex(index)),
            randomNumber() * 1500);
    });
}

Promise.all([
    asyncGetByIndex(randomNumber(),shop1),
    asyncGetByIndex(randomNumber(),shop2)
])
.then(console.log("Processing:"))
.then(products =>{
    console.log(products[0]);
    console.log(products[1]);
    console.log("Jeftinija namirnica je: ", compare(products[0],products[1]));
})

