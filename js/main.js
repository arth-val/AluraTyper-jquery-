let campo = $(".campo-texto");
const tempoInicial = $('#tempo-digitaçao').text();

$(function(){
  atualizaFrase();
  atualizaPalCar();
  tempoDigitaçao();
  inicializaMarcadores();
  reiniciaJogo();
  $('#usuarios').selectize({
    create: true,
    sortField: 'text'
});
  $(".tooltip").tooltipster({
    trigger: "custom"
});
})

function atualizaFrase(){
  let frase = $(".frase").text();
  let numeroPalavras = frase.split(" ").length;
  let tamanhoFrase = $("#tamanho-frase").text(numeroPalavras);
}
function atualizaPalCar(){
  campo.on("input", function() {
    let textoCampo = campo.val();
    let qtdPalavras = textoCampo.split(/\S+/).length -1;
    let numeroPalavras = $("#quantidade-palavras").text(qtdPalavras);
    let qtdCaracteres = $('#quantidade-caracteres').text(campo.val().length);
    });
}
function tempoDigitaçao(){
  campo.one("focus", function(){
    let tempoDigitaçao = $('#tempo-digitaçao').text();
      $("#botao-reiniciar").attr("disabled", true);
    let cronometroID = setInterval(function() {
      tempoDigitaçao--;
      $("#tempo-digitaçao").text(tempoDigitaçao);
    if(tempoDigitaçao < 1) {
      clearInterval(cronometroID);
      finalizaJogo();

      }
    }, 1000);
  });
}
function finalizaJogo() {
    $("#botao-reiniciar").attr("disabled", false);
    campo.attr("disabled",true);
    campo.toggleClass("campo-desativado");
    inserePlacar();

}
function reiniciaJogo() {
  let botaoAtualiza = $("#botao-reiniciar").click(function(){
    $(".input-nome").val(""); //adição minha
    campo.attr("disabled", false);
    campo.val("");
    $("#botao-reiniciar").attr("disabled", true);
    $("#quantidade-palavras").text("0");
    $("#quantidade-caracteres").text("0");
    $('#tempo-digitaçao').text(tempoInicial);
    tempoDigitaçao();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-verde");
    campo.removeClass("borda-vermelha");

  })
}
function inicializaMarcadores (){
  campo.on("input", function(){
  let frase = $(".frase").text();
    //forma mais trad de fazer:
    //let digitado = campo.val();
    //let comparável = frase.substr(0, digitado.length);
    //let acerto = digitado == comparável;


    //forma ES6 JS
    if(frase.startsWith(campo.val())) {
      campo.addClass("borda-verde");
      campo.removeClass("borda-vermelha");
    }else{
      campo.addClass("borda-vermelha");
      campo.removeClass("borda-verde");
    }
  })
}
function atualizaTempoInicial(tempo){
  let tempoInicial = tempo;
  $("#tempo-digitaçao").text(tempo);
}
