const form = document.getElementById('loginForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    console.log(obj)
    data.forEach((value, key) => obj[key] = value);
    fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(result => {
        if (result.status === 200) {

            result.json()
                .then(json => {
                    console.log("Cookies generadas:");
                    console.log(document.cookie);


                    alert("Login realizado con exito!!")
                    window.location.replace('/');
                });
        } else if (result.status === 401) {
            console.log(result);
            alert("Login invalido!!")
        }
    })
})