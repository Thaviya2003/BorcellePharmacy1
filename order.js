document.addEventListener('DOMContentLoaded', function () {
    const cartTableBody = document.querySelector("#cart-table tbody");
    const totalPriceElement = document.querySelector('.total-price');
    const favBtn = document.getElementById('save');
    const loadBtn = document.getElementById('load');
    const customerNameInput = document.querySelector('#customerName');
    const addressInput = document.querySelector('#address');
    const contactInput = document.querySelector('#contact');
    const cardTypeSelect = document.querySelector('#cardType');
    const cardNumberInput = document.querySelector('#cardNumber');
    const cvvInput = document.querySelector('#cvv');
    const cancelBtn = document.getElementById('cancel');
    const payBtn = document.getElementById('pay');

    function populateCartTable() {
        const cartItems = JSON.parse(localStorage.getItem("cartItems"));
        if (cartItems && cartItems.length > 0) {
            cartItems.forEach(item => {
                const cartRow = document.createElement("tr");

                const imageCell = document.createElement("td");
                const img = document.createElement("img");
                img.src = item.image;
                img.alt = item.name;
                img.style.width = "30px";
                imageCell.appendChild(img);
                cartRow.appendChild(imageCell);

                const nameCell = document.createElement("td");
                nameCell.textContent = item.name;
                cartRow.appendChild(nameCell);

                const quantityCell = document.createElement("td");
                quantityCell.textContent = item.quantity;
                cartRow.appendChild(quantityCell);

                const priceCell = document.createElement("td");
                priceCell.textContent = item.price;
                cartRow.appendChild(priceCell);

                const removeCell = document.createElement("td");
                const removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.className = "remove-button";
                removeButton.addEventListener("click", function () {
                    cartRow.remove();
                    updateTotalPrice();
                });
                removeCell.appendChild(removeButton);
                cartRow.appendChild(removeCell);

                cartTableBody.appendChild(cartRow);
            });
        } else {
            showEmptyCartMessage();
        }
    }

    function updateTotalPrice() {
        const cartRows = cartTableBody.querySelectorAll('tr');
        let total = 0;
        cartRows.forEach(row => {
            const priceCell = row.querySelector('td:nth-child(4)');
            const price = parseFloat(priceCell.textContent);
            total += price;
        });
        totalPriceElement.textContent = `Total Price: ${total.toFixed(2)} LKR`;
    }

    function showEmptyCartMessage() {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "Your cart is empty.";
        cartTableBody.appendChild(emptyMessage);
    }

    populateCartTable();
    updateTotalPrice();

   


    function loadFavouriteCart() {
        // Retrieve favourites from localStorage
        const favOrder = JSON.parse(localStorage.getItem("FavOrder"));
    
        // Check if favOrder exists and is an array with items
        if (favOrder && favOrder.length > 0) {
            // Clear any existing cart items in the table
            cartTableBody.innerHTML = "";
    
            // Populate the cart table with favourite items
            favOrder.forEach(item => {
                const cartRow = document.createElement('tr');
    
                const imageCell = document.createElement("td");
                const img = document.createElement("img");
                img.src = item.image;
                img.alt = item.name;
                img.style.width = "60px";
                imageCell.appendChild(img);
                cartRow.appendChild(imageCell);
    
                const nameCell = document.createElement("td");
                nameCell.textContent = item.name;
                cartRow.appendChild(nameCell);
    
                const quantityCell = document.createElement("td");
                quantityCell.textContent = item.quantity;
                cartRow.appendChild(quantityCell);
    
                const priceCell = document.createElement("td");
                priceCell.textContent = item.price;
                cartRow.appendChild(priceCell);
    
                const removeCell = document.createElement("td");
                const removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.className = "remove-button";
                removeButton.addEventListener("click", function () {
                    cartRow.remove();
                    updateTotalPrice();
                });
                removeCell.appendChild(removeButton);
                cartRow.appendChild(removeCell);
    
                cartTableBody.appendChild(cartRow);
            });
    
            updateTotalPrice();
        } else {
            alert("No favourite orders found!");
        }
    }

    

    // function to validate user inputs
    function validateForm() {
        if (customerNameInput.value === '' || addressInput.value === '' || contactInput.value === '') {
            alert('Please provide all personal details.');
            return false;
        }
        if (cardNumberInput.value === '' || cvvInput.value === '') {
            alert('Please provide all card details.');
            return false;
        }
        if (cartTableBody.rows.length === 0 || cartTableBody.querySelector('.empty-cart-message')) {
            alert('Cart is empty. Add items to cart before paying.');
            return false;
        }
        return true;
    }

    // function to display a message to user with summary of order when payment is successful
    function displaySuccessMessage() {
        let items = '';
        cartTableBody.querySelectorAll('tr').forEach(row => {
            items += `${row.cells[1].innerText} - ${row.cells[2].innerText} x ${row.cells[3].innerText} (Total: ${row.cells[3].innerText})\n`;
        });
    
        const totalPrice = totalPriceElement.innerText;
    
        // Calculate delivery date as 7 days from today
        const today = new Date();
        const deliveryDate = new Date();
        deliveryDate.setDate(today.getDate() + 7);
        
        // Format the delivery date as a readable string (e.g., September 12, 2024)
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDeliveryDate = deliveryDate.toLocaleDateString(undefined, options);
    
        alert(`Thank you for your order!\n\nItems:\n${items}\n${totalPrice}\n\nYour order will be delivered by: ${formattedDeliveryDate}`);
    }
    


    loadBtn.addEventListener('click', function(event){
        event.preventDefault();
        loadFavouriteCart();
        alert("Favourite Order Loaded")
    })


    payBtn.addEventListener('click', function(event){
        event.preventDefault();
        if(validateForm()){
            displaySuccessMessage();
        } else {
            console.log("Form validation failed. Payment process halted.");
        }
    });
    

});
