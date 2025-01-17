const backgroundSelect = document.getElementById("background-select");
const cardFrontBackground = document.getElementById("card-front-background");
const cardBackBackground = document.getElementById("card-back-background");
const uploadImageFront = document.getElementById("upload-image-front");
const uploadImageBack = document.getElementById("upload-image-back");
const imageOverlayFront = document.getElementById("image-overlay-front");
const imageOverlayBack = document.getElementById("image-overlay-back");
const scaleSliderFront = document.getElementById("scale-slider-front");
const scaleSliderBack = document.getElementById("scale-slider-back");
const fontPicker = document.getElementById("font-picker");
const nameText = document.getElementById("name-text");
const cardNumberText = document.getElementById("card-number-text");
const dateText = document.getElementById("date-text");
const nameInput = document.getElementById("name-input");
const cardNumberInput = document.getElementById("card-number-input");
const dateInput = document.getElementById("date-input");
const uploadBtnFront = document.getElementById("upload-btn-front");
const uploadBtnBack = document.getElementById("upload-btn-back");
const showCardNumber = document.getElementById("show-card-number");
const showCardDate = document.getElementById("show-card-date");

let uploadedImageFront = null;
let uploadedImageBack = null;
let isDraggingFront = false, isDraggingBack = false;

// Update the background images
backgroundSelect.addEventListener("change", () => {
  const selectedValue = backgroundSelect.value;
  if (selectedValue === "gold") {
    cardFrontBackground.src = "images/gold-front.png";
    cardBackBackground.src = "images/gold-back.png";
  } else if (selectedValue === "silver") {
    cardFrontBackground.src = "images/silver-front.png";
    cardBackBackground.src = "images/silver-back.png";
  } else if (selectedValue === "black") {
    cardFrontBackground.src = "images/black-front.png";
    cardBackBackground.src = "images/black-back.png";
  }
});

// Handle uploaded front image
uploadImageFront.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      uploadedImageFront = document.createElement("img");
      uploadedImageFront.src = reader.result;
      uploadedImageFront.style.position = "absolute";
      uploadedImageFront.style.top = "50%";
      uploadedImageFront.style.left = "50%";
      uploadedImageFront.style.transform = "translate(-50%, -50%) scale(1)";
      uploadedImageFront.style.filter = "grayscale(100%)"; // Apply grayscale filter
      uploadedImageFront.draggable = false;
      imageOverlayFront.innerHTML = ""; // Clear any previous image
      imageOverlayFront.appendChild(uploadedImageFront);
    };
    reader.readAsDataURL(file);
  }
});

// Handle uploaded back image
uploadImageBack.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      uploadedImageBack = document.createElement("img");
      uploadedImageBack.src = reader.result;
      uploadedImageBack.style.position = "absolute";
      uploadedImageBack.style.top = "50%";
      uploadedImageBack.style.left = "50%";
      uploadedImageBack.style.transform = "translate(-50%, -50%) scale(1)";
      uploadedImageBack.style.filter = "grayscale(100%)"; // Apply grayscale filter
      uploadedImageBack.draggable = false;
      imageOverlayBack.innerHTML = ""; // Clear any previous image
      imageOverlayBack.appendChild(uploadedImageBack);
    };
    reader.readAsDataURL(file);
  }
});

// Scale the front image
scaleSliderFront.addEventListener("input", () => {
  if (uploadedImageFront) {
    const scale = scaleSliderFront.value;
    uploadedImageFront.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }
});

// Scale the back image
scaleSliderBack.addEventListener("input", () => {
  if (uploadedImageBack) {
    const scale = scaleSliderBack.value;
    uploadedImageBack.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }
});

// Enable smooth dragging of the back image
imageOverlayBack.addEventListener("mousedown", (e) => {
    if (!uploadedImageBack) return;
    e.preventDefault(); // Prevent default behavior
    isDraggingBack = true;

    // Store the initial mouse position
    const offsetXBack = e.clientX - uploadedImageBack.offsetLeft;
    const offsetYBack = e.clientY - uploadedImageBack.offsetTop;

    // Update the position of the image based on mouse movement
    document.addEventListener("mousemove", (e) => {
        if (!isDraggingBack) return;
        uploadedImageBack.style.left = `${e.clientX - offsetXBack}px`;
        uploadedImageBack.style.top = `${e.clientY - offsetYBack}px`;
    });
});

// Reset dragging state on mouse up
document.addEventListener("mouseup", () => {
    isDraggingBack = false; // Reset dragging state
});

// Change font style
fontPicker.addEventListener("change", (event) => {
  const font = event.target.value;
  nameText.style.fontFamily = font;
  cardNumberText.style.fontFamily = font;
  dateText.style.fontFamily = font;
});

// Update name text from input field with uppercase
nameInput.addEventListener("input", (event) => {
    const upperCaseValue = event.target.value.toUpperCase();
    event.target.value = upperCaseValue; // Update input field
    nameText.textContent = upperCaseValue || "YOUR NAME";
});

// Update card number text with formatting XXXX XXXX XXXX XXXX
cardNumberInput.addEventListener("input", (event) => {
    let value = event.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 16) value = value.slice(0, 16); // Limit to 16 digits
    
    // Add spaces every 4 digits
    const formatted = value.replace(/(\d{4})/g, '$1 ').trim();
    event.target.value = formatted;
    cardNumberText.textContent = formatted || "XXXX XXXX XXXX XXXX";
    
    if (showCardNumber.checked) {
        validateCardNumber();
    }
});

// Update expiry date text with MM/YY format
dateInput.addEventListener("input", (event) => {
    let value = event.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 4) value = value.slice(0, 4); // Limit to 4 digits
    
    // Format as MM/YY
    if (value.length >= 2) {
        const month = value.slice(0, 2);
        const year = value.slice(2);
        
        // Validate month (01-12)
        if (parseInt(month) > 12) {
            value = "12" + year;
        }
        
        value = month + (year.length ? '/' + year : '');
    }
    
    event.target.value = value;
    dateText.textContent = value || "MM/YY";
    
    if (showCardDate.checked) {
        validateDate();
    }
});

// Add maxlength attributes to inputs
nameInput.setAttribute("maxlength", "30");
cardNumberInput.setAttribute("maxlength", "19"); // 16 digits + 3 spaces
dateInput.setAttribute("maxlength", "5");  // MM/YY = 5 characters

// Add placeholders
nameInput.setAttribute("placeholder", "YOUR NAME");
cardNumberInput.setAttribute("placeholder", "YOUR CARD NUMBER");
dateInput.setAttribute("placeholder", "MM/YY");

// Add event listeners for upload buttons
uploadBtnFront.addEventListener("click", () => {
    uploadImageFront.click();
});

uploadBtnBack.addEventListener("click", () => {
    uploadImageBack.click();
});

// Add these functions
function validateCardNumber() {
    const value = cardNumberInput.value.replace(/\D/g, '');
    if (value.length < 16) {
        cardNumberInput.style.borderColor = 'red';
        return false;
    }
    cardNumberInput.style.borderColor = '#ccc';
    return true;
}

function validateDate() {
    const value = dateInput.value.replace(/\D/g, '');
    if (value.length < 4) {
        dateInput.style.borderColor = 'red';
        return false;
    }
    dateInput.style.borderColor = '#ccc';
    return true;
}

// Add these event listeners
showCardNumber.addEventListener("change", (e) => {
    cardNumberInput.disabled = !e.target.checked;
    cardNumberText.style.display = e.target.checked ? "block" : "none";
    if (!e.target.checked) {
        cardNumberInput.value = "";
        cardNumberText.textContent = "XXXX XXXX XXXX XXXX";
        cardNumberInput.style.borderColor = '#ccc';
    }
});

showCardDate.addEventListener("change", (e) => {
    dateInput.disabled = !e.target.checked;
    dateText.style.display = e.target.checked ? "block" : "none";
    if (!e.target.checked) {
        dateInput.value = "";
        dateText.textContent = "MM/YY";
        dateInput.style.borderColor = '#ccc';
    }
});

// Add form submission validation (if you have a form)
document.querySelector("form")?.addEventListener("submit", (e) => {
    if (showCardNumber.checked && !validateCardNumber()) {
        e.preventDefault();
        alert("Please enter a complete 16-digit card number");
    }
    if (showCardDate.checked && !validateDate()) {
        e.preventDefault();
        alert("Please enter a complete expiry date (MM/YY)");
    }
});

// Update the scale slider attributes for much smoother scaling
scaleSliderFront.setAttribute("min", "0.1");
scaleSliderFront.setAttribute("max", "3.0");
scaleSliderFront.setAttribute("step", "0.001"); // Much smaller step for smoother scaling

scaleSliderBack.setAttribute("min", "0.1");
scaleSliderBack.setAttribute("max", "3.0");
scaleSliderBack.setAttribute("step", "0.001"); // Much smaller step for smoother scaling


// Enable smooth dragging of the front image
imageOverlayFront.addEventListener("mousedown", (e) => {
    if (!uploadedImageFront) return;
    e.preventDefault(); // Prevent default behavior
    isDraggingFront = true;

    // Store the initial mouse position
    const offsetXFront = e.clientX - uploadedImageFront.offsetLeft;
    const offsetYFront = e.clientY - uploadedImageFront.offsetTop;

    // Update the position of the image based on mouse movement
    document.addEventListener("mousemove", (e) => {
        if (!isDraggingFront) return;
        uploadedImageFront.style.left = `${e.clientX - offsetXFront}px`;
        uploadedImageFront.style.top = `${e.clientY - offsetYFront}px`;
    });
});

// Reset dragging state on mouse up
document.addEventListener("mouseup", () => {
    isDraggingFront = false; // Reset dragging state
});

// Enable smooth dragging of the front image for touch devices
imageOverlayFront.addEventListener("touchstart", (e) => {
    if (!uploadedImageFront) return;
    e.preventDefault(); // Prevent default behavior
    isDraggingFront = true;

    // Store the initial touch position
    const touch = e.touches[0];
    const offsetXFront = touch.clientX - uploadedImageFront.offsetLeft;
    const offsetYFront = touch.clientY - uploadedImageFront.offsetTop;

    // Update the position of the image based on touch movement
    document.addEventListener("touchmove", (e) => {
        if (!isDraggingFront) return;
        const touch = e.touches[0];
        uploadedImageFront.style.left = `${touch.clientX - offsetXFront}px`;
        uploadedImageFront.style.top = `${touch.clientY - offsetYFront}px`;
    });
});

// Reset dragging state on touch end
document.addEventListener("touchend", () => {
    isDraggingFront = false; // Reset dragging state
});

// Enable smooth dragging of the back image for touch devices
imageOverlayBack.addEventListener("touchstart", (e) => {
    if (!uploadedImageBack) return;
    e.preventDefault(); // Prevent default behavior
    isDraggingBack = true;

    // Store the initial touch position
    const touch = e.touches[0];
    const offsetXBack = touch.clientX - uploadedImageBack.offsetLeft;
    const offsetYBack = touch.clientY - uploadedImageBack.offsetTop;

    // Update the position of the image based on touch movement
    document.addEventListener("touchmove", (e) => {
        if (!isDraggingBack) return;
        const touch = e.touches[0];
        uploadedImageBack.style.left = `${touch.clientX - offsetXBack}px`;
        uploadedImageBack.style.top = `${touch.clientY - offsetYBack}px`;
    });
});

// Reset dragging state on touch end
document.addEventListener("touchend", () => {
    isDraggingBack = false; // Reset dragging state
});

// Function to disable editing
function disableEditing() {
    // Disable input fields
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.disabled = true;
    });

    // Disable the save button
    const saveButton = document.getElementById('save-preview');
    saveButton.disabled = true; // Disable the button
    saveButton.classList.add('controls-disabled'); // Add the disabled class for styling

    // Disable image modifications
    imageOverlayFront.style.pointerEvents = 'none';
    imageOverlayBack.style.pointerEvents = 'none';

    // Add class to change styles
    const controls = document.getElementById('controls');
    controls.classList.add('controls-disabled');

    // Show notification
    const notification = document.createElement('div');
    notification.id = 'notification';
    notification.innerHTML = `
        <h3>Preview saved!</h3>
        <p>Please take a screenshot.</p>
        <button id="cancel-edit">Edit Again <i class="fa-solid fa-circle-xmark fa-lg"></i> </button>
    `;
    controls.appendChild(notification); // Append to controls

    // Make the notification centered
    notification.style.position = 'absolute'; // Keep it absolute
    notification.style.top = '50%'; // Center vertically
    notification.style.left = '50%'; // Center horizontally
    notification.style.transform = 'translate(-50%, -50%)'; // Adjust for centering
    notification.style.zIndex = '2000'; // Ensure it stays on top
    notification.style.textAlign = 'center'; // Center text inside the notification

    // Add event listener to cancel button
    const cancelButton = document.getElementById('cancel-edit');
    cancelButton.addEventListener('click', enableEditing);
}

// Function to enable editing
function enableEditing() {
    // Enable input fields
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.disabled = false;
    });

    // Enable the save button
    const saveButton = document.getElementById('save-preview');
    saveButton.disabled = false; // Enable the button
    saveButton.classList.remove('controls-disabled'); // Remove the disabled class for styling

    // Enable image modifications
    imageOverlayFront.style.pointerEvents = 'auto';
    imageOverlayBack.style.pointerEvents = 'auto';

    // Remove class to revert styles
    const controls = document.getElementById('controls');
    controls.classList.remove('controls-disabled');

    // Remove notification
    const notification = document.getElementById('notification');
    if (notification) {
        controls.removeChild(notification); // Remove from controls
    }
}

// Example function to save preview (you may already have this)
document.getElementById('save-preview').addEventListener('click', disableEditing);
  