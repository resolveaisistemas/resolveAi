document.querySelector('.form-cadastro').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Cadastro realizado com sucesso! (Simulação). Redirecionando para a página de login.');
    window.location.href = 'index.html';
});