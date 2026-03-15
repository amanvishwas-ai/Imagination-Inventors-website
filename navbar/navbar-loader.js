async function loadNavbar(){

  const res = await fetch("/navbar/navbar.html");
  document.getElementById("navbar-placeholder").innerHTML = await res.text();

  initNavbar();
}

function initNavbar(){

  const hamburger = document.querySelector("#hamburger");
  const navLinks = document.querySelector("#navLinks");
  const overlay = document.querySelector("#menuOverlay");

  hamburger.onclick = () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    overlay.classList.toggle("active");
  };

}

loadNavbar();