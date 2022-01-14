let products = JSON.parse(localStorage.getItem("products"))
  ? JSON.parse(localStorage.getItem("products"))
  : [
      {
        title: "A21s",
        category: "Samsung",
        price: 1299.99,
        img: "https://www.technomobi.co.za/media/catalog/product/cache/845626c1ecbfc750b829515c9d80e649/a/1/a12_blue_1.jpg",
      },
      {
        title: "12 pro",
        category: "Iphone",
        price: 2599.99,
        img: "https://snapcraze.co.za/wp-content/uploads/2020/11/iphone-12-pro-graphite-510x439.png",
      },
      {
        title: "Galaxy S7 edge",
        category: "Samsung",
        price: 1999.99,
        img: "https://img.fruugo.com/product/1/49/143662491_max.jpg",
      },
      {
        title: "R7",
        category: "Moibcel",
        price: 699.99,
        img: "https://www.hificorp.co.za/media/catalog/product/cache/7ce9addd40d23ee411c2cc726ad5e7ed/L/E/LEGEND_ALL__2__e3b7.jpg",
      },
      {
        title: "A2 core",
        category: "Samsung",
        price: 1099.99,
        img: "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-a2-core-sm-a260f-red.jpg",
      },
      {
        title: "13 Pro Max",
        category: "Iphone",
        price: 9999.99,
        img: "https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F6091d75d0953526b3d9d4448%2FApple--iPhone--iPhone-13--iPhone-13-Pro-Max--iPhone-13-release-date--iPhone-13-price-%2F960x0.jpg%3Ffit%3Dscale",
      },
    ];

    let cart = JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart"))
    :[00];


// READ
function readProducts(products) {
  document.querySelector("#products").innerHTML = "";
  products.forEach((product, position) => {
    document.querySelector("#products").innerHTML += `
      <div class="card">
        <img src="${product.img}" class="card-img-top" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">R${product.price}</p>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editProduct${position}" >
            Edit
          </button>
          <button type="button" class="btn btn-danger" onclick="deleteProduct(${position})" >
            Delete
          </button>
          <button type="button" class="btn btn-primary" onclick="addtocart(${position})" >
        Add to cart
        </button>

           
              <div
                class="modal fade"
                id="editProduct${position}"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Edit ${product.title}
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3">
                        <label for="editTitle${position}" class="form-label">Title</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editTitle${position}"
                          id="editTitle${position}"
                          value="${product.title}"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="editCategory${position}" class="form-label">Category</label>
                        <select
                          class="form-select"
                          name="editCategory${position}"
                          id="editCategory${position}"
                        >
                          <option value="samsung">Samsung</option>
                          <option value="mobicel">Mobicel</option>
                          <option value="iphone">Iphone</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label for="editPrice${position}" class="form-label">Price</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editPrice${position}"
                          id="editPrice${position}"
                          value="${product.price}"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="editImg${position}" class="form-label">Image URL</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editImg${position}"
                          id="editImg${position}"
                          value="${product.img}"
                        />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                        onclick="updateProduct(${position})"
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </div>
    `;
  });
}
readProducts(products);



// CREATE
function createProduct() {
  let title = document.querySelector("#addTitle").value;
  let category = document.querySelector("#addCategory").value;
  let price = document.querySelector("#addPrice").value;
  let img = document.querySelector("#addImg").value;

  try {
    if (!title || !price || !img) throw new Error("Please fill in all fields");
    products.push({
      title,
      category,
      price,
      img,
    });
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  } catch (err) {
    alert(err);
  }
}



// UPDATE
function updateProduct(position) {
  let title = document.querySelector(`#editTitle${position}`).value;
  let category = document.querySelector(`#editCategory${position}`).value;
  let price = document.querySelector(`#editPrice${position}`).value;
  let img = document.querySelector(`#editImg${position}`).value;

  try {
    if (!title || !price || !img) throw new Error("Please fill in all fields");
    products[position] = {
      title,
      category,
      price,
      img,
    };
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  } catch (err) {
    alert(err);
  }
}



// DELETE
function deleteProduct(position) {
  let confirmation = confirm(
    "Are you sure you want to delete the selected product?"
  );

  if (confirmation) {
    products.splice(position, 1);
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  }
}



// ADD TO CART
function addtocart(position){
  cart.push({...products[position]})
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log(cart)
}
