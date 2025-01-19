// order-card.js

// Add an event listener to the preview toggle
document.getElementById('preview-toggle').addEventListener('change', function() {
    const designAttachment = document.getElementById('design-attachment');
    if (this.checked) {
        designAttachment.style.display = 'flex'; // Show the design attachment inputs
    } else {
        designAttachment.style.display = 'none'; // Hide the design attachment inputs
    }
});

// Add an event listener to the order form
document.getElementById('order-card-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const nameSurname = document.getElementById('name-surname').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const metalColor = document.getElementById('metal-color').value;
    const quantity = document.getElementById('quantity').value;

    // Display a notification or handle the order logic
    const notification = document.getElementById('order-notification');
    notification.innerHTML = `<p>Order placed for ${quantity} x ${metalColor} card!</p>`;
    notification.style.color = 'green'; // Optional: Change text color to green
});

// Add event listener to the Attach Original Design for Front button
document.getElementById('upload-btn-front').addEventListener('click', function() {
    document.getElementById('front-design').click(); // Trigger the file input click
});

// Add event listener to the front design file input to display the selected file name
document.getElementById('front-design').addEventListener('change', function() {
    const fileName = this.files[0] ? this.files[0].name : ''; // Get the file name
    document.getElementById('attached-front-design-name').textContent = fileName; // Display the file name
});

// Add event listener to the Attach Original Design for Back button
document.getElementById('upload-btn-back').addEventListener('click', function() {
    document.getElementById('back-design').click(); // Trigger the file input click
});

// Add event listener to the back design file input to display the selected file name
document.getElementById('back-design').addEventListener('change', function() {
    const fileName = this.files[0] ? this.files[0].name : ''; // Get the file name
    document.getElementById('attached-back-design-name').textContent = fileName; // Display the file name
});

// Add event listener to the Attach Preview button
document.getElementById('attach-preview-btn').addEventListener('click', function() {
    document.getElementById('attach-preview-file').click(); // Trigger the file input click
});

// Add event listener to the file input to display the selected file name
document.getElementById('attach-preview-file').addEventListener('change', function() {
    const fileName = this.files[0] ? this.files[0].name : ''; // Get the file name
    document.getElementById('attached-preview-name').textContent = fileName; // Display the file name
});

// Add event listener to the Designer Made toggle
document.getElementById('designer-made-toggle').addEventListener('change', function() {
    const attachPreviewBtn = document.getElementById('attach-preview-btn');

    if (this.checked) {
        attachPreviewBtn.innerHTML = 'Attach Designed Preview <i class="fas fa-paperclip"></i>'; // Change button text with icon
    } else {
        attachPreviewBtn.innerHTML = 'Attach Your Preview <i class="fas fa-paperclip"></i>'; // Revert button text with icon
    }
});

// Add event listener to the Self-Designed toggle
document.getElementById('preview-toggle').addEventListener('change', function() {
    const designerMadeToggle = document.getElementById('designer-made-toggle');
    const designAttachment = document.getElementById('design-attachment');

    if (this.checked) {
        designerMadeToggle.checked = false; // Uncheck Designer Made toggle
        designAttachment.style.display = 'flex'; // Show design attachment inputs
    } else {
        // If Designer Made is checked, hide design attachment inputs
        if (!designerMadeToggle.checked) {
            designAttachment.style.display = 'none'; // Hide design attachment inputs
        }
    }
});

// Add event listener to the Designer Made toggle
document.getElementById('designer-made-toggle').addEventListener('change', function() {
    const selfDesignedToggle = document.getElementById('preview-toggle');
    const designAttachment = document.getElementById('design-attachment');

    if (this.checked) {
        selfDesignedToggle.checked = false; // Uncheck Self-Designed toggle
        designAttachment.style.display = 'none'; // Hide design attachment inputs
    } else {
        // If Self-Designed is checked, show design attachment inputs
        if (selfDesignedToggle.checked) {
            designAttachment.style.display = 'flex'; // Show design attachment inputs
        }
    }
});

// Set initial state for toggles and dropdown
document.addEventListener('DOMContentLoaded', function() {
    const premadeDesignToggle = document.getElementById('premade-toggle');
    const designerMadeToggle = document.getElementById('designer-made-toggle');
    const selfDesignedToggle = document.getElementById('preview-toggle');
    const premadeDesignDropdown = document.getElementById('premade-design');
    const attachPreviewBtn = document.getElementById('attach-preview-btn');
    const designAttachment = document.getElementById('design-attachment');
    const totalAmountDisplay = document.getElementById('total-amount');
    const metalColorSelect = document.getElementById('metal-color');
    const submitOrderButton = document.getElementById('submit-order');
    const confirmationModal = document.getElementById('confirmation-modal');
    const confirmName = document.getElementById('confirm-name');
    const confirmSurname = document.getElementById('confirm-surname');
    const confirmEmail = document.getElementById('confirm-email'); // Assuming you have an email field
    const confirmPhone = document.getElementById('confirm-phone'); // Assuming you have a phone field
    const confirmAddress = document.getElementById('confirm-address');
    const confirmCity = document.getElementById('confirm-city');
    const confirmColor = document.getElementById('confirm-color');
    const confirmQuantity = document.getElementById('confirm-quantity');
    const confirmDesign = document.getElementById('confirm-design');
    const confirmDesignName = document.getElementById('confirm-design-name');
    const confirmDesignNameValue = document.getElementById('confirm-design-name-value');
    const closeConfirmationButton = document.getElementById('close-confirmation');

    // Set initial state for toggles and dropdown
    premadeDesignToggle.checked = true; // Set Premade Design toggle to YES by default
    designerMadeToggle.disabled = true; // Disable Designer Made toggle
    selfDesignedToggle.disabled = true; // Disable Self-Designed toggle
    attachPreviewBtn.style.display = 'none'; // Hide Attach Preview button
    premadeDesignDropdown.disabled = false; // Enable dropdown by default

    // Event listener for the Premade Design toggle
    premadeDesignToggle.addEventListener('change', function() {
        if (this.checked) {
            designerMadeToggle.checked = false; // Uncheck Designer Made toggle
            selfDesignedToggle.checked = false; // Uncheck Self-Designed toggle
            designerMadeToggle.disabled = false; // Disable Designer Made toggle
            selfDesignedToggle.disabled = false; // Disable Self-Designed toggle
            attachPreviewBtn.style.display = 'none'; // Hide Attach Preview button
            designAttachment.style.display = 'none'; // Hide design attachment inputs
            premadeDesignDropdown.disabled = false; // Enable dropdown
        } else {
            designerMadeToggle.disabled = false; // Enable Designer Made toggle
            selfDesignedToggle.disabled = false; // Enable Self-Designed toggle
            premadeDesignDropdown.disabled = true; // Disable dropdown
            attachPreviewBtn.style.display = 'block'; // Show Attach Preview button
        }
    });

    // Event listener for the Self-Designed toggle
    selfDesignedToggle.addEventListener('change', function() {
        if (this.checked) {
            premadeDesignToggle.checked = false; // Uncheck Premade Design toggle
            designerMadeToggle.checked = false; // Uncheck Designer Made toggle
            designerMadeToggle.disabled = false; // Disable Designer Made toggle
            attachPreviewBtn.style.display = 'block'; // Show Attach Preview button
            designAttachment.style.display = 'flex'; // Show design attachment inputs
        } else {
            designerMadeToggle.disabled = false; // Enable Designer Made toggle if Self-Designed is unchecked
            designAttachment.style.display = 'none'; // Hide design attachment inputs if Self-Designed is unchecked
        }
    });

    // Event listener for the Designer Made toggle
    designerMadeToggle.addEventListener('change', function() {
        if (this.checked) {
            premadeDesignToggle.checked = false; // Uncheck Premade Design toggle
            selfDesignedToggle.checked = false; // Uncheck Self-Designed toggle
            selfDesignedToggle.disabled = false; // Disable Self-Designed toggle
            attachPreviewBtn.style.display = 'block'; // Show Attach Preview button
            designAttachment.style.display = 'none'; // Hide design attachment inputs
        } else {
            selfDesignedToggle.disabled = false; // Enable Self-Designed toggle if Designer Made is unchecked
        }
    });

    const incrementBtn = document.getElementById('increment-btn');
    const decrementBtn = document.getElementById('decrement-btn');
    const numberInput = document.getElementById('number-input');

    // Initialize input value
    numberInput.value = 1;

    // Function to calculate total amount
    function calculateTotal() {
        let basePrice = 0;
        const quantity = parseInt(numberInput.value, 10);

        // Determine base price based on metal color
        switch (metalColorSelect.value) {
            case 'Gold':
                basePrice = 2999;
                break;
            case 'Silver':
            case 'Rose Gold':
                basePrice = 2499;
                break;
            default:
                basePrice = 0; // Default case if no color is selected
                break;
        }

        // Only add additional costs if a color is selected
        if (basePrice > 0) {
            // Add additional costs based on design type
            if (selfDesignedToggle.checked) {
                basePrice += 600;
            } else if (designerMadeToggle.checked) {
                basePrice += 1000;
            }
        }

        // Calculate total amount
        const totalAmount = basePrice * quantity;
        totalAmountDisplay.textContent = `Total Amount: ${totalAmount} MKD`;
    }

    // Event listeners for changes
    incrementBtn.addEventListener('click', function() {
        let currentValue = parseInt(numberInput.value, 10);
        numberInput.value = currentValue + 1; // Increment the value
        calculateTotal(); // Recalculate total
    });

    decrementBtn.addEventListener('click', function() {
        let currentValue = parseInt(numberInput.value, 10);
        if (currentValue > 1) {
            numberInput.value = currentValue - 1; // Decrement the value
            calculateTotal(); // Recalculate total
        }
    });

    // Event listeners for toggles and dropdown
    premadeDesignToggle.addEventListener('change', calculateTotal);
    designerMadeToggle.addEventListener('change', calculateTotal);
    selfDesignedToggle.addEventListener('change', calculateTotal);
    metalColorSelect.addEventListener('change', calculateTotal);

    // Initial calculation
    calculateTotal();

    // Event listener for the submit order button
    submitOrderButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Populate the confirmation summary
        confirmName.textContent = document.getElementById('name').value;
        confirmSurname.textContent = document.getElementById('surname').value;
        confirmEmail.textContent = document.getElementById('email').value; // Assuming you have an email input
        confirmPhone.textContent = document.getElementById('phone').value; // Assuming you have a phone input
        confirmAddress.textContent = document.getElementById('address').value;
        confirmCity.textContent = document.getElementById('city').value;
        confirmColor.textContent = metalColorSelect.value;
        confirmQuantity.textContent = document.getElementById('number-input').value; // Assuming you have a quantity input

        // Determine design type and display appropriate information
        if (premadeDesignToggle.checked) {
            confirmDesign.textContent = "Premade Design";
            
            // Get the selected design name from the dropdown
            const selectedDesign = document.getElementById('premade-design').options[document.getElementById('premade-design').selectedIndex].text;
            
            // Set the design name with the prefix in the designated span
            confirmDesignNameValue.textContent = selectedDesign; // Set the selected design name
            confirmDesignName.style.display = "block"; // Show design name
        } else if (selfDesignedToggle.checked) {
            confirmDesign.textContent = "Self Designed";
            confirmDesignName.style.display = "none"; // Hide design name for self-designed
        } else if (designerMadeToggle.checked) {
            confirmDesign.textContent = "Designer Made";
            confirmDesignName.style.display = "none"; // Hide design name for designer-made
        }

        // Show the confirmation modal and blur the form
        confirmationModal.style.display = 'flex';
    });

    // Close confirmation modal functionality
    closeConfirmationButton.addEventListener('click', function() {
        confirmationModal.style.display = 'none';
        document.body.style.filter = 'none'; // Remove blur from background
    });

    // Confirm order button functionality
    document.getElementById('confirm-order').addEventListener('click', function() {
        // Logic to finalize the order can be added here
        alert("Order confirmed!"); // Placeholder for order confirmation logic
        confirmationModal.style.display = 'none'; // Close the modal
        document.body.style.filter = 'none'; // Remove blur from background
    });
});
