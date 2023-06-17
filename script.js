var contador = 0;
var btnContador = document.getElementById("btnContador");
var resultado = document.getElementById("resultado");

// Verifica se já existe um contador armazenado no localStorage
if (localStorage.getItem("contador")) {
  contador = parseInt(localStorage.getItem("contador"));
}

// Verifica a data e hora do último clique armazenado
if (localStorage.getItem("ultimoClique")) {
  var ultimoClique = new Date(localStorage.getItem("ultimoClique"));
  var agora = new Date();

  // Verifica se já passaram 24 horas desde o último clique
  if ((agora - ultimoClique) > (24 * 60 * 60 * 1000)) {
    contador = 0;
    localStorage.setItem("contador", contador);
  }
}

// Atualiza o texto exibido no parágrafo com o contador atual
resultado.textContent = contador + " dias de ofensiva.";

// Função para exibir o tempo restante
function exibirTempoRestante() {
  var agora = new Date();
  var proximoClique = new Date(localStorage.getItem("ultimoClique"));
  proximoClique.setHours(proximoClique.getHours() + 24);
  var tempoRestante = proximoClique - agora;

  var horasRestantes = Math.floor(tempoRestante / (1000 * 60 * 60));
  var minutosRestantes = Math.floor((tempoRestante % (1000 * 60 * 60)) / (1000 * 60));
  var segundosRestantes = Math.floor((tempoRestante % (1000 * 60)) / 1000);

  resultado.innerHTML = contador + " dias de ofensiva.<br><span class='proximo-clique'>Próximo clique em: " + horasRestantes + "h " + minutosRestantes + "m</span>";
}

// Chamada inicial para exibir o tempo restante
exibirTempoRestante();

btnContador.addEventListener("click", function() {
  contador++;
  localStorage.setItem("contador", contador);
  localStorage.setItem("ultimoClique", new Date().toString());
  exibirTempoRestante();
});
