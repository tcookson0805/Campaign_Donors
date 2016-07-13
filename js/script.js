

$(document).ready(function(){
  
  $('select').material_select();
  
  var searchVal;
  var selection = $('.hero_select');
  var toggle = false;
  var searchVal;
  var firstName;
  var lastName;
  var fullName;
  var employer;
  var occupation;
  var city;
  var state;
  var campaign;
  var committeeID;
  var contributorID;
  var maxAmount;
  var minAmount;
  var maxDate;
  var minDate;
  
  $('body').on('change', '.hero_select', function(){

    var val = selection.children('option:selected').val();
    searchVal = selection.children('option:selected').val();
    
    if(!toggle){
      $('select').material_select('destroy');
      toggle = true
      
      var tempName = '.hero_input_' + val;
      console.log(tempName);
      var temp = $(tempName).clone();
  
      $('.hero_input').children().remove();
      $('.hero_input').append(temp);
      $('select').material_select();
    }else{
      toggle = false
    }    
     
  })
  
  $('body').on('click', '.hero_advanced', function(){
    $('select').material_select('destroy');
    searchVal = 'advanced';
    var clone = $('.hero_input_advanced').clone();
    
    $('.hero_input').children().remove();
    $('.hero_input').append(clone);
    $('select').material_select();
    
  })
  
  $('body').on('click', '.submit', function(e){
    e.preventDefault();
    firstName = $('#first_name').val();
    lastName = $('#last_name').val();
    employer = $('#employer').val() || undefined;
    occupation = $('#occupation').val() || undefined;
    city = $('#city').val() || undefined;
    state = $('#state').children('option:selected').val() || undefined;
    campaign = $('#campaign').find('option:selected').val() || undefined;
    committeeID = $('#committee_id').val() || undefined;
    contributorID = $('#contributor_id').val() || undefined;
    maxAmount = $('#max_amount').val() || undefined;
    minAmount = $('#min_amount').val() || undefined;
    maxDate = $('#max_date').val() || undefined;
    minDate = $('#min_date').val() || undefined;
    
    if(firstName && lastName){
      fullName = firstName + ' ' + lastName || undefined;
    }
    
    
    console.log(firstName);
    console.log(lastName);
    console.log(employer);
    console.log('city', city);
    console.log(state);
    console.log(fullName);
    console.log('campaign', campaign);
    // state = $('#first_name').val();
    // campaign = $('#first_name').val();
    
    var request = {
      two_year_transaction_period: '2016',
      api_key: 'DEMO_KEY',
      contributor_name: fullName,
      contributor_city: city,
      contributor_state: state,
      committee_id: campaign,
      min_amount: minAmount,
      max_amount: maxAmount,
      min_date: minDate,
      max_date: maxDate,
      committee_id: committeeID,
      contributor_id: contributorID,
      per_page: 100
    }
    
    $.ajax({
      url: 'https://api.open.fec.gov/v1/schedules/schedule_a',
      data: request,
      dataType: 'json',
      type: 'GET',
      beforeSend: function(jqXHR, settings){
        console.log(settings.url)
      }
    })
    .done(function(result){
      var arr = result.results
      var tableClass = '.results_table_' + searchVal
      var tableClassBody = tableClass + ' ' + 'tbody'
      var tableClassBodyRow = tableClassBody + ' ' + 'tr'
      var temp = $(tableClass).clone();
      $('.results').children().remove();
      $('.results').append(temp);
      
      console.log(arr)
      var lineTemp = $(tableClassBodyRow).clone()
      $('tbody').children().remove();
        
      for(var i = 0; i < arr.length; i ++){
        var data = lineTemp;
        data.children('.result_name').text(arr[i]['contributor_first_name'] + ' ' + arr[i]['contributor_last_name']);
        data.children('.result_city').text(arr[i]['contributor_city']);
        data.children('.result_state').text(arr[i]['contributor_state']);
        data.children('.result_employer').text(arr[i]['contributor_employer']);
        data.children('.result_occupation').text(arr[i]['contributor_occupation'])
        data.children('.result_campaign').text(arr[i]['committee']['name']);
        data.children('.result_amount').text(arr[i]['contribution_receipt_amount']);
        data.children('.result_date').text(arr[i]['contribution_receipt_date']);

        $(tableClassBody).append(data);
      }
      
    })
    
    
  })
  

  
})









// 'https://api.open.fec.gov/v1/schedules/schedule_a/?two_year_transaction_period=2016&api_key=WOkrttHIfjkVTaigmHawr8UQZ6Yl9uK8UGzybLH3&contributor_name=Michael%20Moroni&per_page=20#results/0'
// 'https://api.open.fec.gov/v1/schedules/schedule_a/?two_year_transaction_period=2016&api_key=WOkrttHIfjkVTaigmHawr8UQZ6Yl9uK8UGzybLH3&contributor_name=Michael+Moroni&contributor_city=&per_page=20








