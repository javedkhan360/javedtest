// Garden Gnome Software - Skin
// Pano2VR 5.0.2/15080
// Filename: controller edited.ggsk
// Generated Thu Aug 2 22:49:12 2018

function pano2vrSkin(player,base) {
	var ggSkinVars = [];
	var me=this;
	var flag=false;
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=me.player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=[];
	this.elementMouseOver=[];
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	if (typeof document.body.style['transform'] == 'undefined') {
		for(var i=0;i<prefixes.length;i++) {
			if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
				cssPrefix='-' + prefixes[i].toLowerCase() + '-';
				domTransition=prefixes[i] + 'Transition';
				domTransform=prefixes[i] + 'Transform';
			}
		}
	}
	
	this.player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.preloadImages=function() {
		var preLoadImg=new Image();
		preLoadImg.src=basePath + './left__o.png';
		preLoadImg.src=basePath + './right__o.png';
		preLoadImg.src=basePath + './up__o.png';
		preLoadImg.src=basePath + './down__o.png';
		preLoadImg.src=basePath + './zoom_in__o.png';
		preLoadImg.src=basePath + './zoom_out__o.png';
		preLoadImg.src=basePath + './auto_rotate__o.png';
		preLoadImg.src=basePath + './fullscreen__o.png';
	}
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		this._loading_image=document.createElement('div');
		this._loading_image__img=document.createElement('img');
		this._loading_image__img.className='ggskin ggskin_image';
		this._loading_image__img.setAttribute('src',basePath + './loading_image.png');
		this._loading_image__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._loading_image__img.className='ggskin ggskin_image';
		this._loading_image__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._loading_image__img);
		this._loading_image.appendChild(this._loading_image__img);
		this._loading_image.ggId="loading image";
		this._loading_image.ggLeft=-112;
		this._loading_image.ggTop=-32;
		this._loading_image.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._loading_image.ggVisible=true;
		this._loading_image.className='ggskin ggskin_image ';
		this._loading_image.ggType='image';
		hs ='';
		hs+='height : 64px;';
		hs+='left : -112px;';
		hs+='position : absolute;';
		hs+='top : -32px;';
		hs+='visibility : inherit;';
		hs+='width : 224px;';
		this._loading_image.setAttribute('style',hs);
		this._loading_image.style[domTransform + 'Origin']='50% 50%';
		me._loading_image.ggIsActive=function() {
			return false;
		}
		me._loading_image.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._loading_image.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h/2) + 'px';
			}
		}
		this._loading_text=document.createElement('div');
		this._loading_text__text=document.createElement('div');
		this._loading_text.className='ggskin ggskin_textdiv';
		this._loading_text.ggTextDiv=this._loading_text__text;
		this._loading_text.ggId="loading text";
		this._loading_text.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._loading_text.ggVisible=true;
		this._loading_text.className='ggskin ggskin_text ';
		this._loading_text.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : 12px;';
		hs+='position : absolute;';
		hs+='top : 14px;';
		hs+='visibility : inherit;';
		hs+='width : 198px;';
		this._loading_text.setAttribute('style',hs);
		this._loading_text.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 198px;';
		hs+='height: 20px;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(0,0,0,1);';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		this._loading_text__text.setAttribute('style',hs);
		this._loading_text.ggUpdateText=function() {
			var hs="<b>Loading... "+(me.player.getPercentLoaded()*100.0).toFixed(0)+"%<\/b>";
			if (hs!=this.ggText) {
				this.ggText=hs;
				this.ggTextDiv.innerHTML=hs;
				if (this.ggUpdatePosition) this.ggUpdatePosition();
			}
		}
		me._loading_text.ggUpdateText();
		this._loading_text.appendChild(this._loading_text__text);
		me._loading_text.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._loading_text.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._loading_text.ggUpdatePosition=function () {
		}
		this._loading_image.appendChild(this._loading_text);
		this._loading_bar=document.createElement('div');
		this._loading_bar.ggId="loading bar";
		this._loading_bar.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._loading_bar.ggVisible=true;
		this._loading_bar.className='ggskin ggskin_rectangle ';
		this._loading_bar.ggType='rectangle';
		hs ='';
		hs+='background : #4f4f4f;';
		hs+='border : 2px solid #000000;';
		hs+='height : 10px;';
		hs+='left : 11px;';
		hs+='position : absolute;';
		hs+='top : 39px;';
		hs+='visibility : inherit;';
		hs+='width : 198px;';
		this._loading_bar.setAttribute('style',hs);
		this._loading_bar.style[domTransform + 'Origin']='0% 50%';
		me._loading_bar.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._loading_bar.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._loading_bar.ggUpdatePosition=function () {
		}
		this._loading_image.appendChild(this._loading_bar);
		this._loading_close=document.createElement('div');
		this._loading_close__img=document.createElement('img');
		this._loading_close__img.className='ggskin ggskin_image';
		this._loading_close__img.setAttribute('src',basePath + './loading_close.png');
		this._loading_close__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._loading_close__img.className='ggskin ggskin_image';
		this._loading_close__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._loading_close__img);
		this._loading_close.appendChild(this._loading_close__img);
		this._loading_close.ggId="loading close";
		this._loading_close.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._loading_close.ggVisible=true;
		this._loading_close.className='ggskin ggskin_image ';
		this._loading_close.ggType='image';
		hs ='';
		hs+='height : 24px;';
		hs+='left : 200px;';
		hs+='position : absolute;';
		hs+='top : 1px;';
		hs+='visibility : inherit;';
		hs+='width : 24px;';
		this._loading_close.setAttribute('style',hs);
		this._loading_close.style[domTransform + 'Origin']='50% 50%';
		me._loading_close.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._loading_close.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._loading_close.onclick=function () {
			me._loading_image.style[domTransition]='none';
			me._loading_image.style.visibility='hidden';
			me._loading_image.ggVisible=false;
		}
		this._loading_close.ggUpdatePosition=function () {
		}
		this._loading_image.appendChild(this._loading_close);
		this.divSkin.appendChild(this._loading_image);
		this._toolbar=document.createElement('div');
		this._toolbar.ggId="toolbar";
		this._toolbar.ggLeft=-138;
		this._toolbar.ggTop=-38;
		this._toolbar.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._toolbar.ggVisible=true;
		this._toolbar.className='ggskin ggskin_container ';
		this._toolbar.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='left : -138px;';
		hs+='position : absolute;';
		hs+='top : -38px;';
		hs+='visibility : inherit;';
		hs+='width : 277px;';
		this._toolbar.setAttribute('style',hs);
		this._toolbar.style[domTransform + 'Origin']='50% 50%';
		me._toolbar.ggIsActive=function() {
			return false;
		}
		me._toolbar.ggElementNodeId=function() {
			return me.player.getCurrentNode();
		}
		this._toolbar.ggUpdatePosition=function () {
			this.style[domTransition]='none';
			if (this.parentNode) {
				var w=this.parentNode.offsetWidth;
					this.style.left=(this.ggLeft - 0 + w/2) + 'px';
				var h=this.parentNode.offsetHeight;
					this.style.top=(this.ggTop - 0 + h) + 'px';
			}
		}
		this._left=document.createElement('div');
		this._left__img=document.createElement('img');
		this._left__img.className='ggskin ggskin_button';
		this._left__img.setAttribute('src',basePath + './left.png');
		this._left__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._left__img.className='ggskin ggskin_button';
		this._left__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._left__img);
		this._left.appendChild(this._left__img);
		this._left.ggId="left";
		this._left.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._left.ggVisible=true;
		this._left.className='ggskin ggskin_button ';
		this._left.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		this._left.setAttribute('style',hs);
		this._left.style[domTransform + 'Origin']='50% 50%';
		me._left.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._left.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._left.onmouseover=function () {
			me._left__img.src=basePath + './left__o.png';
		}
		this._left.onmouseout=function () {
			me._left__img.src=basePath + './left.png';
			me.elementMouseDown['left']=false;
		}
		this._left.onmousedown=function () {
			me.elementMouseDown['left']=true;
		}
		this._left.onmouseup=function () {
			me.elementMouseDown['left']=false;
		}
		this._left.ontouchend=function () {
			me.elementMouseDown['left']=false;
		}
		this._left.ggUpdatePosition=function () {
		}
		this._toolbar.appendChild(this._left);
		this._right=document.createElement('div');
		this._right__img=document.createElement('img');
		this._right__img.className='ggskin ggskin_button';
		this._right__img.setAttribute('src',basePath + './right.png');
		this._right__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._right__img.className='ggskin ggskin_button';
		this._right__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._right__img);
		this._right.appendChild(this._right__img);
		this._right.ggId="right";
		this._right.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._right.ggVisible=true;
		this._right.className='ggskin ggskin_button ';
		this._right.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 35px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		this._right.setAttribute('style',hs);
		this._right.style[domTransform + 'Origin']='50% 50%';
		me._right.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._right.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._right.onmouseover=function () {
			me._right__img.src=basePath + './right__o.png';
		}
		this._right.onmouseout=function () {
			me._right__img.src=basePath + './right.png';
			me.elementMouseDown['right']=false;
		}
		this._right.onmousedown=function () {
			me.elementMouseDown['right']=true;
		}
		this._right.onmouseup=function () {
			me.elementMouseDown['right']=false;
		}
		this._right.ontouchend=function () {
			me.elementMouseDown['right']=false;
		}
		this._right.ggUpdatePosition=function () {
		}
		this._toolbar.appendChild(this._right);
		this._up=document.createElement('div');
		this._up__img=document.createElement('img');
		this._up__img.className='ggskin ggskin_button';
		this._up__img.setAttribute('src',basePath + './up.png');
		this._up__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._up__img.className='ggskin ggskin_button';
		this._up__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._up__img);
		this._up.appendChild(this._up__img);
		this._up.ggId="up";
		this._up.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._up.ggVisible=true;
		this._up.className='ggskin ggskin_button ';
		this._up.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 70px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		this._up.setAttribute('style',hs);
		this._up.style[domTransform + 'Origin']='50% 50%';
		me._up.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._up.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._up.onmouseover=function () {
			me._up__img.src=basePath + './up__o.png';
		}
		this._up.onmouseout=function () {
			me._up__img.src=basePath + './up.png';
			me.elementMouseDown['up']=false;
		}
		this._up.onmousedown=function () {
			me.elementMouseDown['up']=true;
		}
		this._up.onmouseup=function () {
			me.elementMouseDown['up']=false;
		}
		this._up.ontouchend=function () {
			me.elementMouseDown['up']=false;
		}
		this._up.ggUpdatePosition=function () {
		}
		this._toolbar.appendChild(this._up);
		this._down=document.createElement('div');
		this._down__img=document.createElement('img');
		this._down__img.className='ggskin ggskin_button';
		this._down__img.setAttribute('src',basePath + './down.png');
		this._down__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._down__img.className='ggskin ggskin_button';
		this._down__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._down__img);
		this._down.appendChild(this._down__img);
		this._down.ggId="down";
		this._down.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._down.ggVisible=true;
		this._down.className='ggskin ggskin_button ';
		this._down.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 105px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		this._down.setAttribute('style',hs);
		this._down.style[domTransform + 'Origin']='50% 50%';
		me._down.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._down.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._down.onmouseover=function () {
			me._down__img.src=basePath + './down__o.png';
		}
		this._down.onmouseout=function () {
			me._down__img.src=basePath + './down.png';
			me.elementMouseDown['down']=false;
		}
		this._down.onmousedown=function () {
			me.elementMouseDown['down']=true;
		}
		this._down.onmouseup=function () {
			me.elementMouseDown['down']=false;
		}
		this._down.ontouchend=function () {
			me.elementMouseDown['down']=false;
		}
		this._down.ggUpdatePosition=function () {
		}
		this._toolbar.appendChild(this._down);
		this._zoom_in=document.createElement('div');
		this._zoom_in__img=document.createElement('img');
		this._zoom_in__img.className='ggskin ggskin_button';
		this._zoom_in__img.setAttribute('src',basePath + './zoom_in.png');
		this._zoom_in__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._zoom_in__img.className='ggskin ggskin_button';
		this._zoom_in__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._zoom_in__img);
		this._zoom_in.appendChild(this._zoom_in__img);
		this._zoom_in.ggId="zoom in";
		this._zoom_in.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._zoom_in.ggVisible=true;
		this._zoom_in.className='ggskin ggskin_button ';
		this._zoom_in.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 140px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		this._zoom_in.setAttribute('style',hs);
		this._zoom_in.style[domTransform + 'Origin']='50% 50%';
		me._zoom_in.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._zoom_in.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._zoom_in.onmouseover=function () {
			me._zoom_in__img.src=basePath + './zoom_in__o.png';
		}
		this._zoom_in.onmouseout=function () {
			me._zoom_in__img.src=basePath + './zoom_in.png';
			me.elementMouseDown['zoom_in']=false;
		}
		this._zoom_in.onmousedown=function () {
			me.elementMouseDown['zoom_in']=true;
		}
		this._zoom_in.onmouseup=function () {
			me.elementMouseDown['zoom_in']=false;
		}
		this._zoom_in.ontouchend=function () {
			me.elementMouseDown['zoom_in']=false;
		}
		this._zoom_in.ggUpdatePosition=function () {
		}
		this._toolbar.appendChild(this._zoom_in);
		this._zoom_out=document.createElement('div');
		this._zoom_out__img=document.createElement('img');
		this._zoom_out__img.className='ggskin ggskin_button';
		this._zoom_out__img.setAttribute('src',basePath + './zoom_out.png');
		this._zoom_out__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._zoom_out__img.className='ggskin ggskin_button';
		this._zoom_out__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._zoom_out__img);
		this._zoom_out.appendChild(this._zoom_out__img);
		this._zoom_out.ggId="zoom out";
		this._zoom_out.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._zoom_out.ggVisible=true;
		this._zoom_out.className='ggskin ggskin_button ';
		this._zoom_out.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 175px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		this._zoom_out.setAttribute('style',hs);
		this._zoom_out.style[domTransform + 'Origin']='50% 50%';
		me._zoom_out.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._zoom_out.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._zoom_out.onmouseover=function () {
			me._zoom_out__img.src=basePath + './zoom_out__o.png';
		}
		this._zoom_out.onmouseout=function () {
			me._zoom_out__img.src=basePath + './zoom_out.png';
			me.elementMouseDown['zoom_out']=false;
		}
		this._zoom_out.onmousedown=function () {
			me.elementMouseDown['zoom_out']=true;
		}
		this._zoom_out.onmouseup=function () {
			me.elementMouseDown['zoom_out']=false;
		}
		this._zoom_out.ontouchend=function () {
			me.elementMouseDown['zoom_out']=false;
		}
		this._zoom_out.ggUpdatePosition=function () {
		}
		this._toolbar.appendChild(this._zoom_out);
		this._auto_rotate=document.createElement('div');
		this._auto_rotate__img=document.createElement('img');
		this._auto_rotate__img.className='ggskin ggskin_button';
		this._auto_rotate__img.setAttribute('src',basePath + './auto_rotate.png');
		this._auto_rotate__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._auto_rotate__img.className='ggskin ggskin_button';
		this._auto_rotate__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._auto_rotate__img);
		this._auto_rotate.appendChild(this._auto_rotate__img);
		this._auto_rotate.ggId="auto rotate";
		this._auto_rotate.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._auto_rotate.ggVisible=true;
		this._auto_rotate.className='ggskin ggskin_button ';
		this._auto_rotate.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 210px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		this._auto_rotate.setAttribute('style',hs);
		this._auto_rotate.style[domTransform + 'Origin']='50% 50%';
		me._auto_rotate.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._auto_rotate.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._auto_rotate.onclick=function () {
			me.player.toggleAutorotate();
		}
		this._auto_rotate.onmouseover=function () {
			me._auto_rotate__img.src=basePath + './auto_rotate__o.png';
		}
		this._auto_rotate.onmouseout=function () {
			me._auto_rotate__img.src=basePath + './auto_rotate.png';
		}
		this._auto_rotate.ggUpdatePosition=function () {
		}
		this._toolbar.appendChild(this._auto_rotate);
		this._fullscreen=document.createElement('div');
		this._fullscreen__img=document.createElement('img');
		this._fullscreen__img.className='ggskin ggskin_button';
		this._fullscreen__img.setAttribute('src',basePath + './fullscreen.png');
		this._fullscreen__img.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;');
		this._fullscreen__img.className='ggskin ggskin_button';
		this._fullscreen__img['ondragstart']=function() { return false; };
		me.player.checkLoaded.push(this._fullscreen__img);
		this._fullscreen.appendChild(this._fullscreen__img);
		this._fullscreen.ggId="fullscreen";
		this._fullscreen.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		this._fullscreen.ggVisible=true;
		this._fullscreen.className='ggskin ggskin_button ';
		this._fullscreen.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 245px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		this._fullscreen.setAttribute('style',hs);
		this._fullscreen.style[domTransform + 'Origin']='50% 50%';
		me._fullscreen.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		me._fullscreen.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.player.getCurrentNode();
		}
		this._fullscreen.onclick=function () {
			me.player.toggleFullscreen();
		}
		this._fullscreen.onmouseover=function () {
			me._fullscreen__img.src=basePath + './fullscreen__o.png';
		}
		this._fullscreen.onmouseout=function () {
			me._fullscreen__img.src=basePath + './fullscreen.png';
		}
		this._fullscreen.ggUpdatePosition=function () {
		}
		this._toolbar.appendChild(this._fullscreen);
		this.divSkin.appendChild(this._toolbar);
		this.preloadImages();
		this.divSkin.ggUpdateSize=function(w,h) {
			me.updateSize(me.divSkin);
		}
		this.divSkin.ggViewerInit=function() {
		}
		this.divSkin.ggLoaded=function() {
			me._loading_image.style[domTransition]='none';
			me._loading_image.style.visibility='hidden';
			me._loading_image.ggVisible=false;
		}
		this.divSkin.ggReLoaded=function() {
		}
		this.divSkin.ggLoadedLevels=function() {
		}
		this.divSkin.ggReLoadedLevels=function() {
		}
		this.divSkin.ggEnterFullscreen=function() {
		}
		this.divSkin.ggExitFullscreen=function() {
		}
		this.skinTimerEvent();
	};
	this.hotspotProxyClick=function(id) {
	}
	this.hotspotProxyOver=function(id) {
	}
	this.hotspotProxyOut=function(id) {
	}
	this.changeActiveNode=function(id) {
		me.ggUserdata=me.player.userdata;
	}
	this.skinTimerEvent=function() {
		setTimeout(function() { me.skinTimerEvent(); }, 10);
		me.ggCurrentTime=new Date().getTime();
		me._loading_text.ggUpdateText();
		var hs='';
		if (me._loading_bar.ggParameter) {
			hs+=parameterToTransform(me._loading_bar.ggParameter) + ' ';
		}
		hs+='scale(' + (1 * me.player.getPercentLoaded() + 0) + ',1.0) ';
		me._loading_bar.style[domTransform]=hs;
		if (me.elementMouseDown['left']) {
			me.player.changePanLog(1,true);
		}
		if (me.elementMouseDown['right']) {
			me.player.changePanLog(-1,true);
		}
		if (me.elementMouseDown['up']) {
			me.player.changeTiltLog(1,true);
		}
		if (me.elementMouseDown['down']) {
			me.player.changeTiltLog(-1,true);
		}
		if (me.elementMouseDown['zoom_in']) {
			me.player.changeFovLog(-1,true);
		}
		if (me.elementMouseDown['zoom_out']) {
			me.player.changeFovLog(1,true);
		}
	};
	this.addSkin();
};