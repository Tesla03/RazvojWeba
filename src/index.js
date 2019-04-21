import { product } from "./product"
import { from, fromEvent, Observable } from "rxjs"
import { debounceTime, map, switchMap } from "rxjs/operators"

const listProduct = document.getElementById("listaProizvoda");
const shopsProducts = document.getElementById("proizvodiUProdavnici");
let elem = null;

function getProducts(name){
    return from(
        fetch(`http://localhost:3000/products?name=${name}`)
        .then(res => res.json())
    );
}

function fillList(array,list){
    list.innerHTML = "";
    array.forEach(el => {
        elem = document.createElement("li");
        elem.innerHTML=el.name + " " + el.price + " " + el.shopId;
        list.appendChild(elem);
    })
}
const input = document.getElementById("Proizvodi");

fromEvent(input, "input").pipe(
    debounceTime(500),
    map(ev => ev.target.value),
    switchMap(id => getProducts(id))
).subscribe(res => fillList(res,listProduct));

function getShopProducts(id){
    return from(
        fetch(`http://localhost:3000/shops/${id}/products`)
        .then(res => res.json())
    );
}

const inputa = document.getElementById("Prodavnica");

fromEvent(inputa, "input").pipe(
    debounceTime(500),
    map(ev => ev.target.value),
    switchMap(name => getShopProducts(name))
).subscribe(res => fillList(res,shopsProducts));


