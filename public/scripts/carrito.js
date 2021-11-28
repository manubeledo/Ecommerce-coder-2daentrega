console.log("DESDE EL SCRIPT CARRITO")
const templateCarrito = document.getElementById('template-carrito').content
const items = document.getElementById('items')
const nombre = document.getElementById('id-carrito')
const fragment = document.createDocumentFragment()



document.addEventListener('DOMContentLoaded', () => { fetchData() });

// document.addEventListener('click', e => {
//     console.log(e)
//     console.log(e.path[2].querySelector('th').innerHTML)
// })


const fetchData = async () => {
    try{
        console.log("desde el fetch")
        const res = await fetch('http://localhost:8080/api/carritos');
        const datos = await res.json();
        console.log(datos);
        pintarCarrito(datos);
    } catch(err) {
        console.log(err)
    }
}



const pintarCarrito = (datos) => {
    items.innerHTML = '';
        datos.forEach(carrito => {
        templateCarrito.querySelector('th').textContent = carrito.id_carrito
        templateCarrito.querySelectorAll('td')[0].textContent = carrito.id_carrito
        templateCarrito.querySelectorAll('td')[1].textContent = carrito.id_producto
        templateCarrito.querySelectorAll('td')[2].textContent = carrito.cantidad
        templateCarrito.querySelectorAll('td')[3].textContent = 'VACIO'
        templateCarrito.querySelectorAll('td')[4].textContent = 'VACIO'

        // templateCarrito.querySelector('.btn-info').dataset.id = carrito.id
        templateCarrito.querySelector('.btn-danger').dataset.id = carrito.id_carrito

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)
}

// templateCarrito.querySelector('.btn-info').dataset.id = carrito.id
// templateCarrito.querySelector('.btn-danger').dataset.id = carrito.id



// let botones = document.getElementsByClassName('btn-danger')

// console.log(botones)

// botones.forEach(boton => {
//     boton.addEventListener('click', async (e) => {
//         console.log(e)
//     //     await fetch(`http://localhost:8080/api/carritos/${e.path[2].querySelector('th').innerHTML}`, {
//     //         method: 'DELETE',
//     //         headers:{ 'Content-Type': 'application/json' }
//     //       })
//     // }
//     })})

items.addEventListener('click', e => {
    btnAccion(e)
})

const btnAccion = async (e) => {
    if (e.target.classList.contains('btn-danger')) {
        await fetch(`http://localhost:8080/api/carritos/${e.target.dataset.id}`, {
            method: 'DELETE',
            headers:{ 'Content-Type': 'application/json' }
          })
        window.location.href = window.location.href
    }
    e.stopPropagation()
}