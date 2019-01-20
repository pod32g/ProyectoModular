$(document).ready(function(){
	ko.applyBindings(homeworkViewModel);
	$("#main-contact-form").submit(createHomework);
});