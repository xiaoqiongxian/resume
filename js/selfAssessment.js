/*专业技能自评*/
var selfAssessment = (function($,undefined){
  //缓存变量
  var $selfAssessmentTable = $("#selfAssessmentTable");
  var $selfAssessmentTab = $("#selfAssessmentTab");
  var $selfAssessmentPanel = $("#selfAssessmentPanel");
  var loadOnce = true;
  
  //数据初始化
  var _init = function(){
    if(loadOnce){
    	loadOnce = false;
    	_initTable();
    	//tab切换事件调用
    	$selfAssessmentTab.find("a").click(function(){
    		var $this = $(this);
    		var tabName = $this.attr("href");
    		_showTabs(tabName);
    	});
    }else{
    	return;
    }
  };

  //tab切换事件
  var _showTabs = function(arr){
  	$("a[aria-controls='"+arr.split("#")[1]+"']").tab("show");
  	switch(arr){
  		case '#selfAssessment':
  			_init();
  			break;
  		case '#analySelfAssessment':
  			analySelfAssessment.init();
  			break;
  		default:
  			break;
  	}
  };

  //表格初始化
  var _initTable = function(){
  	$selfAssessmentTable.jqGrid({        
		datatype: "json",
	   	colNames:['id','专业技能', '熟练程度', '使用时间','详情'],
	   	colModel:[
	   		{name:'id',      index:'1', width:100, align:"center"},
	   		{name:'name',    index:'2', width:100, align:"center"},
	   		{name:'ability', index:'3', width:100, align:"center",
	   			formatter:function(cellValue){
	   				var val="";
	   				if(cellValue === 1){
	   					val = '<span>★☆☆☆☆</span>'
	   				}else if(cellValue === 2){
	   					val = '<span>★★☆☆☆</span>'
	   				}else if(cellValue === 3){
	   					val = '<span>★★★☆☆</span>'
	   				}else if(cellValue === 4){
	   					val = '<span>★★★★☆</span>'
	   				}else if(cellValue === 5){
	   					val = '<span>★★★★★</span>'
	   				}

	   				return val;
	   			}
	   	    },
	   		{name:'time',    index:'4', width:100, align:"center"},
	   		{name:'handel',  index:'5', width:100, align:"center",
	   			formatter:function(cellValue,options,rowObject){
	   				return '<p class="jqgrid-handel-p">'+
	   						'<label class="jqgrid-handel-text detail-link" onclick="selfAssessment.detail(\''+rowObject.id+'\')">详情</label>'+
	   						'</p>'
	   			}
	   		}	
	   	],
	   	rowNum:10,
	   	rowList:[10,20,30],
	    viewrecords: true,
	    loadonce:false,
	    height:true,
	    pager: '#selfAssessmentPager'
	});

	//模拟数据
	var data=[
			{"id":"1","name":"html","ability":"5","time":"16个月"},
			{"id":"2","name":"html","ability":"5","time":"16个月"},
			{"id":"3","name":"html","ability":"5","time":"16个月"},
			{"id":"4","name":"html","ability":"5","time":"16个月"},
			{"id":"5","name":"html","ability":"5","time":"16个月"},
			{"id":"6","name":"html","ability":"5","time":"16个月"}
	]

	var len = data.length;
	for (var i = 0; i < len; i++) {
		$selfAssessmentTable.jqGrid("addRowData",i+1,data[i]);
	}

  };

  //详情
  var _detail = function(id){
  	$selfAssessmentPanel.showPanelModel("专业技能详情");
  };

  //初始化方法调用
  _init();

  return{
  	detail:_detail
  }

})(jQuery);
