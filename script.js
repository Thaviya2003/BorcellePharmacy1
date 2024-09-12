const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");
const buttons = document.querySelectorAll('.button-container button');
const hamburger = document.querySelector(".hamburger");


hamburger.addEventListener('click', ()=>{
   //Animate Links
    navLinks.classList.toggle("open");
    links.forEach(link => {
        link.classList.toggle("fade");
    });

    //Hamburger Animation
    hamburger.classList.toggle("toggle");
});
