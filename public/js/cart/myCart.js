
function loadMyCart() {
  $.getJSON(`/cart/getMyCartApi`, function (data) {
    console.log('data: ', data);

    if (data === null) {
      return;
    }

    //let html = `<input type="hidden" name="cart_row" value="{${data.length}}">`;
    let html = '';
    let cartTotal = 0;
    for (const cart of data) {
      cartTotal += cart.quantity * cart.mobile.price;
      html += `
                <td class="product-remove">
                      <a title="Remove this item" class="remove" onclick="removeItem(${cart.id})" ">×</a>
                      <input type="hidden" value="${cart.id}" name="cart_id">
                  </td>
                  
                  <td class="product-thumbnail">
                      <a href="/product/${cart.mobile.id}"><img width="145" height="145"
                              alt="poster_1_up" class="shop_thumbnail"
                              src="${cart.mobile.pictures[0].link}" alt="product image"></a>
                  </td>
            
                  <td class="product-name">
                      <a href="/single-product">${cart.mobile.full_name}</a>
                  </td>
            
                  <td class="product-price">
                      <span class="amount">${(parseInt(cart.mobile.price)).toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND'
      })}</span>
                  </td>
            
                  <td class="product-quantity">
                      <div class="quantity buttons_added">
                          <input type="number" size="4" class="input-text qty text" title="Qty" name="cart_quantity"
                              value="${cart.quantity}" min="1" step="1">
                      </div>
                  </td>
            
                  <td class="product-subtotal">
                      <span class="amount">${(cart.quantity * cart.mobile.price).toLocaleString('it-IT', {
        style: 'currency', currency: 'VND'
      })}</span>
                  </td>
                </tr>
                 `
    }


    html += `
            <tr>
              <td class="actions" colspan="6">
                  
                  <button type="button" class="checkout-button button alt wc-forward" 
                  onclick="updateCart()">
                  Update Cart
                  </button>
                  <button onclick="location.href='/checkout'" type="button">
                  checkout</button>
              </td>
            </tr>`

    const table = document.getElementById("cart-items");
    table.innerHTML = html;


    let html_cartTotal = `<table cellspacing="0">
                <tbody>
                <tr class="cart-subtotal">
                    <th>Cart Subtotal</th>
                    <td><span class="amount">${(cartTotal).toLocaleString('it-IT', {
      style: 'currency', currency: 'VND'
    })}</span></td>
                </tr>
        
                <tr class="shipping">
                    <th>Shipping and Handling</th>
                    <td>Free Shipping</td>
                </tr>
        
                <tr class="order-total">
                    <th>Order Total</th>
                    <td><strong><span class="amount">${(cartTotal).toLocaleString('it-IT', {
      style: 'currency', currency: 'VND'
    })}</span></strong></td>
                </tr>
                </tbody>
                </table>
                `

    const table_cartTotal = document.getElementById("cart-totals");
    table_cartTotal.innerHTML = html_cartTotal;
  })
}

loadMyCart();


function tempAlertDel(msg, duration) {
  let el = document.createElement("div");
  el.setAttribute("class", "alert alert-danger popup");
  el.setAttribute("role", "alert");
  el.innerHTML = msg;
  setTimeout(function () {
    el.parentNode.removeChild(el);
  }, duration);
  document.body.appendChild(el);
}

function tempAlertAdd(msg, duration) {
  let el = document.createElement("div");
  el.setAttribute("class", "alert alert-success popup");
  el.setAttribute("role", "alert");
  el.innerHTML = msg;
  setTimeout(function () {
    el.parentNode.removeChild(el);
  }, duration);
  document.body.appendChild(el);
}

function removeItem(id) {
  $.ajax({
    url: '/cart/removeItem',
    method: 'POST',
    data: {
      id: id
    }
  })
  tempAlertDel("Deleted product", 3000);
  loadMyCart();
}

function addToCartUser(id) {
  console.log('addToCartUser', id);
  $.ajax({
    url: '/cart/addItem',
    method: 'POST',
    data: {
      mobile_id: id
    }
  })

  tempAlertAdd("Add to cart successfully", 5000);
  //loadMyCart();
}

function updateCart() {
  console.log('updateCart');

  //const car_quan = $('input[name=cart_quantity[]]').val();
  const cart_quantity = $("input[name='cart_quantity']").map(function () { return $(this).val(); }).get();
  const cart_id = $("input[name='cart_id']").map(function () { return $(this).val(); }).get();
  console.log('car_quan', cart_quantity);
  console.log('cart_id', cart_id);

  $.ajax({
    url: '/cart/updateCart',
    method: 'GET',
    data: {
      cart_id: cart_id,
      cart_quantity: cart_quantity
    }
  })

  loadMyCart();
  tempAlertAdd("Update cart successfully", 5000);
}
function addLocalStorageCart() {
  const cart = JSON.parse(localStorage.getItem('cart') || '{}');
  $.ajax({
    url: '/cart/updateCartLogin',
    method: 'POST',
    data: {
      list: JSON.stringify(cart),
    }
  })
  localStorage.setItem('cart', JSON.stringify({}));
  loadMyCart();
}
addLocalStorageCart()
