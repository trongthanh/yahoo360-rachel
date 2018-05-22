
function getPhotoID(src){var id=-1;if(!up_images)return id;for(var i=0;i<up_images.length;i++){if(up_images[i]==src)return i;}
if(id<0)return-1;}
function getFlashVersion(){var flashversion=0;if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){flashversion=x.description.replace(/([a-z]|[A-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split(".");}}else if(window.ActiveXObject){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");flashversion=axo.GetVariable("$version").split(" ")[1].split(",");}catch(e){}}
return flashversion;}
function detectFlash(vmj,vmi,vvr){var fv=getFlashVersion();if(!fv)return false;if(vmj>fv[0])return false;if(vmj<fv[0])return true;if(vmi>fv[1])return false;if(vmi<fv[1])return true;if(vvr>fv[2])return false;return true;}
isFlashOK=detectFlash(7,0,19);function initThumbnails(id,rotate,speed)
{var oPhotosMainContainer=document.getElementById(id);var oPhotosFullImg=document.getElementById(id+'-full');var oPhotosThumbContainer=document.getElementById(id+'-thumbs');var oImageWrap=document.getElementById('user-photos-wrap');if(avKey!=''&&oPhotosFullImg.src.indexOf(avKey)!=-1){if(isFlashOK){var strF='<OBJECT CLASSID="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" CODEBASE="https://web.archive.org/web/20090409085325/http://active.macromedia.com/flash5/cabs/swflash.cab#version=5,0,0,0" ID=movie WIDTH="190" HEIGHT="285"><param name="movie" value="';strF+=URL+'"><param name="play" value="true"><param name="quality" value="high"><param name="bgcolor" value="#ffffff" /><param name="scale" value="exactfit" /><param name="flashVars" value="zoom=';strF+=avZoom+'&avtkey='+avKey+'"><embed name="movie" src="';strF+=URL+'" quality="high" bgcolor="#ffffff" width="190" height="285"  flashVars="zoom=';strF+=avZoom+'&avtkey='+avKey+'" swLiveConnect=true align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="https://web.archive.org/web/20090409085325/http://www.macromedia.com/go/getflashplayer"/></OBJECT>';oImageWrap.innerHTML=strF;}}
if(oPhotosThumbContainer){var oPhotosThumbImgs=oPhotosThumbContainer.getElementsByTagName('IMG');for(var i=0;i<oPhotosThumbImgs.length;i++)
{oPhotosThumbImgs[i].onclick=rotatePhotosEvent;oPhotosThumbImgs[i].contId=id;}
oPhotosMainContainer.oPhotosFullImg=oPhotosFullImg;oPhotosMainContainer.oPhotosThumbContainer=oPhotosThumbContainer;oPhotosMainContainer.oPhotosThumbImgs=oPhotosThumbImgs;if(rotate)
{autoRotator(id,speed,-1);}}}
function rotatePhotosEvent(){rotatePhotos(this);}
function rotatePhotos(img){var oImageWrap=document.getElementById('user-photos-wrap');var oPhotosMainContainer=document.getElementById(img.contId);var curFullImg=oPhotosMainContainer.oPhotosFullImg;var newImgSrc=new Array();var curThumbFull=img.src;var curFullImgThumb=curFullImg.src;var newFullID=getPhotoID(curThumbFull);var newThumbID=getPhotoID(curFullImgThumb);curFullImg.src=curThumbFull;if(avKey!=''&&curThumbFull.indexOf(avKey)!=-1){if(isFlashOK){var strF='<OBJECT CLASSID="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" CODEBASE="https://web.archive.org/web/20090409085325/http://active.macromedia.com/flash5/cabs/swflash.cab#version=5,0,0,0" ID=movie WIDTH="190" HEIGHT="285"><PARAM NAME="movie" VALUE="';strF+=URL+'"><PARAM NAME="play" VALUE="true"><PARAM NAME="quality" VALUE="high"><param name="bgcolor" value="#ffffff" /><param name="scale" value="exactfit" /><param name="flashVars" value="zoom=';strF+=avZoom+'&avtkey='+avKey+'"><embed name="movie" src="';strF+=URL+'" quality="high" bgcolor="#ffffff" width="190" height="285"  flashVars="zoom=';strF+=avZoom+'&avtkey='+avKey+'" swLiveConnect=true align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="https://web.archive.org/web/20090409085325/http://www.macromedia.com/go/getflashplayer"/></OBJECT>';oImageWrap.innerHTML=strF;}else{oImageWrap.innerHTML='<img src="https://web.archive.org/web/20090409085325/http://img.avatars.yahoo.com/users/'+avKey+'.large.png" class="avatar" width="150" height="225">';}}else{oImageWrap.innerHTML='<img src="'+curThumbFull+'" width="'+up_sizes[newFullID]['bigw']+'" height="'+up_sizes[newFullID]['bigh']+'">';}
if(avKey!=''&&curFullImgThumb.indexOf(avKey)!=-1){img.src='https://web.archive.org/web/20090409085325/http://img.avatars.yahoo.com/users/'+avKey+'.medium.png';img.width=48;img.height=48;img.className='avatar';}else{img.src=curFullImgThumb;img.width=up_sizes[newThumbID]['thumbw'];img.height=up_sizes[newThumbID]['thumbh'];img.className='';}
return false;}
function autoRotator(id,speed,index){if(index!=-1)
{var oPhotosMainContainer=document.getElementById(id);if(index>=oPhotosMainContainer.oPhotosThumbImgs.length)index=0;var curThumb=oPhotosMainContainer.oPhotosThumbImgs[index];rotatePhotos(curThumb);}
index++;var spd=parseInt(speed);window.setTimeout("autoRotator('"+id+"','"+speed+"','"+index+"' )",spd);}
/*
     FILE ARCHIVED ON 08:53:25 Apr 09, 2009 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 00:05:21 May 22, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 444.8 (3)
  esindex: 0.01
  captures_list: 481.873
  CDXLines.iter: 14.706 (3)
  PetaboxLoader3.datanode: 527.512 (4)
  exclusion.robots: 0.254
  exclusion.robots.policy: 0.235
  RedisCDXSource: 4.029
  PetaboxLoader3.resolve: 176.331
  load_resource: 262.081
*/