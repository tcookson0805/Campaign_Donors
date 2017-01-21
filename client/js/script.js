

$(document).ready(function(){
  
  $('select').material_select();
  
  var searchVal;
  var selection = $('.search_select');
  var toggle = false;
  var searchVal = 'name';
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
  
  var monthsObj = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  }

  // $('body').on('click', '.btn', function() {
  //   $('.search_input').children().remove();
  //   var val = $(this).text();
  //   var tempName = '.search_input_' + val;
  //   var temp = $(tempName).clone();
  //   console.log(tempName)
  //   $('.search_input').append(temp);
  // })


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
    $('.search_input').children().remove();

    searchVal = 'advanced';
    var clone = $('.search_input_advanced').clone();
    
    $('.search_input').append(clone);
    $('select').material_select();
    
  });


  $('body').on('click', '.submit', function(e){
    e.preventDefault();
    console.log('clicked!!')
    $('.search').hide();
    $('.results').show()
    $('.results').children().remove();

    firstName = $('#first_name').val();
    lastName = $('#last_name').val();
    employer = $('#employer').val() || undefined;
    occupation = $('#occupation').val() || undefined;
    city = $('#city').val() || undefined;
    state = $('#state').children('option:selected').val() || undefined;
    committeeID = $('#committee_id').val() || undefined;
    contributorID = $('#contributor_id').val() || undefined;
    maxAmount = $('#max_amount').val() || undefined;
    minAmount = $('#min_amount').val() || undefined;
    maxDate = $('#max_date').val() || undefined;
    minDate = $('#min_date').val() || undefined;

    if(firstName && lastName) {
      fullName = firstName + ' ' + lastName || undefined;
    }

    var request = {
      two_year_transaction_period: '2016',
      api_key: 'Q5y4zhcvUdqviNQZQ7tBsXcighp2Zq9XYEoIoo3q',
      contributor_name: fullName,
      contributor_city: city,
      contributor_state: state,
      contributor_employer: employer,
      contributor_occupation: occupation,
      min_amount: minAmount,
      max_amount: maxAmount,
      min_date: minDate,
      max_date: maxDate,
      committee_id: committeeID,
      contributor_id: contributorID,
      per_page: 100
    }
    
    console.log('request', request)

    $.ajax({
      url: 'https://api.open.fec.gov/v1/schedules/schedule_a',
      data: request,
      dataType: 'json',
      type: 'GET',
      beforeSend: function(jqXHR, settings){
        console.log(settings)
      }
    })
    .done(function(result) {
      
      var data = result.results;
      
      if(!data.length) {

        var noResult = $('.no_result').clone();
        $('.results').append(noResult);
        $('.search_again').show();

      } else {
        $('.search_again').show();

        var table = $('.results_table').clone();
        $('.results').append(table);
        var tableRow = $('.results .results_table tbody > tr').clone();
        $('.results .results_table tbody').children().remove();
              
        for(var i = 0; i < data.length; i++) {
          
          var row = tableRow.clone();

          console.log(data[i]['contributor_employer'])

          var date = data[i]['contribution_receipt_date'].slice(0,10);
          var day = date.slice(8,10);
          var month = date.slice(5,7);
          var year = date.slice(0,4);
          var newDate = monthsObj[month] + ' ' + day + ', ' + year;

          var name = '<div class="result_name">' + data[i]['contributor_first_name'] + ' ' + data[i]['contributor_last_name'] + '</div>';
          var city = '<div class="result_city">' + data[i]['contributor_city'] + ', ' + data[i]['contributor_state'] + '</div>';

          row.children('.result_contributor').append(name);
          row.children('.result_contributor').append(city);

          // row.children('.result_name').text(data[i]['contributor_first_name'] + ' ' + data[i]['contributor_last_name']);
          // row.children('.result_city').text(city);
          row.children('.result_employer').text(data[i]['contributor_employer']);
          row.children('.result_occupation').text(data[i]['contributor_occupation'])
          row.children('.result_campaign').text(data[i]['committee']['name']);
          row.children('.result_amount').text('$ ' + data[i]['contribution_receipt_amount']);
          row.children('.result_date').text(newDate);
          $('.results .results_table tbody').append(row)
        
        }
      }
    })

  })


  
  // $('body').on('click', '.subm', function(e){
  //   e.preventDefault();
  //   console.log('hey')
  //   $(this).parents('.search').hide();

  //   $('.results').show();
  //   $('.search_again').show()
    
  //   firstName = $('#first_name').val();
  //   lastName = $('#last_name').val();
  //   employer = $('#employer').val() || undefined;
  //   occupation = $('#occupation').val() || undefined;
  //   city = $('#city').val() || undefined;
  //   state = $('#state').children('option:selected').val() || undefined;
  //   campaign = $('#campaign').find('option:selected').val() || undefined;
  //   console.log(campaign);
  //   committeeID = $('#committee_id').val() || undefined;
  //   contributorID = $('#contributor_id').val() || undefined;
  //   maxAmount = $('#max_amount').val() || undefined;
  //   minAmount = $('#min_amount').val() || undefined;
  //   maxDate = $('#max_date').val() || undefined;
  //   minDate = $('#min_date').val() || undefined;
    
  //   if(firstName && lastName){
  //     fullName = firstName + ' ' + lastName || undefined;
  //   }
    
    
  //   var request = {
  //     two_year_transaction_period: '2016',
  //     api_key: 'Q5y4zhcvUdqviNQZQ7tBsXcighp2Zq9XYEoIoo3q',
  //     contributor_name: fullName,
  //     contributor_city: city,
  //     contributor_state: state,
  //     committee_id: campaign,
  //     min_amount: minAmount,
  //     max_amount: maxAmount,
  //     min_date: minDate,
  //     max_date: maxDate,
  //     committee_id: committeeID,
  //     contributor_id: contributorID,
  //     per_page: 100
  //   }
    
    
  //   $.ajax({
  //     url: 'https://api.open.fec.gov/v1/schedules/schedule_a',
  //     data: request,
  //     dataType: 'json',
  //     type: 'GET',
  //     beforeSend: function(jqXHR, settings){
  //       console.log(settings.url)
  //     }
  //   })
  //   .done(function(result){
      
  //     console.log('result', result)
  //     var arr = result.results
      
  //     if(!arr.length){
  //       var noResult = $('.no_result').clone();
        
  //       $('.results').append(noResult);
        
  //     }else{
      
  //       var tableClass = '.results_table_' + searchVal
  //       var tableClassBody = tableClass + ' ' + 'tbody'
  //       console.log(tableClassBody)
  //       var tableClassBodyRow = tableClassBody + ' ' + 'tr'
  //       var temp = $(tableClass).clone();
      
  //       $('.results').append(temp);
  //       var lineTemp = $('.results tbody > tr').clone()
  //       $('.results tbody').children().remove();
  //       console.log(lineTemp)
  //       for(var i = arr.length-1; i >=0; i --){
  //         var data = lineTemp;
          
  //         var date = arr[i]['contribution_receipt_date']
  //         var newDate = date.slice(0, 10)
          
  //         data.children('.result_name').text(arr[i]['contributor_first_name'] + ' ' + arr[i]['contributor_last_name']);
  //         data.children('.result_city').text(arr[i]['contributor_city']);
  //         data.children('.result_state').text(arr[i]['contributor_state']);
  //         data.children('.result_employer').text(arr[i]['contributor_employer']);
  //         data.children('.result_occupation').text(arr[i]['contributor_occupation'])
  //         data.children('.result_campaign').text(arr[i]['committee']['name']);
  //         data.children('.result_amount').text('$ ' + arr[i]['contribution_receipt_amount']);
  //         data.children('.result_date').text(newDate);

  //         $(tableClassBody).append(data);
  //       }
  //     }
  //   })
    
    
  // });

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
    $('.results').children().remove()
    $('.results').hide()
    $('.search').show()
    

    $('label').removeClass('active')
    $('#first_name').val('');
    $('#last_name').val('');    
    $('#min_date').val('');  
    $('#max_date').val('');  
    $('#min_amount').val('');  
    $('#max_amount').val('');  
    $('#employer').val('');  
    $('#occupation').val('');  
    $('#committee_id').val('');  
    $('#contributor_id').val('');  
  
  })
  

  
})









// 'https://api.open.fec.gov/v1/schedules/schedule_a/?two_year_transaction_period=2016&api_key=WOkrttHIfjkVTaigmHawr8UQZ6Yl9uK8UGzybLH3&contributor_name=Michael%20Moroni&per_page=20#results/0'
// 'https://api.open.fec.gov/v1/schedules/schedule_a/?two_year_transaction_period=2016&api_key=WOkrttHIfjkVTaigmHawr8UQZ6Yl9uK8UGzybLH3&contributor_name=Michael+Moroni&contributor_city=&per_page=20








