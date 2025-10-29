/* ======================================================================
   SCRIPT.JS - RESOLVE AÍ
   Este arquivo contém todas as funções interativas do site.
   ====================================================================== */

// Espera todo o HTML ser carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    /* =======================================
       FUNCIONALIDADE GLOBAL (Todas as Páginas)
       ======================================= */

    /**
     * 1. Menu Mobile (Hambúrguer)
     * Controla a abertura e fechamento do menu em telas pequenas.
     */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link'); // Pegar todos os links

    // Mostrar menu
    if (navToggle && navMenu) { // Adiciona verificação se navMenu existe
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    // Esconder menu
    if (navClose && navMenu) { // Adiciona verificação se navMenu existe
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    // Fechar o menu ao clicar em um link (para navegação suave e fechar menu)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('show-menu')) {
                // Adiciona um pequeno delay para garantir que a navegação ocorra antes de fechar
                setTimeout(() => {
                    navMenu.classList.remove('show-menu');
                }, 100); // 100 milissegundos
            }
        });
    });


    /**
     * 2. Botão "Voltar ao Topo" (Scroll Top)
     * Mostra o botão quando o usuário rola a página para baixo.
     */
    const scrollTop = document.getElementById('scroll-top');

    function showScrollTop() {
        if (scrollTop) {
            // Mostra o botão após rolar 350 pixels
            if (window.scrollY >= 350) {
                scrollTop.classList.add('show');
            } else {
                scrollTop.classList.remove('show');
            }
        }
    }

    // Adiciona o "ouvinte" de scroll na janela
    window.addEventListener('scroll', showScrollTop);

    // Ação de clique: rolar suavemente para o topo
    if (scrollTop) {
        scrollTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* =======================================
       PÁGINAS DE AUTENTICAÇÃO (Login & Cadastro)
       ======================================= */

    /**
     * 3. Mostrar/Esconder Senha (Botão do "Olho")
     * Funciona em qualquer página que tenha o .password-toggle-btn
     */
    const passwordToggleButtons = document.querySelectorAll('.password-toggle-btn');

    passwordToggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Acha o input DENTRO do mesmo pai (.password-toggle)
            const passwordToggleDiv = this.closest('.password-toggle');
            if (!passwordToggleDiv) return;

            const input = passwordToggleDiv.querySelector('input'); // Pega o <input>
            if (!input) return;

            const icon = this.querySelector('i'); // Pega o ícone <i>
            if (!icon) return;

            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
                this.setAttribute('aria-label', 'Esconder senha');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
                this.setAttribute('aria-label', 'Mostrar senha');
            }
        });
    });


    /* =======================================
       PÁGINA DE CADASTRO (cadastro.html)
       ======================================= */

    const tipoContaSelect = document.getElementById('cadastro-tipo');

    // Lógica específica para a página de cadastro
    if (tipoContaSelect) {

        /**
         * 4. Pré-seleção de Tipo de Conta via URL
         * Lê ?tipo=cliente ou ?tipo=prestador da URL.
         */
        function preencherTipoContaPelaURL() {
            const urlParams = new URLSearchParams(window.location.search);
            const tipo = urlParams.get('tipo'); // Pega 'cliente' ou 'prestador'

            if ((tipo === 'cliente' || tipo === 'prestador') && tipoContaSelect) {
                tipoContaSelect.value = tipo;

                // Dispara o evento 'change' manualmente
                tipoContaSelect.dispatchEvent(new Event('change'));
            }
        }

        preencherTipoContaPelaURL(); // Executa ao carregar a página

        /**
         * 5. Lógica de Campos Condicionais (para o cadastro.html original com checkboxes)
         * Mostra ou esconde os checkboxes de serviço.
         */
        const camposPrestador = document.getElementById('campos-prestador');

        function toggleCamposPrestador() {
            if (!camposPrestador || !tipoContaSelect) return;

            if (tipoContaSelect.value === 'prestador') {
                camposPrestador.style.display = 'block';
            } else {
                camposPrestador.style.display = 'none';
                // Limpa os checkboxes se o usuário mudar de ideia
                const checkboxes = camposPrestador.querySelectorAll('input[type="checkbox"]');
                checkboxes.forEach(cb => cb.checked = false);
            }
        }

        tipoContaSelect.addEventListener('change', toggleCamposPrestador);
        toggleCamposPrestador(); // Executa no carregamento
    }


    /* =======================================
       FORMULÁRIOS EM ETAPAS (Wizard)
       (onboarding-prestador.html e solicitar-servico.html)
       ======================================= */

    const wizardForms = document.querySelectorAll('#onboarding-form, #solicitar-form');

    wizardForms.forEach(form => {
        let currentStep = 1;
        const stepContents = form.querySelectorAll('.step-content');
        const wizardStepsNav = form.querySelectorAll('.wizard-step'); // Indicadores
        const totalSteps = stepContents.length;

        const nextBtn = form.querySelector('#next-btn');
        const prevBtn = form.querySelector('#prev-btn');
        const submitBtn = form.querySelector('#submit-btn');

        // Garante que todos os elementos necessários do wizard existam
        if(nextBtn && prevBtn && submitBtn && stepContents.length > 0 && wizardStepsNav.length > 0 && stepContents.length === wizardStepsNav.length) {

            function updateWizard() {
                // Atualiza os "passos" (conteúdo)
                stepContents.forEach((step, index) => {
                    step.classList.toggle('active', index + 1 === currentStep);
                });

                // Atualiza os indicadores (navegação)
                wizardStepsNav.forEach((stepNav, index) => {
                    stepNav.classList.toggle('active', index + 1 === currentStep);
                });

                // Atualiza os botões
                prevBtn.style.display = (currentStep === 1) ? 'none' : 'inline-flex';
                nextBtn.style.display = (currentStep === totalSteps) ? 'none' : 'inline-flex';
                submitBtn.style.display = (currentStep === totalSteps) ? 'inline-flex' : 'none';

                // Rola a tela para o topo do formulário ao mudar de etapa (melhora UX)
                 form.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }

            // Ação do botão "Avançar"
            nextBtn.addEventListener('click', () => {
                // (Adicione validação da etapa aqui se necessário)
                if (currentStep < totalSteps) {
                    currentStep++;
                    updateWizard();
                }
            });

            // Ação do botão "Voltar"
            prevBtn.addEventListener('click', () => {
                if (currentStep > 1) {
                    currentStep--;
                    updateWizard();
                }
            });

            // Inicializa o formulário na primeira etapa
            updateWizard();
        } else {
             console.warn("Estrutura do Wizard incompleta ou botões não encontrados no formulário:", form.id);
        }
    });


    /* =======================================
       VALIDAÇÃO DE FORMULÁRIOS (Login e Cadastro) - COM VALIDAÇÃO EM TEMPO REAL
       ======================================= */

    // --- Seleciona os formulários e campos principais ---
    const loginForm = document.getElementById('login-form');
    const cadastroForm = document.getElementById('cadastro-form');

    const loginEmailInput = document.getElementById('login-email');
    const loginPasswordInput = document.getElementById('login-password');

    const cadastroNomeInput = document.getElementById('cadastro-nome');
    const cadastroEmailInput = document.getElementById('cadastro-email');
    const cadastroPasswordInput = document.getElementById('cadastro-password');
    const cadastroConfirmPasswordInput = document.getElementById('cadastro-confirm-password');
    const cadastroTipoContaSelect = document.getElementById('cadastro-tipo'); // Renomeado para clareza
    const cadastroTermsCheckbox = document.getElementById('terms');

    // --- Funções Auxiliares de Erro ---
    function showError(inputElement, message) {
        // Encontra o .form-group pai mais próximo ou um container específico para o checkbox
        let formGroup = inputElement.closest('.form-group');
        let errorSpan;

        if (formGroup) {
            errorSpan = formGroup.querySelector('.form-error');
        } else if (inputElement.id === 'terms') {
            // Tenta encontrar um container específico para o erro dos termos
            const termsContainer = inputElement.closest('label'); // Ou um div pai se houver
            if (termsContainer) {
                 errorSpan = termsContainer.querySelector('.form-error'); // Procura dentro do container
                 if (!errorSpan) { // Cria dinamicamente se não existir
                     errorSpan = document.createElement('span');
                     errorSpan.className = 'form-error';
                     errorSpan.style.display = 'block'; // Garante visibilidade
                     errorSpan.style.width = '100%'; // Ocupa a largura
                     termsContainer.parentNode.insertBefore(errorSpan, termsContainer.nextSibling); // Insere após o label
                 }
            }
        }

        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.classList.add('show');
        } else {
            // Fallback para alerta se TUDO falhar (incluindo o checkbox sem span)
            console.warn("Elemento de erro não encontrado para:", inputElement.id);
            // Evitar alert duplicado na validação 'input' e 'submit'
            if (!inputElement.hasAttribute('data-alerted')) {
                 alert(message);
                 inputElement.setAttribute('data-alerted', 'true'); // Marca que já alertou
            }
        }
        inputElement.classList.add('error');
    }

    function clearError(inputElement) {
        let formGroup = inputElement.closest('.form-group');
        let errorSpan;

        if (formGroup) {
            errorSpan = formGroup.querySelector('.form-error');
        } else if (inputElement.id === 'terms') {
            const termsContainer = inputElement.closest('label');
             if(termsContainer) {
                 errorSpan = termsContainer.parentNode.querySelector('.form-error');
             }
        }

        if (errorSpan) {
            errorSpan.textContent = '';
            errorSpan.classList.remove('show');
        }
        inputElement.classList.remove('error');
        inputElement.removeAttribute('data-alerted'); // Remove a marca do alerta
    }

    // --- Validação de E-mail (Função Reutilizável) ---
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(String(email).toLowerCase());
    }


    // --- VALIDAÇÃO EM TEMPO REAL (EVENTO 'INPUT' e 'CHANGE') ---

    // Validação de E-mail em tempo real (Login e Cadastro)
    [loginEmailInput, cadastroEmailInput].forEach(input => {
        if (input) {
            input.addEventListener('input', function() {
                clearError(input); // Limpa o erro ao começar a digitar/corrigir
                // Só mostra o erro de formato se houver algo digitado
                if (input.value.trim() && !validateEmail(input.value)) {
                    showError(input, 'Formato de e-mail inválido.');
                }
                 // Não precisa de 'else clearError' aqui, já foi feito no início
            });
        }
    });

    // Validação de Senha em tempo real (Cadastro - Tamanho Mínimo)
    if (cadastroPasswordInput) {
        cadastroPasswordInput.addEventListener('input', function() {
            clearError(cadastroPasswordInput);
            // Só mostra erro de tamanho se algo foi digitado e é menor que 6
            if (cadastroPasswordInput.value.length > 0 && cadastroPasswordInput.value.length < 6) {
                showError(cadastroPasswordInput, 'A senha deve ter no mínimo 6 caracteres.');
            }
            // Revalidar a confirmação quando a senha principal muda
            if (cadastroConfirmPasswordInput && cadastroConfirmPasswordInput.value.trim()) {
                validatePasswordConfirmation();
            }
        });
    }

    // Validação de Confirmação de Senha em tempo real (Cadastro - Igualdade)
    function validatePasswordConfirmation() {
        if (cadastroConfirmPasswordInput && cadastroPasswordInput) {
             clearError(cadastroConfirmPasswordInput);
             // Só mostra erro se confirmação foi digitada e é diferente da senha principal
            if (cadastroConfirmPasswordInput.value.trim() && cadastroPasswordInput.value !== cadastroConfirmPasswordInput.value) {
                showError(cadastroConfirmPasswordInput, 'As senhas não conferem.');
            }
        }
    }
    if (cadastroConfirmPasswordInput) {
        cadastroConfirmPasswordInput.addEventListener('input', validatePasswordConfirmation);
    }

    // Validação do Checkbox de Termos em tempo real (ao clicar)
    if (cadastroTermsCheckbox) {
        cadastroTermsCheckbox.addEventListener('change', function() {
            if (this.checked) {
                clearError(this); // Limpa o erro se marcado
            } else {
                 // O erro só será mostrado no submit, mas limpamos aqui se ele desmarcar
                 clearError(this);
            }
        });
    }

    // --- VALIDAÇÃO NO ENVIO (EVENTO 'SUBMIT' - COMO FINAL CHECK) ---

    // Validação do Formulário de LOGIN no submit
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão

            let isValid = true;

            // Valida Email (final check)
            if (loginEmailInput) { // Verifica se o elemento existe
                 clearError(loginEmailInput);
                if (!loginEmailInput.value.trim()) {
                    isValid = false;
                    showError(loginEmailInput, 'Por favor, digite seu e-mail.');
                } else if (!validateEmail(loginEmailInput.value)) {
                    isValid = false;
                    showError(loginEmailInput, 'Por favor, digite um e-mail válido.');
                }
            } else { isValid = false; console.error("Campo de email do login não encontrado.") }


            // Valida Senha (final check)
            if (loginPasswordInput) { // Verifica se o elemento existe
                 clearError(loginPasswordInput);
                if (!loginPasswordInput.value.trim()) {
                    isValid = false;
                    showError(loginPasswordInput, 'Por favor, digite sua senha.');
                }
            } else { isValid = false; console.error("Campo de senha do login não encontrado.") }


            if (isValid) {
                console.log('Login form válido. (Simulando envio...)');
                alert('Login válido! (Em um site real, você seria redirecionado)');
                // loginForm.submit();
            } else {
                console.log('Login form inválido.');
            }
        });
    }

    // Validação do Formulário de CADASTRO no submit
    if (cadastroForm) {
        cadastroForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão

            let isValid = true;

            // Valida Nome (final check)
            if (cadastroNomeInput) {
                 clearError(cadastroNomeInput);
                if (cadastroNomeInput.value.trim().length < 3) {
                    isValid = false;
                    showError(cadastroNomeInput, 'O nome completo deve ter pelo menos 3 caracteres.');
                }
            } else { isValid = false; console.error("Campo de nome do cadastro não encontrado.") }


            // Valida Email (final check)
            if (cadastroEmailInput) {
                 clearError(cadastroEmailInput);
                if (!cadastroEmailInput.value.trim()) {
                    isValid = false;
                    showError(cadastroEmailInput, 'Por favor, digite seu e-mail.');
                } else if (!validateEmail(cadastroEmailInput.value)) {
                    isValid = false;
                    showError(cadastroEmailInput, 'Por favor, digite um e-mail válido.');
                }
            } else { isValid = false; console.error("Campo de email do cadastro não encontrado.") }


            // Valida Senha (final check)
            if (cadastroPasswordInput) {
                 clearError(cadastroPasswordInput);
                if (cadastroPasswordInput.value.length < 6) {
                    isValid = false;
                    showError(cadastroPasswordInput, 'A senha deve ter no mínimo 6 caracteres.');
                }
            } else { isValid = false; console.error("Campo de senha do cadastro não encontrado.") }


            // Valida Confirmação de Senha (final check)
            if (cadastroConfirmPasswordInput) {
                 clearError(cadastroConfirmPasswordInput);
                if (!cadastroConfirmPasswordInput.value.trim()) {
                    isValid = false;
                    showError(cadastroConfirmPasswordInput, 'Por favor, confirme sua senha.');
                } else if (cadastroPasswordInput && cadastroPasswordInput.value !== cadastroConfirmPasswordInput.value) { // Compara com a senha principal
                    isValid = false;
                    showError(cadastroConfirmPasswordInput, 'As senhas não conferem.');
                }
            } else { isValid = false; console.error("Campo de confirmar senha do cadastro não encontrado.") }


            // Valida Tipo de Conta (final check)
            if (cadastroTipoContaSelect) {
                 clearError(cadastroTipoContaSelect);
                if (!cadastroTipoContaSelect.value) {
                    isValid = false;
                    showError(cadastroTipoContaSelect, 'Por favor, selecione o tipo de conta.');
                }
            } else { isValid = false; console.error("Campo de tipo de conta do cadastro não encontrado.") }


            // Valida Checkbox de Termos (final check)
            if (cadastroTermsCheckbox) {
                 clearError(cadastroTermsCheckbox);
                if (!cadastroTermsCheckbox.checked) {
                    isValid = false;
                    showError(cadastroTermsCheckbox, 'Você deve concordar com os Termos e a Política de Privacidade.');
                }
            } else { isValid = false; console.error("Checkbox de termos do cadastro não encontrado.") }


            if (isValid) {
                console.log('Cadastro form válido. (Simulando envio...)');
                alert('Cadastro válido! (Em um site real, você seria redirecionado)');
                // cadastroForm.submit();
            } else {
                console.log('Cadastro form inválido.');
            }
        });
    }

}); // Fim do 'DOMContentLoaded'