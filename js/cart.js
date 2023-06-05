// Modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("cart");
var close = document.getElementsByClassName("close")[0];
/* // tại sao lại có [0] như  thế này bởi vì mỗi close là một html colection nên khi mình muốn lấy giá trị html thì phải thêm [0]. 
Nếu mình có 2 cái component cùng class thì khi[0] nó sẽ hiển thị component 1 còn[1] thì nó sẽ hiển thị component 2. */
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
    alert("Cảm ơn bạn đã thanh toán đơn hàng")
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
//function tạo id product
/* function uuid() {
    let uuid = new Date().getMilliseconds() + Math.floor(Math.random()*999999999);
    return uuid;
  }
  for (let i = 0; i < listProducts.length; i++) {
      listProducts[i].uuid =uuid();
  }
  console.log(listProducts);
 */
function addToCart(idProduct) {
    console.log(idProduct);
    localStorage.setItem("userList", 12321312312)
    let userList = localStorage.getItem("userList");
    if (userList == null) {
        console.log("bạn phải đăng nhập để mua hàng");//snackbar
        return;
    }
    //trước khi mua hàng phải lấy giỏ hàng của người ta ra đi mua
    let listUsers = JSON.parse(localStorage.getItem("listUser"));
    let cartUser = listUsers.filter((item) => {
        return item.idUser == keyCheckLogin;
    })
    console.log(cartUser);
}
localStorage.getItem("userList");
