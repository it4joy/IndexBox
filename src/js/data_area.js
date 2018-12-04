'use strict';

$('.custom-select-wrapper').bind('dynamicOptionsReady', function() {
  $( $(this).find('option') ).each(function(i, el) {
    if( !$(el).text() ) {
      $(el).remove();
    }
  });
});

function getProducts() {
  $.getJSON("src/js/data/products.json", function(data) {
    let items = [];

    $.each(data, function(i, val) {
      items.push('<option>' + val.name + '</option>');
    });

    $('.custom-select-wrapper').each(function(i, el) {
      let tag = $(el).data('tag');
      if(tag == 'products') {
        $(el).find('.select').html(items.join(""));
        $(el).trigger('dynamicOptionsReady');
      }
    });
  });
}

function getCountries() {
  $.getJSON("src/js/data/countries.json", function(data) {
    let items = [];

    $.each(data, function(i, val) {
      items.push('<option>' + val.name + '</option>');
    });

    $('.custom-select-wrapper').each(function(i, el) {
      let tag = $(el).data('tag');
      if(tag == 'countries') {
        //console.log(JSON.stringify(items)); // test
        $(el).find('.select').html(items.join(""));
        $(el).trigger('dynamicOptionsReady');
      }
    });
  });
}

function getFactors() {
  $.getJSON("src/js/data/factors.json", function(data) {
    let items = [];

    $.each(data, function(i, val) {
      items.push('<option>' + val.factor + '</option>');
    });

    $('.custom-select-wrapper').each(function(i, el) {
      let tag = $(el).data('tag');
      if(tag == 'factors') {
        $(el).find('.select').html(items.join(""));
        $(el).trigger('dynamicOptionsReady');
      }
    });
  });
}

$(document).ready(function() {
  
});

$(window).on('load', function() {
  getCountries();
  getFactors();
  getProducts();
});
