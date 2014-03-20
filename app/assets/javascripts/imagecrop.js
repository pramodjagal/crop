//= require imageFactory.js
//= require ipadRotate.js
//= require jquery.Jcrop.js
//= require common.js

var picInfo = window.opener.picInfo;

var hiresHeight = picInfo.hrHeight;
var hiresWidth = picInfo.hrWidth;
var picHeightUB = picInfo.lrHeight;
var picWidthUB = picInfo.lrWidth;
var rotated = false;
var journal = picInfo.journal;
var isJournalNull = false;
var strJournalca = '';


var originalCropAspectRatio = window.opener.originalCropAspectRatio;
//var cropType = originalCropAspectRatio > 1 ?
if (journal == "") {
    strJournalca = getCropJournal(picWidthUB, picHeightUB, originalCropAspectRatio,
        originalCropAspectRatio > 1 ? 0 : 1);
    journal = "/" + getFinalJournal(journal + strJournalca);
}


var minResolutionArray = new Array(window.opener.prodWidth*1, window.opener.prodHeight*1); //toDo: this should be from min_resolution.properties

var journalEngine = window.opener.journalEngine;
var cropAspectRatio = originalCropAspectRatio;

if(journalEngine.getRotationCount() % 2 != 0) rotated = true;  //todo: need to change this - hack

var sMinSize = srcWidth = srcHeight = 50;
var defaultOrientation = null;


if (rotated) {
    srcWidth = journalEngine.getConstrainedImageSizeFromPictDimension()[1];
    srcHeight = journalEngine.getConstrainedImageSizeFromPictDimension()[0];
    hiresHeight = picInfo.hrWidth;
    hiresWidth = picInfo.hrHeight;
}
else {
    srcWidth = journalEngine.getConstrainedImageSizeFromPictDimension()[0];
    srcHeight = journalEngine.getConstrainedImageSizeFromPictDimension()[1];
}
journalEngine.setMinimumResolution(minResolutionArray[0], minResolutionArray[1]);
sMinSize = journalEngine.getMinCropFieldSize(hiresWidth, hiresHeight, srcWidth, srcHeight, true, 2);

if (sMinSize == null)
    sMinSize = Math.min(srcWidth, srcHeight);

var boxX1 = 0;
var boxY1 = 0;
var boxY2 = srcHeight;
var boxX2 = srcWidth;
var mainCropControl;


function loadMainAppControl() {
    mainCropControl = new cropControl("cropper1", "http://walgreens/default/images/crop", cropAspectRatio, minResolutionArray[0], minResolutionArray[1], journalEngine, true, 2);
}


function setInitialCrop(caAsAnArrayOfStrings) {
    if (!isJournalNull) {
        caAsAnArrayOfStrings = journalEngine.getCropArea().split(",",4);//create default journal for first time
    }
    if (caAsAnArrayOfStrings != null && caAsAnArrayOfStrings.length > 3) {
        boxY1 = srcHeight * caAsAnArrayOfStrings[0];
        boxX1 = srcWidth * caAsAnArrayOfStrings[1];
        /*to make x1 co-ordinate as 0( when the value is less than = 3) to avoid blank in leftside for default crop border*/
        if (boxX1 <= 3) {
            boxX1 = 0;
        }
        boxY2 = srcHeight * caAsAnArrayOfStrings[2];
        boxX2 = srcWidth * caAsAnArrayOfStrings[3];
    }
}

/* getting the min size array w.r.t to orientation*/
function getMinSizeArray(cropAspectRatio) {
    var minimumSizes = new Array();
    if (cropAspectRatio > 1)
        minimumSizes = [sMinSize * originalCropAspectRatio, sMinSize];
    else
        minimumSizes = [sMinSize, sMinSize * originalCropAspectRatio];
    return minimumSizes;
}
jQuery(function ($) {
    onLoadCrop(mainCropControl);
    mainCropControl.setCropAspect(cropAspectRatio, true, minResolutionArray[0], minResolutionArray[1]);
    setInitialCrop(mainCropControl.getCropArea());
    minSizes = originalMinSizes = getMinSizeArray(cropAspectRatio);
    var jcrop_api;
    $('#target').Jcrop({
        onChange: showCoords,
        onSelect: showCoords,
        setSelect: [boxX1, boxY1, boxX2, boxY2],
        aspectRatio: cropAspectRatio,
        trueSize: [srcWidth, srcHeight],
        minSize: [minSizes[0], minSizes[1]]
    }, function () {
        jcrop_api = this;
    });
    var __cropCA = "";
});

function showCoords(c)
{
    setImgSrc(c.y/srcHeight+","+c.x/srcWidth +","+c.y2/srcHeight+","+c.x2/srcWidth);
    cropMessage(c);

};

function cropMessage(c) {
    if (Math.floor(c.w) - 1 > minSizes[0])
        document.getElementById("resWarningCrop").style.display = "none";
    else
        document.getElementById("resWarningCrop").style.display = "block";
}

function setImgSrc(cropCA) {
    __cropCA = cropCA;
}


function doneEditing() {
    var cropArea = __cropCA.split(",");
    journalEngine.setCropArea(cropArea[0], cropArea[1], cropArea[2], cropArea[3], cropArea[4]);
    var finalJournal = journalEngine.getFinalJournal();
    window.opener.setUserImageSrc();
    window.close();
}
