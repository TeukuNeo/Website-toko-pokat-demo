// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");
// ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

const shoppingMenu = document.querySelector('.shopping-cart');
document.querySelector('#shopping-cart').onclick = (e) => {
  e.preventDefault()
  shoppingMenu.classList.toggle("active");
}

// Toggle class active for search form
const searchForm = document.querySelector('.search-form');
const searchBox = document.querySelector('#search-box');
const searchButton = document.querySelector('#search-button');

searchButton.addEventListener('click', (e) => {
  searchForm.classList.toggle('active');
  searchBox.focus();
  e.preventDefault();
});

// Klik di luar sidebar untuk menghilangkan nav
const hamburger = document.querySelector('#hamburger-menu');
const shoppingBtn = document.querySelector('#shopping-cart');

document.addEventListener('click', function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove('active');
  }
  if (!shoppingBtn.contains(e.target) && !shoppingMenu.contains(e.target)) {
    shoppingMenu.classList.remove('active')
  }
})

let product = document.getElementById("products-row")
let basket = JSON.parse(localStorage.getItem("data")) || []
let shoppingCart = document.getElementById('shopping-cart-menu')

let displayProduct = () => {
  return (product.innerHTML = productGenerate.map((x) => {
    let { id, name, price, img } = x
    let search = basket.find((x) => x.id === id) || []
    return `
      <div class="products-card" id="product-id-${id}" >
        <div class="products-icon">
          <i onclick="addToCart(${id})" class="bi bi-cart"></i>
          <i class="bi bi-eye"></i>
        </div>
        <div class="product-image">
          <img src="${img}" alt="product 1">
        </div>
        <div class="product-content">
          <h3>${name}</h3>
          <div class="product-stars" id=${id}>
            
          </div>
          <div class="product-price">${price} <span>IDR 12K</span></div>
        </div>
      </div> `
  }).join(""))
}

displayProduct()

let addToCart = (id) => {
  let selectedItem = id
  let search = basket.find((x) => x.id === selectedItem.id)

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1
    })
  } else {
    search.item += 1;
  }
  displayProduct()
  localStorage.setItem("data", JSON.stringify(basket))
}

let updateToCart = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(`product-id-${id}`).innerHTML = search.item;
}

let updateInCart = (id) => {
  let search = basket.find((x) => x.id === id)
  document.getElementById(`cart-id-${id}`).innerHTML = search.item
}

let displayCart = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket.map((x) => {
      let { id, item } = x
      let search = productGenerate.find((y) => y.id === id) || []
      let { img, name, price } = search
      return `
      <div class="cart-item" id="cart-id-${id}">
      <div class="shopping-img">
        <img src="${img}" alt="">
      </div>
      <div class="shopping-price">
        <p>${name}</p>
        <div clas="shopping-price-detail">
          <span style="font-size: 15px;" class="price">Rp ${price} <span> x </span></span>
          <button id="subt-menu" onclick="decrementItem(${id})">-</button>
          <span style="font-size: 15px;" id="quan-menu">${item}</span>
          <button id="add-menu" onclick="incrementItem(${id})">+</button>
          <span class="total-price">= <span>Rp ${item * search.price}</span> </span>
        <i class="bi bi-x" onclick="removeItem(${id})"></i>
        </div>
      </div>
    </div>
    `
    }).join(""))
  } else {
    shoppingCart.innerHTML = `
     <h2>Cart Is Empty</h2>
    `
  }
}

displayCart()

let incrementItem = (id) => {
  let selectedItem = id
  let search = basket.find((x) => x.id === selectedItem.id)

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1
    })
  } else {
    search.item += 1
  }
  displayCart()
  localStorage.setItem("data", JSON.stringify(basket))
}

let decrementItem = (id) => {
  let selectedItem = id
  let search = basket.find((x) => x.id === selectedItem.id)

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  basket = basket.filter((x) => x.item !== 0)
  displayCart()
  localStorage.setItem("data", JSON.stringify(basket))
}

let removeItem = (id) => {
  let selectedItem = id
  basket.filter((x) => x.id !== selectedItem.id)
  displayCart()
  localStorage.setItem("data", JSON.stringify(basket))
}