$(document).ready(function() {
	$("#deleteButton").click(deleteEvent());
});

function deleteEvent() {
    $.ajax({
        type: 'GET',
        url: '/events/getmyevents',
        data: {},
        contentType: "application/json",
        dataType: "json",
        success: function(respData) {
            location.reload();
        },
        failure: function(err) {
            console.log('Failure');
        }
    });
}