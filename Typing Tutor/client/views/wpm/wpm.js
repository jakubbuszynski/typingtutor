wpmMeter=null;
Template.wpm.rendered=function(){
	wpmMeter = new JustGage({
		id: "gauge",
		value: 0,
		min: 0,
		max: 80,
		title: "WPM",
		showInnerShadow:true,
		shadowOpacity:1,
		shadowSize:5,
		shadowVerticalOffset:5,
		valueFontColor: '#fcfcfc',
		levelColors : ["#F03C02","#12A5F4"]
	});
};