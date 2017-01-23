

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



  // changes the searchable form ( city or state )

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
  

  // changes the searchable form to advanced form

  $('body').on('click', '.search_advanced', function() {
    
    $('select').material_select('destroy');
    $('.search_input').children().remove();

    searchVal = 'advanced';
    var clone = $('.search_input_advanced').clone();
    
    $('.search_input').append(clone);
    $('select').material_select();
    
  });



  // handles submission of form (city, state, or advanced )

  $('body').on('click', '.submit', function(e){

    e.preventDefault();
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



  // resets search by removing results and form

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






