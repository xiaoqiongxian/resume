//专业技能自评分析
var analySelfAssessment = (function($,undefined)(){
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
                plotBackgroundColor: "rgba(0,0,0,0)",
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
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
	            name: 'Brands',
	            colorByPoint: true,
	            data: [{
	                name: 'html',
	                y: 56.33
	            }, {
	                name: 'css',
	                y: 24.03,
	                sliced: true,
	                selected: true
	            }, {
	                name: 'javascript',
	                y: 10.38
	            }, {
	                name: 'jQuery',
	                y: 4.77
	            }, {
	                name: 'bootstrap',
	                y: 0.91
	            }, {
	                name: 'java',
	                y: 0.2
	            }]
        	}]
        });
	};

	return{
		init:_init
	}

})(jQuery);
