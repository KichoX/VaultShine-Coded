// Get the quantity input and buttons
const numberInput = document.getElementById("number-input");
const incrementBtn = document.getElementById("increment-btn");
const decrementBtn = document.getElementById("decrement-btn");
const amountValue = document.getElementById("amount-value");

// Get saved design data
const savedDesign = localStorage.getItem("savedCardDesign");
let baseAmount = 0;
let designFee = 0;

if (savedDesign) {
  const design = JSON.parse(savedDesign);

  // Extract base color price
  if (design.backgroundColor === "gold") {
    baseAmount = 2999;
  } else {
    baseAmount = 2499;
  }

  // Add flat design fee if applicable
  if (design.isSelfDesigned) {
    designFee = 600;
  } else if (design.isDesignerMade) {
    designFee = 1000;
  }

  // Update initial amount display
  updateTotalAmount();
}

// Initialize input value
numberInput.value = 1;

// Simple increment function
incrementBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let currentValue = parseInt(numberInput.value) || 1;
  numberInput.value = currentValue + 1;
  updateTotalAmount();
});

// Simple decrement function
decrementBtn.addEventListener("click", function (e) {
  e.preventDefault();
  let currentValue = parseInt(numberInput.value) || 1;
  if (currentValue > 1) {
    numberInput.value = currentValue - 1;
    updateTotalAmount();
  }
});

// Handle manual input
numberInput.addEventListener("input", function () {
  let value = parseInt(numberInput.value) || 1;
  if (value < 1) value = 1;
  numberInput.value = value;
  updateTotalAmount();
});

// Function to update total amount based on quantity
function updateTotalAmount() {
  const quantity = parseInt(numberInput.value) || 1;
  // Multiply only the base amount by quantity, then add the flat design fee
  const totalAmount = baseAmount * quantity + designFee;
  amountValue.textContent = `${totalAmount} MKD`;
}

// Add validation function
function isOrderFormValid() {
  const name = document.getElementById("name").value.trim();
  const surname = document.getElementById("surname").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const city = document.getElementById("city").value;

  // Check if any field is empty
  if (!name || !surname || !email || !phone || !address || !city) {
    return false;
  }

  // Basic email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return false;
  }

  return true;
}

// Function to update submit button state
function updateSubmitButtonState() {
  const submitButton = document.getElementById("submit-order");
  if (isOrderFormValid()) {
    submitButton.disabled = false;
    submitButton.style.opacity = "1";
    submitButton.style.cursor = "pointer";
  } else {
    submitButton.disabled = true;
    submitButton.style.opacity = "0.5";
    submitButton.style.cursor = "not-allowed";
  }
}

// Add event listeners to all form inputs
document
  .getElementById("name")
  .addEventListener("input", updateSubmitButtonState);
document
  .getElementById("surname")
  .addEventListener("input", updateSubmitButtonState);
document
  .getElementById("email")
  .addEventListener("input", updateSubmitButtonState);
document
  .getElementById("phone")
  .addEventListener("input", updateSubmitButtonState);
document
  .getElementById("address")
  .addEventListener("input", updateSubmitButtonState);
document
  .getElementById("city")
  .addEventListener("change", updateSubmitButtonState);

// Update submit button state on page load
document.addEventListener("DOMContentLoaded", updateSubmitButtonState);

// Handle order submission and modal display
document.getElementById("submit-order").addEventListener("click", function (e) {
  e.preventDefault();

  if (!isOrderFormValid()) {
    return;
  }

  if (savedDesign) {
    const design = JSON.parse(savedDesign);

    // Populate confirmation modal with saved design details
    document.getElementById("confirm-color").textContent =
      design.backgroundColor;
    document.getElementById("confirm-quantity").textContent = numberInput.value;

    // Set design type
    let designType = "Unknown";
    if (design.isPremadeDesign) {
      designType = "Premade Design";
      document.getElementById("confirm-design-name").style.display = "block";
      document.getElementById("confirm-design-name-value").textContent =
        design.premadeDesign;
    } else if (design.isSelfDesigned) {
      designType = "Self Designed";
      document.getElementById("confirm-design-name").style.display = "none";
    } else if (design.isDesignerMade) {
      designType = "Designer Made";
      document.getElementById("confirm-design-name").style.display = "none";
    }
    document.getElementById("confirm-design").textContent = designType;

    // Set order details
    document.getElementById("confirm-name").textContent =
      document.getElementById("name").value;
    document.getElementById("confirm-surname").textContent =
      document.getElementById("surname").value;
    document.getElementById("confirm-email").textContent =
      document.getElementById("email").value;
    document.getElementById("confirm-phone").textContent =
      document.getElementById("phone").value;
    document.getElementById("confirm-address").textContent =
      document.getElementById("address").value;
    document.getElementById("confirm-city").textContent =
      document.getElementById("city").value;

    // Update total amount in modal using the new ID
    document.getElementById("confirm-amount").textContent =
      amountValue.textContent;

    // Show the modal
    document.getElementById("confirmation-modal").style.display = "flex";
  }
});

// Handle modal close button
document
  .getElementById("close-confirmation")
  .addEventListener("click", function () {
    document.getElementById("confirmation-modal").style.display = "none";
  });

// Handle order confirmation
document.getElementById("confirm-order").addEventListener("click", function () {
  alert("Order confirmed! Thank you for your purchase.");
  document.getElementById("confirmation-modal").style.display = "none";
  // Here you could add code to submit the order to a server
});
