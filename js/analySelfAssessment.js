//专业技能自评分析
var analySelfAssessment = (function($,undefined){
	//变量
	var $selfAssessmentChart = $("#selfAssessmentChart");
	var loadOnce = true;

	//初始化
	var _init = function(){
		if(loadOnce){
			loadOnce = false;
			_initChart();
		}else{
			return;
		}
	};

	//初始化图表
	var _initChart = function(){
		$selfAssessmentChart.highcharts({
            chart: {
                backgroundColor: "rgba(0,0,0,0)",
                plotShadow: false,
                type: 'pie'
            },
	    legend : {
		  itemStyle : {
		      'color' : '#fff'
		   }
	    },
            title: {
                text: '专业技能构成图'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
	            name: 'easyui',
	            colorByPoint: true,
	            data: [{
	                name: 'html',
	                y: 20
	            }, {
	                name: 'css',
	                y: 20,
	                sliced: true,
	                selected: true
	            }, {
	                name: 'javascript',
	                y: 20
	            }, {
	                name: 'jQuery',
	                y: 20
	            }, {
	                name: 'bootstrap',
	                y: 10
	            }, {
	                name: 'java',
	                y: 10
	            }]
        	}]
        });
	};

	return{
		init:_init
	}

})(jQuery);
