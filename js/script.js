
var token;


function deletCookie(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

function updateNavigationView() {
    if (token) {
        $("#loginNav").hide();
        $("#logoutNav").show();
    } else {
        $("#loginNav").show();
        $("#logoutNav").hide();
    }
}

$(document).ready(function() {

    token = getCookie("x-access-token");

    updateNavigationView();

    $("#signupBtn").click(function(event) {
        event.preventDefault();
        var username = $("#username").val();
        var password = $("#password").val();
              if (username && password) {

            $.post("https://open-commerce.herokuapp.com/api/signup", {
                    username: username,
                    password: password
                },
                function(response) {
                    if (response.success) {
                        alert("signup successful!");

                    } else {
                        alert(response.message);
                    }
                });

        } else {
            alert("please provide a username and password for signup!");
        }

    });

    $("#loginBtn").click(function(event) {
        event.preventDefault();

        var username = $("#username").val();
        var password = $("#password").val();

        if (username && password) {
            $.post("https://open-commerce.herokuapp.com/api/login", {
                    username: username,
                    password: password
                },
                function(response) {
                    if (response.success) {
                        var cookie = "x-access-token=" + response.token;
                        document.cookie = cookie;
                        window.location.href = "2017-04-30-font-end/index.html/index.html";
                    } else {
                        alert(response.message);
                    }

                });

        } else {
            alert("please provide a username and password for login!");

        }
    });

    $("#logoutNav").click(function(event) {
            event.preventDefault()
            deletCookie('x-access-token');
            window.location.href = "index.html"

        }

    )

});
