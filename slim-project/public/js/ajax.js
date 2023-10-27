
$(document).ready(function () {
    //spinner onload for 1000ms
    $(".main-container").hide();
    $("#spinner").fadeIn();
    setTimeout(() => {
        $("#spinner").fadeOut();
        $(".main-container").fadeIn();
    }, 1000);

    //msg-div function for show msgs
    $(".message-div").hide();
    function showMsg(className, msg) {
        $(".message-div").fadeIn();
        if (className == 'error-msg') {
            $(".message-div").addClass(className);
            $(".message-div").removeClass("bg-warning");
            $(".message-div").removeClass("bg-info");
            $(".message-div").removeClass("success-msg");
        } else if (className == 'success-msg') {
            $(".message-div").addClass(className);
            $(".message-div").removeClass("bg-info");
            $(".message-div").removeClass("bg-warning");
            $(".message-div").removeClass("error-msg");
        } else if (className == 'bg-warning') {
            $(".message-div").addClass(className);
            $(".message-div").removeClass("bg-info");
            $(".message-div").removeClass("success-msg");
            $(".message-div").removeClass("error-msg");
        } else if(className == 'bg-info'){
            $(".message-div").addClass(className);
            $(".message-div").removeClass("bg-warning");
            $(".message-div").removeClass("success-msg");
            $(".message-div").removeClass("error-msg");
        }
        $(".message-span").text(msg);
        setTimeout(() => {
            $(".message-div").fadeOut();
        }, 4000);
    }
    $(document).on("click", ".close-msg-div", function () {
        $(".message-div").fadeOut();
        $(".message-span").text("");
    });

    //table layout 
    function tableLayout(data) {
        let table = $("#table");
        let parsedData = JSON.parse(data);
        table.find(".tbody").html("");
        parsedData.forEach(function (row) {
            let tr = $("<tr>");
            tr.append("<td>" + row.id + "</td>");
            tr.append("<td><a href='' data-bs-toggle='modal' data-bs-target='#profileModal' class='singleVal' id='" + row.id + "'>" + row.fname + "</a></td>");
            tr.append("<td>" + row.lname + "</td>");
            tr.append("<td>" + row.email + "</td>");
            tr.append("<td>" + row.mobile + "</td>");
            tr.append("<td>" + row.std + "</td>");
            tr.append("<td>" + row.gender + "</td>");
            tr.append('<td><button id="' + row.id + '" class="btn btn-warning singleData-btn toggle-btn" data-bs-toggle="modal" data-bs-target="#form-modal">Update</button></td>');
            tr.append('<td><button id="' + row.id + '" class="btn delete-btn btn-danger" data-bs-toggle="modal" data-bs-target="#delete-modal">Delete</button></td>');
            table.find(".tbody").append(tr);
        });
    }

    //Load data
    function loadData() {
        $.ajax({
            url: '/showData/all',
            type: "GET",
            success: function (data) {
                tableLayout(data)
            }
        });
    }
    loadData();

    //Getting single value card with img
    $(document).on("click", ".singleVal", function (e) {
        e.preventDefault();
        let id = $(this).attr('id');
        $.ajax({
            url: "/showData/singleData/" + id,
            type: "GET",
            success: function (data) {
                let parsedData = JSON.parse(data);
                $("#profile-img").attr('src', 'upload/' + parsedData[0].image);
                $("#profile-id").text(parsedData[0].id);
                $("#profileModalLabel").text(parsedData[0].fname + " " + parsedData[0].lname);
                $("#profile-fname").text(parsedData[0].fname);
                $("#profile-lname").text(parsedData[0].lname);
                $("#profile-email").text(parsedData[0].email);
                $("#profile-number").text(parsedData[0].mobile);
                $("#profile-std").text(parsedData[0].std);
                $("#profile-hobby").text(parsedData[0].hobby);
                $("#profile-gender").text(parsedData[0].gender);
            }
        });
    });

    //add error msg and error-class
    function addErr(selector = null, span, msg = "This field is required") {
        if (selector != null) {
            selector.addClass("error");
        }
        span.show().text(msg);
    }

    //remove error msg and error-class
    function removeErr(selector, span) {
        if (selector != null) {
            selector.removeClass("error");
        }
        span.hide().text("");
    }

    //remove all errors
    function removeAll() {
        removeErr($("#file"), $("#file-span"));
        removeErr($("#fname"), $("#fname-span"));
        removeErr($("#lname"), $("#lname-span"));
        removeErr($("#email"), $("#email-span"));
        removeErr($("#number"), $("#number-span"));
        removeErr($("#study"), $("#study-span"));
        removeErr(null, $("#hobby-span"));
        removeErr(null, $("#gender-span"));
    }

    //submit-btn click and update single data in form
    let updateId; //getting id for updating data
    $(document).on("click", ".toggle-btn", function () {
        //fetching single data if user clicks on update btn
        if ($(this).hasClass("singleData-btn")) {
            updateId = $(this).attr("id");
            $("#submit-btn").html("Update");
            $("#submit-btn").addClass("update-btn");
            //remove err if someone had clicked onsubmit and occurs errors after removeAll() it will not show errors in dialog
            removeAll();
            $.ajax({
                url: "/showData/singleData/" + updateId,
                type: "GET",
                success: function (data) {
                    let parsedData = JSON.parse(data);
                    let hobbyArr = (parsedData[0].hobby).split(",");
                    $('input[name="hobby"]').each(function () {
                        let check = $(this).val();
                        if (hobbyArr.includes(check)) {
                            $(this).prop('checked', true);
                        } else {
                            $(this).prop('checked', false);
                        }
                    });
                    $('#fname').val(parsedData[0].fname);
                    $('#lname').val(parsedData[0].lname);
                    $('#email').val(parsedData[0].email);
                    $('#number').val(parsedData[0].mobile);
                    $('#study').val(parsedData[0].std);
                    $('input[name="gender"][value="' + parsedData[0].gender + '"]').prop("checked", true);
                }
            });
        } else {
            //remove form fields values inititally and remove class update-btn
            $("#form").trigger('reset');
            $("#submit-btn").html("Submit");
            $("#submit-btn").removeClass("update-btn");
            removeAll();
        }
    });

    $(this).attr('data-bs-dismiss','modal');
    //Insert and update data
    $(document).on("click", ".submit-btn", function () {
        let file_data = $('#file').prop('files')[0];
        let formData = new FormData();  // Create an empty FormData object

        formData.append('file', file_data);
        formData.append('fname', $('#fname').val());
        formData.append('lname', $('#lname').val());
        formData.append('email', $('#email').val());
        formData.append('number', $('#number').val());
        formData.append('study', $('#study').val());
        $('input[name="hobby"]:checked').each(function () {
            formData.append('hobby[]', $(this).val());
        });

        formData.append('gender', $('input[name="gender"]:checked').val());

        formData.append('_token', $('meta[name="csrf-token"]').attr('content'));

        if (
            $("#file").val() == "" ||
            $("#fname").val() == "" ||
            $("#lname").val() == "" ||
            $("#email").val() == "" ||
            $("#number").val() == "" ||
            $("study").val() == "" ||
            $('input[name="hobby"]:checked').length == 0 ||
            $('input[name="gender"]:checked').length == 0
        ) {
            //check file
            if ($("#file").val() == "") {
                addErr($("#file"), $("#file-span"));
            } else {
                removeErr($("#file"), $("#file-span"));
            }

            //check fname
            if ($("#fname").val() == "") {
                addErr($("#fname"), $("#fname-span"));
            } else {
                removeErr($("#fname"), $("#fname-span"));
            }
            //check lname
            if ($("#lname").val() == "") {
                addErr($("#lname"), $("#lname-span"));
            } else {
                removeErr($("#lname"), $("#lname-span"));
            }
            //check email
            if ($("#email").val() == "") {
                addErr($("#email"), $("#email-span"));
            } else {
                removeErr($("#email"), $("#email-span"));
            }
            //check number
            if ($("#number").val() == "") {
                addErr($("#number"), $("#number-span"));
            } else {
                removeErr($("#number"), $("#number-span"));
            }
            //check std
            if ($("#study").val() == null) {
                addErr($("#study"), $("#study-span"));
            } else {
                removeErr($("#study"), $("#study-span"));
            }
            //check hobby
            if ($('input[name="hobby"]:checked').length == 0) {
                addErr(null, $("#hobby-span"), "Please Select Atleast one hobby");
            } else {
                removeErr(null, $("#hobby-span"));
            }
            //check gender
            if ($('input[name="gender"]:checked').length == 0) {
                addErr(null, $("#gender-span"), "Please Select Atleast one value");
            } else {
                removeErr(null, $("#gender-span"));
            }
        } else {
            if ($(this).hasClass("update-btn")) {
                //updating data
                $.ajax({
                    url: "/updateData/" + updateId,
                    type: "POST",
                    processData: false,
                    contentType: false,
                    data: formData,
                    success: function (data) {
                        loadData();
                        showMsg('bg-info','Data Updated Successfully');
                        $(".modal-header .btn-close").click();
                    }
                });
            } else {
                //inserting data
                $.ajax({
                    url: "/insertData",
                    type: "POST",
                    processData: false,
                    contentType: false,
                    data: formData,
                    success: function () {
                        $("#form-modal").removeAttr('role');
                        $("#form-modal").removeClass('show');
                        $("#form-modal").css('display','none');
                        loadData();
                        showMsg('success-msg', "Data uploaded successfully");
                        $("#form").trigger("reset");
                        $(".modal-header .btn-close").click();
                    }
                });
            }
        }
    });

    //Delete btn
    $(document).on("click", ".delete-btn", function () {
        let id = $(this).attr('id');
        console.log(id);
        $(document).on("click", ".confirm-del", function () {
            $.ajax({
                url: "/deleteData/" + id,
                type: "DELETE",
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                success: function (data) {
                    loadData();
                    showMsg('bg-warning', "Data Deleted successfully");
                }
            });
        });
    });

    //search data
    $("#search-input").on("keyup", function () {
        let val = $(this).val();
        if (val == "") {
            loadData();
        } else {
            $.ajax({
                url: "/showData/searchData/" + val,
                type: "GET",
                success: function (data) {
                    tableLayout(data);
                }
            });
        }
    });

    //sort data
    $(".sort-btn").on("click", function () {
        let id = $(this).attr('id');
        let sortType;
        if ($(this).children().hasClass('bi-arrow-down-circle')) {
            $(this).children().removeClass('bi-arrow-down-circle');
            $(this).children().addClass('bi-arrow-up-circle');
            sortType = "DESC";

        } else {
            $(this).children().removeClass('bi-arrow-up-circle');
            $(this).children().addClass('bi-arrow-down-circle');
            sortType = "ASC";
        }
        $.ajax({
            url: "/showData/sortData/" + id + "/" + sortType,
            type: "GET",
            success: function (data) {
                tableLayout(data);
            }
        });
    });

    //paginate
    let perPage = 5;
    function count() {
        $.ajax({
            url: "/showData/count",
            type: "GET",
            success: function (data) {
                liCount(data);
            }
        });
    }
    count();
    function liCount(count) {
        let totalLi = Math.ceil(count / perPage);
        let ul = $(".pagination");
        for (let i = 1; i <= totalLi; i++) {
            let li = $("<li>");
            li.append('<a class="page-link paginate text-dark" id="' + i + '" href="#">' + i + '</a>');
            ul.append(li);
        }
    }
    $(document).on("click", ".paginate", function (e) {
        e.preventDefault();
        $('.paginate').removeClass('active');
        let id = $(this).attr('id');
        $(this).addClass('active');
        parseInt(id);
        let offset = perPage * (id - 1);
        $.ajax({
            url: '/showData/pagination/' + offset,
            type: "GET",
            success: function (data) {
                tableLayout(data);
            }
        })
    });
    console.log($(this))
});