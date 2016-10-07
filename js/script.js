

$(document).ready(function(){
  
  $('select').material_select();
  
  
  var searchVal;
  var selection = $('.search_select');
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
  

  $('body').on('change', '.search_select', function() {
    
    $('select').material_select('destroy');
    $('.search_input').children().remove();
    var val = selection.children('option:selected').val();
    searchVal = selection.children('option:selected').val();
    var tempName = '.search_input_' + val;
    var temp = $(tempName).clone();
    $('.search_input').append(temp);
    $('select').material_select();

  })
  
  // $('body').on('change', '.search_select', function(){

  //   var val = selection.children('option:selected').val();
  //   searchVal = selection.children('option:selected').val();
    
  //   if(!toggle){
  //     $('select').material_select('destroy');
  //     toggle = true
      
  //     var tempName = '.search_input_' + val;
  //     console.log(tempName);
  //     var temp = $(tempName).clone();
  
  //     $('.search_input').children().remove();
  //     $('.search_input').append(temp);
  //     $('select').material_select();
  //   }else{

  //     toggle = false
  //   }    
     
  // })
  

  
  $('body').on('click', '.search_advanced', function(){
    
    $('select').material_select('destroy');
    searchVal = 'advanced';
    var clone = $('.search_input_advanced').clone();
    
    $('.search_input').children().remove();
    $('.search_input').append(clone);
    $('select').material_select();
    
  });
  
  $('body').on('click', '.submit', function(e){
    e.preventDefault();
    
    $(this).parents('.search').hide();

    $('.results').show();
    $('.search_again').show()
    
    firstName = $('#first_name').val();
    lastName = $('#last_name').val();
    employer = $('#employer').val() || undefined;
    occupation = $('#occupation').val() || undefined;
    city = $('#city').val() || undefined;
    state = $('#state').children('option:selected').val() || undefined;
    campaign = $('#campaign').find('option:selected').val() || undefined;
    console.log(campaign);
    committeeID = $('#committee_id').val() || undefined;
    contributorID = $('#contributor_id').val() || undefined;
    maxAmount = $('#max_amount').val() || undefined;
    minAmount = $('#min_amount').val() || undefined;
    maxDate = $('#max_date').val() || undefined;
    minDate = $('#min_date').val() || undefined;
    
    if(firstName && lastName){
      fullName = firstName + ' ' + lastName || undefined;
    }
    
    
    // console.log(firstName);
    // console.log(lastName);
    // console.log(employer);
    // console.log('city', city);
    // console.log(state);
    // console.log(fullName);
    // console.log('campaign', campaign);
    // state = $('#first_name').val();
    // campaign = $('#first_name').val();
    
    console.log('102', campaign);
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
    
    console.log(request);
    
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
      
      if(!arr.length){
        var noResult = $('.no_result').clone();
        
        $('.results').append(noResult);
        
      }else{
      
        var tableClass = '.results_table_' + searchVal
        var tableClassBody = tableClass + ' ' + 'tbody'
        console.log(tableClassBody)
        var tableClassBodyRow = tableClassBody + ' ' + 'tr'
        var temp = $(tableClass).clone();
        // $('.results').children().remove();
        $('.results').append(temp);
        
        console.log(arr)
        var lineTemp = $(tableClassBodyRow).clone()
        $(tableClassBody).children().remove();
          
        for(var i = arr.length-1; i >=0; i --){
          var data = lineTemp;
          
          var date = arr[i]['contribution_receipt_date']
          var newDate = date.slice(0, 10)
          
          data.children('.result_name').text(arr[i]['contributor_first_name'] + ' ' + arr[i]['contributor_last_name']);
          data.children('.result_city').text(arr[i]['contributor_city']);
          data.children('.result_state').text(arr[i]['contributor_state']);
          data.children('.result_employer').text(arr[i]['contributor_employer']);
          data.children('.result_occupation').text(arr[i]['contributor_occupation'])
          data.children('.result_campaign').text(arr[i]['committee']['name']);
          data.children('.result_amount').text('$ ' + arr[i]['contribution_receipt_amount']);
          data.children('.result_date').text(newDate);

          // console.log('data', data)
          $(tableClassBody).append(data);
        }
      }
    })
    
    
  });

  $('body').on('click', '.search_again', function() {
    
    firstName = undefined
    lastName = undefined
    employer = undefined
    occupation = undefined
    city = undefined
    state = undefined
    campaign = undefined
    committeeID = undefined
    contributorID = undefined
    maxAmount = undefined
    minAmount = undefined
    maxDate = undefined
    minDate = undefined
    fullName = undefined
    
    
    
    $(this).hide();
    $('.search_input').children().remove();
    $('.results').children().remove()
    $('.results').hide()
    $('.search').show()
    
    
  })
  

  
})









// 'https://api.open.fec.gov/v1/schedules/schedule_a/?two_year_transaction_period=2016&api_key=WOkrttHIfjkVTaigmHawr8UQZ6Yl9uK8UGzybLH3&contributor_name=Michael%20Moroni&per_page=20#results/0'
// 'https://api.open.fec.gov/v1/schedules/schedule_a/?two_year_transaction_period=2016&api_key=WOkrttHIfjkVTaigmHawr8UQZ6Yl9uK8UGzybLH3&contributor_name=Michael+Moroni&contributor_city=&per_page=20








