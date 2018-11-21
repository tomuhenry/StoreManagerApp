document.getElementById("logout").addEventListener("click", logoutUser);
var access_token = localStorage.getItem("access_token");

function logoutUser(e){
    e.preventDefault();

    fetch('https://tomuhenry-storemanagerapp.herokuapp.com/store-manager/api/v1/logout', {
        method:'DELETE',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'Authorization': "Bearer " + access_token
        }
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
    .catch(error => console.error(error));
    
}