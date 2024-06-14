$(function() {

    $('#contactCreateModalBtnSave').click(function(e) {
		e.preventDefault();
		$("#contactCreateModalBtnClear").prop("disabled", true);
		$("contactCreateModalBtnSave").prop("disabled", true);
		$('contactCreateModalSpinner').show();

//        var formData = new FormData();
//		formData.append('firstName', $('input[id=firstNameCreateInput]').val());
//		formData.append('lastName', $('input[id=lastNameCreateInput]').val());
//		formData.append('email', $('input[id=emailCreateInput]').val());
//        console.log(formData);

//        var formData = new FormData();
//		formData.append('firstName', $("#firstNameCreateInput").val());
//		formData.append('lastName', $("#lastNameCreateInput").val());
//		formData.append('email', $("#emailCreateInput").val());
//
//		// Display the key/value pairs
//        for (var pair of formData.entries()) {
//            console.log(pair[0]+ ', ' + pair[1] + ', ' + pair[2]);
//        }

		var formData = {
              firstName: $("#firstNameCreateInput").val(),
              lastName: $("#lastNameCreateInput").val(),
              phone: $("#phoneCreateInput").val()
            };

        console.log(JSON.stringify(formData));

        $.ajax({
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify(formData),
            contentType: "application/json",
            processData: false, // Setting processData to false lets you prevent jQuery from automatically transforming the data into a query string.
			url: '/contacts'
        })
        .done(function(response) { // done() – use when the request was successfull
            if(response.success == false) {
                output = "<span style='color: #f02d1f; font-size: 16px;'>" + response.data + "</span>";
            }else {
                output = "<span style='color: #22a131; font-size: 16px;'>" + response.data + "</span>";
            }
            $('#contactCreateModalSpinner').hide();
            $('#contactCreateModalResponse').html(output);
            $("#contactCreateModalBtnClear").prop("disabled", false);
            $("#contactCreateModalBtnSave").prop("disabled", false);
        })
        .fail (function(e) { // fail() – when the request was unsuccessfull
            $('#contactCreateModalSpinner').hide();
            $("#contactCreateModalResponse").html(e.responseText);
            $("#contactCreateModalBtnClear").prop("disabled", false);
            $("#contactCreateModalBtnSave").prop("disabled", false);
        });
    });

    $('#contactCreateModalBtnClear').click(function(e) {
        $('#contactCreateModalForm')[0].reset();
        $('#contactCreateModalResponse').html('');
        location.reload();
    });

});
