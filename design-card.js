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
    if (selectedPreview === "Amex") {
      cardFrontBackground.src = "images/americanExpress.jpeg";
      cardBackBackground.src = "images/american-express-back.jpg";
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
});

// Update name text from input field with uppercase
nameInput.addEventListener("input", (event) => {
  const upperCaseValue = event.target.value.toUpperCase();
  event.target.value = upperCaseValue; // Update input field
  nameText.textContent = upperCaseValue || "YOUR NAME";
});

// Update card number text with formatting XXXX XXXX XXXX XXXX
cardNumberInput.addEventListener("input", (event) => {
  let value = event.target.value.replace(/\D/g, ""); // Remove non-digits
  if (value.length > 16) value = value.slice(0, 16); // Limit to 16 digits

  // Add spaces every 4 digits
  const formatted = value.replace(/(\d{4})/g, "$1 ").trim();
  event.target.value = formatted;
  cardNumberText.textContent = formatted || "XXXX XXXX XXXX XXXX";

  if (showCardNumber.checked) {
    validateCardNumber();
  }
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
    }

    value = month + (year.length ? "/" + year : "");
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
dateInput.setAttribute("maxlength", "5"); // MM/YY = 5 characters

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

// Add these event listeners
showCardNumber.addEventListener("change", (e) => {
  cardNumberInput.disabled = !e.target.checked;
  cardNumberText.style.display = e.target.checked ? "block" : "none";
  if (!e.target.checked) {
    cardNumberInput.value = "";
    cardNumberText.textContent = "XXXX XXXX XXXX XXXX";
    cardNumberInput.style.borderColor = "#ccc";
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

// Function to disable editing
function disableEditing() {
  // Disable input fields
  const inputs = document.querySelectorAll("input, select");
  inputs.forEach((input) => {
    input.disabled = true;
  });

  // Disable the save button
  const saveButton = document.getElementById("save-preview");
  saveButton.disabled = true; // Disable the button
  saveButton.classList.add("controls-disabled"); // Add the disabled class for styling

  // Disable image modifications
  imageOverlayFront.style.pointerEvents = "none";
  imageOverlayBack.style.pointerEvents = "none";

  // Add class to change styles
  const controls = document.getElementById("controls");
  controls.classList.add("controls-disabled");

  // Show notification
  const notification = document.createElement("div");
  notification.id = "notification";
  notification.innerHTML = `
        <h2>Preview saved!</h2>
        <p>Please take a screenshot.</p>
        <button id="cancel-edit">Edit Again <i class="fa-solid fa-circle-xmark fa-lg"></i> </button>
    `;
  controls.appendChild(notification); // Append to controls

  // Make the notification centered
  notification.style.position = "absolute"; // Keep it absolute
  notification.style.top = "50%"; // Center vertically
  notification.style.left = "50%"; // Center horizontally
  notification.style.transform = "translate(-50%, -50%)"; // Adjust for centering
  notification.style.zIndex = "2000"; // Ensure it stays on top
  notification.style.textAlign = "center"; // Center text inside the notification

  // Add event listener to cancel button
  const cancelButton = document.getElementById("cancel-edit");
  cancelButton.addEventListener("click", enableEditing);
}

// Function to enable editing
function enableEditing() {
  // Enable input fields
  const inputs = document.querySelectorAll("input, select");
  inputs.forEach((input) => {
    input.disabled = false;
  });

  // Enable the save button
  const saveButton = document.getElementById("save-preview");
  saveButton.disabled = false; // Enable the button
  saveButton.classList.remove("controls-disabled"); // Remove the disabled class for styling

  // Enable image modifications
  imageOverlayFront.style.pointerEvents = "auto";
  imageOverlayBack.style.pointerEvents = "auto";

  // Remove class to revert styles
  const controls = document.getElementById("controls");
  controls.classList.remove("controls-disabled");

  // Remove notification
  const notification = document.getElementById("notification");
  if (notification) {
    controls.removeChild(notification); // Remove from controls
  }
}
// Function to handle toggle changes
function handleToggles(event) {
  const premadeToggle = document.getElementById("premade-toggle");
  const selfDesignedToggle = document.getElementById("preview-toggle");
  const designerMadeToggle = document.getElementById("designer-made-toggle");
  const premadeDesignDropdown = document.getElementById("premade-design");
  const frontDesignUpload = document.getElementById("design-attachment-front");
  const backDesignUpload = document.getElementById("design-attachment-back");
  const contactButtons1 = document.getElementById("contact-1");
  const contactButtons2 = document.getElementById("contact-2");
  const backgroundSelect = document.getElementById("background-select"); // Assuming you have a dropdown for colors

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
    breakdownHTML = '<div class="breakdown-item">Please select a card color</div>';
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
