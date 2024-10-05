import { getData } from "../main.js";
export let Cart = [];

function printData(data) {
  let items = ``;
  data.map((ele) => {
    items += ` <div class="item">
              <img src="${ele.thumbnail}" alt="" />
              <div class="item-info">
                <h3>${ele.title}</h3>
                <span>${ele.price}$</span>
              </div>
              <button id="${ele.id}">add to cart</button>
            </div>`;
  });
  document.querySelector(".Catalog .row").innerHTML = items;
}

async function init() {
  let data = await getData();
  printData(data);
  addtoCartListener(data);
}

function addtoCartListener(data) {
  let buttons = document.querySelectorAll(".Catalog .row .item button");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      let productId = parseInt(button.getAttribute("id"));
      let product = data.find((p) => p.id === productId);
      addtoCart(product);
    });
  });
}

function addtoCart(item) {
  let cartItem = Cart.find((ele) => ele.id === item.id);

  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    item.quantity = 1;
    Cart.push(item);
  }
  localStorage.setItem("Cart", JSON.stringify(Cart));

  console.log(Cart);
}

init();
