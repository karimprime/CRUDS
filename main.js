/*
CRUDS --> Create Read Update Delete Search for Data
*/


let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');

let total = document.getElementById('total');

let count = document.getElementById('count');
let category = document.getElementById('category');

let submit = document.getElementById('submit');
let mod = 'create';
let tmp;


//Dark & Light


const body = document.querySelector('body');
const ld = document.getElementById('ld'); // Light mode toggle element
const dl = document.getElementById('dl'); // Dark mode toggle element

function colors(color) {
    localStorage.setItem('color', color);

    if (color === '#222') { // Assuming #222 is your dark mode color
        body.classList.add('dark-mode');
        ld.classList.add('hide');
        dl.classList.remove('hide');
        total.style.background = '#343434';
        body.style.transition = "1s";
    } else {
        body.classList.remove('dark-mode');
        dl.classList.add('hide');
        ld.classList.remove('hide');
        total.style.background = '#3a6cf4';
        body.style.transition = "1s";
    }
}

// Check and apply stored color on page load
document.addEventListener('DOMContentLoaded', () => {
    const storedColor = localStorage.getItem('color');

    if (storedColor) {

        if (storedColor === '#222') {
            body.classList.add('dark-mode');
            ld.classList.add('hide');
            dl.classList.remove('hide');
            total.style.background = '#343434';
        } else {
            body.classList.remove('dark-mode');
            dl.classList.add('hide');
            ld.classList.remove('hide');
            total.style.background = '#3a6cf4';
        }
    }
});


//Get Total

function gettotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
    }
    else {
        total.innerHTML = '';
        total.style.background = '#3a6cf4';
    }
}

//Create Product

let datapro;
if (localStorage.product != null) {
    datapro = JSON.parse(localStorage.product);
}
else {
    datapro = [];
}

submit.onclick = function () {
    let newpro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }

    //Count

    if (title.value != '' &&
        price.value != '' &&
        taxes.value != '' &&
        category.value != '' &&
        newpro.count < 400) {
        if (mod === 'create') {

            if (newpro.count > 1) {
                for (let i = 0; i < newpro.count; i++) {
                    datapro.push(newpro);
                }
            }
            else {
                datapro.push(newpro);
            }
        }
        else {
            datapro[tmp] = newpro
            mod = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        }
        cleardata();
    }

    //Save Location

    localStorage.setItem('product', JSON.stringify(datapro));
    console.log(datapro);

    showdata();
}

//Clear Inputs

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


// Read

function showdata() {
    gettotal();
    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        table += `       <td>${i + 1}</td>
                        <td>${datapro[i].title}</td>
                        <td>${datapro[i].price}</td>
                        <td>${datapro[i].taxes}</td>
                        <td>${datapro[i].ads}</td>
                        <td>${datapro[i].discount}</td>
                        <td>${datapro[i].total}</td>
                        <td>${datapro[i].category}</td>
                        <td><button onclick="updatedate(${i})">Update</button></td>
                        <td><button onclick="deletedata(${i})">Delete</button></td>
                    </tr>`
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if (datapro.length > 0) {
        btnDelete.innerHTML = `<button onclick="deleteAll()">Delete All (${datapro.length}) !!!</button>`;
    }
    else {
        btnDelete.innerHTML = ``;
    }
}

showdata();


//Delete

function deletedata(i) {
    datapro.splice(i, 1);
    localStorage.product = JSON.stringify(datapro);
    showdata();
}


//Clean Data

function deleteAll() {
    localStorage.clear();
    datapro.splice(0);
    showdata();
}

//Update

function updatedate(i) {
    title.value = datapro[i].title;
    price.value = datapro[i].price;
    taxes.value = datapro[i].taxes;
    ads.value = datapro[i].ads;
    discount.value = datapro[i].discount;

    gettotal();
    count.style.display = "none";
    submit.innerHTML = 'Update Data';
    category.value = datapro[i].category;
    mod = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

//Search

let searchmod = 'title';
function getsearchmod(id) {
    let search = document.getElementById('search');
    if (id == 'searchtitle') {
        searchmod = 'title';
    }
    else {
        searchmod = 'category';
    }
    search.placeholder = 'Search By ' + searchmod;
    search.focus();
    search.value = '';
    showdata();
}

function searchdata(value) {

    let table = '';
    for (let i = 0; i < datapro.length; i++) {
        if (searchmod == 'title') {
            if (datapro[i].title.includes(value.toLowerCase())) {
                table += `       <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updatedate(${i})">Update</button></td>
                <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
            </tr>`
            }
        }

        else {
            if (datapro[i].category.includes(value.toLowerCase())) {
                table += `       <td>${i}</td>
                <td>${datapro[i].title}</td>
                <td>${datapro[i].price}</td>
                <td>${datapro[i].taxes}</td>
                <td>${datapro[i].ads}</td>
                <td>${datapro[i].discount}</td>
                <td>${datapro[i].total}</td>
                <td>${datapro[i].category}</td>
                <td><button onclick="updatedate(${i})">Update</button></td>
                <td><button onclick="deletedata(${i})" id="delete">Delete</button></td>
            </tr>`
            }
        }

    }

    document.getElementById('tbody').innerHTML = table;
}







