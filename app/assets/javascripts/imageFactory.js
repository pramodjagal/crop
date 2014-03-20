/* imageFactory is the JS API responsible for parsing, passing, and handling the edit journal contained by CPictureInfo
   and ultimately any and all other image editing or data manipulation operations. All three arguments of the constructor
   are required and cannot be null i.e. ...

   imageFactory(CPictureInfo.getInitialJournal(int layer), CPictureInfo.getImageSource(false), CPictureInfo.getRenderHostname())

   One imageFactory will exist per image. The edit layer is determined on initialization by the layer that the image source belongs to.
   i.e. if image source is passed as /is3=@$QWGAGQA$TWASDVA... then the layer of this image is set to 3.
*/

var CROPORIENTATION_LANDSCAPE = 0;
var CROPORIENTATION_PORTRAIT = 1;
var CROPORIENTATION_DYNAMIC = 2 ;
            

function imageFactory(sJournal, sImageSrc, sRendererURL, hiresWidth, hiresHeight, picWidthUB, picHeightUB, displayBoxSize)
{
    this.types = new Array();
    this.types[this.types.length] = this.CROP           = "ca";
    this.types[this.types.length] = this.ROTATION       = "rf";
    this.types[this.types.length] = this.SCALE_FACTOR   = "sf";
    this.types[this.types.length] = this.IMAGE_SOURCE   = "is";
    this.types[this.types.length] = this.BG_COLOR       = "bg";
    this.types[this.types.length] = this.ERROR_POLICY   = "er";
    this.types[this.types.length] = this.OUTPUT_TYPE    = "ot";
    this.types[this.types.length] = this.OUTPUT_FIT     = "of";
    this.types[this.types.length] = this.METADATA       = "mt";
    this.types[this.types.length] = this.AUTO_FIX       = "af";
    this.types[this.types.length] = this.COLOR_CORRECT  = "cc";
    this.types[this.types.length] = this.RED_EYE        = "ry";
    this.types[this.types.length] = this.FILL_FLASH     = "ff";
    this.types[this.types.length] = this.BRIGHTNESS     = "bc";
    this.types[this.types.length] = this.OPACITY        = "op";
    this.types[this.types.length] = this.EXCLUSION      = "xx";
    this.types[this.types.length] = this.BORDER         = "bd";

    this.journal = sJournal;
    this.renderHost = sRendererURL;
    this.newJournal = new String();
    this.imageSource = sImageSrc;
    this.layer = "";
    this.forceCropOrientation = CROPORIENTATION_DYNAMIC ; //dynamic

    //Added by Vijay (needs to be reviewed by Yuri
    this.hiresWidth = hiresWidth;
    this.hiresHeight = hiresHeight;
    this.picWidthUB = picWidthUB;
    this.picHeightUB = picHeightUB;
    this.displayBoxSize = displayBoxSize;
    this.resizedImageDimensions = null ;

    if( this.hiresWidth > this.hiresHeight ) //landscape picture
    {
        this.MIN_RES_WIDTH = 640 ;
        this.MIN_RES_HEIGHT = 426 ;
    }else
    {
        this.MIN_RES_WIDTH = 426 ;
        this.MIN_RES_HEIGHT = 640 ;
    }

    if( this.hiresWidth && this.hiresHeight && this.picWidthUB
        && this.picHeightUB && this.displayBoxSize )
    {
        this.setConstrainedImageSizeFromPictDimension() ;
    }
    //end of Vijay's code


    /** we'll use this once we get the layers portion of the API worked out **/
    //this.imageSource = sImageSrc.split("=", 2)[1];
    //this.layer = sImageSrc.split("=", 2)[0].replace(/\//g, "") != this.IMAGE_SOURCE ? sImageSrc.split("=", 2)[0].replace(/\//g, "").slice(this.IMAGE_SOURCE.length) : new String();
}


imageFactory.prototype.setForceCropOrientation = function(forceCropOrientation)
{
    this.forceCropOrientation = forceCropOrientation ;
}


imageFactory.prototype.setMinimumResolution = function(minResWidth, minResHeight)
{
    var isRotated = this.isRotated() ;
    if(this.hiresWidth >= this.hiresHeight  && !isRotated)     //landscape picture
    {
        this.MIN_RES_WIDTH = Math.max(minResWidth, minResHeight) ;
        this.MIN_RES_HEIGHT = Math.min(minResWidth, minResHeight) ;
    }else if(this.hiresWidth < this.hiresHeight  && isRotated)     //landscape picture
    {
        this.MIN_RES_WIDTH = Math.max(minResWidth, minResHeight) ;
        this.MIN_RES_HEIGHT = Math.min(minResWidth, minResHeight) ;
    }else if(this.hiresWidth < this.hiresHeight  && !isRotated)  //portrait picture
    {
        this.MIN_RES_WIDTH = Math.min(minResWidth, minResHeight) ;
        this.MIN_RES_HEIGHT = Math.max(minResWidth, minResHeight) ;
    }else if (this.hiresWidth >= this.hiresHeight  && isRotated) //portrait picture
    {
        this.MIN_RES_WIDTH = Math.min(minResWidth, minResHeight) ;
        this.MIN_RES_HEIGHT = Math.max(minResWidth, minResHeight) ;
    }

    if(this.forceCropOrientation == CROPORIENTATION_LANDSCAPE)
    {
        this.MIN_RES_WIDTH = Math.max(minResWidth, minResHeight) ;
        this.MIN_RES_HEIGHT = Math.min(minResWidth, minResHeight) ;
    }
    else if(this.forceCropOrientation == CROPORIENTATION_PORTRAIT)
    {
        this.MIN_RES_WIDTH = Math.min(minResWidth, minResHeight) ;
        this.MIN_RES_HEIGHT = Math.max(minResWidth, minResHeight) ;
    }

    //alert("minRes : (" + this.MIN_RES_WIDTH + ", "  + this.MIN_RES_HEIGHT + ")");
}


imageFactory.prototype.isRotated = function()
{
    if( ( this.getRotationCount(this.getInitialJournal()) % 2) != 0 ) //rotated
        return true ; //rotated
    else
        return false ; //not rotated
}


imageFactory.prototype.getFullJournal = function()
{
    return (this.journal + this.newJournal);
}
imageFactory.prototype.getNewJournal = function(journalValue)
{  
    return journalValue+"//"+this.newJournal;
}
imageFactory.prototype.getInitialJournal = function()
{
    return this.journal;
}

imageFactory.prototype.getCurrentJournal = function()
{
    return this.newJournal;
}

imageFactory.prototype.getFinalJournal = function()
{
    var finalJournal = "" ;
    var pairs = new Array() ;
    var keys = new Array() ;
    var ca = null ;
    var rf = null ;
    var of = null ;
    var angle = 0 ;

    var ROTATION_JOURNALS = new Array() ;
    ROTATION_JOURNALS['cw'] = 270 ;
    ROTATION_JOURNALS['ccw'] = 90 ;
    ROTATION_JOURNALS['ud'] = 180 ;
    var flipHorizontal = null ;
    var flipVertical = null ; //  This is added to enable throughh old 'crop' option which image is flipped vertical with new flex 'edit-crop' option.

    var journal = this.getFullJournal() ;
    var journalKeyValuePairs = journal.split("/") ;

    for(var i=0; i<journalKeyValuePairs.length; i++)
    {
        var pair =  journalKeyValuePairs[i].split("=") ;
        if( pair.length == 2 )
        {
            if( pair[0] == "rf" )
            { 
                if( pair[1] == "fh" ){
                    flipHorizontal = "fh" ;
                }else if( pair[1] == "fv" ){
                    flipVertical = "fv" ;
                }else {
                    if( flipHorizontal != null )
                        angle += 180 ; //there is flip so add 180 degrees
                    if(!isNaN(pair[1]))  {
                        angle = parseInt(angle) + parseInt(pair[1]) +180}  //  This is added to enable throughh old 'crop' option which image is rotated with new flex 'edit-crop' option.
                    else angle += ROTATION_JOURNALS[pair[1]]  ;
                }
            }
            else if( pair[0] == "ca" )
            {
                ca = pair[1] ;
            }
            else if( pair[0] == "of" )
            {
                of = pair[1] ;
            }
            else
            {
                keys[keys.length] = pair[0] ;
                pairs[pair[0]] = pair[1] ;
            }
        }
    }

    angle = angle % 360 ;
    if( angle == 90 ) rf = "ccw" ;
    if( angle == 180 ) rf = "ud" ;
    if( angle == 270 ) rf = "cw" ;
    for(var i=0; i<keys.length; i++){
        finalJournal += "/" + keys[i] + "=" + pairs[keys[i]] ;
    }

    var fh = null ;
    if(flipHorizontal != null){
        fh = "fh" ;
    }
    var fv = null ;
    if(flipVertical != null){
        fv = "fv" ;
    }
    if( ca != null )
    {
        ca = shift(ca, rf, fh);
        finalJournal = finalJournal + "/ca=no/ca=" + ca ;
    }

    if( rf != null ){
        finalJournal = finalJournal + "/rf=" + rf ;
    }

    if( flipHorizontal != null ){
        finalJournal = finalJournal + "/rf=" + flipHorizontal ;
    }
    if( flipVertical != null ){
        finalJournal = finalJournal + "/rf=" + flipVertical ;
    }
    if( of != null ){
        finalJournal = finalJournal + "/of=" + of ;
    }
	

    return finalJournal ;
}


//retuns crop with respective to original picture
function shift(ca, rotation, flip)
{
    if(ca == null){
        return "" ;
    }
    var caAsAnArrayOfStrings = ca.split(",") ;
    var caAsAnArray = [ caAsAnArrayOfStrings[0], caAsAnArrayOfStrings[1],
            caAsAnArrayOfStrings[2], caAsAnArrayOfStrings[3]];

    //shift ca parameters (top,left,bottom, right)
    if(caAsAnArray.length <= 4)
    {
        if( rotation == "ccw")   //90
        {
            if( flip == "fh" )
                caAsAnArray = [1-caAsAnArray[3], 1-caAsAnArray[2], 1-caAsAnArray[1], 1-caAsAnArray[0]] ;
            else
                caAsAnArray = [caAsAnArray[1], 1-caAsAnArray[2],caAsAnArray[3],1-caAsAnArray[0] ] ;

        }else if( rotation == "ud") //180
        {
            if( flip == "fh" )
                caAsAnArray = [1-caAsAnArray[2], caAsAnArray[1], 1-caAsAnArray[0], caAsAnArray[3]] ;
            else
                caAsAnArray = [1-caAsAnArray[2],1-caAsAnArray[3],1-caAsAnArray[0],1-caAsAnArray[1] ] ;

        }else if( rotation == "cw") //270
        {
            if( flip == "fh" )
                caAsAnArray = [caAsAnArray[1], caAsAnArray[0], caAsAnArray[3], caAsAnArray[2]] ;
            else
                caAsAnArray = [1-caAsAnArray[3], caAsAnArray[0], 1-caAsAnArray[1], caAsAnArray[2] ] ;

        }else if( rotation == "fh" )
        {
            caAsAnArray =   [caAsAnArray[0], 1-caAsAnArray[3], caAsAnArray[2], 1-caAsAnArray[1] ] ;

        }else if( flip == "fh" )
        {
            caAsAnArray =   [caAsAnArray[0], 1-caAsAnArray[3], caAsAnArray[2], 1-caAsAnArray[1] ] ;
        }

        ca = caAsAnArray[0] + "," + caAsAnArray[1] + "," + caAsAnArray[2] + "," + caAsAnArray[3] ;
    }

    return ca ;
}

imageFactory.prototype.getFullJournalForPreviewRender = function()
{
    return "/USERPHOTO_IJOURNAL=" + this.encode(this.getFinalJournal());
}

imageFactory.prototype.getImageURLForCroppingControl = function(width, height)
{
    return this.getImageURLForThumbnail(width, height) + "/" + this.BORDER + this.layer + "=no";
}

imageFactory.prototype.getImageURLForThumbnail = function(width, height)
{
    return this.renderHost + this.IMAGE_SOURCE + this.layer + "=" + this.getImageSource() + "/" + this.journal + this.newJournal + "/" + this.CROP + this.layer + "=no/" + this.OUTPUT_FIT + this.layer + "=50," + Math.max(width, height) + "," + Math.max(width, height);
}

imageFactory.prototype.getImageURLFullJournal = function()
{
    return this.renderHost + this.IMAGE_SOURCE + this.layer + "=" + this.getImageSource() + "/" + this.journal + this.newJournal;
}

imageFactory.prototype.getImageURLImageEditPreview = function(withBorder)
{
    if( typeof withBorder != "undefined" )
    {
        return this.renderHost + this.IMAGE_SOURCE + this.layer + "=" + this.getImageSource() + "/" + this.journal + this.newJournal + "/" + this.OUTPUT_FIT + this.layer + "=50,480,480";
    }
    else
    {
        return this.renderHost + this.IMAGE_SOURCE + this.layer + "=" + this.getImageSource() + "/" + this.journal + this.newJournal + "/" + this.BORDER + this.layer + "=no/" + this.OUTPUT_FIT + this.layer + "=50,480,480";
    }
}

imageFactory.prototype.getImageURLOriginal = function()
{
    return this.renderHost + this.IMAGE_SOURCE + this.layer + "=" + this.getImageSource() + "/" + this.journal;
}

imageFactory.prototype.getImageURLMinusRedeye = function()
{
    return this.renderHost + this.IMAGE_SOURCE + this.layer + "=" + this.getImageSource() + "/" + this.journal + this.newJournal + "/" + this.RED_EYE + this.layer + "=no/" + this.BORDER + this.layer + "=no/" + this.OUTPUT_FIT + this.layer + "=50,480,480";
}

imageFactory.prototype.setCurrentJournal = function(journal)
{
    if( typeof journal == "string" && journal != null && journal != "" )
    {
        this.newJournal = journal;
    }
}

imageFactory.prototype.revertToOriginal = function()
{
    this.discardAllNewChanges();
}

imageFactory.prototype.revertToUploadedOriginal = function()
{
    this.discardAllChanges();
}

imageFactory.prototype.setRenderHostURL = function(renderHost)
{
    this.renderHost = renderHost + "/";
}

imageFactory.prototype.discardAllNewChanges = function()
{
    this.newJournal = new String();
}

imageFactory.prototype.discardAllChanges = function()
{
    this.journal = "/xx=true";
    this.newJournal = new String();
}

imageFactory.prototype.getRotatedCropCoordinates = function(forRevert)
{
    var cropArea = this.getCropArea();
    if( cropArea != "" && cropArea != "no" )
    {
        var aCropArea = cropArea.split(",", 5);
        var mode = aCropArea.pop();
        var journal = this.getFullJournal() + "/";
        var aAppliedRotates = journal.match(new RegExp(this.ROTATION + "=[^/]*/", "g"));
        if( aAppliedRotates != null )
        {
            for( var i=0; i < aAppliedRotates.length; i++ )
            {
                var rotate = aAppliedRotates[i].substring(aAppliedRotates[i].indexOf("=")+1, aAppliedRotates[i].indexOf("/"));
                if( rotate == "cw" )
                {
                    aCropArea.push(aCropArea.shift());
                    aCropArea[1] = Math.abs(1-aCropArea[1]);
                    aCropArea[3] = Math.abs(1-aCropArea[3]);
                }
                else if( rotate == "ccw" )
                {
                    aCropArea.unshift(aCropArea.pop());
                    aCropArea[0] = Math.abs(1-aCropArea[0]);
                    aCropArea[2] = Math.abs(1-aCropArea[2]);
                }
                else if( rotate == "fh" )
                {
                    var old = aCropArea[1];
                    aCropArea[1] = Math.abs(1-aCropArea[3]);
                    aCropArea[3] = Math.abs(1-old);
                }
                else if( rotate == "ud" )
                {
                    var old = aCropArea[1];
                    var old0 = aCropArea[0];
                    aCropArea[1] = Math.abs(1-aCropArea[3]);
                    aCropArea[3] = Math.abs(1-old);
                    aCropArea[0] = Math.abs(1-aCropArea[2]);
                    aCropArea[2] = Math.abs(1-old0);
                }
            }
        }
        if( typeof forRevert == "undefined" )
        {
            this.setCropAreaNotNested(aCropArea[0], aCropArea[1], aCropArea[2], aCropArea[3], mode);
        }
        return aCropArea.toString() + "," + mode;
    }
    else
    {
        return cropArea;
    }
}

imageFactory.prototype.undoLastRedeye = function()
{
    if( this.getRedEye() != "" && this.getRedEye() != "no" )
    {
        var thisJournal = this.newJournal + "/";
        var journalEnd = thisJournal.slice( thisJournal.lastIndexOf(this.RED_EYE + this.layer + "=") );
        this.newJournal = thisJournal.substring(0, thisJournal.lastIndexOf("/" + this.RED_EYE + this.layer + "=")) + journalEnd.substring(journalEnd.indexOf("/"));
    }
}

imageFactory.prototype.removeAllCropsForIPads = function()
{
    var cropArea = this.getCropAreaNewJournal();
    while( cropArea.length > 1 )
    {
        this.newJournal = this.newJournal.replace(new RegExp("/" + this.CROP + this.layer + "=" + cropArea, "g"), "");
        cropArea = this.getCropAreaNewJournal();
    }
}

imageFactory.prototype.getRotationCount = function(useFullJournal)
{
    if( typeof useFullJournal != "undefined" )
    {
        var rotateCount = this.getFullJournal().match(new RegExp(this.ROTATION + "=[^fh][^ud]", "g"));
    }
    else
    {
        var rotateCount = this.getCurrentJournal().match(new RegExp(this.ROTATION + "=[^fh][^ud]", "g"));
    }
    if( rotateCount != null && typeof rotateCount == "object" )
    {
        return rotateCount.length;
    }
    else
    {
        return 0;
    }
}

imageFactory.prototype.setCropArea = function(top, left, bottom, right, mode)
{
    this.newJournal += "/" + this.CROP + this.layer + "=" + top + "," + left + "," + bottom + "," + right + "," + mode;
}

imageFactory.prototype.setCropAreaNotNested = function(top, left, bottom, right, mode)
{
    this.newJournal += "/" + this.CROP + this.layer + "=no/" + this.CROP + this.layer + "=" + top + "," + left + "," + bottom + "," + right + "," + mode;
}

imageFactory.prototype.undoCrop = function()
{
    this.newJournal += "/" + this.CROP + this.layer + "=no";
    return true;
}

imageFactory.prototype.setOutputFit = function(fitHeuristic, width, height)
{
    this.newJournal += "/" + this.OUTPUT_FIT + this.layer + "=" + fitHeuristic + "," + width + "," + height;
}

imageFactory.prototype.setRotation = function(rotateType)
{
    this.newJournal += "/" + this.ROTATION + this.layer + "=" + rotateType;
}

imageFactory.prototype.setScalingFactor = function()
{
    this.newJournal += "/" + this.SCALE_FACTOR + this.layer + "=";
}

imageFactory.prototype.setBGColor = function()
{
    this.newJournal += "/" + this.BG_COLOR + this.layer + "=";
}

imageFactory.prototype.setBGColor = function(color)
{
    this.newJournal += "/" + this.BG_COLOR + this.layer + "=" + color;
}

imageFactory.prototype.setErrorPolicy = function()
{
    this.newJournal += "/" + this.ERROR_POLICY + this.layer + "=";
}

imageFactory.prototype.setOutputType = function(fitHeuristic, lrWidth, lrHeight, tnWidth, tnHeight)
{
    this.newJournal += "/" + this.OUTPUT_TYPE + this.layer + "=" + this.string(fitHeuristic) + "," + this.string(lrWidth) + "," + this.string(lrHeight) + "," + this.string(tnWidth) + "," + this.string(tnHeight);
}

imageFactory.prototype.setMetaData = function()
{
    this.newJournal += "/" + this.METADATA + this.layer + "=";
}

imageFactory.prototype.setAutoFix = function(fix)
{
    this.newJournal += "/" + this.AUTO_FIX + this.layer + "=" + fix;
}

imageFactory.prototype.setColorCorrect = function(type)
{
	//Always maintaining only one cc value in journal and changing cc value when tint value is changed
	if(this.newJournal.indexOf("cc=") != -1 )	
	{
		this.newJournal = this.newJournal.replace(this.newJournal.substring(this.newJournal.indexOf("cc=")+3,this.newJournal.indexOf("/",this.newJournal.indexOf("cc="))),type);
	}
	else
	{
		// Prepending the cc value of all other journal values for /render2 url as it has high priority in journal
	    this.newJournal = "/" + this.COLOR_CORRECT + this.layer + "=" + type+"/"+this.newJournal;
	}
}

imageFactory.prototype.setFillFlash = function(level)
{
    this.newJournal += "/" + this.FILL_FLASH + this.layer + "=" + level;
}

imageFactory.prototype.setRedEye = function(x, y, regionGrowth, desaturationStrength)
{
    this.newJournal += "/" + this.RED_EYE + this.layer + "=" + x + "," + y;
}

imageFactory.prototype.removeRedEye = function()
{
    this.newJournal += "/" + this.RED_EYE + this.layer + "=no";
}

imageFactory.prototype.setBrightness = function()
{
    this.newJournal += "/" + this.BRIGHTNESS + this.layer + "=";
}

imageFactory.prototype.setOpacity = function()
{
    this.newJournal += "/" + this.OPACITY + this.layer + "=";
}

imageFactory.prototype.setExclusion = function()
{
    this.newJournal += "/" + this.EXCLUSION + this.layer + "=";
}

imageFactory.prototype.setBorder = function(styleID)
{
    this.newJournal += "/" + this.BORDER + this.layer + "=" + styleID;
}

/** this is the master method called by all get methods **/
/** all subsequent type specific get methods return an array of the values contained by the specified key **/
imageFactory.prototype.get = function(type, fromNewJournalOnly)
{
    if( typeof fromNewJournalOnly != "undefined" )
    {
        var fullJournal = this.newJournal + "/";
    }
    else
    {
        var fullJournal = this.journal + this.newJournal + "/";
    }
    return fullJournal.search(new RegExp(type + this.layer + "=", "g")) > -1 ? fullJournal.substring(fullJournal.lastIndexOf(type + this.layer + "="), fullJournal.indexOf("/", fullJournal.lastIndexOf(type + this.layer + "="))).split("=", 2)[1] : new String();
}

imageFactory.prototype.getBorder = function()
{
    return this.get(this.BORDER);
}

imageFactory.prototype.getCropArea = function(fromNewJournalOnly)
{
    return this.get(this.CROP);
}

imageFactory.prototype.getCropAreaNewJournal = function()
{
    return this.get(this.CROP, true);
}

imageFactory.prototype.getOutputFit = function()
{
    return this.get(this.OUTPUT_FIT);
}

imageFactory.prototype.getRotation = function()
{
    return this.get(this.ROTATION);
}

imageFactory.prototype.getScalingFactor = function()
{
    return this.get(this.SCALE_FACTOR);
}

imageFactory.prototype.getImageSource = function()
{
    return this.imageSource;
}

imageFactory.prototype.getLayer = function()
{
    return this.layer;
}

imageFactory.prototype.getBGColor = function()
{
    return this.get(this.BG_COLOR);
}

imageFactory.prototype.getErrorPolicy = function()
{
    return this.get(this.ERROR_POLICY);
}

imageFactory.prototype.getOutputType = function()
{
    return this.get(this.OUTPUT_TYPE);
}

imageFactory.prototype.getMetaData = function()
{
    return this.get(this.METADATA);
}

imageFactory.prototype.getAutoFix = function()
{
    return this.get(this.AUTO_FIX);
}

imageFactory.prototype.getColorCorrect = function()
{
    return this.get(this.COLOR_CORRECT);
}

imageFactory.prototype.getRedEye = function()
{
    return this.get(this.RED_EYE);
}

imageFactory.prototype.getFillFlash = function()
{
    return this.get(this.FILL_FLASH);
}

imageFactory.prototype.getBrightness = function()
{
    return this.get(this.BRIGHTNESS);
}

imageFactory.prototype.getOpacity = function()
{
    return this.get(this.OPACITY);
}

imageFactory.prototype.getExclusion = function()
{
    return this.get(this.EXCLUSION);
}

imageFactory.prototype.encode = function(string)
{
    return string.replace(/\//g, "$");
    //return string.replace(/\//g, "@").replace(/=/g, "$");
}

imageFactory.prototype.decode = function(string)
{
    return string.replace(/\$/g, "/");
}

imageFactory.prototype.decodeAndSet = function(string)
{
    this.newJournal = "/" + this.decode(string);
}


imageFactory.prototype.getConstrainedImageSize = function(width, height, maxSize)
{ //new dimensions will be returned as {newWidth, newHeight};
    if( width > height )
    {
        return new Array(maxSize, Math.floor(maxSize*height/width));
    }
    else
    {
        return new Array(Math.floor(maxSize*width/height), maxSize);
    }
}

imageFactory.prototype.setConstrainedImageSizeFromPictDimension = function()
{
    if(this.hiresWidth > this.hiresHeight)     //landscape picture
    {
        if(this.picWidthUB < this.picHeightUB) //rotated picture
        {
            if( ( this.getRotationCount(this.getInitialJournal()) % 2) != 0 ) //rotated
                this.resizedImageDimensions = this.getConstrainedImageSize(this.picWidthUB, this.picHeightUB, this.displayBoxSize);
            else
                this.resizedImageDimensions = this.getConstrainedImageSize(this.picHeightUB, this.picWidthUB, this.displayBoxSize);
        }else   //not rotated
        {
            if( ( this.getRotationCount(this.getInitialJournal()) % 2) != 0 ) //rotated
                this.resizedImageDimensions = this.getConstrainedImageSize(this.picHeightUB, this.picWidthUB, this.displayBoxSize);
            else
                this.resizedImageDimensions = this.getConstrainedImageSize(this.picWidthUB, this.picHeightUB, this.displayBoxSize);
        }
    }else   //portrait picture
    {
        if(this.picWidthUB > this.picHeightUB) //rotated picture
        {
            if( ( this.getRotationCount(this.getInitialJournal()) % 2) != 0 ) //rotated
                this.resizedImageDimensions = this.getConstrainedImageSize(this.picWidthUB, this.picHeightUB, this.displayBoxSize);
            else
                this.resizedImageDimensions = this.getConstrainedImageSize(this.picHeightUB, this.picWidthUB, this.displayBoxSize);
        }else   //not rotated
        {
            if( ( this.getRotationCount(this.getInitialJournal()) % 2) != 0 ) //rotated
                this.resizedImageDimensions = this.getConstrainedImageSize(this.picHeightUB, this.picWidthUB, this.displayBoxSize);
            else
                this.resizedImageDimensions = this.getConstrainedImageSize(this.picWidthUB, this.picHeightUB, this.displayBoxSize);
        }
    }
}

imageFactory.prototype.getConstrainedImageSizeFromPictDimension = function()
{
    return this.resizedImageDimensions ;
}

imageFactory.prototype.getMinCropFieldSize = function(hrWidth, hrHeight, width, height, useHiResBlocker, hiResScaleFactor)
{
    //alert( this.forceCropOrientation + " - " + hrWidth + ", " + hrHeight + " :: " + width + ", " + height ) ;

    //if the image is smaller than MIN_RES_WIDTH x MIN_RES_HEIGHT lock the field at the max width and height for the selected aspect
    if( ( (this.forceCropOrientation == CROPORIENTATION_LANDSCAPE  &&  width < height)   //force landscape crop with portrait orientation
        || (this.forceCropOrientation == CROPORIENTATION_PORTRAIT  &&  width >= height) )
        && (Math.min(hrWidth, hrHeight) <= Math.max(this.MIN_RES_WIDTH, this.MIN_RES_HEIGHT)) ) //force portrait crop with lansdcape orientation
    {
        return null ;
    }else if( Math.max(hrWidth, hrHeight) <= Math.max(this.MIN_RES_WIDTH, this.MIN_RES_HEIGHT)
       || Math.min(hrWidth, hrHeight) <= Math.min(this.MIN_RES_WIDTH, this.MIN_RES_HEIGHT) )
    {
        return null ;
    }
    else if( typeof useHiResBlocker != "undefined" && typeof hiResScaleFactor != "undefined" )
    { //if we want to block the field at the maximum calculated res to avoid having to render from the hi-res
        var yuriConstant = .188;
        var hiResCutoff = Math.ceil(((Math.min(width,height)/hiResScaleFactor)*yuriConstant)+(Math.min(width,height)/hiResScaleFactor));
        var minCutoff = Math.floor(this.MIN_RES_HEIGHT/(Math.max(hrWidth, hrHeight)/Math.max(width, height)));
        if( minCutoff > Math.min(width,height) )
        {
            return null;
        }
        else
        {
            return Math.max( hiResCutoff, minCutoff );
        }
    }
    else
    { //just return the minimum field size for the smallest orderable print size
        var minCutoff ;

        if( this.MIN_RES_WIDTH >= this.MIN_RES_HEIGHT )
        {
            minCutoff = Math.floor(this.MIN_RES_HEIGHT/(Math.max(hrWidth, hrHeight)/Math.max(width, height)));
        }else
        {
            minCutoff = Math.floor(this.MIN_RES_WIDTH/(Math.min(hrWidth, hrHeight)/Math.min(width, height)));
        }

        if( minCutoff > Math.min(width,height) )
        {
            return null;
        }
        else
        {
            return minCutoff;
        }
    }
}

