<?php
session_start();
// Se o usuário já estiver logado, redireciona para o dashboard
if (isset($_SESSION['usuario_id'])) {
    header('Location: dashboard.php');
    exit;
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login | Varejo PHP System</title>
  <!-- CSS principal -->
  <link rel="stylesheet" href="styles.css">
  <!-- CSS específico da página de login -->
  <link rel="stylesheet" href="login.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <!-- Google Sign-In (opcional) -->
  <script src="https://accounts.google.com/gsi/client" async defer></script>
</head>
<body class="login-page">
  <div class="toast-container"></div>
  
  <div class="login-container">
    <div class="login-wrapper">
      <div class="login-content">
        <div class="login-header">
          <div class="logo">
            <i class="fas fa-leaf"></i>
            <h1>Varejo PHP System</h1>
          </div>
          <p>Plataforma de Gestão de vendas e Produtos</p>
        </div>
        
        <div class="login-tabs">
          <div class="tab active" data-tab="login">Login</div>
          <div class="tab" data-tab="register">Cadastro</div>
        </div>
        
        <!-- ABA DE LOGIN -->
        <div class="tab-content active" id="login-tab">
          <form id="login-form" method="POST" action="autentica.php">
            <div class="form-group">
              <label for="login-email">Email</label>
              <div class="input-with-icon">
                <i class="fas fa-envelope"></i>
                <input type="email" id="login-email" class="form-control" placeholder="Seu email" required name="email">
              </div>
            </div>
            
            <div class="form-group">
              <label for="login-password">Senha</label>
              <div class="input-with-icon">
                <i class="fas fa-lock"></i>
                <input type="password" id="login-password" class="form-control" placeholder="Sua senha" required name="senha">
                <button type="button" class="toggle-password" tabindex="-1">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
            </div>
            
            <div class="form-group remember-forgot">
              <div class="checkbox-item">
                <input type="checkbox" id="remember-me" name="remember">
                <label for="remember-me">Lembrar-me</label>
              </div>
              <a href="#" class="forgot-password">Esqueceu a senha?</a>
            </div>
            
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block login-btn">
                <i class="fas fa-sign-in-alt"></i> Entrar
              </button>
            </div>
          </form>
          
          <div class="divider">
            <span>ou</span>
          </div>
          
          <div class="google-login">
            <div id="g_id_onload"
                 data-client_id="YOUR_GOOGLE_CLIENT_ID"
                 data-callback="handleGoogleLogin">
            </div>
            <div class="g_id_signin" data-type="standard"></div>
            
            <button class="btn btn-google">
              <i class="fab fa-google"></i> Continuar com Google
            </button>
          </div>
        </div>
        
        <!-- ABA DE CADASTRO -->
        <div class="tab-content" id="register-tab">
          <!-- Ajuste "action" conforme seu script de cadastro -->
          <form id="register-form" method="POST" action="autentica.php?cadastro=1">
            <div class="form-group">
              <label for="register-name">Nome Completo</label>
              <div class="input-with-icon">
                <i class="fas fa-user"></i>
                <input type="text" id="register-name" class="form-control" placeholder="Seu nome completo" required name="nome">
              </div>
            </div>
            
            <div class="form-group">
              <label for="register-email">Email</label>
              <div class="input-with-icon">
                <i class="fas fa-envelope"></i>
                <input type="email" id="register-email" class="form-control" placeholder="Seu email" required name="email">
              </div>
            </div>
            
            <div class="form-group">
              <label for="register-role">Cargo</label>
              <div class="input-with-icon">
                <i class="fas fa-briefcase"></i>
                <select id="register-role" class="form-control" required name="cargo">
                  <option value="">Selecione seu cargo</option>
                  <option value="Vendedor">Vendedor</option>
                  <option value="Gerente">Gerente</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Tecnologia">Profissional de Tecnologia</option>
                  <option value="Executivo">Executivo</option>
                </select>
              </div>
            </div>
            
            <div class="form-group">
              <label>Foto de Perfil</label>
              <div class="profile-photo-upload">
                <div class="profile-photo-preview">
                  <img id="profile-photo-preview" src="https://via.placeholder.com/100" alt="Foto de perfil">
                </div>
                <div class="profile-photo-controls">
                  <div class="upload-btn-wrapper">
                    <button type="button" class="upload-btn"><i class="fas fa-upload"></i> Carregar Foto</button>
                    <input type="file" id="profile-photo-upload" accept="image/*">
                  </div>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label for="register-password">Senha</label>
              <div class="input-with-icon">
                <i class="fas fa-lock"></i>
                <input type="password" id="register-password" class="form-control" placeholder="Crie uma senha" required name="senha">
                <button type="button" class="toggle-password" tabindex="-1">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
            </div>
            
            <div class="form-group">
              <label for="register-confirm-password">Confirmar Senha</label>
              <div class="input-with-icon">
                <i class="fas fa-lock"></i>
                <input type="password" id="register-confirm-password" class="form-control" placeholder="Confirme sua senha" required name="confirmaSenha">
                <button type="button" class="toggle-password" tabindex="-1">
                  <i class="fas fa-eye"></i>
                </button>
              </div>
            </div>
            
            <div class="form-group">
              <div class="checkbox-item">
                <input type="checkbox" id="terms" required>
                <label for="terms">Concordo com os <a href="#">Termos de Uso</a> e <a href="#">Política de Privacidade</a></label>
              </div>
            </div>
            
            <div class="form-group">
              <button type="submit" class="btn btn-primary btn-block register-btn">
                <i class="fas fa-user-plus"></i> Cadastrar
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <!-- COLUNA VISUAL -->
      <div class="login-showcase">
        <div class="showcase-content">
          <h2>Bem-vindo ao Varejo PHP System</h2>
          <p>A plataforma completa para gestão de produtos naturais</p>
          <div class="showcase-features">
            <div class="feature">
              <i class="fas fa-chart-line"></i>
              <span>Dashboards intuitivos</span>
            </div>
            <div class="feature">
              <i class="fas fa-box"></i>
              <span>Controle de estoque</span>
            </div>
            <div class="feature">
              <i class="fas fa-shopping-cart"></i>
              <span>Gestão de vendas</span>
            </div>
            <div class="feature">
              <i class="fas fa-users"></i>
              <span>Gerenciamento de equipe</span>
            </div>
          </div>
        </div>
        <div class="showcase-image"></div>
      </div>
    </div>
    
    <div class="login-footer">
      <p> 2025 Varejo PHP System | Desenvolvido por Cezi Cola Tecnologia</p>
    </div>
  </div>
  
  <!-- JS específico da página de login -->
  <script src="login.js"></script>
</body>
</html>
