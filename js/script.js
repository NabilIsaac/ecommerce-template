async function fetchCategories() {
  const res = await fetch("js/categories.json");
  return await res.json();
}

async function fetchProducts() {
  const res = await fetch("js/products.json");
  return await res.json();
}

async function loadCategories() {
  const categories = await fetchCategories();
  const container = document.getElementById("categories");
  categories.forEach((item) => {
    container.innerHTML += `
        <li class="nav-item">
            <a class="nav-link" href="category.html?id=${item.id}">${item.name}</a>
        </li>
    `;
  });
}
loadCategories();

async function loadProducts() {
  const products = await fetchProducts();
  const container = document.getElementById("products");
  products.forEach((item) => {
    container.innerHTML += `
        <div class="col-md-3 col-sm-12 text-center">
            <a href="single-product.html?id=${item.id}">
                <div class="card">
                    <img src="${item.photo}" class="inner-img">
                </div>
                <h6>${item.name}</h6>
                <p>$ ${item.price}</p>

            </a>
            <a href="#" onclick="buybtn()" class="btn add-to-cart mr-1 mb-3">
                <i class="fas fa-shopping-cart pr-1"></i>
                Add to cart
            </a>
            <button class="btn btn-sm like-btn mb-3 shadow-none"></button>
        </div>
    `;
  });
}
loadProducts();

async function loadHomeProducts() {
  const products = await fetchProducts();
  const featuredProducts = products.filter((product) => product.isFeatured);
  const container = document.getElementById("featured");
  featuredProducts.forEach((item) => {
    container.innerHTML += `
        <div class="row margin-bottom">
                <div class="col-md-8 col-sm-12">
                    <img src="${item.photo}" class="img-fluid" alt="${item.name}">
                </div>
                <div class="col-md-4 col-sm-12">
                     <h6>Featured</h6>
                     <h3>Grey Toiletries Bag</h3>
                     <div class="row">
                         <div class="col-6">
                             <div class="sunshine-icon"><i class="fas fa-sun"></i></div>
                             <h5>WEATHER<br>RESISTANT</h5>
                         </div>
                         <div class="col-6">
                            <div class="sunshine-icon"><i class="fas fa-adjust"></i></div>
                            <h5>SCRATCH<br>RESISTANT</h5>
                         </div>
                     </div>
                     <p> 
                         ${item.description}
                     </p>
                     <h2>$ ${item.price}</h2>
                     <a href="single-product.html?id=${item.id}">add to cart</a>
                </div>
            </div>
    `;
  });
}
loadHomeProducts();

async function loadBottomProducts() {
  const products = await fetchProducts();
  const container = document.getElementById("bottom-products");
  products.forEach((item) => {
    container.innerHTML += `
              <div class="col-md-4 col-sm-12">
                    <a href="single-product.html?id=${item.id}">
                        <div class="card">
                            <img src="${item.photo}" class="inner-img" height="250px">
                        </div>
                        <h6>${item.name}</h6>
                        <p>$ ${item.price}</p>
                    </a>
               </div>
    `;
  });
}
loadBottomProducts();

async function loadCategoryProducts() {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryId = urlParams.get("id");

  const products = await fetchProducts();
  const container = document.getElementById("category-products");

  const filteredProducts = categoryId
    ? products.filter((product) => product.categoryId == categoryId)
    : products; // if no category id, show all

  if (filteredProducts.length === 0) {
    container.innerHTML =
      "<p class='col-12 text-center'>No products found for this category.</p>";
    return;
  }

  filteredProducts.forEach((item) => {
    container.innerHTML += `
        <div class="col-md-3 col-sm-12 text-center">
          <a href="single-product.html?id=${item.id}">
            <div class="card">
              <img src="${item.photo}" class="inner-img" />
            </div>
            <h6>${item.name}</h6>
            <p>$ ${item.price}</p>
          </a>
          <a href="#" onclick="buybtn()" class="btn add-to-cart mr-1 mb-3">
            <i class="fas fa-shopping-cart pr-1"></i> Add to cart
          </a>
          <button class="btn btn-sm like-btn mb-3 shadow-none"></button>
        </div>
      `;
  });
}

loadCategoryProducts();

async function loadProduct() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));
  const container = document.getElementById("product-details");

  try {
    const products = await fetchProducts();
    const product = products.find((p) => p.id === productId);

    if (!product) {
      container.innerHTML = "<p>Product not found.</p>";
      return;
    }

    container.innerHTML = `
       <div class="row">
                     <div class="col-md-8 col-sm-12 left-column">
                         <img data-image="black" src="${product.photo}" height="430px">
                         <img data-image="blue" src="assets/images/duffle 2.jpg" height="430px">
                         <img data-image="red" class="active" src="${product.photo}" height="430px">
                     </div>
                     <div class="col-md-4 col-sm-12">
                        <div class="product-description">
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                          </div>
                  
                          <!-- Product Configuration -->
                          <div class="product-configuration">
                  
                            <!-- Product Color -->
                            <div class="product-color">
                              <span>Color</span>
                  
                              <div class="color-choose">
                                <div>
                                  <input data-image="red" type="radio" id="red" name="color" value="red" checked>
                                  <label for="red"><span></span></label>
                                </div>
                                <div>
                                  <input data-image="blue" type="radio" id="blue" name="color" value="blue">
                                  <label for="blue"><span></span></label>
                                </div>
                                <div>
                                  <input data-image="black" type="radio" id="black" name="color" value="black">
                                  <label for="black"><span></span></label>
                                </div>
                              </div>
                  
                            </div>
                  
                            <!-- Product Configuration -->
                            <div class="product-config">
                              <span>Size</span>
                  
                              <div class="cable-choose">
                                <button>Large</button>
                                <button>Medium</button>
                                <button>Small</button>
                              </div>
                            </div>
                          </div>
                  
                          <!-- Product Pricing -->
                          <div class="product-price">
                            <span>$ ${product.price}</span>
                            <button class="btn btn-primary btn-lg shadow-none" onclick="addToCart(${product.id})">Add to cart</button>
                          </div>
                     </div>
                 </div>
    `;
  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Error loading product details.</p>";
  }
}
loadProduct();

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById("cart-count");
  if (badge) {
    badge.textContent = totalQty;
  }
}

function addToCart(id) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const item = cart.find((p) => p.id === id);
  if (item) {
    item.qty += 1;
  } else {
    cart.push({ id, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
  updateCartCount();
}

async function renderCart() {
  const products = await fetchProducts();
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const container = document.getElementById("cart-items");
  const summaryContainer = document.getElementById("order-summary");

  if (!cart.length) {
    container.innerHTML = "<p>Cart is empty.</p>";
    summaryContainer.innerHTML = `<div class="card text-center">
      <h4>Order Summary</h4>
      <div class="col-md-12 col-sm-12">
        <div class="row">
          <div class="col-6">
            <h5>Subtotal</h5>
            <h5>Shipping</h5>
          </div>
          <div class="col-6">
            <h5>$ 0.00</h5>
            <h5>$ 0.00</h5>
          </div>
        </div>
        <hr>
        <div class="row mb-5">
          <div class="col-6">
            <h4>Total</h4>    
          </div>
          <div class="col-6">
            <h4>$ 0.00</h4>
          </div>
        </div>
      </div>
    </div>`;
    return;
  }

  let html = "";
  let subtotal = 0;

  cart.forEach((item) => {
    const product = products.find((p) => p.id === item.id);
    const itemTotal = product.price * item.qty;
    subtotal += itemTotal;

    html += `
      <div class="card item">
        <div class="row">
          <div class="col-md-2 col-sm-12">
              <div class="description">
                  <span>${product.name}</span>
              </div>
          </div>
          <div class="col-md-2 col-sm-12">
              <img src="${product.photo}" alt="" class="image center">
          </div>
          <div class="col-md-4 col-sm-12">
            <div class="quantity">
              <button class="plus-btn" type="button" name="button">
                <img src="assets/images/plus.svg" alt="" />
              </button>
              <input type="text" name="name" value="${item.qty}" readonly />
              <button class="minus-btn" type="button" name="button">
                <img src="assets/images/minus.svg" alt="" />
              </button>
            </div>
          </div>
          <div class="col-md-2 col-sm-12">
            <p class="total-price">$ ${itemTotal.toFixed(2)}</p>
          </div>
          <div class="col-md-2 col-sm-12 text-center remove-btn">
            <button class="btn btn-danger btn-sm shadow-none"><i class="fas fa-trash-alt"></i></button>
          </div>
        </div>
      </div>`;
  });

  container.innerHTML = html;

  // Calculate order summary
  const shipping = 10.0;
  const total = subtotal + shipping;

  summaryContainer.innerHTML = `
    <div class="card text-center">
      <h4>Order Summary</h4>
      <div class="col-md-12 col-sm-12">
        <div class="row">
          <div class="col-6">
            <h5>Subtotal</h5>
            <h5>Shipping</h5>
          </div>
          <div class="col-6">
            <h5>$${subtotal.toFixed(2)}</h5>
            <h5>$${shipping.toFixed(2)}</h5>
          </div>
        </div>
        <hr>
        <div class="row mb-5">
          <div class="col-6">
            <h4>Total</h4>    
          </div>
          <div class="col-6">
            <h4>$${total.toFixed(2)}</h4>
          </div>
        </div>
        <a href="checkout.html">Order Now</a>
      </div>
    </div>
  `;
}
