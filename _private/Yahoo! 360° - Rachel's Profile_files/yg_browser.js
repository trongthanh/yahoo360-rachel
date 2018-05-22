<!--
/* Browser object */
function yg_Browser(){
 d=document;
 this.agt=navigator.userAgent.toLowerCase();
 this.major=parseInt(navigator.appVersion);
 this.dom=(d.getElementById);
 this.ns=(d.layers);
 this.ns4up=(this.ns && this.major>=4);
 this.ns6=(this.dom&&navigator.appName=="Netscape");
 this.op=(window.opera);
 this.ie=(d.all);
 this.ie4=(d.all&&!this.dom);
 this.ie4up=(this.ie&&this.major>=4);
 this.ie5=(d.all&&this.dom);
 this.ie6=(d.nodeType);
 this.sf=(this.agt.indexOf("safari")!=-1);
 this.win=((this.agt.indexOf("win")!=-1)||(this.agt.indexOf("16bit")!=-1));
 this.winme=(this.agt.indexOf("win 9x 4.90")!=-1);
 this.xpsp2=(this.agt.indexOf("sv1")!=-1);
 this.mac=(this.agt.indexOf("mac")!=-1);
}
var oBw=new yg_Browser();
//-->

/*
     FILE ARCHIVED ON 08:53:55 Apr 09, 2009 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 00:05:21 May 22, 2018.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  LoadShardBlock: 672.493 (3)
  esindex: 0.006
  captures_list: 718.25
  CDXLines.iter: 17.78 (3)
  PetaboxLoader3.datanode: 699.716 (4)
  exclusion.robots: 0.196
  exclusion.robots.policy: 0.184
  RedisCDXSource: 12.874
  load_resource: 51.419
*/