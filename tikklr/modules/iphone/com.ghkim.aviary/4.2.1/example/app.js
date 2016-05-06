

var win = Ti.UI.createWindow({
	backgroundColor:'white'
});
var mainWindow = Ti.UI.createView({ height: 320, top:0, width: Ti.UI.FILL });
var iv = Titanium.UI.createImageView({ top:0, width: 320});

var aviary = require('com.ghkim.aviary');
var tools = ['kAFEffects', 'kAFOrientation', 'kAFBrightness', 'kAFContrast', 'kAFSharpness'];
var crops = ["Avatar", 400, 400, "Cover", 960, 260];

function setFilter() {
	Ti.API.log('setFilter() called');
	var img = mainWindow.toImage();
    // specify iOS 7 statusbar light content (see http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.iPhone.StatusBar and http://docs.appcelerator.com/titanium/latest/#!/api/Titanium.UI.iPhone-property-statusBarStyle)
    aviary.setStatusBarStyle(Ti.UI.iPhone.StatusBar.LIGHT_CONTENT);
    aviary.newImageEditor({apikey:'yourAviaryAPIkey', secret: 'yourAviarySecret', image: img, tools: tools});
    // or with custom crops:
    // aviary.newImageEditor({apikey:'yourAviaryAPIkey', secret: 'yourAviarySecret', image: img, tools: tools, crops: crops});
    aviary.displayEditor();
	Ti.API.log('well well well');
}

function selectPhoto() {

Titanium.Media.openPhotoGallery({

success:function(event)
{

    var cropRect = event.cropRect;
    var image = event.media;//blob object

    // set image view
    if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
    {
        
        if(cropRect) {
            
            imgStr=Ti.Utils.base64encode(image);// doesn't work because 'image' has to be a string!, but how?
            img_src = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'image.jpg');
            var img_src_height = Math.round(cropRect.height / (cropRect.width / 320));
            
            if(Ti.Platform.osname == 'android') {
                
                img = image;
                
            } else {
                img_src.write(image.imageAsResized(320, img_src_height));
                var image2 = Titanium.UI.createImageView({image:img_src.nativePath, width: 320 });
                img = image2.toImage();
            }
            
        } else {
            img = image;
        }
        
        //iv.backgroundImage = img;
        iv.image = img;
        //mainWindow.backgroundImage = img;
        //win.backgroundImage = img;
        mainWindow.add(iv);
        
    }
    else
    {

    }
},
allowEditing:true,
//popoverView:popoverView,
//arrowDirection:arrowDirection,
mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
});

}

aviary.addEventListener('avEditorFinished', function(ev){
        iv.image = ev.image;
    });

var startbutton = Ti.UI.createButton({ title: 'Select Photo...', bottom: 10, left: 10 });
var filterbutton = Ti.UI.createButton({ title: 'Filter...', bottom: 10, right: 10 });

win.add(mainWindow);

win.add(startbutton);
win.add(filterbutton);

startbutton.addEventListener('click',function(e) {
   selectPhoto();
});

filterbutton.addEventListener('click',function() {
	setFilter();
});

win.open();


