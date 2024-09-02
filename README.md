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
    /partials                
      - header.ejs
      - footer.ejs
    /produtos               
      - index.ejs            
      - show.ejs             
    /categorias              
      - frutas.ejs
      - kits.ejs
      - legumes.ejs
      - verduras.ejs
    - login.ejs              
    - cadastro.ejs           
    - carrinho.ejs           
    - sobre.ejs              

  - app.js                   
  - package.json             
  - package-lock.json        




Código para inicializar o sistema no IF
npm install
npm uninstall sqlite3
npm install sqlite3
npm rebuild sqlite3
sudo apt-get install build-essential
npm rebuild
node app / npm start
