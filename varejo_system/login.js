document.addEventListener('DOMContentLoaded', function() {
  setupLoginTabs();
  setupPasswordToggles();
  setupPhotoUpload();
  setupGoogleLogin(); // Se quiser manter a simulação do Google
});

// 1) Tab Switching
function setupLoginTabs() {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const target = this.getAttribute('data-tab');
      
      // Remove active de todos
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      // Adiciona active na tab clicada e conteúdo correspondente
      this.classList.add('active');
      document.getElementById(`${target}-tab`).classList.add('active');
    });
  });
}

// 2) Mostrar/ocultar senha
function setupPasswordToggles() {
  const toggleBtns = document.querySelectorAll('.toggle-password');
  
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.previousElementSibling;
      const icon = this.querySelector('i');
      
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    });
  });
}

// 3) Upload de foto e pré-visualização
function setupPhotoUpload() {
  const photoUpload = document.getElementById('profile-photo-upload');
  const photoPreview = document.getElementById('profile-photo-preview');
  
  if (photoUpload) {
    photoUpload.addEventListener('change', function() {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          photoPreview.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

// 4) (Opcional) Google Sign-In simulado
function setupGoogleLogin() {
  const googleBtn = document.querySelector('.btn-google');
  if (googleBtn) {
    googleBtn.addEventListener('click', function() {
      // Aqui você dispararia a lógica de Google Sign-In real.
      // Caso não queira nada, pode apenas remover este bloco todo
      showToast('info', 'Google Login ainda não implementado neste exemplo.');
    });
  }
}

// 5) Função genérica de exibir toasts
function showToast(type, message) {
  const toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) return;
  
  const toast = document.createElement('div');
  toast.classList.add('toast', `toast-${type}`);
  
  let icon;
  switch (type) {
    case 'success': icon = 'fas fa-check-circle'; break;
    case 'warning': icon = 'fas fa-exclamation-triangle'; break;
    case 'error':   icon = 'fas fa-times-circle'; break;
    default:        icon = 'fas fa-info-circle';
  }
  
  toast.innerHTML = `<i class="${icon}"></i> ${message}`;
  toastContainer.appendChild(toast);
  
  // Remove o toast depois de 3 segundos
  setTimeout(() => {
    toast.remove();
  }, 3000);
}
