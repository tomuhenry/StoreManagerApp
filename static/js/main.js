var access_token = localStorage.getItem("access_token");
var myproduct = localStorage.getItem("product");
var editproduct = localStorage.getItem("toEdit");
var user_type = localStorage.getItem("user_type");
var user_email = localStorage.getItem("user_email");

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
            localStorage.removeItem("access_token");
            window.location ="/index.html";
        }
        else {
            alert("You must be logged in first");
            window.location ="/index.html";
        }
        console.log(data);
    })
    .catch((error) => console.error(error));
    
}