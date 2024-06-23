const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarioModel');

// Função para realizar o login
exports.login = async (req, res) => {
    const { usuario, senha } = req.body;

    try {
        // Verifica se o usuário existe no banco de dados
        const usuarioDB = await Usuario.getByUsuario(usuario);

        // Se não encontrou o usuário, retorna um erro
        if (!usuarioDB) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Verifica se a senha está correta
        const match = await bcrypt.compare(senha, usuarioDB.senha);
        if (!match) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Gera um token JWT
        const token = jwt.sign({ id: usuarioDB.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Retorna o token como resposta
        res.json({ token });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro ao realizar login' });
    }
};

// Função para realizar o logout
exports.logout = async (req, res) => {
    try {
        // Lógica para invalidar o token (opcional, depende da implementação)
        // Se o token for inválido, o middleware verifyToken já terá bloqueado a requisição

        res.json({ message: 'Logout realizado com sucesso' });

    } catch (error) {
        console.error('Erro no logout:', error);
        res.status(500).json({ message: 'Erro ao realizar logout' });
    }
};
