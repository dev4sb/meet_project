<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Ajax</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous">
    </script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    {{-- spinner --}}
    <div class="spinner-border" id="spinner" style="width: 5rem; height: 5rem;" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>

    <main class="main-container">
        {{-- messages div --}}
        <div class="message-div">
            <span class="message-span"></span>
            <span><button class="btn close-msg-div"><i class="bi bi-x-lg"></i></button></span>
        </div>

        {{-- Modal for delete --}}
        <div class="modal fade" id="delete-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="delete-modalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title display-7" id="delete-modalLabel">Delete Data</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this record?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" data-bs-dismiss="modal"
                            class="btn confirm-del btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </div>

        {{-- Button trigger modal --}}
        <div class="toggle-div">
            <button type="button" id="toggle-btn" class="btn btn-dark toggle-btn registration-form"
                data-bs-toggle="modal" data-bs-target="#form-modal">
                Registeration
            </button>
        </div>

        {{-- Modal for single data --}}
        <div class="modal fade" id="profileModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="profileModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content" id="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title display-6" id="profileModalLabel"></h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="flex-row-2 mb-3 image-div">
                            <img src="" id="profile-img" class="profileImg" alt="">
                        </div>
                        <div class="flex-row-2">
                            <div class="profileDetails">
                                <div class="profile-heading">Id</div>
                                <div class="profile-value" id="profile-id"></div>
                            </div>
                            <div class="profileDetails">
                                <div class="profile-heading">First Name</div>
                                <div class="profile-value" id="profile-fname"></div>
                            </div>
                            <div class="profileDetails">
                                <div class="profile-heading">Last Name</div>
                                <div class="profile-value" id="profile-lname"></div>
                            </div>
                            <div class="profileDetails">
                                <div class="profile-heading">E-mail</div>
                                <div class="profile-value" id="profile-email"></div>
                            </div>
                            <div class="profileDetails">
                                <div class="profile-heading">Mobile</div>
                                <div class="profile-value" id="profile-number"></div>
                            </div>
                            <div class="profileDetails">
                                <div class="profile-heading">Standard</div>
                                <div class="profile-value" id="profile-std"></div>
                            </div>
                            <div class="profileDetails">
                                <div class="profile-heading">Hobbies</div>
                                <div class="profile-value" id="profile-hobby"></div>
                            </div>
                            <div class="profileDetails">
                                <div class="profile-heading">Gender</div>
                                <div class="profile-value" id="profile-gender"></div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        {{-- Modal for form --}}
        <div class="modal fade" id="form-modal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="form-modalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title display-6" id="form-modalLabel">Registration Form</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="form" method="POST" enctype="multipart/form-data">
                            <meta name="csrf-token" content="{{ csrf_token() }}">
                            {{-- file --}}
                            <div class="inputs-div">
                                <label for="file">Image</label>
                                <input type="file" name="file" id="file" class="form-control">
                                <span id="file-span" class="error-span"></span>
                            </div>
                            {{-- fname --}}
                            <div class="inputs-div">
                                <label for="fname">First Name</label>
                                <input type="text" name="fname" id="fname" class="form-control"
                                    placeholder="John">
                                <span id="fname-span" class="error-span"></span>
                            </div>
                            {{-- lname --}}
                            <div class="inputs-div">
                                <label for="lname">Last Name</label>
                                <input type="text" name="lname" id="lname" class="form-control"
                                    placeholder="Doe">
                                <span id="lname-span" class="error-span"></span>
                            </div>
                            {{-- email --}}
                            <div class="inputs-div">
                                <label for="email">E-mail</label>
                                <input type="email" name="email" id="email" class="form-control"
                                    placeholder="johnDoe@gmail.com">
                                <span id="email-span" class="error-span"></span>
                            </div>
                            {{-- number --}}
                            <div class="inputs-div">
                                <label for="number">Number</label>
                                <input type="number" name="number" id="number" class="form-control"
                                    placeholder="9988776632">
                                <span id="number-span" class="error-span"></span>
                            </div>
                            {{-- std --}}
                            <div class="inputs-div">
                                <label for="study">Standard</label>
                                <select name="study" class="form-control" id="study">
                                    <option value="" selected disabled>Select Standard</option>
                                    <option value="10">10th Standard</option>
                                    <option value="11">11th Standard</option>
                                    <option value="12">12th Standard</option>
                                </select>
                                <span id="study-span" class="error-span"></span>
                            </div>
                            {{-- hobby --}}
                            <div class="inputs-div">
                                <label for="number">Hobby</label>
                                <div class="checkbox">
                                    <div>
                                        <label for="cricket">Cricket</label>
                                        <input type="checkbox" name="hobby" id="cricket" value="Cricket"
                                            class="form-check-input">
                                    </div>
                                    <div>
                                        <label for="football">Football</label>
                                        <input type="checkbox" name="hobby" id="football" value="Football"
                                            class="form-check-input">
                                    </div>
                                    <div>
                                        <label for="basketball">BasketBall</label>
                                        <input type="checkbox" name="hobby" id="basketball" value="Basketball"
                                            class="form-check-input">
                                    </div>
                                    <div>
                                        <label for="tennis">Tennis</label>
                                        <input type="checkbox" name="hobby" id="tennis" value="Tennis"
                                            class="form-check-input">
                                    </div>
                                </div>
                                <span id="hobby-span" class="error-span"></span>
                            </div>
                            {{-- gender --}}
                            <div class="inputs-div">
                                <label for="number">Gender</label>
                                <div class="checkbox">
                                    <div>
                                        <label for="male">Male</label>
                                        <input type="radio" name="gender" id="male" value="Male"
                                            class="form-check-input">
                                    </div>
                                    <div>
                                        <label for="female">Female</label>
                                        <input type="radio" name="gender" id="female" value="Female"
                                            class="form-check-input">
                                    </div>
                                    <div>
                                        <label for="other">Other</label>
                                        <input type="radio" name="gender" id="other" value="Other"
                                            class="form-check-input">
                                    </div>
                                </div>
                                <span id="gender-span" class="error-span"></span>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button id="submit-btn" class="btn btn-success submit-btn" type="button">Submit</button>
                    </div>
                </div>
            </div>
        </div>

        {{-- table --}}
        <div class="table-div">
            <h2 class="display-4 text-center mb-3 title">
                <span class="title-word title-word-1">STUDENTS</span>
                <span class="title-word title-word-2">DATA</span>
            </h2>
            <div class="search-div">
                <input type="text" id="search-input" placeholder="search by name,email etc.." class="">
                <span class="search-icon"><i class="bi bi-search"></i></span>
            </div>
            <table id="table" class="table table-striped">
                <thead class="thead">
                    <tr>
                        <td class="thead">Id <button id="id" class="sort-btn"><i
                                    class="bi bi-arrow-down-circle" style="color:white;"></i></button></td>
                        <td class="thead">First Name <button id="fname" class="sort-btn"><i
                                    class="bi bi-arrow-down-circle" style="color:white;"></i></td>
                        <td class="thead">Last Name</td>
                        <td class="thead">E-Mail</td>
                        <td class="thead">Mobile Number</td>
                        <td class="thead">Standard</td>
                        <td class="thead">Gender</td>
                        <td class="thead">Update</td>
                        <td class="thead">Delete</td>
                    </tr>
                </thead>
                <tbody class="tbody">

                </tbody>
            </table>
            <nav aria-label="Page navigation">
                <ul class="pagination">

                </ul>
            </nav>
        </div>
    </main>
    <script src="js/jquery.min.js"></script>
    <script src="js/ajax.js"></script>
</body>

</html>
