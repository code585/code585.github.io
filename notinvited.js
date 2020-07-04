$(() => {
    let donate = false;
    $("#donate").click(()=> {
        donate = true;
        $("#donate").html("<h3>Thanks for the support!</h3>");
    });

    $("input#name").keyup(() => {
        if($("#name").val().trim().length > 0) {
            $(".lettername").html($("#name").val());
        } else {
            $(".lettername").html($("#name")[0].placeholder);
        }
    });

    $("#formsubmit").click(() => {
        if (donate) {
            $("#letter .card-header").html("Your letter is its way!");
        } else {
            $("#donate").hide().fadeIn();
        }
    })
});