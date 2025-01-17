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

// Increment quantity
document.getElementById('increment-quantity').addEventListener('click', function() {
    const quantityInput = document.getElementById('quantity');
    quantityInput.value = parseInt(quantityInput.value) + 1; // Increment quantity
});

// Decrement quantity
document.getElementById('decrement-quantity').addEventListener('click', function() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput.value > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1; // Decrement quantity
    }
});
