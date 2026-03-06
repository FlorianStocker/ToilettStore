// Warenkorb aus localStorage laden
let cart = JSON.parse(localStorage.getItem("cart"));

if (cart == null) {
    cart = [];
}

// Warenkorb speichern
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Produkt hinzufügen
function addToCart(name, price) {
    let gefunden = false;

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name == name) {
            cart[i].quantity = cart[i].quantity + 1;
            gefunden = true;
        }
    }

    if (gefunden == false) {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    saveCart();
    renderCart();
}

// 1 Stück entfernen
function removeOne(name) {

    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name == name) {

            cart[i].quantity = cart[i].quantity - 1;

            // Wenn Menge 0 → ganz löschen
            if (cart[i].quantity <= 0) {
                cart.splice(i, 1);
            }

            break;
        }
    }

    saveCart();
    renderCart();
}

// gesamten Warenkorb leeren
function clearCart() {
    cart = [];
    saveCart();
    renderCart();
}

// Warenkorb anzeigen
function renderCart() {

    let liste = document.getElementById("cart");
    let total = document.getElementById("total");

    liste.innerHTML = "";
    let gesamt = 0;

    for (let i = 0; i < cart.length; i++) {

        let div = document.createElement("div");

        div.style.display = "flex";
        div.style.justifyContent = "space-between";
        div.style.marginBottom = "8px";

        div.innerHTML =
            cart[i].name + " x" + cart[i].quantity +
            " - " + (cart[i].price * cart[i].quantity) + " €" +
            " <button onclick='removeOne(\"" + cart[i].name + "\")'>Entfernen</button>";

        liste.appendChild(div);

        gesamt = gesamt + (cart[i].price * cart[i].quantity);
    }

    total.innerHTML = gesamt;
}

// Beim Laden anzeigen
renderCart();


// super Erkärvideo: https://www.youtube.com/watch?v=QLE6c4YPZRw&time_continue=39&source_ve_path=NzY3NTg&embeds_referring_euri=https%3A%2F%2Fwww.bing.com%2F&embeds_referring_origin=https%3A%2F%2Fwww.bing.com