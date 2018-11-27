document.getElementById("login").addEventListener("submit", loginUser);

loginUrl = 'https://tomuhenry-storemanagerapp.herokuapp.com/store-manager/api/v1/auth/login'

function loginUser(e){
    e.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    fetch(loginUrl, {
        method:'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'content-type': 'application/json'
        },
        body:JSON.stringify({email:email, password:password})
    })
    .then((res) => res.json())
    .then((data) => {
        sessionStorage.setItem("user_email", email);
        
        if (data.admin_token){
            token = `${data.admin_token}`;
            sessionStorage.setItem("user_type", "admin");
            sessionStorage.setItem("access_token", token);
            window.location ="/templates";
        }
        else if (data.user_token){
            token = `${data.user_token}`;
            sessionStorage.setItem("user_type", "user");
            sessionStorage.setItem("access_token", token);
            window.location ="/templates";
        }
        else if(data.Alert){
            document.getElementById("message").innerHTML = `${data.Alert}`;
        }
        else{
            document.getElementById("message").innerHTML = "Failed to login"
        }
    })
    .catch((err) => console.log(err));
}