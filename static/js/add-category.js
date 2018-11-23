document.getElementById("addCategory").addEventListener("submit", addCategory);

function addCategory(e){
    e.preventDefault();

    let category_name = document.getElementById('category_name').value;

    fetch(category_url, {
        method:'POST',
        headers: access_headers,
        body:JSON.stringify({category_name:category_name})
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .then(() =>location.reload())
    .catch((err) => console.log(err));
}