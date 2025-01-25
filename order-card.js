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

    // Add the blurred class to the order card section
    document.getElementById("order-card-section").classList.add("blurred");
  }
});

// Handle modal close button
document
  .getElementById("close-confirmation")
  .addEventListener("click", function () {
    document.getElementById("confirmation-modal").style.display = "none";

    // Remove the blurred class from the order card section
    document.getElementById("order-card-section").classList.remove("blurred");
  });

// Handle order confirmation
document.getElementById("confirm-order").addEventListener("click", function () {
  document.getElementById("confirmation-modal").style.display = "none";

  // Remove the blurred class from the order card section
  document.getElementById("order-card-section").classList.remove("blurred");
});

// Retrieve saved design data
const savedDesignData = localStorage.getItem("savedCardDesign");

if (savedDesignData) {
  const design = JSON.parse(savedDesignData);

  // Extract screenshot details
  const { image } = design;

  // Example: Display the screenshot in the confirmation modal
  const screenshotPreview = document.createElement("img");
  screenshotPreview.src = image;
  screenshotPreview.alt = "Saved Card Design";
  document.getElementById("content-images").appendChild(screenshotPreview);
}

// Assuming you have the modal image with a specific ID or class
const seeDesignedButton = document.getElementById("see-designed-button");
const modalImage = document.querySelector(".modal img"); // Adjust the selector if needed
const modalPage = document.querySelector(".modal");

// Initialize the image display to none

seeDesignedButton.addEventListener("click", () => {
  // Toggle the display property of the modal image
  if (modalImage.style.display === "block") {
    modalImage.style.display = "none"; // Hide the image
    modalPage.style.top = "0"; // Reset top position
  } else {
    modalImage.style.display = "block"; // Show the image

    // Check if the window width is less than or equal to 768px (mobile view)
    if (window.innerWidth <= 768) {
      modalPage.style.top = "200px"; // Adjust top position for mobile view
    }
  }
});

// Function to compress an image and ensure the right format and size
function compressImage(
  base64Image,
  maxWidth,
  maxHeight,
  maxSizeKB = 50,
  isPreviewImage = false
) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Image;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      // Maintain aspect ratio
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height);
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);

      // Compress the image based on whether it's a preview or not
      let compressedImage;
      if (isPreviewImage) {
        // For the preview image, convert it to JPEG format
        compressedImage = canvas.toDataURL("image/jpeg", 0.8); // You can tweak the quality (0.8) as needed
      } else {
        // For front and back images, keep PNG format
        compressedImage = canvas.toDataURL("image/png");
      }

      // Check the image size and adjust if it exceeds the limit
      const checkImageSize = () => {
        const sizeKB = (compressedImage.length * 3) / 1024; // Size in KB
        if (sizeKB > maxSizeKB) {
          // Reduce image quality by reducing dimensions further if over the size limit
          width = Math.round(width * 0.8);
          height = Math.round(height * 0.8);
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          compressedImage = isPreviewImage
            ? canvas.toDataURL("image/jpeg", 0.8)
            : canvas.toDataURL("image/png");
          checkImageSize(); // Recheck after resizing
        } else {
          resolve(compressedImage); // If under limit, resolve the promise
        }
      };

      checkImageSize(); // Start checking the size
    };
  });
}

// Function to send order email
function sendOrderEmail(
  clientName,
  email,
  phone,
  address,
  city,
  cardColor,
  font,
  cardName,
  cardNumber,
  date,
  isPremade,
  premadeDesignSelected,
  designType,
  message,
  previewImage,
  frontImage,
  backImage
) {
  // Prepare the email data
  const emailData = {
    clientName: clientName,
    email: email,
    phone: phone,
    address: address,
    city: city,
    cardColor: cardColor, // Include card color
    font: font, // Include font
    cardName: cardName, // Include card name
    cardNumber: cardNumber, // Include card number
    date: date, // Include date
    isPremade: isPremade ? "Yes" : "No", // Include isPremade status
    premadeDesignSelected: premadeDesignSelected, // Include premade design
    designType: designType, // Include the design type
    message: message, // Include the message
    previewImage: previewImage || "", // Add compressed preview image if available
    frontImage: frontImage || "", // Add compressed front image if available
    backImage: backImage || "", // Add compressed back image if available
  };

  // Log the message being sent
  console.log("Sending email with the following data:", emailData);

  // Send email using EmailJS
  emailjs.send("service_slcrgms", "template_zkxai0r", emailData).then(
    (response) => {
      console.log("Email sent successfully!", response.status, response.text);
      alert("Your order has been submitted!");
    },
    (error) => {
      console.error("Error sending email:", error);
      alert("There was a problem sending your order.");
    }
  );
}

// Handle order confirmation
document.getElementById("confirm-order").addEventListener("click", function () {
  const clientName = `${document.getElementById("name").value} ${
    document.getElementById("surname").value
  }`;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;

  // Retrieve saved design data
  const savedDesignData = localStorage.getItem("savedCardDesign");

  if (savedDesignData) {
    const design = JSON.parse(savedDesignData);

    // Extract relevant details from the design object
    const cardColor = design.backgroundColor;
    const font = design.fontStyle;
    const cardName = design.name;
    const cardNumber = design.cardNumber;
    const date = design.expiryDate;
    const isPremade = design.isPremadeDesign;
    const premadeDesignSelected = design.premadeDesign;
    const designType = isPremade
      ? "Premade Design"
      : design.isSelfDesigned
      ? "Self Designed"
      : design.isDesignerMade
      ? "Designer Made"
      : "Unknown";

    const previewImage = design.image;
    const frontImage = design.frontImage?.src;
    const backImage = design.backImage?.src;

    // Prepare the message with the design details
    const message = `
            Order Details:

            Card Color: ${cardColor}
            Font: ${font}
            Card Name: ${cardName}
            Card Number: ${cardNumber}
            Date: ${date}
            Is Premade: ${isPremade ? "Yes" : "No"}
            ${
              premadeDesignSelected
                ? `Premade Design Selected: ${premadeDesignSelected}`
                : "Premade Design Selected: No Design"
            }
            Design Type: ${designType}
          `;

    // Compress all images and send the email
    Promise.all([
      previewImage ? compressImage(previewImage, 800, 800, 50, true) : null,
      frontImage ? compressImage(frontImage, 800, 800, 50) : null,
      backImage ? compressImage(backImage, 800, 800, 50) : null,
    ]).then(
      ([compressedPreviewImage, compressedFrontImage, compressedBackImage]) => {
        sendOrderEmail(
          clientName,
          email,
          phone,
          address,
          city,
          cardColor,
          font,
          cardName,
          cardNumber,
          date,
          isPremade,
          premadeDesignSelected,
          designType,
          message,
          compressedPreviewImage,
          compressedFrontImage,
          compressedBackImage
        );
      }
    );
  }
});

// // Function to compress an image
// function compressImage(base64Image, maxWidth, maxHeight, quality = 0.7) {
//   return new Promise((resolve) => {
//     const img = new Image();
//     img.src = base64Image;
//     img.onload = () => {
//       const canvas = document.createElement("canvas");
//       let width = img.width;
//       let height = img.height;

//       // Maintain aspect ratio
//       if (width > maxWidth) {
//         height = Math.round((height * maxWidth) / width);
//         width = maxWidth;
//       }
//       if (height > maxHeight) {
//         width = Math.round((width * maxHeight) / height);
//         height = maxHeight;
//       }

//       canvas.width = width;
//       canvas.height = height;

//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(img, 0, 0, width, height);

//       // Compress the image to a data URL
//       resolve(canvas.toDataURL("image/jpeg", quality));
//     };
//   });
// }

// // Function to send order email
// function sendOrderEmail(
//   clientName,
//   email,
//   phone,
//   address,
//   city,
//   cardColor,
//   font,
//   cardName,
//   cardNumber,
//   date,
//   isPremade,
//   premadeDesignSelected,
//   designType,
//   message,
//   frontImage,
//   backImage
// ) {
//   // Prepare the email data
//   const emailData = {
//     clientName: clientName,
//     email: email,
//     phone: phone,
//     address: address,
//     city: city,
//     cardColor: cardColor, // Include card color
//     font: font, // Include font
//     cardName: cardName, // Include card name
//     cardNumber: cardNumber, // Include card number
//     date: date, // Include date
//     isPremade: isPremade ? "Yes" : "No", // Include isPremade status
//     premadeDesignSelected: premadeDesignSelected, // Include premade design
//     designType: designType, // Include the design type
//     message: message, // Include the message
//     frontImage: frontImage || "", // Add compressed front image if available
//     backImage: backImage || "", // Add compressed back image if available
//   };

//   // Log the message being sent
//   console.log("Sending email with the following data:", emailData);

//   // Send email using EmailJS
//   emailjs.send("service_slcrgms", "template_zkxai0r", emailData).then(
//     (response) => {
//       console.log("Email sent successfully!", response.status, response.text);
//       alert("Your order has been submitted!");
//     },
//     (error) => {
//       console.error("Error sending email:", error);
//       alert("There was a problem sending your order.");
//     }
//   );
// }

// // Handle order confirmation
// document.getElementById("confirm-order").addEventListener("click", function () {
//   const clientName = `${document.getElementById("name").value} ${
//     document.getElementById("surname").value
//   }`;
//   const email = document.getElementById("email").value;
//   const phone = document.getElementById("phone").value;
//   const address = document.getElementById("address").value;
//   const city = document.getElementById("city").value;

//   // Retrieve saved design data
//   const savedDesignData = localStorage.getItem("savedCardDesign");

//   if (savedDesignData) {
//     const design = JSON.parse(savedDesignData);

//     // Extract relevant details from the design object
//     const cardColor = design.backgroundColor;
//     const font = design.fontStyle;
//     const cardName = design.name;
//     const cardNumber = design.cardNumber;
//     const date = design.expiryDate;
//     const isPremade = design.isPremadeDesign;
//     const premadeDesignSelected = design.premadeDesign;
//     const designType = isPremade
//       ? "Premade Design"
//       : design.isSelfDesigned
//       ? "Self Designed"
//       : design.isDesignerMade
//       ? "Designer Made"
//       : "Unknown";

//     const message = `
//         Order Details:

//         Card Color: ${cardColor}
//         Font: ${font}
//         Card Name: ${cardName}
//         Card Number: ${cardNumber}
//         Date: ${date}
//         Is Premade: ${isPremade ? "Yes" : "No"}
//         ${
//           premadeDesignSelected
//             ? `Premade Design Selected: ${premadeDesignSelected}`
//             : "Premade Design Selected: No Design"
//         }
//         Design Type: ${designType}
//       `;

//     // Handle image compression based on design type
//     if (designType === "Self Designed") {
//       const frontImage = design.frontImage?.src;
//       const backImage = design.backImage?.src;

//       Promise.all([
//         frontImage ? compressImage(frontImage, 800, 800) : null,
//         backImage ? compressImage(backImage, 800, 800) : null,
//       ]).then(([compressedFrontImage, compressedBackImage]) => {
//         sendOrderEmail(
//           clientName,
//           email,
//           phone,
//           address,
//           city,
//           cardColor,
//           font,
//           cardName,
//           cardNumber,
//           date,
//           isPremade,
//           premadeDesignSelected,
//           designType,
//           message,
//           compressedFrontImage,
//           compressedBackImage
//         );
//       });
//     } else {
//       // Only include the premade design preview
//       sendOrderEmail(
//         clientName,
//         email,
//         phone,
//         address,
//         city,
//         cardColor,
//         font,
//         cardName,
//         cardNumber,
//         date,
//         isPremade,
//         premadeDesignSelected,
//         designType,
//         message,
//         null,
//         null
//       );
//     }
//   }
// });

// function compressImage(base64Image, maxWidth, maxHeight, quality = 0.7) {
//   return new Promise((resolve) => {
//     const img = new Image();
//     img.src = base64Image;
//     img.onload = () => {
//       const canvas = document.createElement("canvas");
//       let width = img.width;
//       let height = img.height;

//       // Maintain aspect ratio
//       if (width > maxWidth) {
//         height = Math.round((height * maxWidth) / width);
//         width = maxWidth;
//       }
//       if (height > maxHeight) {
//         width = Math.round((width * maxHeight) / height);
//         height = maxHeight;
//       }

//       canvas.width = width;
//       canvas.height = height;

//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(img, 0, 0, width, height);

//       // Compress the image to a data URL
//       resolve(canvas.toDataURL("image/jpeg", quality));
//     };
//   });
// }

// function sendOrderEmail(
//   clientName,
//   email,
//   phone,
//   address,
//   city,
//   cardColor,
//   font,
//   cardName,
//   cardNumber,
//   date,
//   isPremade,
//   premadeDesignSelected,
//   designType,
//   message,
//   image
// ) {
//   // Prepare the email data
//   const emailData = {
//     clientName: clientName,
//     email: email,
//     phone: phone,
//     address: address,
//     city: city,
//     cardColor: cardColor, // Include card color
//     font: font, // Include font
//     cardName: cardName, // Include card name
//     cardNumber: cardNumber, // Include card number
//     date: date, // Include date
//     isPremade: isPremade ? "Yes" : "No", // Include isPremade status
//     premadeDesignSelected: premadeDesignSelected, // Include premade design
//     designType: designType, // Include the design type
//     message: message, // Include the message
//     image: image, // Add compressed image
//   };

//   // Log the message being sent
//   console.log("Sending email with the following data:", emailData);

//   // Send email using EmailJS
//   emailjs.send("service_slcrgms", "template_zkxai0r", emailData).then(
//     (response) => {
//       console.log("Email sent successfully!", response.status, response.text);
//       alert("Your order has been submitted!");
//     },
//     (error) => {
//       console.error("Error sending email:", error);
//       alert("There was a problem sending your order.");
//     }
//   );
// }

// // Handle order confirmation
// document.getElementById("confirm-order").addEventListener("click", function () {
//   const clientName = `${document.getElementById("name").value} ${
//     document.getElementById("surname").value
//   }`;
//   const email = document.getElementById("email").value;
//   const phone = document.getElementById("phone").value;
//   const address = document.getElementById("address").value;
//   const city = document.getElementById("city").value;

//   // Retrieve saved design data
//   const savedDesignData = localStorage.getItem("savedCardDesign");

//   if (savedDesignData) {
//     const design = JSON.parse(savedDesignData);

//     // Extract relevant details from the design object
//     const cardColor = design.backgroundColor;
//     const font = design.fontStyle;
//     const cardName = design.name;
//     const cardNumber = design.cardNumber;
//     const date = design.expiryDate;
//     const isPremade = design.isPremadeDesign;
//     const premadeDesignSelected = design.premadeDesign;
//     const designType = isPremade
//       ? "Premade Design"
//       : design.isSelfDesigned
//       ? "Self Designed"
//       : design.isDesignerMade
//       ? "Designer Made"
//       : "Unknown";
//     const image = design.image;

//     // Prepare the message with the design details
//     const message = `
//             Order Details:

//             Card Color: ${cardColor}
//             Font: ${font}
//             Card Name: ${cardName}
//             Card Number: ${cardNumber}
//             Date: ${date}
//             Is Premade: ${isPremade ? "Yes" : "No"}
//             ${
//               premadeDesignSelected
//                 ? `Premade Design Selected: ${premadeDesignSelected}`
//                 : "Premade Design Selected: No Design"
//             }
//             Design Type: ${designType}
//           `;

//     // Compress the image and send the email
//     compressImage(image, 800, 800).then((compressedImage) => {
//       sendOrderEmail(
//         clientName,
//         email,
//         phone,
//         address,
//         city,
//         cardColor,
//         font,
//         cardName,
//         cardNumber,
//         date,
//         isPremade,
//         premadeDesignSelected,
//         designType,
//         message,
//         compressedImage
//       );
//     });
//   }
// });
