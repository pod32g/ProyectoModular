$(document).ready(function(){
	ko.applyBindings(homeworkViewModel);
	var courses = getCourses(user_id);
	homeworkViewModel.courses(courses);
	var user_id = Cookies.get("Session")["usr_id"];
	$("#courses_select").change(function(){
		var homeworks = getHomeworks(user_id, $(this).val());
		homeworkViewModel.homeworks(homeworks);
	});
});
