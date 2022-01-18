function loadCart() {
  const menuBottom = `
    <tr>
      <td class="actions" colspan="6">

          <button type="button" class="checkout-button button alt wc-forward">
                  Update Cart
                  </button>
          <button onclick="location.href='/checkout'" type="button">
                  checkout</button>
          
      </td>
    </tr>
`
  const cart = JSON.parse(localStorage.getItem('cart') || '{}');
  function displayARow(mobile, quantity) {
    const data = ` <td class="product-remove">
          <a title="Remove this item" class="remove" onclick="removeItem(${mobile.id})" >×</a>
      </td>

      <td class="product-thumbnail">
          <a href="/product/${mobile.id}"><img width="145" height="145"
                  alt="poster_1_up" class="shop_thumbnail"
                  src="${mobile.pictures[0].link}" alt="product image"></a>
      </td>

      <td class="product-name">
          <a href="/single-product">${mobile.full_name}</a>
      </td>

      <td class="product-price">
          <span class="amount">${(parseInt(mobile.price)).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
      </td>

      <td class="product-quantity">
          <div class="quantity buttons_added">
              <input type="number" size="4" class="input-text qty text" title="Qty"
                  value="${quantity}" min="0" step="1">
          </div>
      </td>

      <td class="product-subtotal">
          <span class="amount">${(quantity * mobile.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
      </td>
  </tr>
      `
    return (data)
  }

  let getDataItem = function (data) {
    var request = new XMLHttpRequest();
    request.open("POST", "/api/product");
    request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const mobiles = JSON.parse(this.responseText);
        let displayMobile = '';
        mobiles.forEach(mobile => {
          if (cart[mobile.id] > 0)
            displayMobile += displayARow(mobile, cart[mobile.id])
        });
        const table = document.getElementById("cart-items");
        table.innerHTML = displayMobile + menuBottom;
      }
    }
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(`list=${JSON.stringify(data)}`);
  }

  if (!cart || cart === {}) {
    return;
  }
  else {
    let newCart = [];
    for (let key of Object.keys(cart)) {
      newCart.push(parseInt(key));
    }
    getDataItem(newCart)
  }
}
function tempAlert(msg, duration) {
  var el = document.createElement("div");
  el.setAttribute("class", "alert alert-danger popup");
  el.setAttribute("role", "alert");
  el.innerHTML = msg;
  setTimeout(function () {
    el.parentNode.removeChild(el);
  }, duration);
  document.body.appendChild(el);
}
function removeItem(id) {
  const cart = JSON.parse(localStorage.getItem('cart') || '{}');
  if (!cart || cart === {}) {
    return;
  }
  else {
    if (cart[`${id}`] > 0) {
      cart[`${id}`] -= 1;
      localStorage.setItem('cart', JSON.stringify(cart));
      tempAlert("Deleted product", 3000);
    }
  }
  loadCart();
}
loadCart();
