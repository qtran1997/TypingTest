$(document).ready( function() {
    $.get('modal.html', function(data) {
        $("#importModal").html(data);
    });
    $.get('nav.html', function(data) {
        $("nav").html(data);
    });
});