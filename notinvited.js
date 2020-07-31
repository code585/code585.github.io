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
            $("#donate").fadeOut().fadeIn().fadeOut().fadeIn();
        }
    })
    
    function submitToAPI(e) {
        e.preventDefault();
        const URL = "https://w64tgkz27g.execute-api.us-east-1.amazonaws.com/v1/emailhim";

        var name = $("#name-input").val();
        var email = $("#email-input").val();

        var data = {
           name : name,
           email : email,
         };
 
        $.ajax({
          type: "POST",
          url : URL,
          dataType: "json",
          crossDomain: true,
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
            $('#letter .card-header').html("Something went wrong (Maybe Russian Interference), The president did not get your letter.")
          }});
      }

      function validateEmail(email) {
        //From Angular
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    function validateName(name) {
        //https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        const re = /^[a-z ,.'-]+$/i;
        return re.test(name);
    }
});