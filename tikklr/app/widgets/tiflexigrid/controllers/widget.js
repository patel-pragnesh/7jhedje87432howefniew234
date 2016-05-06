
exports.createGrid = function(args){
	var params = args || {};
	
	var columns = params.columns || 4;
	var space = params.space || 5;
	var data = params.data || {};
	var options = params.params || {};
	var layout = params.layout || 'gallery';
	var screenWidth = params.width || Ti.Platform.displayCaps.getPlatformWidth();
    if (OS_ANDROID) {
        screenWidth /= Ti.Platform.displayCaps.logicalDensityFactor;
    }
	var newWidth = screenWidth - space;
	var columnWidth = (newWidth / columns) - space;
	var frameBGcolor = options.backgroundColor || '#fff';
	
	//ADJUST THE SCROLLVIEW
	$.fgScrollView.left = space;
	$.fgScrollView.top = space;
	$.fgScrollView.right = -1;
	
	$.fgMain.backgroundColor = frameBGcolor;
	
	for (var x=0; x < data.length; x++){
		
		var frame = Ti.UI.createView({
			width:columnWidth,
			height:columnWidth,
			backgroundColor:options.gridColor || '#eee',
			top:0,
			left:0,
			right:space,
			bottom:space
		});
		
		var overlay = Ti.UI.createView({
			width:Ti.UI.FILL,
			height:Ti.UI.FILL,
			backgroundColor:'transparent',
			zIndex:1,
			strImage:data[x].image,
			categoryId: data[x].id,
			title: data[x].title,
		});
		
		var gridElement;
		
		//TYPE OF LAYOUT
		switch(layout){
			case('gallery'):
				gridElement = Widget.createController('gallery', {
					image:data[x].image,
					title:data[x].title.toUpperCase(),
					width:columnWidth,
					padding:options.padding || 10,
					showTitle:options.showTitle || false
				}).getView();
				overlay.addEventListener('click', function(e) {
					Ti.API.info("category clicked with ID: " + JSON.stringify(e.source));
					
					var args = {
						params: {"parameters[status]": 1, "parameters[type]": 'video', 'parameters[og_group_ref]': e.source.categoryId, "sort": "created", "direction":"DESC", "pagesize": 10 }
					};
					
					Ti.App.fireEvent('attachWindow', {'page': 'featured', 'arguments': args, 'headerTitle': e.source.title.toUpperCase()});
				});
				break;
			case('customView'):
				gridElement = data[x];
				break;
		}
				 
		frame.add(gridElement);
		frame.add(overlay);
		
		$.fgScrollView.add(frame);
	};
};

exports.openModal = function(url){
	var overlay = Ti.UI.createView({
		width:Ti.UI.FILL,
		height: Ti.UI.FILL,
		backgroundColor:'#000',
		opacity:0,
		zIndex:100
	});
	
	var topView = Ti.UI.createView({
		width:Ti.UI.FILL,
		height: Ti.UI.FILL,
		zIndex:1200,
		visible:false
	});
	
		var imgView = Ti.UI.createImageView({
			image: url,
			width:Ti.UI.SIZE,
			height: Ti.UI.SIZE
		});
	
	topView.add(imgView);
	$.fgMain.add(overlay);
		
	if (OS_IOS){
		//ANIMATION OF OVERLAY
		overlay.animate({opacity:0.7,duration:200});
		
		//ANIMATION FOR POP EFFECT
		var t = Titanium.UI.create2DMatrix();
		t = t.scale(0);
		var a = Titanium.UI.createAnimation();
		a.transform = t;
		a.duration = 200;
		
		$.fgMain.add(topView);
		topView.animate(a);
		
		a.addEventListener('complete', function(){
			topView.visible = true;
			var t2 = Titanium.UI.create2DMatrix();
			t2 = t2.scale(1.2);
			topView.animate({transform:t2, duration:200},function(e){
				var t4 = Titanium.UI.create2DMatrix();
				t4 = t4.scale(1.0);
				topView.animate({transform:t4, duration:200});
			});
		});
	}
	else{
		//ANIMATION OF OVERLAY
		overlay.animate({opacity:0.7,duration:200},function(e){
			topView.visible = true;
			$.fgMain.add(topView);
		});	
	}
	
	topView.addEventListener('click',function(e){
		if (OS_IOS){
			var t3 = Titanium.UI.create2DMatrix();
			t3 = t3.scale(1.2);
			var a2 = Titanium.UI.createAnimation();
			a2.transform = t3;
			a2.duration = 200;
			topView.animate(a2);
			
			a2.addEventListener('complete', function(){
				var t5 = Titanium.UI.create2DMatrix();
				t5 = t5.scale(0);
				topView.animate({transform:t5, duration:200},function(e){
					$.fgMain.remove(topView);
					overlay.animate({opacity:0,duration:200},function(e){
						$.fgMain.remove(overlay);
					});
				});
			});
		}
		else{
			$.fgMain.remove(topView);
			overlay.animate({opacity:0,duration:200},function(e){
				$.fgMain.remove(overlay);
			});
		}
	});
};

exports.clearGrid = function(){
	$.fgScrollView.removeAllChildren();
};
