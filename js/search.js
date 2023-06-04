let listProducts = [];

listProducts = JSON.parse(localStorage.getItem("listProducts"));
// Tìm kiếm và lọc danh sách sản phẩm
function searchProducts() {
    let query = document.getElementById("searchInput").value.trim().toLowerCase();
    let filteredList = JSON.parse(localStorage.getItem("listProducts")).filter((product) => {
        return product.name.toLowerCase().includes(query);
    });
    currentPage = 1;
    startEnd(currentPage);
    listProducts = filteredList;
    showListItems();
    showListPages();
}