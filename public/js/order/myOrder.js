console.log('orderrrrrrrrrrrrrrr');

function loadCartToOrder(){
    $.getJSON(`/cart/getMyCartApi`, function (data) {
        console.log('cartData: ', data);

        let html = '';
        let cartTotal = 0;
        for (const cart of data) {
            cartTotal += cart.quantity * cart.mobile.price;
            html += `
            <tr class="cart_item">
            <td class="product-name">
                ${cart.mobile.full_name} <strong class="product-quantity">× ${cart.quantity}</strong></td>
            <td class="product-total">
                <span class="amount">${(cart.quantity * cart.mobile.price).toLocaleString('it-IT', {
                style: 'currency', currency: 'VND' })}
                </span>
            </td>
        </tr>
            `
        }


        html += `
        <tfoot>

        <tr class="cart-subtotal">
            <th>Cart Subtotal</th>
            <td><span class="amount">${(cartTotal).toLocaleString('it-IT', {
                style: 'currency', currency: 'VND' })}</span>
            </td>
        </tr>

        <tr class="shipping">
            <th>Shipping and Handling</th>
            <td>

                Free Shipping
                <input type="hidden" class="shipping_method" value="free_shipping"
                       id="shipping_method_0" data-index="0" name="shipping_method[0]">
            </td>
        </tr>


        <tr class="order-total">
            <th>Order Total</th>
            <td><strong><span class="amount">${(cartTotal).toLocaleString('it-IT', {
            style: 'currency', currency: 'VND' })}</span></strong></td>
        </tr>

        </tfoot>
        `

        const table = document.getElementById("order-items");
        table.innerHTML = html;
    })
}

loadCartToOrder();
$('#placeOrder').on('click', e => {
    e.preventDefault();
    const password = $('input[id=account_password]').val();

    $.ajax({
        url: 'checkout/addOrder',
        method: 'POST',
        data: {
            password: password
        },
        success: function (data) {
            console.log('Order successfully', data);
            if (data === 'success')
            {
                tempAlertAdd("Order successfully", 5000);
            }
            else {
                tempAlertDel("Incorrect password", 5000);
            }

        }
    })
});


