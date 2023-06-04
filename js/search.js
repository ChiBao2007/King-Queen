// Lấy ra các phần tử trên giao diện
let searchForm = document.getElementById('search-form');
let productList = document.getElementById('renderListProducts');

// Lấy danh sách sản phẩm từ local storage hoặc khởi tạo nếu chưa có
let listProducts = JSON.parse(localStorage.getItem('listProducts')) || [];

// Thêm sự kiện submit form tìm kiếm
searchForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Ngăn chặn hành động mặc định của form khi submit

  let searchInput = document.getElementById('search-input').value.trim().toLowerCase();

  // Lọc danh sách sản phẩm dựa trên tên sản phẩm
  let filteredProducts = listProducts.filter(function (product) {
    let productName = product.name.toLowerCase();
    return productName.indexOf(searchInput) !== -1 || productName.includes(searchInput);
  });

  // Xóa danh sách sản phẩm cũ
  while (productList.firstChild) {
    productList.removeChild(productList.firstChild);
  }

  // Hiển thị danh sách sản phẩm sau khi tìm kiếm
  filteredProducts.forEach(function (product) {
    let li = document.createElement('li');
    li.textContent = product.name + ' - ' + product.price;
    productList.appendChild(li);
  });
});

// Hiển thị tất cả các sản phẩm ban đầu
listProducts.forEach(function (product) {
  let li = document.createElement('li');
  li.textContent = product.name + ' - ' + product.price;
  productList.appendChild(li);
});