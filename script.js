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
let startXFront, startYFront, startXBack, startYBack, currentXFront = 0, currentYFront = 0, currentXBack = 0, currentYBack = 0;

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

// Enable smooth dragging of the front image
imageOverlayFront.addEventListener("touchstart", (e) => {
    if (!uploadedImageFront) return;
    e.preventDefault(); // Prevent default touch behavior
    isDraggingFront = true;
    const touch = e.touches[0];
    startXFront = touch.clientX - currentXFront;
    startYFront = touch.clientY - currentYFront;
});

imageOverlayFront.addEventListener("touchmove", (e) => {
    if (!isDraggingFront || !uploadedImageFront) return;
    e.preventDefault(); // Prevent scrolling while dragging
    const touch = e.touches[0];
    currentXFront = touch.clientX - startXFront;
    currentYFront = touch.clientY - startYFront;

    // Limit movement within card boundaries
    const maxMove = 100; // Maximum percentage movement
    const xMove = Math.max(-maxMove, Math.min(maxMove, currentXFront / 2));
    const yMove = Math.max(-maxMove, Math.min(maxMove, currentYFront / 2));

    uploadedImageFront.style.transform = `translate(-50%, -50%) scale(${scaleSliderFront.value})`;
    uploadedImageFront.style.left = `${50 + xMove}%`;
    uploadedImageFront.style.top = `${50 + yMove}%`;
});

document.addEventListener("touchend", () => {
    isDraggingFront = false;
});

// Enable smooth dragging of the back image
imageOverlayBack.addEventListener("touchstart", (e) => {
    if (!uploadedImageBack) return;
    e.preventDefault(); // Prevent default touch behavior
    isDraggingBack = true;
    const touch = e.touches[0];
    startXBack = touch.clientX - currentXBack;
    startYBack = touch.clientY - currentYBack;
});

imageOverlayBack.addEventListener("touchmove", (e) => {
    if (!isDraggingBack || !uploadedImageBack) return;
    e.preventDefault(); // Prevent scrolling while dragging
    const touch = e.touches[0];
    currentXBack = touch.clientX - startXBack;
    currentYBack = touch.clientY - startYBack;

    // Limit movement within card boundaries
    const maxMove = 100; // Maximum percentage movement
    const xMove = Math.max(-maxMove, Math.min(maxMove, currentXBack / 2));
    const yMove = Math.max(-maxMove, Math.min(maxMove, currentYBack / 2));

    uploadedImageBack.style.transform = `translate(-50%, -50%) scale(${scaleSliderBack.value})`;
    uploadedImageBack.style.left = `${50 + xMove}%`;
    uploadedImageBack.style.top = `${50 + yMove}%`;
});

document.addEventListener("touchend", () => {
    isDraggingBack = false;
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

// Update touch events for better mobile support
imageOverlayFront.addEventListener("touchstart", (e) => {
    if (!uploadedImageFront) return;
    e.preventDefault();
    isDraggingFront = true;
    const touch = e.touches[0];
    startXFront = touch.clientX - currentXFront;
    startYFront = touch.clientY - currentYFront;
}, { passive: false });

document.addEventListener("touchmove", (e) => {
    if (!isDraggingFront || !uploadedImageFront) return;
    e.preventDefault();
    const touch = e.touches[0];
    currentXFront = touch.clientX - startXFront;
    currentYFront = touch.clientY - startYFront;
    
    // Limit movement within card boundaries
    const maxMove = 100; // Maximum percentage movement
    const xMove = Math.max(-maxMove, Math.min(maxMove, currentXFront / 2));
    const yMove = Math.max(-maxMove, Math.min(maxMove, currentYFront / 2));
    
    uploadedImageFront.style.transform = `translate(-50%, -50%) scale(${scaleSliderFront.value})`;
    uploadedImageFront.style.left = `${50 + xMove}%`;
    uploadedImageFront.style.top = `${50 + yMove}%`;
}, { passive: false });

// Same updates for back image
imageOverlayBack.addEventListener("touchstart", (e) => {
    if (!uploadedImageBack) return;
    e.preventDefault();
    isDraggingBack = true;
    const touch = e.touches[0];
    startXBack = touch.clientX - currentXBack;
    startYBack = touch.clientY - currentYBack;
}, { passive: false });

document.addEventListener("touchmove", (e) => {
    if (!isDraggingBack || !uploadedImageBack) return;
    e.preventDefault();
    const touch = e.touches[0];
    currentXBack = touch.clientX - startXBack;
    currentYBack = touch.clientY - startYBack;
    
    const maxMove = 100;
    const xMove = Math.max(-maxMove, Math.min(maxMove, currentXBack / 2));
    const yMove = Math.max(-maxMove, Math.min(maxMove, currentYBack / 2));
    
    uploadedImageBack.style.transform = `translate(-50%, -50%) scale(${scaleSliderBack.value})`;
    uploadedImageBack.style.left = `${50 + xMove}%`;
    uploadedImageBack.style.top = `${50 + yMove}%`;
}, { passive: false });
  