<?php
session_start();
// Verifica se usuário NÃO está logado
if (!isset($_SESSION['usuario_id'])) {
    // Se não está logado, redireciona para a página de login
    header('Location: login.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Varejo PHP System | Dashboard Produtos Naturais</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <!-- Toast container -->
  <div class="toast-container"></div>
  
  <!-- Modal container -->
  <div id="modal-container" class="modal-container">
    <div class="modal">
      <div class="modal-header">
        <h2 id="modal-title">Nova Venda</h2>
        <button id="modal-close" class="modal-close"><i class="fas fa-times"></i></button>
      </div>
      <div id="modal-content" class="modal-content">
        <!-- Modal content will be dynamically loaded here -->
      </div>
    </div>
  </div>

  <div class="app-container">
    <aside class="sidebar">
      <div class="logo">
        <i class="fas fa-leaf"></i>
        <h1>Varejo PHP System</h1>
      </div>
      <div class="user-profile">
        <div class="avatar">
          <img src="https://via.placeholder.com/50" alt="Avatar do usuário">
        </div>
        <div class="user-info">
          <!-- Exemplo: mostrar nome e cargo da sessão -->
          <h3><?php echo $_SESSION['usuario_nome']; ?></h3>
          <p><?php echo $_SESSION['usuario_cargo']; ?></p>
        </div>
      </div>
      <nav class="menu">
        <ul>
          <li class="active"><a href="#"><i class="fas fa-home"></i> Dashboard</a></li>
          <li><a href="#"><i class="fas fa-shopping-cart"></i> Vendas</a></li>
          <li><a href="#"><i class="fas fa-box"></i> Estoque</a></li>
          <li><a href="#"><i class="fas fa-users"></i> Equipe</a></li>
          <li><a href="#"><i class="fas fa-user-plus"></i> Clientes</a></li>
          <li><a href="#"><i class="fas fa-chart-line"></i> Relatórios</a></li>
          <li><a href="#"><i class="fas fa-cog"></i> Configurações</a></li>
          <li><a href="logout.php" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Sair</a></li>
        </ul>
      </nav>
      <div class="theme-switch">
        <i class="fas fa-moon"></i>
        <span>Modo Escuro</span>
        <label class="switch">
          <input type="checkbox" id="theme-toggle">
          <span class="slider round"></span>
        </label>
      </div>
    </aside>
    <main class="content">
      <header class="top-bar">
        <div class="search-container">
          <i class="fas fa-search"></i>
          <input type="text" placeholder="Pesquisar...">
        </div>
        <div class="user-actions">
          <div class="notification">
            <i class="far fa-bell"></i>
            <span class="badge">3</span>
          </div>
          <div class="profile-dropdown">
            <img src="https://via.placeholder.com/40" alt="Perfil">
            <div class="profile-info">
              <span class="profile-name"><?php echo $_SESSION['usuario_nome']; ?></span>
              <span class="profile-role"><?php echo $_SESSION['usuario_cargo']; ?></span>
            </div>
            <i class="fas fa-chevron-down"></i>
          </div>
        </div>
      </header>
      <div class="dashboard">
        <div class="welcome-header">
          <h2>Bem-vindo ao Dashboard</h2>
          <p>Desempenho de Produtos Naturais - <?php echo date('d/m/Y'); ?></p>
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
                <!-- Exemplo fictício, populado via main.js ou manualmente -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <footer>
        <p>Desenvolvido por Cezi Cola Tecnologia | Todos os Direitos Reservados <?php echo date('Y'); ?></p>
      </footer>
    </main>
  </div>
  
  <!-- Script principal do dashboard -->
  <script src="main.js"></script>
</body>
</html>
