document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("cadastroForm");
    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const telefoneInput = document.getElementById("telefone");
    const dataNascimentoInput = document.getElementById("dataNascimento");
    const cursoSelect = document.getElementById("curso");
    const senhaInput = document.getElementById("senha");
    const confirmarSenhaInput = document.getElementById("confirmarSenha");
    const fotoInput = document.getElementById("foto");
    const mensagemInput = document.getElementById("mensagem");
    const termosCheckbox = document.getElementById("termos");

    const charCounter = document.getElementById("char-counter");
    const strengthFill = document.getElementById("strength-fill");
    const strengthLabel = document.getElementById("strength-label");
    const imagePreview = document.getElementById("image-preview");

    const confirmModal = document.getElementById("confirmation-modal");
    const termsModal = document.getElementById("terms-modal");
    const successOverlay = document.getElementById("success-overlay");

    function aplicarFeedback(inputElement, eValido, erroId, mensagemErro) {
        const container = inputElement.closest(".form-group") || inputElement.closest(".form-group-terms");
        const spanErro = document.getElementById(erroId);
        
        if (eValido) {
            container.classList.add("is-valid");
            container.classList.remove("is-invalid");
            if (spanErro) {
                spanErro.textContent = "";
            }
        } else {
            container.classList.remove("is-valid");
            container.classList.add("is-invalid");
            if (spanErro) {
                spanErro.textContent = mensagemErro;
            }
        }
    }

    function checarNome() {
        const valido = validarNome(nomeInput.value);
        aplicarFeedback(nomeInput, valido, "nome-error", "O nome completo é obrigatório e deve ter no mínimo 3 letras.");
        return valido;
    }

    function checarEmail() {
        const valido = validarEmail(emailInput.value);
        aplicarFeedback(emailInput, valido, "email-error", "Informe um endereço de e-mail válido.");
        return valido;
    }

    function checarTelefone() {
        const valido = validarTelefone(telefoneInput.value);
        aplicarFeedback(telefoneInput, valido, "telefone-error", "O telefone deve seguir exatamente o formato (82) 9XXXX-XXXX.");
        return valido;
    }

    function checarDataNascimento() {
        const valido = validarDataNascimento(dataNascimentoInput.value);
        aplicarFeedback(dataNascimentoInput, valido, "dataNascimento-error", "Inscrição restrita a candidatos com 16 anos ou mais.");
        return valido;
    }

    function checarCurso() {
        const valido = validarCurso(cursoSelect.value);
        aplicarFeedback(cursoSelect, valido, "curso-error", "Escolha um dos cursos técnicos disponíveis.");
        return valido;
    }

    function checarTurno() {
        const valido = validarTurno();
        const container = document.querySelector(".form-group-radio");
        const spanErro = document.getElementById("turno-error");
        
        if (valido) {
            container.classList.remove("is-invalid");
            if (spanErro) spanErro.textContent = "";
        } else {
            container.classList.add("is-invalid");
            if (spanErro) spanErro.textContent = "Você deve escolher um turno de estudos.";
        }
        return valido;
    }

    function checarInteresses() {
        const valido = validarInteresses();
        const container = document.querySelector(".form-group-checkbox");
        const spanErro = document.getElementById("interesses-error");
        
        if (valido) {
            container.classList.remove("is-invalid");
            if (spanErro) spanErro.textContent = "";
        } else {
            container.classList.add("is-invalid");
            if (spanErro) spanErro.textContent = "Selecione ao menos duas áreas de interesse.";
        }
        return valido;
    }

    function checarSenha() {
        const valido = validarSenha(senhaInput.value);
        aplicarFeedback(senhaInput, valido, "senha-error", "A senha deve ter pelo menos 8 dígitos, conter 1 letra maiúscula e 1 número.");
        
        if (confirmarSenhaInput.value) {
            checarConfirmarSenha();
        }
        return valido;
    }

    function checarConfirmarSenha() {
        const valido = validarConfirmarSenha(senhaInput.value, confirmarSenhaInput.value);
        aplicarFeedback(confirmarSenhaInput, valido, "confirmarSenha-error", "A confirmação da senha deve ser idêntica à senha cadastrada.");
        return valido;
    }

    function checarMensagem() {
        const valido = validarMensagem(mensagemInput.value);
        aplicarFeedback(mensagemInput, valido, "mensagem-error", "A mensagem deve conter entre 50 e 500 caracteres.");
        return valido;
    }

    function checarFoto() {
        const arquivo = fotoInput.files[0];
        const valido = validarFoto(arquivo);
        aplicarFeedback(fotoInput, valido, "foto-error", "Selecione uma imagem JPG ou PNG com tamanho máximo de 2MB.");
        return valido;
    }

    function checarTermos() {
        const valido = validarTermos();
        const container = document.querySelector(".form-group-terms");
        const spanErro = document.getElementById("termos-error");
        
        if (valido) {
            container.classList.remove("is-invalid");
            if (spanErro) spanErro.textContent = "";
        } else {
            container.classList.add("is-invalid");
            if (spanErro) spanErro.textContent = "Aceite os termos e condições antes de enviar.";
        }
        return valido;
    }

    function validarFormularioCompleto() {
        const nomeValido = checarNome();
        const emailValido = checarEmail();
        const telefoneValido = checarTelefone();
        const dataValida = checarDataNascimento();
        const cursoValido = checarCurso();
        const turnoValido = checarTurno();
        const interessesValidos = checarInteresses();
        const senhaValida = checarSenha();
        const confirmarSenhaValida = checarConfirmarSenha();
        const fotoValida = checarFoto();
        const mensagemValido = checarMensagem();
        const termosValidos = checarTermos();

        return nomeValido && emailValido && telefoneValido && dataValida && cursoValido && 
               turnoValido && interessesValidos && senhaValida && confirmarSenhaValida && 
               fotoValida && mensagemValido && termosValidos;
    }

    nomeInput.addEventListener("input", function() {
        checarNome();
        salvarEstadoLocamente();
    });

    emailInput.addEventListener("input", function() {
        checarEmail();
        salvarEstadoLocamente();
    });

    senhaInput.addEventListener("input", function() {
        checarSenha();
        atualizarMedidorSenha();
    });

    confirmarSenhaInput.addEventListener("input", function() {
        checarConfirmarSenha();
    });

    mensagemInput.addEventListener("input", function() {
        checarMensagem();
        charCounter.textContent = mensagemInput.value.length + " / 500";
        salvarEstadoLocamente();
    });

    telefoneInput.addEventListener("input", function() {
        telefoneInput.value = aplicarMascaraTelefone(telefoneInput.value);
        checarTelefone();
        salvarEstadoLocamente();
    });

    dataNascimentoInput.addEventListener("change", function() {
        checarDataNascimento();
        salvarEstadoLocamente();
    });

    cursoSelect.addEventListener("change", function() {
        checarCurso();
        salvarEstadoLocamente();
    });

    fotoInput.addEventListener("change", function() {
        checarFoto();
        const arquivo = fotoInput.files[0];
        if (arquivo && validarFoto(arquivo)) {
            const leitor = new FileReader();
            leitor.onload = function(evento) {
                imagePreview.src = evento.target.result;
                imagePreview.style.display = "block";
            };
            leitor.readAsDataURL(arquivo);
        } else {
            imagePreview.style.display = "none";
        }
    });

    document.querySelectorAll('input[name="turno"]').forEach(function(radio) {
        radio.addEventListener("change", function() {
            checarTurno();
            salvarEstadoLocamente();
        });
    });

    document.querySelectorAll('input[name="interesses"]').forEach(function(cb) {
        cb.addEventListener("change", function() {
            checarInteresses();
            salvarEstadoLocamente();
        });
    });

    termosCheckbox.addEventListener("change", function() {
        checarTermos();
    });

    function atualizarMedidorSenha() {
        const forca = verificarForcaSenha(senhaInput.value);
        
        if (senhaInput.value.length === 0) {
            strengthFill.style.width = "0px";
            strengthLabel.textContent = "Força";
        } else {
            strengthFill.style.width = "60px";
            strengthFill.style.backgroundColor = forca.cor;
            strengthLabel.textContent = "Força: " + forca.label;
        }
    }

    document.querySelectorAll(".toggle-password").forEach(function(botao) {
        botao.addEventListener("click", function() {
            const campoAlvo = document.getElementById(botao.dataset.target);
            if (campoAlvo.type === "password") {
                campoAlvo.type = "text";
                botao.textContent = "🙈";
            } else {
                campoAlvo.type = "password";
                botao.textContent = "👁️";
            }
        });
    });

    function salvarEstadoLocamente() {
        const interessesSelecionados = [];
        document.querySelectorAll('input[name="interesses"]:checked').forEach(function(cb) {
            interessesSelecionados.push(cb.value);
        });

        const turnoAtivo = document.querySelector('input[name="turno"]:checked');

        const dadosFormulario = {
            nome: nomeInput.value,
            email: emailInput.value,
            telefone: telefoneInput.value,
            dataNascimento: dataNascimentoInput.value,
            curso: cursoSelect.value,
            turno: turnoAtivo ? turnoAtivo.value : "",
            interesses: interessesSelecionados,
            mensagem: mensagemInput.value
        };
        salvarDadosFormulario(dadosFormulario);
    }

    function restaurarEstadoLocal() {
        const dados = obterDadosSalvos();
        if (!dados) return;

        if (dados.nome) nomeInput.value = dados.nome;
        if (dados.email) emailInput.value = dados.email;
        if (dados.telefone) telefoneInput.value = dados.telefone;
        if (dados.dataNascimento) dataNascimentoInput.value = dados.dataNascimento;
        if (dados.curso) cursoSelect.value = dados.curso;
        if (dados.mensagem) {
            mensagemInput.value = dados.mensagem;
            charCounter.textContent = dados.mensagem.length + " / 500";
        }

        if (dados.turno) {
            const radio = document.querySelector('input[name="turno"][value="' + dados.turno + '"]');
            if (radio) radio.checked = true;
        }

        if (dados.interesses) {
            dados.interesses.forEach(function(valor) {
                const cb = document.querySelector('input[name="interesses"][value="' + valor + '"]');
                if (cb) cb.checked = true;
            });
        }
    }

    form.addEventListener("submit", function(evento) {
        evento.preventDefault();
        
        const valido = validarFormularioCompleto();
        if (valido) {
            confirmModal.style.display = "flex";
        } else {
            const campoComErro = document.querySelector(".is-invalid input, .is-invalid select, .is-invalid textarea");
            if (campoComErro) {
                campoComErro.focus();
            }
        }
    });

    document.getElementById("modal-confirm").addEventListener("click", function() {
        confirmModal.style.display = "none";
        successOverlay.style.display = "flex";
        limparDadosSalvos();
    });

    document.getElementById("modal-cancel").addEventListener("click", function() {
        confirmModal.style.display = "none";
    });

    document.getElementById("success-close").addEventListener("click", function() {
        successOverlay.style.display = "none";
        resetarFormulario();
    });

    document.getElementById("btn-terms").addEventListener("click", function(evento) {
        evento.preventDefault();
        termsModal.style.display = "flex";
    });

    document.getElementById("terms-close").addEventListener("click", function() {
        termsModal.style.display = "none";
    });

    function resetarFormulario() {
        form.reset();
        limparDadosSalvos();
        
        document.querySelectorAll(".is-valid, .is-invalid").forEach(function(elemento) {
            elemento.classList.remove("is-valid", "is-invalid");
        });
        
        imagePreview.style.display = "none";
        charCounter.textContent = "0 / 500";
        strengthFill.style.width = "0px";
        strengthLabel.textContent = "Força";
    }

    document.getElementById("btn-limpar").addEventListener("click", function(evento) {
        evento.preventDefault();
        resetarFormulario();
    });

    restaurarEstadoLocal();
});
