beforeEach(function () {
  jasmine.addMatchers({
    toExists: function () {
      return {
        compare: function (nome) {
          var field = $(":input[name='"+nome+"']");
              result = { pass: field.length > 0 };
          result.message = (result.pass) ?
            "Existe campo com nome '"+nome+"'" :
            "Não foi encontrado campo com nome '"+nome+"'";
          return result;
        }
      };
    },
    toHaveMin: function () {
      return {
        compare: function (nome, min) {
          var field = $(":input[name='"+nome+"']"),
              mensagem = "",
              $min = field.attr("min");
            
              if(!$min){
                mensagem = "Campo de nome '"+nome+"' deveria ter mínimo de '"+min+"', mas não possui nenhum.";
              } else if ($min != min){
                mensagem = "Campo de nome '"+nome+"' deveria ter mínimo de '"+min+"', mas possui mínimo de '"+$min+".";
              }
              return {
                pass: !mensagem ? true : false,
                message: !mensagem ? "Campo com nome '"+nome+"' com mínimo correto" : mensagem
              };
        }
      };
    },
    toHaveMax: function () {
      return {
        compare: function (nome, max) {
          var field = $(":input[name='"+nome+"']"),
              mensagem = "",
              $max = field.attr("max");
            
              if(!$max){
                mensagem = "Campo de nome '"+nome+"' deveria ter máximo de '"+max+"', mas não possui nenhum.";
              } else if ($max != max){
                mensagem = "Campo de nome '"+nome+"' deveria ter máximo de '"+max+"', mas possui máximo de '"+$max+".";
              }
              return {
                pass: !mensagem ? true : false,
                message: !mensagem ? "Campo com nome '"+nome+"' com máximo correto" : mensagem
              };
        }
      };
    },
    toHaveDefault: function () {
      return {
        compare: function (nome, def) {
          var field = $(":input[name='"+nome+"']"),
              mensagem = "",
              $def = field.val();
            
              if(!$def){
                mensagem = "Campo de nome '"+nome+"' deveria ter valor padrão de '"+def+"', mas não possui nenhum.";
              } else if ($def != def){
                mensagem = "Campo de nome '"+nome+"' deveria ter valor padrão de '"+def+"', mas possui '"+$def+".";
              }
              return {
                pass: !mensagem ? true : false,
                message: !mensagem ? "Campo com nome '"+nome+"' com valor padrão correto" : mensagem
              };
        }
      };
    },
    toHaveMaxlength: function () {
      return {
        compare: function (nome, tamanho) {
          var field = $(":input[name='"+nome+"']");
              result = { pass: field.attr("maxlength") == tamanho };
          result.message = (result.pass) ?
            "Campo com nome '"+nome+"' com tamanho máximo de '"+tamanho+"'." :
            "Campo com nome '"+nome+"' deveria ter tamanho máximo de '"+tamanho+"', mas possui tamanho máximo de '"+field.attr("maxlength")+"'."
          return result;
        }
      };
    },
    toHaveLabel: function () {
      return {
        compare: function (nome) {
          var fields = $(":input[name='"+nome+"']"),
          problemas = "";

          fields.each(function(inx, elem){
            var id = $(elem).attr("id"),
                label = $("label[for='"+id+"']"); 
            if(label.length == 0) {
              problemas += "Não foi encontrado o label correto do campo com nome '"+nome+"'" + (fields.length > 1 ? " da posição '"+(inx+1)+"'" : "") ;
            }
          });
          return {
            pass: !problemas ? true : false,
            message: !problemas ?
            "Campo com nome '"+nome+"' possui label corretamente" : problemas
          };
        }
      };
    },
    toHaveList: function () {
      return {
        compare: function (nome, opcoes) {
          var fields = $("input[name='"+nome+"']"),
              problemas = "";

          if(fields.length != opcoes.length){
            problemas += "Número de alternativas está errado, era esperado '"+opcoes.length+"' opções, mas existem '"+fields.length+"'."
          }

          for(var i = 0; i < opcoes.length; i++){
            var opcao = opcoes[i],
            item = $("input[name='"+nome+"'][value='"+opcao.value+"']");
            if(item.length === 0){
              problemas += "Não encontrado item com valor '"+opcao.value+"'. ";
            } else if($("label[for='"+item.attr("id")+"']").text() !== opcao.text){
              problemas += "Não encontrado label com texto '"+opcao.text+"' para o item com valor '"+opcao.value+"'. ";
            }
          }
          return {
            pass: problemas ? false : true,
            message: !problemas ? "Checkboxes com opções corretas." : "Problemas nas opções: "+problemas
          };
        }
      };
    },
    toHaveOptions: function () {
      return {
        compare: function (nome, opcoes) {
          var field = $("select[name='"+nome+"']"),
              $opcoes = field.find("option"),
              problemas = "";

          if($opcoes.length != opcoes.length){
            problemas += "Número de opções está errado, era esperado '"+opcoes.length+"' opções, mas existem '"+$opcoes.length+"'."
          }

          $opcoes.each(function(inx, elem){
            var opcao = opcoes[inx];
            if(typeof opcao === "string"){
              if(opcao !== $(elem).text()){
                problemas += "Era esperada a opção '"+opcao+"' na posição '"+(inx+1)+"', mas foi encontrada a opção '"+$(elem).text()+"'. ";
              } 
            } else {
              if(opcao.text !== $(elem).text() || opcao.value !== $(elem).val()){
                problemas += "Era esperada a opção com texto '"+opcao.text+"' e valor '"+opcao.value+"' na posição '"+(inx+1)+"', mas foi encontrada a opção com texto '"+$(elem).text()+"' e valor '"+$(elem).val()+"'. ";
              }
            }
          });
          return {
            pass: problemas ? false : true,
            message: !problemas ? "Select com opções corretas." : "Problemas nas opções do select: "+problemas
          };
        }
      };
    },
    toBeRequired: function () {
      return {
        compare: function (nome) {
          var field = $(":input[name='"+nome+"']");
              result = { pass: field.prop("required") };
          result.message = (result.pass) ?
            "Campo com '"+nome+"' é obrigatório" :
            "Campo com '"+nome+"' deveria ser obrigatório, mas não é.";
          return result;
        }
      };
    },
    toBeNotRequired: function () {
      return {
        compare: function (nome) {
          var field = $(":input[name='"+nome+"']");
              result = { pass: !field.prop("required") };
          result.message = (result.pass) ?
            "Campo com '"+nome+"' não é obrigatório" :
            "Campo com '"+nome+"' deveria ser não obrigatório, mas é.";
          return result;
        }
      };
    },
    toBeEmail: function () {
      return {
        compare: function (nome) {
          var field = $("input[name='"+nome+"']");
              result = { pass: field.attr("type") === "email" };
          result.message = (result.pass) ?
            "Campo com '"+nome+"' é do tipo e-mail" :
            "Campo com '"+nome+"' deveria receber apenas e-mails.";
          return result;
        }
      };
    },
    toBePassword: function () {
      return {
        compare: function (nome) {
          var field = $("input[name='"+nome+"']");
              result = { pass: field.attr("type") === "password" };
          result.message = (result.pass) ?
            "Campo com '"+nome+"' é do tipo password" :
            "Campo com '"+nome+"' deveria esconder a senha ao digitar.";
          return result;
        }
      };
    },
    toBeSelect: function () {
      return {
        compare: function (nome) {
          var field = $("select[name='"+nome+"']");
              result = { pass: field.length > 0 };
          result.message = (result.pass) ?
            "Campo com '"+nome+"' é do tipo select" :
            "Campo com '"+nome+"' deveria ser uma caixa de seleção de opções.";
          return result;
        }
      };
    },
    toBeTextarea: function () {
      return {
        compare: function (nome) {
          var field = $("textarea[name='"+nome+"']");
              result = { pass: field.length > 0 };
          result.message = (result.pass) ?
            "Campo com '"+nome+"' é do tipo textarea" :
            "Campo com '"+nome+"' deveria ser uma caixa de texto de múltiplas linhas.";
          return result;
        }
      };
    },
    toBeCheckbox: function () {
      return {
        compare: function (nome) {
          var field = $("input[name='"+nome+"']");
              result = { pass: field.attr("type") === "checkbox" };
          result.message = (result.pass) ?
            "Campo com '"+nome+"' é do tipo checkbox" :
            "Campo com '"+nome+"' deveria ser lista visível de seleção múltipla.";
          return result;
        }
      };
    },
    toBeRadio: function () {
      return {
        compare: function (nome) {
          var field = $("input[name='"+nome+"']");
              result = { pass: field.attr("type") === "radio" };
          result.message = (result.pass) ?
            "Campo com '"+nome+"' é do tipo radio" :
            "Campo com '"+nome+"' deveria ser lista visível de seleção única.";
          return result;
        }
      };
    },
    toBeDate: function () {
      return {
        compare: function (nome) {
          var field = $("input[name='"+nome+"']");
              result = { pass: field.attr("type") === "date" };
          result.message = (result.pass) ?
            "Campo com '"+nome+"' é do tipo date" :
            "Campo com '"+nome+"' deveria ser campo de data sem horas.";
          return result;
        }
      };
    },
    toBeNumber: function () {
      return {
        compare: function (nome) {
          var field = $("input[name='"+nome+"']");
              result = { pass: field.attr("type") === "number" };
          result.message = (result.pass) ?
            "Campo com '"+nome+"' é do tipo number" :
            "Campo com '"+nome+"' deveria ser campo com apenas números.";
          return result;
        }
      };
    },
    toBeText: function () {
      return {
        compare: function (nome) {
          var field = $("input[name='"+nome+"']");
              result = { pass: !field.attr("type") || field.attr("type")  === "text" };
          result.message = (result.pass) ?
            "Campo com '"+nome+"' é do tipo text" :
            "Campo com '"+nome+"' deveria ser campo de texto de uma linha.";
          return result;
        }
      };
    },
    toBeUrl: function () {
      return {
        compare: function (nome) {
          var field = $("input[name='"+nome+"']");
              result = { pass: field.attr("type") === "url" };
          result.message = (result.pass) ?
            "Campo com '"+nome+"' é do tipo url" :
            "Campo com '"+nome+"' deveria ser uma caixa que valida URLS válidas.";
          return result;
        }
      };
    }
  });
});
