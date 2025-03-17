// Toggle Navbar for Burger Menu
const burger = document.getElementById("burger");
const navbar = document.getElementById("navbar");

burger.addEventListener("click", () => {
  navbar.classList.toggle("active");
});

// Daftar teks yang akan ditampilkan
const texts = [
  "First-year student exploring programming.",
  "Creating with Greenfoot and websites.",
  "Learning and growing with code and logic.",
  "Blending creativity and logic seamlessly.",
];

// Elemen tempat teks akan ditampilkan
const typingText = document.getElementById("typing-text");

// Kecepatan ketik dan hapus (ms)
const typingSpeed = 100; // Kecepatan mengetik
const deletingSpeed = 50; // Kecepatan hapus
let currentIndex = 0; // Indeks teks yang sedang ditampilkan

// Fungsi untuk membuat efek ketik dengan cursor mengikuti
function typeWriter(text, element, speed, callback) {
  let i = 0;
  element.textContent = ""; // Kosongkan teks sebelumnya sebelum mengetik
  element.classList.add("typing-active"); // Tambahkan animasi cursor
  const interval = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(interval); // Hentikan interval setelah selesai
      setTimeout(callback, 1500); // Tunggu 1.5 detik sebelum callback
    }
  }, speed);
}

// Fungsi untuk menghapus teks dengan efek backspace
function deleteText(element, speed, callback) {
  const text = element.textContent;
  let i = text.length;
  element.classList.add("typing-active"); // Tetap gunakan cursor saat menghapus
  const interval = setInterval(() => {
    if (i > 0) {
      element.textContent = text.substring(0, i - 1);
      i--;
    } else {
      clearInterval(interval); // Hentikan interval setelah teks dihapus
      element.classList.remove("typing-active"); // Hapus animasi cursor
      callback(); // Panggil callback untuk teks berikutnya
    }
  }, speed);
}

// Looping efek ketik dan hapus teks
function startTyping() {
  typeWriter(texts[currentIndex], typingText, typingSpeed, () => {
    setTimeout(() => {
      deleteText(typingText, deletingSpeed, () => {
        // Ganti ke teks berikutnya
        currentIndex = (currentIndex + 1) % texts.length; // Loop kembali ke awal
        startTyping(); // Panggil ulang fungsi untuk teks berikutnya
      });
    }, 1500); // Waktu jeda setelah teks selesai diketik
  });
}

// Mulai efek ketik
startTyping();

// Intersection Observer for Fade-In Animation
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  });

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Feather Splash Background
function createFeatherSplash() {
  const heroSection = document.getElementById("hero");

  for (let i = 0; i < 50; i++) {
    const feather = document.createElement("div");
    feather.classList.add("feather");

    // Randomize position
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    feather.style.left = `${x}vw`;
    feather.style.top = `${y}vh`;

    // Randomize size
    const size = Math.random() * 10 + 5; // Between 5px and 15px
    feather.style.width = `${size}px`;
    feather.style.height = `${size}px`;

    // Randomize animation duration and delay
    const duration = Math.random() * 5 + 3; // Between 3s and 8s
    const delay = Math.random() * 5; // Up to 5s delay
    feather.style.animationDuration = `${duration}s`;
    feather.style.animationDelay = `${delay}s`;

    heroSection.appendChild(feather);
  }
}

// Initialize Feather Splash
createFeatherSplash();

// Mouse Interaction
const feathers = document.querySelectorAll(".feather");
const heroSection = document.getElementById("hero");

heroSection.addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;

  feathers.forEach((feather) => {
    const rect = feather.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance between mouse and feather
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Apply slight movement based on distance
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const maxDistance = 300; // Maximum distance for interaction effect
    const strength = Math.min(distance / maxDistance, 1);

    feather.style.transform = `translate(${deltaX * strength * 0.1}px, ${deltaY * strength * 0.1
      }px)`;
  });
});

// Scroll to Hero Functionality
function scrollToHero() {
  document.getElementById("hero").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Mencegah pengiriman formulir standar

    // Ambil nilai dari input
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Buat subjek dan isi email
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    // Buat tautan mailto
    const mailtoLink = `mailto:ugisugiman6@gmail.com?subject=${subject}&body=${body}`;

    // Buka aplikasi email default
    window.location.href = mailtoLink;

    // Kosongkan formulir setelah dikirim (opsional)
    form.reset();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".glow-card");

  // Fungsi untuk memeriksa apakah elemen berada dalam viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Fungsi untuk menambahkan efek glow saat elemen masuk ke viewport
  function checkScroll() {
    projectCards.forEach((card) => {
      if (isInViewport(card)) {
        card.classList.add("glow-active"); // Tambahkan kelas untuk aktivasi glow
      }
    });
  }

  // Jalankan fungsi saat halaman dimuat dan saat pengguna menggulir
  window.addEventListener("scroll", checkScroll);
  window.addEventListener("load", checkScroll); // Pastikan animasi bekerja saat halaman pertama kali dimuat
});

// Skill Card Animation
document.addEventListener("DOMContentLoaded", () => {
  const skillCards = document.querySelectorAll(".skill-card");

  skillCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Trigger roll animation
      card.classList.add("animate-roll");

      // Remove animation class after animation ends
      setTimeout(() => {
        card.classList.remove("animate-roll");
      }, 800);

      // Toggle the clicked state
      card.classList.toggle("clicked");

      // Toggle the description visibility
      const description = card.querySelector(".description");

      description.classList.toggle("visible");

      if (description.classList.contains("visible")) {
        defaultText.classList.add("hidden");
      } else {
        defaultText.classList.remove("hidden");
      }
    });
  });
});
