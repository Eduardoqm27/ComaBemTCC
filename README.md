# ComaBemTCC
Repositório do Sistema coma Bem - TCC

Nova estrutura do sistema

/ComaBemTCC
  /config
    - database.js            

  /controllers
    - AuthController.js     
    - CarrinhoController.js 
    - ProdutoController.js  

  /models
    - Usuario.js            
    - Produto.js            
    - Carrinho.js     

  /public
    /css
      - style.css        
    /js
      - scripts.js           
    /img
      - logo.png          

  /routes
    - auth.js               
    - carrinho.js            
    - produto.js             
    - index.js               

  /views
    /pages
      - index.ejs 
    /produtos  
      /categorias              
        - frutas.ejs
        - kits.ejs
        - legumes.ejs
        - verduras.ejs           
      - show.ejs             
    - login.ejs              
    - cadastro.ejs           
    - carrinho.ejs           
    - sobre.ejs              

  - app.js                   
  - package.json             
  - package-lock.json        




Código para instalar as dependências do sistema:
npm install

Comando para instalar o bcrypt:
npm install bcrypt --save

Comando para instalar o express:
npm install express --save

Comando para inicializar o Servidor:
node app.js ou
npm start