
document.addEventListener("DOMContentLoaded", function () {
    // VIDEO CALL LOGIC
    const videoElement = document.getElementById("doctorVideo");
    const modal = document.getElementById("doctorModal");

    if (modal && videoElement) {
        modal.addEventListener("show.bs.modal", function () {
            videoElement.src = "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4";
            videoElement.play();
        });
    }

    // SEARCH BAR LOGIC
    
    const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

searchInput.addEventListener("input", async () => {
  const query = searchInput.value.trim();
  if (!query) {
    searchResults.innerHTML = "";
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/medicines/search?query=${encodeURIComponent(query)}`);
    const data = await res.json();

    searchResults.innerHTML = "";
    if (data.length === 0) {
      searchResults.innerHTML = "<div>No results found</div>";
      return;
    }

    data.forEach((med) => {
      const div = document.createElement("div");
      div.className = "search-suggestion";
      div.textContent = `${med.name} (${med.brand})`;
      div.style.padding = "5px";
      div.style.cursor = "pointer";
      div.addEventListener("click", () => {
        searchInput.value = med.name;
        searchResults.innerHTML = "";
      });
      searchResults.appendChild(div);
    });
  } catch (err) {
    console.error("Fetch error:", err);
    searchResults.innerHTML = "<div style='color:red;'>Error fetching data</div>";
  }

    });


    // CART LOGIC
    let cartItems = [];
    const cartCountElement = document.getElementById("cart-count");
    const cartItemsList = document.getElementById("cart-items-list");
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const productName = button.getAttribute("data-name");
            if (productName) {
                cartItems.push(productName);
                updateCart();
                console.log("Added to cart: " + productName);
            }
        });
    });
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");
  const price = params.get("price");

  const detailsDiv = document.getElementById("payment-details");
  if (name && price) {
    detailsDiv.innerHTML = `
      <h4>Medicine: ${decodeURIComponent(name)}</h4>
      <p>Price: ₹${price}</p>
      <button class="btn btn-success">Proceed to Pay</button>
    `;
  } else {
    detailsDiv.innerHTML = "<p>Invalid request.</p>";
  }


function updateCart() {
    const cartItemsList = document.getElementById("cart-items");
    const cartCountElement = document.getElementById("cart-count");
    cartCountElement.textContent = cartItems.length;
    cartItemsList.innerHTML = "";

    if (cartItems.length === 0) {
        const emptyItem = document.createElement("li");
        emptyItem.className = "dropdown-item text-muted";
        emptyItem.textContent = "Cart is empty";
        cartItemsList.appendChild(emptyItem);
    } else {
        cartItems.forEach((item, index) => {
            const cartItem = document.createElement("li");
            cartItem.className = "dropdown-item d-flex justify-content-between align-items-center";
            cartItem.innerHTML = `
                ${item}
                <button class="btn btn-sm btn-danger ms-2" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            `;
             const itemLink = document.createElement("span");
      itemLink.style.cursor = "pointer";
      itemLink.textContent = `${item.name} - ₹${item.price}`;
      itemLink.addEventListener("click", () => goToPayment(item.name, item.price));
            cartItemsList.appendChild(cartItem);
        });
    }
}
function goToPayment(name, price) {
  const encodedName = encodeURIComponent(name);
  window.location.href = `payment.html?name=${encodedName}&price=${price}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-product-name");
      const price = parseFloat(button.getAttribute("data-product-price"));
      addToCart(name, price);
    });
  });
});


function addToCart(productName) {
    cartItems.push(productName);
    updateCart();
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCart();
}

// Attach event listeners to buttons after the page loads
document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const productName = button.getAttribute("data-product-name");
            addToCart(productName);
        });
    });
});

});

  
    