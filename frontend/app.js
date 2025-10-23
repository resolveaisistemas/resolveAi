// Variável global para armazenar as URLs das imagens geradas
const imageCache = {};

// Lista de serviços com prompts para geração de imagem
const serviceData = [
    { 
        id: 'hidraulica', 
        title: 'Hidráulica', 
        description: 'Reparos rápidos em vazamentos, desentupimentos e instalação de equipamentos sanitários.', 
        accentColor: '#00B5AD',
        prompt: "A close-up photograph of a plumber's hands fixing a leaky pipe under a modern sink, showing water droplets and tools. Soft, warm lighting, hyperrealistic style." 
    },
    { 
        id: 'eletrica', 
        title: 'Elétrica', 
        description: 'Instalação e manutenção segura de fiação, tomadas, disjuntores e iluminação.', 
        accentColor: '#FF9F1C',
        prompt: "A stylized illustration of an electrician safely working on a modern circuit board in a residential fuse box, with a glow of blue light, emphasizing safety and precision. Minimalist style." 
    },
    { 
        id: 'reparos', 
        title: 'Pequenos Reparos', 
        description: 'Montagem de móveis, fixação de quadros, cortinas e todo o \'faz-tudo\' que você precisa.', 
        accentColor: '#34495E',
        prompt: "A bright, clean photo of a person assembling flatpack furniture (like a bookshelf) with a screwdriver, set in a cozy, modern living room. Focus on the tools and action." 
    },
    { 
        id: 'jardinagem', 
        title: 'Jardinagem', 
        description: 'Corte de grama, poda de plantas, manutenção de jardins e paisagismo básico.', 
        accentColor: '#6CC070',
        prompt: "A pleasant scene of gardening: hands wearing gloves carefully pruning a lush green bush with shears in a sunny backyard. Macro photography style." 
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa a página Home e começa a buscar as imagens
    renderPage('home'); 
    fetchAndDisplayImages(); 
});

/**
 * Função para alternar a exibição do menu de navegação em dispositivos móveis.
 */
window.toggleMenu = function() {
    document.getElementById('navLinks').classList.toggle('active');
}

/**
 * Função para simular a mudança de página e renderizar o conteúdo.
 */
window.changePage = function(pageName) {
    document.getElementById('navLinks').classList.remove('active'); 
    renderPage(pageName);
    window.scrollTo(0, 0); 
}

/**
 * Função principal de renderização de conteúdo, injetando HTML no container.
 */
function renderPage(page) {
    const container = document.getElementById('app-container');
    container.innerHTML = ''; 

    let htmlContent = '';

    switch (page) {
        case 'home':
            htmlContent = renderHomePage();
            break;
        case 'dashboard':
            htmlContent = renderDashboardPage();
            break;
        case 'about':
            htmlContent = renderAboutUsPage();
            break;
        default:
            htmlContent = `<section style="text-align:center;"><h2>Página Não Encontrada</h2><button class="btn btn-principal" onclick="changePage('home')">Voltar à Home</button></section>`;
    }
    container.innerHTML = htmlContent;
}

/* -----------------------------------------------------------------
 * Lógica de Geração de Imagens (via API)
 * ----------------------------------------------------------------- */

/**
 * Gera uma imagem usando o modelo Imagen e a armazena no cache.
 */
async function generateImage(prompt, id) {
    // A chave da API é deixada vazia para ser fornecida pelo ambiente Canvas
    const apiKey = ""; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;
    const payload = { 
        instances: { prompt: prompt }, 
        parameters: { "sampleCount": 1 } 
    };

    const MAX_RETRIES = 5;
    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                if (response.status === 429 && i < MAX_RETRIES - 1) {
                    const delay = Math.pow(2, i) * 1000;
                    await new Promise(resolve => setTimeout(resolve, delay));
                    continue; 
                }
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            const result = await response.json();

            if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
                const base64Data = result.predictions[0].bytesBase64Encoded;
                const imageUrl = `data:image/png;base64,${base64Data}`;
                imageCache[id] = imageUrl;
                return imageUrl;
            }
            throw new Error("Resposta da API de imagem inválida.");

        } catch (error) {
            console.error(`Falha ao gerar imagem para ${id} na tentativa ${i + 1}:`, error);
        }
    }
    imageCache[id] = null; 
    return null;
}

/**
 * Inicia a geração de todas as imagens e atualiza o DOM quando prontas.
 */
async function fetchAndDisplayImages() {
    const promises = serviceData.map(service => generateImage(service.prompt, service.id));
    await Promise.all(promises);

    // Se o grid de serviços estiver visível (na home), atualiza os cards
    const gridContainer = document.querySelector('.service-grid');
    if (gridContainer) {
        gridContainer.innerHTML = serviceData.map(s => renderServiceCard(s)).join('');
    }
}


/* -----------------------------------------------------------------
 * 1. Funções de Renderização de Páginas
 * ----------------------------------------------------------------- */

function renderHomePage() {
    // Home limpa, sem a seção de Login/Cadastro, apenas o Hero e o grid de serviços.
    return `
        <section class="hero">
            <h1>Seus Reparos Residenciais Resolvidos de Forma Inteligente.</h1>
            <p>Encontre profissionais de **Hidráulica, Elétrica, Reparos e Jardinagem** com a garantia da RESOLVE AÍ. É rápido, seguro e eficiente.</p>
            <div style="margin-top: 30px;">
                <button class="btn btn-secundario" style="margin-right: 20px;" onclick="changePage('dashboard')">Ver Estatísticas</button>
                <button class="btn btn-principal" onclick="changePage('about')">Saiba Mais Sobre Nós</button>
            </div>
        </section>

        <section>
            <h2 style="text-align: center; color: var(--cor-principal); margin-bottom: 30px; font-size: 32px;">Nossos Serviços em Destaque</h2>
            <div class="service-grid container">
                ${serviceData.map(renderServiceCard).join('')}
            </div>
        </section>
    `;
}

function renderServiceCard(service) {
    const imageUrl = imageCache[service.id];
    let imageElement;

    if (imageUrl) {
        imageElement = `<img src="${imageUrl}" alt="Exemplo de Serviço de ${service.title}">`;
    } else if (imageUrl === null) {
         imageElement = `<div style="text-align:center; padding: 20px;">
                            <p style="color: red;">Falha ao carregar imagem.</p>
                            <img src="https://placehold.co/150x150/ccc/34495E?text=RESOLVE" alt="Placeholder">
                        </div>`;
    } else {
        // Enquanto carrega, mostra o spinner
        imageElement = `<div class="spinner"></div><p style="font-size: 14px; color: #777;">Gerando imagem...</p>`;
    }

    return `
        <div class="service-card" style="border-top: 5px solid ${service.accentColor};">
            ${imageElement}
            <h3 style="color: ${service.accentColor};">${service.title}</h3>
            <p style="font-size: 15px; color: #555;">${service.description}</p>
        </div>
    `;
}

function renderDashboardPage() {
    const topServices = [
        { name: "Reparo de Vazamento (Hidráulica)", percent: 35, color: '#00B5AD' },
        { name: "Instalação de Chuveiro (Elétrica)", percent: 27, color: '#FF9F1C' },
        { name: "Montagem de Prateleiras (Reparos)", percent: 20, color: '#34495E' },
        { name: "Corte de Grama (Jardinagem)", percent: 18, color: '#6CC070' }
    ];

    return `
        <section>
            <h2 style="text-align: center; color: var(--cor-secundaria); font-size: 32px; margin-bottom: 20px;">Dashboard de Ocorrências e Instruções</h2>
            <div class="dashboard-grid container">
                
                <!-- Módulo Esquerdo: Serviços Mais Usados -->
                <div class="card">
                    <h3>Serviços Mais Solicitados na Plataforma</h3>
                    <div style="margin-bottom: 25px;">
                        ${topServices.map(service => `
                            <div style="margin-bottom: 12px;">
                                <p style="font-weight: bold; margin: 0; color: var(--cor-texto);">${service.name} <span style="color: ${service.color}; float: right;">${service.percent}%</span></p>
                                <div style="background-color: var(--cor-borda); border-radius: 5px; height: 18px; margin-top: 5px; overflow: hidden;">
                                    <div style="width: ${service.percent}%; background-color: ${service.color}; height: 100%; border-radius: 5px;"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Módulo Direito: Instruções do Serviço -->
                <div class="card">
                    <h3>Como a RESOLVE AÍ Funciona</h3>
                    <ol style="padding-left: 20px; color: var(--cor-texto);">
                        <li style="margin-bottom: 15px;">
                            <strong>1. Descreva o Problema:</strong> Crie um pedido detalhado usando a Home. Para serviços complexos, a IA ajuda a refinar sua descrição.
                        </li>
                        <li style="margin-bottom: 15px;">
                            <strong>2. Receba Propostas:</strong> Profissionais verificados e próximos enviam orçamentos. Você compara preços e a reputação de cada um.
                        </li>
                        <li style="margin-bottom: 15px;">
                            <strong>3. Contrate e Avalie:</strong> Escolha o melhor profissional, feche o serviço e, ao finalizar, utilize o sistema de avaliação para garantir a qualidade da comunidade.
                        </li>
                    </ol>
                    <!-- Botão CTA para abrir o modal de cadastro -->
                    <button class="btn btn-secundario" style="width: 100%; margin-top: 15px;" onclick="openModal('register')">Quero Fazer um Pedido Agora</button>
                </div>
            </div>
        </section>
    `;
}

function renderAboutUsPage() {
    return `
        <section style="max-width: 800px; margin: 0 auto; padding: 30px;">
            <h2 style="text-align: center; color: var(--cor-principal); font-size: 32px; margin-bottom: 20px;">Sobre a RESOLVE AÍ</h2>
            
            <p style="font-size: 18px; line-height: 1.7; margin-bottom: 25px; color: #555;">
                A RESOLVE AÍ nasceu para simplificar a contratação de serviços essenciais para o lar. Utilizamos a **tecnologia** para eliminar a dor de cabeça de encontrar um profissional de confiança para **hidráulica, elétrica, pequenos reparos e jardinagem**, tudo com transparência e segurança.
            </p>

            <h3 style="color: var(--cor-secundaria); border-bottom: 2px solid var(--cor-borda); padding-bottom: 5px; margin-bottom: 15px;">Nossos Compromissos</h3>
            <ul style="list-style: '✅ '; padding-left: 25px; line-height: 2; margin-bottom: 30px; color: var(--cor-texto);">
                <li><strong>Segurança:</strong> Todos os nossos prestadores passam por verificação rigorosa.</li>
                <li><strong>Eficiência:</strong> Conexão rápida com profissionais e orçamentos claros e sem surpresas.</li>
                <li><strong>Justiça:</strong> Transparência total nas transações e avaliações baseadas na experiência real dos usuários.</li>
                <li><strong>Inovação:</strong> Utilizamos IA para refinar pedidos e conectar você ao especialista ideal.</li>
            </ul>

            <h3 style="color: var(--cor-secundaria); border-bottom: 2px solid var(--cor-borda); padding-bottom: 5px; margin-bottom: 15px;">Conecte-se Conosco</h3>
            <p style="font-size: 16px; color: #555; text-align: center;">Siga-nos nas redes sociais para dicas de manutenção e novidades!</p>
            <div class="social-links" style="text-align: center; margin-top: 20px;">
                <a href="#" style="color: var(--cor-principal); font-size: 26px; margin: 0 15px;">Facebook</a> 
                <a href="#" style="color: var(--cor-principal); font-size: 26px; margin: 0 15px;">Instagram</a> 
                <a href="#" style="color: var(--cor-principal); font-size: 26px; margin: 0 15px;">LinkedIn</a>
            </div>
        </section>
    `;
}

/* -----------------------------------------------------------------
 * 2. Lógica do Modal de Autenticação
 * ----------------------------------------------------------------- */

/**
 * Abre o modal e renderiza o formulário especificado (login ou register).
 * @param {string} mode 'login' ou 'register'
 */
window.openModal = function(mode) {
    const modal = document.getElementById('authModal');
    const container = document.getElementById('modalFormContainer');

    if (modal && container) {
        if (mode === 'login') {
            container.innerHTML = renderLoginForm();
        } else if (mode === 'register') {
            container.innerHTML = renderRegisterForm();
        }
        modal.style.display = 'block';
    }
}

/**
 * Fecha o modal.
 */
window.closeModal = function() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Fechar o modal clicando fora dele
window.onclick = function(event) {
    const modal = document.getElementById('authModal');
    if (event.target === modal) {
        closeModal();
    }
}

/**
 * Renderiza o formulário de Login.
 */
function renderLoginForm() {
    return `
        <div class="form-card">
            <h3>Entrar na Sua Conta</h3>
            <form onsubmit="closeModal(); alert('Login simulado realizado! Use os botões acima para navegar.'); return false;">
                <div class="form-group">
                    <label for="loginEmail">Email:</label>
                    <input type="email" id="loginEmail" placeholder="seu.email@exemplo.com" required>
                </div>
                <div class="form-group">
                    <label for="loginSenha">Senha:</label>
                    <input type="password" id="loginSenha" placeholder="********" required>
                </div>
                <button type="submit" class="btn btn-principal" style="width: 100%; margin-top: 10px;">Fazer Login</button>
                <p style="text-align: center; margin-top: 20px; font-size: 14px;">
                    Não tem conta? 
                    <a href="#" onclick="event.preventDefault(); handleModalSwitch('register')" style="color: var(--cor-secundaria); font-weight: bold;">Cadastre-se aqui</a>
                </p>
            </form>
        </div>
    `;
}

/**
 * Renderiza o formulário de Cadastro.
 */
function renderRegisterForm() {
    return `
        <div class="form-card">
            <h3>Novo Cadastro</h3>
            <form onsubmit="closeModal(); alert('Cadastro simulado concluído! Você será redirecionado em um app real.'); return false;">
                <div class="form-group">
                    <label for="registerType">Tipo de Usuário:</label>
                    <select id="registerType" required>
                        <option value="cliente">Cliente (Preciso de Serviço)</option>
                        <option value="profissional">Prestador de Serviço</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="registerNome">Nome Completo:</label>
                    <input type="text" id="registerNome" placeholder="Nome Sobrenome" required>
                </div>
                <div class="form-group">
                    <label for="registerEmail">Email:</label>
                    <input type="email" id="registerEmail" placeholder="seu.email@exemplo.com" required>
                </div>
                <div class="form-group">
                    <label for="registerSenha">Senha:</label>
                    <input type="password" id="registerSenha" placeholder="Mínimo 8 caracteres" required>
                </div>
                <button type="submit" class="btn btn-secundario" style="width: 100%; margin-top: 10px;">Cadastrar</button>
                <p style="text-align: center; margin-top: 20px; font-size: 14px;">
                    Já tem conta? 
                    <a href="#" onclick="event.preventDefault(); handleModalSwitch('login')" style="color: var(--cor-principal); font-weight: bold;">Faça login aqui</a>
                </p>
            </form>
        </div>
    `;
}

/**
 * Alterna o conteúdo do modal entre Login e Cadastro (para os links internos).
 * @param {string} mode 'login' ou 'register'
 */
window.handleModalSwitch = function(mode) {
    const container = document.getElementById('modalFormContainer');
    if (container) {
        if (mode === 'login') {
            container.innerHTML = renderLoginForm();
        } else if (mode === 'register') {
            container.innerHTML = renderRegisterForm();
        }
    }
}
