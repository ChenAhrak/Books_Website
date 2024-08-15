// JavaScript source code
const booksApiURL = "https://localhost:7195/api/Books";
const usersApiUrl = "https://localhost:7195/api/Users";

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

    getUsers();
    function getUsers() {
        ajaxCall('GET', usersApiUrl+"/GetAllUsers", "", getUsersSCBF, getUsersECBF);
    }

    function getUsersSCBF(response) {
        console.log(response);
        userDataTable(response);
    }

    function getUsersECBF(err){
        console.log(err);
    }


    function userDataTable(response) { 
        $('#usersDataTable').DataTable({
            data: response,
            pageLength: 10,
            columns: [

                {
                    data: "id",
                    title: "User ID",
                    render: function (data, type, row, meta) {
                        return '<p>' + data + '</p>';
                    }
                },

                {
                    data: "userName",
                    title: "User Name",

                    render: function (data, type, row, meta) {
                        return '<p>' + data + '</p>';
                    }
                },

                {
                    data: "email",
                    title: "User Email",
                    render: function (data, type, row, meta) {
                        return '<p>' + data + '</p>';
                    }
                },

                {
                    data: "password",
                    title: "password",
                    render: function (data, type, row, meta) {
                        return '<p>' + data + '</p>'
                    }
                },

                {
                    data: "isAdmin",
                    title: "Admin",
                    render: function (data, type, row, meta) {
                        return '<input type="checkbox" class="isAdminCheckbox" id="isAdmin' + meta.row + '" data-course-id="' + row.id + '"' + (data ? ' checked="checked"' : '') + ' disabled />';
                    }
                },

                {
                    data: "isActive",
                    title: "Active",
                    render: function (data, type, row, meta) {
                        return '<input type="checkbox" class="isActiveCheckbox" id="isActive' + meta.row + '" data-course-id="' + row.id + '"' + (data ? ' checked="checked"' : '') + ' disabled />';
                    }
                },

                {
                    title: "Action",
                    render: function (data, type, row, meta) {
                        let dataUser = "data-userId='" + row.id + "'";
                        //let dataUser = row.id;

                        editBtn = "<button type='button' class = 'editBtn btn btn-success' " + dataUser + "> Edit </button>";
                        viewBtn = "<button type='button' class = 'viewBtn btn btn-info' " + dataUser + "> View </button>";
                        deleteBtn = "<button type='button' class = 'deleteBtn btn btn-danger' " + dataUser + "> Delete </button>";
                        return editBtn + viewBtn + deleteBtn;
                    }
                },
            ],
            destroy: true // Allow reinitialization of the table
        });
        buttonEvents();
    }


    function buttonEvents() {

        $(document).on("click", ".editBtn", function () {
            mode = "edit";
            markSelected(this);
            $("#editDiv").show();
            $("#editDiv :input").prop("disabled", false); // edit mode: enable all controls in the form
            //populateFields(this.getAttribute('data-carId')); // fill the form fields according to the selected row
        });

        $(document).on("click", ".viewBtn", function () {
            mode = "view";
            markSelected(this);
            $("#editDiv").show();
            row.className = 'selected';
            $("#editDiv :input").attr("disabled", "disabled"); // view mode: disable all controls in the form
            //populateFields(this.getAttribute('data-carId'));
        });

        $(document).on("click", ".deleteBtn", function () {
            mode = "delete";
            markSelected(this);
            console.log(this);
            var userId = this.getAttribute('data-userId');
            console.log(userId);
            swal({ // this will open a dialouge 
                title: "Are you sure ??",
                text: "",
                icon: "warning",
                buttons: true,
                dangerMode: true
            })
                .then(function (willDelete) {
                    if (willDelete) deleteUser(userId);
                    else swal("Not Deleted!");
                });
        });
    }


});

function deleteUser(id) {
    ajaxCall('DELETE', usersApiUrl +"/"+ id, "", deleteUserSCBF, deleteUserECBF);
}

function deleteUserSCBF(response) {
    console.log(response);
}

function deleteUserECBF(err) {
    console.log(err);
}


// not sure if needed - selects and highlights the row
function markSelected(btn) {
    $("#usersDataTable tr").removeClass("selected"); // remove seleced class from rows that were selected before
    row = (btn.parentNode).parentNode; // button is in TD which is in Row
    row.className = 'selected'; // mark as selected
}