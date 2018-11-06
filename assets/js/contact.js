$(".name-input").click(() => $(".name-input + .invalid-feedback").hide());
$(".email-input").click(() => $(".email-input + .invalid-feedback").hide());
$(".clear-btn").click(() => {
	$(".name-input").val("");
	$(".email-input").val("");
	$(".message-input").val("");
	$(".invalid-feedback").hide();
	$(".data-status").empty();
	$("input, .message-input").attr("disabled", null);
});


$('.xone-contact').submit(function (e) {

	e.preventDefault();

	var $form = $(this);
	var submitData = $form.serialize();
	var $email = $form.find('input[name="email"]');
	var $name = $form.find('input[name="name"]');
	var $message = $form.find('textarea[name="message"]');
	var $submit = $form.find('input[name="submit"]');
	var $dataStatus = $form.find('.data-status');

	var emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	var nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

	var formValidation = {
		name: false,
		email: false
	};
	if (!nameRegex.test($(".name-input").val())) {
		$(".name-input + .invalid-feedback").show();
	} else {
		$(".name-input + .invalid-feedback").hide();
		formValidation.name = true;
	}

	if (!emailRegex.test($(".email-input").val())) {
		$(".email-input + .invalid-feedback").show();
	} else {
		$(".email-input + .invalid-feedback").hide();
		formValidation.email = true;
	}

	if (!formValidation.name || !formValidation.email) {
		return;
	} else {
		$email.attr('disabled', 'disabled');
		$name.attr('disabled', 'disabled');
		$message.attr('disabled', 'disabled');
		$submit.attr('disabled', 'disabled');

		$dataStatus.show().html('<div class="alert alert-info"><strong>Loading...</strong></div>');

		$.ajax({ // Send an offer process with AJAX
			type: 'POST',
			url: 'assets/php_mailer/mail_handler.php',
			data: submitData + '&action=add',
			dataType: 'html',
			success: function (result) {
				$email.val('').removeAttr('disabled');
				$name.val('').removeAttr('disabled');
				$message.val('').removeAttr('disabled');
				$submit.removeAttr('disabled');
				$dataStatus.html('<div class="alert alert-danger"><strong>Message Sent!</strong></div>').fadeIn();
			}
		});
	}

	return false;
});

