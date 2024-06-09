// Função errorHandler:
// Esta função é um middleware de tratamento de erros para lidar com exceções lançadas durante a execução de rotas na aplicação.
// É uma prática comum em aplicações Node.js usar um middleware dedicado para lidar com erros, separando o código de tratamento de erros do código principal da aplicação.
function errorHandler(err, req, res, next) {
    console.error(err.stack); // Registra o erro no console para depuração.
    res.status(500).json({ error: 'Something went wrong!' }); // Retorna uma resposta HTTP com status 500 (Internal Server Error) e um JSON indicando que algo deu errado.
}

// Exportação da Função:
// Exporta a função errorHandler para que ela possa ser usada em outros arquivos JavaScript, como um middleware de tratamento de erros em uma aplicação Node.js.
module.exports = errorHandler;
