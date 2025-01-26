const backgroundSelect = document.getElementById("background-select");
const previewSelect = document.getElementById("premade-design");
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
const premadeToggle = document.getElementById("premade-toggle"); // The toggle for using premade designs
const selfDesignedToggle = document.getElementById("preview-toggle"); // Self Designed toggle
const designerMadeToggle = document.getElementById("designer-made-toggle"); // Designer Made toggle
const totalAmountDisplay = document.getElementById("amount-value");
const numberInput = document.getElementById("quantity"); // Note: You'll need to add this input to your HTML

let uploadedImageFront = null;
let uploadedImageBack = null;
let isDraggingFront = false,
  isDraggingBack = false;

// Load and apply saved design on page load
window.addEventListener("DOMContentLoaded", () => {
  // First set default gold card
  backgroundSelect.value = "gold";
  backgroundSelect.dispatchEvent(new Event("change"));

  // Try to load saved design
  const savedDesign = localStorage.getItem("savedCardDesign");
  if (savedDesign) {
    const design = JSON.parse(savedDesign);

    // Apply saved values
    nameInput.value = design.name;
    cardNumberInput.value = design.cardNumber;
    dateInput.value = design.expiryDate;
    backgroundSelect.value = design.backgroundColor;
    fontPicker.value = design.fontStyle;

    // Apply text to preview
    nameText.textContent = design.name || "YOUR NAME";
    cardNumberText.textContent = design.cardNumber || "XXXX XXXX XXXX XXXX";
    dateText.textContent = design.expiryDate || "MM/YY";

    // Set toggle states and handle input disabling
    showCardNumber.checked = design.showCardNumber;
    showCardDate.checked = design.showCardDate;

    // Disable inputs based on toggle states
    cardNumberInput.disabled = !design.showCardNumber;
    cardNumberText.style.display = design.showCardNumber ? "block" : "none";

    dateInput.disabled = !design.showCardDate;
    dateText.style.display = design.showCardDate ? "block" : "none";

    // Set other toggle states
    premadeToggle.checked = design.isPremadeDesign;
    selfDesignedToggle.checked = design.isSelfDesigned;
    designerMadeToggle.checked = design.isDesignerMade;

    // Set premade design if applicable
    if (design.isPremadeDesign && design.premadeDesign) {
      previewSelect.value = design.premadeDesign;
    }

    // Load images if they exist
    if (design.frontImage) {
      uploadedImageFront = document.createElement("img");
      uploadedImageFront.src = design.frontImage.src;
      uploadedImageFront.style.position = "absolute";
      uploadedImageFront.style.top = design.frontImage.position.top;
      uploadedImageFront.style.left = design.frontImage.position.left;
      uploadedImageFront.style.transform = `translate(-50%, -50%) scale(${design.frontImage.scale})`;
      uploadedImageFront.draggable = false;
      imageOverlayFront.innerHTML = "";
      imageOverlayFront.appendChild(uploadedImageFront);
      scaleSliderFront.value = design.frontImage.scale;
    }

    if (design.backImage) {
      uploadedImageBack = document.createElement("img");
      uploadedImageBack.src = design.backImage.src;
      uploadedImageBack.style.position = "absolute";
      uploadedImageBack.style.top = design.backImage.position.top;
      uploadedImageBack.style.left = design.backImage.position.left;
      uploadedImageBack.style.transform = `translate(-50%, -50%) scale(${design.backImage.scale})`;
      uploadedImageBack.draggable = false;
      imageOverlayBack.innerHTML = "";
      imageOverlayBack.appendChild(uploadedImageBack);
      scaleSliderBack.value = design.backImage.scale;
    }

    // Update UI
    handleToggles(new Event("change"));
    updateBackground();

    // Update image visibility based on toggle state
    updateImageVisibility();
  }

  // Calculate total and update save button state
  calculateTotal();
  updateSaveButtonState();

  // Apply saved font
  applySavedFont();
});

// Update the background images
function updateBackground() {
  const selectedValue = backgroundSelect.value;
  const selectedPreview = previewSelect.value; // Get the selected premade design
  const usePremadeDesign = premadeToggle.checked; // Check if the premade toggle is on

  console.log("Selected Background:", selectedValue);
  console.log("Selected Preview:", selectedPreview);
  console.log("Use Premade Design:", usePremadeDesign);

  // If the toggle is ON, prioritize the premade design
  if (usePremadeDesign) {
    if (selectedPreview === "Amex-silver") {
      cardFrontBackground.src = "images/american-express-silver-front.png";
      cardBackBackground.src = "images/american-express-silver-back.png";

       nameText.style.color = "black"; 
       cardNumberText.style.color = "black"; 
       dateText.style.color = "black"; 

    } else if (selectedPreview === "Amex-gold") {
        cardFrontBackground.src = "images/american-express-gold-front.png";
        cardBackBackground.src = "images/american-express-gold-back.png";
    } else if (selectedPreview === "Millionaires Club") {
      // Add logic for Millionaires Club if needed
      cardFrontBackground.src = "images/millionairesClubFront.png";
      cardBackBackground.src = "images/millionairesClubBack.png";
    } else if (selectedPreview === "OFF White") {
      // Add logic for OFF White if needed
      cardFrontBackground.src = "images/offWhiteFront.png";
      cardBackBackground.src = "images/offWhiteBack.png";
    }
  } else {
    // If the toggle is OFF, revert to color selections
    updateColorBackground(selectedValue);
    nameText.style.color = ""; 
    cardNumberText.style.color = ""; 
    dateText.style.color = ""; 
  }
}

// Function to update color backgrounds
function updateColorBackground(selectedValue) {
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
}

// Event listener for the background select dropdown
backgroundSelect.addEventListener("change", updateBackground);

// Event listener for the premade design dropdown
previewSelect.addEventListener("change", () => {
  // Trigger the background update when a premade design is selected
  updateBackground();
});

// Event listener for the premade toggle
premadeToggle.addEventListener("change", () => {
  updateBackground(); // Update the background based on the current selections
});

// Event listener for the self-designed toggle
selfDesignedToggle.addEventListener("change", () => {
  if (selfDesignedToggle.checked) {
    // Reset to color selections if Self Designed is selected
    previewSelect.value = ""; // Reset the premade design selection
    updateColorBackground(backgroundSelect.value); // Update to the current color selection
  }
});

// Event listener for the designer-made toggle
designerMadeToggle.addEventListener("change", () => {
  if (designerMadeToggle.checked) {
    // Reset to color selections if Designer Made is selected
    previewSelect.value = ""; // Reset the premade design selection
    updateColorBackground(backgroundSelect.value); // Update to the current color selection
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
  localStorage.setItem("selectedFont", font);
});

// Update name text from input field with uppercase
nameInput.addEventListener("input", (event) => {
  const upperCaseValue = event.target.value.toUpperCase();
  event.target.value = upperCaseValue; // Update input field
  nameText.textContent = upperCaseValue || "YOUR NAME";
});

// Update card number text with formatting XXXX XXXX XXXX XXXX
cardNumberInput.addEventListener("input", (event) => {
  let value = event.target.value.replace(/\s/g, ""); // Remove existing spaces
  value = value.replace(/\D/g, ""); // Remove non-digits

  // Limit to 16 digits
  if (value.length > 16) {
    value = value.slice(0, 16);
  }

  // Add spaces after every 4 digits
  const parts = value.match(/.{1,4}/g) || [];
  const formatted = parts.join(" ");

  // Update input value
  event.target.value = formatted;

  // Update preview text
  cardNumberText.textContent = formatted || "XXXX XXXX XXXX XXXX";

  // Update save button state
  updateSaveButtonState();
});

// Update expiry date text with MM/YY format
dateInput.addEventListener("input", (event) => {
  let value = event.target.value.replace(/\D/g, ""); // Remove non-digits
  if (value.length > 4) value = value.slice(0, 4); // Limit to 4 digits

  // Format as MM/YY
  if (value.length >= 2) {
    const month = value.slice(0, 2);
    const year = value.slice(2);

    // Validate month (01-12)
    if (parseInt(month) > 12) {
      value = "12" + year;
    } else if (parseInt(month) < 1) {
      value = "01" + year;
    }

    value = month + (year.length ? "/" + year : "");
  }

  event.target.value = value;
  dateText.textContent = value || "MM/YY";

  // Update save button state
  updateSaveButtonState();
});

// Add maxlength attributes to inputs
nameInput.setAttribute("maxlength", "30");
cardNumberInput.setAttribute("maxlength", "19"); // 16 digits + 3 spaces
dateInput.setAttribute("maxlength", "5"); // MM/YY = 5 characters

// Add placeholders
nameInput.setAttribute("placeholder", "YOUR NAME *");
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
  const value = cardNumberInput.value.replace(/\D/g, "");
  if (value.length < 16) {
    cardNumberInput.style.borderColor = "red";
    return false;
  }
  cardNumberInput.style.borderColor = "#ccc";
  return true;
}

function validateDate() {
  const value = dateInput.value.replace(/\D/g, "");
  if (value.length < 4) {
    dateInput.style.borderColor = "red";
    return false;
  }
  dateInput.style.borderColor = "#ccc";
  return true;
}

// Update showCardNumber event listener to maintain the preview text
showCardNumber.addEventListener("change", (e) => {
  cardNumberInput.disabled = !e.target.checked;
  cardNumberText.style.display = e.target.checked ? "block" : "none";
  if (!e.target.checked) {
    cardNumberInput.value = "";
    cardNumberText.textContent = "XXXX XXXX XXXX XXXX";
  }
});

showCardDate.addEventListener("change", (e) => {
  dateInput.disabled = !e.target.checked;
  dateText.style.display = e.target.checked ? "block" : "none";
  if (!e.target.checked) {
    dateInput.value = "";
    dateText.textContent = "MM/YY";
    dateInput.style.borderColor = "#ccc";
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

// Add this function to handle image visibility
function updateImageVisibility() {
  if (uploadedImageFront) {
    imageOverlayFront.style.display = selfDesignedToggle.checked
      ? "block"
      : "none";
  }
  if (uploadedImageBack) {
    imageOverlayBack.style.display = selfDesignedToggle.checked
      ? "block"
      : "none";
  }
}

// Modify the handleToggles function
function handleToggles(event) {
  const premadeToggle = document.getElementById("premade-toggle");
  const selfDesignedToggle = document.getElementById("preview-toggle");
  const designerMadeToggle = document.getElementById("designer-made-toggle");
  const premadeDesignDropdown = document.getElementById("premade-design");
  const frontDesignUpload = document.getElementById("design-attachment-front");
  const backDesignUpload = document.getElementById("design-attachment-back");
  const contactButtons1 = document.getElementById("contact-1");
  const contactButtons2 = document.getElementById("contact-2");
  const backgroundSelect = document.getElementById("background-select");

  // Uncheck other toggles when one is clicked
  if (event.target === premadeToggle) {
    selfDesignedToggle.checked = false;
    designerMadeToggle.checked = false;
  } else if (event.target === selfDesignedToggle) {
    premadeToggle.checked = false;
    designerMadeToggle.checked = false;
  } else if (event.target === designerMadeToggle) {
    premadeToggle.checked = false;
    selfDesignedToggle.checked = false;
  }

  // Handle premade design toggle
  if (premadeToggle.checked) {
    premadeDesignDropdown.disabled = false; // Enable dropdown
    frontDesignUpload.style.display = "none"; // Hide front design upload
    backDesignUpload.style.display = "none"; // Hide back design upload
    contactButtons1.style.display = "none"; // Hide contact buttons
    contactButtons2.style.display = "none"; // Hide contact buttons
  } else {
    premadeDesignDropdown.disabled = true; // Disable dropdown
    premadeDesignDropdown.value = ""; // Reset premade design selection
    updateColorBackground(backgroundSelect.value); // Reset to selected color background
  }

  // Handle self-designed toggle
  if (selfDesignedToggle.checked) {
    frontDesignUpload.style.display = "flex"; // Show front design upload
    backDesignUpload.style.display = "flex"; // Show back design upload
    premadeDesignDropdown.disabled = true; // Disable dropdown
    contactButtons1.style.display = "none"; // Hide contact buttons
    contactButtons2.style.display = "none"; // Hide contact buttons
  } else {
    frontDesignUpload.style.display = "none"; // Hide front design upload
    backDesignUpload.style.display = "none"; // Hide back design upload
  }

  // Handle designer contact toggle
  if (designerMadeToggle.checked) {
    premadeDesignDropdown.disabled = true; // Disable dropdown
    frontDesignUpload.style.display = "none"; // Hide front design upload
    backDesignUpload.style.display = "none"; // Hide back design upload
    contactButtons1.style.display = "flex"; // Show contact buttons
    contactButtons2.style.display = "flex"; // Show contact buttons
  } else {
    contactButtons1.style.display = "none"; // Hide contact buttons
    contactButtons2.style.display = "none"; // Hide contact buttons
  }

  // Update image visibility based on toggle state
  updateImageVisibility();
}

// Event listeners for toggles
document
  .getElementById("premade-toggle")
  .addEventListener("change", handleToggles);
document
  .getElementById("preview-toggle")
  .addEventListener("change", handleToggles);
document
  .getElementById("designer-made-toggle")
  .addEventListener("change", handleToggles);

// Initialize the state on page load
handleToggles(new Event("change"));

// Add this function after calculateTotal()
function updatePriceBreakdown() {
  const tooltip = document.getElementById("price-breakdown");
  let breakdownHTML = "";

  // Add base price if color is selected
  if (backgroundSelect.value) {
    const basePrice = backgroundSelect.value === "gold" ? 2999 : 2499;
    breakdownHTML += `<div class="breakdown-item">
            <span>${
              backgroundSelect.value.charAt(0).toUpperCase() +
              backgroundSelect.value.slice(1)
            } Color</span>
            <span>${basePrice} MKD</span>
        </div>`;

    // Add design costs if applicable
    if (premadeToggle.checked) {
      breakdownHTML += `<div class="breakdown-item">
                <span>+ Premade Design</span>
                <span style="color: #4CAF50">+0 MKD</span>
            </div>`;
    } else if (selfDesignedToggle.checked) {
      breakdownHTML += `<div class="breakdown-item">
                <span>+ Self Designed</span>
                <span>+600 MKD</span>
            </div>`;
    } else if (designerMadeToggle.checked) {
      breakdownHTML += `<div class="breakdown-item">
                <span>+ Designer Made</span>
                <span>+1000 MKD</span>
            </div>`;
    }

    // Add total
    const total = calculateTotal(true);
    breakdownHTML += `<div class="breakdown-total">
            <span>Total</span>
            <span>${total} MKD</span>
        </div>`;
  } else {
    breakdownHTML =
      '<div class="breakdown-item">Please select a card color</div>';
  }

  tooltip.innerHTML = breakdownHTML;
}

// Modify calculateTotal to always show the amount
function calculateTotal(returnValue = false) {
  let basePrice = 0;
  const quantity = 1;

  switch (backgroundSelect.value) {
    case "gold":
      basePrice = 2999;
      break;
    case "silver":
    case "black":
      basePrice = 2499;
      break;
  }

  if (basePrice > 0) {
    if (selfDesignedToggle.checked) {
      basePrice += 600;
    } else if (designerMadeToggle.checked) {
      basePrice += 1000;
    }
  }

  const totalAmount = basePrice * quantity;

  // Always update the display
  totalAmountDisplay.textContent = `${totalAmount} MKD`;

  if (returnValue) {
    return totalAmount;
  }

  updatePriceBreakdown(); // Update the breakdown whenever total is calculated
}

// Add event listeners for the tooltip
document.addEventListener("DOMContentLoaded", () => {
  const infoIcon = document.querySelector(".fa-circle-info");
  const tooltip = document.getElementById("price-breakdown");

  infoIcon.addEventListener("mouseenter", () => {
    tooltip.style.display = "block";
    updatePriceBreakdown(); // Update breakdown when hovering
  });

  infoIcon.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });
});

// Add these event listeners to ensure the total updates when selections change
backgroundSelect.addEventListener("change", calculateTotal);
premadeToggle.addEventListener("change", calculateTotal);
designerMadeToggle.addEventListener("change", calculateTotal);
selfDesignedToggle.addEventListener("change", calculateTotal);

// Call calculateTotal initially to show the initial amount
calculateTotal();

function saveCardDesign() {
  // Create an object to store all card details
  const cardDesign = {
    // Basic details
    name: nameInput.value,
    cardNumber: cardNumberInput.value,
    expiryDate: dateInput.value,

    // Style selections
    backgroundColor: backgroundSelect.value,
    fontStyle: fontPicker.value,

    // Toggle states
    showCardNumber: showCardNumber.checked,
    showCardDate: showCardDate.checked,
    isPremadeDesign: premadeToggle.checked,
    isSelfDesigned: selfDesignedToggle.checked,
    isDesignerMade: designerMadeToggle.checked,

    // Premade design selection
    premadeDesign: previewSelect.value,

    // Image details (if uploaded)
    frontImage: uploadedImageFront
      ? {
          src: uploadedImageFront.src,
          position: {
            top: uploadedImageFront.style.top,
            left: uploadedImageFront.style.left,
          },
          scale: scaleSliderFront.value,
        }
      : null,

    backImage: uploadedImageBack
      ? {
          src: uploadedImageBack.src,
          position: {
            top: uploadedImageBack.style.top,
            left: uploadedImageBack.style.left,
          },
          scale: scaleSliderBack.value,
        }
      : null,

    // Price details
    totalAmount: totalAmountDisplay.textContent,
  };

  // Save to localStorage
  localStorage.setItem("savedCardDesign", JSON.stringify(cardDesign));

  // Show success notification
  showSaveNotification();
}

function showSaveNotification() {
  const controls = document.getElementById("controls");

  // Create notification
  const notification = document.createElement("div");
  notification.id = "notification";
  notification.innerHTML = `
        <h2>Design Saved Successfully!</h2>
        <p>Your card design has been saved.</p>
        <div>
            <button id="order-saved-card" class="save-button">
                Order Now <i class="fa-solid fa-bag-shopping"></i></i>
            </button>
        </div>
    `;

  // Add notification to controls
  controls.appendChild(notification);

  // Add event listeners to buttons
  document.getElementById("order-saved-card").addEventListener("click", () => {
    window.location.href = "order-card.html";
  });
}

// Add this after saveCardDesign function
function checkSavedDesign() {
  const saved = localStorage.getItem("savedCardDesign");
  if (saved) {
    console.log("Saved design:", JSON.parse(saved));
  } else {
    console.log("No saved design found");
  }
}

// Update isFormValid function to include proper date validation
function isFormValid() {
  // Check name (always required)
  if (!nameInput.value.trim()) {
    return false;
  }

  // Check card number (must be 16 digits) if shown
  if (showCardNumber.checked) {
    const cardNumber = cardNumberInput.value.replace(/\s/g, ""); // Remove spaces
    if (!/^\d{16}$/.test(cardNumber)) {
      // Check for exactly 16 digits
      return false;
    }
  }

  // Check date (must be MM/YY format) if shown
  if (showCardDate.checked) {
    const dateValue = dateInput.value;
    // Check if format is correct (MM/YY)
    if (!/^\d{2}\/\d{2}$/.test(dateValue)) {
      return false;
    }

    // Extract month and year
    const [month, year] = dateValue.split("/").map((num) => parseInt(num, 10));
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
    const currentMonth = currentDate.getMonth() + 1; // getMonth() returns 0-11

    // Validate month range
    if (month < 1 || month > 12) {
      return false;
    }

    // Validate year (must be current year or later)
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false;
    }
  }

  // Check design selection
  if (premadeToggle.checked) {
    // If premade design is selected, check if a design is chosen
    if (!previewSelect.value) {
      return false;
    }
  } else if (selfDesignedToggle.checked) {
    // If self-designed is selected, check if at least one image is uploaded
    if (!uploadedImageFront && !uploadedImageBack) {
      return false;
    }
  } else if (!designerMadeToggle.checked) {
    // If no design option is selected
    return false;
  }

  return true;
}

// Function to update save button state
function updateSaveButtonState() {
  const saveButton = document.getElementById("save-design");
  if (isFormValid()) {
    saveButton.disabled = false;
    saveButton.style.opacity = "1";
    saveButton.style.cursor = "pointer";
  } else {
    saveButton.disabled = true;
    saveButton.style.opacity = "0.5";
    saveButton.style.cursor = "not-allowed";
  }
}

// Add event listeners for all relevant inputs
nameInput.addEventListener("input", updateSaveButtonState);
cardNumberInput.addEventListener("input", updateSaveButtonState);
dateInput.addEventListener("input", updateSaveButtonState);
showCardNumber.addEventListener("change", updateSaveButtonState);
showCardDate.addEventListener("change", updateSaveButtonState);
premadeToggle.addEventListener("change", updateSaveButtonState);
selfDesignedToggle.addEventListener("change", updateSaveButtonState);
designerMadeToggle.addEventListener("change", updateSaveButtonState);
previewSelect.addEventListener("change", updateSaveButtonState);

// Add listeners for image uploads
uploadImageFront.addEventListener("change", updateSaveButtonState);
uploadImageBack.addEventListener("change", updateSaveButtonState);

// Modify the save button listener
document.getElementById("save-design").addEventListener("click", (e) => {
  if (!isFormValid()) {
    e.preventDefault();
    return;
  }
  saveCardDesign();
  checkSavedDesign();
});

// Initial button state
updateSaveButtonState();

document.addEventListener("DOMContentLoaded", () => {
  const saveDesignButton = document.getElementById("save-design");
  const editAgainButton = document.createElement("button"); // Create Edit Again button
  const allInteractiveElements = document.querySelectorAll(
    "input, button, select, textarea, .upload-btn, [contenteditable]"
  );

  // Style and add text to the Edit Again button
  editAgainButton.innerHTML = 'Edit Again <i class="fas fa-edit"></i>';
  editAgainButton.style.display = "none"; // Hidden initially
  editAgainButton.classList.add("blue-outline-button"); // Optional styling
  saveDesignButton.parentNode.appendChild(editAgainButton); // Append next to the Save Design button

  // Function to disable all interactive elements
  function disableAll() {
    allInteractiveElements.forEach((element) => {
      element.disabled = true;
      element.style.pointerEvents = "none"; // Disable clicking/dragging
      element.style.opacity = "0.5"; // Optional: visual indication
    });
    saveDesignButton.style.display = "none"; // Hide Save Design button
    editAgainButton.style.display = "block"; // Show Edit Again button
  }

  // Function to enable all interactive elements
  function enableAll() {
    allInteractiveElements.forEach((element) => {
      element.disabled = false;
      element.style.pointerEvents = "auto"; // Re-enable clicking/dragging
      element.style.opacity = "1"; // Reset visual indication
    });
    saveDesignButton.style.display = "block"; // Show Save Design button
    editAgainButton.style.display = "none"; // Hide Edit Again button
  }

  async function captureScreenshot() {
    const cardPreview = document.getElementById("card-preview");

    try {
      const canvas = await html2canvas(cardPreview, {
        useCORS: true, // Ensures external images load properly
        backgroundColor: null, // Makes transparent background
      });

      // Convert canvas to Base64 image
      const imageData = canvas.toDataURL("image/png");

      // Get the existing design data from localStorage
      let existingData =
        JSON.parse(localStorage.getItem("savedCardDesign")) || {};

      // Add new screenshot data to the existing data
      const updatedData = {
        ...existingData,
        image: imageData, // Add/Update Base64 image string
        name: document.getElementById("name-text").textContent,
        cardNumber: document.getElementById("card-number-text").textContent,
        date: document.getElementById("date-text").textContent,
      };

      // Save the updated data back to localStorage
      localStorage.setItem("savedCardDesign", JSON.stringify(updatedData));

      console.log("Screenshot Data:", updatedData);

      // Optional: Save the image locally as a download
      //   const link = document.createElement("a");
      //   link.href = imageData;
      //   link.download = "card-design.png";
      //   link.click();

      return { existingData, updatedData }; // Return both for further use
    } catch (error) {
      console.error("Error capturing screenshot:", error);
    }
  }

  // Add event listener for Save Design button
  saveDesignButton.addEventListener("click", async () => {
    disableAll(); // Disable interactions and update button states
    const screenshotData = await captureScreenshot(); // Capture the screenshot
  });

  // Add event listener for Edit Again button
  editAgainButton.addEventListener("click", () => {
    notification.remove(); // Custom notification removal (if applicable)
    enableAll(); // Re-enable interactions and reset button states
  });
});

// Function to apply the font from local storage
function applySavedFont() {
  const savedFont = localStorage.getItem("selectedFont");
  const fontPicker = document.getElementById("font-picker");

  if (savedFont) {
    fontPicker.value = savedFont; // Set the font picker to the saved font
    // Apply the saved font to the specific text elements
    nameText.style.fontFamily = savedFont;
    cardNumberText.style.fontFamily = savedFont;
    dateText.style.fontFamily = savedFont;
  } else {
    // Set default font to Bold if no font is saved
    const defaultFont = "Social Gothic DemiBold"; // Change this to your default font value
    fontPicker.value = defaultFont;
    // Apply the default font to the specific text elements
    nameText.style.fontFamily = defaultFont;
    cardNumberText.style.fontFamily = defaultFont;
    dateText.style.fontFamily = defaultFont;
  }
}