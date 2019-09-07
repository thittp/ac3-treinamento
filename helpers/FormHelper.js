beforeEach(function () {
  jasmine.addMatchers({
    toExistSubmit: function () {
      return {
        compare: function (form, texto) {
          var btn = form.find("input[type='submit'],button[type='submit']");
              result = { pass: btn.length > 0 };
          
          if(result.pass && texto){
            if(btn.is("input")){
              result.pass = result.pass && btn.val() === texto;
            } else {
              result.pass = result.pass && btn.text() === texto;
            }
          }
          result.message = (result.pass) ?
            "Encontrado botão de envio de dados de formulário" + (texto ? " com o texto correto." : ".") :
            "Não foi encontrado o botão de envio de dados do formulário"+(texto ? " com o texto correto." : ".");
          return result;
        }
      };
    },
    toExistReset: function () {
      return {
        compare: function (form, texto) {
          var btn = form.find("input[type='reset'],button[type='reset']");
              result = { pass: btn.length > 0 };
          
          if(result.pass && texto){
            if(btn.is("input")){
              result.pass = result.pass && btn.val() === texto;
            } else {
              result.pass = result.pass && btn.text() === texto;
            }
          }
          result.message = (result.pass) ?
            "Encontrado botão de limpeza de dados de formulário" + (texto ? " com o texto correto." : ".") :
            "Não foi encontrado o botão de limpeza de dados do formulário"+(texto ? " com o texto correto." : ".");
          return result;
        }
      };
    },
    toValidate: function () {
      return {
        compare: function (form) {
          var result = { pass: !$(form).prop("novalidate") };
          result.message = (result.pass) ?
            "Formulário está validando corretamente." :
            "Formulário não está validando corretamente.";
          return result;
        }
      };
    },
    toPost: function () {
      return {
        compare: function (form) {
          var result = { pass: $(form).attr("method") === "POST" };
          result.message = (result.pass) ?
            "Formulário está configurado com o POST corretamente." :
            "Formulário não está configurado com o POST corretamente (tamanho de letra conta).";
          return result;
        }
      };
    }
  });
});
