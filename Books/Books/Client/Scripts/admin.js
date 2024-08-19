// JavaScript source code
const booksApiUrl = "https://localhost:7195/api/Books";
const usersApiUrl = "https://localhost:7195/api/Users";
const userBooksApiUrl = "https://localhost:7195/api/UserBooks";

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
                        return '<input type="text" class="editUserName" id="editUserName' + row.id + '" value="' + data + '" data-user-name="' + row.id + '" disabled>';
                    }
                },

                {
                    data: "email",
                    title: "User Email",
                    render: function (data, type, row, meta) {
                        //return '<p>' + data + '</p>';
                        return '<input type="text" class="editEmail" id="editEmail' + row.id + '" value="' + data + '" data-email="' + row.id + '" disabled>';
                    }
                },

                {
                    data: "password",
                    title: "password",
                    render: function (data, type, row, meta) {
                        //return '<p>' + data + '</p>';
                        return '<input type="text" class="editPassword" id="editPassword' + row.id + '" value="' + data + '" data-password="' + row.id + '" disabled>';
                    }
                },

                {
                    data: "isAdmin",
                    title: "Admin",
                    render: function (data, type, row, meta) {
                        return '<input type="checkbox" class="isAdminCheckbox" id="isAdmin' + meta.row + '" data-isAdmin="' + row.id + '"' + '" value="' + data + '"' + (data ? ' checked="checked"' : '') + ' disabled />';
                    }
                },

                {
                    data: "isActive",
                    title: "Active",
                    render: function (data, type, row, meta) {
                        return '<input type="checkbox" class="isActiveCheckbox" id="isActive' + meta.row + '" data-isActive="' + row.id + '"' + '" value="' + data + '"' + (data ? ' checked="checked"' : '') + ' disabled />';
                    }
                },

                {
                    title: "Action",
                    render: function (data, type, row, meta) {
                        let dataUser = "data-userId='" + row.id + "'";
                        //let dataUser = row.id;

                        editBtn = "<button type='button' class = 'editBtn btn btn-success' " + dataUser + "> Edit </button>";
                        viewBtn = "<button type='button' class = 'saveBtn btn btn-info' " + dataUser + "> Save </button>";
                        deleteBtn = "<button type='button' class = 'deleteBtn btn btn-danger' " + dataUser + "> Delete </button>";
                        return editBtn + viewBtn + deleteBtn;
                    }
                },
            ],
            rowCallback: function (row, data, index) {
                // Add a unique ID to each row, based on the row's ID
                $(row).attr('id', 'row-' + data.id);
                
                $(row).on('click', function () {
                    $("#usersDataTable tr").removeClass("selected");
                    console.log('Row clicked: ', data.id);
                    getUserLibrary(data.id);
                    row.classList.add('selected');
                    //row.className = 'selected';
                });
            },
            destroy: true // Allow reinitialization of the table
        });
        buttonEvents();
    }


    function buttonEvents() {

        $(document).on("click", ".editBtn", function () {
            disableInputs();
            //mode = "edit";
            markSelected(this);
            $(".selected :input").prop("disabled", false); // edit mode: enable all controls in the form
        });

        $(document).on("click", ".saveBtn", function () {
            //mode = "view";
            markSelected(this);
            row.className = 'selected';
            
            //item = document.getElementsByClassName("selected");
            var child = row.childNodes[4].childNodes[0].getAttribute("value");

            console.log(row.childNodes[0].childNodes[0].textContent);
            var data = {
                id: row.childNodes[0].childNodes[0].textContent.trim(),
                userName: row.childNodes[1].childNodes[0].value,
                email: row.childNodes[2].childNodes[0].value,
                password: row.childNodes[3].childNodes[0].value,
                isAdmin: row.childNodes[4].childNodes[0].checked,
                isActive: row.childNodes[5].childNodes[0].checked,
            };
            updateUser(data);
            $(".selected :input").attr("disabled", "disabled"); // view mode: disable all controls in the form
            $(".selected :button").attr("disabled", false);
            $("#usersDataTable tr").removeClass("selected");
            
        });

        $(document).on("click", ".deleteBtn", function () {
            mode = "delete";
            markSelected(this);
            console.log(this);
            var userId = this.getAttribute('data-userId');
            swal({ // this will open a dialouge 
                title: "Deleting this user permenantly?",
                text: "",
                icon: "warning",
                buttons: true,
                dangerMode: true
            })
                .then(function (willDelete) {
                    if (willDelete && !user.isAdmin) deleteUser(userId);
                    else swal("User was not deleted!");
                });
        });
    }

    showAllLibraryInfo();
    

});


const toggleModeCheckbox = document.getElementById('toggle-mode');
const currentTheme = localStorage.getItem('theme');

function showAllLibraryInfo() {
}

function getAllLibraryInfo() {
    ajaxCall('GET', userBooksApiUrl + "/getBooksNumInLibraries", "", getAllLibraryInfoSCBF, getAllLibraryInfoECBF);
}

function getAllLibraryInfoSCBF(response) {
    showAllLibraryInfo(response);
    console.log(response);
}

function getAllLibraryInfoECBF(err) {
    console.log(err);
}

getAllLibraryInfo();

// Apply the saved theme on load
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    toggleModeCheckbox.checked = true;
} else {
    document.body.classList.remove('dark-mode');
}

// Toggle dark mode and save the theme
toggleModeCheckbox.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

// to add functionality
function renderUserBooks(data) {
    var booksContainer = $('#userBooks');
    booksContainer.empty();
    if (data != null && data.length > 0) {
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const headers = Object.keys(data[0]);
        headers.forEach(header => {
            const th = document.createElement('th');
            th.innerText = header;
            headerRow.appendChild(th);
        });
        thead.append(headerRow);
        booksContainer.append(thead);
        

        console.log(data);
        data.forEach(book => {
            const publishedYear = new Date(book.publishedDate).getFullYear();
            var bookElement = $('<tr>');
            bookElement.append('<td><span>' + book.id + '</span></td>');
            bookElement.append('<td><span>' + book.title + '</span></td>');
            bookElement.append('<td><span>' + book.subtitle + '</span></td>');
            bookElement.append('<td><span>' + book.language + '</span></td>');
            bookElement.append('<td><span>' + book.publisher + '</span></td>');
            bookElement.append('<td><span>' + publishedYear + '</span></td>');
            bookElement.append('<td><span>' + book.pageCount + '</span></td>');
            bookElement.append('<td><span>' + book.printType + '</span></td>');
            bookElement.append('<td><span>' + book.price + ' ILS' + '</span></td>');
            bookElement.append('<td><span>' + book.status + '</span></td>');
            bookElement.append('<td><img src="' + book.thumbnail + '" alt="book image" /></td>');
            bookElement.append('<td><span>' + book.authors + '</span></td>');
            bookElement.append('<td><span>' + book.isEbook + '</span></td>');

            booksContainer.append(bookElement);
        });
    } else {
        booksContainer.append("<h3>No books in user's library</h3>");
        //console.log("No books in library");
    }
}

function getUserLibrary(userId) {
    ajaxCall('GET', userBooksApiUrl + `/getUserLibrary/${userId}`, "", getUserLibrarySCBF, getUserLibraryECBF);
}

function getUserLibrarySCBF(response) {
    renderUserBooks(response);
    console.log(response);
}

function getUserLibraryECBF(err) {
    console.log(err);
}

function disableInputs() {
    $("input").attr("disabled", "disabled");
}

///////////// need to check if need to add control for each save button  ///////////////////////////
function updateUser(data) {

    ajaxCall('PUT', usersApiUrl + `/UpdateUserData/${data.id}`, JSON.stringify(data), updateUserSCBF, updateUserECBF);
}

function updateUserSCBF(response) {
    console.log(response);
}

function updateUserECBF(err) {
    console.log(err);
}

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