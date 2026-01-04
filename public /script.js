// const currentPath = window.location.pathname;

// const menuItems = document.querySelectorAll(".menu-item");
// menuItems.forEach((item) => {
//   item.addEventListener("click", () => {
//     console.log(item.getAttribute("href"));
//   });
// });
const currentPath = window.location.pathname;

const navlinkelem = document.querySelectorAll(".menu-item");
navlinkelem.forEach((navLink) => {
  const navlinkpathname = new URL(navLink.href).pathname;
  console.log(navlinkpathname);
  if (navlinkpathname === currentPath) {
    navLink.classList.add("active");
  }
});
