const apiUsersUrl = "https://localhost:7195/api/Users";
const apiMailUrl = "https://localhost:7195/api/Mails";
var user = JSON.parse(sessionStorage.getItem('user'));

$(document).ready(function () {

    //prevent the form from submitting defaultly
    $('#loginForm').submit(function (event) {
        event.preventDefault();

        const email = $('#email').val();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Invalid email format.");
            return;
        }

        const forgotPasswordData = {
            EmailToId: email,
            EmailToName: '',
            EmailSubject: 'PLC Reset Password',
            EmailBody: 'Click on the link to reset your password: http://localhost:61543/Client/Pages/resetPassword.html'

        };

        async function checkEmailExists(email) {

            ajaxCall('GET', apiUsersUrl + '/GetUserByEmail/' + email, null, getCheckSCBF, getcheckECBF);
        }

        function getCheckSCBF(response) {
            console.log(response);
            if (response.id == 0) {
                alert("Email does not exist in the system.");
                return;
            }
            else {
                submitToServer(forgotPasswordData);
                //$('#sendPassBtn').on('click', function () {
                //    window.location.href = "afterSendingMail.html";
                //    });

            }

        }

        function getcheckECBF(response) {
            console.log(response);
        }
        
        checkEmailExists(email);


        //// Need to implement this function and in SQL too and The server --------------------------------------------------
        async function submitToServer(forgotPasswordData) {

            ajaxCall('POST', apiMailsUrl, JSON.stringify(forgotPasswordData), postSCBF, postECBF);
        }

        function postSCBF(response) {
            console.log(response);
            if (response) {
                sessionStorage.setItem('user', JSON.stringify(response));
            }
        }

        function postECBF(response) {
            console.log(response);

        }
    });



 
    $('#homeBtn').on('click', function () {
        window.location.href = "../Pages/index.html";
    });


});