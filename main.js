/*
CRUDS --> Create Read Update Delete Search for Data
*/



let blight = document.getElementById('blight');
let bdark = document.getElementById('bdark');

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');

let total = document.getElementById('total');

let count = document.getElementById('count');
let category = document.getElementById('category');


let submit = document.getElementById('submit');


console.log(blight, title, price, taxes, ads, discount, total, count, category, submit);

//Dark & Light

blight.onclick = function LD() {

    this.classList.add('hide');
    bdark.classList.remove('hide');

    document.body.style.background = '#b6b5b575';
    document.body.style.color = '#111';

    title.style.background = '#fff';
    title.style.color = '#111';

    price.style.background = '#fff';
    price.style.color = '#111';

    taxes.style.background = '#fff';
    taxes.style.color = '#111';

    ads.style.background = '#fff';
    ads.style.color = '#111';

    discount.style.background = '#fff';
    discount.style.color = '#111';

    total.style.color = '#fff';

    count.style.background = '#fff';
    count.style.color = '#111';

    category.style.background = '#fff';
    category.style.color = '#111';

    search.style.background = '#fff';
    search.style.color = '#111';
}

bdark.onclick = function DL() {

    blight.classList.remove('hide');
    this.classList.add('hide');

    document.body.style.background = '#222';
    document.body.style.color = '#fff';

    title.style.background = '#111';
    title.style.color = '#fff';

    price.style.background = '#111';
    price.style.color = '#fff';

    taxes.style.background = '#111';
    taxes.style.color = '#fff';

    ads.style.background = '#111';
    ads.style.color = '#fff';

    discount.style.background = '#111';
    discount.style.color = '#fff';

    total.style.color = '#fff';

    count.style.background = '#111';
    count.style.color = '#fff';

    category.style.background = '#111';
    category.style.color = '#fff';

    search.style.background = '#111';
    search.style.color = '#fff';
}


//Get Total
function gettotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#0a49f6';
    }
    else {
        total.style.background = '#3a6cf4';
        total.innerHTML = '';
    }
}

//creat Product & Save in LocalStorage

let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
}
else {
    let datapro = [];
}


submit.onclick = function () {
    let newpro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    }
    datapro.push(newpro);
    localStorage.setItem('product', JSON.stringify(datapro));
    console.log(datapro);

    cleardata();
    showdata();
}

//Clear inputs
function cleardata() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

//Read

function showdata() {
    
    let table = '';

    for (let i = 0; i < datapro.length; i++) {
        table += `<tr>
                        <td>${i}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button id="update">Update</button></td>
                        <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
                    </tr>
                    `;
    }

    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(datapro.length >1){
        btnDelete.innerHTML=`
        <button onclick ="deleteAll()">Delete All</button>
        `;
    }else{
        btnDelete.innerHTML='';
}
}
showdata();

//Delete

function deletedata(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showdata();
}

//clean Data

function deleteAll(){
    localStorage.clear();
    datapro.splice(0);
    showdata();
}


//clean Data

//Count

//Update
//Search
//clean Data




