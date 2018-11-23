function userProfile(){
    url = user_url + '/' + user_email;
    console.log(url);
    fetch(url, {headers: access_headers})
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            output = "";
            rights = data.rights;
            if(user_type == "admin"){
                rights = "Administrator";
            }
            else{
                rights = "Attendant";
            }
            output += `
            <h1>${data.name}</h1>
            <h3>User ID : ${data.user_id}</h3>
            <h3>Email : ${data.email}</h3>
            <h3>Admin Rights : ${rights}</h3>
            `;
            document.getElementById('user-profile').innerHTML = output;

        })
        .catch((err) => console.log(err));
}

loaderFunction(userProfile);