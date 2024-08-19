const apiMailUrl = "https://localhost:7195/api/Mails";

var userMail = JSON.parse(sessionStorage.getItem('mail'));

$(document).ready(function () {
    $('#loginForm').submit(function (event) {
        event.preventDefault();

        const forgotPasswordData = {
            EmailToId: userMail,
            EmailToName: '',
            EmailSubject: 'PLC Reset Password',
            EmailBody: 'Click on the link to reset your password: http://localhost:61543/Client/Pages/resetPassword.html'

        };

        async function sendEmailToUser(forgotPasswordData) {

            await ajaxCall('POST', apiMailUrl, JSON.stringify(forgotPasswordData), postSCBF, postECBF);
        }

        function postSCBF(response) {
    
            console.log(response);
            alert("Mail Sent");
        }

        function postECBF(response) {
            console.log(response);
        }

        sendEmailToUser(forgotPasswordData);

    });

    $('#login').click(function () {

        window.location.href = "login.html";
    });
});
