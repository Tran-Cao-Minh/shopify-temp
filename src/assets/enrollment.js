$(function () {
  $(document).on('click', '#enrollmentShipping', function () {
    if($(this).prop("checked") == true){
      $('.enrollment__shipping-address-form').addClass('hide');
    } else {
      $('.enrollment__shipping-address-form').removeClass('hide');
    }
  });

  $("select.required").on("select2:close", function (e) {  
    $(this).valid();
  });

  // Validate form
  // Customize Method validate NationalID
  $.validator.addMethod("nationalID", function (value, element) {
    if (value.length != 13) return false;
    // STEP 1 - get only first 12 digits
    for (i = 0, sum = 0; i < 12; i++) {
      // STEP 2 - multiply each digit with each index (reverse)
      // STEP 3 - sum multiply value together
      sum += parseInt(value.charAt(i)) * (13 - i);
    }
    // STEP 4 - mod sum with 11
    let mod = sum % 11;
    // STEP 5 - subtract 11 with mod, then mod 10 to get unit
    let check = (11 - mod) % 10;
    // STEP 6 - if check is match the digit 13th is correct
    if (check == parseInt(value.charAt(12))) {
      return true;
    }
  });

  $("#enrollment__form").validate({
    rules: {
      "enrollmentNationalID": {
				required: true,
				nationalID: true
			}
    }
  });
  // {
  //   errorClass: "myErrorClass",
  //   rules:{
  //     jungle: "required"
  //   },
  //   messages:{
  //     jungle: "select2 is required"
  //   }
  // }
});

