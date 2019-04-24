import { product } from "./product"
import { from, fromEvent, Observable, Subject } from "rxjs"
import { debounceTime, map, switchMap, filter } from "rxjs/operators"

const tableProduct = document.getElementById("tabelaProizvod");
const tableShopsProducts = document.getElementById("tabelaProd");
const buyingList = document.getElementById("listaZaKupovinu");
let elem = null;
let btn = null;
let row = null;
let data = null;

function tableData(table,el){
    row = document.createElement("tr");
    data = document.createElement("td");
    data.innerHTML = el.name;
    row.appendChild(data);
    data = document.createElement("td");
    data.innerHTML = el.quantity;
    row.appendChild(data);
    data = document.createElement("td");
    data.innerHTML = el.price;
    row.appendChild(data);
    btn = document.createElement("button");
    btn.id="imeDugme";
    btn.innerHTML = "Izaberi";
    row.appendChild(btn);
    btn.onclick = () => addToBuyingList(el);
    table.appendChild(row);
}

function tableHead(table){
    row = document.createElement("tr");
    data = document.createElement("th");
    data.innerHTML = "Ime";
    row.appendChild(data);
    data = document.createElement("th");
    data.innerHTML = "Kolicina";
    row.appendChild(data);
    data = document.createElement("th");
    data.innerHTML = "Cena";
    row.appendChild(data);
    table.appendChild(row);
}

function updateTable(array,table){
    table.innerHTML = "";
    tableHead(table);
    array.forEach(el => {
        tableData(table,el);
    })
}

const subject$ = new Subject();

function addToBuyingList(el){
    elem = document.createElement("li");
    elem.innerHTML = el.name + " " + el.price + " " + el.shopId;
    buyingList.appendChild(elem);
    subject$.next(el);
}


subject$.pipe(
    filter(el => el.price === "100")
).subscribe(x => console.log(x));

function getProducts(name){
    return from(
        fetch(`http://localhost:3000/products?name=${name}`)
        .then(res => res.json())
    );
}

const input1 = document.getElementById("Proizvodi");

fromEvent(input1, "input").pipe(
    debounceTime(500),
    map(ev => ev.target.value),
    switchMap(id => getProducts(id))
).subscribe(res => updateTable(res,tableProduct));

function getShopProducts(id){
    return from(
        fetch(`http://localhost:3000/shops/${id}/products`)
        .then(res => res.json())
    );
}

const input2 = document.getElementById("Prodavnica");

fromEvent(input2, "input").pipe(
    debounceTime(500),
    map(ev => ev.target.value),
    switchMap(name => getShopProducts(name))
).subscribe(res => updateTable(res,tableShopsProducts));


