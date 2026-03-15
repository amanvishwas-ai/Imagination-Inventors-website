async function loadFooter() {

  const response = await fetch("/footer/footer.html");
  const html = await response.text();

  document.getElementById("footer-placeholder").innerHTML = html;

}

loadFooter();