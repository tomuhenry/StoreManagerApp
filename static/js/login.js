document.getElementById("login").addEventListener("submit", loginUser);

function loginUser(e){
    e.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    fetch('https://tomuhenry-storemanagerapp.herokuapp.com/store-manager/api/v1/auth/login', {
        method:'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'content-type': 'application/json'
        },
        body:JSON.stringify({email:email, password:password})
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        if (access_token == null){
            if (data.admin_token){
            token = `${data.admin_token}`;
            localStorage.setItem("access_token", token);
            window.location ="/templates/admin";
            }
            else if (data.user_token){
                token = `${data.user_token}`;
                localStorage.setItem("access_token", token);
                window.location ="/templates/user";
            }
        }
        else{
            console.log(access_token);
        }
    })
    .catch(error => console.log(error))
}

var access_token = localStorage.getItem("access_token");