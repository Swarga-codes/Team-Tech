console.log("running");
let carts = document.querySelectorAll('.add-cart');


let products = [
    {
        name: "Boult Audio Black TrueBuds",
        tag: "earpods3",
        price: 1800,
        inCart: 0
    },
    {
        name: "boAt Rockerz 400(Yellow)",
        tag: "headphones6",
        price: 1499,
        inCart: 0
    },
    {
        name: "Beats Wireless Headphones",
        tag: "headphones",
        price: 17999,
        inCart: 0
    },
    {
        name: "Kotion G9000 Gaming Headphone",
        tag: "headphones1",
        price: 1899,
        inCart: 0
    },
    {
        name: "MSI GL62MVR 7RFX",
        tag: "laptop5",
        price: 68499,
        inCart: 0
    },
    {
        name: "ALIENWARE M15 GAMING LAPTOP",
        tag: "Alienware 2",
        price: 265999,
        inCart: 0
    },
    {
        name: "Acer Predator Triton",
        tag: "laptop8",
        price: 86599,
        inCart: 0
    },
    {
        name: "Asus TUF FX AU092T",
        tag: "tuf",
        price: 56999,
        inCart: 0
    },
    {
        name: "iPad Air 2020 (Green)",
        tag: "ipad",
        price: 50900,
        inCart: 0
    },
    {
        name: "Microsoft Surface Go (Gold)",
        tag: "47",
        price: 34699,
        inCart: 0
    },
    {
        name: "Lenovo Tab P11 Pro (Slate Grey)",
        tag: "lenovo",
        price: 48990,
        inCart: 0
    },
    {
        name: "Realme Pad 4",
        tag: "realme",
        price: 19899,
        inCart: 0
    },
    {
        name: "Samsung Galaxy Note20 Ultra",
        tag: "mobile1",
        price: 104999,
        inCart: 0
    },
    {
        name: "OnePlus Nord 5G",
        tag: "mobile2",
        price: 29999,
        inCart: 0
    },
    {
        name: "Mi 10 (Coral Green)",
        tag: "mobile3",
        price: 55999,
        inCart: 0
    },
    {
        name: "Apple iPhone 11 Pro Max",
        tag: "mobile4",
        price: 90900,
        inCart: 0
    }
];

for(let i=0; i< carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers(){
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers){
        document.querySelector('.bt1 span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers= parseInt(productNumbers);
    if(productNumbers ){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.bt1 span').textContent = productNumbers + 1;
    } 
    else{
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.bt1 span').textContent = 1;
    }
    setItems(product);
}

function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){

        if(cartItems[product.tag] == undefined){
            cartItems = {
               ... cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }
    else{
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    
    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost);

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }
    else{
        localStorage.setItem("totalCost", product.price);
    }
}



function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if( cartItems && productContainer ){
        productContainer.innerHTML = ``;
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
            <ion-icon name="close-circle-outline"></ion-icon>
            <img src="images/${item.tag}.jpg"
            <br>
            <h4>${item.name}</h4>
            </div>
            <div class="price">Rs${item.price}.00</div>
            <div class="quantity">
            <ion-icon name="arrow-back-circle-outline"></ion-icon>
              <span>${item.inCart}</span>
              <ion-icon name="arrow-forward-circle-outline"></ion-icon>
              </div>
              <div class="total">
              Rs${item.inCart * item.price}.00
              </div>
            `
            productContainer.innerHTML += `
            <div class="product">
            <ion-icon name="close-circle-outline"></ion-icon>
            <img src="images/${item.tag}.jpg"
            <br>
            <h4>${item.name}</h4>
            </div>
            <div class="price">Rs${item.price}.00</div>
            <div class="quantity">
            <ion-icon name="arrow-back-circle-outline"></ion-icon>
              <span>${item.inCart}</span>
              <ion-icon name="arrow-forward-circle-outline"></ion-icon>
              </div>
              <div class="total">
              Rs${item.inCart * item.price}.00
              </div>
            `
        });
        productContainer.innerHTML += `
        <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">
              Basket Total
        </h4>
        <h4 class="basketTotal">
             Rs${cartCost}.00
        </h4>
        `;
    }
    
}

onLoadCartNumbers();
displayCart();
{/* <script src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script> */}