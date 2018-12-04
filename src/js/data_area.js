'use strict';

$('.custom-select-wrapper').bind('dynamicOptionsReady', function() {
  $( $(this).find('option') ).each(function(i, el) {
    if( !$(el).text() ) {
      $(el).remove();
    }
  });
});

$('.control-switcher').bind('switcherDataReady', function(event, requiredUnitType, joinedArr, requiredControlWidth) {
  let unitType = $(this).data('unit-type');
  let controlWidth = requiredControlWidth * 12;
  if(unitType == requiredUnitType) {
    $(this).find('.data-items-wrapper').html(joinedArr);
    $(this).css('width', controlWidth + 'px'); // tmp
  }
});

//

function formUnits(unitsArr, val, unitType, strLength) {
  //console.log(val); // test (ok)
  $.each(val, function(key, val) {
    unitsArr.push("<span class='data-item'>" + key + "</span>");
    if(key.length > strLength) {
      strLength = key.length;
    }
  });
  //console.log(unitsItems.length); // test (ok)
  unitType = unitType.toLowerCase();
  $('.control-switcher').trigger( 'switcherDataReady', [unitType, unitsArr.join(''), strLength] );
}

//


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

// Units

function getUnits() {
  $.getJSON("src/js/data/units.json", function(data) {
    let strLength = 0;

    $.each(data, function(key, val) { // key!
      if(val.name == 'Volume') {
        let volumeUnitsArr = [];
        formUnits(volumeUnitsArr, val.json, 'Volume', strLength);
      } else if(val.name == 'Value') {
        let valueUnitsArr = [];
        formUnits(valueUnitsArr, val.json, 'Value', strLength);
      } else if(val.name == 'Price') {
        let priceUnitsArr = [];
        formUnits(priceUnitsArr, val.json, 'Price', strLength);
      } else if(val.name == 'Area') {
        let areaUnitsArr = [];
        formUnits(areaUnitsArr, val.json, 'Area', strLength);
      } else if(val.name == 'Livestock') {
        let livestockUnitsArr = [];
        formUnits(livestockUnitsArr, val.json, 'Livestock', strLength);
      } else if(val.name == 'Yield') {
        let yieldUnitsArr = [];
        formUnits(yieldUnitsArr, val.json, 'Yield', strLength);
      } else if(val.name == 'Per Capita') {
        let perCapitaUnitsArr = [];
        formUnits(perCapitaUnitsArr, val.json, 'Per Capita', strLength);
      } else {}
    });
  });
}

// switcher's carets functionality

$(document).on('switcherDataReady', function() {
  $('.top-data-item').on('click', function(e) {
    e.stopImmediatePropagation();
    $(this).parent().prev('.data-items-wrapper').animate({
      top: '+=40'
    }, 500);
  });

  $('.bottom-data-item').on('click', function(e) {
    e.stopImmediatePropagation();
    $(this).parent().prev('.data-items-wrapper').animate({
      top: '-=40'
    }, 500);
  });
});

//

$(document).ready(function() {
  $('.btn-sort').on('click', function() {
    $('.btn-sort').removeClass('active'); // think
    $(this).addClass('active');
  });
});

//

$(window).on('load', function() {
  getCountries();
  getFactors();
  getProducts();
  getUnits();

  // output of selected values
  $('.custom-select').change(function() {
    console.log( 'You selected: ' + $(this).val() );
  });

  // behaviour of icon `fa-angle` on the `custom-select`
  $('.custom-select').on('focus', function() {
    $(this).parent().addClass('unfolded');
  });
  $('.custom-select').on('blur', function() {
    $(this).parent().removeClass('unfolded');
  });
});
