function validarNome(nome) {
    const textoLimpo = nome.trim();
    return textoLimpo.length >= 3;
}

function validarEmail(email) {
    const textoLimpo = email.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(textoLimpo);
}

function validarTelefone(telefone) {
    const textoLimpo = telefone.trim();
    const regexTelefone = /^\(82\) 9\d{4}-\d{4}$/;
    return regexTelefone.test(textoLimpo);
}

function validarDataNascimento(data) {
    if (!data) {
        return false;
    }
    const idade = calcularIdade(data);
    return idade >= 16;
}

function validarCurso(curso) {
    return curso !== "";
}

function validarTurno() {
    const radioSelecionado = document.querySelector('input[name="turno"]:checked');
    return radioSelecionado !== null;
}

function validarInteresses() {
    const checkboxesSelecionadas = document.querySelectorAll('input[name="interesses"]:checked');
    return checkboxesSelecionadas.length >= 2;
}

function validarSenha(senha) {
    if (senha.length < 8) {
        return false;
    }
    const temMaiuscula = /[A-Z]/.test(senha);
    const temNumero = /[0-9]/.test(senha);
    return temMaiuscula && temNumero;
}

function validarConfirmarSenha(senhaOriginal, senhaConfirmada) {
    return senhaOriginal === senhaConfirmada && senhaConfirmada !== "";
}

function validarMensagem(mensagem) {
    const tamanho = mensagem.trim().length;
    return tamanho >= 50 && tamanho <= 500;
}

function validarFoto(arquivo) {
    if (!arquivo) {
        return true;
    }
    
    const formatosValidos = ["image/jpeg", "image/jpg", "image/png"];
    const formatoValido = formatosValidos.includes(arquivo.type);
    
    const limiteTamanho = 2 * 1024 * 1024;
    const tamanhoValido = arquivo.size <= limiteTamanho;
    
    return formatoValido && tamanhoValido;
}

function validarTermos() {
    const termosCheckbox = document.getElementById("termos");
    return termosCheckbox.checked;
}

function verificarForcaSenha(senha) {
    if (!senha) {
        return { label: "Não digitada", cor: "#94a3b8" };
    }
    
    let pontuacao = 0;
    if (senha.length >= 8) pontuacao++;
    if (/[A-Z]/.test(senha)) pontuacao++;
    if (/[0-9]/.test(senha)) pontuacao++;
    if (/[^A-Za-z0-9]/.test(senha)) pontuacao++;
    
    if (senha.length < 5) {
        return { label: "Muito Fraca", cor: "#ef4444" };
    }
    
    if (pontuacao <= 2) {
        return { label: "Fraca", cor: "#f43f5e" };
    } else if (pontuacao === 3) {
        return { label: "Média", cor: "#f59e0b" };
    } else {
        return { label: "Forte", cor: "#10b981" };
    }
}
