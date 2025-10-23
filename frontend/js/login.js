// Adiciona o "ouvinte" ao formulário de login unificado
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede que a página recarregue

    // Pega o valor selecionado no dropdown ('cliente' ou 'profissional')
    const userType = document.getElementById('user-type').value;

    // Verifica o tipo de usuário e redireciona para a página correta
    if (userType === 'cliente') {
        
        // Em um site real, aqui você validaria o email e senha do cliente
        alert('Login de cliente bem-sucedido! Redirecionando...');
        window.location.href = 'painel_cliente.html';

    } else if (userType === 'profissional') {
        
        // Em um site real, aqui você validaria o email e senha do profissional
        alert('Login de profissional bem-sucedido! Redirecionando...');
        window.location.href = 'painel_profissional.html';

    } else {
        // Caso o usuário não tenha selecionado um perfil
        alert('Por favor, selecione se você é um Cliente ou Profissional.');
    }
});