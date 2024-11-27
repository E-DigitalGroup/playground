	if (typeof APS === 'undefined') {
		APS = {};
	}
	

	/* XP.HEROAUTO namespace */
	APS.HERO = {
		
		pause : 5000,
		anim : 2000, 
		bgfade : 750,
		
		imageindex : 0,
		imagewidth : 930,
		imagecontainer : null,
		imagetotal : 4,
		
		refreshId : null,
		
		headingcontainer : null,
		headingelements : null,
		headingindex : 4	,
		headingwidth : 380,
		headingtotal : 4,
		headingside : 'left',
		headingcolor : 'green',
		
		init : function () {
			
			//position title box at far end as titles are floated right
			var pos = this.headingwidth * (this.headingindex -1) * -1;
			this.headingcontainer.css('marginLeft', pos);
			
			//set up scroll container's exact width
			var width = (this.headingwidth * this.headingtotal) ;
			$(".headline-content").css('width', width)

			var $this = this;
				
			$(".arrow-left").click(function(){
				$this.imageslideleft();
				$this.headingslideright();
				clearInterval(refreshId);
			});

			$(".arrow-right").click(function(){
				$this.imageslideright();
				$this.headingslideleft();
				clearInterval(refreshId);
			});
			
			refreshId	= setInterval(function(){
												$this.headingslideright();
											}, this.pause);

				$("a.open").on("click", function (e){
					e.preventDefault();
					$(this).parent().parent().siblings('.info.extra').slideToggle("slow");
				})							
		},
		
		imageslideleft : function (){					
			if(this.imageindex < this.imagetotal -1 ){
				this.imageindex++;
				var margin = this.imageindex * this.imagewidth * -1;
			}
			else{
				this.imageindex = 0;
				var margin = 0;
			}			
			this.imagecontainer.animate({	marginLeft: margin	},this.anim,function() {});
		},

		imageslideright : function (){
			if(this.imageindex > 0){
				this.imageindex--;
			}	
			else {
				this.imageindex = this.imagetotal - 1;
			}
			var margin = this.imageindex * this.imagewidth * -1;
			this.imagecontainer.animate({	marginLeft: margin	},this.anim,function() {});
		},
		
		headingslideleft : function (){
			this.headingindex++;					
			if(this.headingindex < this.headingtotal){
				var margin = this.headingindex * this.headingwidth * -1;
			}
			else{
				this.headingindex = 0;
				var margin = 0;
			}					
			this.headingcontainer.animate({marginLeft: margin},this.anim,function() {});
		},

		headingslideright : function (){
			
			var self = this;
			
		 	if (this.headingindex == this.headingtotal){
				this.headingindex = this.headingtotal - 2;
			}
			else	if(this.headingindex > 0){
					this.headingindex--; 
			}
			else{
				this.headingindex = this.headingtotal - 1;
			}
			
			var e = this.headingelements[this.headingindex];
			var newside = $(e).data('pos');
			var newcolor = $(e).data('bgcolor');
			
			if(this.headingside != newside){
				
				var offset = (newside == 'left') ? 0 : 590;
				
				$(".headline").animate({opacity : 0},{
						duration : self.bgfade,
						complete : function(){
							if(self.headingcolor != newcolor){
								$(".headline").removeClass(self.headingcolor).addClass(newcolor);
								self.headingcolor = newcolor;
							}
						}
				});
				
				$(".headline").animate({left: offset},{
																	complete : function (){
																			self.imageslideleft();
																			var margin = self.headingindex * self.headingwidth * -1;
																			self.headingcontainer.animate({marginLeft: margin	}, self.anim,function() {});
																		}
																})
											.animate({opacity : 100},3000)
											
				this.headingside = newside;
				
			}else{
				var margin = this.headingindex * this.headingwidth * -1;
				this.headingcontainer.animate({marginLeft: margin	},this.anim,function() {});
				this.imageslideleft();
			}
		}

	}//end APS	
