const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");
const buttons = document.querySelectorAll('.button-section-container button');
const hamburger = document.querySelector(".hamburger");
const addToCartButtons = document.querySelectorAll(".add-to-cart"); 
const confirmBtn = document.getElementById("confirm");
const cartTableBody = document.querySelector(".cart-table tbody");
const saveFavBtn = document.getElementById("save");

hamburger.addEventListener('click', () => {
    // Animate Links
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");
    });

    // Hamburger Animation
    hamburger.classList.toggle("toggle");
});

// Adding Functionality to Add to Cart Buttons
addToCartButtons.forEach(cart => {
    cart.addEventListener('click', function (event) {
        const medcard = event.target.closest('.card'); 
        const medName = medcard.querySelector('.med-name').textContent;
        const medImg = medcard.querySelector('.med-image').src;
        const medPrice = parseFloat(medcard.querySelector('.price').textContent.trim());
        const medQuantity = parseInt(medcard.querySelector(".quantity").value);

        if (medQuantity > 0) {
            const existingRow = Array.from(cartTableBody.querySelectorAll("tr")).find(row =>
                row.querySelector("td:nth-child(2)").textContent === medName
            );

            if (existingRow) {
                const quantityCell = existingRow.querySelector("td:nth-child(3)");
                const priceCell = existingRow.querySelector("td:nth-child(4)"); 

                const existingQuantity = parseInt(quantityCell.textContent);
                const newQuantity = existingQuantity + medQuantity;
                const newTotalPrice = medPrice * newQuantity;

                quantityCell.textContent = newQuantity;
                priceCell.textContent = `${newTotalPrice.toFixed(2)} LKR`;
            } else {
                const cartRow = document.createElement('tr');

                const imageCell = document.createElement("td");
                const img = document.createElement("img");
                img.src = medImg;
                img.alt = medName;
                img.style.width = "60px";
                imageCell.appendChild(img);
                cartRow.appendChild(imageCell);

                const nameCell = document.createElement("td");
                nameCell.textContent = medName;
                cartRow.appendChild(nameCell);

                const quantityCell = document.createElement("td");
                quantityCell.textContent = medQuantity;
                cartRow.appendChild(quantityCell);

                const priceCell = document.createElement("td");
                priceCell.textContent = `${(medPrice * medQuantity).toFixed(2)} LKR`;
                cartRow.appendChild(priceCell);

                const removeCell = document.createElement("td");
                const removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.className = "remove-button";
                removeButton.addEventListener("click", function () {
                    cartRow.remove();
                });
                removeCell.appendChild(removeButton);
                cartRow.appendChild(removeCell);

                cartTableBody.appendChild(cartRow);
            }

            medcard.querySelector(".quantity").value = 0;

        } else {
            alert("Please enter a valid quantity");
        }
    })
})


// Adding Functionality to Confirm Button
confirmBtn.addEventListener('click', function(){
    const cartItems = [];
    cartTableBody.querySelectorAll("tr").forEach(row =>{
        const item = {
            image: row.querySelector("td:nth-child(1) img").src,
            name: row.querySelector("td:nth-child(2)").textContent,
            quantity: row.querySelector("td:nth-child(3)").textContent,
            price: row.querySelector("td:nth-child(4)").textContent
        };
        cartItems.push(item)
    });

    // Saving the cart to Local Storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // redirecting Order Page
    window.location.href = "order.html";
    
})

saveFavBtn.addEventListener('click', function(){
    const favItems = [];
    cartTableBody.querySelectorAll("tr").forEach(row => {
        const item = {
            image: row.querySelector("td:nth-child(1) img").src,
            name: row.querySelector("td:nth-child(2)").textContent,
            quantity: row.querySelector("td:nth-child(3)").textContent,
            price: row.querySelector("td:nth-child(4)").textContent
        };
        favItems.push(item);
    });

    // Saving the favourite items to Local Storage
    localStorage.setItem("FavOrder", JSON.stringify(favItems));

    alert("Cart items saved to Favourites!");
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const targetID = button.getAttribute('data-target');
        const targetElement = document.getElementById(targetID);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    })
});
