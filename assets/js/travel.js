const qutu = document.getElementById('card')

let limit = 3;
let page = 1


async function getProducts() {
    const response = await axios.get(`https://65685e799927836bd974a707.mockapi.io/products?limit=${limit}&page=${page}`)
    const data = await response.data
    db = data

    db.map(item => {
        const box = document.createElement('div')
        box.className = "cardList"
        box.innerHTML = `
        <img src="${item.image}" alt="photo">
        <h1>$ ${item.price}</h1>
        <p>${item.title}</p>
        <div class = "jsBtn">
        <button class="btnCard" onclick ="addToCart(${item.id})">sepete ekle</button>
        <button class="btnWishlist" onclick ="addToWishlist(${item.id})">wishliste ekle</button>
        </div>
        
        `
        qutu.appendChild(box)
    })
    page++
}
document.getElementById('load').addEventListener('click', getProducts)



function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || []
    cart.push(db.find(item => item.id == id))
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToWishlist(id) {
    let heart = JSON.parse(localStorage.getItem('heart')) || []
    heart.push(db.find(item => item.id == id));
    localStorage.setItem('heart', JSON.stringify(heart))
}
getProducts()



const form = document.getElementById('form')
const emaill = document.getElementById('email')
const passwordd = document.getElementById('password')
const namee = document.getElementById('name')

form.addEventListener('submit', function (e) {
    e.preventDefault()

    axios.post(`https://65685e799927836bd974a707.mockapi.io/form`, {
        email: emaill.value,
        password: passwordd.value,
        name: namee.value
    })
        .then(response => {
            console.log(response.data);
        })


})





const max = document.getElementById('max')
const min = document.getElementById('min')

function maxFunc() {
    qutu.innerHTML = ''
    axios.get('https://65685e799927836bd974a707.mockapi.io/products')
        .then(res => {
            db = res.data
            let sortData = db.sort((a, b) => (a.title.localeCompare(b.title)))
            console.log(sortData);
            sortData.map(item => {
                const box = document.createElement("div");
                box.className = "cardList ";
                box.innerHTML = `
    
                <img src="${item.image}" alt="photo">
        <h1>$ ${item.price}</h1>
        <p>${item.title}</p>
        <div class = "jsBtn">
        <button class="btnCard" onclick ="addToCart(${item.id})">sepete ekle</button>
        </div>
            
        `;
                qutu.appendChild(box);
            })
        })
}

max.addEventListener('click', maxFunc)



function minFunc() {
    qutu.innerHTML = ''
    axios.get('https://65685e799927836bd974a707.mockapi.io/products')
        .then(res => {
            db = res.data
            let sortData = db.sort((a, b) => (b.title.localeCompare(a.title)))
            console.log(sortData);
            sortData.map(item => {
                const box = document.createElement("div");
                box.className = "cardList ";
                box.innerHTML = `
                <img src="${item.image}" alt="photo">
                <h1>$ ${item.price}</h1>
                <p>${item.title}</p>
                <div class = "jsBtn">
                <button class="btnCard" onclick ="addToCart(${item.id})">sepete ekle</button>
                </div>
       
        
        `;
                qutu.appendChild(box);
            })
        })
}

min.addEventListener('click', minFunc)




















const inp = document.getElementById('inp')
const btn = document.getElementById('searchBtn')
const searchDiv = document.getElementById('card')


function getSearch() {
    searchDiv.innerHTML = ""
    axios.get('https://65685e799927836bd974a707.mockapi.io/products')
        .then(res => {
            db = res.data
            const filterData = db.filter(item => item.title.toLowerCase().startsWith(inp.value.toLowerCase()))
            filterData.map(item => {
                const box = document.createElement('div');
                box.className = "cardList"
                box.innerHTML = `
            <img src="${item.image}" alt="photo">
            <h1>${item.title}</h1>
            <p>$ ${item.price}</p>
        `
                searchDiv.appendChild(box)
            })
        })
}
btn.addEventListener('click', getSearch)