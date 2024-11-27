if (typeof APS === 'undefined') {
	APS = {};
}


/* XP.HEROAUTO namespace */
APS.HERO = {
  
  config : {
    
    imagecontainer  : null,
    imagelist       : null,
    index           : 0,
    width           : 930,
    marginleft      : 20,
    total           : 0,
    index           : 0,
		animduration		: 750,
		firstrun				: true
    
  },
  
  init : function (){
	
		var self = this;
		
    //set max # of images
    this.config.total = $(this.config.imagelist).size();
    
    /*
      hide extra images
      safety in case not hidden originally in markup
    */
    $.each(this.config.imagelist, function (key, value){
        if(key != 0) $(value).css('display', 'none')
    })
    
    /* show images either side of central one */
    $(this.config.imagelist[++this.config.index]).css({
                                                      'display' : 'block',
                                                      'left'    : this.config.width
                                                      });
    $(this.config.imagelist[this.config.total-1]).css({
                                                      'display' : 'block',
                                                      'left'    : (this.config.width - this.config.marginleft) * -1
                                                      });

		
		$("a.arrow-left").on("click", function (e){
			e.preventDefault();
			self.left();
		});
		
		$("a.arrow-right").on("click", function (e){
			e.preventDefault();
			self.right();
		})
    
  },

	showSlide : function (slide, pos){
		$(this.config.imagelist[slide]).css({
	                                       'display' : 'block',
	                                       'left'    : pos
	                                     	});
	},
	
	removeSlideRight : function (){
																					
		//if its the first animation we need to remove the last slide
		//otherwise it is the slide preceding current one
		if(this.config.firstrun) {
			this.config.firstrun = false;
			var remove = this.config.total-1;
		} 
		else if(this.config.index == 0) {
			var remove = this.config.total-3;
		} 
		else if(this.config.index == 1) {
			var remove = this.config.total-2;
		}
		else if(this.config.index == 2) {
			var remove = this.config.total-1;
		}
		else {
			var remove = this.config.index-3
		}
		$(this.config.imagelist[remove]).css({
		                                   	'display' : 'none',
																        'left'    : 0
																       })
	},
  
  left : function (){
	
		var self = this;
			
		// get left position value for last visible slide
		var x = parseInt($(this.config.imagelist[this.config.index]).css('left'));
		
		// add next slide to hero and make it visible
		this.showSlide(++this.config.index, this.config.width + x);	
		
		// if we reach the last slide reset our index
		if(this.config.index == this.config.total ){
			this.config.index = 0;
			this.showSlide(0, this.config.width + x);	
		}

		// animate hero
		// when animation finishes remove first slide at opposite end
    self.config.imagecontainer.animate({
																			'left' : '-='+ self.config.width
																			}, 
																			{
																				duration : self.config.animduration,
																				complete : function (){					
																					self.removeSlideRight();
																				}
																			});
		
	
  },
  
  right : function (){
	
		var self = this;
		
		// get left position value for last visible slide
		var x = parseInt($(this.config.imagecontainer).css('left'));


		if(this.config.index == 2){
			var show = 0;
		}
		else if(this.config.index == 1){
			var show = this.config.total - 1;
		}
		else if (this.config.index == 0){
			var show = this.config.total - 2;
		}
		else {
			var show = this.config.index - 3 
		}
		console.log(this.config.index)
		console.log (show)
		
		// add next slide to hero and make it visible
		this.showSlide(show, x - (this.config.width * 2) ) ;
		
		 self.config.imagecontainer.animate({
																				'left' : '+='+ self.config.width
																				}, 1000)
    this.config.index--;
  }
  
}// /XP.HEROAUTO