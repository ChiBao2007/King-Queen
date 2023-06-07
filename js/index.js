
let listProducts = [
    {
        name: "Chanel No 5 EDP",
        image: "../image/chanel No 5 edp.jpg",
        price: 500000,
        quantity: 1,
        gender: "women",
        brand: "Channel",
        id: uuid()
    },
    {
        name: "Burberry Brit Rhythm For Him",
        image: "../image/Burberry-Brit-Rhythm-For-Him-100ml-270x320.jpg",
        price: 850000,
        quantity: 1,
        gender: "men",
        brand: "Burberry",
        id: uuid()
    },
    {
        name: "Acqua Di Giò Absolu Eau De Parfum",
        image: "../image/acqua di giò absolu eau de parfum.jpg",
        price: 700000,
        quantity: 1,
        gender: "men",
        brand: " Giorgio Armani",
        id: uuid()
    },
    {
        name: "Creed Aventus By Creed",
        image: "../image/creed aventus by creed.jpg",
        price: 750000,
        quantity: 1,
        gender: "men",
        brand: " CREED",
        id: uuid()
    },
    {
        name: "Dior J'adore",
        image: "../image/dior J'adore.jpg",
        price: 550000,
        quantity: 1,
        gender: "women",
        brand: "Dior",
        id: uuid()
    },
    {
        name: "Dior Miss Dior Rose",
        image: "../image/dior miss dior rose.jpg",
        price: 600000,
        quantity: 1,
        gender: "women",
        brand: "Dior",
        id: uuid()
    },
    {
        name: "Gucci A Song For The Rose Eau De Parfum",
        image: "../image/gucci a song for the rose eau de parfum.jpg",
        price: 500000,
        quantity: 1,
        gender: "women",
        brand: "Gucci",
        id: uuid()
    },
    {
        name: "Jean Paul Gaultier",
        image: "../image/jean paul gaultier.jpg",
        price: 500000,
        quantity: 1,
        gender: "men",
        brand: "Classique",
        id: uuid()
    },
    {
        name: "Gucci Made To Measure Eau De ToiLette",
        image: "../image/gucci made to measure eau de toilette.jpg",
        price: 500000,
        quantity: 1,
        gender: "men",
        brand: "Gucci",
        id: uuid()
    },
    {
        name: "Gucci Pour Homme Eau De Toilette",
        image: "../image/gucci pour homme eau de toilette.jpg",
        price: 500000,
        quantity: 1,
        gender: "men",
        brand: "Gucci",
        id: uuid()
    },
    {
        name: "Versace DyLan Blue",
        image: "../image/Versace-Dylan-Blue-50ml-270x320.jpg",
        price: 500000,
        quantity: 1,
        gender: "men",
        brand: "Versace",
        id: uuid()
    },
    {
        name: "Viktor & Rolf Flowerbomb",
        image: "../image/viktor & rolf flowerbomb.jpg",
        price: 500000,
        quantity: 1,
        gender: "women",
        brand: "Viktor & Rolf",
        id: uuid()
    },
    {
        name: "YSL Black Opium",
        image: "../image/ysl black opium.jpg",
        price: 500000,
        quantity: 1,
        gender: "women",
        brand: "YSL",
        id: uuid()
    },
    {
        name: "Yves Saint Laurent Y",
        image: "../image/yves saint laurent Y.jpg",
        price: 500000,
        quantity: 1,
        gender: "men",
        brand: "Yves",
        id: uuid()
    },
    {
        name: "Versace Eros",
        image: "../image/versace-Eros-50ml-that-270x320.jpg",
        price: 500000,
        quantity: 1,
        gender: "men",
        brand: "Versace",
        id: uuid()
    },
    {
        name: "Diptyque Do Son",
        image: "../image/diptyque do son.jpg",
        price: 500000,
        quantity: 1,
        gender: "women",
        brand: "Diptyque",
        id: uuid()

    }
];
//function tạo id product
function uuid() {
    let uuid = new Date().getMilliseconds() + Math.floor(Math.random() * 999999999);
    return uuid;
}
for (let i = 0; i < listProducts.length; i++) {
    listProducts[i].uuid = uuid();
}
localStorage.setItem("listProducts", JSON.stringify(listProducts));



let currentPage = 1;
let totalItemPage = 8;
let start;
let end;

function startEnd(page) {
    start = (page - 1) * totalItemPage;
    end = totalItemPage * page;
}

startEnd(currentPage);

function showListItems(searchTerm) {
    let result = "";
    let filteredList = listProducts;
    if (searchTerm) {
        filteredList = listProducts.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    for (let i = 0; i < filteredList.length; i++) {
        if (i >= start && i < end) {
            let product = filteredList[i];
            result +=
                `
                    <div class="item-products">
                        <div class="img-products">
                            <img src="${product.image}" alt="${product.name}">
                        </div>
                        <div class="title-products">
                            <p>${product.name}</p>
                            <p>${product.price.toLocaleString()}đ</p>
                            <button onclick="addToCart(${product.id})" class="btn btn-cart" data-product-id="${product.uuid}"><span class="material-symbols-outlined">
                                    shopping_cart
                                </span>Thêm vào giỏ</button>
                        </div>
                    </div>
                `;

        }
    }
    document.getElementById('renderListProducts').innerHTML = result;
}

function showListPages() {
    let result = ""
    for (let i = 0; i < Math.ceil(listProducts.length / totalItemPage); i++) {
        result +=
            `
                <li onclick="nowPage(${i + 1})" class="item-page"></li>
            `
    }
    document.getElementById("renderAllPages").innerHTML = result;
    document.getElementsByClassName("item-page")[currentPage - 1].classList.add("active")
}

function increasePage() {
    currentPage++;
    if (currentPage > Math.ceil(listProducts.length / totalItemPage)) {
        currentPage = Math.ceil(listProducts.length / totalItemPage);
    }
    let result = document.getElementsByClassName("item-page");

    for (let i = 0; i < result.length; i++) {
        if (i == currentPage - 1) {
            result[i].classList.add("active");
        } else {
            result[i].classList.remove("active");
        }
    }
    startEnd(currentPage);
    showListItems();
}

function decreasePage() {
    currentPage--;
    if (currentPage < 1) {
        currentPage = 1;
    }
    let result = document.getElementsByClassName("item-page");

    for (let i = 0; i < result.length; i++) {
        if (i == currentPage - 1) {
            result[i].classList.add("active");
        } else {
            result[i].classList.remove("active");
        }
    }
    startEnd(currentPage);
    showListItems();
}

function nowPage(nowPage) {
    currentPage = nowPage;
    startEnd(currentPage);
    let result = document.getElementsByClassName("item-page");

    for (let i = 0; i < result.length; i++) {
        if (i == nowPage - 1) {
            result[i].classList.add("active");
        } else {
            result[i].classList.remove("active");
        }
    }
    showListItems();
}

// Lọc nước hoa nam theo dropdown-menu
function filterListProducts(gender) {
    if (gender === "men") {
        let filteredList = listProducts.filter((product) => product.gender === "men");
        listProducts = filteredList;
    } else {
        listProducts = originalListProducts;
    }
    currentPage = 1;
    startEnd(currentPage);
    showListItems();
    showListPages();
}
// Lọc nước hoa nữ theo dropdown-menu
function filterListProducts(gender) {
    if (gender === "women") {
        let filteredList = listProducts.filter((product) => product.gender === "women");
        listProducts = filteredList;
    } else {
        listProducts = originalListProducts;
    }
    currentPage = 1;
    startEnd(currentPage);
    showListItems();
    showListPages();
}
let originalListProducts = listProducts;

//Lọc thương hiệu theo dropdown-menu
function brandListProducts(brand) {
    if (brand === "all") {
        listProducts = originalListProducts;
    } else {
        let brandedList = originalListProducts.filter((product) => product.brand === brand);
        listProducts = brandedList;
    }
    currentPage = 1;
    startEnd(currentPage);
    showListItems();
    showListPages();
}

//iife (implement involked function expression) function, chay ngay tuc khac ngay khi ham duoc goi
(function root() {
    showListItems();
    showListPages();
})();

