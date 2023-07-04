// detalhes.script.js
$(document).ready(function() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  
  get_product_details(productId);
  
  history.replaceState(null, '', window.location.pathname + '?id=' + productId);
  });
  
  function get_product_details(productId) {
  $.ajax({
  url: 'https://diwserver.vps.webdock.cloud/products/' + productId,
  type: 'GET',
  success: function(data) {
  $('#product-image').attr('src', data.image);
  $('#product-title').text(data.title);
  $('#product-description').text(data.description);
  $('#product-id').text('ID do produto: ' + productId);
  },
  error: function() {
  console.log('Erro ao obter detalhes do produto');
  }
  });
  }