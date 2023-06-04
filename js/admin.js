// Lấy danh sách sản phẩm từ Local Storage
let listProducts = JSON.parse(localStorage.getItem('listProducts')) || [];

// Lấy thông tin sản phẩm từ các trường trên form
let name = document.getElementById('name').value;
let price = document.getElementById('price').value;
let description = document.getElementById('description').value;

// Tạo một đối tượng sản phẩm mới
let newProduct = {
  name: name,
  price: price,
  description: description
};

// Thêm sản phẩm mới vào danh sách sản phẩm
productList.push(newProduct);

// Lưu danh sách sản phẩm mới vào Local Storage
localStorage.setItem('productList', JSON.stringify(productList));