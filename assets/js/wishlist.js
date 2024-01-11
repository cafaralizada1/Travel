const qutu = document.getElementById('card')

function getProducts(){
    let heart = JSON.parse(localStorage.getItem('heart')) || [];
    qutu.innerHTML = "";

    heart.map((item,index) => {
        const box = document.createElement('div')
        box.className = "cardList"
        box.innerHTML = `
        <img src="${item.image}" alt="photo">
        <h1>$ ${item.price}</h1>
        <p>${item.title}</p>
        <div class = "jsBtn">
        <button class="btnCard" onclick ="removeItem(${index})">sil</button>
        </div>
        `
        qutu.appendChild(box)
        })
}

function removeItem(index){
    let heart = JSON.parse(localStorage.getItem('heart')) || [];
    heart.splice(index,1)
    localStorage.setItem('heart', JSON.stringify(heart));
    getProducts()
}
getProducts()