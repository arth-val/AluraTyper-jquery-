function inserePlacar(){
  if($(".frase").text().startsWith(campo.val())){ //adição minha
  let placar = $(".tabela-placar");
  let corpoTabela = placar.find("tbody");
  let usuario = $("#usuarios").val();
  let numPalavras = $("#quantidade-palavras").text();

  let linha = novaLinha(usuario,numPalavras);
  linha.find(".botao-remover").click(removeLinha);
  corpoTabela.append(linha);
  //adição minha
}else{alert("Erro de digitação. Tente novamente!");}
  $(".tabela-placar").slideDown(500)
  scrollPlacar();
}
function scrollPlacar(){
  let posicaoPlacar = $(".tabela-placar").offset().top;
  $("body").animate({
    scrollTop: posicaoPlacar + "px"
  },1000)
}
$("#botao-placar").click(function (){
  $(".tabela-placar").stop().slideToggle(600);
});

function novaLinha(usuario, numPalavras) {
  let linha = $("<tr>");
  let colUsuario = $("<td>").text(usuario);
  let colPalavras = $("<td>").text(numPalavras);
  let colRemover = $("<td>");
  let link = $("<a>").attr("href","#").addClass("botao-remover");
  let icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

  //add tds no tr
  linha.append(colUsuario);
  linha.append(colPalavras);
  link.append(icone);
  colRemover.append(link);
  linha.append(colRemover);

  return linha;

}

function removeLinha(event){
  event.preventDefault();
  let linha = $(this).parent().parent();
  linha.fadeOut(1000);
  setTimeout(function(){
    linha.remove();
  }, 1000)
}
// ENVIAR DADOS PARA O SERVIDOR

$("#botao-servidor").click(function(){
  let placar = [];
  let linhas = $("tbody>tr");

  linhas.each(function() {
    let usuario = $(this).find("td:nth-child(1)").text();
    let palavras = $(this).find("td:nth-child(2)").text();

    let score = {
      usuario: usuario,
      pontos: palavras
    };

    placar.push(score);

  });
    let dados = {
      placar: placar
    };
    $.post("http://localhost:3000/placar", dados, function(){
      console.log("funcionou");
      $(".tooltip").tooltipster("open")
    }).fail(function(){
    $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar");
}).always(function(){
    setTimeout(function() {
    $(".tooltip").tooltipster("close");
    }, 1200);
  });
});
// RECEBER OS DADOS ENVIADOS PELO SERVIDOR

$.get("http://localhost:3000/placar", function(data) {
    $(data).each(function() {
      let linha = novaLinha(this.usuario, this.pontos);
      linha.find(".botao-remover").click(removeLinha);

      $("tbody").append(linha);
    });
  });
