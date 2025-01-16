const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}


// when we click on hamburger icon its close 

const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}



document.querySelectorAll(".card-wrapper").forEach((wrapper) => {
    const card = wrapper.querySelector(".card");
    const cursive = wrapper.querySelector(".cursive");

    card.addEventListener("mousemove", function(e) {
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left - rect.width / 2;
        let y = e.clientY - rect.top - rect.height / 2;
        card.style.transform = `rotateX(${-y / 10}deg) rotateY(${x / 10}deg)`;

        cursive.style.display = "block";
        const wrapperRect = wrapper.getBoundingClientRect();
        let cursiveX = e.clientX - wrapperRect.left - cursive.offsetWidth / 2;
        let cursiveY = e.clientY - wrapperRect.top - cursive.offsetHeight / 2;
        cursive.style.transform = `translate(${cursiveX}px, ${cursiveY}px)`;
    });

    card.addEventListener("mouseleave", function() {
        card.style.transform = `rotateX(0) rotateY(0)`;
        cursive.style.display = "none";
    });
});

// Sound play functionality
function playSound() {
    const audio = new Audio('card.m4a'); // Make sure you replace 'sound.mp3' with the correct path to your sound file
    audio.play();
}
