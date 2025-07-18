// Menu mobile et fonctionnalités globales
document.addEventListener('DOMContentLoaded', function() {
  // Menu mobile
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.getElementById('main-nav');
  
  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
    });
  }
  
  // Animation au défilement
  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
  });
  
  // Gestion du formulaire de contact
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validation
      const requiredFields = this.querySelectorAll('[required]');
      let isValid = true;
      
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          field.classList.add('error');
          isValid = false;
        } else {
          field.classList.remove('error');
        }
      });
      
      if (!isValid) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
      }
      
      // Envoi des données (simulé)
      const formData = new FormData(this);
      const formObject = Object.fromEntries(formData.entries());
      console.log('Données du formulaire:', formObject);
      
      // Message de confirmation
      alert('Merci pour votre message. Nous vous contacterons bientôt.');
      this.reset();
      
      // Optionnel: Redirection après envoi
      // window.location.href = 'merci.html';
    });
  }
  
  // Fermer le menu mobile quand on clique sur un lien
  const navLinks = document.querySelectorAll('.nav-list a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        navMenu.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });
});