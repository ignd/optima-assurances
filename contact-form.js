document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    // Ajout des messages d'erreur
    const errorMessages = {
      lastname: "Veuillez entrer votre nom",
      firstname: "Veuillez entrer votre prénom",
      email: "Veuillez entrer une adresse email valide",
      subject: "Veuillez sélectionner un objet",
      message: "Veuillez entrer votre message"
    };
    
    // Créer des éléments d'erreur
    const requiredFields = contactForm.querySelectorAll('[required]');
    requiredFields.forEach(field => {
      const errorElement = document.createElement('p');
      errorElement.className = 'error-message';
      errorElement.style.color = '#fc0505ff';
      errorElement.style.marginTop = '5px';
      errorElement.style.fontSize = '0.9rem';
      errorElement.style.display = 'none';
      field.parentNode.appendChild(errorElement);
      
      // Validation en temps réel
      field.addEventListener('input', function() {
        if (this.value.trim()) {
          this.classList.remove('error');
          this.nextElementSibling.style.display = 'none';
        }
      });
    });
    
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;
      
      // Validation des champs
      requiredFields.forEach(field => {
        const errorElement = field.nextElementSibling;
        
        if (!field.value.trim()) {
          field.classList.add('error');
          errorElement.textContent = errorMessages[field.id] || 'Ce champ est obligatoire';
          errorElement.style.display = 'block';
          isValid = false;
        } else if (field.id === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
          field.classList.add('error');
          errorElement.textContent = 'Veuillez entrer une adresse email valide';
          errorElement.style.display = 'block';
          isValid = false;
        } else {
          field.classList.remove('error');
          errorElement.style.display = 'none';
        }
      });
      
      if (!isValid) {
        // Faire défiler jusqu'au premier champ erroné
        const firstError = contactForm.querySelector('.error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstError.focus();
        }
        return;
      }
      
      // Simulation d'envoi
      const formData = new FormData(contactForm);
      const formObject = Object.fromEntries(formData.entries());
      
      console.log('Données du formulaire:', formObject);
      
      // Afficher un message de succès
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.style.backgroundColor = '#4CAF50';
      successMessage.style.color = 'white';
      successMessage.style.padding = '15px';
      successMessage.style.borderRadius = '5px';
      successMessage.style.marginTop = '20px';
      successMessage.style.textAlign = 'center';
      successMessage.innerHTML = `
        <p><strong>Merci pour votre message !</strong></p>
        <p>Nous vous contacterons dans les plus brefs délais.</p>
      `;
      
      contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
      
      // Réinitialiser le formulaire
      contactForm.reset();
      
      // Faire défiler jusqu'au message de succès
      setTimeout(() => {
        successMessage.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      
      // Supprimer le message après 5 secondes
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    });
  }
});