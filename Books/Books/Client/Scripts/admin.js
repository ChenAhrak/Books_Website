// JavaScript source code
const booksApiURL = "https://localhost:7195/api/Books";

var user = JSON.parse(sessionStorage.getItem('user'));
var homeBtn = document.getElementById("homeBtn");


$(document).ready(async function () {

    if (!user || !user.isAdmin) {
        alert("ACCESS DENIED!");
        window.location.href = "login.html";
    }
    homeBtn.addEventListener('click', (event) => {
        window.location.href = "index.html";
    });


    function userDataTable() { ///////////////// change to fit users
        $('#usersDataTable').DataTable({
            data: users,
            pageLength: 10,
            columns: [

                {
                    data: "title",
                    title: "Course",
                    render: function (data, type, row, meta) {
                        return '<input type="text" class="editedTitle" id="editedTitle' + row.id + '" value="' + data + '" data-course-id="' + row.id + '" required>';
                    }
                },
                { data: "id", title: "ID" },
                {
                    data: "url",
                    title: "Course Link",
                    render: function (data, type, row, meta) {
                        return '<p><a href="' + udemy + data + '">Link</a></p>'
                    }
                },
                {
                    data: "rating",
                    title: "Rating",
                    render: function (data, type, row, meta) {
                        return '<p>' + data.toFixed(2) + '</p>'
                    }
                },

                {
                    data: "isActive",
                    title: "Active",
                    render: function (data, type, row, meta) {
                        return '<input type="checkbox" class="isActiveCheckbox" id="isActive' + meta.row + '" data-course-id="' + row.id + '"' + (data ? ' checked="checked"' : '') + ' />';
                    }
                }
            ],
            destroy: true // Allow reinitialization of the table
        });
    }


});