	if (typeof APS === 'undefined') {
		APS = {};
	}
	

	/* XP.HEROAUTO namespace */
	APS.HERO = {
		
		pause : 5000,
		anim : 2000, 
		
		imageindex : 0,
		imagewidth : 930,
		imagecontainer : null,
		imagetotal : 5,
		
		refreshId : null,
		
		headingcontainer : null,
		headingindex : 5	,
		headingwidth : 380,
		headingtotal : 5,
		
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
												$this.imageslideleft();
												$this.headingslideright();
											}, this.pause);

				$("a.open").on("click", function (e){
					e.preventDefault();
					console.log($(this).parent().parent().next())
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
			
		 	if (this.headingindex == this.headingtotal){
				this.headingindex = this.headingtotal - 2;
			}
			else	if(this.headingindex > 0){
					this.headingindex--; 
			}
			else{
				this.headingindex = this.headingtotal - 1;
			}
			var margin = this.headingindex * this.headingwidth * -1;
			this.headingcontainer.animate({marginLeft: margin	},this.anim,function() {});
		}

	}//end APS	
