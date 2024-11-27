if (typeof APS === 'undefined') {
	APS = {};
}


/* XP.HEROAUTO namespace */
APS.HERO = {
  
  config : {
    
    	imagelist       : null,
		imagecontrols		: null,
		imageslider		  : null,
		imagetotal      : null,    
		imagewidth      : null,
    	index           : 0,
		diff						: 0,
		sliderlength		: null,
		firstpass				: true,
		animduration		: 750,
		heroindicator		: null,
		heroindex				: 0,
		headingslider 	: null,
		headingindex 		: null,
		headingwidth 		: null,
		headingtotal 		: null,
		headingpadding	: null,
		headingtotalwidth : null,
		headingelements	: null,
		headingside 		: 'left',
		headingcolor 		: 'green',
		bgfade 					: 250
    
  },
  
  init : function (){
	
		var s = this;
		var c = this.config;
	
		//update config once DOM is ready
		c.imagelist					= $("div.hero-image");
		c.imagecontrols	 		= $('div.hero-controls');
		c.imageslider 			= $('div.hero-slider').css({overflow : "hidden"});
		c.imagetotal				= $(c.imagelist).size();
		c.imagewidth				= $(c.imagelist[0]).find('img').width();
		c.sliderlength			= c.imagetotal * c.imagewidth;
		c.heroindicator			= $("div.hero-indicators ul");
		c.headingslider	 		= $('div.headline-content');
		c.headingelements		= $('div.headline-header');
		c.headingindex			= $('div.headline-header').size();
		c.headingtotal			= $('div.headline-header').size();
		c.headingwidth			= $('div.headline-header').width();
		c.headingpadding		= parseInt($('div.headline-header').css('padding-left'));
		c.headingtotalwidth	= c.headingwidth + c.headingpadding;
		c.headingreset			= false;
		
		
		//show our hero buttons and add event handlers		
		$(c.imagecontrols).css({display : "block"})
													.find("button")
													.on("click", function(){
														var direction = $(this).data("dir");
														if(direction === "next") {
															s.headingslideright();
														}else{
															s.headingslideleft();
														}  
													})
    
		//clone our slider images and add one to the left
		$(c.imageslider).find(":first")
										.clone()
										.prependTo(c.imageslider);				
		$(c.imageslider).css({'margin-left' : c.sliderlength * -1})
		
		//clone our headings
		$(c.headingslider).find(":first").clone().appendTo(c.headingslider);
		
		//set the width of the container
		c.headingtotalwidth = (c.headingwidth * c.headingtotal) + (c.headingtotal * c.headingpadding);
		
		//position our element
		var margin = (c.headingtotalwidth + c.headingtotalwidth - c.headingwidth )  * -1;
		$(c.headingslider).css({'width': c.headingtotalwidth * 2, 'marginLeft': margin})
		
		//add hero indicators
		var indicators = '';
		for (i = 0; i < c.imagetotal; i++){
				indicators += '<li></li>';
		}
		c.heroindicator.html(indicators)
										.find("li")
										.eq(0)
										.addClass('active')
		
		$("#hero").on("click", "div.hero-indicators li", function(e){
				var position = $(this).parent().find("li").index(this);
				if(position == c.index){
					
				}
				else if(position < c.index){
					c.diff = c.index - position;
					c.index = position;
					c.heroindex = position;
					s.headingslideleft();
				}else{
					c.diff = position - c.index;
					c.index = position;
					c.heroindex = position;
					s.headingslideright();
				}
		});
		
		//event listener for extra info slide drawers
		$("body").on("click", "a.open", function (e){
			e.preventDefault();
			$(this).parent().parent().siblings('.info.extra').slideToggle("slow");
		})

  },

	increaseIndicator : function (){
		c = this.config;
		
		c.heroindicator.find("li").eq(c.heroindex).removeClass("active");	
		
		(c.heroindex == c.imagetotal - 1) ?	c.heroindex = 0 : c.heroindex++;
		
		c.heroindicator.find("li").eq(c.heroindex).addClass("active");
	},
  
	decreaseIndicator : function (){
		c = this.config;

		c.heroindicator.find("li").eq(c.heroindex).removeClass("active");	
		
		(c.heroindex == 0) ?	c.heroindex = c.imagetotal -1 : c.heroindex--;
		
		c.heroindicator.find("li").eq(c.heroindex).addClass("active");
	},
	
  left : function (diff){

		var s = this;
		var c = this.config;
		
		var currentposition = parseInt(c.imageslider.css('margin-left'));
		
		//run this part if one of our indicators has been clicked
		if(c.diff != 0){
			
			//calculate what the current and end position will be
			var endposition = currentposition - (c.imagewidth * c.diff);
			
			//if end position is the last slide reposition to current slide in other set
			if(endposition ==  (c.sliderlength * -2) + c.imagewidth){
				$(c.imageslider).css({"margin-left" : currentposition + c.sliderlength });
			}
			
			//run animation
			c.imageslider.animate({'margin-left' : "-="+c.imagewidth * c.diff }, c.animduration, function(){console.log(c.imageslider.css('margin-left'))});
			
			//rest our flag
			c.diff = 0;
			
		}	
		
		else {
			
			if(currentposition ==  (c.sliderlength * -2) + (c.imagewidth * 2) ){
				$(c.imageslider).css({"margin-left" : currentposition + c.sliderlength });
			}			

			c.imageslider.animate({'margin-left' : "-="+c.imagewidth}, c.animduration);
		}		

		s.increaseIndicator();
  },
  
  right : function (){
	
		var s = this;
		var c = this.config;
		
		var currentposition = parseInt(c.imageslider.css('margin-left'));
		
		if(c.diff != 0){
			
			//calculate what the end position will be
			var endposition = currentposition + (c.imagewidth * c.diff);
			
			//if end position is the last slide reposition to current slide in other set
			if(endposition ==  0){
				$(c.imageslider).css({"margin-left" : currentposition - c.sliderlength });
			}
			
			//run animation
			c.imageslider.animate({'margin-left' : "+="+c.imagewidth * c.diff }, c.animduration);
			
			//reset our flag
			c.diff = 0;
		}	
		
		else {
			
			//if we are at the last but one slide	reposition to current slide in other set	
			if(currentposition == (c.imagewidth * -1)) {
				$(c.imageslider).css({"margin-left" : currentposition - c.sliderlength	 });
			}
		
			c.imageslider.animate({'margin-left' : "+="+c.imagewidth}, c.animduration)
		}
		
		s.decreaseIndicator();
		
  },

	headingslideleft : function (){
		
		var s = this;
		var c = this.config;

		
		if(c.headingindex < c.headingtotal){
				c.headingindex++; 
		}
		else{
			c.headingindex = 1;
			c.headingslider.css({marginLeft : ( (c.headingtotalwidth  - c.headingwidth) )  * -1})
		}
		
		var e = c.headingelements[c.headingtotal - c.headingindex];
		var newside = $(e).data('pos');
		var newcolor = $(e).data('bgcolor');
			
		if(c.headingside != newside){
			
			var offset = (newside == 'left') ? 0 : 590;
			
			$(".headline").animate({opacity : 0},{
					duration : c.bgfade,
					complete : function(){
						if(c.headingcolor != newcolor){
							$(this).removeClass(c.headingcolor).addClass(newcolor);
							c.headingcolor = newcolor;
						}
					}
			});
			
			$(".headline").animate({left: offset},{
																complete : function (){
																		c.headingslider.animate({'margin-left' : "-="+(c.headingwidth + c.headingpadding )}, c.animduration)
																		s.right();
																	}
															})
										.animate({opacity : 100},c.bgfade)
										
			c.headingside = newside;
			
		}
		else if (c.headingcolor != newcolor){
				$(".headline").animate({opacity : 0},{
						duration : c.bgfade,
						complete : function(){
								$(this).removeClass(c.headingcolor).addClass(newcolor);
								$(this).animate({opacity : 100},{
																								duration : c.bgfade, 
																								complete : function () {
																									s.right();
																									c.headingslider.animate({'margin-left' : "-="+(c.headingwidth + c.headingpadding )}, c.animduration)
																								}
																})
								c.headingcolor = newcolor;
						}
				});
		}	
		else{
			c.headingslider.animate({'margin-left' : "-="+(c.headingwidth + c.headingpadding )}, c.animduration)
			s.right();
		}
		
	},

	headingslideright : function (){
		
		var s = this;
		var c = this.config;	
		
		if(c.headingindex > 1){
				c.headingindex--; 
		}
		else{
			c.headingindex = c.headingtotal;
			c.headingslider.css({marginLeft : (c.headingtotalwidth  + c.headingpadding)  * -1})
		}
		
		var e = c.headingelements[c.imagetotal - c.headingindex];
		var newside = $(e).data('pos');
		var newcolor = $(e).data('bgcolor');
		
		if(c.headingside != newside){
			
			var offset = (newside == 'left') ? 0 : 590;
			
			$(".headline").animate({opacity : 0},{
					duration : c.bgfade,
					complete : function(){
						if(c.headingcolor != newcolor){
							$(this).removeClass(c.headingcolor).addClass(newcolor);
							c.headingcolor = newcolor;
						}
					}
			});
			
			$(".headline").animate({left: offset},{
																complete : function (){
																		s.left();
																		c.headingslider.animate({'margin-left' : "+="+(c.headingwidth + c.headingpadding )}, c.animduration)
																	}
															})
										.animate({opacity : 100},c.bgfade)
										
			c.headingside = newside;
			
		}
		else if (c.headingcolor != newcolor){
				$(".headline").animate({opacity : 0},{
						duration : c.bgfade,
						complete : function(){
								$(this).removeClass(c.headingcolor).addClass(newcolor);
								$(this).animate({opacity : 100},{
																								duration : c.bgfade, 
																								complete : function () {
																									s.left();
																									c.headingslider.animate({'margin-left' : "+="+(c.headingwidth + c.headingpadding )}, c.animduration)
																								}
																})
								c.headingcolor = newcolor;
						}
				});
		}
		else{
			s.left();
			c.headingslider.animate({'margin-left' : "+="+(c.headingwidth + c.headingpadding )}, c.animduration)
		}
		
	}
  
}// /XP.HEROAUTO