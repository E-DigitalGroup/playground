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
		sliderlength		: null,
		firstpass				: true,
		animduration		: 750,
		
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
	
		c.imagelist					= $("div.hero-image");
		c.imagecontrols	 		= $('div.hero-controls');
		c.imageslider 			= $('div.hero-slider').css({overflow : "hidden"});
		c.imagetotal				= $(c.imagelist).size();
		c.imagewidth				= $(c.imagelist[0]).find('img').width();
		c.sliderlength			= c.imagetotal * c.imagewidth;
		
		c.headingslider	 		= $('div.headline-content');
		c.headingelements		= $('div.headline-header');
		c.headingindex			= $('div.headline-header').size();
		c.headingtotal			= $('div.headline-header').size();
		c.headingwidth			= $('div.headline-header').width();
		c.headingpadding		= parseInt($('div.headline-header').css('padding-left'));
		c.headingtotalwidth	= c.headingwidth + c.headingpadding;
		c.headingreset			= false;
				
		$(c.imagecontrols).css({display : "block"})
													.find("button")
													.on("click", function(){
														var direction = $(this).data("dir");
														if(direction === "next") {
															s.headingslideleft();
														}else{
															s.headingslideright();
														}  
													})
    
		//clone our slider and add one to the left
		$(c.imageslider).find(":first").clone().prependTo(c.imageslider);
		c.imageslider.css({'margin-left' : c.sliderlength * -1})
		
		//set up scroll container's exact width and position
		$(c.headingslider).find(":first").clone().appendTo(c.headingslider);
		
		
		c.headingtotalwidth = (c.headingwidth * c.headingtotal) + (c.headingtotal * c.headingpadding) ;
		var margin = (c.headingtotalwidth + c.headingtotalwidth - c.headingwidth )  * -1;
		$(c.headingslider).css({'width': c.headingtotalwidth * 2, 'marginLeft': margin})
  },
  
  left : function (){
	
		var s = this;
		var c = this.config;
		
		//on the first full run the slider position needs to be reset one frame early
		if(c.firstpass == true && c.index == c.imagetotal -2){
			var first = $(c.imageslider).css({"margin-left" : (c.sliderlength * -1) + (c.imagewidth * 2)});
			c.firstpass = false;
			c.headingreset = true;
			c.index = 0;
		}
		else if(c.index == c.imagetotal -1) {
			var first = $(c.imageslider).css({"margin-left" : (c.sliderlength * -1) + (c.imagewidth * 2)});
			c.index = 0;
		}
		else{
			c.index++;
		}			
				
		c.imageslider.animate({'margin-left' : "-="+c.imagewidth}, c.animduration)
	
		
  },
  
  right : function (){
	
		var s = this;
		var c = this.config;
		
		if(c.index < (c.imagetotal * -1) + 2) {
			var first = $(c.imageslider).css({"margin-left" : (c.sliderlength + c.imagewidth) * -1	 });
			c.index = 0;
		}
		else{
			c.index--;
		}
		
		c.imageslider.animate({'margin-left' : "+="+c.imagewidth}, c.animduration)
	
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