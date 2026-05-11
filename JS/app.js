let session = new Session();
let session_id = session.getSession();

let products = document.getElementsByClassName("single-product");
let cartItems = document.getElementById("items-wrapper");
let totalPrice = document.querySelector("#popup-footer #total");
const numOfItems = document.querySelector("#cart").querySelector("#number-of-items");
const clearCart = document.querySelector("#clear-cart");

async function populateUserData() {
    let id = session.getSession();
    if(!id)
        return;

    let user = new User();
    user = await user.get(id);
    document.querySelector("#name").innerHTML = `${user.fname} ${user.lname}`;
    console.log(id)
}

populateUserData();

/* if(session_id !== "") {
    populateUserData(session_id);
} */

document.getElementById("sign-in-form").addEventListener('submit', e => {
    e.preventDefault();

    let user = new User();
    user.fname = document.getElementById("fname").value;
    user.lname = document.getElementById("lname").value;
    user.email = document.getElementById("signin-email").value;
    user.password = document.getElementById("signin-password").value;

    if(!user.email.includes('@'))
        alert("Wrong email address!");

    document.querySelector("#sign-in").style.visibility = "hidden";
    document.querySelector("body").style.overflow = "auto";
    document.querySelector("body").style.overflowX = "hidden";
    document.querySelector("#name").innerHTML = `${user.fname} ${user.lname}`;
    user.create();

    session = new Session();
    session.user_id = user.id;
    session.startSession();

    session_id = session.getSession();
    populateUserData();
    location.reload();
});

document.querySelector("#login-form").addEventListener('submit', e => {
    e.preventDefault();

    let user = new User();
    user.email = document.querySelector("#login-email").value;
    user.password = document.querySelector("#login-password").value;
    document.querySelector("#login-email").value = "";
    document.querySelector("#login-password").value = "";

    document.querySelector("#login").style.visibility = "hidden";
    document.querySelector("body").style.overflow = "auto";
    document.querySelector("body").style.overflowX = "hidden";

    user.login();
    session = new Session();
    session.user_id = user.id;
    session.startSession();

    session_id = session.getSession();
    populateUserData();
    location.reload();
});

document.querySelector("#logout").addEventListener("click", () => {
    if(!session_id) {
        alert("Login or create account first!");
    } else {
        session.destroySession();
        location.reload();
    }
});

for(let i = 0; i < products.length; i ++) {
    let product = products[i];
    let prPopup = product.querySelector(".product-popup");
    
    prPopup.addEventListener("click", () => {
        console.log(session_id)
        if(session_id === "") {
            alert("Login or create account first");
        } else {
            let img = product.querySelector("img").getAttribute("src")
            let name = product.querySelector(".product-name").textContent;
            let price = parseFloat(product.querySelector(".price").textContent.slice(1));
    
            let itemHtml = `
                <div class="item">
                    <div class="product-wrapper">
                        <img src="${img}" alt="">
                            <div class="info">
                                <span>${name}</span>
                                <span class="cena">$${price}</span>
                                <button onclick="removeItem(this)" class="remove">remove</button>
                            </div>
                    </div>
                    <div class="amount-wrapper">
                        <button onclick="increaseAmount(this)"><i class="fas fa-chevron-up"></i></button>
                        <span class="amount">1</span>
                        <button onclick="decreaseAmount(this)"><i class="fas fa-chevron-down"></i></button>
                    </div>
                </div>
            `;
            cartItems.innerHTML += itemHtml;
            numOfItems.innerHTML = parseInt(numberOfItems.innerHTML) + 1;
            prPopup.disabled = "true";
            product.style.opacity = "0.5"
            totalPrice.innerHTML = (parseFloat(totalPrice.innerHTML) + price).toFixed(2);
        }
    });
}

document.querySelector("#delete-account").addEventListener("click", () => {
    session = new Session();
    session_id = session.getSession();
    if(session_id === "") {
        alert("Login or create account first");
    } else {
        let user = new User();
        user.delete();
        
        session = new Session();
        session.user_id = user.id;
        session.startSession();

        session_id = session.getSession();
        populateUserData();
        location.reload();
    }
});

document.querySelector("#buy").addEventListener('click', () => {
    if(session_id === "") {
        alert("Login or create account first!");
    } else {
        let ordered = [];
        let orderPrice = parseFloat(totalPrice.innerHTML);
        let username = document.querySelector("#name").innerHTML;
    
        document.querySelectorAll(".item").forEach(it => {
            ordered.push(it.querySelector(".info span").innerHTML)
        })
    
        console.log(ordered);

        let order = new Order(session_id, username, ordered, orderPrice);
        order.createOrder();
        emptyCart();
        alert("You bought selected items");
    }
});

clearCart.addEventListener("click", () => {
    if(session_id === "") {
        alert("Select items to buy first");
    } else {
        emptyCart();
    }
});