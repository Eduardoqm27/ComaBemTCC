const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const nodemailer = require('nodemailer');
const router = express.Router();

// Configurar o transporte do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'seu-email@gmail.com',
        pass: 'sua-senha'
    }
});

// Rota para exibir o formulário de registro
router.get('/register', (req, res) => {
    res.render('register'); // Certifique-se de que 'register.ejs' existe na pasta de views
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/profile', // Redireciona para a página de perfil após o login
    failureRedirect: '/auth/login',
    failureFlash: true
}));

router.post('/register', async (req, res) => {
    const { nome, email, dataNascimento, senha } = req.body; // Mantenha dataNascimento

    if (!senha) {
        return res.status(400).send('Senha é obrigatória.');
    }

    const hashedSenha = await bcrypt.hash(senha, 10);
    
    try {
        const usuario = await Usuario.create({ 
            nome, 
            email, 
            data_nasc: dataNascimento, // Usando o campo correto no modelo
            senha: hashedSenha 
        });
        
        // Enviar e-mail de confirmação
        const mailOptions = {
            from: 'seu-email@gmail.com',
            to: email,
            subject: 'Confirmação de Cadastro',
            text: `Olá ${nome},\n\nSeu cadastro foi realizado com sucesso!`
        };

        await transporter.sendMail(mailOptions);
        
        res.redirect('/login');
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).send('Erro ao cadastrar usuário.');
    }
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
