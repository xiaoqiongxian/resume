//工具类
(function($,undefined){
	$.fn.extend({
		//打开弹窗
		showPanelModel:function(title,isModel,isClose,closeHandler){
			var $this = $(this);
			var $title = $this.find(".panel-title");
			var $heading = $this.find("panel-heading");
			//设置参数
			$title.html(title || "");
			//判断是否已经有弹框显示
			var $panelMask = $(".panel-mask");
			if($panelMask.length){
				$panelMask.css("z-index":"2500");
				$this.css("z-index":"3000");
			}else{
				//是否需要模态
				if(!isModel){
					$("body").append("<div class='panel-mask'></div>");
				}
			}

			//是否需要右上角关闭按钮
			if(!isClose){
				var closeHtml = $("<span class='panel-close'></span>");
				$heading.append(closeHtml);
				$heading.undelegate().delegate(".panel-close","click",function(e){
					e.preventDefault();
					//传入回调函数
					$this.closePanelModel(closeHandler);
				}).find(".panel-close").text("x");
			}

			//取消时间按钮
			$this.undelegate().delegate("button.cancel","click",function(e){
				e.preventDefault();
				$this.closePanelModel();
			});

			//弹窗拖动
			$this.draggable({handle:".panel-heading",containment:"html"});
			//设置弹窗居中显示
			var top = document.documentElement.scrollTop;
			var left = document.documentElement.scrollLeft;
			var width = document.documentElement.scrollWidth;
			var height = document.documentElement.scrollHeight;
			$this.css({
				"top":(height-$this.height())/2+"px",
				"left":left+(width-$this.width())/2+"px",
				"right":"auto",
				"width":$this.width()+"px"
			});

			$this.fadeIn(300);

			//回调函数
			return this;
		},

		//关闭弹窗
		closePanelModel:function(closeHandler){
			var $this = $(this);
			var $form = $this.find("form");
			var $close = $this.find(".panel-close");
			var $panelMask = $(".panel-mask");
			//取消代理
			$close.undelegate("click").remove();
			//移除模态
			if($panelMask.attr("style")){
				$panelMask.removeAttr("style");
				$this.removeAttr("style");
			}else{
				$panelMask.remove();
			}

			//消失弹框
			$this.fadeOut(300);
			//清空表单
			$form[0] && $form[0].reset();
			window.setTimeOut(function(){
				closeHandler && closeHandler();
			},350);

			return this;
		},

		//绑定数据和模板
		templateBindData:function(obj){
			var temp = this.html();
			return temp.replace(/\{[a-zA-Z0-9.]+}/gi,function(match){
				var tempObj = obj;
				var value = match.substr(1,match.length-2);
				var tempArray = value.split(".");
				if(tempArray.length > 1){
					//有多层对象
					for (var i = 0; i < tempArray.length; i++) {
						if(!tempObj.hasOwnProperty(tempArray[i])){
							return "";
						}else{
							tempObj = tempObj[tempArray[i]];
							if(tempArray.length === i+1){
								return tempObj ? tempObj : "";
							}
						}
					}
				}else{
					//没有多层对象
					return tempObj[value] ? tempObj[value] : "";
				}
			});
		}
	});
})(jQuery)
