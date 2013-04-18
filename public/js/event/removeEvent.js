$(document).ready(function() {
	$("#removeEventButton").click(function() {
        removeEvent();
    });
});

function removeEvent() {
    $.ajax({
        type: 'GET',
        url: '',
        data: {},
        contentType: "application/json",
        dataType: "json",
        success: function(respData) {
            window.location = '/events/myevents';
        },
        failure: function(err) {
            console.log('Failure');
        }
    });
}