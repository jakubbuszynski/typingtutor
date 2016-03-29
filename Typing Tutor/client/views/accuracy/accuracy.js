accuracyMeter=null;
Template.accuracy.rendered=function(){
	accuracyMeter = new JustGage({
		id: "accuracyGuage",
		value: 98,
		min: 60,
		max: 100,
		title: "ACCURACY",
		label: '%',
		showInnerShadow:true,
		shadowOpacity:1,
		shadowSize:5,
		shadowVerticalOffset:5,
		levelColors : ["#F03C02","#12A5F4"],
		valueFontColor: '#fcfcfc'
	});
};