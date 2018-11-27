var access_token = sessionStorage.getItem("access_token");
var myproduct = sessionStorage.getItem("product");
var myuser = sessionStorage.getItem("user");
var mysale = sessionStorage.getItem("sale");
var editproduct = sessionStorage.getItem("toEdit");
var user_type = sessionStorage.getItem("user_type");
var user_email = sessionStorage.getItem("user_email");
var category_products = sessionStorage.getItem("cat_products");

const product_url = 'https://tomuhenry-storemanagerapp.herokuapp.com/store-manager/api/v1/admin/products';
const category_url = 'https://tomuhenry-storemanagerapp.herokuapp.com/store-manager/api/v1/category';
const user_url = 'https://tomuhenry-storemanagerapp.herokuapp.com/store-manager/api/v1/users';
const sale_url = 'https://tomuhenry-storemanagerapp.herokuapp.com/store-manager/api/v1/sales';

const access_headers = {
    'Accept': 'application/json, text/plain, */*',
    'content-type': 'application/json',
    'Authorization': "Bearer " + access_token
}

function loaderFunction(myFunc){
    if(window.addEventListener) {
        window.addEventListener('load',myFunc,false);
    } 
    else {
        window.attachEvent('onload',myFunc);
    }
}

function redirectAdmin(page_url){
    if(user_type == "admin"){
        window.location = page_url;
    }
    else{
        alert("Only Administrator can access this page");
    }
}

function redirectUser(page_url){
    if(user_type == "user"){
        window.location = page_url;
    }
    else{
        alert("Only Attendant can access this page");
    }
}

function redirectAll(page_url){
    window.location = page_url;
}

function toggleSidebar(){
    document.getElementById("sidebar").classList.toggle('active');
}

document.getElementById("logout").addEventListener("click", logoutUser);

function logoutUser(e){
    e.preventDefault();

    fetch('https://tomuhenry-storemanagerapp.herokuapp.com/store-manager/api/v1/logout', {
        method:'DELETE',
        headers: access_headers
    })
    .then((res) => res.json())
    .then((data) => {
        if (access_token != null){
            sessionStorage.clear();
            window.location ="/home.html";
        }
        else {
            alert("You must be logged in first");
            window.location ="/home.html";
        }
        console.log(data);
    })
    .catch((err) => console.log(err));
    
}