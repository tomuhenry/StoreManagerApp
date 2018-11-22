function userProfile(){
    url = user_url + '/' + user_email;
    console.log(url);
    fetch(url, {headers: access_headers})
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            output = "";
            output += `
            <h1>${data.name}</h1>
            <h2>User ID =: ${data.user_id}</h2>
            <h2>User ID =: ${data.email}</h2>
            <h2>Admin Rights =: ${data.rights}</h2>
            `;

        })
        .catch((err) => console.log(err));
        document.getElementById('user-profile').innerHTML = output;
}