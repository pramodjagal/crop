//= require imageFactory.js
//= require common.js

var picInfo = null;
var originalCropAspectRatio = 0.666;
var displayBoxSize = 0;
var journalEngine = null;
var strJournalca = null;

function createjournalEngine() {
    journalEngine = new imageFactory(picInfo.imageJournal,
        picInfo.imageSource,
        picInfo.renderHostname,
        picInfo.hrWidth, picInfo.hrHeight, picInfo.lrWidth,
        picInfo.lrHeight, displayBoxSize);

    strJournalca = getCropJournal(picInfo.hrWidth, picInfo.hrHeight, originalCropAspectRatio,
        originalCropAspectRatio > 1 ? 0 : 1);


    console.log("getCropJournal(picInfo.hrWidth, picInfo.hrHeight, originalCropAspectRatio) = " +
        getCropJournal(picInfo.hrWidth, picInfo.hrHeight, originalCropAspectRatio));
    console.log("getCropJournal(picInfo.hrHeight, picInfo.hrWidth, originalCropAspectRatio) = " +
        getCropJournal(picInfo.hrHeight, picInfo.hrWidth, originalCropAspectRatio));
    console.log("getFinalJournal(journalEngine.getFinalJournal() + strJournalca) = " +
        getFinalJournal(journalEngine.getFinalJournal() + strJournalca))
}
function setUserImageSrc() {
    var SLASH = "/";
    displayBoxSize = 385;
    if (journalEngine == null) {
        createjournalEngine();
        var constrainedImageSize = journalEngine.getConstrainedImageSizeFromPictDimension();
        journalEngine.setOutputFit(50, constrainedImageSize[0], constrainedImageSize[1]);
    }
    var usrimage = "";
    if (CUtils.isEmpty(journalEngine.getCropArea())) {
        var _journal = getFinalJournal(journalEngine.getFinalJournal() + strJournalca);
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


    //Rotate image right
    $("#clockwise").click(function () {
        journalEngine.setRotation("cw");
        setUserImageSrc();
    });

    //Rotate Image to Left
    $("#counterclockwise").click(function () {
        journalEngine.setRotation("ccw");
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