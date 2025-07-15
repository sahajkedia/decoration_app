// Mobile Menu Toggle
document.addEventListener("DOMContentLoaded", function () {
	const hamburger = document.querySelector(".hamburger");
	const navMenu = document.querySelector(".nav-menu");
	const navLinks = document.querySelectorAll(".nav-menu a");

	// Toggle mobile menu
	hamburger.addEventListener("click", function () {
		navMenu.classList.toggle("active");
		hamburger.classList.toggle("active");
	});

	// Close menu when clicking on a link
	navLinks.forEach((link) => {
		link.addEventListener("click", function () {
			navMenu.classList.remove("active");
			hamburger.classList.remove("active");
		});
	});

	// Close menu when clicking outside
	document.addEventListener("click", function (event) {
		if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
			navMenu.classList.remove("active");
			hamburger.classList.remove("active");
		}
	});

	// Prevent scrolling when menu is open on mobile
	const body = document.body;
	const originalStyle = window.getComputedStyle(body).overflow;

	hamburger.addEventListener("click", function () {
		if (navMenu.classList.contains("active")) {
			body.style.overflow = "hidden";
		} else {
			body.style.overflow = originalStyle;
		}
	});

	// Close menu on orientation change
	window.addEventListener("orientationchange", function () {
		navMenu.classList.remove("active");
		hamburger.classList.remove("active");
		body.style.overflow = originalStyle;
	});

	// Handle viewport height changes on mobile
	function setViewportHeight() {
		const vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty("--vh", `${vh}px`);
	}

	setViewportHeight();
	window.addEventListener("resize", setViewportHeight);
	window.addEventListener("orientationchange", function () {
		setTimeout(setViewportHeight, 100);
	});
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute("href"));
		if (target) {
			const headerOffset = 100;
			const elementPosition = target.offsetTop;
			const offsetPosition = elementPosition - headerOffset;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});
		}
	});
});

// Header background change on scroll
window.addEventListener("scroll", function () {
	const header = document.querySelector(".header");
	if (window.scrollY > 100) {
		header.style.background =
			"linear-gradient(135deg, rgba(255, 107, 107, 0.95), rgba(238, 90, 36, 0.95), rgba(254, 202, 87, 0.95), rgba(72, 202, 228, 0.95))";
	} else {
		header.style.background =
			"linear-gradient(135deg, #ff6b6b, #ee5a24, #feca57, #48cae4)";
	}
});

// Contact form handling removed - Only phone and WhatsApp contact methods available

// Animate stats on scroll
function animateStats() {
	const stats = document.querySelectorAll(".stat-number");
	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const target = entry.target;
				const finalValue = parseInt(target.textContent);
				let currentValue = 0;
				const increment = finalValue / 50;

				const timer = setInterval(() => {
					currentValue += increment;
					if (currentValue >= finalValue) {
						currentValue = finalValue;
						clearInterval(timer);
					}
					target.textContent = Math.floor(currentValue) + "+";
				}, 50);

				observer.unobserve(target);
			}
		});
	});

	stats.forEach((stat) => {
		observer.observe(stat);
	});
}

// Initialize stats animation
animateStats();

// Gallery image modal (optional enhancement)
function initializeGallery() {
	const galleryItems = document.querySelectorAll(".gallery-item");

	galleryItems.forEach((item) => {
		item.addEventListener("click", function () {
			const img = this.querySelector("img");
			const modal = document.createElement("div");
			modal.className = "image-modal";
			modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${img.src}" alt="${img.alt}">
                    <div class="modal-caption">
                        <h3>${
													this.querySelector(".gallery-overlay h3").textContent
												}</h3>
                        <p>${
													this.querySelector(".gallery-overlay p").textContent
												}</p>
                    </div>
                </div>
            `;

			document.body.appendChild(modal);

			// Close modal
			modal
				.querySelector(".close-modal")
				.addEventListener("click", function () {
					document.body.removeChild(modal);
				});

			modal.addEventListener("click", function (e) {
				if (e.target === modal) {
					document.body.removeChild(modal);
				}
			});
		});
	});
}

// Initialize gallery
initializeGallery();

// Add CSS for modal
const modalCSS = `
    .image-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        backdrop-filter: blur(10px);
    }
    
    .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        background: white;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    }
    
    .modal-content img {
        width: 100%;
        height: auto;
        max-height: 70vh;
        object-fit: cover;
    }
    
    .close-modal {
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 30px;
        color: white;
        cursor: pointer;
        background: rgba(0, 0, 0, 0.5);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        transition: background 0.3s ease;
    }
    
    .close-modal:hover {
        background: rgba(0, 0, 0, 0.8);
    }
    
    .modal-caption {
        padding: 20px;
        text-align: center;
    }
    
    .modal-caption h3 {
        margin: 0 0 10px 0;
        color: #333;
    }
    
    .modal-caption p {
        margin: 0;
        color: #666;
    }
`;

// Add modal styles to head
const styleSheet = document.createElement("style");
styleSheet.textContent = modalCSS;
document.head.appendChild(styleSheet);

// Add loading animation for images
function addImageLoadingAnimation() {
	const images = document.querySelectorAll("img");

	images.forEach((img) => {
		img.addEventListener("load", function () {
			this.style.opacity = "1";
		});

		// Set initial opacity
		img.style.opacity = "0";
		img.style.transition = "opacity 0.3s ease";
	});
}

// Initialize image loading
addImageLoadingAnimation();

// Add scroll animations for sections
function addScrollAnimations() {
	const sections = document.querySelectorAll("section");

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.style.animation = "fadeInUp 0.8s ease forwards";
				}
			});
		},
		{
			threshold: 0.1,
		}
	);

	sections.forEach((section) => {
		observer.observe(section);
	});
}

// Add CSS for scroll animations
const scrollAnimationCSS = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Add scroll animation styles
const scrollStyleSheet = document.createElement("style");
scrollStyleSheet.textContent = scrollAnimationCSS;
document.head.appendChild(scrollStyleSheet);

// Initialize scroll animations
addScrollAnimations();

// Preload images for better performance
function preloadImages() {
	const imageUrls = [
		"https://www.balloondecorationnoida.in/uploads/products/1695364845.jpeg",
		"https://www.balloondecorationnoida.in/uploads/products/1695365708.jpg",
		"https://www.balloondecorationnoida.in/uploads/products/1695366234.jpeg",
		"https://www.balloondecorationnoida.in/uploads/products/1695366675.jpg",
		"https://www.balloondecorationnoida.in/uploads/products/1695367075.jpg",
		"https://www.balloondecorationnoida.in/uploads/products/1704621131.jpeg",
		"https://www.balloondecorationnoida.in/uploads/category/1693718482.jpeg",
		"https://www.balloondecorationnoida.in/uploads/category/1693718615.jpeg",
		"https://www.balloondecorationnoida.in/uploads/category/1693802280.jpeg",
	];

	imageUrls.forEach((url) => {
		const img = new Image();
		img.src = url;
	});
}

// Initialize preloading
preloadImages();
