$(".name-input").click(() => $(".invalid-name").hide());
$(".email-input").click(() => $(".invalid-email").hide());
$(".message-input").click(() => $(".invalid-message").hide());
$(".clear-btn").click(() => {
	$(".name-input").val("");
	$(".email-input").val("");
	$(".message-input").val("");
	$(".invalid-feedback").hide();
	$(".data-status").empty();
	$("input, .message-input").attr("disabled", null);
});

$(document).scroll(() => $(".navbar-collapse").removeClass("show"));


$('.xone-contact').submit(function (e) {

	e.preventDefault();

	var $form = $(this);
	var submitData = $form.serialize();
	var $email = $form.find('input[name="email"]');
	var $name = $form.find('input[name="name"]');
	var $message = $form.find('textarea[name="message"]');
	var $submit = $form.find('input[name="submit"]');
	var $dataStatus = $form.find('.data-status');

	var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	var nameRegex = /^[a-zA-Z\s]+$/;

	var formValidation = {
		name: false,
		email: false,
		message: false
	};
	if (!nameRegex.test($(".name-input").val().trim())) {
		$(".invalid-name").show();
	} else {
		$(".invalid-name").hide();
		formValidation.name = true;
	}

	if (!emailRegex.test($(".email-input").val().trim())) {
		$(".invalid-email").show();
	} else {
		$(".invalid-email").hide();
		formValidation.email = true;
	}

	if($(".message-input").val().trim() !== "") {
		$(".invalid-message").hide();
		formValidation.message = true;
	} else {
		$(".invalid-message").show();
	}

	if (!formValidation.name || !formValidation.email || !formValidation.message) {
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

