//导航栏
(function($,undefined){
	$.fn.extend({
		//整体框架搭建
		containerInit:function(){
			//当前元素
			var $this = $(this);
			//创建dom元素
			var $header = $("<div class='header'></div>").text("肖琼仙简历");
			var $footer = $("<div class='footer'></div>");
			var $mainContainer = $("<div class='main-container'></div>");
			var $leftMenu = $("<div class='main-left'></div>");
			var $mainRight = $("<div class='main-right'></div>");
			var indexMenu = ["<div class='indexMenu'>",
							"<ul class='left-menu-group'>",
							"<li class='list-item index-item'>导航</li>",
							"<li class='list-item'>",
							"<a href='index.html' class='left-item' id='basicMessage'>基本信息</a>",
							"</li>",
							"<li class='list-item' data-module='#module1'>",
							"<a class='parent-module parent-closed'>教育经历</a>",
							"</li>",
							"<li class='child-module closed' id='module1'>",
							"<ul class='menu-ul'>",
							"<li><a class='menu-li' href='#'>教育经历1</a>1</li>",
							"<li><a class='menu-li' href='#'>教育经历2</a>2</li>",
							"<li><a class='menu-li' href='#'>教育经历3</a>3</li>",
							"</ul>",
							"</li>",
							"<li class='list-item' data-module='#module2'>",
							"<a class='parent-module parent-closed'>项目经验</a>",
							"</li>",
							"<li class='child-module closed' id='module2'>",
							"<ul class='menu-ul'>",
							"<li><a class='menu-li' href='#'>项目经验1</a>1</li>",
							"<li><a class='menu-li' href='#'>项目经验2</a>2</li>",
							"<li><a class='menu-li' href='#'>项目经验3</a>3</li>",
							"</ul>",
							"</li>",
							"<li class='list-item' data-module='#module3'>",
							"<a class='parent-module parent-closed'>专业技能自我评价</a>",
							"</li>",
							"<li class='child-module closed' id='module3'>",
							"<ul class='menu-ul'>",
							"<li><a class='menu-li' href='selfAssessment.html'>专业技能自评1</a></li>",
							"<li><a class='menu-li' href='#'></a>专业技能自评2</li>",
							"<li><a class='menu-li' href='#'></a>专业技能自评3</li>",
							"</ul>",
							"</li>",
							"</ul>",
							"</div>"
			].join("");

			$this.wrap($mainRight);
			$(".main-right").wrap($mainContainer);
			$leftMenu.append(indexMenu);
			$(".main-container").prepend($leftMenu).before($header).after($footer);
			return this;
		},

		//左侧导航栏高亮显示
		leftMenuHighLight:function(){
			var $mainLeft = $(".main-left");
			var urlPath = location.pathname;
			var urlArray = urlPath.split("/");
			var url = urlArray[urlArray.length-1];
			var $highLight = $mainLeft.find("a[href*='"+url+"']");
			$highLight.parent().addClass("menu-li-active");
			var $has = $mainLeft.find("li[class*=menu-li-active]");
			if($has.length > 0){
				$has.parent().parent().addClass("opend");
				var opendId = "#"+ $has.parent().parent().attr("id");
				var $moduleLi = $mainLeft.find(".indexMenu li[data-module]");
				for (var i = 0; i < $moduleLi.length; i++) {
					if ($($moduleLi[i]).attr("data-module") === opendId) {
						$($moduleLi[i]).find("a").removeClass("parent-closed").addClass("parent-opend");

					}
				}
			}
		},

		//左侧导航栏展开和折叠
		indexMenuHandel:function(){
			var $this = $(this);
			var $parentModule = $this.find(".indexMenu li[data-module]");
			$parentModule.bind("click",function(){
				var childModuleId = $(this).attr("data-module");
				var $childModule = $(childModuleId);
				if($childModule.hasClass("closed")){
					//展开子级导航
					$childModule.removeClass("closed").addClass("opend");
					//改变一级导航前的图标为“▶”
					$(this).find("a[class*=parent-module]").addClass("parent-opend").removeClass("parent-closed");
				}else{
					//折叠子级导航
					$childModule.addClass("closed").removeClass("opend");
					//改变一级导航前的图标为“▼”
					$(this).find("a[class*=parent-module]").removeClass("parent-opend").addClass("parent-closed");
				}
			});
		},
		
		//左侧导航栏点击显示对应页面
		setLocalPath:function(){
			var $indexMenu = $(".indexMenu");
			var $indexLi = $indexMenu.find("a class*=[menu-li]");
			var localUrl = $indexLi.attr("href");
			$indexLi.bind("click",function(){
				location.href("https://xiaoqiongxian.github.io/resume/view/"+localUrl);
			});
			
			$("#basicMessage").bind("click",function(){
				location.href("https://xiaoqiongxian.github.io/resume/index.html");
			});
		}
	});

//初始化方法
var _init = function(){
	//1、加载主框架内容
	$(".right-content").containerInit().leftMenuHighLight();
	//2、左侧导航栏的展开和折叠
	$("body").indexMenuHandel();
	$("body").setLocalPath();
};

//初始化方法调用
_init();
})(jQuery);
