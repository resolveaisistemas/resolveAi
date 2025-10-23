// --- INÍCIO DA SIMULAÇÃO DE DADOS ---

// 1. Simulação do cliente que fez o login. O endereço dele é a chave.
const clienteLogado = {
    nome: "Cliente Teste",
    endereco: "Avenida Brasil, 123, Maringá, PR"
};

// 2. Simulação de um banco de dados de profissionais cadastrados.
const profissionais = [
    { nome: "Carlos Silva", servico: "eletrica", endereco: "Rua Santos Dumont, 456, Maringá, PR", telefone: "(44) 99999-0001" },
    { nome: "Mariana Costa", servico: "hidraulica", endereco: "Avenida Colombo, 789, Maringá, PR", telefone: "(44) 99999-0002" },
    { nome: "João Pereira", servico: "jardinagem", endereco: "Avenida Tiradentes, 101, Maringá, PR", telefone: "(44) 99999-0003" },
    { nome: "Ana Souza", servico: "eletrica", endereco: "Avenida Cerro Azul, 1122, Maringá, PR", telefone: "(44) 99999-0004" }
];

// 3. Simulação de uma API de Geocodificação (transforma endereço em lat/lon)
function geocodeSimulado(endereco) {
    if (endereco.includes("Avenida Brasil, 123")) return { lat: -23.4253, lon: -51.9386 }; // Cliente
    if (endereco.includes("Rua Santos Dumont, 456")) return { lat: -23.4273, lon: -51.9388 }; // Carlos
    if (endereco.includes("Avenida Colombo, 789")) return { lat: -23.4144, lon: -51.9216 }; // Mariana
    if (endereco.includes("Avenida Tiradentes, 101")) return { lat: -23.4295, lon: -51.9431 }; // João
    if (endereco.includes("Avenida Cerro Azul, 1122")) return { lat: -23.4443, lon: -51.9427 }; // Ana
    return null; // Endereço não encontrado na simulação
}

// --- FIM DA SIMULAÇÃO DE DADOS ---


document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const tipoServico = document.getElementById('servico').value;
    const resultadoDiv = document.getElementById('resultado');

    resultadoDiv.innerHTML = "<p>Buscando profissional...</p>";
    
    setTimeout(() => {
        // Pega as coordenadas do cliente logado
        const clienteCoords = geocodeSimulado(clienteLogado.endereco);
        
        if (!clienteCoords) {
            resultadoDiv.innerHTML = "<p>Não foi possível encontrar as coordenadas do seu endereço de cadastro.</p>";
            return;
        }

        // Encontra o profissional
        const profissionalEncontrado = encontrarProfissionalMaisProximo(tipoServico, clienteCoords);

        // Exibe o resultado
        exibirResultado(profissionalEncontrado);
    }, 1000);
});

function encontrarProfissionalMaisProximo(tipoServico, clienteCoords) {
    let profissionalMaisProximo = null;
    let menorDistancia = Infinity;

    const profissionaisFiltrados = profissionais.filter(p => p.servico === tipoServico);
    if (profissionaisFiltrados.length === 0) return null;

    profissionaisFiltrados.forEach(profissional => {
        const profissionalCoords = geocodeSimulado(profissional.endereco);
        if (profissionalCoords) {
            const distancia = calcularDistancia(clienteCoords.lat, clienteCoords.lon, profissionalCoords.lat, profissionalCoords.lon);
            if (distancia < menorDistancia) {
                menorDistancia = distancia;
                profissionalMaisProximo = profissional;
            }
        }
    });
    // Adiciona a distância ao objeto para exibição
    if (profissionalMaisProximo) {
        profissionalMaisProximo.distancia = menorDistancia.toFixed(2);
    }
    return profissionalMaisProximo;
}

function exibirResultado(profissional) {
    const resultadoDiv = document.getElementById('resultado');
    if (profissional) {
        resultadoDiv.innerHTML = `
            <div class="profile-card">
                <h3>Profissional Encontrado!</h3>
                <p><strong>Nome:</strong> ${profissional.nome}</p>
                <p><strong>Telefone:</strong> ${profissional.telefone}</p>
                <p><strong>Distância Aproximada:</strong> ${profissional.distancia} km</p>
            </div>
        `;
    } else {
        resultadoDiv.innerHTML = `<div class="profile-card"><p>Nenhum profissional encontrado para este serviço.</p></div>`;
    }
}

function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distância em km
}