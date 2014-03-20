//= require imageFactory.js
//= require common.js

var picInfo = null;
var prodWidth = 20;
var prodHeight = 16;
var originalCropAspectRatio = (prodWidth/prodHeight).toFixed(3);
var displayBoxSize = 0;
var journalEngine = null;
var strJournalca = null;
var cropJournal ="";
var rotateCropJournal ="";

function createjournalEngine() {
    journalEngine = new imageFactory(picInfo.imageJournal,
        picInfo.imageSource,
        picInfo.renderHostname,
        picInfo.hrWidth, picInfo.hrHeight, picInfo.lrWidth,
        picInfo.lrHeight, displayBoxSize);

    strJournalca = getCropJournal(picInfo.hrWidth, picInfo.hrHeight, originalCropAspectRatio,
        originalCropAspectRatio > 1 ? 0 : 1);
    cropJournal = strJournalca;
    rotateCropJournal =  getCropJournal(picInfo.hrHeight, picInfo.hrWidth, originalCropAspectRatio,
        originalCropAspectRatio > 1 ? 0 : 1);

    console.log("cropJournal="+cropJournal);
    console.log("rotateCropJournal="+rotateCropJournal);

}
function setUserImageSrc() {

    var SLASH = "/";
    displayBoxSize = 585;
    if (journalEngine == null) {
        createjournalEngine();
        var constrainedImageSize = journalEngine.getConstrainedImageSizeFromPictDimension();
        journalEngine.setOutputFit(50, constrainedImageSize[0], constrainedImageSize[1]);
    }
    var usrimage = "";
    if (CUtils.isEmpty(journalEngine.getCropArea())) {
        var _journal = getFinalJournal(journalEngine.getFinalJournal() + strJournalca);
        var _cparea = strJournalca.split("=")[1].split(",");
        journalEngine.setCropArea(_cparea[0],_cparea[1],_cparea[2],_cparea[3]);
        picInfo.journal = _journal;
        usrimage = journalEngine.getImageURLOriginal() + _journal;
    } else {
        usrimage = journalEngine.getImageURLOriginal() + journalEngine.getFinalJournal();
        picInfo.journal = journalEngine.getFinalJournal();
    }
    $("#userImage").attr("src", usrimage);

}


$(function () {

    if (picInfo == null) {

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

    setUserImageSrc(displayBoxSize);

    $("div.tip").delay(2000).fadeOut(2000);


    $("#enhancecolor").click(function () {
        if(journalEngine.getAutoFix() == "ac") {
            journalEngine.setAutoFix("no");
        } else {
            journalEngine.setAutoFix("ac");
        }
        setUserImageSrc();
    });

    //Rotate image right
    $("#clockwise").click(function () {
        journalEngine.setRotation("cw");
        if(journalEngine.getRotationCount() % 2 > 0) {
            strJournalca = rotateCropJournal
        } else {
            strJournalca = cropJournal;
        }
        var _cparea = strJournalca.split("=")[1].split(",");
        journalEngine.setCropAreaNotNested(_cparea[0],_cparea[1],_cparea[2],_cparea[3]);
        setUserImageSrc();
    });

    //Rotate Image to Left
    $("#counterclockwise").click(function () {
        journalEngine.setRotation("ccw");
        if(journalEngine.getRotationCount() % 2 > 0) {
            strJournalca = rotateCropJournal;
        } else{
            strJournalca = cropJournal
        }
        var _cparea = strJournalca.split("=")[1].split(",");
        journalEngine.setCropAreaNotNested(_cparea[0],_cparea[1],_cparea[2],_cparea[3]);
        setUserImageSrc();
    });

    //Zoom out the image
    $("#zoomOutId").click(function () {
        alert("clicked zoomout");
    });

    //Zoom in the image
    $("#zoomInId").click(function () {
        alert("clicked zoomin");
    });


    $("#brightnessLow").click(function () {
        alert("clicked reduce brightness");


    });

    $("#brightnessUp").click(function () {
        alert("clicked increase brightness");

    });

    $("#cropimage").click(function () {

        window.open("/imagecrop/index");

    });

    //Toggle
    $("#test").click(function () {
        $("#EditSlider").toggle();
        $("#done").toggle();
        $("#tip").remove();
    });

    $("#done").click(function () {
        localStorage.setItem("picInfo", JSON.stringify(picInfo));
        $(location).attr('href', '/review/index');

    });

    function setPicInfo(data) {
        picInfo = data;
        $.ajaxSetup({
            async: true
        });
    }

});
