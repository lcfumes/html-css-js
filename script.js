// Seleciona os elementos da página que serão manipulados pelo JavaScript
const cpfInput = document.getElementById('cpfInput');
const validarBtn = document.getElementById('validarBtn');
const resultado = document.getElementById('resultado');

// Formata o CPF no formato 000.000.000-00 enquanto o usuário digita
function formatarCPF(valor) {
    const numeros = valor.replace(/\D/g, '').slice(0, 11);

    if (numeros.length <= 3) return numeros;
    if (numeros.length <= 6) return `${numeros.slice(0, 3)}.${numeros.slice(3)}`;
    if (numeros.length <= 9) {
        return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6)}`;
    }

    return `${numeros.slice(0, 3)}.${numeros.slice(3, 6)}.${numeros.slice(6, 9)}-${numeros.slice(9)}`;
}

// Calcula um dígito verificador do CPF com base em uma sequência e peso
function calcularDigito(cpfParcial, pesoInicial) {
    let soma = 0;

    for (let i = 0; i < cpfParcial.length; i++) {
        soma += Number(cpfParcial[i]) * (pesoInicial - i);
    }

    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
}

// Valida o CPF completo usando os dígitos verificadores
function validarCPF(cpf) {
    const numeros = cpf.replace(/\D/g, '');

    // CPF deve ter 11 dígitos
    if (numeros.length !== 11) return false;

    // Evita CPFs repetidos como 111.111.111-11
    if (/^([0-9])\1+$/.test(numeros)) return false;

    const digito1 = calcularDigito(numeros.slice(0, 9), 10);
    const digito2 = calcularDigito(numeros.slice(0, 9) + digito1, 11);

    return digito1 === Number(numeros[9]) && digito2 === Number(numeros[10]);
}

// Exibe a mensagem final e aplicar a classe de sucesso ou erro
function mostrarResultado(mensagem, tipo) {
    resultado.textContent = mensagem;
    resultado.classList.remove('success', 'error');
    resultado.classList.add(tipo);
}

// Quando o usuário digita, aplica máscara e valida automaticamente
cpfInput.addEventListener('input', (event) => {
    event.target.value = formatarCPF(event.target.value);

    if (event.target.value.length === 14) {
        const cpf = event.target.value;

        if (validarCPF(cpf)) {
            mostrarResultado('CPF válido!', 'success');
        } else {
            mostrarResultado('CPF inválido!', 'error');
        }
    } else {
        resultado.textContent = '';
        resultado.classList.remove('success', 'error');
    }
});

// Validação ao clicar no botão
validarBtn.addEventListener('click', () => {
    const cpf = cpfInput.value;

    if (!cpf) {
        mostrarResultado('Digite um CPF.', 'error');
        return;
    }

    if (validarCPF(cpf)) {
        mostrarResultado('CPF válido!', 'success');
    } else {
        mostrarResultado('CPF inválido!', 'error');
    }
});
