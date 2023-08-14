// Function to duplicate and fix the header
function duplicateAndFixHeader() {
  const originalHeader = document.querySelector('header');
  const clonedHeader = originalHeader.cloneNode(true);
  clonedHeader.classList.add('fixed-header');

  // Set the height of the original header to avoid content shifting
  originalHeader.style.height = originalHeader.offsetHeight + 'px';

  // Add the cloned header right after the original header in the DOM
  originalHeader.parentNode.insertBefore(clonedHeader, originalHeader.nextSibling);

  // Function to check scroll position and toggle the fixed header visibility
  function toggleFixedHeader() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 0) {
      clonedHeader.style.display = 'flex';
    } else {
      clonedHeader.style.display = 'none';
    }
  }

  // Call the toggle function on page load and scroll events
  toggleFixedHeader();
  window.addEventListener('scroll', toggleFixedHeader);
}

// Function to handle smooth scrolling to sections
function handleSectionScroll(event) {
  event.preventDefault();

  // Get the target section based on the clicked link's href
  const href = event.currentTarget.getAttribute('href');
  const targetSection = document.querySelector(href);

  // Get the height of both the original and cloned headers
  const originalHeader = document.querySelector('header');
  const clonedHeader = document.querySelector('.fixed-header');
  const originalHeaderHeight = originalHeader.getBoundingClientRect().height;
  const clonedHeaderHeight = clonedHeader.getBoundingClientRect().height;

  // Calculate the target scroll position
  let targetScrollPosition = targetSection.offsetTop;

  // Check if the original header is visible and adjust the scroll position accordingly
  if (originalHeader.style.display !== 'none') {
    targetScrollPosition -= originalHeaderHeight;
  } else {
    targetScrollPosition -= clonedHeaderHeight;
  }

  // Perform smooth scroll to the target section
  window.scrollTo({
    top: targetScrollPosition,
    behavior: 'smooth'
  });
}

// Call the function once the document has loaded
document.addEventListener('DOMContentLoaded', function () {
  duplicateAndFixHeader();

  // Attach click event listeners to header links
  const navLinks = document.querySelectorAll('header nav ul li a');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#') && href !== '#gallery') {
      link.addEventListener('click', handleSectionScroll);
    }
  });
  

  const clonedNavLinks = document.querySelectorAll('.fixed-header nav ul li a');
  clonedNavLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#') && href !== '#gallery') {
      link.addEventListener('click', handleSectionScroll);
    }
  });
  

  // Add hamburger menu functionality
  function toggleMobileMenu() {
  const menuList = document.getElementById("hamburger-links");
  menuList.style.display = menuList.style.display === "block" ? "none" : "block";
}
  
  // Attach click event listener to the hamburger icon
  const hamburgerIcon = document.querySelector('.hamburger-icon');
  hamburgerIcon.addEventListener('click', toggleMobileMenu);
  

  // Function to close the mobile menu when a link is clicked
  function closeMobileMenu() {
    const menuList = document.querySelector('hamburger-links');
    menuList.classList.remove('show');
  
    // Show the header links in the header after closing the mobile menu
    const headerLinks = document.querySelector('header nav');
    headerLinks.style.display = 'flex';
  }

  
  // Attach click event listeners to header links in the mobile menu
  const navLinksMobile = document.querySelectorAll('.menu-list ul li a');
  navLinksMobile.forEach(link => {
    link.addEventListener('click', function (event) {
      handleSectionScroll(event);
      closeMobileMenu();
    });
  });

  // Handle window resize event
  window.addEventListener('resize', function () {
    const originalHeader = document.querySelector('header');
    originalHeader.style.height = originalHeader.offsetHeight + 'px';
  });
});
