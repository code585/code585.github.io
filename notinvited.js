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

    $("#formsubmit").click((e) => {
        if (donate) {
            submitToAPI(e);
        } else {
            $("#donate").hide().fadeIn();
        }
    })
    
    function submitToAPI(e) {
        e.preventDefault();
        var URL = "https://deb6qwqp0j.execute-api.us-east-2.amazonaws.com/default/emailhim";
        /*
             var Namere = /[A-Za-z]{1}[A-Za-z]/;
             if (!Namere.test($("#name-input").val())) {
                          alert ("Name can not less than 2 char");
                 return;
             }
             var mobilere = /[0-9]{10}/;
             if (!mobilere.test($("#phone-input").val())) {
                 alert ("Please enter valid mobile number");
                 return;
             }
             if ($("#email-input").val()=="") {
                 alert ("Please enter your email id");
                 return;
             }
 
             var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
             if (!reeamil.test($("#email-input").val())) {
                 alert ("Please enter valid email address");
                 return;
             }
        */
        var name = $("#name-input").val();
        var phone = $("#phone-input").val();
        var email = $("#email-input").val();
        var desc = $("#description-input").val();
        var data = {
           name : "Test",
           phone : "555-555-5555",
           email : "test@me.com",
           desc : "testing"
         };
 
        $.ajax({
          type: "POST",
          url : URL,
          dataType: "json",
          crossDomain: "true",
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(data),
 
          
          success: function () {
            // clear form and show a success message
            console.log("Successful");
            $("#letter .card-header").html("Your letter is its way!");
          },
          error: function () {
            // show an error message
            console.log("UnSuccessful");
          }});
      }
});