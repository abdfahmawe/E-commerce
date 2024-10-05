let History = [];
function init() {
  let Cart = JSON.parse(localStorage.getItem("Cart") || []);
  displayCart(Cart);
  displayOrderSummary(Cart);
  displayTotalPrice(Cart);
  addIncDecLinster(Cart);
  checkout(Cart);
}
function displayCart(cart) {
  let items = ` <h3>Your Cart</h3>`;
  cart
    .map((ele) => {
      items += ` <div class="item" data-id = "${ele.id}">
                <div class="item-info">
                  <img src="${ele.thumbnail}" alt="" />
                  <div class="item-name">
                    <h4>${ele.title}</h4>
                    <span>$${(ele.price * ele.quantity).toFixed(2)}</span>
                  </div>
                </div>
                <div class="item-inc-dec">
                  <div class="inc-dec">
                    <button class="inc">
                      <i class="fa-solid fa-plus"></i>
                    </button>
                    <span>${ele.quantity}</span>
                    <button class="dec">
                      <i class="fa-solid fa-minus"></i>
                    </button>
                  </div>
                  <button class="Remove">Remove</button>
                </div>
              </div>`;
    })
    .join("");
  document.querySelector(".Cart .row .your-cart").innerHTML = items;
}

function displayOrderSummary(cart) {
  let items = ``;
  cart
    .map((ele) => {
      items += ` <div class="item-list">
                    <span>${ele.title}</span>
                    <span>$${ele.price}</span>
                    <span>${ele.quantity}</span>
                    <span>$${(ele.price * ele.quantity).toFixed(2)}</span>
                  </div>`;
    })
    .join("");
  document.querySelector(".Cart .row .order-summary .items-summary").innerHTML =
    items;
}
function displayTotalPrice(Cart) {
  let totalPrice = 0;
  Cart.map((ele) => {
    totalPrice += ele.price * ele.quantity;
  });

  document.querySelector(".Cart .row .order-summary .checkout").innerHTML = `
  <span>Total Price</span>
  <span>$${totalPrice.toFixed(2)} </span>
                `;
  let nettotal = totalPrice - (totalPrice * 5) / 100;
  document.querySelector(".Cart .row .order-summary .nettotal").innerHTML = `
 <span class="PriceAfterDiscount">Net Total</span>
                <span>$${nettotal.toFixed(2)}</span>
                `;
}

function addIncDecLinster(cart) {
  let incbuttons = document.querySelectorAll(".Cart .row .your-cart .inc");
  let decbuttons = document.querySelectorAll(".Cart .row .your-cart .dec");
  let removebuttons = document.querySelectorAll(
    ".Cart .row .your-cart .Remove"
  );
  incbuttons.forEach((button) => {
    button.addEventListener("click", function () {
      let parentItem = this.closest(".item");
      let itemId = parseInt(parentItem.getAttribute("data-id"));
      let cartItem = cart.find((item) => item.id === itemId);
      cartItem.quantity += 1;

      localStorage.setItem("Cart", JSON.stringify(cart));

      init();
    });
  });
  decbuttons.forEach((button) => {
    button.addEventListener("click", function () {
      let parentItem = this.closest(".item");
      let itemId = parseInt(parentItem.getAttribute("data-id"));

      let cartItem = cart.find((item) => item.id === itemId);
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      } else {
        cart = cart.filter((item) => item.id !== itemId);
      }

      localStorage.setItem("Cart", JSON.stringify(cart));

      init();
    });
  });

  removebuttons.forEach((button) => {
    button.addEventListener("click", function () {
      let parentItem = this.closest(".item");
      let itemId = parseInt(parentItem.getAttribute("data-id"));

      let cartItem = cart.find((item) => item.id === itemId);

      cart = cart.filter((item) => item.id !== itemId);

      localStorage.setItem("Cart", JSON.stringify(cart));

      init();
    });
  });
}

function checkout(Cart) {
  let visaInput = document.querySelector(
    ".Cart .order-summary .Payment .type-of-payment form #visa"
  );
  let cashInput = document.querySelector(
    ".Cart .order-summary .Payment .type-of-payment form #cash"
  );
  visaInput.addEventListener("click", function () {
    document.querySelector(
      ".Cart .order-summary .Payment .visa-payment-form"
    ).style.display = "block";
  });

  cashInput.addEventListener("click", function () {
    document.querySelector(
      ".Cart .order-summary .Payment .visa-payment-form"
    ).style.display = "none";
  });
}

init();
