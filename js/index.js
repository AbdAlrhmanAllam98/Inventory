var allProducts;
var updatedIndex;
var inps = document.getElementsByClassName("form-control");
//de fe 7ala en awl mara y5osh f h3mlha assignment 3shan b3d kda ast5dmha
if (localStorage.getItem("productItems") == null) {
    allProducts = [];
}
//de fe 7ala en feh gwa el localStorage products f hrw7 agbhom w a7thom gwa el array of objects(JSON)
else {
    allProducts = JSON.parse(localStorage.getItem("productItems"));
    displayProductsByGrid();
}

function getCodeDetails(productCode) {
    return productCode.split('-');
}
function addProduct() {

    var productName = document.getElementById("productNameInp").value;
    var productPrice = document.getElementById("productPriceInp").value;
    var productCategory = document.getElementById("productCategoryInp").value;
    var productCode = document.getElementById("productCodeInp").value;
    var codeDetails = getCodeDetails(productCode);
    var companyOfProduct = codeDetails[0];
    var modelOfProduct = codeDetails[1];
    var productDesc = document.getElementById("productDescInp").value;

    var product = {
        name: productName,
        price: productPrice,
        code: productCode,
        category: productCategory,
        company: companyOfProduct,
        model: modelOfProduct,
        description: productDesc
    }
    var action = document.getElementById("addBtn").innerText;
    if (action == "Update Product") {
        allProducts[updatedIndex]=product;
        document.getElementById("addBtn").innerText = "Add Product";
    }
    else {
        allProducts.push(product);
    }
    localStorage.setItem("productItems", JSON.stringify(allProducts));
    //displayProductsByTable();
    displayProductsByGrid();
    clearForm();
}

function displayProductsByTable() {
    var temp = "";
    for (var i = 0; i < allProducts.length; i++) {
        temp += "<tr><td>" + allProducts[i].name + "</td><td>" + allProducts[i].price + "</td><td>" + allProducts[i].category + "</td><td>" + allProducts[i].company + "</td><td>" + allProducts[i].model + "</td></tr>";
    }
    document.getElementById("tableBody").innerHTML = temp;
}
function displayProductsByGrid() {
    var temp = "";
    for (var i = 0; i < allProducts.length; i++) {
        temp += `
    <div class="col-md-3">
        <div class="product">
            <img src="images/2.jpg" class="img-fluid" alt="">
            <h4>`+ allProducts[i].name + `<span class="badge badge-primary ml-3">` + allProducts[i].category + `</span></h4>  
            <p>`+ allProducts[i].description + `</p>
            <div class="price">`+ allProducts[i].price + `</div>
            <button onclick="deleteProduct(`+ i + `)" class="btn btn-outline-danger btn-sm mb-5">delete</button>
            <button onclick="updateProduct(`+ i + `)" class="btn btn-outline-warning btn-sm mb-5">update</button>
        </div>
    </div>`
    }
    document.getElementById("products").innerHTML = temp;
}
function clearForm() {
    for (var i = 0; i < inps.length; i++) {
        inps[i].value = "";
    }
}
function search(term) {
    var temp = ``;
    for (var i = 0; i < allProducts.length; i++) {
        if ((allProducts[i].name.toLowerCase()).includes(term.toLowerCase())) {
            temp += `<div class="col-md-3">
            <div class="product">
                <img src="images/1.jpg" class="img-fluid">
                <h4>`+ allProducts[i].name + `<span class="badge badge-primary ml-3">` + allProducts[i].category + `</span></h4> 
                <p>`+ allProducts[i].description + `</p>
                <div class="price">`+ allProducts[i].price + `</div>
                <button onclick="deleteProduct(`+ i + `)" class="btn btn-outline-danger btn-sm">delete</button>
                <button onclick="updateProduct(`+ i + `)" class="btn btn-outline-warning btn-sm">update</button>
            </div>
        </div>`
        }
    }
    document.getElementById("products").innerHTML = temp;
}
function deleteProduct(index) {
    allProducts.splice(index);
    localStorage.setItem("productItems", JSON.stringify(allProducts));
    displayProductsByGrid();
}
function validateProductName(name) {
    var productNameRegEx = /^[A-Z][a-z]{3,8}/;
    if (productNameRegEx.test(name) == false) {
        document.getElementById("addBtn").disabled = "true";
    }
    else {
        document.getElementById("addBtn").removeAttribute("disabled");
    }
}
function validateProductPrice(price) {
    var productPriceRegEx = /\d+/;
    if (productPriceRegEx.test(price) == false) {
        document.getElementById("addBtn").disabled = "true";
    }
    else {
        document.getElementById("addBtn").removeAttribute("disabled");
    }

}
function validateProductCode(code) {
    var codeRegEx = /[A-z]{3,8}-[0-9]+/;
    if (codeRegEx.test(code) == false) {
        document.getElementById("addBtn").disabled = "true";
    }
    else {
        document.getElementById("addBtn").removeAttribute("disabled");
    }
}
function updateProduct(index) {
    updatedIndex=index;
    document.getElementById("productNameInp").value = allProducts[index].name;
    document.getElementById("productPriceInp").value = allProducts[index].price;
    document.getElementById("productCategoryInp").value = allProducts[index].category;
    document.getElementById("productCodeInp").value = allProducts[index].code;
    document.getElementById("productDescInp").value = allProducts[index].description;
    document.getElementById("addBtn").innerText = "Update Product";
    

}