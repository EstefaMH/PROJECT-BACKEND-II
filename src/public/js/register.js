const form = document.getElementById('registerForm')


form.addEventListener('submit', e => {
    e.preventDefault();
    const dataForm = new FormData(form)

    const obj = {};
    dataForm.forEach((value, key) => {
        obj[key] = value;
    });

    console.log(obj)

    fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        console.log("result.status", result);

        if (result.ok) {
            result.json()
            alert("Usuario creado con exito!");
            window.location.replace('/login');
        } else {
            alert("No se pudo crear el usuario! : ");
        }
    })

})

