// Check if user is logged in
document.addEventListener('DOMContentLoaded', function() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
   
  // If user is logged in, update the UI with user information
  if (currentUser) {
    updateUserInfoInUI(currentUser);
  }
  
  // Setup logout functionality
  setupLogout();
  
  // Continue with the existing code
  setupThemeToggle();
  setupMenuEvents();
  setupSearchBar();
  setupNotifications();
});

// Function to update user info in the UI
function updateUserInfoInUI(user) {
  // Update sidebar profile
  const sidebarUserName = document.querySelector('.user-info h3');
  const sidebarUserRole = document.querySelector('.user-info p');
  const sidebarUserPhoto = document.querySelector('.avatar img');
  
  if (sidebarUserName) sidebarUserName.textContent = user.name;
  if (sidebarUserRole) sidebarUserRole.textContent = user.role;
  if (sidebarUserPhoto) sidebarUserPhoto.src = user.photoUrl;
  
  // Update top-bar profile
  const topbarUserName = document.querySelector('.profile-dropdown .profile-name');
  const topbarUserRole = document.querySelector('.profile-dropdown .profile-role');
  const topbarUserPhoto = document.querySelector('.profile-dropdown img');
  
  if (topbarUserName) topbarUserName.textContent = user.name;
  if (topbarUserRole) topbarUserRole.textContent = user.role;
  if (topbarUserPhoto) topbarUserPhoto.src = user.photoUrl;
  
  // Update user data
  userData.name = user.name;
  userData.role = user.role;
  userData.email = user.email;
  userData.photoUrl = user.photoUrl;
}

// Setup logout functionality
function setupLogout() {
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Clear user session
      localStorage.removeItem('currentUser');
      
      // Redirect to login page
      window.location.href = 'login.php';
    });
  }
  
  // Add logout to profile dropdown menu
  const profileMenu = document.querySelector('.profile-menu');
  if (profileMenu) {
    // Find or create logout option
    let logoutOption = profileMenu.querySelector('a[href="#logout"]');
    if (!logoutOption) {
      const menuList = profileMenu.querySelector('ul');
      const listItem = document.createElement('li');
      listItem.innerHTML = '<a href="#" id="profile-logout"><i class="fas fa-sign-out-alt"></i> Sair</a>';
      menuList.appendChild(listItem);
      
      document.getElementById('profile-logout').addEventListener('click', function(e) {
        e.preventDefault();
        
        // Clear user session
        localStorage.removeItem('currentUser');
        
        // Redirect to login page
        window.location.href = 'login.php';
      });
    }
  }
}

// Theme Toggle Functionality
function setupThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Check for saved theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
  }

  // Theme toggle event listener
  themeToggle.addEventListener('change', function() {
    if (this.checked) {
      body.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      body.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  });
}

// User profile data
const userData = {
  name: 'Admin',
  role: 'Administrador',
  email: 'admin@varejophp.com.br',
  photoUrl: 'https://via.placeholder.com/50',
};

// Profile dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
  // Profile dropdown
  const profileDropdown = document.querySelector('.profile-dropdown');
  if (profileDropdown) {
    profileDropdown.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleProfileMenu();
    });
  }

  // Close profile menu when clicking outside
  document.addEventListener('click', function() {
    const profileMenu = document.querySelector('.profile-menu');
    if (profileMenu && profileMenu.classList.contains('active')) {
      profileMenu.classList.remove('active');
    }
  });

  // Update user profile information
  updateUserProfileInfo();
});

// Toggle profile dropdown menu
function toggleProfileMenu() {
  let profileMenu = document.querySelector('.profile-menu');

  if (!profileMenu) {
    profileMenu = document.createElement('div');
    profileMenu.className = 'profile-menu';
    profileMenu.innerHTML = `
      <ul>
        <li><a href="#" id="edit-profile"><i class="fas fa-user-edit"></i> Editar Perfil</a></li>
        <li><a href="#"><i class="fas fa-key"></i> Alterar Senha</a></li>
        <li><a href="#"><i class="fas fa-cog"></i> Preferências</a></li>
        <li><a href="#" id="profile-logout"><i class="fas fa-sign-out-alt"></i> Sair</a></li>
      </ul>
    `;
    document.body.appendChild(profileMenu);

    // Prevent clicks inside menu from closing it
    profileMenu.addEventListener('click', function(e) {
      e.stopPropagation();
    });

    // Edit profile link
    document.getElementById('edit-profile').addEventListener('click', function(e) {
      e.preventDefault();
      openProfileEditModal();
      profileMenu.classList.remove('active');
    });
    
    document.getElementById('profile-logout').addEventListener('click', function(e) {
      e.preventDefault();
      
      // Clear user session
      localStorage.removeItem('currentUser');
      
      // Redirect to login page
      window.location.href = 'login.php';
    });
  }

  profileMenu.classList.toggle('active');
}

// Update profile information across the application
function updateUserProfileInfo() {
  // Update sidebar profile
  const sidebarUserName = document.querySelector('.user-info h3');
  const sidebarUserRole = document.querySelector('.user-info p');
  const sidebarUserPhoto = document.querySelector('.avatar img');

  if (sidebarUserName) sidebarUserName.textContent = userData.name;
  if (sidebarUserRole) sidebarUserRole.textContent = userData.role;
  if (sidebarUserPhoto) sidebarUserPhoto.src = userData.photoUrl;

  // Update top-bar profile
  const topbarUserName = document.querySelector('.profile-dropdown .profile-name');
  const topbarUserRole = document.querySelector('.profile-dropdown .profile-role');
  const topbarUserPhoto = document.querySelector('.profile-dropdown img');

  if (topbarUserName) topbarUserName.textContent = userData.name;
  if (topbarUserRole) topbarUserRole.textContent = userData.role;
  if (topbarUserPhoto) topbarUserPhoto.src = userData.photoUrl;

  // Update logo text
  const logoText = document.querySelector('.logo h1');
  if (logoText) logoText.textContent = 'Varejo PHP System';

  // Update page title
  document.title = 'Varejo PHP System | Dashboard Produtos Naturais';
}

// Open profile edit modal
function openProfileEditModal() {
  const modalContent = `
    <div class="profile-edit-container">
      <div class="profile-photo-upload">
        <div class="profile-photo-preview">
          <img id="profile-photo-preview" src="${userData.photoUrl}" alt="Foto de perfil">
        </div>
        <div class="profile-photo-controls">
          <div class="upload-btn-wrapper">
            <button class="upload-btn"><i class="fas fa-upload"></i> Carregar Foto</button>
            <input type="file" id="profile-photo-upload" accept="image/*">
          </div>
          <button class="btn btn-secondary" id="remove-photo"><i class="fas fa-trash"></i></button>
        </div>
      </div>

      <div class="form-group">
        <label for="profile-name">Nome</label>
        <input type="text" id="profile-name" class="form-control" value="${userData.name}">
      </div>

      <div class="form-group">
        <label for="profile-role">Cargo</label>
        <input type="text" id="profile-role" class="form-control" value="${userData.role}">
      </div>

      <div class="form-group">
        <label for="profile-email">Email</label>
        <input type="email" id="profile-email" class="form-control" value="${userData.email}">
      </div>

      <div class="form-buttons">
        <button class="btn btn-secondary" id="cancel-profile-edit">Cancelar</button>
        <button class="btn btn-primary" id="save-profile">Salvar Alterações</button>
      </div>
    </div>
  `;

  openModal('Editar Perfil', modalContent);

  // Setup file upload preview
  const profilePhotoUpload = document.getElementById('profile-photo-upload');
  profilePhotoUpload.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('profile-photo-preview').src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  // Remove photo button
  document.getElementById('remove-photo').addEventListener('click', function() {
    document.getElementById('profile-photo-preview').src = 'https://via.placeholder.com/50';
    profilePhotoUpload.value = '';
  });

  // Cancel button
  document.getElementById('cancel-profile-edit').addEventListener('click', function() {
    modalContainer.classList.remove('active');
  });

  // Save profile button
  document.getElementById('save-profile').addEventListener('click', function() {
    userData.name = document.getElementById('profile-name').value;
    userData.role = document.getElementById('profile-role').value;
    userData.email = document.getElementById('profile-email').value;

    const photoPreview = document.getElementById('profile-photo-preview');
    if (photoPreview.src !== userData.photoUrl) {
      userData.photoUrl = photoPreview.src;
    }

    updateUserProfileInfo();
    modalContainer.classList.remove('active');
    showToast('success', 'Perfil atualizado com sucesso!');
  });
}

// Sample data for the dashboard
const data = {
  // Sales data - Jan to Mar 2025
  revenue: {
    labels: ['Jan', 'Fev', 'Mar'],
    datasets: [500000, 480000, 520000]
  },

  // Top products
  topProducts: {
    labels: ['Colágeno Hidrolisado', 'Whey Protein Premium', 'Complexo B Natural', 'Óleo de Coco Orgânico', 'Vitamina D3+K2'],
    datasets: [35, 25, 20, 15, 10]
  },

  // Sellers performance
  sellers: {
    labels: ['João Silva', 'Maria Oliveira', 'Carlos Santos', 'Ana Pereira', 'Roberto Lima'],
    datasets: [320000, 290000, 250000, 210000, 180000]
  },

  // Inventory levels
  inventory: {
    labels: ['Vitaminas', 'Proteínas', 'Fitoterápicos', 'Homeopáticos', 'Óleos Essenciais', 'Chás Medicinais', 'Superalimentos', 'Suplementos', 'Probióticos', 'Ervas'],
    datasets: [85, 72, 60, 45, 90, 30, 55, 65, 40, 25],
    threshold: 30
  },

  // Products catalog
  products: [
    { id: 1, name: 'Colágeno Hidrolisado 300g', price: 89.99, stock: 85, category: 'Suplementos' },
    { id: 2, name: 'Whey Protein Premium 900g', price: 159.99, stock: 72, category: 'Proteínas' },
    { id: 3, name: 'Complexo B Natural 60 caps', price: 45.99, stock: 60, category: 'Vitaminas' },
    { id: 4, name: 'Óleo de Coco Orgânico 500ml', price: 39.99, stock: 45, category: 'Óleos Essenciais' },
    { id: 5, name: 'Vitamina D3+K2 30ml', price: 69.99, stock: 90, category: 'Vitaminas' },
    { id: 6, name: 'Spirulina em Pó 200g', price: 49.99, stock: 55, category: 'Superalimentos' },
    { id: 7, name: 'Própolis Verde 30ml', price: 32.99, stock: 65, category: 'Fitoterápicos' },
    { id: 8, name: 'Probiótico 30 Bilhões 30 caps', price: 89.99, stock: 40, category: 'Probióticos' },
    { id: 9, name: 'Florais de Bach Kit Completo', price: 299.99, stock: 25, category: 'Homeopáticos' },
    { id: 10, name: 'Chá de Camomila Orgânico 50g', price: 19.99, stock: 30, category: 'Chás Medicinais' }
  ],

  // Recent sales
  recentSales: [
    { id: 5482, date: '13/03/2025', customer: 'Roberto Almeida', seller: 'Maria Oliveira', amount: 5299.99, status: 'completed' },
    { id: 5481, date: '13/03/2025', customer: 'Carla Moreira', seller: 'João Silva', amount: 3299.99, status: 'completed' },
    { id: 5480, date: '12/03/2025', customer: 'Fernando Costa', seller: 'Carlos Santos', amount: 899.99, status: 'completed' },
    { id: 5479, date: '12/03/2025', customer: 'Amanda Dias', seller: 'Ana Pereira', amount: 2499.99, status: 'pending' },
    { id: 5478, date: '11/03/2025', customer: 'Paulo Silveira', seller: 'Roberto Lima', amount: 4999.99, status: 'completed' },
    { id: 5477, date: '11/03/2025', customer: 'Juliana Martins', seller: 'João Silva', amount: 1899.99, status: 'canceled' },
    { id: 5476, date: '10/03/2025', customer: 'Marcelo Rocha', seller: 'Maria Oliveira', amount: 599.98, status: 'completed' }
  ],

  team: [
    {
      id: 1,
      name: "Cezi Cola Tec",
      role: "CEO",
      department: "Executivo",
      email: "cezi@colatec.com.br",
      phone: "(11) 99999-0000",
      photo: "https://via.placeholder.com/80"
    },
    {
      id: 2,
      name: "Amanda Oliveira",
      role: "Gerente de Vendas",
      department: "Gerência",
      email: "amanda@naturaisphp.com.br",
      phone: "(11) 99999-0001",
      photo: "https://via.placeholder.com/80"
    },
    {
      id: 3,
      name: "Ricardo Santos",
      role: "Gerente de Estoque",
      department: "Gerência",
      email: "ricardo@naturaisphp.com.br",
      phone: "(11) 99999-0002",
      photo: "https://via.placeholder.com/80"
    },
    {
      id: 4,
      name: "João Silva",
      role: "Vendedor Sênior",
      department: "Vendas",
      email: "joao@naturaisphp.com.br",
      phone: "(11) 99999-0003",
      photo: "https://via.placeholder.com/80"
    },
    {
      id: 5,
      name: "Maria Oliveira",
      role: "Vendedora Sênior",
      department: "Vendas",
      email: "maria@naturaisphp.com.br",
      phone: "(11) 99999-0004",
      photo: "https://via.placeholder.com/80"
    },
    {
      id: 6,
      name: "Carlos Santos",
      role: "Vendedor Pleno",
      department: "Vendas",
      email: "carlos@naturaisphp.com.br",
      phone: "(11) 99999-0005",
      photo: "https://via.placeholder.com/80"
    },
    {
      id: 7,
      name: "Ana Pereira",
      role: "Vendedora Pleno",
      department: "Vendas",
      email: "ana@naturaisphp.com.br",
      phone: "(11) 99999-0006",
      photo: "https://via.placeholder.com/80"
    },
    {
      id: 8,
      name: "Roberto Lima",
      role: "Vendedor Júnior",
      department: "Vendas",
      email: "roberto@naturaisphp.com.br",
      phone: "(11) 99999-0007",
      photo: "https://via.placeholder.com/80"
    },
    {
      id: 9,
      name: "Lucas Mendes",
      role: "Desenvolvedor Full-Stack",
      department: "Tecnologia",
      email: "lucas@naturaisphp.com.br",
      phone: "(11) 99999-0008",
      photo: "https://via.placeholder.com/80"
    },
    {
      id: 10,
      name: "Juliana Costa",
      role: "Designer UX/UI",
      department: "Tecnologia",
      email: "juliana@naturaisphp.com.br",
      phone: "(11) 99999-0009",
      photo: "https://via.placeholder.com/80"
    }
  ],

  notifications: [
    { id: 1, type: 'sale', message: 'Nova venda realizada por Maria Oliveira', isRead: false, timestamp: new Date(2025, 2, 13, 14, 30) },
    { id: 2, type: 'inventory', message: 'Estoque baixo: Whey Protein Premium', isRead: false, timestamp: new Date(2025, 2, 13, 12, 15) },
    { id: 3, type: 'team', message: 'Novo membro adicionado: Lucas Mendes', isRead: false, timestamp: new Date(2025, 2, 12, 10, 45) },
    { id: 4, type: 'customer', message: 'Novo cliente cadastrado: Amanda Dias', isRead: true, timestamp: new Date(2025, 2, 11, 9, 20) },
    { id: 5, type: 'system', message: 'Backup do sistema realizado com sucesso', isRead: true, timestamp: new Date(2025, 2, 10, 23, 0) }
  ]
};

// Charts
document.addEventListener('DOMContentLoaded', function() {
  // Revenue Chart
  const revenueCtx = document.getElementById('revenueChart').getContext('2d');
  const revenueChart = new Chart(revenueCtx, {
    type: 'bar',
    data: {
      labels: data.revenue.labels,
      datasets: [{
        label: 'Faturamento (R$)',
        data: data.revenue.datasets,
        backgroundColor: 'rgba(26, 35, 126, 0.8)',
        borderColor: 'rgba(26, 35, 126, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return 'R$ ' + (value/1000) + 'k';
            }
          }
        }
      }
    }
  });

  // Top Products Chart
  const topProductsCtx = document.getElementById('topProductsChart').getContext('2d');
  const topProductsChart = new Chart(topProductsCtx, {
    type: 'doughnut',
    data: {
      labels: data.topProducts.labels,
      datasets: [{
        data: data.topProducts.datasets,
        backgroundColor: [
          'rgba(26, 35, 126, 0.8)',
          'rgba(0, 105, 92, 0.8)',
          'rgba(74, 20, 140, 0.8)',
          'rgba(216, 27, 96, 0.8)',
          'rgba(245, 127, 23, 0.8)'
        ],
        borderColor: [
          'rgba(26, 35, 126, 1)',
          'rgba(0, 105, 92, 1)',
          'rgba(74, 20, 140, 1)',
          'rgba(216, 27, 96, 1)',
          'rgba(245, 127, 23, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.raw + '%';
            }
          }
        }
      }
    }
  });

  // Sellers Chart
  const sellersCtx = document.getElementById('sellersChart').getContext('2d');
  const sellersChart = new Chart(sellersCtx, {
    type: 'bar',
    data: {
      labels: data.sellers.labels,
      datasets: [{
        label: 'Vendas (R$)',
        data: data.sellers.datasets,
        backgroundColor: 'rgba(0, 105, 92, 0.8)',
        borderColor: 'rgba(0, 105, 92, 1)',
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return 'R$ ' + (value/1000) + 'k';
            }
          }
        }
      }
    }
  });

  // Inventory Chart
  const inventoryCtx = document.getElementById('inventoryChart').getContext('2d');
  const inventoryChart = new Chart(inventoryCtx, {
    type: 'bar',
    data: {
      labels: data.inventory.labels,
      datasets: [{
        label: 'Nível de Estoque (%)',
        data: data.inventory.datasets,
        backgroundColor: data.inventory.datasets.map(value => 
          value <= data.inventory.threshold ? 'rgba(213, 0, 0, 0.8)' : 'rgba(74, 20, 140, 0.8)'
        ),
        borderColor: data.inventory.datasets.map(value => 
          value <= data.inventory.threshold ? 'rgba(213, 0, 0, 1)' : 'rgba(74, 20, 140, 1)'
        ),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });

  // Populate Recent Sales Table
  const recentSalesTable = document.getElementById('recent-sales-table');
  if (recentSalesTable) {
    data.recentSales.forEach(sale => {
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>#${sale.id}</td>
        <td>${sale.date}</td>
        <td>${sale.customer}</td>
        <td>${sale.seller}</td>
        <td>R$ ${sale.amount.toFixed(2).replace('.', ',')}</td>
        <td><span class="status ${sale.status}">${getStatusTranslation(sale.status)}</span></td>
        <td>
          <button class="action-btn"><i class="fas fa-eye"></i></button>
          <button class="action-btn"><i class="fas fa-print"></i></button>
        </td>
      `;
      
      recentSalesTable.appendChild(row);
    });
  }

  setupSearchBar();
});

// Helper function to translate status
function getStatusTranslation(status) {
  switch(status) {
    case 'completed': return 'Concluída';
    case 'pending': return 'Pendente';
    case 'canceled': return 'Cancelada';
    default: return status;
  }
}

// Notification System (Simulated)
setTimeout(() => {
  addNotification('Nova venda realizada', 'Venda #5483 foi concluída por Maria Oliveira', 'sale');
}, 5000);

setTimeout(() => {
  addNotification('Estoque baixo', 'O produto "Câmera DSLR" está com estoque abaixo do mínimo', 'inventory');
}, 8000);

function showNotification(title, message) {
  // In a real system, this would display a proper notification
  console.log(` ${title}: ${message}`);
}

// Add notification function
function addNotification(title, message, type) {
  const newNotification = {
    id: data.notifications.length + 1,
    type: type || 'system',
    message: message,
    isRead: false,
    timestamp: new Date()
  };
  
  data.notifications.unshift(newNotification);
  updateNotificationBadge();
  
  // Show toast notification
  showToast('info', message);
}

// Update notification badge count
function updateNotificationBadge() {
  const badge = document.querySelector('.notification .badge');
  if (badge) {
    const unreadCount = data.notifications.filter(n => !n.isRead).length;
    badge.textContent = unreadCount;
    badge.style.display = unreadCount > 0 ? 'flex' : 'none';
  }
}

// Setup notification dropdown
function setupNotifications() {
  const notificationBtn = document.querySelector('.notification');
  if (notificationBtn) {
    notificationBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleNotificationPanel();
    });
  }
  
  // Close notification panel when clicking outside
  document.addEventListener('click', function() {
    const notificationPanel = document.querySelector('.notification-panel');
    if (notificationPanel && notificationPanel.classList.contains('active')) {
      notificationPanel.classList.remove('active');
    }
  });
  
  // Initialize notification badge
  updateNotificationBadge();
}

// Toggle notification panel
function toggleNotificationPanel() {
  let notificationPanel = document.querySelector('.notification-panel');
  
  if (!notificationPanel) {
    notificationPanel = document.createElement('div');
    notificationPanel.className = 'notification-panel';
    
    // Creating the panel content
    renderNotificationPanel(notificationPanel);
    
    // Append to DOM
    document.querySelector('.user-actions').appendChild(notificationPanel);
    
    // Prevent clicks inside panel from closing it
    notificationPanel.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  } else {
    // Update notifications if panel exists
    renderNotificationPanel(notificationPanel);
  }
  
  notificationPanel.classList.toggle('active');
}

// Render notification panel content
function renderNotificationPanel(panel) {
  // Count unread notifications
  const unreadCount = data.notifications.filter(n => !n.isRead).length;
  
  let panelContent = `
    <div class="notification-header">
      <h3>Notificações</h3>
      <div class="notification-actions">
        <span>${unreadCount} não lida${unreadCount !== 1 ? 's' : ''}</span>
        <button id="mark-all-read" class="btn-text">Marcar todas como lidas</button>
        <button id="clear-all" class="btn-text">Limpar todas</button>
      </div>
    </div>
    <div class="notification-filters">
      <button class="notification-filter active" data-filter="all">Todas</button>
      <button class="notification-filter" data-filter="sale">Vendas</button>
      <button class="notification-filter" data-filter="inventory">Estoque</button>
      <button class="notification-filter" data-filter="team">Equipe</button>
      <button class="notification-filter" data-filter="customer">Clientes</button>
    </div>
    <div class="notification-list">
  `;
  
  if (data.notifications.length === 0) {
    panelContent += `<div class="empty-notifications">Nenhuma notificação encontrada</div>`;
  } else {
    data.notifications.forEach(notification => {
      const timeAgo = getTimeAgo(notification.timestamp);
      panelContent += `
        <div class="notification-item ${!notification.isRead ? 'unread' : ''}" data-id="${notification.id}" data-type="${notification.type}">
          <div class="notification-icon">
            <i class="fas ${getNotificationIcon(notification.type)}"></i>
          </div>
          <div class="notification-content">
            <p>${notification.message}</p>
            <span class="notification-time">${timeAgo}</span>
          </div>
          <div class="notification-actions">
            <button class="mark-read-btn" title="Marcar como lida" data-id="${notification.id}">
              ${notification.isRead ? '<i class="fas fa-check-circle"></i>' : '<i class="far fa-circle"></i>'}
            </button>
            <button class="delete-notification-btn" title="Remover" data-id="${notification.id}">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      `;
    });
  }
  
  panelContent += `
    </div>
    <div class="notification-footer">
      <a href="#" id="view-all-notifications">Ver todas as notificações</a>
    </div>
  `;
  
  panel.innerHTML = panelContent;
  
  // Add event listeners for buttons
  setTimeout(() => {
    // Mark all as read
    const markAllBtn = document.getElementById('mark-all-read');
    if (markAllBtn) {
      markAllBtn.addEventListener('click', markAllNotificationsAsRead);
    }
    
    // Clear all notifications
    const clearAllBtn = document.getElementById('clear-all');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', clearAllNotifications);
    }
    
    // Mark individual notification as read
    const markReadBtns = document.querySelectorAll('.mark-read-btn');
    markReadBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        markNotificationAsRead(this.getAttribute('data-id'));
      });
    });
    
    // Delete individual notification
    const deleteBtns = document.querySelectorAll('.delete-notification-btn');
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        deleteNotification(this.getAttribute('data-id'));
      });
    });
    
    // Filter notifications
    const filterBtns = document.querySelectorAll('.notification-filter');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterNotifications(this.getAttribute('data-filter'));
      });
    });
    
    // View all notifications
    const viewAllBtn = document.getElementById('view-all-notifications');
    if (viewAllBtn) {
      viewAllBtn.addEventListener('click', viewAllNotifications);
    }
    
    // Make notifications clickable
    const notificationItems = document.querySelectorAll('.notification-item');
    notificationItems.forEach(item => {
      item.addEventListener('click', function(e) {
        if (!e.target.closest('.notification-actions')) {
          const notificationId = this.getAttribute('data-id');
          const notificationType = this.getAttribute('data-type');
          navigateToNotificationSource(notificationId, notificationType);
        }
      });
    });
    
  }, 0);
}

// Helper function to get time ago string
function getTimeAgo(date) {
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) {
    return 'agora mesmo';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minuto${minutes !== 1 ? 's' : ''} atrás`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hora${hours !== 1 ? 's' : ''} atrás`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} dia${days !== 1 ? 's' : ''} atrás`;
  }
}

// Get icon class based on notification type
function getNotificationIcon(type) {
  switch (type) {
    case 'sale': return 'fa-shopping-cart';
    case 'inventory': return 'fa-box';
    case 'team': return 'fa-users';
    case 'customer': return 'fa-user-plus';
    case 'system': return 'fa-cog';
    default: return 'fa-bell';
  }
}

// Mark all notifications as read
function markAllNotificationsAsRead() {
  data.notifications.forEach(notification => {
    notification.isRead = true;
  });
  
  updateNotificationBadge();
  renderNotificationPanel(document.querySelector('.notification-panel'));
  showToast('success', 'Todas as notificações foram marcadas como lidas');
}

// Clear all notifications
function clearAllNotifications() {
  data.notifications = [];
  updateNotificationBadge();
  renderNotificationPanel(document.querySelector('.notification-panel'));
  showToast('success', 'Todas as notificações foram removidas');
}

// Mark individual notification as read
function markNotificationAsRead(id) {
  const notification = data.notifications.find(n => n.id == id);
  if (notification) {
    notification.isRead = !notification.isRead;
    updateNotificationBadge();
    renderNotificationPanel(document.querySelector('.notification-panel'));
  }
}

// Delete individual notification
function deleteNotification(id) {
  const index = data.notifications.findIndex(n => n.id == id);
  if (index !== -1) {
    data.notifications.splice(index, 1);
    updateNotificationBadge();
    renderNotificationPanel(document.querySelector('.notification-panel'));
    showToast('success', 'Notificação removida');
  }
}

// Filter notifications
function filterNotifications(filter) {
  const filterBtns = document.querySelectorAll('.notification-filter');
  filterBtns.forEach(btn => btn.classList.remove('active'));
  
  document.querySelector(`.notification-filter[data-filter="${filter}"]`).classList.add('active');
  
  const notifications = document.querySelectorAll('.notification-item');
  notifications.forEach(item => {
    if (filter === 'all' || item.getAttribute('data-type') === filter) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// Navigate to notification source
function navigateToNotificationSource(id, type) {
  // Mark as read first
  markNotificationAsRead(id);
  
  // Close the panel
  document.querySelector('.notification-panel').classList.remove('active');
  
  // Navigate based on type
  switch (type) {
    case 'sale':
      openModal('Nova Venda', formTemplates.newSale);
      setupSaleForm();
      break;
    case 'inventory':
      loadInventory();
      break;
    case 'team':
      loadTeamDirectory();
      break;
    case 'customer':
      loadClientsPage();
      break;
    default:
      // Do nothing for system notifications
  }
}

// View all notifications
function viewAllNotifications(e) {
  e.preventDefault();
  document.querySelector('.notification-panel').classList.remove('active');
  
  // Here we would normally navigate to a dedicated notifications page
  // For now, we'll just show a toast
  showToast('info', 'Função não implementada: Ver todas as notificações');
}

// Add toast notification function
function showToast(type, message) {
  const toastContainer = document.querySelector('.toast-container') || document.createElement('div');
  if (!document.querySelector('.toast-container')) {
    toastContainer.classList.add('toast-container');
    document.body.appendChild(toastContainer);
  }
  
  const toast = document.createElement('div');
  toast.classList.add('toast', `toast-${type}`);
  
  let icon;
  switch (type) {
    case 'success':
      icon = 'fas fa-check-circle';
      break;
    case 'warning':
      icon = 'fas fa-exclamation-triangle';
      break;
    case 'error':
      icon = 'fas fa-times-circle';
      break;
    default:
      icon = 'fas fa-info-circle';
  }
  
  toast.innerHTML = `<i class="${icon}"></i> ${message}`;
  toastContainer.appendChild(toast);
  
  // Remove the toast after 3 seconds
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Set up menu events
function setupMenuEvents() {
  const menuItems = document.querySelectorAll('.menu a');
  
  menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from all menu items
      menuItems.forEach(mi => mi.parentElement.classList.remove('active'));
      
      // Add active class to clicked item
      this.parentElement.classList.add('active');
      
      const menuText = this.textContent.trim();
      
      // Load the appropriate content based on the menu item
      if (menuText.includes('Dashboard')) {
        loadDashboard();
      } else if (menuText.includes('Vendas')) {
        // Load sales content
        openModal('Nova Venda', formTemplates.newSale);
        setupSaleForm();
      } else if (menuText.includes('Estoque')) {
        loadInventory();
      } else if (menuText.includes('Novo Produto')) {
        openModal('Novo Produto', formTemplates.newProduct);
        setupNewProductForm();
      } else if (menuText.includes('Equipe')) {
        loadTeamDirectory();
      } else if (menuText.includes('Clientes')) {
        loadClientsPage();
      } else if (menuText.includes('Relatórios')) {
        loadReports();
      } else if (menuText.includes('Configurações')) {
        loadSettings();
      }
    });
  });
}

// Add this function to load the team directory
function loadTeamDirectory() {
  let content = `
    <div class="welcome-header">
      <h2>Equipe</h2>
      <p>Conheça os profissionais que fazem parte da nossa equipe</p>
    </div>
    
    <div class="team-actions">
      <button class="btn btn-primary" id="add-team-member-btn"><i class="fas fa-user-plus"></i> Adicionar Membro</button>
    </div>
    
    <div class="team-filters">
      <button class="btn-filter active" data-department="all">Todos</button>
      <button class="btn-filter" data-department="Executivo">Executivo</button>
      <button class="btn-filter" data-department="Gerência">Gerência</button>
      <button class="btn-filter" data-department="Vendas">Vendas</button>
      <button class="btn-filter" data-department="Tecnologia">Tecnologia</button>
    </div>
    
    <div class="team-directory">
      <div class="team-grid">
  `;
  
  // Add team members
  data.team.forEach(member => {
    content += `
      <div class="team-member" data-department="${member.department}">
        <div class="team-member-photo">
          <img src="${member.photo}" alt="${member.name}">
        </div>
        <div class="team-member-info">
          <h3>${member.name}</h3>
          <p class="member-role">${member.role}</p>
          <p class="member-contact"><i class="fas fa-envelope"></i> ${member.email}</p>
          <p class="member-contact"><i class="fas fa-phone"></i> ${member.phone}</p>
          <div class="team-member-actions">
            <button class="btn btn-secondary btn-sm edit-team-member" data-id="${member.id}"><i class="fas fa-edit"></i> Editar</button>
            <button class="btn btn-danger btn-sm delete-team-member" data-id="${member.id}"><i class="fas fa-trash"></i> Excluir</button>
          </div>
        </div>
      </div>
    `;
  });
  
  content += `
      </div>
    </div>
  `;
  
  document.querySelector('.dashboard').innerHTML = content;
  
  // Add filter functionality
  document.querySelectorAll('.team-filters .btn-filter').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.team-filters .btn-filter').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const department = this.getAttribute('data-department');
      
      if (department === 'all') {
        // Show all categories
        document.querySelectorAll('.team-member').forEach(member => member.style.display = 'flex');
      } else {
        // Hide all categories
        document.querySelectorAll('.team-member').forEach(member => member.style.display = 'none');
        
        // Safely show only the selected category if it exists
        document.querySelectorAll(`.team-member[data-department="${department}"]`).forEach(member => member.style.display = 'flex');
      }
    });
  });
  
  document.getElementById('add-team-member-btn').addEventListener('click', function() {
    openModal('Adicionar Membro da Equipe', createAddTeamMemberForm());
    setupAddTeamMemberForm();
  });
  
  // Add event listeners for edit and delete buttons
  document.querySelectorAll('.edit-team-member').forEach(btn => {
    btn.addEventListener('click', function() {
      const memberId = this.getAttribute('data-id');
      editTeamMember(memberId);
    });
  });
  
  document.querySelectorAll('.delete-team-member').forEach(btn => {
    btn.addEventListener('click', function() {
      const memberId = this.getAttribute('data-id');
      deleteTeamMember(memberId);
    });
  });
}

function createAddTeamMemberForm() {
  return `
    <form id="add-team-member-form">
      <div class="form-grid">
        <div class="form-group">
          <label for="member-name">Nome Completo</label>
          <input type="text" id="member-name" class="form-control" required>
        </div>
        
        <div class="form-group">
          <label for="member-department">Departamento</label>
          <select id="member-department" class="form-control" required>
            <option value="">Selecione um departamento</option>
            <option value="Executivo">Executivo</option>
            <option value="Gerência">Gerência</option>
            <option value="Vendas">Vendas</option>
            <option value="Tecnologia">Tecnologia</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="member-role">Cargo</label>
          <input type="text" id="member-role" class="form-control" required>
        </div>
        
        <div class="form-group" id="role-suggestions-container" style="display: none;">
          <label>Sugestões de Cargo</label>
          <div id="role-suggestions" class="checkbox-group">
            <!-- Role suggestions will be added here dynamically -->
          </div>
        </div>
        
        <div class="form-group">
          <label for="member-email">Email</label>
          <input type="email" id="member-email" class="form-control" required>
        </div>
        
        <div class="form-group">
          <label for="member-phone">Telefone</label>
          <input type="text" id="member-phone" class="form-control" required>
        </div>
        
        <div class="form-group">
          <label>Foto de Perfil</label>
          <div class="profile-photo-upload">
            <div class="profile-photo-preview">
              <img id="member-photo-preview" src="https://via.placeholder.com/80" alt="Foto de perfil">
            </div>
            <div class="profile-photo-controls">
              <div class="upload-btn-wrapper">
                <button type="button" class="upload-btn"><i class="fas fa-upload"></i> Carregar Foto</button>
                <input type="file" id="member-photo-upload" accept="image/*">
              </div>
              <button type="button" class="btn btn-secondary" id="remove-member-photo"><i class="fas fa-trash"></i></button>
            </div>
          </div>
          <input type="hidden" id="member-photo" value="https://via.placeholder.com/80">
        </div>
      </div>
      
      <div class="form-buttons">
        <button type="button" class="btn btn-secondary" id="cancel-add-member">Cancelar</button>
        <button type="submit" class="btn btn-primary">Adicionar Membro</button>
      </div>
    </form>
  `;
}

function setupAddTeamMemberForm() {
  const roleSuggestions = {
    'Executivo': ['CEO', 'COO', 'CFO', 'CTO', 'CMO', 'Diretor Executivo', 'Vice-Presidente'],
    'Gerência': ['Gerente de Vendas', 'Gerente de Estoque', 'Gerente de Marketing', 'Gerente de RH', 'Gerente Financeiro', 'Gerente Administrativo'],
    'Vendas': ['Vendedor Sênior', 'Vendedor Pleno', 'Vendedor Júnior', 'Representante Comercial', 'Consultor de Vendas', 'Atendente'],
    'Tecnologia': ['Desenvolvedor Full-Stack', 'Desenvolvedor Front-End', 'Desenvolvedor Back-End', 'Designer UX/UI', 'Analista de Sistemas', 'Analista de Suporte', 'Administrador de Rede']
  };
  
  // Setup photo upload preview
  const photoUpload = document.getElementById('member-photo-upload');
  photoUpload.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('member-photo-preview').src = e.target.result;
        document.getElementById('member-photo').value = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
  
  // Remove photo button
  document.getElementById('remove-member-photo').addEventListener('click', function() {
    document.getElementById('member-photo-preview').src = 'https://via.placeholder.com/80';
    document.getElementById('member-photo').value = 'https://via.placeholder.com/80';
    photoUpload.value = '';
  });
  
  const departmentSelect = document.getElementById('member-department');
  departmentSelect.addEventListener('change', function() {
    const department = this.value;
    const suggestionsContainer = document.getElementById('role-suggestions-container');
    const suggestionsDiv = document.getElementById('role-suggestions');
    
    if (department && roleSuggestions[department]) {
      suggestionsDiv.innerHTML = '';
      
      roleSuggestions[department].forEach(role => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'checkbox-item';
        suggestionItem.innerHTML = `
          <span class="role-suggestion" data-role="${role}">${role}</span>
        `;
        suggestionsDiv.appendChild(suggestionItem);
      });
      
      suggestionsContainer.style.display = 'block';
      
      document.querySelectorAll('.role-suggestion').forEach(suggestion => {
        suggestion.addEventListener('click', function() {
          document.getElementById('member-role').value = this.getAttribute('data-role');
        });
      });
    } else {
      suggestionsContainer.style.display = 'none';
    }
  });
  
  const form = document.getElementById('add-team-member-form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newMember = {
      id: data.team.length + 1,
      name: document.getElementById('member-name').value,
      role: document.getElementById('member-role').value,
      department: document.getElementById('member-department').value,
      email: document.getElementById('member-email').value,
      phone: document.getElementById('member-phone').value,
      photo: document.getElementById('member-photo').value
    };
    
    data.team.push(newMember);
    
    modalContainer.classList.remove('active');
    
    loadTeamDirectory();
    
    showToast('success', 'Membro da equipe adicionado com sucesso!');
  });
}

function editTeamMember(memberId) {
  const member = data.team.find(m => m.id == memberId);
  if (!member) return;
  
  openModal('Editar Membro da Equipe', createEditTeamMemberForm(member));
  setupEditTeamMemberForm(member);
}

function deleteTeamMember(memberId) {
  const member = data.team.find(m => m.id == memberId);
  if (!member) return;
  
  openModal('Excluir Membro da Equipe', `
    <div class="delete-confirmation">
      <div class="delete-icon">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      <p>Tem certeza que deseja excluir o membro <strong>${member.name}</strong> da equipe?</p>
      <p>Esta ação não poderá ser desfeita.</p>
    </div>
    <div class="form-buttons">
      <button class="btn btn-secondary" id="cancel-delete-member">Cancelar</button>
      <button class="btn btn-danger" id="confirm-delete-member">Excluir</button>
    </div>
  `);
  
  document.getElementById('cancel-delete-member').addEventListener('click', function() {
    modalContainer.classList.remove('active');
  });
  
  document.getElementById('confirm-delete-member').addEventListener('click', function() {
    const index = data.team.findIndex(m => m.id == memberId);
    if (index !== -1) {
      data.team.splice(index, 1);
    }
    
    modalContainer.classList.remove('active');
    loadTeamDirectory();
    
    showToast('success', `Membro ${member.name} excluído com sucesso!`);
  });
}

function createEditTeamMemberForm(member) {
  return `
    <form id="edit-team-member-form">
      <div class="form-grid">
        <div class="form-group">
          <label for="member-name">Nome Completo</label>
          <input type="text" id="member-name" class="form-control" value="${member.name}" required>
        </div>
        
        <div class="form-group">
          <label for="member-department">Departamento</label>
          <select id="member-department" class="form-control" required>
            <option value="">Selecione um departamento</option>
            <option value="Executivo" ${member.department === 'Executivo' ? 'selected' : ''}>Executivo</option>
            <option value="Gerência" ${member.department === 'Gerência' ? 'selected' : ''}>Gerência</option>
            <option value="Vendas" ${member.department === 'Vendas' ? 'selected' : ''}>Vendas</option>
            <option value="Tecnologia" ${member.department === 'Tecnologia' ? 'selected' : ''}>Tecnologia</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="member-role">Cargo</label>
          <input type="text" id="member-role" class="form-control" value="${member.role}" required>
        </div>
        
        <div class="form-group" id="role-suggestions-container" style="display: none;">
          <label>Sugestões de Cargo</label>
          <div id="role-suggestions" class="checkbox-group">
            <!-- Role suggestions will be added here dynamically -->
          </div>
        </div>
        
        <div class="form-group">
          <label for="member-email">Email</label>
          <input type="email" id="member-email" class="form-control" value="${member.email}" required>
        </div>
        
        <div class="form-group">
          <label for="member-phone">Telefone</label>
          <input type="text" id="member-phone" class="form-control" value="${member.phone}" required>
        </div>
        
        <div class="form-group">
          <label>Foto de Perfil</label>
          <div class="profile-photo-upload">
            <div class="profile-photo-preview">
              <img id="member-photo-preview" src="${member.photo}" alt="Foto de perfil">
            </div>
            <div class="profile-photo-controls">
              <div class="upload-btn-wrapper">
                <button type="button" class="upload-btn"><i class="fas fa-upload"></i> Carregar Foto</button>
                <input type="file" id="member-photo-upload" accept="image/*">
              </div>
              <button type="button" class="btn btn-secondary" id="remove-member-photo"><i class="fas fa-trash"></i></button>
            </div>
          </div>
          <input type="hidden" id="member-photo" value="${member.photo}">
        </div>
      </div>
      
      <div class="form-buttons">
        <button type="button" class="btn btn-secondary" id="cancel-edit-member">Cancelar</button>
        <button type="submit" class="btn btn-primary">Atualizar Membro</button>
      </div>
    </form>
  `;
}

function setupEditTeamMemberForm(member) {
  const roleSuggestions = {
    'Executivo': ['CEO', 'COO', 'CFO', 'CTO', 'CMO', 'Diretor Executivo', 'Vice-Presidente'],
    'Gerência': ['Gerente de Vendas', 'Gerente de Estoque', 'Gerente de Marketing', 'Gerente de RH', 'Gerente Financeiro', 'Gerente Administrativo'],
    'Vendas': ['Vendedor Sênior', 'Vendedor Pleno', 'Vendedor Júnior', 'Representante Comercial', 'Consultor de Vendas', 'Atendente'],
    'Tecnologia': ['Desenvolvedor Full-Stack', 'Desenvolvedor Front-End', 'Desenvolvedor Back-End', 'Designer UX/UI', 'Analista de Sistemas', 'Analista de Suporte', 'Administrador de Rede']
  };
  
  // Setup photo upload preview
  const photoUpload = document.getElementById('member-photo-upload');
  photoUpload.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('member-photo-preview').src = e.target.result;
        document.getElementById('member-photo').value = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
  
  // Remove photo button
  document.getElementById('remove-member-photo').addEventListener('click', function() {
    document.getElementById('member-photo-preview').src = 'https://via.placeholder.com/80';
    document.getElementById('member-photo').value = 'https://via.placeholder.com/80';
    photoUpload.value = '';
  });
  
  const departmentSelect = document.getElementById('member-department');
  departmentSelect.addEventListener('change', function() {
    const department = this.value;
    const suggestionsContainer = document.getElementById('role-suggestions-container');
    const suggestionsDiv = document.getElementById('role-suggestions');
    
    if (department && roleSuggestions[department]) {
      suggestionsDiv.innerHTML = '';
      
      roleSuggestions[department].forEach(role => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'checkbox-item';
        suggestionItem.innerHTML = `
          <span class="role-suggestion" data-role="${role}">${role}</span>
        `;
        suggestionsDiv.appendChild(suggestionItem);
      });
      
      suggestionsContainer.style.display = 'block';
      
      document.querySelectorAll('.role-suggestion').forEach(suggestion => {
        suggestion.addEventListener('click', function() {
          document.getElementById('member-role').value = this.getAttribute('data-role');
        });
      });
    } else {
      suggestionsContainer.style.display = 'none';
    }
  });
  
  document.getElementById('cancel-edit-member').addEventListener('click', function() {
    modalContainer.classList.remove('active');
  });
  
  const form = document.getElementById('edit-team-member-form');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Update member data
    member.name = document.getElementById('member-name').value;
    member.role = document.getElementById('member-role').value;
    member.department = document.getElementById('member-department').value;
    member.email = document.getElementById('member-email').value;
    member.phone = document.getElementById('member-phone').value;
    member.photo = document.getElementById('member-photo').value;
    
    modalContainer.classList.remove('active');
    loadTeamDirectory();
    
    showToast('success', 'Membro da equipe atualizado com sucesso!');
  });
  
  // Show role suggestions on load if department is selected
  if (departmentSelect.value && roleSuggestions[departmentSelect.value]) {
    departmentSelect.dispatchEvent(new Event('change'));
  }
}

// Fixed incomplete function in main.js
function setupSearchBar() {
  const searchInput = document.querySelector('.search-container input');
  
  searchInput.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
      const searchTerm = this.value.trim().toLowerCase();
      if (searchTerm) {
        performSearch(searchTerm);
      }
    }
  });
}

// Search functionality
function performSearch(searchTerm) {
  // Create search results content
  let resultsHTML = `
    <div class="search-results">
      <div class="section-header">
        <h3>Resultados para "${searchTerm}"</h3>
      </div>
      
      <div class="search-tabs">
        <button class="btn-filter active" data-filter="all">Todos</button>
        <button class="btn-filter" data-filter="products">Produtos</button>
        <button class="btn-filter" data-filter="sales">Vendas</button>
        <button class="btn-filter" data-filter="customers">Clientes</button>
        <button class="btn-filter" data-filter="team">Equipe</button>
      </div>
      
      <div class="search-category" data-category="products">
        <h4>Produtos</h4>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
  `;
  
  // Search in products
  const productResults = data.products.filter(product => 
    product.name.toLowerCase().includes(searchTerm) || 
    product.category.toLowerCase().includes(searchTerm)
  );
  
  if (productResults.length > 0) {
    productResults.forEach(product => {
      resultsHTML += `
        <tr>
          <td>${product.id}</td>
          <td>${product.name}</td>
          <td>${product.category}</td>
          <td>R$ ${product.price.toFixed(2).replace('.', ',')}</td>
          <td>${product.stock}</td>
          <td>
            <button class="action-btn"><i class="fas fa-edit"></i></button>
            <button class="action-btn add-stock-btn" data-id="${product.id}"><i class="fas fa-plus-circle"></i></button>
          </td>
        </tr>
      `;
    });
  } else {
    resultsHTML += `
      <tr>
        <td colspan="6" class="no-results">Nenhum produto encontrado</td>
      </tr>
    `;
  }
  
  resultsHTML += `
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="search-category" data-category="sales">
        <h4>Vendas</h4>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Data</th>
                <th>Cliente</th>
                <th>Valor</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
  `;
  
  // Search in sales
  const salesResults = data.recentSales.filter(sale => 
    sale.customer.toLowerCase().includes(searchTerm) || 
    sale.seller.toLowerCase().includes(searchTerm)
  );
  
  if (salesResults.length > 0) {
    salesResults.forEach(sale => {
      resultsHTML += `
        <tr>
          <td>#${sale.id}</td>
          <td>${sale.date}</td>
          <td>${sale.customer}</td>
          <td>R$ ${sale.amount.toFixed(2).replace('.', ',')}</td>
          <td><span class="status ${sale.status}">${getStatusTranslation(sale.status)}</span></td>
          <td>
            <button class="action-btn"><i class="fas fa-eye"></i></button>
            <button class="action-btn"><i class="fas fa-print"></i></button>
          </td>
        </tr>
      `;
    });
  } else {
    resultsHTML += `
      <tr>
        <td colspan="6" class="no-results">Nenhuma venda encontrada</td>
      </tr>
    `;
  }
  
  resultsHTML += `
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="search-category" data-category="team">
        <h4>Equipe</h4>
        <div class="team-grid search-team-grid">
  `;
  
  // Search in team members
  const teamResults = data.team.filter(member => 
    member.name.toLowerCase().includes(searchTerm) || 
    member.role.toLowerCase().includes(searchTerm) ||
    member.department.toLowerCase().includes(searchTerm)
  );
  
  if (teamResults.length > 0) {
    teamResults.forEach(member => {
      resultsHTML += `
        <div class="team-member">
          <div class="team-member-photo">
            <img src="${member.photo}" alt="${member.name}">
          </div>
          <div class="team-member-info">
            <h3>${member.name}</h3>
            <p class="member-role">${member.role}</p>
            <p class="member-contact"><i class="fas fa-envelope"></i> ${member.email}</p>
            <p class="member-contact"><i class="fas fa-phone"></i> ${member.phone}</p>
          </div>
        </div>
      `;
    });
  } else {
    resultsHTML += `<div class="no-results">Nenhum membro da equipe encontrado</div>`;
  }
  
  resultsHTML += `
        </div>
      </div>
    </div>
  `;
  
  // Replace dashboard content with search results
  document.querySelector('.dashboard').innerHTML = resultsHTML;
  
  // Add filter functionality to tabs
  document.querySelectorAll('.search-tabs .btn-filter').forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      document.querySelectorAll('.search-tabs .btn-filter').forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      if (filter === 'all') {
        // Show all categories
        document.querySelectorAll('.search-category').forEach(cat => cat.style.display = 'block');
      } else {
        // Hide all categories
        document.querySelectorAll('.search-category').forEach(cat => cat.style.display = 'none');
        
        // Safely show only the selected category if it exists
        const targetCategory = document.querySelector(`.search-category[data-category="${filter}"]`);
        if (targetCategory) {
          targetCategory.style.display = 'block';
        }
      }
    });
  });
  
  // Add event listeners to the add stock buttons
  document.querySelectorAll('.add-stock-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const productId = this.getAttribute('data-id');
      const product = data.products.find(p => p.id == productId);
      
      if (product) {
        openModal('Adicionar ao Estoque', formTemplates.addStock);
        
        // Set the product in the dropdown
        const stockProductSelect = document.getElementById('stock-product');
        stockProductSelect.value = productId;
        stockProductSelect.disabled = true;
        
        // Event listeners for the form
        document.getElementById('cancel-stock').addEventListener('click', () => {
          modalContainer.classList.remove('active');
        });
        
        document.getElementById('add-stock-form').addEventListener('submit', function(e) {
          e.preventDefault();
          
          const quantity = parseInt(document.getElementById('stock-quantity').value);
          
          // Update the product stock
          product.stock += quantity;
          
          // Close the modal
          modalContainer.classList.remove('active');
          
          // Show success notification
          showToast('success', 'Estoque atualizado com sucesso!');
          
          // Refresh the search results
          performSearch(searchTerm);
        });
      }
    });
  });
}

// Load the inventory page
function loadInventory() {
  let content = `
    <div class="welcome-header">
      <h2>Estoque</h2>
      <p>Gerencie o estoque de produtos</p>
    </div>
    
    <div class="inventory-actions">
      <button class="btn btn-primary" id="add-stock-btn"><i class="fas fa-plus-circle"></i> Adicionar ao Estoque</button>
      <button class="btn btn-secondary" id="new-product-btn"><i class="fas fa-plus"></i> Novo Produto</button>
    </div>
    
    <div class="inventory-chart">
      <div class="chart-card">
        <div class="chart-header">
          <h3>Nível de Estoque</h3>
          <div class="chart-controls">
            <button class="btn-filter active">Todos</button>
            <button class="btn-filter">Críticos</button>
          </div>
        </div>
        <div class="chart-body">
          <canvas id="inventoryChart"></canvas>
        </div>
      </div>
    </div>
    
    <div class="product-list">
      <div class="section-header">
        <h3>Lista de Produtos</h3>
        <div class="search-filter">
          <input type="text" placeholder="Filtrar produtos..." id="product-filter">
        </div>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody id="products-table-body">
  `;
  
  data.products.forEach(product => {
    const stockStatus = product.stock <= 30 ? 'critical' : 'normal';
    content += `
      <tr>
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>R$ ${product.price.toFixed(2).replace('.', ',')}</td>
        <td>${product.stock}</td>
        <td><span class="status ${stockStatus === 'critical' ? 'canceled' : 'completed'}">${stockStatus === 'critical' ? 'Crítico' : 'Normal'}</span></td>
        <td>
          <button class="action-btn edit-product" data-id="${product.id}"><i class="fas fa-edit"></i></button>
          <button class="action-btn add-stock-product" data-id="${product.id}"><i class="fas fa-plus-circle"></i></button>
        </td>
      </tr>
    `;
  });
  
  content += `
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  document.querySelector('.dashboard').innerHTML = content;
  
  const inventoryCtx = document.getElementById('inventoryChart').getContext('2d');
  const inventoryChart = new Chart(inventoryCtx, {
    type: 'bar',
    data: {
      labels: data.inventory.labels,
      datasets: [{
        label: 'Nível de Estoque (%)',
        data: data.inventory.datasets,
        backgroundColor: data.inventory.datasets.map(value => 
          value <= data.inventory.threshold ? 'rgba(213, 0, 0, 0.8)' : 'rgba(74, 20, 140, 0.8)'
        ),
        borderColor: data.inventory.datasets.map(value => 
          value <= data.inventory.threshold ? 'rgba(213, 0, 0, 1)' : 'rgba(74, 20, 140, 1)'
        ),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
  
  document.getElementById('add-stock-btn').addEventListener('click', () => {
    openModal('Adicionar ao Estoque', formTemplates.addStock);
    setupAddStockForm();
  });
  
  document.getElementById('new-product-btn').addEventListener('click', () => {
    openModal('Novo Produto', formTemplates.newProduct);
    setupNewProductForm();
  });
  
  document.querySelectorAll('.add-stock-product').forEach(btn => {
    btn.addEventListener('click', function() {
      const productId = this.getAttribute('data-id');
      openModal('Adicionar ao Estoque', formTemplates.addStock);
      
      const stockProductSelect = document.getElementById('stock-product');
      stockProductSelect.value = productId;
      stockProductSelect.disabled = true;
      
      setupAddStockForm();
    });
  });
  
  document.querySelectorAll('.chart-controls .btn-filter').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.chart-controls .btn-filter').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      if (filter === 'critical') {
        const criticalData = {...data.inventory};
        criticalData.labels = [];
        criticalData.datasets = [];
        
        data.inventory.datasets.forEach((value, index) => {
          if (value <= data.inventory.threshold) {
            criticalData.labels.push(data.inventory.labels[index]);
            criticalData.datasets.push(value);
          }
        });
        
        inventoryChart.data.labels = criticalData.labels;
        inventoryChart.data.datasets[0].data = criticalData.datasets;
        inventoryChart.data.datasets[0].backgroundColor = criticalData.datasets.map(() => 'rgba(213, 0, 0, 0.8)');
        inventoryChart.data.datasets[0].borderColor = criticalData.datasets.map(() => 'rgba(213, 0, 0, 1)');
      } else {
        inventoryChart.data.labels = data.inventory.labels;
        inventoryChart.data.datasets[0].data = data.inventory.datasets;
        inventoryChart.data.datasets[0].backgroundColor = data.inventory.datasets.map(value => 
          value <= data.inventory.threshold ? 'rgba(213, 0, 0, 0.8)' : 'rgba(74, 20, 140, 0.8)'
        );
        inventoryChart.data.datasets[0].borderColor = data.inventory.datasets.map(value => 
          value <= data.inventory.threshold ? 'rgba(213, 0, 0, 1)' : 'rgba(74, 20, 140, 1)'
        );
      }
      
      inventoryChart.update();
    });
  });
  
  const productFilter = document.getElementById('product-filter');
  productFilter.addEventListener('keyup', function() {
    const filterText = this.value.toLowerCase();
    const rows = document.querySelectorAll('#products-table-body tr');
    
    rows.forEach(row => {
      const productName = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
      const productCategory = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
      
      if (productName.includes(filterText) || productCategory.includes(filterText)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
}

// Fixed: Form setup functions
function setupSaleForm() {
  if (!document.getElementById('new-sale-form')) return;
  
  const productSelects = document.querySelectorAll('.product-select');
  productSelects.forEach(select => {
    select.addEventListener('change', updateProductPrice);
  });
  
  const addProductBtn = document.getElementById('add-product-row');
  if (addProductBtn) {
    addProductBtn.addEventListener('click', addProductRow);
  }
  
  const cancelBtn = document.getElementById('cancel-sale');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      modalContainer.classList.remove('active');
    });
  }
  
  const saleForm = document.getElementById('new-sale-form');
  if (saleForm) {
    saleForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const salesElement = document.querySelector('.orders .metric-value');
      const currentSales = salesElement.textContent;
      const salesNumber = parseInt(currentSales.replace(/[^\d]/g, ''));
      salesElement.textContent = (salesNumber + 1).toLocaleString('pt-BR');
      
      const revenueElement = document.querySelector('.sales .metric-value');
      const currentRevenue = parseFloat(revenueElement.textContent.replace(/[^\d,]/g, '').replace(',', '.'));
      const saleTotal = parseFloat(document.getElementById('total').value.replace(/[^\d,]/g, '').replace(',', '.'));
      revenueElement.textContent = `R$ ${(currentRevenue + saleTotal).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
      
      modalContainer.classList.remove('active');
      
      showToast('success', 'Venda realizada com sucesso!');
      
      loadDashboard();
    });
  }
}

function updateProductPrice() {
  const select = this;
  const row = select.closest('tr');
  const priceInput = row.querySelector('.product-price');
  
  if (select.value) {
    const selectedOption = select.options[select.selectedIndex];
    const price = selectedOption.getAttribute('data-price');
    priceInput.value = `R$ ${parseFloat(price).toFixed(2).replace('.', ',')}`;
  } else {
    priceInput.value = '';
  }
  
  calculateTotal();
}

function addProductRow() {
  const productsTable = document.getElementById('products-table').getElementsByTagName('tbody')[0];
  const newRow = document.createElement('tr');
  
  newRow.innerHTML = `
    <td>
      <select class="form-control product-select" required>
        <option value="">Selecione um produto</option>
        ${data.products.map(p => `<option value="${p.id}" data-price="${p.price}">${p.name}</option>`).join('')}
      </select>
    </td>
    <td><input type="number" class="form-control product-qty" min="1" value="1" required></td>
    <td><input type="text" class="form-control product-price" readonly></td>
    <td><button type="button" class="action-btn remove-product"><i class="fas fa-trash"></i></button></td>
  `;
  
  productsTable.appendChild(newRow);
  
  const newSelect = newRow.querySelector('.product-select');
  newSelect.addEventListener('change', updateProductPrice);
  
  const removeBtn = newRow.querySelector('.remove-product');
  removeBtn.addEventListener('click', function() {
    newRow.remove();
    calculateTotal();
  });
  
  const qtyInput = newRow.querySelector('.product-qty');
  qtyInput.addEventListener('change', calculateTotal);
}

function calculateTotal() {
  const rows = document.querySelectorAll('#products-table tbody tr');
  let total = 0;
  
  rows.forEach(row => {
    const select = row.querySelector('.product-select');
    const qty = row.querySelector('.product-qty');
    
    if (select.value) {
      const selectedOption = select.options[select.selectedIndex];
      const price = parseFloat(selectedOption.getAttribute('data-price'));
      const quantity = parseInt(qty.value);
      
      total += price * quantity;
    }
  });
  
  const totalInput = document.getElementById('total');
  if (totalInput) {
    totalInput.value = `R$ ${total.toFixed(2).replace('.', ',')}`;
  }
}

function setupAddStockForm() {
  if (!document.getElementById('add-stock-form')) return;
  
  const cancelBtn = document.getElementById('cancel-stock');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      modalContainer.classList.remove('active');
    });
  }
  
  const stockForm = document.getElementById('add-stock-form');
  if (stockForm) {
    stockForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const productId = document.getElementById('stock-product').value;
      const quantity = parseInt(document.getElementById('stock-quantity').value);
      
      const product = data.products.find(p => p.id == productId);
      if (product) {
        product.stock += quantity;
        
        modalContainer.classList.remove('active');
        
        showToast('success', 'Estoque atualizado com sucesso!');
        
        if (document.getElementById('inventoryChart')) {
          updateInventoryChart();
        }
      }
    });
  }
}

function setupNewProductForm() {
  if (!document.getElementById('new-product-form')) return;
  
  const cancelBtn = document.getElementById('cancel-product');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      modalContainer.classList.remove('active');
    });
  }
  
  const productForm = document.getElementById('new-product-form');
  if (productForm) {
    productForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const newProduct = {
        id: data.products.length + 1,
        name: document.getElementById('product-name').value,
        category: document.getElementById('product-category').value,
        price: parseFloat(document.getElementById('product-price').value),
        stock: parseInt(document.getElementById('product-stock').value)
      };
      
      data.products.push(newProduct);
      
      modalContainer.classList.remove('active');
      
      showToast('success', 'Produto cadastrado com sucesso!');
      
      if (document.getElementById('inventoryChart')) {
        updateInventoryChart();
      }
    });
  }
}

// Function to update the inventory chart
function updateInventoryChart() {
  const inventoryChart = Chart.getChart('inventoryChart');
  if (inventoryChart) {
    inventoryChart.data.labels = data.inventory.labels;
    inventoryChart.data.datasets[0].data = data.inventory.datasets;
    inventoryChart.data.datasets[0].backgroundColor = data.inventory.datasets.map(value => 
      value <= data.inventory.threshold ? 'rgba(213, 0, 0, 0.8)' : 'rgba(74, 20, 140, 0.8)'
    );
    inventoryChart.data.datasets[0].borderColor = data.inventory.datasets.map(value => 
      value <= data.inventory.threshold ? 'rgba(213, 0, 0, 1)' : 'rgba(74, 20, 140, 1)'
    );
    
    inventoryChart.update();
  }
}

// Load the dashboard
function loadDashboard() {
  const content = `
    <div class="welcome-header">
      <h2>Bem-vindo ao Dashboard</h2>
      <p>Desempenho de Produtos Naturais - 13/03/2025</p>
    </div>
    <div class="metrics-cards">
      <div class="metric-card sales">
        <div class="metric-icon">
          <i class="fas fa-dollar-sign"></i>
        </div>
        <div class="metric-info">
          <h3>Faturamento Total</h3>
          <p class="metric-value">R$ 1.500.000,00</p>
          <p class="metric-change positive"><i class="fas fa-arrow-up"></i> 12.5% desde o mês passado</p>
        </div>
      </div>
      <div class="metric-card orders">
        <div class="metric-icon">
          <i class="fas fa-shopping-bag"></i>
        </div>
        <div class="metric-info">
          <h3>Total de Vendas</h3>
          <p class="metric-value">5.482</p>
          <p class="metric-change positive"><i class="fas fa-arrow-up"></i> 8.3% desde o mês passado</p>
        </div>
      </div>
      <div class="metric-card inventory">
        <div class="metric-icon">
          <i class="fas fa-box-open"></i>
        </div>
        <div class="metric-info">
          <h3>Produtos em Estoque</h3>
          <p class="metric-value">750</p>
          <p class="metric-change negative"><i class="fas fa-arrow-down"></i> 4.1% desde o mês passado</p>
        </div>
      </div>
      <div class="metric-card customers">
        <div class="metric-icon">
          <i class="fas fa-users"></i>
        </div>
        <div class="metric-info">
          <h3>Clientes Ativos</h3>
          <p class="metric-value">1.287</p>
          <p class="metric-change positive"><i class="fas fa-arrow-up"></i> 6.8% desde o mês passado</p>
        </div>
      </div>
    </div>
    <div class="charts-container">
      <div class="chart-card">
        <div class="chart-header">
          <h3>Faturamento por Período</h3>
          <div class="chart-controls">
            <select id="revenue-period">
              <option value="week">Semana</option>
              <option value="month" selected>Mês</option>
              <option value="year">Ano</option>
            </select>
          </div>
        </div>
        <div class="chart-body">
          <canvas id="revenueChart"></canvas>
        </div>
      </div>
      <div class="chart-card">
        <div class="chart-header">
          <h3>Produtos Mais Vendidos</h3>
        </div>
        <div class="chart-body">
          <canvas id="topProductsChart"></canvas>
        </div>
      </div>
      <div class="chart-card">
        <div class="chart-header">
          <h3>Performance de Vendedores</h3>
        </div>
        <div class="chart-body">
          <canvas id="sellersChart"></canvas>
        </div>
      </div>
      <div class="chart-card">
        <div class="chart-header">
          <h3>Nível de Estoque</h3>
          <div class="chart-controls">
            <button class="btn-filter active">Todos</button>
            <button class="btn-filter">Críticos</button>
          </div>
        </div>
        <div class="chart-body">
          <canvas id="inventoryChart"></canvas>
        </div>
      </div>
    </div>
    <div class="recent-sales">
      <div class="section-header">
        <h3>Vendas Recentes</h3>
        <button class="btn-view-all">Ver Todas <i class="fas fa-arrow-right"></i></button>
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Data</th>
              <th>Cliente</th>
              <th>Vendedor</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody id="recent-sales-table">
            <!-- Populated by JavaScript -->
          </tbody>
        </table>
      </div>
    </div>
  `;
  
  document.querySelector('.dashboard').innerHTML = content;
  
  const revenueCtx = document.getElementById('revenueChart').getContext('2d');
  const revenueChart = new Chart(revenueCtx, {
    type: 'bar',
    data: {
      labels: data.revenue.labels,
      datasets: [{
        label: 'Faturamento (R$)',
        data: data.revenue.datasets,
        backgroundColor: 'rgba(26, 35, 126, 0.8)',
        borderColor: 'rgba(26, 35, 126, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return 'R$ ' + (value/1000) + 'k';
            }
          }
        }
      }
    }
  });
  
  const topProductsCtx = document.getElementById('topProductsChart').getContext('2d');
  const topProductsChart = new Chart(topProductsCtx, {
    type: 'doughnut',
    data: {
      labels: data.topProducts.labels,
      datasets: [{
        data: data.topProducts.datasets,
        backgroundColor: [
          'rgba(26, 35, 126, 0.8)',
          'rgba(0, 105, 92, 0.8)',
          'rgba(74, 20, 140, 0.8)',
          'rgba(216, 27, 96, 0.8)',
          'rgba(245, 127, 23, 0.8)'
        ],
        borderColor: [
          'rgba(26, 35, 126, 1)',
          'rgba(0, 105, 92, 1)',
          'rgba(74, 20, 140, 1)',
          'rgba(216, 27, 96, 1)',
          'rgba(245, 127, 23, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.raw + '%';
            }
          }
        }
      }
    }
  });
  
  const sellersCtx = document.getElementById('sellersChart').getContext('2d');
  const sellersChart = new Chart(sellersCtx, {
    type: 'bar',
    data: {
      labels: data.sellers.labels,
      datasets: [{
        label: 'Vendas (R$)',
        data: data.sellers.datasets,
        backgroundColor: 'rgba(0, 105, 92, 0.8)',
        borderColor: 'rgba(0, 105, 92, 1)',
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return 'R$ ' + (value/1000) + 'k';
            }
          }
        }
      }
    }
  });
  
  const inventoryCtx = document.getElementById('inventoryChart').getContext('2d');
  const inventoryChart = new Chart(inventoryCtx, {
    type: 'bar',
    data: {
      labels: data.inventory.labels,
      datasets: [{
        label: 'Nível de Estoque (%)',
        data: data.inventory.datasets,
        backgroundColor: data.inventory.datasets.map(value => 
          value <= data.inventory.threshold ? 'rgba(213, 0, 0, 0.8)' : 'rgba(74, 20, 140, 0.8)'
        ),
        borderColor: data.inventory.datasets.map(value => 
          value <= data.inventory.threshold ? 'rgba(213, 0, 0, 1)' : 'rgba(74, 20, 140, 1)'
        ),
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
  
  const recentSalesTable = document.getElementById('recent-sales-table');
  recentSalesTable.innerHTML = '';
  
  data.recentSales.forEach(sale => {
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>#${sale.id}</td>
      <td>${sale.date}</td>
      <td>${sale.customer}</td>
      <td>${sale.seller}</td>
      <td>R$ ${sale.amount.toFixed(2).replace('.', ',')}</td>
      <td><span class="status ${sale.status}">${getStatusTranslation(sale.status)}</span></td>
      <td>
        <button class="action-btn"><i class="fas fa-eye"></i></button>
        <button class="action-btn"><i class="fas fa-print"></i></button>
      </td>
    `;
    
    recentSalesTable.appendChild(row);
  });
}

// Load reports page
function loadReports() {
  let content = `
    <div class="welcome-header">
      <h2>Relatórios</h2>
      <p>Gere relatórios detalhados sobre suas vendas, estoque e clientes</p>
    </div>
    
    <div class="reports-container">
      <div class="reports-intro">
        <p>Selecione um tipo de relatório para começar. Você pode personalizar as informações e exportar os dados em diferentes formatos.</p>
      </div>
      
      <div class="reports-types">
        <div class="report-card" data-report="sales">
          <div class="report-icon">
            <i class="fas fa-chart-line"></i>
          </div>
          <div class="report-info">
            <h3>Relatório de Vendas</h3>
            <p>Análise detalhada de vendas por período, produto, vendedor ou cliente.</p>
            <button class="btn btn-primary" id="sales-report-btn">Gerar Relatório</button>
          </div>
        </div>
        
        <div class="report-card" data-report="inventory">
          <div class="report-icon">
            <i class="fas fa-boxes"></i>
          </div>
          <div class="report-info">
            <h3>Relatório de Estoque</h3>
            <p>Visão geral do estoque atual, produtos em falta, rotatividade e validade.</p>
            <button class="btn btn-primary" id="inventory-report-btn">Gerar Relatório</button>
          </div>
        </div>
        
        <div class="report-card" data-report="financial">
          <div class="report-icon">
            <i class="fas fa-dollar-sign"></i>
          </div>
          <div class="report-info">
            <h3>Relatório Financeiro</h3>
            <p>Faturamento, lucros, despesas e projeções financeiras.</p>
            <button class="btn btn-primary" id="financial-report-btn">Gerar Relatório</button>
          </div>
        </div>
        
        <div class="report-card" data-report="customers">
          <div class="report-icon">
            <i class="fas fa-user-friends"></i>
          </div>
          <div class="report-info">
            <h3>Relatório de Clientes</h3>
            <p>Análise de clientes, comportamento de compra e fidelidade.</p>
            <button class="btn btn-primary" id="customers-report-btn">Gerar Relatório</button>
          </div>
        </div>
      </div>
      
      <div class="report-configuration" style="display: none;">
        <!-- This will be populated when a report type is selected -->
      </div>
      
      <div class="report-preview" style="display: none;">
        <!-- This will be populated when a report is generated -->
      </div>
    </div>
  `;
  
  document.querySelector('.dashboard').innerHTML = content;
  
  document.querySelectorAll('.report-card').forEach(card => {
    card.addEventListener('click', function() {
      const reportType = this.getAttribute('data-report');
      showReportConfiguration(reportType);
    });
  });
}

// Show report configuration
function showReportConfiguration(reportType) {
  const configContainer = document.querySelector('.report-configuration');
  configContainer.style.display = 'block';
  
  let configHTML = '';
  
  switch (reportType) {
    case 'sales':
      configHTML = `
        <h3>Configurar Relatório de Vendas</h3>
        
        <div class="form-group">
          <label>Período</label>
          <div class="date-range-picker">
            <div class="form-group">
              <label for="date-from">De</label>
              <input type="date" id="date-from" class="form-control" value="2025-01-01">
            </div>
            <div class="form-group">
              <label for="date-to">Até</label>
              <input type="date" id="date-to" class="form-control" value="2025-03-13">
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label>Agrupar por</label>
          <select id="group-by" class="form-control">
            <option value="day">Dia</option>
            <option value="week">Semana</option>
            <option value="month" selected>Mês</option>
            <option value="quarter">Trimestre</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Incluir no relatório</label>
          <div class="checkbox-group">
            <div class="checkbox-item">
              <input type="checkbox" id="include-products" checked>
              <label for="include-products">Produtos</label>
            </div>
            <div class="checkbox-item">
              <input type="checkbox" id="include-sellers" checked>
              <label for="include-sellers">Vendedores</label>
            </div>
            <div class="checkbox-item">
              <input type="checkbox" id="include-customers" checked>
              <label for="include-customers">Clientes</label>
            </div>
            <div class="checkbox-item">
              <input type="checkbox" id="include-payment" checked>
              <label for="include-payment">Formas de Pagamento</label>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label>Formato de Exportação</label>
          <select id="export-format" class="form-control">
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
            <option value="csv">CSV</option>
          </select>
        </div>
        
        <div class="form-buttons">
          <button class="btn btn-primary" id="generate-report">Gerar Relatório</button>
          <button class="btn btn-secondary" id="cancel-report">Cancelar</button>
        </div>
      `;
      break;
    
    case 'inventory':
      configHTML = `
        <h3>Configurar Relatório de Estoque</h3>
        
        <div class="form-group">
          <label>Tipo de Relatório</label>
          <select id="inventory-report-type" class="form-control">
            <option value="current">Estoque Atual</option>
            <option value="low">Produtos com Estoque Baixo</option>
            <option value="turnover">Rotatividade de Estoque</option>
            <option value="category">Estoque por Categoria</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Ordenar por</label>
          <select id="order-by" class="form-control">
            <option value="name">Nome</option>
            <option value="category">Categoria</option>
            <option value="stock-asc">Estoque (Menor para Maior)</option>
            <option value="stock-desc" selected>Estoque (Maior para Menor)</option>
            <option value="price">Preço</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Informações Adicionais</label>
          <div class="checkbox-group">
            <div class="checkbox-item">
              <input type="checkbox" id="include-price" checked>
              <label for="include-price">Preço</label>
            </div>
            <div class="checkbox-item">
              <input type="checkbox" id="include-total-value" checked>
              <label for="include-total-value">Valor Total em Estoque</label>
            </div>
            <div class="checkbox-item">
              <input type="checkbox" id="include-threshold">
              <label for="include-threshold">Limite Mínimo</label>
            </div>
            <div class="checkbox-item">
              <input type="checkbox" id="include-last-update">
              <label for="include-last-update">Última Atualização</label>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label>Formato de Exportação</label>
          <select id="export-format" class="form-control">
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
            <option value="csv">CSV</option>
          </select>
        </div>
        
        <div class="form-buttons">
          <button class="btn btn-primary" id="generate-report">Gerar Relatório</button>
          <button class="btn btn-secondary" id="cancel-report">Cancelar</button>
        </div>
      `;
      break;
    
    default:
      configHTML = `
        <h3>Configurar ${reportTypeToText(reportType)}</h3>
        <p>Selecione as opções para gerar o relatório.</p>
        
        <div class="form-group">
          <label>Período</label>
          <div class="date-range-picker">
            <div class="form-group">
              <label for="date-from">De</label>
              <input type="date" id="date-from" class="form-control" value="2025-01-01">
            </div>
            <div class="form-group">
              <label for="date-to">Até</label>
              <input type="date" id="date-to" class="form-control" value="2025-03-13">
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label>Formato de Exportação</label>
          <select id="export-format" class="form-control">
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
            <option value="csv">CSV</option>
          </select>
        </div>
        
        <div class="form-buttons">
          <button class="btn btn-primary" id="generate-report">Gerar Relatório</button>
          <button class="btn btn-secondary" id="cancel-report">Cancelar</button>
        </div>
      `;
  }
  
  configContainer.innerHTML = configHTML;
  
  document.getElementById('generate-report').addEventListener('click', function() {
    generateReport(reportType);
  });
  
  document.getElementById('cancel-report').addEventListener('click', function() {
    configContainer.style.display = 'none';
    document.querySelector('.report-preview').style.display = 'none';
  });
}

// Generate a report preview
function generateReport(reportType) {
  const previewContainer = document.querySelector('.report-preview');
  previewContainer.style.display = 'block';
  
  let previewHTML = '';
  const dateFrom = document.getElementById('date-from').value;
  const dateTo = document.getElementById('date-to').value;
  
  switch (reportType) {
    case 'sales':
      previewHTML = `
        <div class="report-preview-header">
          <h3>Relatório de Vendas</h3>
          <p>Período: ${formatDate(dateFrom)} a ${formatDate(dateTo)}</p>
        </div>
        
        <div class="report-chart-container">
          <canvas id="reportChart"></canvas>
        </div>
        
        <div class="report-summary">
          <div class="summary-card">
            <h4>Total de Vendas</h4>
            <p>5.482</p>
          </div>
          <div class="summary-card">
            <h4>Faturamento</h4>
            <p>R$ 1.500.000,00</p>
          </div>
          <div class="summary-card">
            <h4>Ticket Médio</h4>
            <p>R$ 273,62</p>
          </div>
          <div class="summary-card">
            <h4>Produtos Vendidos</h4>
            <p>12.587</p>
          </div>
        </div>
        
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Mês</th>
                <th>Vendas</th>
                <th>Faturamento</th>
                <th>Ticket Médio</th>
                <th>% do Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Janeiro/2025</td>
                <td>1.825</td>
                <td>R$ 500.000,00</td>
                <td>R$ 273,97</td>
                <td>33,3%</td>
              </tr>
              <tr>
                <td>Fevereiro/2025</td>
                <td>1.786</td>
                <td>R$ 480.000,00</td>
                <td>R$ 268,76</td>
                <td>32,0%</td>
              </tr>
              <tr>
                <td>Março/2025</td>
                <td>1.871</td>
                <td>R$ 520.000,00</td>
                <td>R$ 277,93</td>
                <td>34,7%</td>
              </tr>
              <tr class="total-row">
                <td><strong>Total</strong></td>
                <td><strong>5.482</strong></td>
                <td><strong>R$ 1.500.000,00</strong></td>
                <td><strong>R$ 273,62</strong></td>
                <td><strong>100%</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="form-buttons">
          <button class="btn btn-primary" id="export-report">Exportar Relatório</button>
          <button class="btn btn-secondary" id="print-report">Imprimir</button>
        </div>
      `;
      break;
    
    default:
      previewHTML = `
        <div class="report-preview-header">
          <h3>${reportTypeToText(reportType)}</h3>
          <p>Período: ${formatDate(dateFrom)} a ${formatDate(dateTo)}</p>
        </div>
        
        <div class="report-chart-container">
          <canvas id="reportChart"></canvas>
        </div>
        
        <div class="table-container">
          <p>Relatório em desenvolvimento. Esta é uma visualização preliminar.</p>
        </div>
        
        <div class="form-buttons">
          <button class="btn btn-primary" id="export-report">Exportar Relatório</button>
          <button class="btn btn-secondary" id="print-report">Imprimir</button>
        </div>
      `;
  }
  
  previewContainer.innerHTML = previewHTML;
  
  const chartCtx = document.getElementById('reportChart').getContext('2d');
  const reportChart = new Chart(chartCtx, {
    type: 'bar',
    data: {
      labels: ['Janeiro', 'Fevereiro', 'Março'],
      datasets: [{
        label: 'Faturamento (R$)',
        data: [500000, 480000, 520000],
        backgroundColor: 'rgba(26, 35, 126, 0.8)',
        borderColor: 'rgba(26, 35, 126, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return 'R$ ' + (value/1000) + 'k';
            }
          }
        }
      }
    }
  });
  
  document.getElementById('export-report').addEventListener('click', function() {
    showToast('success', 'Relatório exportado com sucesso!');
  });
  
  document.getElementById('print-report').addEventListener('click', function() {
    showToast('info', 'Enviando para impressão...');
  });
}

// Helper function to format dates
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
}

// Helper function to convert report type to text
function reportTypeToText(reportType) {
  switch (reportType) {
    case 'sales': return 'Relatório de Vendas';
    case 'inventory': return 'Relatório de Estoque';
    case 'financial': return 'Relatório Financeiro';
    case 'customers': return 'Relatório de Clientes';
    default: return 'Relatório';
  }
}

// Load settings page
function loadSettings() {
  let content = `
    <div class="welcome-header">
      <h2>Configurações</h2>
      <p>Personalize sua experiência no sistema</p>
    </div>
    
    <div class="settings-container">
      <ul class="settings-tabs">
        <li class="active" data-tab="appearance">Aparência</li>
        <li data-tab="notifications">Notificações</li>
        <li data-tab="account">Conta</li>
        <li data-tab="system">Sistema</li>
      </ul>
      
      <div class="settings-tab active" id="appearance-tab">
        <h3>Aparência</h3>
        
        <div class="form-group">
          <label>Tema</label>
          <div class="theme-options">
            <div class="theme-option light-theme selected" data-theme="light">
              <div class="theme-preview">
                <div class="theme-preview-header"></div>
                <div class="theme-preview-sidebar"></div>
                <div class="theme-preview-content"></div>
              </div>
              <span>Tema Claro</span>
            </div>
            
            <div class="theme-option dark-theme" data-theme="dark">
              <div class="theme-preview">
                <div class="theme-preview-header"></div>
                <div class="theme-preview-sidebar"></div>
                <div class="theme-preview-content"></div>
              </div>
              <span>Tema Escuro</span>
            </div>
            
            <div class="theme-option blue-theme" data-theme="blue">
              <div class="theme-preview">
                <div class="theme-preview-header"></div>
                <div class="theme-preview-sidebar"></div>
                <div class="theme-preview-content"></div>
              </div>
              <span>Tema Azul</span>
            </div>
            
            <div class="theme-option green-theme" data-theme="green">
              <div class="theme-preview">
                <div class="theme-preview-header"></div>
                <div class="theme-preview-sidebar"></div>
                <div class="theme-preview-content"></div>
              </div>
              <span>Tema Verde</span>
            </div>
          </div>
        </div>
        
        <div class="form-group">
          <label>Cor Primária</label>
          <div class="color-picker-container">
            <input type="color" id="primary-color" class="color-picker" value="#1a237e">
            <input type="text" id="primary-color-hex" class="color-hex" value="#1a237e">
          </div>
        </div>
        
        <div class="form-group">
          <label>Cor Secundária</label>
          <div class="color-picker-container">
            <input type="color" id="secondary-color" class="color-picker" value="#00695c">
            <input type="text" id="secondary-color-hex" class="color-hex" value="#00695c">
          </div>
        </div>
        
        <div class="form-group">
          <label>Tamanho da Fonte</label>
          <select id="font-size" class="form-control">
            <option value="small">Pequeno</option>
            <option value="medium" selected>Médio</option>
            <option value="large">Grande</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Densidade do Layout</label>
          <select id="layout-density" class="form-control">
            <option value="compact">Compacto</option>
            <option value="normal" selected>Normal</option>
            <option value="comfortable">Confortável</option>
          </select>
        </div>
      </div>
      
      <div class="settings-tab" id="notifications-tab">
        <h3>Notificações</h3>
        
        <div class="form-group">
          <div class="switch-group">
            <label class="switch">
              <input type="checkbox" id="stock-notifications" checked>
              <span class="slider round"></span>
            </label>
            <span>Notificações de Estoque Baixo</span>
          </div>
          <div class="dependent-control" id="stock-threshold-control">
            <label>Limite para Alerta de Estoque Baixo (%)</label>
            <input type="number" id="stock-threshold" class="form-control" min="1" max="100" value="30">
          </div>
        </div>
        
        <div class="form-group">
          <div class="switch-group">
            <label class="switch">
              <input type="checkbox" id="sales-notifications" checked>
              <span class="slider round"></span>
            </label>
            <span>Notificações de Novas Vendas</span>
          </div>
        </div>
        
        <div class="form-group">
          <div class="switch-group">
            <label class="switch">
              <input type="checkbox" id="customer-notifications" checked>
              <span class="slider round"></span>
            </label>
            <span>Notificações de Novos Clientes</span>
          </div>
        </div>
        
        <div class="form-group">
          <div class="switch-group">
            <label class="switch">
              <input type="checkbox" id="sound-notifications" checked>
              <span class="slider round"></span>
            </label>
            <span>Sons de Notificação</span>
          </div>
          <div class="dependent-control" id="volume-control">
            <label>Volume</label>
            <input type="range" id="notification-volume" min="0" max="100" value="50">
          </div>
        </div>
        
        <div class="form-group">
          <label>Mostrar Notificações por</label>
          <select id="notification-duration" class="form-control">
            <option value="3">3 segundos</option>
            <option value="5" selected>5 segundos</option>
            <option value="10">10 segundos</option>
          </select>
        </div>
      </div>
      
      <div class="settings-tab" id="account-tab">
        <h3>Configurações da Conta</h3>
        
        <div class="form-group">
          <label for="account-name">Nome</label>
          <input type="text" id="account-name" class="form-control" value="Admin">
        </div>
        
        <div class="form-group">
          <label for="account-email">Email</label>
          <input type="email" id="account-email" class="form-control" value="admin@naturaisphp.com.br">
        </div>
        
        <div class="form-group">
          <label for="account-password">Senha</label>
          <input type="password" id="account-password" class="form-control" value="********">
        </div>
        
        <div class="form-group">
          <label>Idioma</label>
          <select id="account-language" class="form-control">
            <option value="pt-BR" selected>Português (Brasil)</option>
            <option value="en-US">English (United States)</option>
            <option value="es-ES">Español</option>
          </select>
        </div>
        
        <div class="form-group">
          <div class="switch-group">
            <label class="switch">
              <input type="checkbox" id="two-factor-auth">
              <span class="slider round"></span>
            </label>
            <span>Autenticação de Dois Fatores</span>
          </div>
        </div>
      </div>
      
      <div class="settings-tab" id="system-tab">
        <h3>Sistema</h3>
        
        <div class="form-group">
          <label>Formato de Data</label>
          <select id="date-format" class="form-control">
            <option value="dd/mm/yyyy" selected>DD/MM/AAAA</option>
            <option value="mm/dd/yyyy">MM/DD/AAAA</option>
            <option value="yyyy-mm-dd">AAAA-MM-DD</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Formato de Moeda</label>
          <select id="currency-format" class="form-control">
            <option value="BRL" selected>R$ 1.234,56</option>
            <option value="USD">$1,234.56</option>
            <option value="EUR">€1.234,56</option>
          </select>
        </div>
        
        <div class="form-group">
          <label>Backup Automático</label>
          <div class="switch-group">
            <label class="switch">
              <input type="checkbox" id="auto-backup" checked>
              <span class="slider round"></span>
            </label>
            <span>Ativar Backup Automático</span>
          </div>
          <div class="dependent-control" id="backup-frequency-control">
            <label>Frequência</label>
            <select id="backup-frequency" class="form-control">
              <option value="daily">Diário</option>
              <option value="weekly" selected>Semanal</option>
              <option value="monthly">Mensal</option>
            </select>
          </div>
        </div>
        
        <div class="form-group">
          <label>Backup Manual</label>
          <div class="backup-controls">
            <button class="btn btn-primary" id="create-backup">Criar Backup</button>
            <button class="btn btn-secondary" id="restore-backup">Restaurar Backup</button>
          </div>
        </div>
      </div>
      
      <div class="settings-buttons">
        <button class="btn btn-primary" id="save-settings">Salvar Configurações</button>
        <button class="btn btn-secondary" id="reset-settings">Restaurar Padrões</button>
      </div>
    </div>
  `;
  
  document.querySelector('.dashboard').innerHTML = content;
  
  const savedTheme = localStorage.getItem('theme') || 'light';
  const savedFontSize = localStorage.getItem('fontSize') || 'medium';
  const savedDensity = localStorage.getItem('density') || 'normal';
  
  document.querySelector(`.theme-option[data-theme="${savedTheme}"]`).classList.add('selected');
  document.getElementById('font-size').value = savedFontSize;
  document.getElementById('layout-density').value = savedDensity;
  
  document.getElementById('save-settings').addEventListener('click', function() {
    const selectedTheme = document.querySelector('.theme-option.selected').getAttribute('data-theme');
    localStorage.setItem('theme', selectedTheme);
    
    const fontSize = document.getElementById('font-size').value;
    localStorage.setItem('fontSize', fontSize);
    body.setAttribute('data-font-size', fontSize);
    
    const density = document.getElementById('layout-density').value;
    localStorage.setItem('density', density);
    body.setAttribute('data-density', density);
    
    const primaryColor = document.getElementById('primary-color').value;
    localStorage.setItem('primaryColor', primaryColor);
    
    const secondaryColor = document.getElementById('secondary-color').value;
    localStorage.setItem('secondaryColor', secondaryColor);
    
    document.getElementById('primary-color').addEventListener('input', function() {
      document.getElementById('primary-color-hex').value = this.value;
      document.documentElement.style.setProperty('--primary-color', this.value);
    });
    
    document.getElementById('secondary-color').addEventListener('input', function() {
      document.getElementById('secondary-color-hex').value = this.value;
      document.documentElement.style.setProperty('--secondary-color', this.value);
    });
    
    document.getElementById('primary-color-hex').addEventListener('input', function() {
      document.getElementById('primary-color').value = this.value;
      document.documentElement.style.setProperty('--primary-color', this.value);
    });
    
    document.getElementById('secondary-color-hex').addEventListener('input', function() {
      document.getElementById('secondary-color').value = this.value;
      document.documentElement.style.setProperty('--secondary-color', this.value);
    });
    
    document.getElementById('create-backup').addEventListener('click', function() {
      showToast('success', 'Backup criado com sucesso!');
    });
    
    document.getElementById('restore-backup').addEventListener('click', function() {
      showToast('info', 'Por favor, selecione um arquivo de backup para restaurar.');
    });
    
    showToast('success', 'Configurações salvas com sucesso!');
  });
  
  document.getElementById('reset-settings').addEventListener('click', function() {
    localStorage.removeItem('theme');
    localStorage.removeItem('fontSize');
    localStorage.removeItem('density');
    localStorage.removeItem('primaryColor');
    localStorage.removeItem('secondaryColor');
    loadSettings();
    showToast('success', 'Configurações restauradas para os valores padrão.');
  });
}

// Load clients management page
function loadClientsPage() {
  let content = `
    <div class="welcome-header">
      <h2>Gerenciamento de Clientes</h2>
      <p>Cadastre e gerencie seus clientes</p>
    </div>
    
    <div class="clients-actions">
      <button class="btn btn-primary" id="add-client-btn"><i class="fas fa-user-plus"></i> Novo Cliente</button>
      <button class="btn btn-secondary" id="import-clients-btn"><i class="fas fa-file-import"></i> Importar Clientes</button>
    </div>
    
    <div class="client-stats">
      <div class="metrics-cards">
        <div class="metric-card customers">
          <div class="metric-icon">
            <i class="fas fa-users"></i>
          </div>
          <div class="metric-info">
            <h3>Total de Clientes</h3>
            <p class="metric-value">1.287</p>
            <p class="metric-change positive"><i class="fas fa-arrow-up"></i> 6.8% desde o mês passado</p>
          </div>
        </div>
        
        <div class="metric-card sales">
          <div class="metric-icon">
            <i class="fas fa-shopping-bag"></i>
          </div>
          <div class="metric-info">
            <h3>Clientes Ativos</h3>
            <p class="metric-value">954</p>
            <p class="metric-change positive"><i class="fas fa-arrow-up"></i> 4.2% desde o mês passado</p>
          </div>
        </div>
        
        <div class="metric-card inventory">
          <div class="metric-icon">
            <i class="fas fa-chart-line"></i>
          </div>
          <div class="metric-info">
            <h3>Compra Média</h3>
            <p class="metric-value">R$ 273,62</p>
            <p class="metric-change positive"><i class="fas fa-arrow-up"></i> 3.5% desde o mês passado</p>
          </div>
        </div>
        
        <div class="metric-card orders">
          <div class="metric-icon">
            <i class="fas fa-wallet"></i>
          </div>
          <div class="metric-info">
            <h3>Valor Médio</h3>
            <p class="metric-value">R$ 1.568,42</p>
            <p class="metric-change positive"><i class="fas fa-arrow-up"></i> 7.1% desde o mês passado</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="clients-filter-container">
      <div class="search-container clients-search">
        <i class="fas fa-search"></i>
        <input type="text" id="clients-search" placeholder="Buscar clientes...">
      </div>
      
      <div class="clients-filters">
        <button class="btn-filter active" data-filter="all">Todos</button>
        <button class="btn-filter" data-filter="active">Ativos</button>
        <button class="btn-filter" data-filter="inactive">Inativos</button>
        <button class="btn-filter" data-filter="recent">Recentes</button>
      </div>
    </div>
    
    <div class="clients-list">
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Data de Cadastro</th>
              <th>Última Compra</th>
              <th>Total Gasto</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody id="clients-table-body">
            <!-- Will be populated by JS -->
          </tbody>
        </table>
      </div>
    </div>
    
    <div class="pagination">
      <button class="pagination-btn" id="prev-page" disabled><i class="fas fa-chevron-left"></i></button>
      <span class="pagination-info">Página <span id="current-page">1</span> de <span id="total-pages">5</span></span>
      <button class="pagination-btn" id="next-page"><i class="fas fa-chevron-right"></i></button>
    </div>
  `;
  
  document.querySelector('.dashboard').innerHTML = content;
  
  const clients = [
    { id: 1, name: 'Roberto Almeida', email: 'roberto@email.com', phone: '(11) 98765-4321', registerDate: '10/01/2025', lastPurchase: '12/03/2025', totalSpent: 5299.99, status: 'active' },
    { id: 2, name: 'Carla Moreira', email: 'carla@email.com', phone: '(11) 98765-4322', registerDate: '15/01/2025', lastPurchase: '13/03/2025', totalSpent: 3299.99, status: 'active' },
    { id: 3, name: 'Fernando Costa', email: 'fernando@email.com', phone: '(11) 98765-4323', registerDate: '20/01/2025', lastPurchase: '12/03/2025', totalSpent: 899.99, status: 'active' },
    { id: 4, name: 'Amanda Dias', email: 'amanda@email.com', phone: '(11) 98765-4324', registerDate: '25/01/2025', lastPurchase: '12/03/2025', totalSpent: 2499.99, status: 'active' },
    { id: 5, name: 'Paulo Silveira', email: 'paulo@email.com', phone: '(11) 98765-4325', registerDate: '30/01/2025', lastPurchase: '11/03/2025', totalSpent: 4999.99, status: 'active' },
    { id: 6, name: 'Juliana Martins', email: 'juliana@email.com', phone: '(11) 98765-4326', registerDate: '05/02/2025', lastPurchase: '11/03/2025', totalSpent: 1899.99, status: 'active' },
    { id: 7, name: 'Marcelo Rocha', email: 'marcelo@email.com', phone: '(11) 98765-4327', registerDate: '10/02/2025', lastPurchase: '10/03/2025', totalSpent: 599.98, status: 'active' },
    { id: 8, name: 'Regina Castro', email: 'regina@email.com', phone: '(11) 98765-4328', registerDate: '15/02/2025', lastPurchase: '10/03/2025', totalSpent: 1299.99, status: 'active' },
    { id: 9, name: 'Thiago Ferreira', email: 'thiago@email.com', phone: '(11) 98765-4329', registerDate: '20/02/2025', lastPurchase: '09/03/2025', totalSpent: 799.99, status: 'active' },
    { id: 10, name: 'Luciana Oliveira', email: 'luciana@email.com', phone: '(11) 98765-4330', registerDate: '25/02/2025', lastPurchase: '08/03/2025', totalSpent: 2199.99, status: 'active' },
    { id: 11, name: 'Daniel Souza', email: 'daniel@email.com', phone: '(11) 98765-4331', registerDate: '01/03/2025', lastPurchase: '07/03/2025', totalSpent: 1799.99, status: 'active' },
    { id: 12, name: 'Patrícia Lima', email: 'patricia@email.com', phone: '(11) 98765-4332', registerDate: '05/03/2025', lastPurchase: '05/03/2025', totalSpent: 999.99, status: 'active' },
    { id: 13, name: 'Rodrigo Santos', email: 'rodrigo@email.com', phone: '(11) 98765-4333', registerDate: '10/12/2024', lastPurchase: '15/01/2025', totalSpent: 499.99, status: 'inactive' },
    { id: 14, name: 'Camila Pereira', email: 'camila@email.com', phone: '(11) 98765-4334', registerDate: '15/12/2024', lastPurchase: '10/01/2025', totalSpent: 699.99, status: 'inactive' },
    { id: 15, name: 'Gustavo Alves', email: 'gustavo@email.com', phone: '(11) 98765-4335', registerDate: '12/03/2025', lastPurchase: '12/03/2025', totalSpent: 299.99, status: 'recent' }
  ];
  
  function populateClientsTable(clientsList) {
    const tableBody = document.getElementById('clients-table-body');
    tableBody.innerHTML = '';
    
    clientsList.forEach(client => {
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>#${client.id}</td>
        <td>${client.name}</td>
        <td>${client.email}</td>
        <td>${client.phone}</td>
        <td>${client.registerDate}</td>
        <td>${client.lastPurchase}</td>
        <td>R$ ${client.totalSpent.toFixed(2).replace('.', ',')}</td>
        <td><span class="status ${client.status === 'active' ? 'completed' : client.status === 'recent' ? 'pending' : 'canceled'}">${getClientStatusText(client.status)}</span></td>
        <td>
          <button class="action-btn view-client" data-id="${client.id}"><i class="fas fa-eye"></i></button>
          <button class="action-btn edit-client" data-id="${client.id}"><i class="fas fa-edit"></i></button>
          <button class="action-btn delete-client" data-id="${client.id}"><i class="fas fa-trash"></i></button>
        </td>
      `;
      
      tableBody.appendChild(row);
    });
    
    document.querySelectorAll('.view-client').forEach(btn => {
      btn.addEventListener('click', function() {
        const clientId = this.getAttribute('data-id');
        viewClient(clientId);
      });
    });
    
    document.querySelectorAll('.edit-client').forEach(btn => {
      btn.addEventListener('click', function() {
        const clientId = this.getAttribute('data-id');
        editClient(clientId);
      });
    });
    
    document.querySelectorAll('.delete-client').forEach(btn => {
      btn.addEventListener('click', function() {
        const clientId = this.getAttribute('data-id');
        deleteClient(clientId);
      });
    });
  }
  
  function getClientStatusText(status) {
    switch(status) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'recent': return 'Recente';
      default: return status;
    }
  }
  
  document.getElementById('add-client-btn').addEventListener('click', function() {
    openModal('Novo Cliente', createNewClientForm());
    setupNewClientForm();
  });
  
  document.getElementById('import-clients-btn').addEventListener('click', function() {
    openModal('Importar Clientes', `
      <div class="import-instructions">
        <p>Selecione um arquivo CSV ou Excel com a lista de clientes para importar.</p>
        <p>O arquivo deve conter as seguintes colunas: Nome, Email, Telefone.</p>
      </div>
      <div class="form-group">
        <label for="import-file">Arquivo</label>
        <input type="file" id="import-file" class="form-control" accept=".csv,.xlsx,.xls">
      </div>
      <div class="form-buttons">
        <button class="btn btn-secondary" id="cancel-import">Cancelar</button>
        <button class="btn btn-primary" id="confirm-import">Importar</button>
      </div>
    `);
    
    document.getElementById('cancel-import').addEventListener('click', function() {
      modalContainer.classList.remove('active');
    });
    
    document.getElementById('confirm-import').addEventListener('click', function() {
      const fileInput = document.getElementById('import-file');
      if (fileInput.files.length > 0) {
        showToast('success', 'Importação iniciada. Você será notificado quando concluir.');
        modalContainer.classList.remove('active');
      } else {
        showToast('error', 'Por favor, selecione um arquivo para importar.');
      }
    });
  });
  
  document.querySelectorAll('.clients-filters .btn-filter').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.clients-filters .btn-filter').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      let filteredClients;
      
      if (filter === 'all') {
        filteredClients = clients;
      } else {
        filteredClients = clients.filter(client => client.status === filter);
      }
      
      populateClientsTable(filteredClients);
    });
  });
  
  const searchInput = document.getElementById('clients-search');
  searchInput.addEventListener('keyup', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredClients = clients.filter(client => 
      client.name.toLowerCase().includes(searchTerm) || 
      client.email.toLowerCase().includes(searchTerm) || 
      client.phone.includes(searchTerm)
    );
    
    populateClientsTable(filteredClients);
  });
  
  function viewClient(clientId) {
    const client = clients.find(c => c.id == clientId);
    if (!client) return;
    
    let clientDetailsHTML = `
      <div class="client-profile">
        <div class="client-header">
          <div class="client-avatar">
            <img src="${client.photo}" alt="${client.name}">
          </div>
          <div class="client-title">
            <h3>${client.name}</h3>
            <p class="client-id">ID: #${client.id}</p>
            <p class="client-status"><span class="status ${client.status === 'active' ? 'completed' : client.status === 'recent' ? 'pending' : 'canceled'}">${getClientStatusText(client.status)}</span></p>
          </div>
        </div>
        
        <div class="client-info-grid">
          <div class="client-info-card">
            <h4><i class="fas fa-envelope"></i> Email</h4>
            <p>${client.email}</p>
          </div>
          <div class="client-info-card">
            <h4><i class="fas fa-phone"></i> Telefone</h4>
            <p>${client.phone}</p>
          </div>
          <div class="client-info-card">
            <h4><i class="fas fa-calendar-alt"></i> Data de Cadastro</h4>
            <p>${client.registerDate}</p>
          </div>
          <div class="client-info-card">
            <h4><i class="fas fa-shopping-bag"></i> Última Compra</h4>
            <p>${client.lastPurchase}</p>
          </div>
          <div class="client-info-card">
            <h4><i class="fas fa-wallet"></i> Total Gasto</h4>
            <p>R$ ${client.totalSpent.toFixed(2).replace('.', ',')}</p>
          </div>
          <div class="client-info-card">
            <h4><i class="fas fa-chart-line"></i> Compras</h4>
            <p>15 compras</p>
          </div>
        </div>
        
        <div class="client-purchases">
          <h3>Histórico de Compras</h3>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Data</th>
                  <th>Valor</th>
                  <th>Produtos</th>
                  <th>Status</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#5482</td>
                  <td>13/03/2025</td>
                  <td>R$ 1.299,99</td>
                  <td>3 itens</td>
                  <td><span class="status completed">Concluída</span></td>
                  <td><button class="action-btn"><i class="fas fa-eye"></i></button></td>
                </tr>
                <tr>
                  <td>#5370</td>
                  <td>01/03/2025</td>
                  <td>R$ 899,99</td>
                  <td>2 itens</td>
                  <td><span class="status completed">Concluída</span></td>
                  <td><button class="action-btn"><i class="fas fa-eye"></i></button></td>
                </tr>
                <tr>
                  <td>#5280</td>
                  <td>15/02/2025</td>
                  <td>R$ 2.499,99</td>
                  <td>5 itens</td>
                  <td><span class="status completed">Concluída</span></td>
                  <td><button class="action-btn"><i class="fas fa-eye"></i></button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
    
    openModal(`Cliente: ${client.name}`, clientDetailsHTML);
  }
  
  function editClient(clientId) {
    const client = clients.find(c => c.id == clientId);
    if (!client) return;
    
    openModal('Editar Cliente', createEditClientForm(client));
    setupEditClientForm(client);
  }
  
  function deleteClient(clientId) {
    const client = clients.find(c => c.id == clientId);
    if (!client) return;
    
    openModal('Excluir Cliente', `
      <div class="delete-confirmation">
        <div class="delete-icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <p>Tem certeza que deseja excluir o cliente <strong>${client.name}</strong>?</p>
        <p>Esta ação não poderá ser desfeita.</p>
      </div>
      <div class="form-buttons">
        <button class="btn btn-secondary" id="cancel-delete">Cancelar</button>
        <button class="btn btn-danger" id="confirm-delete">Excluir</button>
      </div>
    `);
    
    document.getElementById('cancel-delete').addEventListener('click', function() {
      modalContainer.classList.remove('active');
    });
    
    document.getElementById('confirm-delete').addEventListener('click', function() {
      const index = clients.findIndex(c => c.id == clientId);
      if (index !== -1) {
        clients.splice(index, 1);
      }
      
      modalContainer.classList.remove('active');
      
      const activeFilter = document.querySelector('.clients-filters .btn-filter.active');
      const filter = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
      
      let filteredClients;
      if (filter === 'all') {
        filteredClients = clients;
      } else {
        filteredClients = clients.filter(c => c.status === filter);
      }
      
      populateClientsTable(filteredClients);
      
      showToast('success', `Cliente ${client.name} excluído com sucesso!`);
    });
  }
  
  function createNewClientForm() {
    return `
      <form id="new-client-form">
        <div class="form-grid">
          <div class="form-group">
            <label for="client-name">Nome</label>
            <input type="text" id="client-name" class="form-control" required>
          </div>
          
          <div class="form-group">
            <label for="client-email">Email</label>
            <input type="email" id="client-email" class="form-control" required>
          </div>
          
          <div class="form-group">
            <label for="client-phone">Telefone</label>
            <input type="text" id="client-phone" class="form-control" required>
          </div>
          
          <div class="form-group">
            <label for="client-cpf">CPF/CNPJ</label>
            <input type="text" id="client-cpf" class="form-control">
          </div>
          
          <div class="form-group form-grid-full">
            <label for="client-address">Endereço</label>
            <input type="text" id="client-address" class="form-control">
          </div>
          
          <div class="form-group">
            <label for="client-city">Cidade</label>
            <input type="text" id="client-city" class="form-control">
          </div>
          
          <div class="form-group">
            <label for="client-state">Estado</label>
            <select id="client-state" class="form-control">
              <option value="">Selecione</option>
              <option value="AC">Acre</option>
              <option value="AL">Alagoas</option>
              <option value="AP">Amapá</option>
              <option value="AM">Amazonas</option>
              <option value="BA">Bahia</option>
              <option value="CE">Ceará</option>
              <option value="DF">Distrito Federal</option>
              <option value="ES">Espírito Santo</option>
              <option value="GO">Goiás</option>
              <option value="MA">Maranhão</option>
              <option value="MT">Mato Grosso</option>
              <option value="MS">Mato Grosso do Sul</option>
              <option value="MG">Minas Gerais</option>
              <option value="PA">Pará</option>
              <option value="PB">Paraíba</option>
              <option value="PR">Paraná</option>
              <option value="PE">Pernambuco</option>
              <option value="PI">Piauí</option>
              <option value="RJ">Rio de Janeiro</option>
              <option value="RN">Rio Grande do Norte</option>
              <option value="RS">Rio Grande do Sul</option>
              <option value="RO">Rondônia</option>
              <option value="RR">Roraima</option>
              <option value="SC">Santa Catarina</option>
              <option value="SP">São Paulo</option>
              <option value="SE">Sergipe</option>
              <option value="TO">Tocantins</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="client-zipcode">CEP</label>
            <input type="text" id="client-zipcode" class="form-control">
          </div>
          
          <div class="form-group">
            <label for="client-status">Status</label>
            <select id="client-status" class="form-control">
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
              <option value="recent">Recente</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="client-notes">Observações</label>
            <textarea id="client-notes" class="form-control" rows="3"></textarea>
          </div>
        </div>
        
        <div class="form-buttons">
          <button type="button" class="btn btn-secondary" id="cancel-client">Cancelar</button>
          <button type="submit" class="btn btn-primary">Salvar Cliente</button>
        </div>
      </form>
    `;
  }
  
  function createEditClientForm(client) {
    return `
      <form id="edit-client-form">
        <div class="form-grid">
          <div class="form-group">
            <label for="client-name">Nome</label>
            <input type="text" id="client-name" class="form-control" value="${client.name}" required>
          </div>
          
          <div class="form-group">
            <label for="client-email">Email</label>
            <input type="email" id="client-email" class="form-control" value="${client.email}" required>
          </div>
          
          <div class="form-group">
            <label for="client-phone">Telefone</label>
            <input type="text" id="client-phone" class="form-control" value="${client.phone}" required>
          </div>
          
          <div class="form-group">
            <label for="client-cpf">CPF/CNPJ</label>
            <input type="text" id="client-cpf" class="form-control" value="">
          </div>
          
          <div class="form-group form-grid-full">
            <label for="client-address">Endereço</label>
            <input type="text" id="client-address" class="form-control" value="">
          </div>
          
          <div class="form-group">
            <label for="client-city">Cidade</label>
            <input type="text" id="client-city" class="form-control" value="">
          </div>
          
          <div class="form-group">
            <label for="client-state">Estado</label>
            <select id="client-state" class="form-control">
              <option value="">Selecione</option>
              <option value="SP">São Paulo</option>
              <!-- Other states would be here -->
            </select>
          </div>
          
          <div class="form-group">
            <label for="client-zipcode">CEP</label>
            <input type="text" id="client-zipcode" class="form-control" value="">
          </div>
          
          <div class="form-group">
            <label for="client-status">Status</label>
            <select id="client-status" class="form-control">
              <option value="active" ${client.status === 'active' ? 'selected' : ''}>Ativo</option>
              <option value="inactive" ${client.status === 'inactive' ? 'selected' : ''}>Inativo</option>
              <option value="recent" ${client.status === 'recent' ? 'selected' : ''}>Recente</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="client-notes">Observações</label>
            <textarea id="client-notes" class="form-control" rows="3"></textarea>
          </div>
        </div>
        
        <div class="form-buttons">
          <button type="button" class="btn btn-secondary" id="cancel-client-edit">Cancelar</button>
          <button type="submit" class="btn btn-primary">Atualizar Cliente</button>
        </div>
      </form>
    `;
  }
  
  function setupNewClientForm() {
    const cancelBtn = document.getElementById('cancel-client');
    cancelBtn.addEventListener('click', function() {
      modalContainer.classList.remove('active');
    });
    
    const clientForm = document.getElementById('new-client-form');
    clientForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const newClient = {
        id: clients.length + 1,
        name: document.getElementById('client-name').value,
        email: document.getElementById('client-email').value,
        phone: document.getElementById('client-phone').value,
        registerDate: formatDateToday(),
        lastPurchase: formatDateToday(),
        totalSpent: 0,
        status: document.getElementById('client-status').value
      };
      
      clients.push(newClient);
      
      modalContainer.classList.remove('active');
      
      const activeFilter = document.querySelector('.clients-filters .btn-filter.active');
      const filter = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
      
      let filteredClients;
      if (filter === 'all' || filter === newClient.status) {
        if (filter === 'all') {
          filteredClients = clients;
        } else {
          filteredClients = clients.filter(client => client.status === filter);
        }
        populateClientsTable(filteredClients);
      }
      
      showToast('success', 'Cliente cadastrado com sucesso!');
    });
  }
  
  function setupEditClientForm(client) {
    const cancelBtn = document.getElementById('cancel-client-edit');
    cancelBtn.addEventListener('click', function() {
      modalContainer.classList.remove('active');
    });
    
    const clientForm = document.getElementById('edit-client-form');
    clientForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      client.name = document.getElementById('client-name').value;
      client.email = document.getElementById('client-email').value;
      client.phone = document.getElementById('client-phone').value;
      client.status = document.getElementById('client-status').value;
      
      modalContainer.classList.remove('active');
      
      const activeFilter = document.querySelector('.clients-filters .btn-filter.active');
      const filter = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
      
      let filteredClients;
      if (filter === 'all' || filter === client.status) {
        if (filter === 'all') {
          filteredClients = clients;
        } else {
          filteredClients = clients.filter(c => c.status === filter);
        }
        populateClientsTable(filteredClients);
      } else {
        const index = clients.findIndex(c => c.id === client.id);
        if (index !== -1) {
          document.querySelector(`#clients-table-body tr:nth-child(${index + 1})`).remove();
        }
      }
      
      showToast('success', 'Cliente atualizado com sucesso!');
    });
  }
  
  function formatDateToday() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }
  
  populateClientsTable(clients);
}

// Function to setup menu events
function setupMenuEvents() {
  const menuItems = document.querySelectorAll('.menu a');
  
  menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      menuItems.forEach(mi => mi.parentElement.classList.remove('active'));
      
      this.parentElement.classList.add('active');
      
      const menuText = this.textContent.trim();
      
      if (menuText.includes('Dashboard')) {
        loadDashboard();
      } else if (menuText.includes('Vendas')) {
        // Load sales content
        openModal('Nova Venda', formTemplates.newSale);
        setupSaleForm();
      } else if (menuText.includes('Estoque')) {
        loadInventory();
      } else if (menuText.includes('Novo Produto')) {
        openModal('Novo Produto', formTemplates.newProduct);
        setupNewProductForm();
      } else if (menuText.includes('Equipe')) {
        loadTeamDirectory();
      } else if (menuText.includes('Clientes')) {
        loadClientsPage();
      } else if (menuText.includes('Relatórios')) {
        loadReports();
      } else if (menuText.includes('Configurações')) {
        loadSettings();
      }
    });
  });
}

// Set up after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  setupMenuEvents();
  setupSearchBar();
  setupNotifications(); // Add notification setup
});

// Open modal function
function openModal(title, content) {
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');
  const modalContainer = document.getElementById('modal-container');
  
  if (modalTitle) modalTitle.textContent = title;
  if (modalContent) modalContent.innerHTML = content;
  if (modalContainer) modalContainer.classList.add('active');
  
  const closeBtn = document.getElementById('modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      modalContainer.classList.remove('active');
    });
  }
}

// Form templates for various modals
const formTemplates = {
  newSale: `
    <form id="new-sale-form">
      <div class="table-container">
        <table class="table-form" id="products-table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select class="form-control product-select" required>
                  <option value="">Selecione um produto</option>
                  ${data.products.map(p => `<option value="${p.id}" data-price="${p.price}">${p.name}</option>`).join('')}
                </select>
              </td>
              <td><input type="number" class="form-control product-qty" min="1" value="1" required></td>
              <td><input type="text" class="form-control product-price" readonly></td>
              <td><button type="button" class="action-btn remove-product"><i class="fas fa-trash"></i></button></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <button type="button" class="add-row-btn" id="add-product-row">
        <i class="fas fa-plus"></i> Adicionar Produto
      </button>
      
      <div class="form-group">
        <label for="client">Cliente</label>
        <select id="client" class="form-control" required>
          <option value="">Selecione um cliente</option>
          <option value="1">Roberto Almeida</option>
          <option value="2">Carla Moreira</option>
          <option value="3">Fernando Costa</option>
          <option value="4">Amanda Dias</option>
          <option value="5">Paulo Silveira</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="seller">Vendedor</label>
        <select id="seller" class="form-control" required>
          <option value="">Selecione um vendedor</option>
          <option value="1">João Silva</option>
          <option value="2">Maria Oliveira</option>
          <option value="3">Carlos Santos</option>
          <option value="4">Ana Pereira</option>
          <option value="5">Roberto Lima</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="payment">Forma de Pagamento</label>
        <select id="payment" class="form-control" required>
          <option value="">Selecione</option>
          <option value="credit">Cartão de Crédito</option>
          <option value="debit">Cartão de Débito</option>
          <option value="cash">Dinheiro</option>
          <option value="pix">PIX</option>
          <option value="transfer">Transferência Bancária</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="total">Total</label>
        <input type="text" id="total" class="form-control" readonly value="R$ 0,00">
      </div>
      
      <div class="form-buttons">
        <button type="button" class="btn btn-secondary" id="cancel-sale">Cancelar</button>
        <button type="submit" class="btn btn-primary">Finalizar Venda</button>
      </div>
    </form>
  `,
  
  newProduct: `
    <form id="new-product-form">
      <div class="form-group">
        <label for="product-name">Nome do Produto</label>
        <input type="text" id="product-name" class="form-control" required>
      </div>
      
      <div class="form-group">
        <label for="product-category">Categoria</label>
        <select id="product-category" class="form-control" required>
          <option value="">Selecione uma categoria</option>
          <option value="Vitaminas">Vitaminas</option>
          <option value="Proteínas">Proteínas</option>
          <option value="Fitoterápicos">Fitoterápicos</option>
          <option value="Homeopáticos">Homeopáticos</option>
          <option value="Óleos Essenciais">Óleos Essenciais</option>
          <option value="Chás Medicinais">Chás Medicinais</option>
          <option value="Superalimentos">Superalimentos</option>
          <option value="Suplementos">Suplementos</option>
          <option value="Probióticos">Probióticos</option>
          <option value="Ervas">Ervas</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="product-price">Preço</label>
        <input type="number" id="product-price" class="form-control" min="0.01" step="0.01" required>
      </div>
      
      <div class="form-group">
        <label for="product-stock">Estoque Inicial</label>
        <input type="number" id="product-stock" class="form-control" min="0" required>
      </div>
      
      <div class="form-group">
        <label for="product-description">Descrição</label>
        <textarea id="product-description" class="form-control" rows="3"></textarea>
      </div>
      
      <div class="form-buttons">
        <button type="button" class="btn btn-secondary" id="cancel-product">Cancelar</button>
        <button type="submit" class="btn btn-primary">Cadastrar Produto</button>
      </div>
    </form>
  `,
  
  addStock: `
    <form id="add-stock-form">
      <div class="form-group">
        <label for="stock-product">Produto</label>
        <select id="stock-product" class="form-control" required>
          <option value="">Selecione um produto</option>
          ${data.products.map(p => `<option value="${p.id}">${p.name} (Estoque atual: ${p.stock})</option>`).join('')}
        </select>
      </div>
      
      <div class="form-group">
        <label for="stock-quantity">Quantidade a adicionar</label>
        <input type="number" id="stock-quantity" class="form-control" min="1" required>
      </div>
      
      <div class="form-group">
        <label for="stock-reason">Motivo</label>
        <select id="stock-reason" class="form-control">
          <option value="purchase">Compra de Fornecedor</option>
          <option value="return">Devolução</option>
          <option value="adjustment">Ajuste de Estoque</option>
          <option value="other">Outro</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="stock-notes">Observações</label>
        <textarea id="stock-notes" class="form-control" rows="2"></textarea>
      </div>
      
      <div class="form-buttons">
        <button type="button" class="btn btn-secondary" id="cancel-stock">Cancelar</button>
        <button type="submit" class="btn btn-primary">Adicionar ao Estoque</button>
      </div>
    </form>
  `
};