// script.js

const SUPABASE_URL = "https://afzabegsczdkurxidqnb.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmemFiZWdzY3pka3VyeGlkcW5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NDg5MTIsImV4cCI6MjA1ODQyNDkxMn0.QSKPxzYd2eUmsab-HFTRzcUQYgHALN3Xht77z4qZPdc";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const PASTA = "bernardo-4-anos"; // pasta deste convite específica
let paginaAtual = 0;
const limitePorPagina = 10;

// Configuração da festa
const dataFesta = new Date("2025-03-24T19:30:00");
const duracaoHoras = 2;
const fimFesta = new Date(dataFesta.getTime() + duracaoHoras * 60 * 60 * 1000);

function trocarPagina(pagina) {
  const convite = document.getElementById('pagina-convite');
  const mural = document.getElementById('pagina-mural');
  const btnConvite = document.getElementById('btn-convite');
  const btnMural = document.getElementById('btn-mural');

  if (pagina === 'convite') {
    convite.classList.add('ativa');
    mural.classList.remove('ativa');
    btnConvite.classList.add('ativo');
    btnMural.classList.remove('ativo');
  } else {
    convite.classList.remove('ativa');
    mural.classList.add('ativa');
    btnConvite.classList.remove('ativo');
    btnMural.classList.add('ativo');
    paginaAtual = 0;
    carregarFotosMural();
    controlarUpload();
    iniciarContagemRegressiva();
  }
}

function abrirMapa() {
  const endereco = encodeURIComponent("Salão Festa e Cia, Rua Lorca, 10, União");
  window.open(`https://www.google.com/maps/search/?api=1&query=${endereco}`, '_blank');
}

function abrirModalConfirmacao() {
  document.getElementById('modal-confirmacao').style.display = 'flex';
}

function fecharModalConfirmacao() {
  document.getElementById('modal-confirmacao').style.display = 'none';
}

function verPresentes() {
  alert('Lista de presentes será implementada.');
}

function enviarConfirmacao() {
  const nome = document.getElementById('nomeConfirmacao').value.trim();
  const acompanhantes = parseInt(document.getElementById('acompanhantesConfirmacao').value);

  if (!nome) {
    alert('Por favor, preencha seu nome.');
    return;
  }

  fetch(`${SUPABASE_URL}/rest/v1/confirmados`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({ nome, acompanhantes })
  })
  .then(res => {
    if (res.ok) {
      alert("Presença confirmada com sucesso! 🎉");
      fecharModalConfirmacao();
      document.getElementById('nomeConfirmacao').value = '';
      document.getElementById('acompanhantesConfirmacao').value = 0;
    } else {
      alert("Erro ao confirmar presença. Tente novamente.");
    }
  });
}

function controlarUpload() {
  const inputUpload = document.getElementById("uploadFoto");
  const labelUpload = document.querySelector("label[for='uploadFoto']");
  const cronometro = document.getElementById("cronometro-upload");
  const agora = new Date();

  if (agora >= dataFesta && agora <= fimFesta) {
    inputUpload.disabled = false;
    labelUpload.style.display = "inline-block";
    if (cronometro) cronometro.style.display = "none";
  } else {
    inputUpload.disabled = true;
    labelUpload.style.display = "none";
    if (cronometro) cronometro.style.display = "block";
  }
}

function iniciarContagemRegressiva() {
  const cronometro = document.getElementById("cronometro-upload");
  if (!cronometro) return;

  function atualizarContagem() {
    const agora = new Date();
    const diff = dataFesta - agora;

    if (diff <= 0) {
      cronometro.style.display = "none";
      controlarUpload();
      return;
    }

    const horas = Math.floor(diff / (1000 * 60 * 60));
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diff % (1000 * 60)) / 1000);

    cronometro.innerHTML = `🚨 Atenção patrulheiros! O envio de fotos será liberado em <strong>${horas}h ${minutos}m ${segundos}s</strong>!`; 
  }

  atualizarContagem();
  setInterval(atualizarContagem, 1000);
}

async function uploadParaSupabase(event) {
  const file = event.target.files[0];
  if (!file) return;

  const fileName = `${Date.now()}-${file.name}`;
  const path = `${PASTA}/${fileName}`;

  const { data, error } = await supabase.storage
    .from("mural")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type
    });

  if (error) {
    console.error("Erro do Supabase:", error);
    alert("Erro ao enviar a imagem.");
    return;
  }

  const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/mural/${path}`;
  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = "Foto enviada";
  img.addEventListener('click', () => abrirImagemAmpliada(imageUrl));
  document.getElementById("galeria").appendChild(img);
}

function abrirImagemAmpliada(url) {
  const modal = document.getElementById("modal-imagem");
  const imagem = document.getElementById("imagem-ampliada");
  if (imagem && modal) {
    imagem.src = url;
    modal.style.display = "flex";
  }
}

function fecharImagemAmpliada() {
  const modal = document.getElementById("modal-imagem");
  const imagem = document.getElementById("imagem-ampliada");
  if (modal && imagem) {
    modal.style.display = "none";
    imagem.src = "";
  }
}

document.getElementById('galeria').addEventListener('click', function (e) {
  if (e.target.tagName === 'IMG') {
    abrirImagemAmpliada(e.target.src);
  }
});

async function carregarFotosMural() {
  const galeria = document.getElementById("galeria");
  galeria.innerHTML = "";

  const { data, error } = await supabase.storage.from("mural").list(PASTA, {
    limit: 1000,
    offset: 0,
    sortBy: { column: "name", order: "asc" }
  });

  if (error) {
    console.error("Erro ao listar imagens:", error);
    return;
  }

  const inicio = paginaAtual * limitePorPagina;
  const fim = inicio + limitePorPagina;
  const imagensPaginadas = data.slice(inicio, fim);

  imagensPaginadas.forEach(file => {
    const imageUrl = `${SUPABASE_URL}/storage/v1/object/public/mural/${PASTA}/${file.name}`;
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = file.name;
    img.addEventListener('click', () => abrirImagemAmpliada(imageUrl));
    galeria.appendChild(img);
  });

  if (fim < data.length) {
    const btnMais = document.createElement("button");
    btnMais.textContent = "🔄 Carregar mais fotos";
    btnMais.classList.add("btn-carregar-mais");
    btnMais.style.margin = "20px auto";
    btnMais.style.padding = "12px 24px";
    btnMais.style.border = "none";
    btnMais.style.borderRadius = "30px";
    btnMais.style.backgroundColor = "var(--cor-primaria)";
    btnMais.style.color = "var(--cor-fundo)";
    btnMais.style.fontWeight = "bold";
    btnMais.style.cursor = "pointer";
    btnMais.style.transition = "background-color 0.3s";
    btnMais.addEventListener("mouseenter", () => btnMais.style.backgroundColor = "var(--cor-secundaria)");
    btnMais.addEventListener("mouseleave", () => btnMais.style.backgroundColor = "var(--cor-primaria)");
    btnMais.onclick = () => {
      paginaAtual++;
      carregarFotosMural();
    };
    galeria.appendChild(btnMais);
  }
}

function verPresentes() {
    document.getElementById('modal-presentes').style.display = 'flex';
  }
  function fecharModalPresentes() {
    document.getElementById('modal-presentes').style.display = 'none';
  }