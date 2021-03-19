let html = document.getElementsByTagName('html')[0];
let navbar = document.getElementById('navbar');

let navbarButton = document.getElementById("hamburger-button")
let hamburgerIcon = document.querySelector(".hamburger");
let crossIcon = document.querySelector(".cross");

function changeNavbarBg() {
    window.addEventListener('scroll', () => {
        if (html.scrollTop > 150) {
            navbar.classList.remove('bg-dark-transparent-md')
        } else {
            navbar.classList.add('bg-dark-transparent-md');
        }
    })
}


changeNavbarBg();

navbarButton.addEventListener("click", () => {
    if (hamburgerIcon.classList.contains("d-none")) {
        hamburgerIcon.classList.remove("d-none");
        crossIcon.classList.add("d-none")
    } else {
        hamburgerIcon.classList.add("d-none");
        crossIcon.classList.remove("d-none")
    }
})


