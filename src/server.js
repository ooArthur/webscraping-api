// Importação da Aplicação:
// A aplicação Express é importada do arquivo app.js, onde foi configurada.
const app = require('./app');

// Definição da Porta do Servidor:
// A porta em que o servidor vai ouvir é definida como a variável de ambiente PORT, ou 3000 caso não esteja definida.
const PORT = process.env.PORT || 3000;

// Inicialização do Servidor:
// O método listen() é chamado na aplicação, especificando a porta e uma função de retorno de chamada que é executada quando o servidor é iniciado.
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`); // Mensagem de console indicando que o servidor está em execução.
});
