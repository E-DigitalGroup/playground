if (typeof APS === 'undefined') {
	APS = {};
}


/* APS.RES namespace */
APS.RES = {

	/*
	 * Handles Registration Form
	 */

	initRegForm : function () {

		//add our custom stlying

		$("select, input[type=radio]").uniform();

		//would use AJAX to check for unique username
		//would display suggestions as a fallback
		$("a.check").on("click", function (e) {
			e.preventDefault();
			$("#name-options").show();
		});

		//if user selects a suggestion enters value into form field
		$("#name-options a").on("click", function (e) {
			e.preventDefault();
			var name = $(this).text();
			$("#username").val(name);
		});

		//add tool tip functionality
		$("#create-account input, #create-account .selector").on("focusin", function () {
			var name = $(this).attr('name');
			$("label.main[for="+name+"]").addClass('active');
			var fields = $("input, .selector").attr('name');
			$.each(fields, function (index) {
				$("div."+fields[index]).addClass('hidden');
			})
			$("div."+name).removeClass('hidden');
			var offset = $(this).offset();
			$("#form-tool-tip").css({ 
										position 	: "absolute", 
										left		: offset.left + 538,
										top  		: offset.top + 10,
										margin		: 0
									});
			
		});

		//remove tool tip functionality
		$("#create-account input, #create-account select").on("focusout", function () {
			var name = $(this).attr('name');
			$("div."+name).addClass('hidden');
			$("label[for="+name+"]").removeClass('active');
		});


		//validation routine
		//for portability messaging could be passed into this function
		$("#create-account").validate({
			rules: {
				username: {
					required: true,
					minlength: 6
				},
				password: {
					required: true,
					minlength: 6
				},
				passwordconfirm: {
					required: true,
					minlength: 6 ,
					equalTo: "#password"
				},
				email: {
					required: true,
					email: true
				},
				emailconfirm: {
					required: true,
					equalTo: "#email"
				},
				reminderquestion: "required",
				reminderanswer: "required",
				paperlessbilling : "required"
			},
			messages: {
				username: {
					required: "Please enter a username",
					minlength: "Your username must consist of at least 6 characters"
				},
				password: {
					required: "Please provide a password",
					minlength: "Your password must be at least 6 characters long"
				},
				passwordconfirm: {
					required: "Please provide a password",
					minlength: "Your password must be at least 6 characters long",
					equalTo: "Please enter the same password as above"
				},
				email: "Please enter a valid email address",
				emailconfirm : {
					required: "Please provide a valid email address",
					equalTo: "Please enter the same email as above"
				},
				reminderquestion: "Please select a question",
				reminderanswer: "Please provide an answer to the question selected above",
				paperlessbilling : "Please let us know if you want to participate in paperless billing"
			}
		});
	},

	initPayInPerson	: function () {

		/*
		 * 	get the default values for our form fields
		 */
		var self = this;
		var addressstring 		= $(".address").val();
		var zipstring	 		= $(".zip").val();

		
		/*
		 * Clears input field on focus if value is default value
		 */
		$(".zip").on("focus", function (){
			if( $(this).val() == zipstring ){
				$(this).val('');
			}
		});
		$(".address").on("focus", function (){
			if( $(this).val() == addressstring ){
				$(this).val('');
			}
		});

		/*
		 * Returns input value to default value if empty value
		 */
		 $(".address").on("focusout", function (){
			if($(this).val() == ""){
				$(this).val( addressstring );
			}
		});
		$(".zip").on("focusout", function (){
			if($(this).val() == ""){
				$(this).val( zipstring );
			}
		});

		//add tool tip functionality
		$("#address input").on("focusin", function () {
			var name = $(this).attr('name');
			
			var fields = $("#address input");
			console.log(fields)
			$.each(fields, function (index) {
				var names = $(fields[index]).attr('name');
				$("div."+names).addClass('hidden');
			})
			$("div."+name).removeClass('hidden');
			var offset = $(this).position();
			$("#form-tool-tip").css({ 
										left		: offset.left + 261,
										top  		: offset.top + 6,
									});
			
		});

		//remove tool tip functionality
		$("#create-account input, #create-account select").on("focusout", function () {
			var name = $(this).attr('name');
			$("div."+name).addClass('hidden');
		});

		/*
		 *	Custom Method extends Validation plugin
		 *  For usage see "address" rule below
		 */
		jQuery.validator.addMethod("notEqual", function(value, element, param) {
			return this.optional(element) || value !== param[0];
		}, "{1}");

		$("#address").validate({
			rules: {
				address: {
					required: true,
					notEqual: [addressstring, 'Please provide your address']
				},
				zip: {
					required: true,
					minlength: 5,
					notEqual: [zipstring,'Please provide your zip code']
				}
			},
			messages: {
				address: {
					required: "Please enter your address",
				},
				zip: {
					required: "Please provide your zip code",
					minlength: "Please enter at least 5 digits for your zip"
				}
			}
		});
	}
}