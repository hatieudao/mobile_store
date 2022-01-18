console.log('orderrrrrrrrrrrrrrr');

function loadCartToOrder() {
    $.getJSON(`/checkout/getOrdertApi`, function (data) {
        console.log('orderData: ', data);

        let html = '';
        let orderTotal = 0;
        for (const order of data) {
            orderTotal += order.quantity * order.mobile.price;
            html += `
                <tr>
                     <td>
                         <div class="img">
                             <img src="${order.mobile.pictures[0].link}" alt="Image">
                             <p>${order.mobile.full_name}</p>
                         </div>
                     </td>
                     <td>${order.quantity}</td>
                     <td>${(order.quantity * order.mobile.price).toLocaleString('it-IT', {
                        style: 'currency', currency: 'VND'
                        })}</td>
                     <td>${order.state}</td>
                 </tr>
            `
        }


        const table = document.getElementById("myListOrder");
        table.innerHTML = html;
    })
}

loadCartToOrder();

