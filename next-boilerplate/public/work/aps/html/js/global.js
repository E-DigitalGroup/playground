if (typeof APS === 'undefined') {
	APS = {};
}


/* XP.HEROAUTO namespace */
APS = {
	
	init : function () {
		
		/*
		 * 	get the default values for our global form fields
		 */
		var self = this;
		var searchstring 		= $("#searchstring").val();
		var username	 		= $("#username").val();
		var password	 		= $("#password").val();
		var login_help_hide		= null;
		var login_help_delay	= 2000;

		/*
		 * Hard coded value for performance reasons
		 * total value of secondary dropdown width
		 */
		var dropdownwidth		= 500;
		var containerwidth		= 960;
		
		/*
		 * Clears input field on focus if value is default value
		 */
		$("#searchstring, #username, #password").on("focus", function (){
			if( $(this).val() == eval( $(this).attr("id") ) ){
				$(this).val('');
			}
		});
		
		/*
		 * Returns input value to default value if empty value
		 */
		$("#searchstring, #username, #password").on("focusout", function (){
			if($(this).val() == ""){
				$(this).val( eval( $(this).attr("id") ) );
			}
		});

		/*
		 * Shows remember me and lost password dialog box
		 */
		$("#username, #password").on("focusin", function (){
			$("#global-login form").addClass("help-mode");
			$("#login-help").show();
			clearTimeout(login_help_hide)
		});
		
		/*
		 * Hides remember me and lost password dialog box
		 */
		$("#username, #password").on("focusout", function (){
			login_help_hide = setTimeout( function () { 
														$("#global-login form").removeClass("help-mode");
														$("#login-help").hide() 
													}, login_help_delay );
		});

		/*
		 * Clear the timeout if the user clicks on the remember me checkbox
		 */
		$("#global-login form input[type=checkbox]").on("click", function (){
			clearTimeout(login_help_hide)
		});
		


		/*
		 * Secondary Drop Down Navigation
		 */

		var delay = 300;
		var dropdown_show = 0; //this holds our setTimeout reference so we can clear it
		var dropdown_hide = 0; //this holds our setTimeout reference so we can clear it
		var dropdown_hide_div = 0; //this holds our setTimeout reference so we can clear it
		var dropdown_open = 0; //this holds flag so we know if dropdown is open
		var original_element = 0;

		/**
		 Handles user interation on mouseover for top level navigation elements
		 Clears Timeout that would hide the dropdown if it is set
		 Overrides default CSS implementation of dropdown
		 Initialize our 0.5 second pause before opening dropdown
		 */
		$("#secondary-nav .dd-trigger > a").on("mouseover", function (){

			//hold our initial value
			if(!APS.init.original_element){
				APS.init.original_element = this;
			}
			
			else if (APS.init.original_element == this){
				clearTimeout(APS.init.dropdown_hide);
				clearTimeout(APS.init.dropdown_hide_div);
			}
			else{
				var e = $(APS.init.original_element).parent().find('> div');
				hideDropDown(e);
				APS.init.original_element = this;
			}
			//remove default CSS
			if(!APS.init.dropdown_open){
				var e = $(this).parent().find('> div');
				APS.init.dropdown_show = setTimeout(function () { showDropDown(e);}, delay);
				e.css('left', '-999em');
				$(this).parent().css({'background-color' : '#fff', 'color' : '#000'})		
			}
						
		});

		/**
		 Handle our navigation mouseout interaction for top level navigation elements
		 Clears our setTimeout call that would show dropdown after 0.5 seconds
		 */
		$("#secondary-nav .dd-trigger > a").on("mouseout", function (){

			clearTimeout(APS.init.dropdown_show);

			//only run this if the drop down is open
			if(APS.init.dropdown_open){
				var e = $(this).parent().find('> div');
				APS.init.dropdown_hide = setTimeout(function () { hideDropDown(e);	}, delay);	
			}
			
		});

		/**
		 Shows the relevant drop down 
		 Sets up flag so we know drop down is open
		 Adds highlight to level 1 list element
		 Adds event listeners for our now open dropdown
		 OnMouseOut event listener sets a Timeout to hide dropdown
		 OnMouseEnter event listener will clear that timeout if it is still active
		 Adds event listeners to show secondary content
		 @param e DOM element
		 @returns nothing
		 */
		function showDropDown (e){

			if(e.parent().hasClass('left-align')){
				
				var offset 		= e.parent().position();
				
				if(offset.left + dropdownwidth > containerwidth) {
					e.css( 'left', containerwidth - (offset.left + dropdownwidth) );		
				}
				else {
					e.css('left', '0');	
				}
			}else{
				e.css('left', '0');
			}
			
			APS.init.dropdown_open = true;
			e.closest('li').addClass('nav-highlight');

			$(e).on('mouseover', function () {
				clearTimeout(APS.init.dropdown_hide);
				clearTimeout(APS.init.dropdown_hide_div);
			})

			$(e).on('mouseout', function () {
				APS.init.dropdown_hide_div = setTimeout(function () { hideDropDown(e); }, delay);
			});
			

			var sub = e.find("li.parent");
			sub.on('mouseover', function (){
				showSecondaryContnent($(this).find('> div'))
			})
			sub.on('mouseout', function (){
				hideSecondaryContnent($(this).find('> div'))
			})

		};

		/**
		 Hide the relevant drop down 
		 Clear flag so we know drop down is closed
		 VERY IMPORTANT - REMVOE ATTACHED EVENT HANDLERS
		 Hide dropdown
		 Remove navigation highlight
		 @param e DOM element
		 @returns nothing
		 */
		function hideDropDown (e){

			APS.init.dropdown_open = false;

			$("div.level_1").off('mouseover');
			$("div.level_1").off('mouseout');

			e.css('left', '-999em');
			e.closest('li').removeClass('nav-highlight')

		};

		function showSecondaryContnent (e) {
			e.css('display', 'block')
		}

		function hideSecondaryContnent (e) {
			e.css('display', 'none')
		}

		/**
		* Slide drawer functionality
		*/
		$("a.open").on("click", function (e){
			e.preventDefault();
			$(this).parent().siblings().find('span').toggle();
			$(this).find('span').toggle();
			$(this).parent().parent().siblings('.info.extra').slideToggle("slow");
		})	
	},

	airConUpdate : function () {

		var tabs = new Array();

		$(".tab-nav a").each(function (index) {
			tabs.push($(this).data('tab'))
		});
		
		$(".tab-nav a").on('click', function (e){
			e.preventDefault();

			$(this).parent().siblings().removeClass('active');
			$(this).parent().addClass('active')
			
			$.each(tabs, function (index, value){
				console.log()	
				$("#"+value).addClass('hidden');	
			})
			var tab = $(this).data("tab")
			$("#"+tab).removeClass('hidden');
		})

		$(".youtube").colorbox({
								iframe:true, 
								innerWidth:560, 
								innerHeight:315,
								title : false
								});

		$(document).bind('cbox_complete', function(){
    			$("#cboxTitle").html('<div class="social-rss"><a href="#" title="Follow us on Facebook" class="facebook ir">facebook</a><a href="#" title="Follow us on Twitter" class="twitter ir">twitter</a><a href="#" title="Follow us on YouTube" class="youtube ir">rss</a><a href="#" title="Follow us on Flickr" class="flickr ir">rss</a></div>')
		});
		
	}
	
	
}
APS.init();