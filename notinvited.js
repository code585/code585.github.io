$(() => {
    /*
     * Create global donate variable. Set this to false until the donate link is clicked.
     * Attach click event to link where id is donate
     * Change the link text after it is clicked.
     */
    let donate = false;
    $("#donate").click(()=> {
        donate = true;
        $("#donate").html("<h3>Thanks for the support!</h3>");
    });

    /*
     * Attach keyup event to input where id is name
     * Modify the letter class as the user types into the name input box.
     */

    $("input#name").keyup(() => {
        if($("#name").val().trim().length > 0) {
            $(".lettername").html($("#name").val());
        } else {
            $(".lettername").html($("#name")[0].placeholder);
        }
    });

    /*
     * Attach click event to form submit button
     * Validate input
     * Call recaptcha
     */

    $("#formsubmit").click((e) => {
        if (donate) {
            let name = $("input#name").val();
            let email = $("input#email").val();
            console.log("Donate!");
            if((validateName(name) && email.trim().length == 0) || (validateName(name) && validateEmail(email))) {
                e.preventDefault();
                console.log("Checking recaptcha");
                grecaptcha.execute();
            }
        } 
        else {
            e.preventDefault();
            $("#donate").fadeOut().fadeIn().fadeOut().fadeIn();
        }
    });

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

/*
 * Callback for recaptcha, g-recaptcha
 */

function submitToAPI(token) {
    const URL = "https://w64tgkz27g.execute-api.us-east-1.amazonaws.com/v1/emailhim";

    let name = $("input#name").val();
    let email = $("input#email").val();

    let data = {
        name : name,
        email : email,
        recaptcha: token
        };

    $.ajax({
        type: "POST",
        url : URL,
        dataType: "json",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),

        
        success: () => {
            // clear form and show a success message
            console.log("Successful");
            $("#letter .card-header").html("Your letter is its way!");
        },
        error: () => {
            // show an error message
            console.log("UnSuccessful");
            $('#letter .card-header').html("Something went wrong (Maybe Russian Interference), The president did not get your letter.")
        }
    });
}