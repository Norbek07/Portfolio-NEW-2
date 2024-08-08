/*!

Name: Reading Time
Dependencies: jQuery
Author: Michael Lynch
Author URL: http://michaelynch.com
Date Created: August 14, 2013
Date Updated: June 10, 2014
Licensed under the MIT license

*/
(function(e){e.fn.readingTime=function(t){if(!this.length){return this}var n={readingTimeTarget:".eta",wordCountTarget:null,wordsPerMinute:270,round:true,lang:"en",lessThanAMinuteString:"",prependTimeString:"",prependWordString:"",remotePath:null,remoteTarget:null};var r=this;var i=e(this);r.settings=e.extend({},n,t);var s=r.settings.readingTimeTarget;var o=r.settings.wordCountTarget;var u=r.settings.wordsPerMinute;var a=r.settings.round;var f=r.settings.lang;var l=r.settings.lessThanAMinuteString;var c=r.settings.prependTimeString;var h=r.settings.prependWordString;var p=r.settings.remotePath;var d=r.settings.remoteTarget;if(f=="it"){var v=l||"Meno di un minuto";var m="min"}else if(f=="fr"){var v=l||"Moins d'une minute";var m="min"}else if(f=="de"){var v=l||"Weniger als eine Minute";var m="min"}else if(f=="es"){var v=l||"Menos de un minuto";var m="min"}else if(f=="nl"){var v=l||"Minder dan een minuut";var m="min"}else{var v=l||"1 min";var m="min"}var g=function(t){var n=t.trim().split(/\s+/g).length;var r=u/60;var i=n/r;if(a===true){var f=Math.round(i/60)}else{var f=Math.floor(i/60)}var l=Math.round(i-f*60);if(a===true){if(f>0){e(s).text(c+f+" "+m)}else{e(s).text(c+v)}}else{var p=f+":"+l;e(s).text(c+p)}if(o!==""&&o!==undefined){e(o).text(h+n)}};i.each(function(){if(p!=null&&d!=null){e.get(p,function(t){g(e("<div>").html(t).find(d).text())})}else{g(i.text())}})}})(jQuery)