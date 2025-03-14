<?php
session_start();

// Verifica se é um cadastro ou um login
if (isset($_GET['cadastro']) && $_GET['cadastro'] == 1) {
    // PROCESSO DE CADASTRO
    $nome = $_POST['nome'] ?? '';
    $email = $_POST['email'] ?? '';
    $cargo = $_POST['cargo'] ?? '';
    $senha = $_POST['senha'] ?? '';
    $confirmaSenha = $_POST['confirmaSenha'] ?? '';

    if ($senha !== $confirmaSenha) {
        header('Location: login.php?erro=senhas-diferentes');
        exit;
    }

    // TODO: Salvar no banco de dados (usuários)
    // ...
    // Suponha que o ID do novo usuário no banco seja $novoId (por ex. via mysqli_insert_id)

    // Exemplo fictício:
    $novoId = 2; // Você buscaria isso de fato no seu banco
    // Cria sessão para o usuário que acabou de se cadastrar
    $_SESSION['usuario_id']   = $novoId;
    $_SESSION['usuario_nome'] = $nome;
    $_SESSION['usuario_cargo'] = $cargo;

    // Redireciona direto para o dashboard
    header('Location: dashboard.php');
    exit;

} else {
    // PROCESSO DE LOGIN
    $email = $_POST['email'] ?? '';
    $senha = $_POST['senha'] ?? '';

    // Exemplo simples de verificação
    // Em um projeto real, consulte o banco de dados
    $usuarioFicticio = [
        'id'    => 1,
        'nome'  => 'Admin',
        'cargo' => 'Administrador',
        'email' => 'admin@teste.com',
        'senha' => '1234' // Hash em produção
    ];

    // Verifica se o email bate e a senha confere
    if ($email === $usuarioFicticio['email'] && $senha === $usuarioFicticio['senha']) {
        $_SESSION['usuario_id']   = $usuarioFicticio['id'];
        $_SESSION['usuario_nome'] = $usuarioFicticio['nome'];
        $_SESSION['usuario_cargo'] = $usuarioFicticio['cargo'];

        header('Location: dashboard.php');
        exit;
    } else {
        header('Location: login.php?erro=login_invalido');
        exit;
    }
}
