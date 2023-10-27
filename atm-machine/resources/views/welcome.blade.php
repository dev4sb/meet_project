<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Atm-Machine</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous">
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>

<body>
    <main class="outter-body">
        <div class=" main-div">
            <div class="main-body">
                <div class="body-1">
                    <div class="display-div flex inner-body-1">
                        {{-- Background div for blur effect --}}
                        <div class="background"></div>
                        {{-- Content --}}
                        <div class="content">
                            <div class="spinner-border spinner-display" style="" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <form class="form">
                                <meta name="csrf-token" content="{{ csrf_token() }}">
                            </form>
                        </div>
                    </div>
                    <div class="buttons-div inner-body-2">
                        <div class="nums-div button-div-block">
                            <div class="three-btn">
                                <button id="1" class="digits buttons">1</button>
                                <button id="2" class="digits buttons">2</button>
                                <button id="3" class="digits buttons">3</button>
                            </div>
                            <div class="three-btn">
                                <button id="4" class="digits buttons">4</button>
                                <button id="5" class="digits buttons">5</button>
                                <button id="6" class="digits buttons">6</button>
                            </div>
                            <div class="three-btn">
                                <button id="7" class="digits buttons">7</button>
                                <button id="8" class="digits buttons">8</button>
                                <button id="9" class="digits buttons">9</button>
                            </div>
                            <div class="three-btn">
                                <button id="." class="digits buttons">.</button>
                                <button id="0" class="digits buttons">0</button>
                                <button id="00" class="digits buttons">00</button>
                            </div>
                        </div>
                        <div class="operations-div button-div-block">
                            <div>
                                <button class="operations acc-process enter buttons" disabled="true">ENTER</button>
                            </div>
                            <div>
                                <button class="operations clear buttons" disabled="true">CLEAR</button>
                            </div>
                            <div>
                                <button class="operations cancel buttons" disabled="true">CANCEL</button>
                            </div>
                            {{-- <div>
                                <button class="operations buttons okay" disabled="true">OKAY</button>
                            </div> --}}
                        </div>
                    </div>
                </div>
                <div class="body-2">
                    <div class="receipt-div inner-body-1">
                        <div class="receipt-inn">
                            <span class="star-span"></span>
                            <p></p>
                            <p class="receipt-name"></p>
                            <p class="receipt-date"></p>
                            <p class="receipt-time"></p>
                        </div>
                        <div class="receipt-inn">
                            <span class="star-span"></span>
                            <p class="receipt-acc"></p>
                            <p class="receipt-type"></p>
                            <p class="receipt-500"></p>
                            <p class="receipt-100"></p>
                            <p class="receipt-prev-balance"></p>
                            <p class="receipt-balance"></p>
                        </div>
                        <div class="receipt-inn">
                            <span class="star-span"></span>
                            <p class="receipt-msg"></p>
                        </div>
                    </div>
                    <div class="add-card-div inner-body-2">
                        <div class="add-button">
                            <button class="add-card buttons insert">Insert Card</button>
                        </div>
                        <div class="cards-div">
                            <img src="images/1014950_6276.jpg" class="card-img img-1" id="10101010" alt="">
                            <img src="images/19058337_6081548.jpg" class="card-img img-2" id="20202020"
                                alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="notes-image">
                <img src="images/500Note.jfif" alt="" id="note_500" class="notes_display">
                <img src="images/100Note.jfif" alt="" id="note_100" class="notes_display">
            </div>
        </div>

        <div class="data-show">
            <div class="atm-data">
                <h2 class="heading-sides display-6 mb-4">ATM DATA</h2>
                <table class="atm-data-table text-center table table-secondary table-hover table-striped">
                    <thead class="t-heading">
                        <tr>
                            <td class="t-heading">Id</td>
                            <td class="t-heading">Transaction</td>
                            <td class="t-heading">100Notes</td>
                            <td class="t-heading">500Notes</td>
                            <td class="t-heading">Amount</td>
                            <td class="t-heading">Total</td>
                        </tr>
                    </thead>
                    <tbody class="atm-table-body">

                    </tbody>
                </table>
            </div>
            <div class="personal-data">
                <h2 class="heading-sides display-6 mb-4">Personal DATA</h2>
                <div>
                    <h6>First Name: <span class="fname"></span></h6>
                    <h6>Last Name: <span class="lname"></span></h6>
                    <h6>Account Number: <span class="account-number"></span></h6>
                    <h6>Balance: <span class="balance-data"></span></h6>
                </div>
            </div>
        </div>
    </main>
    <script src="js/jquery.min.js"></script>
    <script src="js/atm-machine.js"></script>
</body>

</html>
