var CreateAmtRedirect=function(e,c){var A={};function T(e){return String.fromCharCode.apply(null,e)}function U(e){for(var t="",n=0;n<e;n++)t+="abcdef0123456789".charAt(Math.floor(16*Math.random()));return t}return((A.m=e).parent=A).authCookie=c,A.State=0,A.socket=null,A.host=null,A.port=0,A.user=null,A.pass=null,A.authuri="/RedirectionService",A.tlsv1only=0,A.inDataCount=0,A.connectstate=0,A.protocol=e.protocol,A.acc=null,A.amtsequence=1,A.amtkeepalivetimer=null,A.onStateChanged=null,A.Start=function(e,t,n,r,a){A.host=e,A.port=t,A.user=n,A.pass=r,A.connectstate=0,A.inDataCount=0;var o=window.location.protocol.replace("http","ws")+"//"+window.location.host+window.location.pathname.substring(0,window.location.pathname.lastIndexOf("/"))+"/webrelay.ashx?p=2&host="+e+"&port="+t+"&tls="+a+("*"==n?"&serverauth=1":"")+(void 0===r?"&serverauth=1&user="+n:"");null!=c&&""!=c&&(o+="&auth="+c),A.socket=new WebSocket(o),A.socket.binaryType="arraybuffer",A.socket.onopen=A.xxOnSocketConnected,A.socket.onmessage=A.xxOnMessage,A.socket.onclose=A.xxOnSocketClosed,A.xxStateChange(1)},A.xxOnSocketConnected=function(){A.xxStateChange(2),1==A.protocol&&A.directSend(new Uint8Array([16,0,0,0,83,79,76,32])),2==A.protocol&&A.directSend(new Uint8Array([16,1,0,0,75,86,77,82])),3==A.protocol&&A.directSend(new Uint8Array([16,0,0,0,73,68,69,82]))},A.xxOnMessage=function(e){if(e.data&&-1!=A.connectstate){if(A.inDataCount++,1==A.connectstate&&(2==A.protocol||3==A.protocol))return A.m.ProcessBinaryData?A.m.ProcessBinaryData(e.data):A.m.ProcessData(T(e.data));if(null==A.acc)A.acc=e.data;else{var t=new Uint8Array(A.acc.byteLength+e.data.byteLength);t.set(new Uint8Array(A.acc),0),t.set(new Uint8Array(e.data),A.acc.byteLength),A.acc=t.buffer}for(;null!=A.acc&&1<=A.acc.byteLength;){var n=0,r=new Uint8Array(A.acc);switch(r[0]){case 17:if(r.byteLength<4)return;switch(r[1]){case 0:if(r.byteLength<13)return;var a=r[12];if(r.byteLength<13+a)return;A.directSend(new Uint8Array([19,0,0,0,0,0,0,0,0])),n=13+a;break;default:A.Stop(1)}break;case 20:if(r.byteLength<9)return;var o=new DataView(A.acc).getUint32(5,!0);if(r.byteLength<9+o)return;var c=r[1],s=r[4],l=[];for(i=0;i<o;i++)l.push(r[9+i]);var h=new Uint8Array(A.acc.slice(9,9+o));if(n=9+o,0==s)0<=l.indexOf(4)?A.xxSend(String.fromCharCode(19,0,0,0,4)+IntToStrX(A.user.length+A.authuri.length+8)+String.fromCharCode(A.user.length)+A.user+String.fromCharCode(0,0)+String.fromCharCode(A.authuri.length)+A.authuri+String.fromCharCode(0,0,0,0)):0<=l.indexOf(3)?A.xxSend(String.fromCharCode(19,0,0,0,3)+IntToStrX(A.user.length+A.authuri.length+7)+String.fromCharCode(A.user.length)+A.user+String.fromCharCode(0,0)+String.fromCharCode(A.authuri.length)+A.authuri+String.fromCharCode(0,0,0)):0<=l.indexOf(1)?A.xxSend(String.fromCharCode(19,0,0,0,1)+IntToStrX(A.user.length+A.pass.length+2)+String.fromCharCode(A.user.length)+A.user+String.fromCharCode(A.pass.length)+A.pass):A.Stop(2);else if(3!=s&&4!=s||1!=c)if(0==c)switch(A.protocol){case 1:A.xxSend(String.fromCharCode(32,0,0,0)+IntToStrX(A.amtsequence++)+ShortToStrX(1e4)+ShortToStrX(100)+ShortToStrX(0)+ShortToStrX(1e4)+ShortToStrX(100)+ShortToStrX(0)+IntToStrX(0));break;case 2:A.directSend(new Uint8Array([64,0,0,0,0,0,0,0]));break;case 3:A.connectstate=1,A.xxStateChange(3)}else A.Stop(3);else{var u=0,S=h[u],d=T(new Uint8Array(h.buffer.slice(u+1,u+1+S))),f=h[u+=S+1],g=T(new Uint8Array(h.buffer.slice(u+1,u+1+f)));u+=f+1;var C=0,m=null,x=U(32),y="00000002",b="";4==s&&(C=h[u],m=T(new Uint8Array(h.buffer.slice(u+1,u+1+C))),u+=C+1,b=y+":"+x+":"+m+":");var p=hex_md5(hex_md5(A.user+":"+d+":"+A.pass)+":"+g+":"+b+hex_md5("POST:"+A.authuri)),k=A.user.length+d.length+g.length+A.authuri.length+x.length+y.length+p.length+7;4==s&&(k+=m.length+1);var w=String.fromCharCode(19,0,0,0,s)+IntToStrX(k)+String.fromCharCode(A.user.length)+A.user+String.fromCharCode(d.length)+d+String.fromCharCode(g.length)+g+String.fromCharCode(A.authuri.length)+A.authuri+String.fromCharCode(x.length)+x+String.fromCharCode(y.length)+y+String.fromCharCode(p.length)+p;4==s&&(w+=String.fromCharCode(m.length)+m),A.xxSend(w)}break;case 33:if(r.byteLength<23)break;n=23,A.xxSend(String.fromCharCode(39,0,0,0)+IntToStrX(A.amtsequence++)+String.fromCharCode(0,0,27,0,0,0)),1==A.protocol&&(A.amtkeepalivetimer=setInterval(A.xxSendAmtKeepAlive,2e3)),A.connectstate=1,A.xxStateChange(3);break;case 41:if(r.byteLength<10)break;n=10;break;case 42:if(r.byteLength<10)break;var v=10+(r[9]<<8)+r[8];if(r.byteLength<v)break;A.m.ProcessBinaryData?A.m.ProcessBinaryData(new Uint8Array(r.buffer.slice(10,v))):A.m.ProcessData(T(new Uint8Array(r.buffer.slice(10,v)))),n=v;break;case 43:if(r.byteLength<8)break;n=8;break;case 65:if(r.byteLength<8)break;A.connectstate=1,A.m.Start(),8<r.byteLength&&(A.m.ProcessBinaryData?A.m.ProcessBinaryData(new Uint8Array(r.buffer.slice(8))):A.m.ProcessData(T(new Uint8Array(r.buffer.slice(8))))),n=r.byteLength;break;case 240:A.serverIsRecording=!0,n=1;break;default:return console.log("Unknown Intel AMT command: "+r[0]+" acclen="+r.byteLength),void A.Stop(4)}if(0==n)return;n!=A.acc.byteLength?A.acc=A.acc.slice(n):A.acc=null}}},A.directSend=function(e){try{A.socket.send(e.buffer)}catch(e){}},A.xxSend=function(e){if(null!=A.socket&&A.socket.readyState==WebSocket.OPEN){for(var t=new Uint8Array(e.length),n=0;n<e.length;++n)t[n]=e.charCodeAt(n);try{A.socket.send(t.buffer)}catch(e){}}},A.Send=A.send=function(e){null!=A.socket&&1==A.connectstate&&(1==A.protocol?A.xxSend(String.fromCharCode(40,0,0,0)+IntToStrX(A.amtsequence++)+ShortToStrX(e.length)+e):A.xxSend(e))},A.xxSendAmtKeepAlive=function(){null!=A.socket&&A.xxSend(String.fromCharCode(43,0,0,0)+IntToStrX(A.amtsequence++))},A.xxOnSocketClosed=function(){0==A.inDataCount&&0==A.tlsv1only?(A.tlsv1only=1,A.socket=new WebSocket(window.location.protocol.replace("http","ws")+"//"+window.location.host+window.location.pathname.substring(0,window.location.pathname.lastIndexOf("/"))+"/webrelay.ashx?p=2&host="+A.host+"&port="+A.port+"&tls="+A.tls+"&tls1only=1"+("*"==A.user?"&serverauth=1":"")+("undefined"==typeof pass?"&serverauth=1&user="+A.user:"")),A.socket.binaryType="arraybuffer",A.socket.onopen=A.xxOnSocketConnected,A.socket.onmessage=A.xxOnMessage,A.socket.onclose=A.xxOnSocketClosed):A.Stop(5)},A.xxStateChange=function(e){A.State!=e&&(A.State=e,A.m.xxStateChange(A.State),null!=A.onStateChanged&&A.onStateChanged(A,A.State))},A.Stop=function(e){A.xxStateChange(0),A.connectstate=-1,(A.acc=null)!=A.socket&&(A.socket.close(),A.socket=null),null!=A.amtkeepalivetimer&&(clearInterval(A.amtkeepalivetimer),A.amtkeepalivetimer=null)},A}