var l = [['kiwi', '23'],['pear','53'],['grape','13'],['pineapple','23'],['melon','23']];

$(document).ready(function () {
	console.log("dothis");
	WordCloud(document.getElementById('fruitBasket'), { list: l} );
});