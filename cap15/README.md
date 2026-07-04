# Laboratório — Validação de Formulários com HTML e JavaScript

Este diretório contém a resolução do laboratório de desenvolvimento de uma ficha de inscrição completa para a escola técnica fictícia **Apex Tech**. O projeto foi estruturado com foco em design moderno, acessibilidade, validações em tempo real e melhorias ricas na experiência do usuário (UX).

---

## 📁 Estrutura do Projeto

Os arquivos foram organizados de forma modular conforme a especificação do laboratório:

```text
cap-15/
│
├── index.html          # Estrutura HTML5 semântica e acessível do formulário
├── css/
│   └── style.css       # Design premium (Dark Mode, Glassmorphism, Responsivo)
│
├── js/
│   ├── util.js         # Utilitários (Máscara de telefone, localStorage, cálculo de idade)
│   ├── validacoes.js   # Regras de negócio de validação de cada campo do formulário
│   └── app.js          # Controlador principal (Eventos em tempo real, UI, previews, modals)
│
└── README.md           # Documentação explicativa do laboratório (este arquivo)
```

---

## 🚀 Requisitos Implementados

### Parte 1 – Estrutura HTML
- **Tags Semânticas**: Todo o formulário foi envolto na tag `<form>` com os campos organizados em seções lógicas utilizando `<fieldset>` e `<legend>` para acessibilidade.
- **Estrutura de Rótulos**: Todos os controles de formulário possuem a tag `<label>` associada perfeitamente através dos atributos `for` e `id`.
- **Ações**: Botões de **Enviar** (`type="submit"`) e **Limpar** (`type="reset"`) estilizados.

### Parte 2 – Validação HTML
- Utilização de atributos nativos de validação como: `required` (campos obrigatórios), `minlength` e `maxlength` (Nome, Senha, Mensagem), `type` (`email`, `tel`, `date`, `password`, `file`), `accept` (Foto - restringindo a formatos de imagem `image/jpeg,image/png`) e placeholders intuitivos.
- O formulário utiliza o atributo `novalidate` apenas para que o JavaScript possa gerenciar as mensagens de erro customizadas e a estética visual da aplicação sem que os balões de erro nativos dos navegadores interfiram na experiência.

### Parte 3 – Validação em JavaScript (`js/validacoes.js`)
As validações contam com as seguintes regras estritas:
1. **Nome**: Obrigatório, mínimo de 3 caracteres.
2. **E-mail**: Obrigatório, formato de e-mail válido através de Regex.
3. **Telefone**: Obrigatório, aceitando apenas o formato específico `(82) 99999-9999`.
4. **Data de nascimento**: Obrigatório, garantindo idade mínima de 16 anos baseando-se no fuso horário local e na data atual.
5. **Curso**: Seleção obrigatória de uma das opções de curso técnico.
6. **Turno**: Seleção de um único turno (Matutino, Vespertino ou Noturno).
7. **Áreas de interesse**: Seleção de no mínimo 2 opções entre as oferecidas.
8. **Senha**: Mínimo de 8 caracteres, contendo pelo menos uma letra maiúscula e um número.
9. **Confirmar senha**: Deve ser idêntica à senha inserida anteriormente.
10. **Mensagem**: Mínimo de 50 e máximo de 500 caracteres.
11. **Foto**: Campo opcional. Se enviado, valida se o arquivo possui extensão `.jpg`, `.jpeg` ou `.png` e se o tamanho máximo do arquivo é de até `2 MB`.
12. **Termos**: Aceite obrigatório dos termos de inscrição.

### Parte 4 – Validação em Tempo Real (`js/app.js`)
As validações dos campos **Nome, E-mail, Senha, Confirmar senha e Mensagem** ocorrem enquanto o usuário interage (evento `input`). O sistema possui uma lógica de campos "tocados" para evitar alertar erros antes de o usuário terminar de preencher pela primeira vez. Os erros desaparecem de forma fluida assim que a pendência for corrigida.

### Parte 5 – Experiência do Usuário (UX)
Implementado os seis itens sugeridos:
1. **Indicador de Força da Senha**: Barra de progresso segmentada de força da senha (Muito Fraca, Fraca, Média, Forte) que muda de cor (vermelho, amarelo, verde) baseada em critérios.
2. **Contador de Caracteres da Mensagem**: Exibe dinamicamente o número de caracteres em tempo real e altera a cor do contador quando o limite mínimo (50) ou máximo (500) é ultrapassado ou respeitado.
3. **Preview da Imagem**: Exibe instantaneamente a foto carregada em um card estilizado com nome, tamanho formatado e botão para exclusão.
4. **Máscara para Telefone**: Aplica formatação automática em tempo real enquanto o usuário digita no padrão `(82) 99999-9999`.
5. **Destacar campos válidos**: Bordas na cor verde-esmeralda e ícone de checkmark indicam sucesso no campo preenchido corretamente.
6. **Destacar campos inválidos**: Bordas na cor vermelha-rose e ícone de aviso indicam erros, acompanhados de uma mensagem explicativa animada logo abaixo do campo correspondente.

### 🏆 Funcionalidades Bônus Implementadas
1. **Mostrar/Esconder Senha**: Botões de olho estilizados que alternam o tipo dos inputs de senha para texto comum e vice-versa.
2. **Salvar dados no localStorage**: Salva automaticamente o progresso do candidato à medida que preenche o formulário.
3. **Restaurar dados automaticamente**: Ao recarregar a página, todos os dados previamente digitados (com exceção de senhas e arquivos por razões óbvias de segurança) são restaurados, executando as validações automáticas para que o usuário veja o estado de progresso.
4. **Modal de Confirmação customizado**: Antes de enviar o formulário, abre-se uma caixa de diálogo estilizada exibindo o resumo formatado das informações inseridas para revisão e confirmação do candidato.
5. **Animação de Sucesso**: Exibe uma tela inteira de sucesso com uma animação de desenho vetorial (SVG checkmark) e opções para reiniciar o cadastro.

---

## 🛠️ Como Executar o Projeto

1. Faça o clone ou download deste repositório.
2. Navegue até a pasta `cap-15/` e abra o arquivo `index.html` em qualquer navegador moderno.
3. Não há necessidade de instalação de dependências ou servidores back-end, pois o formulário funciona inteiramente no lado do cliente (Client-Side).
