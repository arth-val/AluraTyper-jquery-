$("#botao-frase").click(function(){
    $("#spinner").toggle();
      $.get("http://localhost:3000/frases", function(data){
    let numeroAleatorio = Math.floor(Math.random() * data.length);
    let frase = $(".frase");
    frase.text(data[numeroAleatorio].texto);
    atualizaFrase();
    atualizaTempoInicial(data[numeroAleatorio].tempo);
    })
    .fail(function(){
        $("#erro").show();
      setInterval(function(){
        $("#erro").hide();
      },2000);

    })
    .always(function (){
      $("#spinner").toggle();

    })
})

$("#botao-fraseID").click(function(){
  $("#spinner").toggle();
  let fraseID = $("#input-frase").val();
  let dados = {id: fraseID};

  $.get("http://localhost:3000/frases", dados, function(data){
    let frase = $(".frase");
    frase.text(data.texto);
    atualizaFrase();
    atualizaTempoInicial(data.tempo);

  })
  .fail(function(){
    $("#erro").show();
    setTimeout(function(){
      $("#erro").hide();
      }, 2000);
    })

    .always(function (){
      $("#spinner").toggle();
    });
  });
