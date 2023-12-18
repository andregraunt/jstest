$(function() {
    $("#systemDateButton").on("click", function(e) {
        e.preventDefault();
        $.ajax({
            url: "date.php",
            complete: function(xhr, status) {
                $("#systemDate").html(xhr.responseText)
            }
        })
    })
})