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
        localStorage.setItem("user_email", email);
        
        if (data.admin_token){
            token = `${data.admin_token}`;
            localStorage.setItem("user_type", "admin");
            localStorage.setItem("access_token", token);
            window.location ="/templates/admin";
        }
        else if (data.user_token){
            token = `${data.user_token}`;
            localStorage.setItem("user_type", "user");
            localStorage.setItem("access_token", token);
            window.location ="/templates/user";
        }
    })
    .catch((error) => console.error(error));
}