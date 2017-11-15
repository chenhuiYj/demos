var myDom={
	//去除空格 
	trim:function(str){
		return str.replace(/\s+/g,"");
	},
	/*
	1:首字母大写
	2：首页母小写
	3：大小写转换
	4：全部大写
	5：全部小写
	 * */
	changeCase:function(str,type)
	{
		switch(type){
			case 1:return str.replace(/^(\w)(\w+)/,function (v,v1,v2){return v1.toUpperCase()+v2.toLowerCase();});
			case 2:return str.replace(/^(\w)(\w+)/,function (v,v1,v2){return v1.toLowerCase()+v2.toUpperCase();});
			case 3:return str.replace(/^([a-z]+)([A-Z]+)/,function (v,v1,v2){return v1.toUpperCase()+v2.toLowerCase();});
			case 4:return str.toUpperCase();
			case 5:return str.toLowerCase();
			default:return str;
		}
	},
	//字符串替换(字符串,要替换的字符,替换成什么)
	replaceAll:function (str,AFindText,ARepText){
	　　　raRegExp = new RegExp(AFindText,"g");
	　　　return str.replace(raRegExp,ARepText);
	},
	//字符串倒序
	reverse:function(str){
		return str.split("").reverse().join("");
	},
	//替换中间几位(电话)
	replacePhone:function (str){
		return str.replace(/(\d{3})\d{5}(\d{3})/, '$1*****$2');
	},
	//检测字符串类型
	checkType:function(str,type){
		switch(type){
			case 'email':return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
			case 'phone':return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
			case 'tel':return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
			case 'password':return /^[0-9a-zA-Z_\.-]{6,16}$/.test(str);
			case 'number':return /^[0-9]$/.test(str);
			case 'english':return /^[a-zA-Z]+$/.test(str);
			case 'lower':return /^[a-z]+$/.test(str);
			case 'upper':return /^[A-Z]+$/.test(str);
			case undefined:return true;
			case null:return true;
			case '':return true;
			default : return eval(type).test(str);
		}
	},
	//数组去重
	removeReapt:function(array1){
	    var arr=[];
	    for(var i=0,len=array1.length;i<len;i++){
	        if(arr.indexOf(array1[i])==-1){
	            arr.push(array1[i]);
	        }
	    }
	    return arr;
	},
	//数组顺序打乱(需要的数组长度)可选
	upsetOrder:function(array1,num){
	    var arr=[],_length=num||array1.length,arr1=[];
	    //避免影响以前的数组,复制一个
	    for(var i=0,len=array1.length;i<len;i++){
	        arr1.push(array1[i]);
	    }
	    for(var i=0;i<_length;i++){
	        arr.push(arr1.splice(Math.floor(Math.random()*arr1.length),1).join());
	    }
	    return arr;
	},
	//返回数组或者字符串一个元素出现的次数
	getEleCount:function(obj,ele){
		var num=0;
		for(var i=0,len=obj.length;i<len;i++){
			if(ele==obj[i]){
				num++;
			}
		}
		return num;
	},
	//返回数组,字符串出现最多的几个元素和出现次数
	maxCounts:function(arrar1,rank){
		var obj={},k,num=0,k1,arr=[],arr1=[],rank1=rank||1;
		for(var i=0,len=arrar1.length;i<len;i++){
			k=arrar1[i];
			if(obj[k]){
				obj[k]++;
			}
			else{
				obj[k]=1;
			}
		}
		for(var o in obj){
			if(obj[o]>num){
				num=obj[o];
				k1=o;
			}
			arr.push({ele:o,count:obj[o]});
		}
		arr.sort(function(n1,n2){return n2.count-n1.count});
		for (var i = 0,len=arr.length;i<len; i++) {
			alert(arr[i].ele+" "+arr[i].count);
		}
		for(var i=0;i<rank;i++){
			arr1.push(arr[i]);
		}
		return arr1;
	},
	//获取指定样式
	getStyle:function(obj,name){
		//如果存在，证明是IE
		if(obj.currentStyle){
			return obj.currentStyle[name];
		}
		else{
			return getComputedStyle(obj,false)[name];
		}
	},
	//运动函数(对象,运动的属性{"heigth":"100","width":"200"},运动的类型(缓冲运动:buffer,或者匀速运动:constant),运动量(每次叠加的大小),回调函数)
	startMove:function(obj,json,sportType,speen1,fnEnd){
		var _this=this,sportType=sportType||'buffer';
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var bstop=true;//假设Json的任务到已经达到了
			for(var attr in json){
			var setValue=null;
			//如果样式是透明度
			if(attr=='opacity')
			{
				//对小数进行四舍五入
				setValue=Math.round(parseFloat(_this.getStyle(obj,attr))*100);
			}
			else{
				setValue=parseInt(_this.getStyle(obj,attr));
			}
			//如果存在sportType，speen1，就是匀速运动，不存在则是缓冲运动
			if(sportType==='buffer'&&!speen1){
				//缓冲运动的速度=目标-当前/特定
				var speen=(json[attr]-setValue)/6;
				
			}
			else{
				//匀速运动速度=指定speen1
				var speen=speen1;
				var type=json[attr]-setValue;
				//BUG,当前和目标为零还会运行一次
				//如果为零，说明已经达到了目标值，返回
				if(type==0)break;
			}
			speen=speen>0?Math.ceil(speen):Math.floor(speen);
			if(attr=="opacity"){
				obj.style.opacity=(setValue+speen)/100;
				obj.style.filter='alpha(opacity:)'+(setValue+speen)+')';
			}
			else{
				//匀速运动中,如果差距小于速度值,则让当前直接等于目标
				if(type&&type<speen1){
					obj.style[attr]=json[attr]+"px"
				}
				else{
					obj.style[attr]=setValue+speen+"px";
				}
			}
			//如果还有没完成运动任务的，继续运行
			if(setValue!=json[attr]){
				bstop=false;
			}
			//console.log(bstop+" "+setValue+" "+json[attr] )
		}
		if(bstop){
			clearInterval(obj.timer);
			if(fnEnd){
				fnEnd();
			}
		}
	  },50);
	},
	//cookie
	setCookie:function(name,value,iDay){
		var oDate=new Date();
		oDate.setDate(oDate.getDate()+iDay);
		document.cookie=name+'='+value+';expires='+oDate;
	},
	getCookie:function(name){
		var arr=document.cookie.split('; ');
		for(var i=0;i<arr.length;i++){
			var arr2=arr[i].split('=');
			if(arr2[0]==name)
			{
				return arr2[1];
			}
		}
		return '';
	},
	removeCookie:function(name){
		this.setCookie(name,1,-1);
	},
	//检测密码强度
	checkPwd:function(str){
		var nowLv=0;
		if(str.length<6){alert("sad");return nowLv};
		if(/[0-9]/.test(str)){nowLv++};
		if(/[a-z]/.test(str)){nowLv++};
		if(/[A-Z]/.test(str)){nowLv++};
		if(/[\.|-|_]/.test(str)){nowLv++};
		return nowLv;
	},
	//检测对象是否有哪个类名
	hasClass:function(obj,classStr){ 
		var arr=obj.className.split(/\s+/); //这个正则表达式是因为class可以有多个,判断是否包含 
		return (arr.indexOf(classStr)==-1)?false:true;
	},
	//添加类名
	addClass:function(obj,classStr){
		if (!this.hasClass(obj,classStr)){obj.className += " " + classStr};
	},
	//删除类名
	removeClass0:function(obj,classStr){
		if (this.hasClass(obj,classStr)) {
	        var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
	        obj.className = obj.className.replace(reg, '');
		}
	},
	//替换类名("被替换的类名","替换的类名")
	replaceClass:function(obj,newName,oldName) {
	    this.removeClass(obj,oldName);
	    this.addClass(obj,newName);
	},
	//获取兄弟节点
	siblings:function(obj){
		var a=[];//定义一个数组，用来存o的兄弟元素 
		var p=obj.previousSibling; 
		while(p){//先取o的哥哥们 判断有没有上一个哥哥元素，如果有则往下执行 p表示previousSibling 
			if(p.nodeType===1){ 
			a.push(p); 
			} 
			p=p.previousSibling//最后把上一个节点赋给p 
		} 
		a.reverse()//把顺序反转一下 这样元素的顺序就是按先后的了 
		var n=obj.nextSibling;//再取o的弟弟 
		while(n){//判断有没有下一个弟弟结点 n是nextSibling的意思 
			if(n.nodeType===1){ 
				a.push(n); 
			} 
			n=n.nextSibling; 
		}
		return a;
	},
	//设置样式
	css:function(obj,json){
		for(var attr in json){
			obj.style[attr]=json[attr];
		}
	},
	//设置文本内容
	html:function(obj){
		if(arguments.length==0){
			return this.innerHTML;
		}
		else if(arguments.length==1){
			this.innerHTML=arguments[0];
		}
	},
	//显示隐藏
	show:function(obj){
		obj.style.display="";
	},
	hide:function(obj){
		obj.style.display="none";
	},
	//表格排序
	sortTable:function(sTableID,iCol,sDataType) {
	     var oTable = document.getElementById(sTableID);
	     var oTBody = oTable.tBodies[0];
	     var colDataRows = oTBody.rows;
	     var aTRs=new Array;
	     for(var i = 0; i < colDataRows.length; i++) {
	        aTRs[i] = colDataRows[i];
	    }
	    //记录当前点击的项是不是已经经过排序的项，如果是，就倒反排序
	    if(oTable.sortCol == iCol) {
	        aTRs.reverse();
	    }else{
	        aTRs.sort(this.generateCompareTRs(iCol,sDataType));
	    }
	     var oFragment = document.createDocumentFragment();
	     for(var j = 0; j < aTRs.length; j++) {
	        oFragment.appendChild(aTRs[j]);
	    }
	    oTBody.appendChild(oFragment);
	    oTable.sortCol = iCol;
	},
	//类型转换函数
	convert:function(sValue, sDataType) {
	     switch(sDataType) {
	     case "int" :
	         return parseInt(sValue);
	     case "float" :
	         return parseFloat(sValue);
	     case "date" :
	         return new  Date(Date.parse(sValue));
	     default :
	         return sValue.toString();
	    }
	},
	//排序函数
	generateCompareTRs:function(iCol, sDataType) {
		var _this=this;
	    return function compareTRs(oTR1, oTR2){
	        var reg=/^[\u4E00-\u9FA5 \.\s·]{2,16}$/;
	        vValue1 = _this.convert(oTR1.cells[iCol].firstChild.nodeValue,sDataType);
	        vValue2 = _this.convert(oTR2.cells[iCol].firstChild.nodeValue,sDataType);
	        if(reg.test(vValue1)&&reg.test(vValue2)){
	            return vValue1.localeCompare(vValue2);
	        }
	        else{
	            if(vValue1<vValue2) {
	                return  -1;
	            }else if(vValue1>vValue2) {
	                return 1;
	            }else{
	                return  0;
	            }
	        }
	    };    
	}
//	//吸顶盒
//	scrollTopBox:function(obj){
//		var offectTop=obj["box"].offsetTop,scrollTop;
//		var isscroll=obj["winscroll"]||true;
//		function doscroll(){
//			scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
//			var top1=obj["top"]||0;
//			obj["box"].style.top=top1+"px";
//			alert("asd")
//			if(offectTop<scrollTop){
//				obj["box"].style.position="fixed";
//			}
//			else{
//				obj["box"].style.position="static";
//			}
//		}
//		doscroll();
//		if(isscroll){
//			var win=window;
//			win.addEventListener("scroll",function(){doscroll();});
//		}
//	}
}
/*
formCheck({
	btnId:"提交按钮ID",
	formId:"表单ID",
	checkClass:"需要检查的控件的class",
	errorEle:"错误提示的节点类型  p  span lable",
	animate:动画效果
	fn:"回调函数， function"
});
 * */
function VsCheck(obj){
	this.btn=document.getElementById(obj["btnId"]);//提交按钮
	this.form=document.getElementById(obj["formId"]);//表单ID
	this.errorEle=obj["errorEle"]||"span";//错误节点
	this.input=this.form.getElementsByClassName(obj["checkClass"]);//需要检查的控件类名
	this.fn=obj["fn"];//提交回调函数
	this.isSubmit=false;//是否提交
	this.animate=obj["animate"];//定义动画
	var _fn=this.fn,oInput=this.input,inputRule;
	//保存特殊的控件对象
	for(var i=0,len=oInput.length;i<len;i++){
		if(oInput[i].getAttribute("data-vc-rule")){
			inputRule=oInput[i].getAttribute("data-vc-rule").replace(/\[/g,",").replace(/\]/g,"").split(",")[0];
			if(inputRule=='pwd'){
				this.oPassWord=oInput[i];
			}
			if(inputRule=='pwd2'){
				this.oPassWord2=oInput[i];
			}
			if(inputRule=='mpwd'){
				this.omPassWord=oInput[i];
			}
			if(inputRule=='mpwd2'){
				this.omPassWord2=oInput[i];
			}
		}
		
	}
	//绑定事件
	var fc=this;
	this.btn.addEventListener("click",function(){
		fc.isSubmit=true;
		for(var i=0,len=oInput.length;i<len;i++){
			fc.inputType(oInput[i]);
		}
		if(_fn){_fn()};
		return fc.isSubmit;
	});
	for(var i=0,len=oInput.length;i<len;i++){
		oInput[i].addEventListener("blur",function(){
			fc.inputType(this);
		});
	}
}
VsCheck.prototype={
	//判断类型，分类检查
	inputType:function(objType){
		if(objType.tagName.toLowerCase()=="input"&&(objType.getAttribute("type")=="text"||objType.getAttribute("type")=="password")){
			if(this.ckeckDoText(objType)==false){
				this.isSubmit=false;
			}
		}
		else if(objType.tagName.toLowerCase()=="input"&&objType.getAttribute("type")=="checkbox"){
			if(this.ckeckDobox(objType)==false){
				this.isSubmit=false;
			}
		}
		else if(objType.tagName.toLowerCase()=="input"&&objType.getAttribute("type")=="radio"){
			if(this.ckeckDoRadio(objType)==false){
				this.isSubmit=false;
			}
		}
		else if(objType.tagName.toLowerCase()=="select"){
			if(this.ckeckDoSelect(objType)==false){
				this.isSubmit=false;
			}
		}
		else if(objType.tagName.toLowerCase()=="textarea"){
			if(this.ckeckDoTextarea(objType)==false){
				this.isSubmit=false;
			}
		}
	},
	//创建出错的节点元素
	createEle:function(ele){
		var eleNode=ele||"span";
		var oEle=document.createElement(eleNode);
		oEle.className="vc-msgText";
		if(this.animate){this.objAddClass(oEle,"vc-"+this.animate);}
		return oEle;
	},
	//如果已经创建元素，则不继续创建，直接改文字
	checkCreate:function(objCreate,_text,ele){
		var oEle1=null;
		if(objCreate.getElementsByClassName("vc-msgText").length>0){
			oEle1=objCreate.getElementsByClassName("vc-msgText")[0];
			oEle1.innerHTML=_text;
		}
		else{
			oEle1=this.createEle(ele);
			oEle1.innerHTML=_text;
			objCreate.appendChild(oEle1);
		}
		oEle1.style.display="";
	},
	//检查是否有类名
	objHasClass:function(obj,classStr){
		var arr=obj.className.split(/\s+/);
		return (arr.indexOf(classStr)==-1)?false:true;
	},
	//添加类名
	objAddClass:function(obj,classStr){
		if(!this.objHasClass(obj,classStr)){
			obj.className+=" "+classStr;
		}
	},
	//删除类名
	objRemoveClass:function(obj,classStr){
		if (this.objHasClass(obj,classStr)) {
	        var reg = new RegExp('(\\s|^)' + classStr + '(\\s|$)');
	        obj.className = obj.className.replace(reg, '');
	   }
	},
	//隐藏元素
	hideCreate:function(objHide){
		if(objHide.getElementsByClassName("vc-msgText")[0]){
			objHide.getElementsByClassName("vc-msgText")[0].style.display="none";
		}
	},
	//请求
	ajaxUrl:function(url,callBack){
		var xmlhttp;
		if (window.XMLHttpRequest)
		{
			//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
			xmlhttp=new XMLHttpRequest();
		}
		else
		{
			// IE6, IE5 浏览器执行代码
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
			{
				callBack(xmlhttp.responseText);
			}
		}
		xmlhttp.open("GET",url,true);
		xmlhttp.send();
	},
	//检验规则
	rules:function(value,rule){
		if(value.length==0){return true;}
		switch(rule){
			case 'email':return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value);
			case 'phone':return /^1[3|4|5|7|8][0-9]{9}$/.test(value);
			case 'tel':return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(value);
			case 'pwd':return /^[0-9a-zA-Z_\.-]+$/.test(value);
			case 'pwd2':return value==this.oPassWord.value;
			case 'mpwd':return /^[0-9]{6}$/.test(value);
			case 'mpwd2':return value==this.omPassWord.value;
			case 'number':return /^[0-9]+$/.test(value);
			case 'english':return /^[a-zA-Z]+$/.test(value);
			case 'lower':return /^[a-z]+$/.test(value);
			case 'upper':return /^[A-Z]+$/.test(value);
			case 'date':return /^((\d{4})[\-|\.|\/](\d{1,2})[\-|\.|\/](\d{1,2}))?$/.test(value);
			case undefined:return true;
			case null:return true;
			case '':return true;
			default : return eval(rule).test(value);
		}
	},
	//检验是否为空
	doError:function(type,ele,eleParent,minCount,maxCount){
		var ruleTextMsg="";
		if(type==='data-vc-null'){ruleTextMsg=ele.getAttribute(type)||"该处不能为空";}
		else if(type==='data-vc-msg'){ruleTextMsg=ele.getAttribute(type)||"请填写正确格式的信息";}
		else if(type==='data-vc-min'){
			ruleTextMsg=ele.getAttribute("data-minMsg")||"此处需要选择"+minCount+"至"+maxCount+"项";
			if(!maxCount){ruleTextMsg="此处至少需要选择"+minCount+"项";}
		}
		else if(type==='data-vc-max'){
			ruleTextMsg=ele.getAttribute("data-maxMsg")||"此处需要选择"+minCount+"至"+maxCount+"项";
			if(!minCount){ruleTextMsg="此处至多可以选择"+maxCount+"项";}
		}
		else{ruleTextMsg="该处不能为空";}
		this.checkCreate(eleParent,ruleTextMsg,this.errorEle);
		this.objAddClass(eleParent,'vc-error');
		return false;
	},
	doSussess:function(ele,classStr){
		this.hideCreate(ele);
		this.objRemoveClass(ele,classStr);
		return true;
	},
	//检验长度
	orlength:function(value,minlength,maxlength){
		if(minlength&&value.length<minlength){
			return true;
		}
		if(maxlength&&value.length>maxlength){
			return true;
		}
	},
	//text检查
	ckeckDoText:function(objDo){
		var inputVal=objDo.value,oLi=objDo.parentNode,ruleText;
		if(objDo.getAttribute("data-vc-rule")){
			if(objDo.getAttribute("data-vc-rule")[0]=="/"&&objDo.getAttribute("data-vc-rule").substr(-1,1)=="/"){
				ruleText=[objDo.getAttribute("data-vc-rule")];
			}
			else{
				ruleText=objDo.getAttribute("data-vc-rule").replace(/\[/g,",").replace(/\]/g,"").split(",");
			}
		}
		//如果为空
		if(objDo.getAttribute("data-vc-null")!=null&&inputVal.length==0){
			return this.doError("data-vc-null",objDo,oLi);
		}
		//如果格式错误
		if(ruleText&&!this.rules(inputVal,ruleText[0])){
			return this.doError("data-vc-msg",objDo,oLi);
		}
		//如果长度不合符
		if(inputVal.length>0&&ruleText&&ruleText.length>=2&&this.orlength(inputVal,ruleText[1],ruleText[2])){
			var lengthMsg;
			lengthMsg="该处正确长度为"+ruleText[1]+"至"+ruleText[2];
			if(!ruleText[1]){
				lengthMsg="该处最大长度为"+ruleText[2];
			}
			if(!ruleText[2]){
				lengthMsg="该处最小长度为"+ruleText[1];
			}
			if(ruleText[3]){
				lengthMsg=ruleText[3];
			}
			this.checkCreate(oLi,lengthMsg,this.errorEle);
			this.objAddClass(oLi,'vc-error');
			return false;
		}
		//如果是检查密码
		if(ruleText&&ruleText[0]=="pwd"&&this.oPassWord2.value.length>0){
			if(this.oPassWord2.value==objDo.value){
				this.hideCreate(this.oPassWord2.parentNode);
			}
			else{
				this.checkCreate(this.oPassWord2.parentNode,this.oPassWord2.getAttribute("data-vc-msg")||"两次密码不一致",this.errorEle);
				this.objAddClass(oLi,'vc-error');
				return false;
			}
		}
		//如果是检查小密码
		if(ruleText&&ruleText[0]=="mpwd"&&this.omPassWord2.value.length>0){
			if(this.omPassWord2.value==objDo.value){
				this.hideCreate(this.omPassWord2.parentNode);
			}
			else{
				this.checkCreate(this.omPassWord2.parentNode,this.omPassWord2.getAttribute("data-vc-msg")||"两次密码不一致",this.errorEle);
				this.objAddClass(oLi,'vc-error');
				return false;
			}
		}
		//检查是否需要请求
		if(objDo.getAttribute("data-vc-url")){
			var cf1=this,checkArr=objDo.getAttribute("data-vc-url").split(",");
			var urlMsg=checkArr[1]||"该用户名已注册了，请更换重试";
			cf1.ajaxUrl(checkArr[0]+"?t="+new Date().getTime(),function(str){
			if(str==objDo.value){
				cf1.checkCreate(oLi,urlMsg,cf1.errorEle);
				cf1.objAddClass(oLi);
				return false;
				}
			});
		}
		//如果没有错误
		return this.doSussess(oLi,'vc-error');
	},
	//checkBox检查
	ckeckDobox:function(objCheckBox){
		var oLi=objCheckBox.parentNode,_checkBoxName=objCheckBox.name;
		var ocheckBox1=document.getElementsByName(_checkBoxName),checkConut=0;
		for(var i=0,len=ocheckBox1.length;i<len;i++){
			if(ocheckBox1[i].checked){
				checkConut++;
			}
		}
		//如果至少需要选择几个
		var minCount=objCheckBox.getAttribute("data-vc-min"),maxCount=objCheckBox.getAttribute("data-vc-max");
		if(minCount&&minCount>checkConut){
			return this.doError("data-vc-min",objCheckBox,oLi,minCount,maxCount)
		}
		//如果最多需要选择几个
		if(maxCount&&maxCount<checkConut){
			return this.doError("data-vc-max",objCheckBox,oLi,minCount,maxCount)
		}
		if(checkConut==0){
			return this.doError("data-vc-null",objCheckBox,oLi)
		}
		return this.doSussess(oLi,'vc-error');
	},
	//select检查
	ckeckDoSelect:function(objSelect){
		var inputVal=objSelect.value,oLi=objSelect.parentNode;
		if(!inputVal){return this.doError("data-vc-null",objSelect,oLi);}
		return this.doSussess(oLi,'vc-error');
	},
	//radio检查
	ckeckDoRadio:function(objRadio){
		//假设一开始没有选上
		var ischeck=false,oLi=objRadio.parentNode,_checkBoxName=objRadio.name;
		var ocheckBox1=document.getElementsByName(_checkBoxName);
		for(var i=0,len=ocheckBox1.length;i<len;i++){
			if(ocheckBox1[i].checked){
				ischeck=true
				break;
			}
		}
		//如果没有选上
		if(!ischeck){return this.doError("data-vc-null",objRadio,oLi);}
		return this.doSussess(oLi,'vc-error');
	},
	//textarea检查
	ckeckDoTextarea:function(objText2){
		var inputVal=objText2.value,oLi=objText2.parentNode;
		if(inputVal.length==0){
			return this.doError("data-vc-null",objText2,objText2.parentNode);
		}
		return this.doSussess(objText2.parentNode,'vc-error');
	}
}