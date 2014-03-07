/*--JavaUtil.js----*/

var Enumeration = new _Enumeration(null) ;

//Constructor of _Enumeration object (equivalent to a java.util.Enumeration java object)
function _Enumeration(array)
{
    this.m_array = array;
    this.m_currIndex = 0;
    this.getInstance = _Enumeration_getInstance;
    this.hasMoreElements = _Enumeration_hasMoreElements;
    this.nextElement = _Enumeration_nextElement;
    return this;
}

function _Enumeration_getInstance(array)
{
    if( array == null )
    {
        array = new Array();
    }
    return new _Enumeration(array);
}

function _Enumeration_hasMoreElements()
{
    if( this.m_array != null && this.m_array.length > 0 && this.m_currIndex < this.m_array.length )
    {
        return true;
    }
    return false;
}

function _Enumeration_nextElement()
{
    if( this.hasMoreElements() )
    {
        return this.m_array[this.m_currIndex++] ;
    }
    alert("Enumeration._nextElement() : No more elements") ;
    return null;
}

var Vector = new _Vector(null) ;
// Constructor of _Vector object (equivalent to a java.util.Vector java object)
function _Vector(size)
{
    this.m_array = new Array();
    this.m_currentIndex = 0;
    this.getInstance = _Vector_getInstance;
    this.add = _Vector_add;
    this.addElement = _Vector_addElement;
    this.elementAt = _Vector_elementAt;
    this.get = _Vector_get;
    this.size = _Vector_size;
    this.remove = _Vector_remove;
    this.removeElement = _Vector_removeElement;
    this.removeAll = _Vector_removeAll;
    this.insertElementAt = _Vector_insertElementAt;
    this.elements = _Vector_elements;
    this.contains = _Vector_contains;
    this.indexOf = _Vector_indexOf;
    this.toString = _Vector_toString;
    return this;
}

function _Vector_getInstance()
{
    return new _Vector(5);
}

function _Vector_add( aObject )
{
    this.m_array[ this.m_currentIndex++ ] = aObject;
}

function _Vector_addElement( aObject )
{
    this.add( aObject );
}

function _Vector_elementAt( index )
{
    if( index < this.m_currentIndex )
    {
        return this.m_array[ index ];
    }
    return null;
}

function _Vector_get( index )
{
    return this.elementAt(index);
}

function _Vector_size()
{
    return this.m_currentIndex;
}

function _Vector_indexOf(object)
{
    for(var i=0; i<this.m_currentIndex; i++)
    {
        if(this.m_array[i] == object)
        {
            return i;
        }
    }
    return -1;
}

function _Vector_remove( index )
{
    if( index >= 0 && index < this.m_currentIndex )
    {
        this.m_currentIndex--;
        var object = this.m_array[index];
        //Removing an element at index <index>
        if( typeof(this.m_array.splice) == "function" )
        {
            this.m_array.splice(index, 1); //remove one element
        }
        else
        {   //remove if value is found in this array
            for(var i=index; i<this.m_array.length; i++)
            {
               this.m_array[i] = this.m_array[i+1];
            }
            this.m_array.length = this.m_array.length - 1;
        }
        return object;
    }
    return null;
}

function _Vector_removeElement( anObject )
{
    if( anObject )
    {
        var index = this.indexOf(anObject);
        if(index != -1)
        {
            return this.remove(index);
        }
    }
    return null;
}

function _Vector_removeAll()
{
    this.m_array = new Array();
    this.m_currentIndex = 0;
}

function _Vector_insertElementAt(aObject, index)
{
    if( index > this.m_currentIndex || index < 0 )
    {
        return;
    }
    if( index == this.m_currentIndex )
    {
         this.m_array[this.m_currentIndex++] = aObject;
         return;
    }
    if( typeof(this.m_array.splice) == "function" )
    {
        this.m_array.splice(index, 0, aObject);  //add one element
    }
    else
    {
        var _beforeIndexArray = this.m_array.slice(0, index);
        var _afterIndexArray = this.m_array.slice(index, this.m_array.length);
        _beforeIndexArray[index] = aObject;
        this.m_array = _beforeIndexArray.concat(_afterIndexArray);
    }
    this.m_currentIndex++;
}

function _Vector_contains(anObject)
{
    var index = this.indexOf(anObject);
    if( index != -1 )
    {
        return true;
    }
    return false;
}

function _Vector_elements()
{
    return Enumeration.getInstance( this.m_array );
}

function _Vector_toString()
{
    return "[" + this.m_array.length + "]-{" + this.m_array + "}";
}

var CStringTokenizer = new _CStringTokenizer(null, null) ;
// Constructor of CStringTokenizer object (equivalent to a java.util.StringTokenizer java object)
function _CStringTokenizer(str, delim)
{
    this.getInstance = _CStringTokenizer_getInstance;
    this.hasMoreElements = _CStringTokenizer_hasMoreElements;
    this.hasMoreTokens = _CStringTokenizer_hasMoreElements;
    this.nextElement = _CStringTokenizer_nextElement;
    this.nextToken = _CStringTokenizer_nextElement;
    this.countTokens = _CStringTokenizer_countTokens;
    this.getVectorOfValues = _CStringTokenizer_getVectorOfValues;
    this.vectorOfValues = Vector.getInstance();

    if( str == null || delim == null )
    {
        this.tokenCount = 0;
        this.e = Enumeration.getInstance( new Array() );
        return this;
    }
    //split function returns empty srings if first/last char is delimeter
    var array = str.split( delim );
    var new_array = new Array();
    for(var i=0, j=0 ; i<array.length; i++ )
    {
        if( array[i] != "" )
        {   //removing empty strings
            new_array[j++] = array[i];
            this.vectorOfValues.add(CUtils.trim(array[i]));
        }
    }
    this.tokenCount = j;
    this.e = Enumeration.getInstance( new_array  );
    return this;
}

function _CStringTokenizer_getInstance(str, delim)
{
    return new _CStringTokenizer(str, delim);
}

function _CStringTokenizer_countTokens()
{
    return this.tokenCount;
}

function _CStringTokenizer_hasMoreElements()
{
    if( this.e == null )
    {
        return false;
    }
    return this.e.hasMoreElements();
}

function _CStringTokenizer_nextElement()
{
    if( this.hasMoreElements() )
    {
        return this.e.nextElement();
    }
    alert("CStringTokenizer._nextElement() : No more elements");
    return null;
}

function _CStringTokenizer_getVectorOfValues()
{
    return this.vectorOfValues;
}

var Hashtable = new _Hashtable(null) ;

// Constructor of _Hashtable object (equivalent to a java.util.Hashtable java object)
// @param int initial size of the hashtable
function _Hashtable(m_size)
{
    if( m_size )
    {
        this.m_vKeys = Vector.getInstance();
        this.m_vValues = Vector.getInstance();
    }
    else
    {
        this.m_vKeys = null;
        this.m_vValues = null;
    }

    this.m_arrayOfkeyValues = new Array();
    this.getInstance = _Hashtable_getInstance;
    this.put = _Hashtable_put;
    this.get = _Hashtable_get;
    this.remove = _Hashtable_remove;
    this.keys = _Hashtable_keys;//returns enumeration of keys
    this.elements = _Hashtable_elements;//returns enumeation of values
    this.values = _Hashtable_values; //returns Vector of values
    this.contains = _Hashtable_contains;
    this.size = _Hashtable_size ;
    return this;
}

function _Hashtable_size()
{
  return this.m_vKeys.size() ; // because keys and values would be of same size
}

function _Hashtable_getInstance()
{
    return new _Hashtable(5);
}

function _Hashtable_put(key, value)
{
    if( key == null || value == null )
    {
        return null;
    }
    if( this.m_vKeys.contains( key ) )
    {   //Remove old key and value
        this.m_vKeys.removeElement( key );
        this.m_vValues.removeElement( this.m_arrayOfkeyValues[key] );
    }
    this.m_vKeys.addElement( key );
    this.m_vValues.addElement( value );
    this.m_arrayOfkeyValues[key] = value;
    return value ;
}

function _Hashtable_get(key)
{
    var value = this.m_arrayOfkeyValues[key];
    if(value != null)
    {
        return value;
    }
    return null;
}

function _Hashtable_remove(key)
{
    var removedObject = null;
    if( this.m_vKeys.contains( key ) )
    {
        this.m_vKeys.removeElement( key );
        this.m_vValues.removeElement( this.m_arrayOfkeyValues[key] );
        removedObject = this.m_arrayOfkeyValues[key];
        this.m_arrayOfkeyValues[key] = null;
    }
    return removedObject;
}

function _Hashtable_keys()
{
    return this.m_vKeys.elements();
}

function _Hashtable_elements()
{
    return this.m_vValues.elements();
}

function _Hashtable_values()
{
    return this.m_vValues;
}

function _Hashtable_contains( key )
{
    return this.m_vKeys.contains( key );
}

//This variable is used as a java object. All jsps just include this file and can call CURLEncoder.encode(str) to encode a string
//It can also be created as regual java object using new operator.
var CURLEncoder = new _CURLEncoder();
_CURLEncoder.prototype.encode = _CURLEncoder_encode ;
_CURLEncoder.prototype.getURLEncoder = _CURLEncoder_getURLEncoder ;

function _CURLEncoder()
{
    return this;
}

// This function first encodes the '/' and '=' characters because these characters have special meaning (in linkmanager)then encodes
// the string using URLEncoder scheme.
// @param String string to be encoded
// @return String URLEncoded string
function _CURLEncoder_encode(str)
{
    //some of the characters decoded by NES and not get encoded when these get passed to the weblogic server
    //replace ('/') with "_xsfs"
    str = String(str); // to convert non string values to string to support replace method.
	
    var expression = /\//g;
    str = str.replace(expression, "_xff");

    //replace ('\') with "_xsfbs"
    expression = /\\/g;
    str = str.replace(expression, "_bs");

    //replace ('=') with "_xsfe"
    expression = /=/g;
    str = str.replace(expression, "_xfq");

    //replace ('?') with "_xsfq"
    expression = /\?/g;
    str = str.replace(expression, "_qm");

    //replace ('&') with "_xsfa"
    expression = /&/g;
    str = str.replace(expression, "_xfa");

    //replace (':') with "_xsfc"
    expression = /:/g;
    str = str.replace(expression, "_xfc");

    //replace ('%') with "_xsfp"
    expression = /%/g;
    str = str.replace(expression, "_xc");

    //replace ('+') with "_xsfpl"
    expression = /\+/g;
    str = str.replace(expression, "_xfl");

    //replace ('\n') with "_xsfn"
    expression = /\n/g;
    str = str.replace(expression, "_xfn");

    //replace ('#') with "_xshs"
    expression = /#/g;
    str = str.replace(expression, "_hs");

    //replace ('\r') with "_xsfr"
    expression = /\r/g;
    str = str.replace(expression, "_xfr");

    //replace (')') with "_xscb"
    expression = /\)/g;
    str = str.replace(expression, "_cb");

    //replace (')') with "_xscb"
    expression = /\'/g;
    str = str.replace(expression, "_xq");

    //replace (')') with "_xscb"
    expression = /\"/g;
    str = str.replace(expression, "_dq");


    str = encodeURIComponent(str);
    //'/', '@' characters are not encoded by javascript.escape function.
    //replace  ('@') with "%40"
    var expression = /@/g ;
    str = str.replace(expression, "%40") ;
    return str;
}

// This function creates and returns a CURLEncoder object which is (equivalent to a java object).
function _CURLEncoder_getURLEncoder()
{
    return new _CURLEncoder();
}

//This variable is used as a java object. All jsps just include this file and can call CURLDecoder.decode(str) to encode a string
//It can also be created as regual java object using new operator.
var CURLDecoder = new _CURLDecoder() ;
_CURLDecoder.prototype.decode = _CURLDecoder_decode ;
_CURLDecoder.prototype.getURLDecoder = _CURLDecoder_getURLDecoder ;

function _CURLDecoder()
{
    return this;
}

// This function first decodes decodes using URLDecoder scheme then decodes the  '/' and '=' characters which were
// encoded by CURLEncoder.encode() function.
// @param String string to be decoded
// @return String URLDecoded string
function _CURLDecoder_decode(str)
{
    str = decodeURIComponent(str); //(equivalent to java.net.URLDecoder.decode())

    //replace "_xsfs" with ('/')
    var expression = /_xff/g;
    str = str.replace(expression, "/");

    //replace "_xsfbs" with ('\')
    expression = /_bs/g;
    str = str.replace(expression, "\\");

    //replace  "_xsfe" with '='
    expression = /_xfq/g;
    str = str.replace(expression, "=");

    //replace  "_xsfq" with '?'
    expression = /_qm/g;
    str = str.replace(expression, "?");

    //replace  "_xsfa" with '&'
    expression = /_xfa/g;
    str = str.replace(expression, "&");

    //replace  "_xsfc" with ':'
    expression = /_xfc/g;
    str = str.replace(expression, ":");

    //replace  "_xsfp" with '%'
    expression = /_xc/g;
    str = str.replace(expression, "%");

    //replace "+" with space character " "
    expression = /\+/g;
    str = str.replace(expression, " ");

    //replace  "_xsfpl" with '+'
    expression = /_xfl/g;
    str = str.replace(expression, "+");

    //replace ('#') with "_xshs"
    expression = /_hs/g;
    str = str.replace(expression, "#");

    //replace  "_xsfn" with '\n'
    expression = /_xfn/g;
    str = str.replace(expression, "\n");

    //replace  "_xsfpl" with '+'
    expression = /_xfr/g;
    str = str.replace(expression, "\r");

    //replace  "_xscb" with ')'
    expression = /_cb/g;
    str = str.replace(expression, ")");

    //replace single quote
    expression = /_xq/g;
    str = str.replace(expression, "'");

    //replace single quote
    expression = /_dq/g;
    str = str.replace(expression, "\"");

    return str;
}

// This function creates and returns a CURLDecoder object which is (equivalent to a java object).
function _CURLDecoder_getURLDecoder()
{
    return new _CURLDecoder();
}

//This is used to decode the HTML encoded string.
var CHTMLDecoder = new _CHTMLDecoder();
_CHTMLDecoder.prototype.decode = _CHTMLDecoder_decode;

function _CHTMLDecoder()
{
    return this;
}

function _CHTMLDecoder_getHTMLDecoder()
{
    return CHTMLDecoder;
}
//This function will replace the characters encoded by CHTMLEncoder.java escape() method.
function _CHTMLDecoder_decode(str)
{
    //replace &#32; with ""
    expression = /&#32;/g;
    str = str.replace(expression, " ");
    //replace &#34; with "
    expression = /&#34;/g;
    str = str.replace(expression, "\"");
    //replace &#35; with #
    expression = /&#35;/g;
    str = str.replace(expression, "#");
    //replace &#32; with &
    expression = /&amp;/g;
    str = str.replace(expression, "&");
    //replace &#32; with '
    expression = /&#39;/g;
    str = str.replace(expression, "'");
    //replace &#32; with <
    expression = /&#60;/g;
    str = str.replace(expression, "<");
    //replace &#32; with >
    expression = /&#62;/g;
    str = str.replace(expression, ">");
    //replace &#32; with %
    expression = /&#37;/g;
    str = str.replace(expression, "%");
    //replace &#32; with \
    expression = /&#92;/g;
    str = str.replace(expression, "\\");

    return str;
}


/*---End of JavaUtil.js*/

var SNF_LOGO_URL = "/default/images/snf-logo.gif";
var windowName = "snapfishPopup";
var windowProperties = null;
var shareWindow;

function setWindowProperties(wProperties)
{
    windowProperties = wProperties;
}

function openWindow(url, windowName, features)
{
    if (features == null)
    {
        features = windowProperties;
    }
    CPopup.open(url, features, windowName);
}
function openHelpWindowWM(helpIdString,classname,closebutton){
  	var ele = document.getElementById('first'); 
  	if(ele==null) 
        alert('no way !'); 
    else {
    	if(ele.style.visibility == "visible"){
            ele.style.visibility = "hidden";
            ele.style.display = "none";
        } else {
      		//document.getElementById("helpWindow").style.width= width;
      		//document.getElementById("helpWindow").style.height= height;
			document.getElementById("helpWindow").className = classname;
			var width = 553;
			if(classname== 'popup-smallwindow'){
			width= 443;
			}
			if(classname== 'popup-previewwindow'){
			width= 800;
			}
			document.getElementById("helpWindow").src = helpIdString;
      		positionWindowWarningWM("helpWindowDiv",width);
       		document.getElementById("helpWindowDiv").style.display = "";
       		if(closebutton== "false"){
       		document.getElementById("closeButton").style.display = "none";
       		}else{
       		document.getElementById("closeButton").style.display = "";
       		}
		    ele.style.visibility = "visible";
		    ele.style.display="block";
		    if(typeof(_commonjs_isIE) != "undefined" && _commonjs_isIE != null)
			{
			if(_commonjs_isIE == "true"){
				if(CUtils.getElementById("magnetdropdown") != null)
	   		    	document.getElementById("magnetdropdown").style.display = "none";
	   		    if(CUtils.getElementById("babydropdown") != null)
	   		    	document.getElementById("babydropdown").style.display = "none";
                if(CUtils.getElementById("month") != null)
	   		    	document.getElementById("month").style.display = "none";	   		   
	   		    if(document.getElementById("tshirts") != null)
	   		    	document.getElementById("tshirts").style.display = "none";
	   		    if(window.parent.document.getElementById("ShortsSizes") != null)
	   	    	 window.parent.document.getElementById("ShortsSizes").style.display = "none";
	   		    
	   		    }
	   			}
		    
	   		}
    return false;
 	}
 	}
 	function positionWindowWarningWM(divname,width)
	{
    	
    	var aWidth =  document.body.clientWidth;
    	var cWidth = width;
    	var left = (aWidth - cWidth)/2-27;
        var dynDiv = document.getElementById(divname);
    	dynDiv.style.top = document.body.scrollTop;
    	dynDiv.style.left = left;    	
	} 

function closeAllWindows()
{
    CPopup.closeAllPopups();
}

//This function is used to hide/show the select boxes when a div is displayed.
//This is particularly useful for IE6 browsers since it doesn't support the overlay completely

function handleAllSelectboxesWG(divName, show)
{
    if (divName != null) {
        var elms = divName.getElementsByTagName("*");
        for(var i = 0, maxI = elms.length; i < maxI; ++i) {
            var elm = elms[i];
            if(elm.type == "select-one") {
            	if(show) elm.style.display = "block";
            	else elm.style.display = "none";
            }
        }
    } 
	
}


function openVerisignTrusteWindow(target)
{
    CPopup.open(target, windowProperties, "veriSign_trusteWindow");
}

function openPhotoContestWindow(target)
{
    target = replacePictureIDInURL(target);
    CPopup.open(target, windowProperties, "photoContestWindow");
}

function openPhotoContest2Window(target)
{
    CPopup.open(target, windowProperties, "photoContest2Window");
}

function openRecipientRemoveWindow(target)
{
    CPopup.open(target, windowProperties, "recipientRemoveWindow");
}

function getNonDownloadableDragDropTool(objectName)
{
    return "<object id=\"" + objectName + "\" width=\"1\" height=\"1\" classid=\"clsid:5763F8E8-0DD7-4A0F-ADB0-9F64C8F2C349\"></object>";
}

function isDynanicPictureIDAvailable()
{
    if( isSlideshowActive() || (window.imageArrayPictureID && window.imageArrayPictureID != null) )
    {
        return true;
    }
    else
    {
        return false;
    }
}

function isSlideshowActive()
{
    if( typeof initSlideshow == "function" )
    {
        return true;
    }
    return false;
}

function getImageOID()
{
    if( isSlideshowActive() )
    {
        return getCurrentPictOID();
    }
    else if( window.imageArrayPictureID && window.imageArrayPictureID != null )
    {
        return imageArrayPictureID[imagePointer];
    }
}

function getReprintOID()
{
    if( isSlideshowActive() )
    {
        return getCurrentReprintOID();
    }
    else if( window.imageArrayPictureIDReprints && window.imageArrayPictureIDReprints != null )
    {
        return imageArrayPictureIDReprints[imagePointer];
    }
}


function preventMultipleSubmit(linkObj,imageObj,dimSrc)
{
	if ( typeof dimSrc == 'undefined') {
	    if(imageObj)
	    {
	    	if(imageObj.src != undefined) {
	    		imageObj.src = imageObj.src.substring(0,imageObj.src.length-4)+"-dim.gif"  ;
	    	}
	    if(linkObj != null) {
	        linkObj.removeAttribute("href");
	        }
	    }
	} else {    
	    if(imageObj)
	    {
	    imageObj.src = dimSrc;
	    if(linkObj != null) {
	        linkObj.removeAttribute("href");
	        }
	    }
	}

}


function preLoadPreventMultipleSubmitButtons(imageObj,dimSrc)
{
	if ( typeof dimSrc == 'undefined') 
	{
	    if(imageObj)
	    {
	        new Image().src = imageObj.src.substring(0,imageObj.src.length-4)+"-dim.gif"  ;
	    }
	} else {
	    if(imageObj)
	    {
	        new Image().src = dimSrc  ;
	    }
	}
    return ;
}



   //***************************************************************/
   //    @Name        :  openSharePopup
  //     @parameters  : url,productType
  //     @purpose     : To open tell a friend window
  //     @Note        : You Should pass Minimum one parameter url
  //****************************************************************/
  function openSharePopup()

   {

        if ( shareWindow =="[object]")
        {
            shareWindow.close();
        }

        var lm = CLinkManager.getInstance(openSharePopup.arguments[0]);

        if ( openSharePopup.arguments.length >1)
        {

            lm.setURLParameter( IParameterConstants.PRD_TYPE, openSharePopup.arguments[1]);
        }
        windowProperties = 'width=625,height=510,resizable,scrollbars=yes' ;
        shareWindow = window.open(lm.getURL(), null,windowProperties);
        shareWindow.top


     }
    function openSharePopupWM(productUrl, prdtype,classname,closebutton)
    {
	var ele = document.getElementById('first'); 
  	if(ele==null) 
        alert('no way !'); 
    else {
    	if(ele.style.visibility == "visible"){
            ele.style.visibility = "hidden";
            ele.style.display = "none";
        } else {
        	if ( shareWindow =="[object]")
	        {
	            shareWindow.close();
	        }

	        var lm = CLinkManager.getInstance(openSharePopupWM.arguments[0]);

	        if ( openSharePopupWM.arguments.length >1)
	        {

	            lm.setURLParameter( IParameterConstants.PRD_TYPE, openSharePopupWM.arguments[1]);
	        }
	        document.getElementById("helpWindow").className = classname;
			var width = 700;
			if(classname== 'popup-bigwindow'){
			width= 553;
			}
			document.getElementById("helpWindow").src = lm.getURL();
      		positionWindowWarning("helpWindowDiv",width);
       		document.getElementById("helpWindowDiv").style.display = "";
       		if(closebutton== "false"){
       		document.getElementById("closeButton").style.display = "none";
       		}else{
       		document.getElementById("closeButton").style.display = "";
       		}
		    ele.style.visibility = "visible";
		    ele.style.display="block";
		    if(CUtils.getElementById("magnetdropdown") != null)
	   		    document.getElementById("magnetdropdown").style.display = "none";
	   		    if(CUtils.getElementById("charmnumber") != null)
	   		    document.getElementById("charmnumber").style.display = "none";
      		}
    }
 	}
  
  function openSharePopupcardsWM(){
		var shareWindow;
	    	var ele = document.getElementById('first'); 
	    	if(ele==null) 
	          alert('no way !'); 
	      else {
	      	if(ele.style.visibility == "visible"){
	              ele.style.visibility = "hidden";
	              ele.style.display = "none";
	          } else {
	          	
	          	if ( shareWindow =="[object]")
	              {
	                  shareWindow.close();
	              }

	              var lm = CLinkManager.getInstance(openSharePopupcardsWM.arguments[0]);

	              if ( openSharePopupcardsWM.arguments.length >1)
	              {

	                  lm.setURLParameter( IParameterConstants.PRD_TYPE, openSharePopupcardsWM.arguments[1]);
	              }
	              //windowProperties = 'width=625,height=510,resizable,scrollbars=yes' ;
	              //shareWindow = window.open(lm.getURL(), null,windowProperties);
	              //shareWindow.top
	              
	        		document.getElementById("helpWindow").src = lm.getURL();
	        		document.getElementById("closeButton").style.display = "none";
	              document.getElementById("helpWindow").className = 'popup-sharewindow';
	              var width= "1000";
	              positionWindowWarningWM("helpWindowDiv",width);
	              document.getElementById("helpWindowDiv").style.display = "";
	  		    ele.style.visibility = "visible";
	  		    ele.style.display="block";
	        		}
	      }
	      
	    }


function Popup(element, text)
{
  element.onmousemove = Popup.onMouseMoveHandler;
  element.onmouseout = Popup.onMouseOutHandler;
  element.onmouseover = Popup.onMouseOverHandler;
  var popupDiv = document.createElement("DIV");
  popupDiv.innerHTML = text;
  popupDiv.style.display = "none";
  popupDiv.style.position = "absolute";
  popupDiv.style.backgroundColor = "#ffffcc";
  this.popupDiv = popupDiv;
  document.body.appendChild(popupDiv);
  element.popup = this;
}

Popup.createPopup = function(element, text)
{
  var popup = new Popup(element, text);
  return popup;
}

Popup.prototype.move = function(x, y)
{
  this.popupDiv.style.left = x + "px";
  this.popupDiv.style.top = y + "px";
}

Popup.prototype.show = function()
{
  this.popupDiv.style.display = "block";
}

Popup.prototype.hide = function()
{
  this.popupDiv.style.display = "none";
}

Popup.onMouseMoveHandler = function(e)
{
  if (e == null) e = window.event;
  this.popup.move(e.clientX + document.body.scrollLeft + 15, e.clientY + document.body.scrollTop);

}

Popup.onMouseOverHandler = function(e)
{
  if (e == null) e = window.event;
  this.popup.move(e.clientX + document.body.scrollLeft + 15, e.clientY + document.body.scrollTop);
  this.popup.show();
}

Popup.onMouseOutHandler = function(e)
{
  if (e == null) e = window.event;
  this.popup.hide();
}



//  This is used to create InfoPopup box to display product status at store pages
  function createToolTip( obj, message ) {
    var messageHtml = "<table><tr><td>"+ message + "</td></tr></table>";
    Popup.createPopup( obj, messageHtml);
  }






/*---help.js--*/
function openHelpWindow(target)
{
   setWindowProperties('width=500,height=480,resizable,scrollbars=yes');
   if( arguments.length >1)
    {
      var lm = CLinkManager.getInstance(target);
      lm.setURLParameter( "sectionId", arguments[1]);
      openWindow(lm.getURL());
    }
    else
      openWindow(target);
    return ;

}

function openShippingWindow(target)
{
  setWindowProperties('width=650,height=480,resizable,scrollbars=yes');
  openWindow(target);
}

function openStorageWindow(target)
{
    setWindowProperties('width=450,height=380,resizable,scrollbars=yes');
    openWindow(target);
}


/**----IParameterConstants.js-----*/

var IParameterConstants = new _IParameterConstants();

function _IParameterConstants()
{
    this.HTTP = "http://" ;
    this.HTTPS = "https://" ;
    this.ALBUM_ID = "AlbumID";
    this.ALBUM_IDS = "albumids";
    this.PICTURE_ID = "PictureID";
    this.OWNER_ID = "ownerid";
    this.ALBUM_CAPTION = "AlbumCaption";
    this.PICTURE_CAPTION = "PictureCaption";
    this.URL_TOGOBACK = "urlToGoback";
    this.INPUT_URLID = "inputurlid";
    this.NEW_ALBUM = "newalbum";
    this.NEW_ALBUM_ID = "aaaaaaaaa";
    this.DESTINATION_ALBUM_ID = "destinationalbumid";
    this.NVP_SEPARATOR = "!%NVP_SEP^!";
    this.INNER_SEPARATOR = "!%EQUALS^!";
    this.DELIM = ",";
    this.DB_OLIS = "dbolis";
    this.OLIS = "olis";
    this.CLIENT_OLIS = "clientolis";
    this.PICTURE_IDS_IN_CART = "pictureidsincart";
    this.BUDDY = "B";
    this.OWNER = "O";
    this.CATEGORY = "cat";
    this.CUSTOMCD_CAPTION = "customcdcaption";
    this.CUSTOMCD_DEFAULT_CAPTION = "Snapfish Photo CD";
    this.CUSTOMCD_QUANTITY = "quantity";
    this.CUSTOMCD_BILLING_DONE = "billingdone";
    this.QTY = "qty";
    this.CALENDAR_START_MONTH = "calendarstartmonth";
    this.CALENDAR_DB_START_MONTH = "calendardbstartmonth";
    this.CALENDAR_CURRENT_MONTH = "calendarcurrentmonth";
    this.SIZE = "Size";
    this.TIME_STAMP = "t_";
    this.DEFAULT_PERSISTENT_COOKIE_NAME = "SF_PC_060100";
    this.DEFAULT_SESSION_COOKIE_NAME = "s_sc";
    this.CUSTOMCD_SESSION_COOKIE_NAME = "s_ccd";
    this.HIRES_SESSION_COOKIE_NAME = "s_hir";
    //ad cookie name (ad cookie is session cookie)
    this.AD_COOKIE_NAME = "s_ad";
    this.AD_COOKIE_PARAMS_NAME = "params";
    //Reprint size
    this.REPRINT_SIZE_4x6 = "4x6";
    this.REPRINT_SIZE_5x7 = "5x7";
    this.REPRINT_SIZE_8x10 = "8x10";
    this.REPRINT = "reprint";
    // Reprint Merch UPCs
    this.MERCH_UPC_4x6 = "reprint;4x6";
    this.MERCH_UPC_5x7 = "reprint;5x7";
    this.MERCH_UPC_8x10 = "reprint;8x10" ;
    this.PRD = "prd";
    this.PRD_TYPE = "prdtype";
    this.FLIPBOOK_SESSION_COOKIE_NAME = "s_spi";
    this.PICT_ROTATION_DEGREES = "pictrotationdegrees";
    this.JOURNAL_VALUE = "journal" ;
    this.EXTRA_PARAM = "extraparam" ;
    this.BOOK_SIZE = "booksize";
    this.ISEXPRESS = "isExpress";
    this.CAPTIONS= "captions";
    this.BOOK_STYLE = "bookstyle" ;
    this.LEADING_OLI_OID = "leadingolioid";
    this.SOURCE_URL = "sourceURL";
    // PC to Mobile
    this.MOBILE_PHONE_NO = "mobilephoneno";
    this.MOBILE_MESSAGE = "mobilemessage" ;

    //Print at Home USConstants
    this.PRINTATHOME_SIZE_8x10 = "1_8x10" ;
    this.PRINTATHOME_SIZE_5x7 = "1_5x7" ;
    this.PRINTATHOME_SIZE_4x6 = "2_4x6" ;
    this.PRINTATHOME_SIZE_3xD = "4_3.5x5" ;
    this.PRINTATHOME_SIZE_2xD = "6_2.5x3.25" ;
    this.PRINTATHOME_SIZE_BL = "1_4x6_borderless" ;
    
    this.PRINTATHOME_SIZE_SPECIALITY_4x6 = "1_4x6" ;
    this.PRINTATHOME_SIZE_SPECIALITY_5x7 = "1_5x7" ;
    this.PRINTATHOME_SIZE_DOUBLE_5x7 = "2_5x7" ;  

    //Print at Home - UK constants
    this.PRINTATHOME_UK_SIZE_15x21 = "1_15x21" ;
    this.PRINTATHOME_UK_SIZE_13x18 = "2_13x18" ;
    this.PRINTATHOME_UK_SIZE_10x15 = "2_10x15" ;
    this.PRINTATHOME_UK_SIZE_9x13 = "4_9x13" ;
    this.PRINTATHOME_UK_SIZE_6x8 = "8_6x8" ;
    this.PRINTATHOME_UK_SIZE_BL = "1_10x15_borderless" ;

    //snapfisheu photo actions constant
    this.FROM_PHOTO_ACTIONS = "fromPhotoActions";

    //snapfisheu change country constant
    this.LOCALE = "locale";

    // project related constants
    this.PROJECT_ID = "pid";

    //left nav bar constants
    this.PAGE_INDEX = "1_15x21" ;
    this.VIEW_YOUR_ALBUMS_DIV = "owned_div" ;
    this.VIEW_YOUR_ALBUMS_ALL_DIV = "owned_all_div" ;
    this.VIEW_YOUR_ALBUMS_AZ_DIV = "owned_az_div" ;
    this.DEFAULT_OWNED_VIEW = "owned_view" ;
    this.VIEW_FRIEND_ALBUMS_DIV = "frnd_div" ;
    this.VIEW_FRIEND_ALBUMS_ALL_DIV = "frnd_all_div" ;
    this.VIEW_FRIEND_ALBUMS_FRIEND_DIV = "frnd_friend_div" ;
    this.DEFAULT_SHARED_VIEW = "shared_view" ;
    this.VIEW_GROUP_ALBUMS_DIV = "group_albums_div" ;

    //SnapfishEU constants.
    this.PICTURE = "Picture";
    this.DELETE_ENTIRE_ALBUM = "delete_entire_album";
    this.DELETE_ALBUM_ON_MOVE_ALL_PICTURES = "delete_album_on_move_all_pictures";

    // Walmart constants
    this.INDEX="index";
    this.UPC = "upc";
    this.STYLE_ID="sid";
    this.CROP_TO_ASPECT_RATIO="cropToAspectRatio";
    this.CARDS_PERSISTANCE_COOKIE="CARDS_PERISISTANCE_COOKIE";
    this.OPTION_CHECKED="optionchecked";
    this.TRUE="true";
    this.PIXACO_CART_URL="pixacocarturl";
    this.BOOK_STYLE_NAME="bookstylename";
  this.FIRST_NAME = "firstname";
  this.LAST_NAME = "lastname";
  this.EMAIL_ADDRESS = "emailaddress";
  this.PASSWORD = "password";
  this.PASSWORD_2 = "password2";
    this.CARD_ERROR_NO_SHOW = "carderrornoshow";
    this.CARD_TXT_WAR_NO_SHOW = "cardtextwarningnoshow";

    this.SECONDARY_ATTRIBUTES = "secondaryattributes";
    this.PRODUCT_NAME = "productname";

	this.FB_TNC_COOKIE="facebooktnccookie";
	this.FB_TNC_VALUE="facebooktncvalue";
	this.IS_FROM_SHOPPING_ASSISTANT="isfromshoppingassistant";
	this.CREATE_FLOW_URL="createflowurl";
	this.STORE_PAGE_ID = "storePageId";
    return this;
}


/*--CPictureInfo.js---*/

//this is used by orderReprint popup to show warning icon (is reprintable) and to display aps icon
function _CPictureInfo(pictureID)
{
  this.pictureID = pictureID ;
  this.is4x6Reprintable = false ;
  this.is5x7Reprintable = false ;
  this.is8x10Reprintable = false ;
  this.isWalletReprintable = false ;
  this.isLowQualityPicture = false ;
  this.isAPSPicture = false ;
  this.isAged = false ;
  this.isPreserved = false ;
  this.isAging = false ;
  return this;
}
new _CPictureInfo(null);


/*--AlbumInfo related stuff --*/

function getYearSpan(year)
{
    var yearSpan = "<br><span class='boldGreen'>"+year+"</span>" ;
    //yearClass is defined in corresponding albums_javascript.jsp for costco/walgreens
    if(typeof(yearClass) != "undefined" && yearClass != null)
        yearSpan = "<span class='"+yearClass+"'>"+year+"</span>" ;

  return yearSpan ;
}

var monthArray = new Array() ;

monthArray["0"] = "january" ;
monthArray["1"] = "february" ;
monthArray["2"] = "march" ;
monthArray["3"] = "april" ;
monthArray["4"] = "may" ;
monthArray["5"] = "june" ;
monthArray["6"] = "july" ;
monthArray["7"] = "august" ;
monthArray["8"] = "september" ;
monthArray["9"] = "october" ;
monthArray["10"] = "november" ;
monthArray["11"] = "december" ;

function getMonthYearSpan(month,year)
{
	if(typeof(isWalgreens) != "undefined" && isWalgreens == true){
		var monthSpan = "<br><span class='orangetextlight' style='margin-left:6px;'><b>"+monthArray[month]+"&nbsp;"+year+"</b></span>" ;
	    if(typeof(monthClass) != "undefined" && monthClass != null)
	        monthSpan = "<br><span class='"+monthClass+"'><b>"+monthArray[month]+"&nbsp;"+year+"</b></span>" ;
	}else{
		var monthSpan = "<br><span class='greytextlight'><b>"+monthArray[month]+"&nbsp;"+year+"</b></span>" ;
	    if(typeof(monthClass) != "undefined" && monthClass != null)
	        monthSpan = "<br><span class='"+monthClass+"'><b>"+monthArray[month]+"&nbsp;"+year+"</b></span>" ;
	}
    

  return monthSpan ;
}


/*---CPopup.js----*/

var CPopup = new _CPopup();

function _CPopup()
{
    this._windowName = "snapfishPopup";
    this._popup = null;
    this.WIDTH = 500;
    this.HEIGHT = 300;
    this.open = _CPopup_open;
    this.close = _CPopup_close;
    this.getDimension = _CPopup_getDimension;
    this.getInstance = _CPopup_getInstance;
    this.closeAllPopups = _CPopup_closeAllPopups;
    return this;
}

function _CPopup_getInstance()
{
    return new _CPopup();
}

function _CPopup_open(url, windowProps, windowName)
{
    CPopupManager.closePopup(windowName);
    var locstr = '';
    var width = this.WIDTH;
    var height = this.HEIGHT;

    if( windowName )
    {
        this._windowName = windowName;
    }
    if( !windowProps )
    {
        windowProps = "width=" + width + ",height=" + height;
    }

    var dimension = this.getDimension(windowProps);
    if( dimension[0] != null )
    {
        width = dimension[0];
    }
    if( dimension[1] != null )
    {
        height = dimension[1];
    }

    var lx = window.screen.width/2 - width/2;
    var ly = window.screen.height/2 - height/2;
    if(navigator.userAgent.indexOf("AOL") != -1)
    {
        ly = ly - 108 ;
    }
    locstr = ",left=" + lx + ",screenX=" + lx + ",top=" + ly + ",screenY=" + ly;

    windowProps = windowProps + locstr;
    this._popup = window.open(url, this._windowName, windowProps );
    CPopupManager.addPopup(this._windowName, this._popup);
    try{ // prevent a javascript error during focus a empty window (Issue ID: INT0000337)
      this._popup.focus();
    } catch(err){   }
}

function _CPopup_close()
{
    try { // prevent a javascript error which appears for accessing this._popup properties if this popup is in the process of closing itself (Issue ID: SNF0001597)
        if( this._popup != null && ! this._popup.closed )
        {
            this._popup.close();
            CPopupManager.removePopup(this._windowName, this._popup);
        }
    }
    catch(err){ }
}

function _CPopup_closeAllPopups()
{
    CPopupManager.closeAllPopups();
}

function _CPopup_getDimension(windowProps)
{
    var dimension = new Array(2);

    if( !windowProps )
    {
        return dimension ;
    }

    var props = windowProps.split(",");
    for( var i=0; i<props.length; i++ )
    {
        var _props = props[i].split("=");
        if( _props.length == 2 )
        {
            if(_props[0] == "width")
            {
                dimension[0] = _props[1] ;
            }
            if(_props[0] == "height")
            {
                dimension[1] = _props[1] ;
            }
        }
    }

    return dimension;
}

var CPopupManager = new _CPopupManager() ;

function _CPopupManager()
{
    this._popupVector = null;
    this._popupTable = null;
    this.getAllPopups = _CPopupManager_getAllPopups;
    this.closeAllPopups =  _CPopupManager_closeAllPopups;
    this.closePopup = _CPopupManager_closePopup;
    this.addPopup = _CPopupManager_addPopup;
    this.removePopup = _CPopupManager_removePopup;
    this.indexOf = _CPopupManager_indexOf;
}

function _CPopupManager_getAllPopups()
{
    if( this._popupVector == null )
    {
        this._popupVector = new Array();
    }
    if( this._popupTable == null )
    {
        this._popupTable = new Array();
    }
    return this._popupVector;
}

function _CPopupManager_closeAllPopups()
{
    var popups = this.getAllPopups();
    for(var i=0; i<popups.length; i++)
    {
        var popup = popups[i];
        if( popup != null && popup.closed == false)
        {
            this.removePopup(popup._windowName, i);
            popup.close();
        }
    }
}

function _CPopupManager_addPopup(popupName, popup)
{
    if( this._popupVector == null )
    {
        this._popupVector = new Array();
    }
    this._popupVector[this._popupVector.length] = popup;
    if( this._popupTable == null )
    {
        this._popupTable = new Array();
    }
    this._popupTable[popupName] = popup;
}


function _CPopupManager_removePopup(popupName, index)
{
    if( this._popupVector != null && this._popupVector.length > 0 )
    {
        //Removing an element at index <index>
        if( typeof(this._popupVector.splice) == "function" )
        {
            this._popupVector.splice(index, 1); //remove one element
        }
        else
        {   //remove if value is found in this array
            for(var i=index; i<this._popupVector.length; i++)
            {
               this._popupVector[i] = this._popupVector[i+1];
            }
            this._popupVector.length = this._popupVector.length - 1;
        }
    }
    if( this._popupTable != null )
    {
        this._popupTable[popupName] = null;
    }
}

function _CPopupManager_closePopup(popupName)
{
    if( this._popupTable != null && this._popupTable.length > 0 )
    {
        var popup = this._popupTable[popupName];
        if( popup != null && popup.closed == false )
        {
            this.removePopup(popupName, this.indexOf(popup));
            popup.close();
        }
    }
}

function _CPopupManager_indexOf(object)
{
    for(var i=0; i<this._popupVector.length; i++)
    {
        if(this._popupVector[i] == object)
        {
            return i;
        }
    }
    return -1;
}

/*---CBuilderPopup.js----*/

var CBuilderPopup = new _CBuilderPopup();

function _CBuilderPopup()
{
    this._windowName = "snapfishPopup";
    this._popup = null;
    this.WIDTH = 500;
    this.HEIGHT = 300;
    this.open = _CBuilderPopup_open;
    this.close = _CBuilderPopup_close;
    this.getDimension = _CBuilderPopup_getDimension;
    this.getInstance = _CBuilderPopup_getInstance;
    this.closeAllPopups = _CBuilderPopup_closeAllPopups;
    return this;
}

function _CBuilderPopup_getInstance()
{
    return new _CBuilderPopup();
}

function _CBuilderPopup_open(url, windowProps, windowName)
{
	/*
    CBuilderPopupManager.closePopup(windowName);
    var locstr = '';
    var width = window.screen.width;
    var height = window.screen.height;

    if( windowName )
    {
        this._windowName = windowName;
    }
    if( !windowProps )
    {
        windowProps = "width=" + width + ",height=" + height;
    }

    var dimension = this.getDimension(windowProps);
    if( dimension[0] != null )
    {
        width = dimension[0];
    }
    if( dimension[1] != null )
    {
        height = dimension[1];
    }
    
    height="820";
    width="1200";
    windowProps = windowProps + ",width=" + width + ",height=" + height;  
    //locstr = ",left=" + lx + ",screenX=" + lx + ",top=" + ly + ",screenY=" + ly;
    locstr = "";
    windowProps = windowProps + locstr;
    this._popup = window.open(url, this._windowName, windowProps );
    if(this._popup == null )
    {
    	alert("Please disable your popup blocker to continue.");
    }
    CBuilderPopupManager.addPopup(this._windowName, this._popup);
    try{ // prevent a javascript error during focus a empty window (Issue ID: INT0000337)
      this._popup.focus();
    } catch(err){   }
    */
	
	/*
	 * This is hack doing it for last minute change for opening the builder applciation 
	 */
	if(url)
	{
		url = url.replace("/isPopup=true", "");
		document.location.href = url;	
	}
			
	
}

function _CBuilderPopup_close()
{
    try { // prevent a javascript error which appears for accessing this._popup properties if this popup is in the process of closing itself (Issue ID: SNF0001597)
        if( this._popup != null && ! this._popup.closed )
        {
            this._popup.close();
            CBuilderPopupManager.removePopup(this._windowName, this._popup);
        }
    }
    catch(err){ }
}

function _CBuilderPopup_closeAllPopups()
{
    CBuilderPopupManager.closeAllPopups();
}

function _CBuilderPopup_getDimension(windowProps)
{
    var dimension = new Array(2);

    if( !windowProps )
    {
        return dimension ;
    }

    var props = windowProps.split(",");
    for( var i=0; i<props.length; i++ )
    {
        var _props = props[i].split("=");
        if( _props.length == 2 )
        {
            if(_props[0] == "width")
            {
                dimension[0] = _props[1] ;
            }
            if(_props[0] == "height")
            {
                dimension[1] = _props[1] ;
            }
        }
    }

    return dimension;
}

var CBuilderPopupManager = new _CBuilderPopupManager() ;

function _CBuilderPopupManager()
{
    this._popupVector = null;
    this._popupTable = null;
    this.getAllPopups = _CBuilderPopupManager_getAllPopups;
    this.closeAllPopups =  _CBuilderPopupManager_closeAllPopups;
    this.closePopup = _CBuilderPopupManager_closePopup;
    this.addPopup = _CBuilderPopupManager_addPopup;
    this.removePopup = _CBuilderPopupManager_removePopup;
    this.indexOf = _CBuilderPopupManager_indexOf;
}

function _CBuilderPopupManager_getAllPopups()
{
    if( this._popupVector == null )
    {
        this._popupVector = new Array();
    }
    if( this._popupTable == null )
    {
        this._popupTable = new Array();
    }
    return this._popupVector;
}

function _CBuilderPopupManager_closeAllPopups()
{
    var popups = this.getAllPopups();
    for(var i=0; i<popups.length; i++)
    {
        var popup = popups[i];
        if( popup != null && popup.closed == false)
        {
            this.removePopup(popup._windowName, i);
            popup.close();
        }
    }
}

function _CBuilderPopupManager_addPopup(popupName, popup)
{
    if( this._popupVector == null )
    {
        this._popupVector = new Array();
    }
    this._popupVector[this._popupVector.length] = popup;
    if( this._popupTable == null )
    {
        this._popupTable = new Array();
    }
    this._popupTable[popupName] = popup;
}


function _CBuilderPopupManager_removePopup(popupName, index)
{
    if( this._popupVector != null && this._popupVector.length > 0 )
    {
        //Removing an element at index <index>
        if( typeof(this._popupVector.splice) == "function" )
        {
            this._popupVector.splice(index, 1); //remove one element
        }
        else
        {   //remove if value is found in this array
            for(var i=index; i<this._popupVector.length; i++)
            {
               this._popupVector[i] = this._popupVector[i+1];
            }
            this._popupVector.length = this._popupVector.length - 1;
        }
    }
    if( this._popupTable != null )
    {
        this._popupTable[popupName] = null;
    }
}

function _CBuilderPopupManager_closePopup(popupName)
{
    if( this._popupTable != null && this._popupTable.length > 0 )
    {
        var popup = this._popupTable[popupName];
        if( popup != null && popup.closed == false )
        {
            this.removePopup(popupName, this.indexOf(popup));
            popup.close();
        }
    }
}

function _CBuilderPopupManager_indexOf(object)
{
    for(var i=0; i<this._popupVector.length; i++)
    {
        if(this._popupVector[i] == object)
        {
            return i;
        }
    }
    return -1;
}


/*---InfoPopup.js----*/

Popup.popupDiv = null;

function Popup(element, text, className)
{
    if (typeof element == "string")
    {
        element = document.getElementById(element);
    }
    if (element == null)
    {
        alert('Unable to create popup. Element not found.');
        return;
    }

    this.text = text;
    this.className = className;
    element.onmousemove = Popup.onMouseMoveHandler;
    element.onmouseout = Popup.onMouseOutHandler;
    element.onmouseover = Popup.onMouseOverHandler;

    if (Popup.popupDiv == null)
    {
        var popupDiv = document.createElement("DIV");
        popupDiv.style.display = "none";
        popupDiv.style.position = "absolute";
        Popup.popupDiv = popupDiv;
        document.body.appendChild(popupDiv);
    }

    element.popup = this;
}

Popup.createPopup = function(element, text, className)
{
    var popup = new Popup(element, text, className);
    return popup;
}

Popup.prototype.move = function(x, y)
{
    Popup.popupDiv.style.left = x + "px";
    Popup.popupDiv.style.top = y + "px";
}

Popup.prototype.show = function()
{
    Popup.popupDiv.innerHTML = this.text;
    if (this.className != null)
    {
        Popup.popupDiv.className = this.className;
    }
    else
    {
        Popup.popupDiv.className = "";
        Popup.popupDiv.style.padding = "2px";
        Popup.popupDiv.style.backgroundColor = "#ffffcc";
        Popup.popupDiv.style.border = "1px solid Blue";
    }

    if (!this.visible)
    {
        Popup.popupDiv.style.display = "block";
    }
    this.visible = true;
}

Popup.prototype.hide = function()
{
    Popup.popupDiv.style.display = "none";
    this.visible = false;
}

Popup.onMouseMoveHandler = function(e)
{
    if (e == null) e = window.event;
    this.popup.move(e.clientX + document.body.scrollLeft + 15, e.clientY + document.body.scrollTop);
}

Popup.onMouseOverHandler = function(e)
{
    if (e == null) e = window.event;
    this.popup.move(e.clientX + document.body.scrollLeft + 15, e.clientY + document.body.scrollTop);
    this.popup.show();
}

Popup.onMouseOutHandler = function(e)
{
    if (e == null) e = window.event;
    this.popup.hide();
}



//  This is used to create InfoPopup box to display product status at store pages
  function createToolTip( obj, message ) {
    var messageHtml = "<table><tr><td>"+ message + "</td></tr></table>";
    Popup.createPopup( obj, messageHtml);
  }

/*--CAlbumInfo---*/

/*--CPictureInfo.js---*/

//this is used by orderReprint popup to show warning icon (is reprintable) and to display aps icon
var CAlbumInfo = new _CAlbumInfo(null, null, null, null , null, null, null) ;

_CAlbumInfo.prototype.getInstance = _CAlbumInfo_getInstance ;
_CAlbumInfo.prototype.getID = _CAlbumInfo_getID ;
_CAlbumInfo.prototype.getCaption = _CAlbumInfo_getCaption ;
_CAlbumInfo.prototype.getTnUrl = _CAlbumInfo_getTnUrl ;
_CAlbumInfo.prototype.getTnSrc = _CAlbumInfo_getTnSrc ;
_CAlbumInfo.prototype.getBgImg = _CAlbumInfo_getBgImg ;
_CAlbumInfo.prototype.getOwnerName = _CAlbumInfo_getOwnerName ;
_CAlbumInfo.prototype.isShare = _CAlbumInfo_isShare ;


function _CAlbumInfo(albumID, caption, tnurl, tnsrc, bgimg, ownerName, isShare)
{
    this.m_albumID = albumID ;
    this.m_albumCaption = caption ;
    this.m_tnUrl = tnurl ;
    this.m_tnSrc = tnsrc ;
    this.m_bgImg = bgimg ;
    this.m_ownerName = ownerName ;
    this.m_isShare = isShare ;

    return this ;
}

function _CAlbumInfo_getInstance(albumID,  caption, tnurl, tnsrc, bgimg, ownerName, isShare)
{
  return new _CAlbumInfo(albumID,  caption, tnurl, tnsrc, bgimg, ownerName, isShare);
}

function _CAlbumInfo_getID()
{
    return this.m_albumID ;
}   //end of function

function _CAlbumInfo_getCaption()
{
    return this.m_albumCaption ;
}   //end of function

function _CAlbumInfo_getTnUrl()
{
    return this.m_tnUrl ;
}   //end of function

function _CAlbumInfo_getTnSrc()
{
    return this.m_tnSrc ;
}   //end of function

function _CAlbumInfo_getBgImg()
{
    return this.m_bgImg ;
}   //end of function

function _CAlbumInfo_isShare()
{
    return this.m_isShare ;
}   //end of function

function _CAlbumInfo_getOwnerName()
{
    return this.m_ownerName ;
}   //end of function


/*--CUtils.js----*/

var CUtils = new _CUtils() ;

/*
 * Constructor of CUtils
 * @author Vijay Gatadi
 * @create-date : 07/07/2001
 */
function _CUtils()
{
    this.trim = _CUtils_trim ;
    this.isEmpty = _CUtils_isEmpty ;
    this.getElementById = _CUtils_getElementById;
    this.replaceAll = _CUtils_replaceAll;

    return this ;
}   //end of _CUtils


function _CUtils_isEmpty(str)
{
    if(str) str += ""; // convert it as string

    if( str == null || str.length == 0) {
        return true ;
    }   //end of if

    for( var i=0 ; i<str.length; i++){
        if(str.charAt(i) != ' ')
            return false ;
    }  //end of for

    return true ;

}  //end of _CUtils_isEmpty(str)




function _CUtils_trim(str)
{
    if(!str) return "" ;

    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');

}   //end of _CUtils_trim(String)

function  _CUtils_getElementById(str)
{
    if(navigator.appName == "Microsoft Internet Explorer" && navigator.userAgent.toLowerCase().indexOf("mac") > -1)
    return eval("document.all." + str);
    else
    return document.getElementById(str);
}

// This is to replae all the str1 in mainStr with str2. This is just like replaceAll in java String object
function  _CUtils_replaceAll(mainStr,str1,str2)
{
    var i = mainStr.indexOf(str1);
    var c = mainStr;
    while (i > -1)
    {
        c = c.replace(str1, str2);
        i = c.indexOf(str1);
    }
    return c;
}


/*---Comments---*/
function viewCredits(creditsurl)
{
    setWindowProperties('scrollbars=yes,width=530,height=300,resizable=yes');
    openWindow(creditsurl);

    return false;
}

function checkOccurences(inputString,maxLimit)
{
   var occurences= inputString.split("@") ;
   if ( occurences.length - 1 > maxLimit )
   {
      alert("You have reached the limit("+maxLimit +") on the number of shared email addresses that you can send to at one time.")
      return  false;
    }
    return true;
}
function hasSpamKeyword(inputString, spamKeywords)
{

    if (spamKeywords != null && inputString != null)
    {
         var lowInputString= inputString.toLowerCase();
         var aSPAM=spamKeywords.split(",");
         for(i=0; i < aSPAM.length; i++)
         {
           if (lowInputString.indexOf(aSPAM[i]) > -1)
            return true;
         }
    }
    return false;
}


function getCropJournal(pictWidth,pictHeight,cropToAspectRatio,cropType)
{
  //String strJournalca = COrderUtils.getCrop(pictWidth,pictHeight,cropToAspectRatio,CResolutionManager.getCropType(upc,websiteInfo)) ;
  var strJournalca = "";
  var crop1, crop2;
  var width , height ;
  var isLandscape = pictWidth > pictHeight;

  var dblaspectRatio = (cropToAspectRatio >= 1.0) ? cropToAspectRatio : 1.0 / cropToAspectRatio;

  //for lanscape tiled
  if (cropType == 0 && !isLandscape)
  {
      width = pictWidth ;
      height = pictWidth / dblaspectRatio ;
      crop1 = (pictHeight - height )/(2.0*pictHeight) ;
      crop2 = 1 - crop1;
      strJournalca = "/ca=" + crop1 + ",0,"  + crop2 + ",1";
      return strJournalca ;
  } //for portrait tiled
  else if(cropType == 1 && isLandscape){
      height = pictHeight ;
      width = pictHeight / dblaspectRatio ;
      crop1 = (pictWidth - width )/(2.0*pictWidth) ;
      crop2 = 1 - crop1;
      strJournalca = "/ca=" + "0," + crop1 + ",1," + crop2 ;
      return strJournalca ;
  }  //for naormal cropping
  else
  {
      return __getCrop(pictWidth, pictHeight, cropToAspectRatio) ;
  }

}

function __getCrop( pictWidth, pictHeight, aspectRatio)
{
  var isLandscape = true;
  var strJournalca = "";
  var crop1, crop2;
  var dblaspectRatio = (aspectRatio >= 1.0) ? aspectRatio : 1.0 / aspectRatio;

  if (pictHeight > pictWidth) {
      isLandscape = false;
  }
  if (isLandscape) {
      crop1 = (pictWidth - (pictHeight * dblaspectRatio))
      / (2.0 * pictWidth);
      if (crop1 < 0) {
          crop1 = (pictHeight - (pictWidth / dblaspectRatio))
          / (2.0 * pictHeight);
          isLandscape = false;
      }
      crop2 = 1 - crop1;
  } else {
      crop1 = (pictHeight - (pictWidth * dblaspectRatio))
      / (2.0 * pictHeight);
      if (crop1 < 0) {
          crop1 = (pictWidth - (pictHeight / dblaspectRatio))
          / (2.0 * pictWidth);
          isLandscape = true;
      }
      crop2 = 1 - crop1;
  }

  if (isLandscape) {
      strJournalca = "/ca=" + "0," + crop1 + ",1," + crop2;
  } else {
      strJournalca = "/ca=" + crop1 + ",0," + crop2 + ",1";
  }
  return strJournalca;
}

function getFinalCrop( strca1, strca2)
{
  if (strca1 == null && strca2 == null)
      return "";
  else if (strca1 == null || strca1 == "")
      return strca2;
  else if (strca2 == null || strca2 == "")
      return strca1;
  else {
      var indexOfCa1 = strca1.indexOf("ca");

      var indexOfCa2 = strca2.indexOf("ca");

      var finalCrop = "";

      if (indexOfCa1 != -1 && indexOfCa2 != -1) {

          var strArrayofcas1 = strca1.substring(indexOfCa1 + 3).split(",");
          var strArrayofcas2 = strca2.substring(indexOfCa2 + 3).split(",");
          var dblfirstCrop = new Array();
          var dblSecondCrop = new Array();
          var finalcrop = new Array();
          for (var i = 0; i < strArrayofcas1.length
                && i < strArrayofcas2.length; i++) {
              dblfirstCrop[i] = parseFloat(strArrayofcas1[i]);
              dblSecondCrop[i] = parseFloat(strArrayofcas2[i]);
          }


          /*
           *
           * finalcrop[0] = 1 - (1-dblfirstCrop[0]) * (1-dblSecondCrop[0]) ;
           * finalcrop[1] = 1 - (1-dblfirstCrop[1]) * (1-dblSecondCrop[1]) ;
           * finalcrop[2] = dblfirstCrop[2] * dblSecondCrop[2] ;
           * finalcrop[3] = dblfirstCrop[3] * dblSecondCrop[3] ;
           */

          finalcrop[0] = dblfirstCrop[0] + dblSecondCrop[0]
                                                         * (dblfirstCrop[2] - dblfirstCrop[0]);
          finalcrop[1] = dblfirstCrop[1] + dblSecondCrop[1]
                                                         * (dblfirstCrop[3] - dblfirstCrop[1]);
          finalcrop[2] = dblfirstCrop[2] - (1.0 - dblSecondCrop[2]) * (dblfirstCrop[2] - dblfirstCrop[0]);

          finalcrop[3] = dblfirstCrop[3] - (1.0 - dblSecondCrop[3]) * (dblfirstCrop[3] - dblfirstCrop[1]);



          finalCrop = "/ca=" + finalcrop[0] + "," + finalcrop[1] + "," + finalcrop[2] + "," + finalcrop[3];

      }

      return finalCrop;
  }
}
function getFinalJournal(oldjournal, strJournalca)
{
  //COrderUtils.getFinalJournal(journal,strJournalca) ;

    var finalJournal = "";
    var ca = null;
    var rf = null;
    var of = null;
    var strfinalca = null;
    var angle = 0;

    var ht_rotation_journal = Hashtable.getInstance();

    ht_rotation_journal.put("cw", "270");
    ht_rotation_journal.put("ccw", "90");
    ht_rotation_journal.put("ud", "180");

    var ht_other_journal = Hashtable.getInstance();

    if (oldjournal == null) {
        oldjournal = "";
    }
    if (strJournalca == null) {
        strJournalca = "";
    }
    var journal = oldjournal;
    var jounalSplits = journal.split("/");
    var flipHorizontal = null;
    for (var i = 0; i < jounalSplits.length; i++) {
        var pair = jounalSplits[i].split("=");
        if (pair.length == 2) {

            if (CUtils.trim(pair[0]) == "rf")
            {
                var rotation = ht_rotation_journal.get(pair[1]);
                if (rotation != null) {
                    angle += parseInt(rotation);
                    if (flipHorizontal != null) {
                        angle += 180;
                    }
                } else {    /* Added by Vinod Gatadi to handle rendering of flipped & rotated images
                               for which rf=90.0,fp and is to be made as rf=fh/rf=cw    */
                    if(pair[1].indexOf("90") >= 0 ){
                        angle += 90 ; flipHorizontal = "fh" ;
                    }else if (pair[1].indexOf("270") >= 0){
                        angle += 270 ; flipHorizontal = "fh" ;
                    }else if ( pair[1] == "fv" ){
                        angle += 180 ; flipHorizontal = "fh" ;
                    }else {
                        flipHorizontal = "fh" ;
                    }
                }
            } else if (CUtils.trim(pair[0]) =="ca") {
                ca = pair[1];
            } else if (CUtils.trim(pair[0]) == "of") {
                of = pair[1];
            } else {
                ht_other_journal.put(pair[0], pair[1]);

            }
        }
    }

    angle = angle % 360;

    if (angle == 90)
        rf = "ccw";
    if (angle == 180)
        rf = "ud";
    if (angle == 270)
        rf = "cw";

    for (var e = ht_other_journal.keys(); e.hasMoreElements();) {
        var key = e.nextElement();
        finalJournal += "/" + key + "=" + ht_other_journal.get(key);
    }

    if (ca != null) {
        strfinalca = "/ca=" + ca;
    }
    if (strJournalca != null && strJournalca != "") {
        strJournalca = "/ca=" + __shift(strJournalca.substring("/ca=".length), angle);
        strfinalca = getFinalCrop(strfinalca, strJournalca);
    }
    if (strfinalca != null) {

        //strfinalca = shift(strfinalca.substring ("/ca=".length()),
        // angle);
        //finalJournal = finalJournal + "/ca=no/ca=" + strfinalca ;
        finalJournal = finalJournal + "/ca=no/" + strfinalca;
    }

    if (rf != null) {
        finalJournal = finalJournal + "/rf=" + rf;
    }

    if (flipHorizontal != null) {
        finalJournal = finalJournal + "/rf=" + flipHorizontal;
    }

    if (of != null) {
        finalJournal = finalJournal + "/of=" + of;
    }

    return finalJournal;
}// end of function

function __shift(ca, rotationAngle)
{
  if (ca == null) {
      return "";
  }
  var caAsAnArrayOfStrings = ca.split(",");
  var caAsAnArray = new Array() ;
  caAsAnArray[0] = parseFloat(caAsAnArrayOfStrings[0]) ;
  caAsAnArray[1] = parseFloat(caAsAnArrayOfStrings[1]) ;
  caAsAnArray[2] = parseFloat(caAsAnArrayOfStrings[2]) ;
  caAsAnArray[3] = parseFloat(caAsAnArrayOfStrings[3]) ;
    //{ parseFloat(caAsAnArrayOfStrings[0]), parseFloat(caAsAnArrayOfStrings[1]),  parseFloat(caAsAnArrayOfStrings[2]),  parseFloat(caAsAnArrayOfStrings[3]) };
  //shift ca parameters (top,left,bottom, right)
  if (caAsAnArray.length == 4) {
      switch (rotationAngle) {
      case 90:
        caAsAnArray = new Array() ;
        caAsAnArray[0] = parseFloat(caAsAnArrayOfStrings[1]) ;
        caAsAnArray[1] = parseFloat(1 - caAsAnArrayOfStrings[2]) ;
        caAsAnArray[2] = parseFloat(caAsAnArrayOfStrings[3]) ;
        caAsAnArray[3] = parseFloat(1 - caAsAnArrayOfStrings[0]) ;
        /*
        caAsAnArray = { caAsAnArray[1],
              1 - caAsAnArray[2], caAsAnArray[3], 1 - caAsAnArray[0] };
        */
          break;
      case 180:
        caAsAnArray = new Array() ;
        caAsAnArray[0] = parseFloat(1 - caAsAnArrayOfStrings[2]) ;
        caAsAnArray[1] = parseFloat(1 - caAsAnArrayOfStrings[3]) ;
        caAsAnArray[2] = parseFloat(1 - caAsAnArrayOfStrings[0]) ;
        caAsAnArray[3] = parseFloat(1 - caAsAnArrayOfStrings[1]) ;
        /*
          caAsAnArray = { 1 - caAsAnArray[2],
              1 - caAsAnArray[3], 1 - caAsAnArray[0],
              1 - caAsAnArray[1] };
              */
          break;
      case 270:
        caAsAnArray = new Array() ;
        caAsAnArray[0] = parseFloat(1 - caAsAnArrayOfStrings[3]) ;
        caAsAnArray[1] = parseFloat(caAsAnArrayOfStrings[0]) ;
        caAsAnArray[2] = parseFloat(1 - caAsAnArrayOfStrings[1]) ;
        caAsAnArray[3] = parseFloat(caAsAnArrayOfStrings[2]) ;
          /*
          caAsAnArray = { 1 - caAsAnArray[3],
              caAsAnArray[0], 1 - caAsAnArray[1], caAsAnArray[2] };
              */
          break;
      }
      ca = caAsAnArray[0] + "," + caAsAnArray[1] + "," + caAsAnArray[2]
                                                                     + "," + caAsAnArray[3];
  }

  return ca;
}// end of function

function trimJournalParams( strJournal, strParam)
{
    //journal = pdcResolutions.trimJournalParams(journal,"of") ;

  var trimJournal = __trimJournalParam(strJournal , strParam ) ;
  if(trimJournal.toLowerCase() ==  (__trimJournalParam(trimJournal , strParam ).toLowerCase()) )
    return trimJournal.toLowerCase() ;
  else
    return trimJournalParams(trimJournal,strParam ) ;
}

function __trimJournalParam( strJournal, strParam)
{

  var trimJournal = "" ;
  if(strJournal == null || strJournal == "" )
      return CUtils.trim(trimJournal) ;
  var indexParam = strJournal.indexOf (strParam) ;
  if(indexParam == -1)
      return CUtils.trim(strJournal) ;
  trimJournal = strJournal.substring (0, indexParam != 0 ? indexParam-1 : indexParam) ;
  var slashIndex = strJournal.indexOf ("/",indexParam) ;
  if(slashIndex == -1 )
      return CUtils.trim(trimJournal);
  else
      return CUtils.trim(trimJournal + strJournal.substring (slashIndex,strJournal.length )) ;

}

/* Adds a bookmark to browser - ie + firefox  */
function bookmark(title,url){


if(window.sidebar){ // Firefox

    window.sidebar.addPanel(title, url,'');

  }else if(window.opera){ //Opera

    var a = document.createElement("A");
    a.rel = "sidebar";
    a.target = "_search";
    a.title = title;
    a.href = url;
    a.click();
  } else if(document.all){ //IE
    window.external.AddFavorite(url, title);
  }else { 
      alert("Sorry! Your browser doesn't appear to support this function."); 
  } 

}

function objectToString(obj, str, tabCount)
{
  if(!obj) return undefined;

  if(!str) str = "" ;
  if(!tabCount) tabCount = 1;

  var tabs = "";
  for(var i=0; i<tabCount; i++)
  {
    tabs +="\t";
  }

  for(var prop in obj)
  {
    str += tabs + prop + ": ";
    if(  typeof(obj[prop]) == "object" || typeof(obj[prop]) == "array")
      str +=  "\n" + objectToString(obj[prop], "", ++tabCount);
    else
      str += obj[prop];
    str +="\n";
  }
  return str;
}

function isLowResolution(editJournal, layoutWidth, layoutHeight, highResolutionWidth, highResolutionHeight,dpi)
{
  var resolution = extractImageResolution(editJournal, layoutWidth, layoutHeight,
                                            highResolutionWidth, highResolutionHeight,dpi);
  //dpi warning if resolution less than 148
  return ( resolution<148 );

}


function extractImageResolution(editJournal, layoutWidth, layoutHeight, highResolutionWidth, highResolutionHeight,dpi)
{
  var rotatedWidth ;
  var rotatedHeight ;
  var journaledPixelWidth;
  var journaledPixelHeight;
  if(!editJournal) editJournal = "" ;


  {
    var cropArray = extractCrop(editJournal).split(",");
    var cropLeft = cropArray[1];
    var cropRight = cropArray[3];
    var cropTop = cropArray[0];
    var cropBottom = cropArray[2];

    var journalWidth = cropRight - cropLeft;
    var journalHeight = cropBottom - cropTop;
    var rotateAngle = extractRotateAngle(editJournal);

    //calculate journaled height and width of image
    journaledPixelWidth = highResolutionWidth*journalWidth;
    journaledPixelHeight = highResolutionHeight*journalHeight;

    if(rotateAngle == 90 || rotateAngle == 270)
    {
      rotatedWidth = journaledPixelHeight;
      rotatedHeight = journaledPixelWidth;
    }
    else
    {
      rotatedWidth = journaledPixelWidth;
      rotatedHeight = journaledPixelHeight;
    }
  }
  return calcualteResolution(layoutWidth, layoutHeight, rotatedWidth, rotatedHeight,dpi);
}

function extractRotateAngle(editJournal)
{
  var retVal = extractJournalValue("rf",editJournal);

  return isNaN(retVal) || !retVal ? 0 : retVal;
}

function extractCrop(editJournal)
{
  if(CUtils.isEmpty(editJournal)) return "0,0,1,1" ;

  return extractJournalValue("ca",editJournal);
}

function extractJournalValue(key,editJournal)
{
  var keyIndex = editJournal.lastIndexOf(key);
  var retVal = "";

  if(keyIndex>-1)
  {
    var valueString = editJournal.substring(keyIndex, editJournal.length);
    var endIndex = valueString.indexOf("/");
    if(endIndex == -1)
    {
    	endIndex = valueString.indexOf("$");
    }
    endIndex = (endIndex==-1) ? valueString.length : endIndex;

    retVal = valueString.substring(3, endIndex);
  }

  return retVal;
}



function calcualteResolution(layoutWidth, layoutHeight, photoWidth, photoHeight,dpi)
{
  //make aspect ratio of image match aspect ratio of print

  var printedWidth = layoutWidth/dpi;
  var printedHeight = layoutHeight/dpi;
  var adjustedPhotoHeight = photoWidth * (printedHeight/printedWidth);
  //calculate dpi

  //return Math.sqrt( (adjustedPhotoHeight*photoWidth)/(printedHeight*printedWidth) );
  //since the aspect ratios will always match we can do this instead of what it above...

  return adjustedPhotoHeight/printedHeight;
}

var bugchars = '!#$^&*()+|}{[]?><~%:;/,=`"\'';

function isBugCharacter(s)
{   
    var i;
    var lchar="";
    // Search through string's characters one by one.
    // If character is not in bag.
    for (i = 0; i < s.length; i++)
    {   
        // Check that current character isn't whitespace.
        var c = s.charAt(i);
		    if(i>0)lchar=s.charAt(i-1)
        if (bugchars.indexOf(c) != -1 || (lchar=="." && c==".")) return false;
    }
    return true;
}

function isInteger(s)
{   
    var i;
    for (i = 0; i < s.length; i++)
    {   
        // Check that current character is not a number.
        var c = s.charAt(i);
        if ((c >= "0") && (c <= "9") && (c != ".")) return false;
    }
    // All characters are numbers.
    return true;
}


function isEmailValid(str) {

  	var at="@" ;
		var dot="." ;
		var lat=str.indexOf(at) ;
		var lstr=str.length ;
		var ldot=str.indexOf(dot) ;
		var lastdot=str.lastIndexOf(dot) ;
		if (str.indexOf(at)==-1){
		   return false ;
		}
		if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
		   return false ;
		}
		if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr || str.substring(lastdot+1)==""){
		    return false ;
		}
		 
		 if (str.indexOf(at,(lat+1))!=-1){
		    return false ;
		 }

		 if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
		    return false ;
		 }

		 if (str.indexOf(dot,(lat+2))==-1){
		    return false ;
		 }
		
		 if (str.indexOf(" ")!=-1){
		    return false ;
		 }
		if(isBugCharacter(str)==false){
		    return false; 
		 }
		 var arrEmail=str.split("@")
		 var ldot=arrEmail[1].indexOf(".")
		 /*if(isInteger(arrEmail[1].substring(ldot+1))==false){
		    return false ;
		 }*/
 		 return true	;

	}
	
	
	(function(){
	var c = function(input, length, result){
		for(var i = 0; i < length; i += 3){
			result.push(
				String.fromCharCode((input[i] >>> 2) + 33),
				String.fromCharCode(((input[i] & 3) << 4) + (input[i + 1] >>> 4) + 33),
				String.fromCharCode(((input[i + 1] & 15) << 2) + (input[i + 2] >>> 6) + 33),
				String.fromCharCode((input[i + 2] & 63) + 33)
			);
		}
	};
	
	encode = function(input){
		// summary: encodes input data in easy64 string
		// input: Array: an array of numbers (0-255) to encode
		var result = [], reminder = input.length % 3, length = input.length - reminder;
		c(input, length, result);
		if(reminder){
			var t = input.slice(length);
			while(t.length < 3){ t.push(0); }
			c(t, 3, result);
			for(var i = 3; i > reminder; result.pop(), --i);
		}
		return result.join("");	// String
	};

	decode = function(input){
		// summary: decodes the input string back to array of numbers
		// input: String: the input string to decode
		var n = input.length, r = [], b = [0, 0, 0, 0], i, j, d;
		for(i = 0; i < n; i += 4){
			for(j = 0; j < 4; ++j){ b[j] = input.charCodeAt(i + j) - 33; }
			d = n - i;
			for(j = d; j < 4; b[++j] = 0);
			r.push(
				(b[0] << 2) + (b[1] >>> 4),
				((b[1] & 15) << 4) + (b[2] >>> 2),
				((b[2] & 3) << 6) + b[3]
			);
			for(j = d; j < 4; ++j, r.pop());
		}
		return r;
	};
})();

var s2b = function(s){
		var b = [];
		if(s)
		{
			for(var i = 0; i < s.length; ++i){
				b.push(s.charCodeAt(i));
			}
		}
		return b;
	};
	
var b2s = function(b){
		var s = [];		
		var bA=new Array();
		bA=b;		
		for(var i=0;i<bA.length;i++){
		  s.push(String.fromCharCode(bA[i]));
		}
		return s.join("");
	}
	
	
	
function trackPublisherApp(sObj, linkName, url){
    setTimeout(function(){__trackNav( sObj, linkName);}, 500);
    setTimeout(function(){ document.location.href=url ;}, 1000);
}
function __trackNav(sObj, linkName){
    if(typeof s != null && typeof s != 'undefined')
    {
        s.linkTrackVars='eVar54,events';
        s.linkTrackEvents = 'event45';
        s.events='event45';
        s.eVar54 = s.pageName;
        s_objectID = linkName ;
        s.tl(this, 'o', linkName);
        s.events = '' ;
        s.eVar54 = '' ;
    }

}

