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