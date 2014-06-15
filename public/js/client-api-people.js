$('#btnPostUser').on('click', function(e) {

 	e.preventDefault();

    var errorCount = 0;
    $('#postUser input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    console.log(errorCount);

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newuser_data = {

        	"uscid" : $("#postUser input#input-uscid").val(),
		    "facebookid" : $("#postUser input#input-facebookid").val(),
		    "cardid" : $("#postUser input#input-cardid").val(),

		    "name" : $("#postUser input#input-name").val(),
		    "dob" : $("#postUser input#input-dob").val(),
		    "gender" : $("#postUser input#input-gender").val(),
		    "email" : $("#postUser input#input-email").val(),
		    "phone" : $("#postUser input#input-phone").val(),

		    "program" : $("#postUser input#input-program").val(),
		    "year" : $("#postUser input#input-year").val(),

		    "status" : "1"
        }

        console.log(newuser_data);

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newuser_data,
            url: '/api/people',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#postUser fieldset input').val('');
				$("#postUserStatus").html('User data added.');

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                $("#postUserStatus").html(response.msg);

            }
        });

    } else {

        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }

});

$('#btnGetUser').on('click', function(e) {

 	e.preventDefault();

 	var usc_id = $('#putUser #input-uscid').val();

    if(usc_id === '') {

		alert('Please enter a USC ID');
    	return false;
    }

    // Use AJAX to post the object to our adduser service
    $.ajax({
        type: 'GET',
        url: '/api/people/' + usc_id,
        dataType: 'JSON'
    }).done(function( response ) {

    	$("#putUser input:not(#input-uscid)").val("");

        // Check for successful (blank) response
        if (response.length > 0) {

        	$("#putUser input#input-uscid").val(response[0].uscid);
		    $("#putUser input#input-facebookid").val(response[0].facebookid);
		    $("#putUser input#input-cardid").val(response[0].cardid);

		    $("#putUser input#input-name").val(response[0].name);
		    $("#putUser input#input-dob").val(response[0].dob);
		    $("#putUser input#input-gender").val(response[0].gender);
		    $("#putUser input#input-email").val(response[0].email);
		    $("#putUser input#input-phone").val(response[0].phone);

		    $("#putUser input#input-program").val(response[0].program);
		    $("#putUser input#input-year").val(response[0].year);

        }
        else {

            // If something goes wrong, alert the error message that our service returned
            $("#putUserStatus").html(response.msg);

        }
    });

});

$('#btnPutUser').on('click', function(e) {

 	e.preventDefault();

 	var usc_id = $('#putUser #input-uscid').val();

    var modifieduser_data = {

    	"uscid" : $("#putUser input#input-uscid").val(),
	    "facebookid" : $("#putUser input#input-facebookid").val(),
	    "cardid" : $("#putUser input#input-cardid").val(),

	    "name" : $("#putUser input#input-name").val(),
	    "dob" : $("#putUser input#input-dob").val(),
	    "gender" : $("#putUser input#input-gender").val(),
	    "email" : $("#putUser input#input-email").val(),
	    "phone" : $("#putUser input#input-phone").val(),

	    "program" : $("#putUser input#input-program").val(),
	    "year" : $("#putUser input#input-year").val(),

	    "status" : "1"
    }

    // Use AJAX to post the object to our adduser service
    $.ajax({
        type: 'PUT',
        data: modifieduser_data,
        url: '/api/people/' + usc_id,
        dataType: 'JSON'
    }).done(function( response ) {

        // Check for successful (blank) response
        if (response.msg === '') {

            // Clear the form inputs
            $('#putUser fieldset input').val('');
            $("#putUserStatus").html('User data edited.');

        }
        else {

            // If something goes wrong, alert the error message that our service returned
            $("#putUserStatus").html(response.msg);

        }
    });

});

$('#btnDeleteUser').on('click', function(e) {

	e.preventDefault();

	if( $('#deleteUser #input-uscid').val() === '' ) {

		alert('Please enter a USC ID');
    	return false;
    }

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this user?');

    // Check and make sure the user confirmed
    if (confirmation === true) {

        // If they did, do our delete
        $.ajax({
            type: 'DELETE',
            url: '/api/people/' + $("#deleteUser input#input-uscid").val()
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {

            	$('#deleteUser input').val('');
            	$("#deleteUserStatus").html('User data deleted.');
            }
            else {
                $("#deleteUserStatus").html(response.msg);
            }

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

});