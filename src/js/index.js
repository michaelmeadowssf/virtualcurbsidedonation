let donationTotal = 0;
const cart = [];

function updateCartList(){
    let cartList = document.getElementById('cartItems');
    let cartItems = "";
    let id = 0;
    for(let item of itemList){
        if(item.quantity > 0) {
            // ideally the item quantity can be clicked to show a textbox to modify it with updateQuantity()
            cartItems += `<li> <a id="modify-${id}">${item.quantity}</a> ${item.itemsNeeded}`;
            cartItems += `<a onclick="removeFromCart(${id})" href="#" class="removebutton">Remove</a>`;
            cartItems += `<br> ${item.servingUnits} </li>`;

        }
        id++;
    }
    cartList.innerHTML = `<ul> ${cartItems} </ul>`;
    cartList.innerHTML += `<br> Total: $${donationTotal}`;

}

function removeFromCart(id){
    donationTotal -= itemList[id].ourPrice * itemList[id].quantity;
    itemList[id].quantity = 0;
    updateCartList();
}

function updateQuantity(item, newQuantity){
    itemList[item].quantity = newQuantity;
}
function addToCart(id){
    cart.push(id);
    itemList[id].quantity += 1;
    let itemPrice = Number(itemList[id].ourPrice);
    donationTotal += itemPrice;
    updateCartList();
    updateDonateButton();
}



function updateDonateButton(){
    // Uses the DOM to modify the PayPal donate button with the cart contents

    // Variable for collecting the whole cart details in one string (unused)
    let paypalDescription = ``;

    let donateForm = document.getElementById('donateForm');
    let id = 1;
    itemList.forEach(item => {
        if(item.quantity > 0){
            // Setting up paypal form input elements
            let item_name = document.createElement('input'),
              item_number = document.createElement('input'),
              quantity = document.createElement('input'),
              amount = document.createElement('input');
            item_name.type = "hidden";
            item_name.name = "item_name_" + id;
            item_number.type = "hidden";
            item_number.name = "item_number_" + id;
            quantity.type = "hidden";
            quantity.name = "quantity_" + id;
            amount.type = "hidden";
            amount.name = "amount_" + id;
            // Adding cart info
            item_name.value = item.itemsNeeded + `(${item.servingUnits})`;
            quantity.value = item.quantity;
            amount.value = item.ourPrice;
            // Add input elements into the donate button form
            donateForm.innerHTML += item_name.outerHTML + item_number.outerHTML + quantity.outerHTML + amount.outerHTML;

            //paypalDescription += `${item.quantity}x ${item.itemsNeeded} (${item.servingUnits}) - $${item.quantity * item.ourPrice} \n`;

            id++;
        }
    });

}