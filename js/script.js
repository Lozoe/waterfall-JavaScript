window.onload = function() {
	waterFall('main', 'box');
	var dataInt={"data":[{"src":"0.jpg"},{"src":"1.jpg"},{"src":"2.jpg"}]};
	window.onscroll=function() {
		if(checkScrollSlide()) {
			var oParent=document.getElementById('main');
			//将数据块渲染到页面的尾部
			for(var i=0;i<dataInt.data.length;i++) {
				var oBox=document.createElement('div');
				oBox.className='box';
				oParent.appendChild(oBox);
				var oPic=document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);
				var oImg=document.createElement('img');
				oImg.src='images/'+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterFall('main', 'box');//让重新加载的图片出现在应该出现的位置
		}
	};
};

function waterFall(parent, box) {
	//将main下所有class为box的元素取出来
	var oParent = document.getElementById(parent);
	var oBoxs=getByClass(oParent, box);
	// console.log(oBoxs.length);
	//计算整个页面显示的列数（页面的宽度/整个盒子的宽度）
	var oBoxW=oBoxs[0].offsetWidth;
	// console.log(oBoxW);
	var cols=Math.floor(document.documentElement.clientWidth/oBoxW);
	// console.log(cols);
	// 设置main的宽度，还要设置堆积方式
	oParent.style.cssText='width:'+oBoxW*cols+'px;margin: 0 auto;';
	var hArr=[];//存放每一列高度的数组
	for(var i=0;i<oBoxs.length;i++) {
		if(i<cols) {
			hArr.push(oBoxs[i].clientHeight);
		}else {
			var minH=Math.min.apply(null,hArr);
			// console.log(minH);
			var index=getMinHeightIndex(hArr,minH);
			oBoxs[i].style.position='absolute';
			oBoxs[i].style.top=minH+'px';
			// oBoxs[i].style.left=oBoxW*index+'px';
			oBoxs[i].style.left=oBoxs[index].offsetLeft+'px';
			hArr[index]+=oBoxs[i].offsetHeight;
		}
	}
	// console.log(hArr);
}

//根据父元素id和子元素类名取元素
function getByClass(parent, clsName) {
	var boxArr = [], //用来存储获取到的所有class为box的元素
		oEles = parent.getElementsByTagName('*');
	for (var i = 0; i < oEles.length; i++) {
		if (oEles[i].className === clsName) {
			boxArr.push(oEles[i]);
		}
	}
	return boxArr;
}

function getMinHeightIndex(arr,val) {
	for(var i in arr) {
		if(arr[i]==val) {
			return i;
		}
	}
}

//检测是否具备滚动加载数据块的条件
function checkScrollSlide() {
	var oParent=document.getElementById('main');
	oBoxs=getByClass(oParent,'box');
	var lastBoxH=oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	//页面滚走的距离
	var scrollTop=document.body.scrollTop||document.documentElement.scrollTop;
	// console.log(scrollTop);
	//页面窗口的距离
	var height=document.body.clientHeight||document.documentElement.clientHeight;
	// console.log(height);
	return (lastBoxH<scrollTop+height)?true:false;
}