// const menuItems = document.querySelectorAll(".menu-item");
// const currentPath = window.location.pathname;
// menuItems.forEach((item) => {
//   const navnewpathname = new URL(item.href).pathname;
//   if (navnewpathname === currentPath) {
//     item.classList.add("active");
//   }
// });
// if you are using this method remove '/ from about.html ,projects.html otherwise use the above method
const menuItems = document.querySelectorAll(".menu-item");
const currentPage = window.location.pathname.split("/").pop() || "index.html";

menuItems.forEach((item) => {
  const href = item.getAttribute("href");
  console.log(`href is ${href}`);
  if (!href) return; // skip items like Services/Contact if no page yet

  // Home page special case
  if ((href === "/" && currentPage === "index.html") || href === currentPage) {
    item.classList.add("active");
  } else {
    item.classList.remove("active");
  }
});
console.log(currentPage);

// second method without using loop

// let activeItem = menuItems[0]; // default active

// menuItems.forEach(item => {
//   item.addEventListener('click', () => {
//     activeItem.classList.remove('border-blue-500', 'opacity-100');
//     activeItem.classList.add('border-transparent', 'opacity-50');

//     item.classList.add('border-blue-500', 'opacity-100');
//     item.classList.remove('border-transparent', 'opacity-50');

//     activeItem = item; // remember the new active one
//   });
// });
// const acc
// const header = document.querySelectorAll(".acc-header");
// console.log(header);

// header.forEach((item) => {
//   item.addEventListener("click", () => {
//     const contents = document.querySelectorAll(".acc_content");
//     const sibling = item.nextElementSibling.querySelector(".acc_content");
//     contents.forEach((content) => {
//       if (sibling !== content) {
//         content.classList.remove("max-h-[500px]");
//         content.classList.add("max-h-0");
//       }
//     });
//     if (sibling.classList.contains("max-h-0")) {
//       sibling.classList.remove("max-h-0");
//       sibling.classList.add("max-h-[500px]"); // Adjust height as needed
//     } else {
//       sibling.classList.remove("max-h-[500px]");
//       sibling.classList.add("max-h-0");
//     }
//   });
// });

// // ================================

// // const headers = document.querySelectorAll(".acc-header");

// // headers.forEach((item) => {
// //   item.addEventListener("click", () => {
// //     const contents = document.querySelectorAll(".acc_content");
// //     const sibling = item.nextElementSibling.querySelector(".acc_content");

// //     // Close all other contents
// //     contents.forEach((content) => {
// //       if (sibling !== content) {
// //         content.classList.remove("max-h-[500px]");
// //         content.classList.add("max-h-0");
// //       }
// //     });

// //     // Toggle the clicked one
// //     if (sibling.classList.contains("max-h-0")) {
// //       sibling.classList.remove("max-h-0");
// //       sibling.classList.add("max-h-[500px]");
// //     } else {
// //       sibling.classList.remove("max-h-[500px]");
// //       sibling.classList.add("max-h-0");
// //     }
// //   });
// // });

const headers = document.querySelectorAll(".acc-header");

headers.forEach((header) => {
  header.addEventListener("click", () => {
    const allContents = document.querySelectorAll(".acc_content");

    // Get the content div next to this header
    const content = header.nextElementSibling;

    headers.forEach((h) => {
      h.classList.remove("headerBlue");
    });
    header.classList.add("headerBlue");
    // Collapse all other contents and reset their headers to black
    allContents.forEach((c) => {
      if (c !== content) {
        c.style.maxHeight = null;
        const siblingHeader = c.previousElementSibling;
        siblingHeader.classList.remove("text-red-600");
      }
    });

    // Toggle this content
    if (content.style.maxHeight) {
      content.style.maxHeight = null; // collapse
      header.classList.remove("text-red-600"); // remove red when collapsed
    } else {
      content.style.maxHeight = content.scrollHeight + "px"; // expand
      header.classList.add("text-red-600"); // red while open
    }
  });
});

// testimonial
const carousel = document.getElementById("carousel");
const slides = document.querySelectorAll(".carousel-slide");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let index = 0;
const visibleSlides = 3;
const maxIndex = slides.length - visibleSlides;
let currentTranslate = 0;
let prevTranslate = 0;
let startX = 0;
let isDragging = false;

// Update carousel transform
function updateCarousel() {
  const slideWidth = slides[0].offsetWidth;
  currentTranslate = -index * slideWidth;
  prevTranslate = currentTranslate;
  carousel.style.transform = `translateX(${currentTranslate}px)`;
  updateButtons();
}

// Disable/Enable buttons
function updateButtons() {
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index >= maxIndex;
}

// Button Events
nextBtn.addEventListener("click", () => {
  if (index < maxIndex) index++;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  if (index > 0) index--;
  updateCarousel();
});

// Mouse drag
const container = document.querySelector(".carousel-container");

container.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX;
  carousel.classList.add("grabbing");
});

container.addEventListener("mousemove", (e) => {
  e.preventDefault();
  if (!isDragging) return;
  const diff = e.pageX - startX;
  carousel.style.transform = `translateX(${prevTranslate + diff}px)`;
});

container.addEventListener("mouseup", (e) => {
  if (!isDragging) return;
  isDragging = false;
  carousel.classList.remove("grabbing");

  const diff = e.pageX - startX;
  const slideWidth = slides[0].offsetWidth;

  if (diff < -slideWidth / 4 && index < maxIndex) index++;
  if (diff > slideWidth / 4 && index > 0) index--;

  updateCarousel();
});

container.addEventListener("mouseleave", () => {
  if (isDragging) {
    isDragging = false;
    carousel.classList.remove("grabbing");
    updateCarousel();
  }
});

window.addEventListener("resize", updateCarousel);

// Init
updateCarousel();
