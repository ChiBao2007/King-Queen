// Modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("cart");
var close = document.getElementsByClassName("close")[0];
var close_footer = document.getElementsByClassName("close-footer")[0];
var order = document.getElementsByClassName("order")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

close.onclick = function () {
    modal.style.display = "none";
}

close_footer.onclick = function () {
    modal.style.display = "none";
}

order.onclick = function () {
    alert("Cảm ơn bạn đã thanh toán đơn hàng");
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function addToCart(idProduct) {
    let userList = JSON.parse(localStorage.getItem("userList"));

    // Kiểm tra xem người dùng đã đăng nhập chưa
    let currentUser = userList.find(user => user.isLoggedIn);
    if (!currentUser) {
        console.log("Bạn phải đăng nhập để mua hàng");
        return;
    }

    // Lấy giỏ hàng của người dùng
    let cartUser = currentUser.cart;

    // Tìm sản phẩm muốn thêm vào giỏ hàng
    let product = listProducts.find(item => item.id === idProduct);

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng hay chưa
    let cartItem = cartUser.find(item => item.id === idProduct);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        };
        cartUser.push(cartItem);
    }

    // Lưu giỏ hàng của người dùng vào bộ nhớ cục bộ
    localStorage.setItem("userList", JSON.stringify(userList));
}