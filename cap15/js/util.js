function calcularIdade(dataNascimento) {
    if (!dataNascimento) return 0;
    
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const diferencaMeses = hoje.getMonth() - nascimento.getMonth();
    
    if (diferencaMeses < 0 || (diferencaMeses === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    
    return idade;
}

function aplicarMascaraTelefone(valor) {
    let apenasNumeros = valor.replace(/\D/g, "");
    apenasNumeros = apenasNumeros.substring(0, 11);
    
    if (apenasNumeros.length === 0) {
        return "";
    }
    if (apenasNumeros.length <= 2) {
        return "(" + apenasNumeros;
    }
    if (apenasNumeros.length <= 7) {
        return "(" + apenasNumeros.substring(0, 2) + ") " + apenasNumeros.substring(2);
    }
    return "(" + apenasNumeros.substring(0, 2) + ") " + apenasNumeros.substring(2, 7) + "-" + apenasNumeros.substring(7);
}

function salvarDadosFormulario(dados) {
    const dadosSeguros = { ...dados };
    delete dadosSeguros.senha;
    delete dadosSeguros.confirmarSenha;
    delete dadosSeguros.foto;
    
    localStorage.setItem("apex_inscricao_dados", JSON.stringify(dadosSeguros));
}

function obterDadosSalvos() {
    const dadosString = localStorage.getItem("apex_inscricao_dados");
    if (dadosString) {
        return JSON.parse(dadosString);
    }
    return null;
}

function limparDadosSalvos() {
    localStorage.removeItem("apex_inscricao_dados");
}
