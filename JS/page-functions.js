const popupCart = document.querySelector("#popup-cart");
const cart = document.querySelector("#cart");
const numberOfItems = cart.querySelector("#number-of-items");
const closeCart = document.querySelector("#popup-cart .fa-window-close");
const bannerBtn = document.querySelector("#banner-btn");
const menu = document.querySelector("#menu");
const closeMenu = document.querySelector("#menu .fa-window-close");
const openMenu = document.querySelector(".fa-bars");
const signinbtn = document.querySelector("#sign-in-btn");
const signinModal = document.querySelector("#sign-in");
const closeSigninModal = document.querySelector("#sign-in .fa-window-close");
const loginbtn = document.querySelector("#login-btn");
const loginModal = document.querySelector("#login");
const closeLoginModal = document.querySelector("#login .fa-window-close");
const total = popupCart.querySelector("#popup-footer").querySelector("#total");
const itemsWrapper = document.getElementById("items-wrapper");

cart.addEventListener('click', () => {
    popupCart.style.transform = "translateX(-100%)";
});
closeCart.addEventListener('click', () => {
    popupCart.style.transform = "translateX(100%)";
});
openMenu.addEventListener("click", () => {
    menu.style.transform = "translateX(100%)";
});
closeMenu.addEventListener("click", () => {
    menu.style.transform = "translateX(-100%)";
});

signinbtn.addEventListener("click", () => {
    signinModal.style.visibility = "visible";
    menu.style.transform = "translateX(-100%)";
    document.querySelector("body").style.overflow = "hidden";
});
closeSigninModal.addEventListener("click", () => {
    signinModal.style.visibility = "hidden";
    document.querySelector("body").style.overflow = "auto";
    document.querySelector("body").style.overflowX = "hidden";
});

loginbtn.addEventListener("click", () => {
    loginModal.style.visibility = "visible";
    menu.style.transform = "translateX(-100%)";
    document.querySelector("body").style.overflow = "hidden";
});
closeLoginModal.addEventListener("click", () => {
    loginModal.style.visibility = "hidden";
    document.querySelector("body").style.overflow = "auto";
    document.querySelector("body").style.overflowX = "hidden";
});

function increaseAmount(e) {
    var amountEl = e.parentNode.querySelector(".amount");
    amountEl.innerHTML ++;
    var parent = amountEl.parentNode.parentNode;
    let price = parseFloat(parent.querySelector(".cena").innerHTML.slice(1));
    total.innerHTML = (parseFloat(totalPrice.innerHTML) + price).toFixed(2);
}
function decreaseAmount(e) {
    var amountEl = e.parentNode.querySelector(".amount");
    var parent = amountEl.parentNode.parentNode;
    let price = parseFloat(parent.querySelector(".cena").innerHTML.slice(1));
    if(amountEl.innerHTML > 0) {
        amountEl.innerHTML --;
        total.innerHTML = (parseFloat(totalPrice.innerHTML) - price).toFixed(2);
        if(parseFloat(amountEl.innerHTML) == 0) {
            e.parentNode.parentNode.remove()
            numberOfItems.innerHTML = parseInt(numberOfItems.innerHTML) - 1;
        }
    }
}

function removeItem(e) {
    var item = e.parentNode.parentNode.parentNode;
    let price = parseFloat(item.querySelector(".cena").innerHTML.slice(1));
    let amount = parseInt(item.querySelector(".amount").innerHTML);
    let itemName = item.querySelector(".info span").innerHTML;
    total.innerHTML = (parseFloat(totalPrice.innerHTML) - price * amount).toFixed(2);
    let prs = document.querySelectorAll(".single-product");

    for(let i = 0; i < prs.length; i ++) {
        if(prs[i].querySelector(".product-name").innerHTML == itemName) {
            prs[i].style.opacity = "1"
            prs[i].querySelector(".product-popup").disabled = false;
        }
    }

    item.remove()
    numberOfItems.innerHTML = parseInt(numberOfItems.innerHTML) - 1;
}

function emptyCart() {
    let prs = document.querySelectorAll(".single-product");

    itemsWrapper.querySelectorAll(".item").forEach(it => {
        let itemName = it.querySelector(".info span").innerHTML;
        for(let i = 0; i < prs.length; i ++) {
            if(prs[i].querySelector(".product-name").innerHTML == itemName) {
                prs[i].style.opacity = "1"
                prs[i].querySelector(".product-popup").disabled = false;
            }
        }
        it.remove();
    })

    total.innerHTML = 0;
}