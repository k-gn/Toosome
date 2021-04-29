var seq = 0,
  delays = 80,
  durations = 500;

var seq2 = 0,
  delays2 = 80,
  durations2 = 500;

ct = {

  initDashboardPageCharts: function() {
	let dataWebsiteViewsChart = {
		labels: [],
		series: []
	};
	let dataDailySalesChart = {
		labels: [],
		series: []
	};
	let dataDailyOrderChart = {
		labels: [],
		series: []
	};
	
	 let today = moment();
	 for(let i=6; i>=0; i--) {
		let date = moment(today).subtract(i, 'days').format('MMM DD');
		dataWebsiteViewsChart.labels.push(date);
		dataDailySalesChart.labels.push(date);
		dataDailyOrderChart.labels.push(date);
	 };
	 console.log(dataWebsiteViewsChart,dataDailySalesChart,dataDailyOrderChart);

	 $.ajax({
		type: "get",
		url: "/admin/getDaily",	
		headers: {
           "Content-Type": "application/json"
        },
		dataType: "json",
		success: function(result) {
			
			const visitData = [...result.dailyVisit];
			
		}
	  });

    if ($('#dailySalesChart').length != 0 || $('#completedTasksChart').length != 0 || $('#websiteViewsChart').length != 0) {
      /* ----------==========     Daily Sales Chart initialization    ==========---------- */

      dataDailySalesChart = {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        series: [
          [12, 17, 7, 17, 23, 18, 38]
        ]
      };

      var optionsDailySalesChart = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: 0,
        high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
      }

      var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

      ct.startAnimationForLineChart(dailySalesChart);



      /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

      dataDailyOrderChart = {
        labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
        series: [
          [230, 750, 450, 300, 280, 240, 200, 190]
        ]
      };

      var optionsDailyOrderChart = {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: 0,
        high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      }

      var dailyOrderChart = new Chartist.Line('#dailyOrderChart', dataDailyOrderChart, optionsDailyOrderChart);

      // start animation for the Completed Tasks Chart - Line Chart
      ct.startAnimationForLineChart(dailyOrderChart);


      /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

     
      var optionsWebsiteViewsChart = {
        axisX: {
          showGrid: false
        },
        low: 0,
        high: 1000,
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      };
      var responsiveOptions = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function(value) {
              return value[0];
            }
          }
        }]
      ];
      var websiteViewsChart = Chartist.Bar('#websiteViewsChart', dataWebsiteViewsChart, optionsWebsiteViewsChart, responsiveOptions);

      //start animation for the Emails Subscription Chart
      ct.startAnimationForBarChart(websiteViewsChart);
    }
  },

  startAnimationForLineChart: function (chart) {
    chart.on('draw', function (data) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease',
          },
        });
      }
    });

    seq = 0;
  },
  startAnimationForBarChart: function (chart) {
    chart.on('draw', function (data) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease',
          },
        });
      }
    });

    seq2 = 0;
  },
};
