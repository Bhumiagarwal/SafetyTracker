// Loader animation and transition to main content
document.addEventListener('DOMContentLoaded', function() {
  // Animate loader elements
  gsap.fromTo(
    ".nst-logo-name",
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 2, delay: 0.5 }
  );
  
  // Hide loader and show main content after delay
  setTimeout(function() {
    gsap.to(".nst-loader-page", {
      opacity: 0,
      duration: 1,
      onComplete: function() {
        document.querySelector(".nst-loader-page").style.display = "none";
        document.getElementById("content").style.display = "block";
        gsap.to("#content", { opacity: 1, duration: 0.5 });
      }
    });
  }, 3500); // 3.5 seconds total (0.5s delay + 2s animation + 1s fade out)
});

// Auth modal functionality
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const authModal = document.getElementById('authModal');
const closeModal = document.getElementById('closeModal');
const showSignupBtn = document.getElementById('showSignupBtn');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const switchPanel = document.getElementById('switchPanel');

// Show login modal
loginBtn.addEventListener('click', function() {
  authModal.classList.add('active');
  loginForm.classList.remove('nst-hidden');
  signupForm.classList.add('nst-hidden');
  switchPanel.style.display = 'flex';
});

// Show signup modal
// signupBtn.addEventListener('click', function() {
//   authModal.classList.add('active');
//   loginForm.classList.add('nst-hidden');
//   signupForm.classList.remove('nst-hidden');
//   switchPanel.style.display = 'none';
// });

// Switch to signup form
showSignupBtn.addEventListener('click', function() {
  loginForm.classList.add('nst-hidden');
  signupForm.classList.remove('nst-hidden');
  switchPanel.style.display = 'none';
});

// Close modal
closeModal.addEventListener('click', function() {
  authModal.classList.remove('active');
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
  if (event.target === authModal) {
    authModal.classList.remove('active');
  }
});

// Form submission (prevent default for demo)
document.getElementById('loginFormElement').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Login functionality would be implemented here');
  authModal.classList.remove('active');
});

document.getElementById('signupFormElement').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Sign up functionality would be implemented here');
  authModal.classList.remove('active');
});






//profile
document.getElementById('addContact').addEventListener('click', function() {
  const contactsContainer = document.querySelector('.emergency-contacts');
  const contactCount = document.querySelectorAll('.contact-card').length + 1;
  
  const newContact = document.createElement('div');
  newContact.className = 'contact-card';
  newContact.innerHTML = `
      <i class="fas fa-times delete-contact"></i>
      
      <div class="form-group required">
          <label for="emergencyName${contactCount}">Full Name</label>
          <input type="text" id="emergencyName${contactCount}" class="form-control" required>
      </div>
      
      <div class="form-group required">
          <label for="emergencyRelation${contactCount}">Relationship</label>
          <input type="text" id="emergencyRelation${contactCount}" class="form-control" required>
      </div>
      
      <div class="form-group required">
          <label for="emergencyPhone${contactCount}">Phone Number</label>
          <input type="tel" id="emergencyPhone${contactCount}" class="form-control" required>
      </div>
  `;
  
  contactsContainer.insertBefore(newContact, this);
  
  // Add event listener to new delete button
  newContact.querySelector('.delete-contact').addEventListener('click', function() {
      newContact.remove();
  });
});

// Delete contact functionality
document.querySelectorAll('.delete-contact').forEach(btn => {
  btn.addEventListener('click', function() {
      this.parentElement.remove();
  });
});


document.getElementById('signupBtn').addEventListener('click', function () {
  const profileSection = document.getElementById('profileSection');
  if (profileSection.style.display === 'none' || profileSection.style.display === '') {
    profileSection.style.display = 'block';
  } else {
    profileSection.style.display = 'none';
  }
});
