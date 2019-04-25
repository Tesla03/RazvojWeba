import { from, fromEvent, Subject, zip, interval, } from "rxjs"
import { debounceTime, map, switchMap, filter, scan, pairwise, take } from "rxjs/operators"

const tableProduct = document.getElementById("tabelaProizvod");
const tableShopsProducts = document.getElementById("tabelaProd");
const buyingList = document.getElementById("listaZaKupovinu");
const buyingList2 = document.getElementById("listaZaKupovinu2");
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
    data = document.createElement("td");
    data.innerHTML = el.shopId;
    row.appendChild(data);
    btn = document.createElement("button");
    btn.id = "imeDugme";
    btn.className = "dugmee";
    btn.innerHTML = "Izaberi";
    btn.disabled = true;
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
    data = document.createElement("th");
    data.innerHTML = "Prodavnica";
    row.appendChild(data);
    data = document.createElement("th");
    data.innerHTML = "Dodaj";
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

let subjectList1$ = new Subject();
let subjectList2$ = new Subject();
const chb = document.getElementById("chb");

function addToBuyingList(el){
    elem = document.createElement("li");
    elem.innerHTML = el.name + " " + el.price + " " + el.shopId;
    if(chb.checked == false){
        subjectList1$.next(el);
        buyingList.appendChild(elem);
    }
    else{
        subjectList2$.next(el);
        buyingList2.appendChild(elem);
    }
}

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
    filter(text => text.length >= 2),
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
    filter(text => text.length >= 2),
    switchMap(name => getShopProducts(name))
).subscribe(res => updateTable(res,tableShopsProducts));

function disableBtn(enable){
    const dugme = document.querySelectorAll(".dugmee");
    dugme.forEach((el) => {
        el.disabled = enable;
    });
}

const budzet = document.getElementById("budzetInput");
 
fromEvent(budzet, "input").pipe(
    debounceTime(500),
    map(ev => ev.target.value),
).subscribe(() => disableBtn(false)); 

function removeProduct(list){
    list.removeChild(list.lastChild);
}

const racun = document.getElementById("trenutniRacun");
const racun2 = document.getElementById("trenutniRacun2");

function alerting(rez,racun){
    return new Promise((resolve, reject) => {
        setTimeout(() => budzet.value > rez ? 
        resolve(racun.value = rez):
        reject("Limit je predjen"), 100);
    });
}

function sub(rez,racun){
    alerting(rez,racun).catch(() => {
        alert("Prekoracili ste budzet, ako zelite da nastavite povecajte svoj budzet!");
        disableBtn(true);
        removeProduct(buyingList);
        });
}

subjectList1$.pipe(        //krajnji racun 
    scan((acc,el) => acc+el.price, 0)
).subscribe(rez => sub(rez,racun));

subjectList2$.pipe(
    scan((acc,el) => acc+el.price, 0)
).subscribe(rez => sub(rez,racun2));

const $int = interval(15000);  

zip(subjectList1$,$int)  //emituje proizvode koji su na akciji na svakih 15s
.subscribe(x => print(x));

const listaa = document.getElementById("akcije");

function print(x){
    let lii = null;
    if(x[0].naAkciji=="Da"){
        listaa.innerHTML = "";
        lii=document.createElement("li");
        lii.innerHTML = x[0].name + " " + x[0].price + " " + x[0].shopId;
        listaa.appendChild(lii);
    }
}