const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const knex = require('../config/db');  

const store = new KnexSessionStore({
  knex: knex, 
  tablename: 'sessions', 
  createtable: true, 
  sidfieldname: 'session_id', 
  clearInterval: 60000 
});

module.exports = {
  sessionMiddleware: session({
    secret: 'seu-segredo-aqui', 
    resave: false, 
    saveUninitialized: false, 
    store: store, 
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // duração da sessão (1 dia)
      secure: process.env.NODE_ENV === 'production' 
    }
  })
};
