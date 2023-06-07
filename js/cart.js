const modal = document.getElementById("myModal");
const btn = document.getElementById("cart");
const close = document.querySelector(".close");
const closeFooter = document.querySelector(".close-footer");
const order = document.querySelector(".order");

btn.addEventListener("click", function () {
  modal.style.display = "block";
});

close.addEventListener("click", function () {
  modal.style.display = "none";
});

closeFooter.addEventListener("click", function () {
  modal.style.display = "none";
});

order.addEventListener("click", function () {
  // Hiển thị thông báo cho người dùng
  const message = document.createElement("div");
  message.textContent = "Cảm ơn bạn đã thanh toán đơn hàng";
  document.body.appendChild(message);

  // Sau vài giây, ẩn thông báo 
  setTimeout(function () {
    message.remove();
  }, 3000);

  // Xóa giỏ hàng của người dùng
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser")) || {};
  currentUser.cart = [];
  sessionStorage.setItem("currentUser", JSON.stringify(currentUser));

  // Cập nhật giao diện giỏ hàng
  updateCartUI();
});

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

function addToCart(id) {
  console.log(id)
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser")) || {};
  if (!currentUser.name) {
    alert("Bạn phải đăng nhập để mua hàng");
    return;
  }

  const product = listProducts.find((item) => item.id === id);
  if (!product) {
    alert("Không tìm thấy sản phẩm");
    return;
  }

  const cart = currentUser.cart || [];
  let cartItem = cart.find((item) => item.id === id);
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    };
    cart.push(cartItem);
  }

  sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
  updateCartUI();
}

function removeCartItem(id) {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser")) || {};
  const cart = currentUser.cart || [];
  const index = cart.findIndex((item) => item.id === id);
  if (index !== -1) {
    cart.splice(index, 1);
  }
  sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
  updateCartUI();
}

function updateCartUI() {
  // Lấy giỏ hàng của người dùng
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser")) || {};
  const cart = currentUser.cart || [];

  // Tính tổng số lượng sản phẩm trong giỏ hàng
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  document.getElementById("cart-count").textContent = totalQuantity.toString();

  // Cập nhật danh sách sản phẩm trong giỏ hàng
  const cartItemsDiv = document.querySelector(".cart-items");
  cartItemsDiv.innerHTML = "";
  cart.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("cart-row");
    div.innerHTML = `
      <div class="cart-item cart-column">
          <span class="cart-item-name">${item.name}</span>
          <button class="btn btn-danger cart-item-remove" data-id="${item.id}">Xóa</button>
      </div>
      <span class="cart-price cart-column">${item.price} VNĐ</span>
      <div class="cart-quantity cart-column">
          <input class="cart-quantity-input" type="number" min="1" value="${item.quantity}" data-id="${item.id}">
      </div>`;
    cartItemsDiv.appendChild(div);
  });

  // Cập nhật tổng giá trị của giỏ hàng
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  document.querySelector(".cart-total-price").textContent = totalPrice.toLocaleString() + " VNĐ";

  // Gán sự kiện xóa sản phẩm trực tiếp cho các button "Xóa" trong giỏ hàng
  const removeButtons = document.querySelectorAll(".cart-item-remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const id = button.dataset.id;
      removeCartItem(id);
    });
  });

  // Gán sự kiện thay đổi số lượng sản phẩm trực tiếp cho các input trong giỏ hàng
  const quantityInputs = document.querySelectorAll(".cart-quantity-input");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", function () {
      const id = input.dataset.id;
      const quantity = parseInt(input.value);
      const currentUser = JSON.parse(sessionStorage.getItem("currentUser")) || {};
      const cart = currentUser.cart || [];
      const cartItem = cart.find((item) => item.id === id);
      if (cartItem) {
        cartItem.quantity = quantity;
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
        updateCartUI();
      }
    });
  });
}

// Gọi hàm updateCartUI() khi trang web được tải lần đầu và sau mỗi lần thêm hoặc xóa sản phẩm trong giỏ hàng
window.addEventListener("load", updateCartUI);