<?php
session_start();

// Se já houver uma sessão (usuário logado), vá direto para o dashboard.
if (isset($_SESSION['usuario_id'])) {
    header('Location: dashboard.php');
    exit;
} else {
    // Caso contrário, vá para a página de login.
    header('Location: login.php');
    exit;
}
