//03_03-Просмотр данных с помощью jQuery
$.getJSON('data.json', function(data) {
	var output = '<ul>';
	$.each(data, function(key, val) {
		output += '<li>' + val.name + '</li>';
	});
	output +='</ul>';
	$('#update').prepend(output);
});