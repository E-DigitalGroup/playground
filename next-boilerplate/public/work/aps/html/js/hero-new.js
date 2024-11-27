if (typeof APS === 'undefined') {
	APS = {};
}


/* XP.HEROAUTO namespace */
APS.HERO = {
  
  	config : {
	    
	    image_slider    : null,
	    image_list      : null,
	    image_width     : null,
	    image_total     : null,
	    image_index     : null,
	    
	    title_slider    : null,
	    title_list      : null,
	    title_width     : null,
	    title_padding   : null,
	    title_index     : null,
	    
	    scroll_buttons  : null,
	    hero_indicator  : null,
	    hero_index		: 0,
	    indicator_pos   : false,
	        
	    heading_side 	: 'left',
		heading_color 	: 'green',
		bg_fade 		: 250,
	    anim_duration   : 750,
	    button_disabled	: false,
	    anim_pause		: 6000,
	    init_animation 	: null,
	    pause_button	: null,
	    paused 			: false

  	},
  
  	init : function (){
	
	  	var s = this;
	  	var c = this.config;
	  
	  	c.image_slider    	= $("div.hero-slider");
    	c.image_list      	= $("div.hero-image");
    	c.image_width     	= $(c.image_list[0]).width();
    	c.image_total     	= c.image_list.size(),
    	c.image_index     	= c.image_list.size();
    
    
	    c.title_slider    	= $("div.headline-content")
	    c.title_list      	= $("div.headline-header");
	    c.title_width     	= $(c.title_list[0]).width();
	    c.title_total     	= c.title_list.size();
	    c.title_index     	= c.title_list.size() -1;
	    c.title_padding		= parseInt($('div.headline-header').css('padding-left'));
	    
	    c.scroll_buttons  	= $("div.hero-controls");
	    c.hero_indicator	= $("div.hero-indicators ul");
		c.heading_side		= $(c.title_list[0]).data('pos');
		c.heading_color		= $(c.title_list[0]).data('bgcolor');
		c.pause_button		= $("div.hero-indicators .control")


	    //copy our images
	    var images = c.image_slider.html();
	    c.image_slider.append(images)
	    
	    //update position of slider to new center
	    var offset = c.image_total * c.image_width * -1
	    c.image_slider.css({"margin-left" : offset})
	    
	    //copy our titles
	    var titles = c.title_slider.html();
	    c.title_slider.append(titles)
	    
	    //set width of title container (required as elements are floated right)
	    var width = (c.title_width + c.title_padding) * (c.title_total * 2);
	    c.title_slider.css({"width" : width})
	    
	    //position title container to center
	    var offset = ( (c.title_total - 1) * (c.title_width + c.title_padding) + c.title_padding ) * -1
	    c.title_slider.css({"margin-left" : offset})
	      
	    //show our hero buttons and add event handlers		
		$(c.image_controls).css({display : "block"})
		$("button.arrow-left").on("click", function () {
											s.headingLeft();
											s.togglePauseButton();
										})
	    $("button.arrow-right").on("click", function () {
	    									s.headingRight();
	    									s.togglePauseButton();
	    								})
	   
	    //event handler for pause and play
		c.pause_button.on('click', function(){
			s.toggleHero();
		})

	    //add hero indicators
		var indicators = '';
		for (i = 0; i < c.image_total; i++){
				indicators += '<li></li>';
		}
		c.hero_indicator.html(indicators)
						.find("li")
						.eq(0)
						.addClass('active');
			
		//event handler for indicator links
		
		/*
	    $("#hero").on("click", "div.hero-indicators li", function(e){

	    	clearInterval(c.init_animation);
	    	
	    	var position = $(this).parent().find("li").index(this);
	      
	      	//this is the one exception to our equation
	      	if(c.image_index < c.image_total && position == c.image_total){
				position = c.image_total + 1;
			}
			
			//make adjustments if we are in the right set of the slides
			else if(c.image_index >= c.image_total){
	        	position += c.image_total;
	      	}
				
			//set our flag that indicators clicked and which direction animation needs to go
			c.indicator_pos = (c.image_index >= position) ? 'right' : 'left';
				
			//update our image index and title index to the new values
			c.title_index += c.image_index - position;
	      	c.image_index = position;
	      
	      	//call correct animation sequence
	      	(c.indicator_pos == 'left') ? s.headingLeft() : s.headingRight();

	    });
	    */

	    //start animation
	    c.init_animation = setInterval(function () { s.headingRight() }, c.anim_pause)
	},

	toggleHero : function (){
		var s = this;
		var c = this.config;
		c.pause_button.find('div').toggle();
		if(!c.paused ) {
			clearInterval(c.init_animation);
			c.paused = true;
		}else{
			s.headingRight()
			c.init_animation = setInterval(function () { s.headingRight() }, c.anim_pause);
			c.paused = false;
		}
	},

	togglePauseButton : function (){
		var c = this.config;

		if(!c.paused){
			c.paused = true;
			c.pause_button.find('div').toggle();
			clearInterval(c.init_animation);
		}		
		
		
	},

	increaseIndicator : function (){
	
		c = this.config;
		
		c.hero_indicator.find("li").eq(c.hero_index).removeClass("active");	

		(c.hero_index == c.image_total - 1) ?	c.hero_index = 0 : c.hero_index++;
		
		c.hero_indicator.find("li").eq(c.hero_index).addClass("active");
	},
  
	decreaseIndicator : function (){
	
		c = this.config;

		c.hero_indicator.find("li").eq(c.hero_index).removeClass("active");	
		
		(c.hero_index == 0)	?	c.hero_index = c.image_total -1 : c.hero_index--;
		
		c.hero_indicator.find("li").eq(c.hero_index).addClass("active");
	},
	
  	imageLeft : function (){
		
		var s = this;
		var c = this.config;
		  
		if(c.image_index == (c.image_total*2) - 2) {
		  	var offset = (c.image_width * c.image_total * -1) + (c.image_width * 2);
	      	c.image_slider.css({'margin-left' : offset})
	      	c.image_index = c.image_total-2;
		}
		 
		c.image_index++;
		var offset = c.image_width * c.image_index;
	    c.image_slider.animate({'margin-left' : -offset}, c.anim_duration);

  	},
  
  	imageRight : function (){
	  
		var s = this;
		var c = this.config;

	  	if(c.image_index == 1) {
	    	var offset = (c.image_width * c.image_total * -1) - c.image_width;
      		c.image_slider.css({'margin-left' : offset})
      		c.image_index = c.image_total+1;
	  	}

    	c.image_index--;
	  	var offset = c.image_width * c.image_index;
    	c.image_slider.animate({'margin-left' : -offset}, c.anim_duration);
	  
  	},

	headingLeft : function (){
		
		var s = this;
	  	var c = this.config;	
	 
	  	//change == to =>
	  	console.log(c.image_index)
	  	if(c.title_index == (c.title_total*2) - 2) {
	    	var width = c.title_width + c.title_padding;
	    	var offset =  ( width * c.title_total * -1) + (width * 2) - c.title_padding;
      		c.title_slider.css({'margin-left' : offset})
      		c.title_index = c.title_total-2;
	  	}

	  	c.title_index++;	


	  	var e = c.title_slider.find("div.headline-header").eq(c.image_index-1);
		var newside = $(e).data('pos');
		var newcolor = $(e).data('bgcolor');
		
		var offset = ( (c.title_width + c.title_padding) * c.title_index ) + c.title_padding;
	
		
		if(c.heading_side != newside){
			
			var xpos = (newside == 'left') ? 0 : 590;
			
			$(".headline").animate({opacity : 0},{
					duration : c.bg_fade,
					complete : function(){
						if(c.heading_color != newcolor){
							$(this).removeClass(c.heading_color).addClass(newcolor);
							c.heading_color = newcolor;
						}
					}
			});
			
			$(".headline").animate({left: xpos},{
												complete : function (){
													s.imageRight()
          											c.title_slider.animate({'margin-left' : -offset}, c.anim_duration)
												}
									}).animate({opacity : 100},c.bg_fade)
										
			c.heading_side = newside;
			
		}
		else if (c.heading_color != newcolor){
  			
  			$(".headline").animate(
  									{opacity : 0},
  									{duration : c.bg_fade,
										complete : function(){
											$(this).removeClass(c.heading_color).addClass(newcolor);
											$(this).animate({opacity : 100},
								  							{duration : c.bg_fade, 
																complete : function () {
																	s.imageRight()
																	c.title_slider.animate({'margin-left' : -offset}, c.anim_duration)
									  							}
								  							})
											c.heading_color = newcolor;
									}
								});
		}	
  		else{  
      		c.title_slider.animate({'margin-left' : -offset}, c.anim_duration);
      		s.imageRight()
  		}

  		s.decreaseIndicator();

	},

	headingRight : function (){

	  	var s = this;
	  	var c = this.config;	
	  
	  	//if the user clicked on the indicators rather than the arrows
	  	if(c.indicator_pos != false){
	  		console.log(c.indicator_pos) 
	  	}
	   

	  	if(c.title_index == 1) {
	    	var width = c.title_width + c.title_padding;
	    	var offset = ( ( width * c.title_total * -1) - width ) - c.title_padding;
      		c.title_slider.css({'margin-left' : offset})
      		c.title_index = c.title_total + 1;
	  	}
	  
	  	c.title_index--;
	  
	  	var offset = ( (c.title_width + c.title_padding) * c.title_index ) + c.title_padding;
	  	  
	  	var e = c.title_slider.find("div.headline-header").eq(c.image_index+1);
		var newside = $(e).data('pos');
		var newcolor = $(e).data('bgcolor');
		
		if(c.heading_side != newside){
			
			var xpos = (newside == 'left') ? 0 : 590;
			
			$(".headline").animate({opacity : 0},{
					duration : c.bg_fade,
					complete : function(){
						if(c.heading_color != newcolor){
							$(this).removeClass(c.heading_color).addClass(newcolor);
							c.heading_color = newcolor;
						}
					}
			});
			
			$(".headline").animate({left: xpos},
			                       {
			                       		complete : function (){
									    	c.title_slider.animate({'margin-left' : -offset}, c.anim_duration);
                              	  			s.imageLeft()
										}
									}).animate({opacity : 100},c.bg_fade)
										
			c.heading_side = newside;
			
		}
		else if (c.heading_color != newcolor){
				$(".headline").animate({opacity : 0},
										{ duration : c.bg_fade,
											complete : function(){
												$(this).removeClass(c.heading_color).addClass(newcolor);
												$(this).animate({opacity : 100},
								                				{
																	duration : c.bg_fade, 
																	complete : function () {
																		c.title_slider.animate({'margin-left' : -offset}, c.anim_duration);
                                	  									s.imageLeft()
																	}
																})
												c.heading_color = newcolor;
											}
										});
		}
		else{
			c.title_slider.animate({'margin-left' : -offset}, c.anim_duration);
  	  		s.imageLeft()
		}

		s.increaseIndicator();

	}
  
}// /XP.HEROAUTO