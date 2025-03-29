:root {
    /* Fundos */
    --bg-convite-img: url('/assets/divertidamente.png'); /* Altere esse caminho */

    /* Fundo do mural */
    --cor-fundo-mural: #fff9f4; /* Um tom claro para destacar as fotos */

    /* Cores principais com base nas emoções */
    --cor-primaria: #FFD93D;     /* Alegria */
    --cor-secundaria: #6C5CE7;   /* Medo */
    --cor-terciaria: #D72638;    /* Raiva */

    /* Textos */
    --cor-texto-principal: #3A6EA5;  /* Tristeza (azul escuro para contraste) */
    --cor-texto-claro: #ffffff;

    /* Botões */
    --botao-fundo: var(--cor-primaria);
    --botao-texto: #3A3A3A;
    --botao-hover: var(--cor-secundaria);
}
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Comic Sans MS', cursive, sans-serif;
    background-color: var(--cor-fundo-mural);
    color: var(--cor-texto-claro);
    text-align: center;
    padding-bottom: 120px;
  }
  
  /* Página de convite com imagem de fundo */
  #pagina-convite {
    background-image: var(--bg-convite-img);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  
  /* Película transparente atrás dos botões */
  .pelicula-botoes {
    background-color: rgba(0, 0, 0, 0.4);
    padding: 30px 20px 80px 20px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
  }
  
  /* Botões no terço inferior */
  .botoes {
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 320px;
    margin: 0 auto;
  }
  
  .botoes button {
    padding: 15px;
    border: none;
    border-radius: 30px;
    background-color: var(--botao-fundo);
    color: var(--botao-texto);
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .botoes button:hover {
    background-color: var(--botao-hover);
    color: var(--botao-texto);
  }
  
  /* Página do mural com fundo sólido */
  #pagina-mural {
    background-color: var(--cor-fundo-mural);
    color: var(--cor-texto-principal);
    min-height: 100vh;
    padding: 40px 20px 80px 20px;
  }
  
  /* Mural */
  .mural h2 {
    font-size: 1.8rem;
    margin-bottom: 20px;
  }
  
  .upload-label {
    display: inline-block;
    background-color: var(--botao-fundo);
    color: var(--botao-texto);
    font-weight: bold;
    padding: 12px 20px;
    border-radius: 30px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-bottom: 20px;
  }
  
  .upload-label:hover {
    background-color: var(--botao-hover);
    color: var(--botao-texto);
  }
  
  input[type="file"] {
    display: none;
  }
  
  .galeria {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
  }
  
  .galeria img {
    width: 100%;
    border-radius: 10px;
    object-fit: cover;
    cursor: pointer;
    transition: transform 0.2s ease;
  }
  
  .galeria img:hover {
    transform: scale(1.05);
  }
  
  /* Menu inferior */
  .menu-inferior {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: var(--cor-primaria);
    display: flex;
    justify-content: center;
    align-items: flex-end;
    z-index: 100;
    height: 60px;
  }
  
  .menu-inferior button {
    flex: 1;
    height: 100%;
    background-color: var(--cor-terciaria);
    color: var(--cor-primaria);
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    margin: -10px 5px 0 5px;
    padding: 10px 0;
    transition: all 0.3s ease;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.2);
    position: relative;
    top: -10px;
  }
  
  .menu-inferior button.ativo {
    background-color: var(--cor-secundaria);
    color: var(--cor-texto-principal);
    z-index: 101;
  }
  
  /* Modais */
  .modal-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  .modal {
    background-color: var(--cor-primaria);
    color: var(--cor-texto-principal);
    padding: 30px;
    border-radius: 20px;
    width: 90%;
    max-width: 400px;
    text-align: left;
  }
  
  .modal h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
  
  .modal label {
    font-weight: bold;
    margin: 10px 0 5px;
    display: block;
  }
  
  .modal input[type="text"],
  .modal input[type="number"] {
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    border: none;
  }
  
  .modal button {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 10px;
    font-weight: bold;
    margin-top: 10px;
    cursor: pointer;
    background-color: var(--cor-terciaria);
    color: var(--cor-primaria);
    transition: background-color 0.3s;
  }
  
  .modal button:hover {
    background-color: var(--botao-hover);
    color: var(--botao-texto);
  }
  
  /* Modal de imagem ampliada */
  #modal-imagem.modal-bg {
    background-color: rgba(0, 0, 0, 0.8);
  }
  
  #modal-imagem img {
    max-width: 90%;
    max-height: 80%;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
    transition: transform 0.3s ease;
  }
  
  #modal-imagem span {
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 30px;
    color: white;
    cursor: pointer;
    z-index: 1001;
    font-weight: bold;
  }
  
  /* Animação */
  @keyframes fade {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .pagina {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    display: none;
    animation: fade 0.4s ease;
    z-index: 0;
  }
  
  .pagina.ativa {
    display: block;
    z-index: 1;
  }

  .modal input[type="text"],
.modal input[type="number"] {
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  border: 2px solid #ccc;
  font-size: 1rem;
}

.quantidade-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 15px;
  }
  
  .quantidade-container button {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background-color: var(--cor-secundaria);
    color: var(--cor-texto-principal);
    font-size: 1.4rem;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
  }
  
  .quantidade-container button:hover {
    background-color: var(--cor-terciaria);
    color: var(--cor-primaria);
  }
  
  .quantidade-container input {
    width: 60px;
    height: 40px;
    text-align: center;
    font-size: 1.2rem;
    border: 2px solid #ccc;
    border-radius: 10px;
  }
  

  
  
