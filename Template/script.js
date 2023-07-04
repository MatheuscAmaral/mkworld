function number_format(number, decimals, dec_point, thousands_sep) {

  number = (number + "").replace(/[^0-9+\-Ee.]/g, "");
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
    dec = typeof dec_point === "undefined" ? "." : dec_point,
    s = "",
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return "" + Math.round(n * k) / k;
    };

  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }

  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }

  return s.join(dec);
}


function pesquisar_linhas() {
  $("#produtos_api").html("");
  $.ajax({url:"https://diwserver.vps.webdock.cloud/products/search?query=" + $("#pesquisa_produto").val().toLowerCase() + "", type: "GET", success: function (data) {
      
      if (data.length > 0) {
        data.forEach((value) => {
          $("#produtos_api").append(
            `<div class="product-card col-lg-4">
               <div class="image-container">
                  <img title="Clique para ver as especificações deste produto." onclick="details_produtos('${value.id}')" style="width:40%" src="${value.image}" alt="" />
               </div>
                 <div class="details">
                    <h4>${value.title}</h4>
                    <div class="stars-row">
                        <span class="stars">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                        </span>
                        <span class="quantity"><img src="/Imagens/estrelas_de_avaliacao.png" width="21%>${value.rating.count}</span>
                    </div>
                    <div class="price-row">
                    <span class="price">R$ ${number_format(value.price, 2,",", ".")}</span>
                    </div>
                </div>
           </div>`
          );
        });
      } 
      else 
      {
        alert("Nenhum produto encontrado");
        get_dados_api();
      }
    },
  });
}

$("#procura_produto").on("click", () => {
  listar_categoria();
});


function listar_categoria() {
  $("#produtos_api").html("");
  $.ajax({
    url: "https://diwserver.vps.webdock.cloud/products/category/" + $("#categoria").val() + "", type: "GET", success: function (data) {
      if (data.products.length > 0) {
        data.products.forEach((value) => {
          $("#produtos_api").append(
            `<div class="product-card col-lg-4">
               <div class="image-container">
                   <img title="Clique para ver as especificações deste produto." onclick="details_produtos('${value.id}')" style="padding-top: 14%; width:40%" src="${value.image}" alt="" />
               </div>
               <div class="details">
                   <h4>${value.title}</h4>
                   <div class="stars-row">
                      <span class="stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                      </span>
                      <span class="quantity"><img src="/Imagens/estrelas_de_avaliacao.png" width="21%> ${value.rating.count} </span>
                    </div>
                    <div class="price-row">
                        <span class="price">R$ ${number_format(value.price,2,",",".")}</span>
                    </div>
               </div>
          </div>`
          );
        });
      } 
      else {
        window.alert("Nenhum produto encontrado");
        get_dados_api();
      }
    },
  });
}

function pegar_dados_api() {
  $("#produtos_api").html("");
  $.ajax({url: "https://diwserver.vps.webdock.cloud/products", type: "GET", success: function (data) {let i = 0; let br = ""; 
    data.products.forEach((value) => {
        if (i == 8) {
          br = "<hr>";
          i = 0;
        }
        $("#produtos_api").append(
          `<div class="product-card col-lg-4">
            <div class="image-container">
                <img title="Clique para ver as especificações deste produto." onclick="details_produtos('${value.id}')" style="padding-top: 14%; width:40%;"" src="${value.image}" alt="" />
            </div>
            <div class="details">
               <h4>${value.title}</h4>
               <div class="stars-row">
                    <span class="stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star-half-stroke"></i>
                    </span>
                    <span class="quantity"><img src="/Imagens/estrelas_de_avaliacao.png" width="21%">${value.rating.count} </span>
               </div>
               <div class="price-row">
                  <span class="price">
                      R$ ${number_format(value.price,2,",", ".")}
                  </span>
               </div>
            </div>
          </div>` + br
        );
        i++;
      });
    },
  });
}
pegar_dados_api();

function popula_select() {$.ajax({url: "https://diwserver.vps.webdock.cloud/products/categories", type: "GET",success: function (data) {
      data.forEach((value) => {
        $("#categoria").append(
          "<option value='" + value + "'>" + value + "</option>"
        );
      });
    },
  });
}
popula_select();


function details_produtos(id) {
  window.location.href = '../detalhes.html/detalhes.html?id=' + id;
}