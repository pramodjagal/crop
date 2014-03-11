//= require imageFactory.js
//= require common.js

var picInfo = null;
var originalCropspectRatio = 1.5;
var displayBoxSize = 385;
var journalEngine = null;

function createjournalEngine() {
    journalEngine = new imageFactory(picInfo.imageJournal,
        picInfo.imageSource,
        picInfo.renderHostname,
        picInfo.hrWidth, picInfo.hrHeight, picInfo.lrWidth,
        picInfo.lrHeight, displayBoxSize);
}
function setUserImageSrc() {
    var SLASH = "/";
    if (journalEngine == null) {
        createjournalEngine();
        var constrainedImageSize = journalEngine.getConstrainedImageSizeFromPictDimension();
        journalEngine.setOutputFit(50,constrainedImageSize[0],constrainedImageSize[1]);
    }
    var usrimage = "";
    if (CUtils.isEmpty(journalEngine.getCropArea())) {
        var cr = "cr=" + originalCropspectRatio;
        usrimage = journalEngine.getImageURLOriginal() + cr + SLASH + journalEngine.getFinalJournal();
    } else {
        usrimage = journalEngine.getImageURLOriginal() +  journalEngine.getFinalJournal();
    }

    $("#userImage").attr("src", usrimage);
}


$(function(){

    if(picInfo == null) {

        $.ajaxSetup({
            async: false
        });

        $.getJSON('/assets/picinfo.json', function (data) {
            picInfo = data; //you'll find your json here
            setPicInfo(data);
        });

    }

    var journal = picInfo.imageJournal;
    var hiresHeight = picInfo.hrHeight;
    var hiresWidth = picInfo.hrWidth;
    var picHeightUB = picInfo.lrHeight;
    var picWidthUB = picInfo.lrWidth;
    originalCropspectRatio = 1.5;

    setUserImageSrc(displayBoxSize);

    $("div.tip").delay(2000).fadeOut(2000);


    //Rotate image right
    $("#clockwise").click(function(){
        journalEngine.setRotation("cw");
        setUserImageSrc();
    });

    //Rotate Image to Left
    $("#counterclockwise").click(function(){
        journalEngine.setRotation("ccw");
        setUserImageSrc();
    });

    //Zoom out the image
    $("#zoomOutId").click(function() {
        alert("clicked zoomout");
    });

    //Zoom in the image
    $("#zoomInId").click(function() {
        alert("clicked zoomin");
    });


    $("#brightnessLow").click(function(){
        alert("clicked reduce brightness");


    });

    $("#brightnessUp").click(function(){
        alert("clicked increase brightness");

    });

    $("#cropimage").click(function(){
        window.open("/imagecrop/index");

    });

    //Toggle
    $("#test").click(function(){
        $("#EditSlider").toggle( );
        $("#done").toggle( );
        $("#tip").remove();
    });

    function setPicInfo(data) {
        picInfo = data;
        $.ajaxSetup({
            async: true
        });
    }

});