const nomePerfil      = document.getElementById('nomePerfil');
const cursoPerfil     = document.getElementById('cursoPerfil');
const fotoPerfil      = document.getElementById('fotoPerfil');
const biografiaPerfil = document.getElementById('biografiaPerfil');
const secaoPerfil     = document.getElementById('perfil');

const temaSelect  = document.getElementById('temaSelect');
const fonteRange  = document.getElementById('fonteRange');
const valorFonte  = document.getElementById('valorFonte');
const mostrarBio  = document.getElementById('mostrarBio');

const emailInput      = document.getElementById('emailInput');
const telefoneInput   = document.getElementById('telefoneInput');
const emailExibido    = document.getElementById('emailExibido');
const telefoneExibido = document.getElementById('telefoneExibido');

const contadorAcoes = document.getElementById('contadorAcoes');
const ultimaAcao    = document.getElementById('ultimaAcao');

const nomeOriginal  = nomePerfil.textContent.trim();
const cursoOriginal = cursoPerfil.textContent.trim();
const fotoOriginal  = fotoPerfil.src;


let totalAcoes = 0;

function registrarAcao(descricao) {
    totalAcoes++;
    contadorAcoes.textContent = totalAcoes;
    ultimaAcao.textContent = descricao;
}


document.getElementById('btnAlterarNome').addEventListener('click', function () {
    const novo = prompt('Novo nome:');
    if (novo) {
        nomePerfil.textContent = novo;
        registrarAcao('Alteração de nome');
    }
});


document.getElementById('btnAlterarCurso').addEventListener('click', function () {
    const novo = prompt('Novo curso:');
    if (novo) {
        cursoPerfil.textContent = 'Curso: ' + novo;
        registrarAcao('Alteração de curso');
    }
});


const fotos = ['imagens/perfil1.jpg', 'imagens/perfil2.jpg', 'imagens/perfil3.jpg'];
let indiceFoto = 0;

document.getElementById('btnAlterarFoto').addEventListener('click', function () {
    indiceFoto = (indiceFoto + 1) % fotos.length;
    fotoPerfil.src = fotos[indiceFoto];
    registrarAcao('Alteração de foto');
});

document.getElementById('btnDestacarPerfil').addEventListener('click', function () {
    secaoPerfil.classList.add('destaque');
    registrarAcao('Perfil destacado');
});


document.getElementById('btnRestaurar').addEventListener('click', function () {
    nomePerfil.textContent     = nomeOriginal;
    cursoPerfil.textContent    = cursoOriginal;
    fotoPerfil.src             = fotoOriginal;
    indiceFoto                 = 0;
    secaoPerfil.classList.remove('destaque');
    document.body.className    = '';
    temaSelect.value           = 'claro';
    fonteRange.value           = 16;
    valorFonte.textContent     = '16px';
    biografiaPerfil.style.fontSize = '16px';
    mostrarBio.checked         = true;
    biografiaPerfil.style.display = 'block';
    registrarAcao('Perfil restaurado');
});


temaSelect.addEventListener('change', function () {
    document.body.className = this.value !== 'claro' ? 'tema-' + this.value : '';
    registrarAcao('Tema alterado: ' + this.value);
});


fonteRange.addEventListener('input', function () {
    valorFonte.textContent = this.value + 'px';
    biografiaPerfil.style.fontSize = this.value + 'px';
});

fonteRange.addEventListener('change', function () {
    registrarAcao('Fonte alterada: ' + this.value + 'px');
});


mostrarBio.addEventListener('change', function () {
    biografiaPerfil.style.display = this.checked ? 'block' : 'none';
    registrarAcao(this.checked ? 'Biografia exibida' : 'Biografia ocultada');
});

document.getElementById('btnAtualizarContato').addEventListener('click', function () {
    emailExibido.textContent    = 'E-mail: '   + (emailInput.value    || 'não informado');
    telefoneExibido.textContent = 'Telefone: ' + (telefoneInput.value || 'não informado');
    registrarAcao('Contato atualizado');
});