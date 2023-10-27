$(document).ready(function () {
    const displayDiv = $(".display-div");
    let sideH3 = $('<h3 class="text-end sideH3"></h3>');
    let msg = $('<div class="msgs-div"><h5 class="messages"></h5></div>');
    let headingACC = $('<h3 class="text-center headingAcc">Please Select Any One</h3>'); // select any heading for account type
    let bankBalance = 0; //bankBalance initially 0
    let atmBalance = 0; //atmBalance initially 0
    let notes500InAtm = 0; //500 notes in atm
    let notes100InAtm = 0; //100 notes in atm
    let accId = ""; //accId ex:(accId = 1 accNo = 10101010)
    displayDiv.prepend('<h2 class="text-center start-heading">Please Insert Your Card</h2>'); //

    //show spinner
    function showSpinner() {
        $('.spinner-display').fadeIn();
        $('.accNo').hide();
        $('.input').hide();
        $('.acc-type').hide();
        $('.headingAcc').hide();
        msg.hide()
    }
    //hide spinner
    function hideSpinner() {
        $('.spinner-display').fadeOut();
        $('.accNo').fadeIn();
        $('.sideH3').fadeIn();
        $('.input').fadeIn();
        $('.headingAcc').fadeIn();
        $('.acc-type').fadeIn();
        msg.fadeIn();
    }
    hideSpinner();

    //show error msgs
    function showMsg(message,time) {
        displayDiv.prepend(msg);
        $('.messages').text(message);
        setTimeout(() => {
            msg.remove();
        }, time);
    }

    //check atm balance
    function checkAtmBalance() {
        showSpinner()
        $.ajax({
            type: "GET",
            url: "/getData/getAtmBalance",
            success: function (data) {
                console.log(data)
                $('.atm-data-table').find('.atm-table-body').html("")
                let count = 1;
                data.forEach(function (row) {
                    let tr = $('<tr>');
                    tr.append('<td>' + count + '</td>')
                    tr.append('<td>' + row.transaction + '</td>');
                    tr.append('<td>' + row.notes_100 + '</td>');
                    tr.append('<td>' + row.notes_500 + '</td>');
                    tr.append('<td>' + row.amount + '</td>');
                    tr.append('<td>' + row.total + '</td>');
                    $('.atm-data-table').find('.atm-table-body').append(tr)
                    count++
                })
                atmBalance = data[0]['total'];
                notes500InAtm = data[0]['notes_500'];
                notes100InAtm = data[0]['notes_100'];
                if (atmBalance < 100) {
                    displayDiv.prepend(msg);
                    $('.messages').text("No Money in the ATM Right Now");
                }
                hideSpinner()
            }
        });
    }
    checkAtmBalance();

    //add class and remove class
    function addRemoveClass(target, add, remove = null) {
        if (remove != null) {
            $(target).removeClass(remove);
        }
        if (add != null) {
            $(target).addClass(add);
        }
    }

    let accNo;  //get accId on click card-img
    $('.card-img').on('click', function () {
        if ($(this).hasClass('on-process')) {

        } else {
            $('.card-img').removeClass('add-border');
            $(this).addClass('add-border');
            accNo = $(this).attr('id');
        }
    });

    //Insert-remove Card
    $(document).on("click", ".add-card", function () {
        addRemoveClass($('.enter'), 'acc-process', 'amount-process');
        //check if acc no is getting or not
        if (accNo == '' || accNo == undefined) {
            showMsg("Please Insert Card",2000);
        } else {
            if ($(this).hasClass('remove')) {
                checkAtmBalance() //check atm balance after removing card
                //remove card inn effect from display
                if (accNo == 10101010) {
                    $('#10101010').removeClass('card-in-effect-1');
                    $('#20202020').css('opacity', 1);
                } else {
                    $('#20202020').removeClass('card-in-effect-2');
                    $('#10101010').css('opacity', 1);
                }
                $('.notes_display').removeClass('note_500'); //remove notes from display 
                $('.notes_display').removeClass('note_100');
                removePerData() //remove personal data on removing card
                accNo = '';  //removing value after removing card
                $('.input').val('');
                amountVal = "";
                $('.sideH3').removeClass('thank-you')
                $('.sideH3').remove()
                displayDiv.prepend('<h2 class="text-center start-heading">Please Insert Your Card</h2>'); //Insert card heading
                addRemoveClass(this, 'insert', 'remove'); //add insert class and remove
                $('.card-img').removeClass('on-process'); //remove class from card-img
                $('.card-img').removeClass('add-border'); //remove class from card-img
                $(".add-card").removeClass("hover-effect"); //remove red hover effect
                $('.thank-you').remove(); //remove thank you msg
                removeReceipt(); //remove receipt data on click
                $(this).text("Insert Card");
            } else {
                if (accNo == 10101010) {
                    $('#10101010').addClass('card-in-effect-1');
                    $('#20202020').css('opacity', 0);
                } else {
                    $('#20202020').addClass('card-in-effect-2')
                    $('#10101010').css('opacity', 0);
                }
                $('.operations').removeAttr('disabled'); //remove disabled attr on insert btn
                $('.card-img').addClass('on-process') //add class from card-img
                $('.start-heading').remove(); //remove starting heading
                displayDiv.prepend('<h6 class="text-start accNo mt-4">Acc No: ' + accNo + '</h6>');
                $(sideH3).insertAfter('.accNo'); //append h3 for pin
                $('.sideH3').addClass('enter-pin');
                $('.sideH3').text('Enter Your PIN');
                addRemoveClass(this, 'remove', 'insert');
                $(this).attr('disabled', 'true');
                $(this).text("Remove Card");
                $("input[name='acc']").attr('disabled', 'true');

                $(".form").append('<input type="password" class="text-end input pin-number">');
            }
        }
    });

    let pinVal = ""; //for storing pin value
    let amountVal = ""; //for storing amount value
    let notesDepo100 = "";
    let notesDepo500 = "";
    //get digits on click
    $(document).on("click", ".digits", function () {
        if ($('.input').hasClass('pin-number')) {
            pinVal += $(this).attr('id');
            $(".pin-number").val(pinVal);
        } else if ($('.input').hasClass('amount')) {
            amountVal += $(this).attr('id');
            $(".amount").val(amountVal);
        } else if ($('.input').hasClass('deposit-amount')) {
            if ($('.input').hasClass('notesDepo100')) {
                notesDepo100 += $(this).attr('id');
                $(".deposit-amount").val(notesDepo100);
            } else {
                notesDepo500 += $(this).attr('id');
                $(".deposit-amount").val(notesDepo500);
            }

        }
    });

    let totalDeposit = 0; //total amount to be deposited
    //On Enter
    $(document).on("click", ".enter", function () {
        let formData = new FormData();
        if ($(this).hasClass('acc-process')) {
            formData.append('pinVal', pinVal);
            formData.append('accNo', accNo);
            formData.append('_token', $('meta[name="csrf-token"]').attr('content'));
            if (pinVal.length > 0) {
                showSpinner()
                $.ajax({
                    type: "POST",
                    url: "/getData/getSingle",
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (data) {
                        //account process

                        $(".pin-number").val(''), pinVal = ""; //removing value after wrong pin
                        if (data.length > 0) {
                            addPerData(data) //add data of person in sidebar
                            hideSpinner() //hide spinner after success
                            bankBalance = data[0]['balance'];
                            accId = data[0]['id'];
                            $('.operations').attr('disabled', true); //disabling operations btns
                            $('.cancel').attr('disabled', false); //remove disable only from cancel 
                            $('.accNo').remove(); 
                            $('.enter-pin').remove();
                            $('.pin-number').remove();
                            displayDiv.prepend(headingACC);

                            if ($('.acc-type').length == 0) { //check if acc-type already append in displayDiv
                                displayDiv.append('<button class="deposit new-btn acc-type">DEPOSIT</button>');
                                displayDiv.append('<button class="withdraw new-btn acc-type">WITHDRAW</button>');
                            }
                            // displayDiv.append('<button>CHECK BALANCE</button>');
                        } else {
                            hideSpinner()
                            showMsg("Wrong PIN",1500); //show err msg for 1000ms
                            setTimeout(() => {
                                $('.cancel').click()
                            }, 1500);
                        }
                    }
                });
            }
        } else if ($(this).hasClass('amount-process')) {
            //amount process

            if (bankBalance >= amountVal && atmBalance >= amountVal) {
                showSpinner()
                //check amounVal less than 100 or not or greter than 15000 or divided by 100
                if (amountVal < 100 || amountVal > 15000 || amountVal % 100 != 0) {
                    hideSpinner()
                    if (amountVal < 100) {
                        showMsg("Please Enter More than 100",2000);
                        amountVal = "";
                        $('.amount').val('');
                    } else if (amountVal > 15000) {
                        showMsg("Please Enter Less than 15000",2000)
                        amountVal = "";
                        $('.amount').val('');
                    } else if (amountVal % 100 != 0) {
                        showMsg("Please Enter Valid Amount",2000);
                        amountVal = "";
                        $('.amount').val('');
                    }
                } else {
                    let notes500 = 0;
                    let notes100 = 0;
                    if (amountVal > 3000 && notes100InAtm >= 5) { //check input val for withdraw is greater than 3000 and count of 100's notes in atm greater than 5
                        if (notes500InAtm >= (amountVal - 500) / 500) {
                            if (amountVal % 500 == 0) {
                                let difference = (amountVal - 500);
                                notes500 = (difference / 500);
                                notes100 = (amountVal - difference) / 100;
                            } else {
                                let reminder = amountVal % 500;
                                notes500 = (amountVal - reminder) / 500;
                                notes100 = reminder / 100;
                            }
                            console.log("500 notes" + notes100InAtm + "which is greater than" + (amountVal - 500) / 500 + "and 100 notes" + notes100InAtm);
                        } else {
                            let difference = notes500InAtm * 500;
                            notes100 = (amountVal - difference) / 100;
                            notes500 = notes500InAtm;
                            console.log("500 notes" + notes100InAtm + "which is less than" + (amountVal - 500) / 500 + "and 100 notes" + notes100InAtm);
                        }
                    } else {
                        let reminder = amountVal % 500;
                        if (notes500InAtm >= (amountVal - reminder) / 500) {
                            if (amountVal % 500 == 0) {
                                notes500 = amountVal / 500;
                            } else {
                                if (notes100InAtm >= reminder / 100) {
                                    notes500 = (amountVal - reminder) / 500;
                                    notes100 = reminder / 100;
                                } else {
                                    console.log("100 notes are too low " + notes100InAtm)
                                    showMsg("Less Number of 100's Notes",1000);
                                    setTimeout(() => {
                                        $('.cancel').click()
                                    }, 1000);
                                }
                            }
                        } else {
                            notes100 = amountVal / 100;
                            notes500 = 0;
                        }
                    }
                    console.log(notes500 + " 500 notes");
                    console.log(notes100 + " 100 notes");
                    formData.append('accNo', accNo);
                    formData.append('accId', accId);
                    formData.append('inAtm', atmBalance);
                    formData.append('inAcc', bankBalance);
                    formData.append('amountVal', amountVal);
                    formData.append('notes500InAtm', notes500InAtm);
                    formData.append('notes100InAtm', notes100InAtm);
                    formData.append('notes500', notes500);
                    formData.append('notes100', notes100);
                    formData.append('transaction', 'withdraw');
                    formData.append('_token', $('meta[name="csrf-token"]').attr('content'));
                    $.ajax({
                        type: "POST",
                        url: "/getData/withdraw",
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (data) {
                            if (notes500 > 0) {
                                $('#note_500').addClass('note_500'); //giving 500 notes as output
                            }
                            if (notes100 > 0) {
                                $('#note_100').addClass('note_100'); //giving 100 notes as output
                            }
                            console.log(data)
                            receipt(data)
                            hideSpinner();
                            $(".add-card").addClass("hover-effect");
                            $('.add-card').removeAttr('disabled');
                            $('.operations').attr('disabled', true);
                            displayDiv.append(sideH3);
                            $('.sideH3').addClass('thank-you');
                            $('.sideH3').text('Thank You For Using KOTAK ATM');
                            $(".add-card").addClass("hover-effect");
                            $('.add-card').removeAttr('disabled');
                            $('.input').remove();
                        }
                    });
                }
            } else {
                hideSpinner()
                if (atmBalance < amountVal) {
                    showMsg("No Money in the atm",2000);
                    amountVal = "";
                    $('.amount').val('');
                } else if (bankBalance < amountVal) {
                    amountVal = "";
                    $('.amount').val('');
                    showMsg("Your Bank Balance is low",2000);
                }
            }
        } else if ($(this).hasClass('deposit-process')) {
            if ($('.input').hasClass('notesDepo100')) {
                $(".sideH3").text("Enter count of 500's Note");
                $('.input').val('');
                addRemoveClass($('.input'), 'notesDepo500', 'notesDepo100');
            } else if ($('.input').hasClass('notesDepo500')) {
                if (totalDeposit == NaN) {
                    totalDeposit = 0;
                }
                if (notesDepo100 == "" || parseInt(notesDepo100) == NaN) {
                    notesDepo100 = 0;
                }
                if (notesDepo500 == "" || parseInt(notesDepo500) == NaN) {
                    notesDepo500 = 0;
                }
                console.log(notesDepo100 + "100")
                console.log(notesDepo500 + "500")
                $('.input').val('');
                $('.input').removeClass('notesDepo500')
                $(this).addClass("check-status");
                $(".sideH3").text('Press Enter If Total is Correct');
                $('<h5 class="text-end sideH3100 sideH3"></h5>').insertAfter('.sideH3');
                $('<h5 class="text-end sideH3500 sideH3"></h5>').insertAfter('.sideH3100')
                $('.sideH3100').text(notesDepo100 + "*" + 100 + "=" + notesDepo100 * 100)
                $('.sideH3500').text(notesDepo500 + "*" + 500 + "=" + notesDepo500 * 500)
                totalDeposit = parseInt(notesDepo100) * 100 + parseInt(notesDepo500) * 500;
                $('<h5 class="text-end sideH3Total sideH3"></h5>').insertAfter('.sideH3500')
                $('.sideH3Total').text("Total = " + totalDeposit);
                console.log(totalDeposit)
            } else if ($(this).hasClass('check-status')) {
                showSpinner()
                if (totalDeposit < 100) {
                    hideSpinner();
                    $('.add-card').removeAttr('disabled');
                    $('.operations').attr('disabled', true);
                    $(".add-card").addClass("hover-effect");
                    $('.input').remove();
                    console.log("Please enter Valid Amount")
                } else {
                    formData.append('totalDeposit', totalDeposit);
                    formData.append('accNo', accNo);
                    formData.append('accId', accId);
                    formData.append('notes100InAtm', notes100InAtm);
                    formData.append('notes500InAtm', notes500InAtm);
                    formData.append('notesDepo100', notesDepo100);
                    formData.append('notesDepo500', notesDepo500);
                    formData.append('inAtm', atmBalance);
                    formData.append('inAcc', bankBalance);
                    formData.append('transaction', 'Deposit');
                    formData.append('_token', $('meta[name="csrf-token"]').attr('content'));

                    $.ajax({
                        type: "POST",
                        url: "/getData/deposit",
                        data: formData,
                        processData: false,
                        contentType: false,
                        success: function (data) {
                            notesDepo100 = "";
                            notesDepo500 = ""; //remove deposit amount after success
                            hideSpinner()
                            receipt(data);
                            $(".add-card").addClass("hover-effect");
                            $('.add-card').removeAttr('disabled');
                            $('.operations').attr('disabled', true);
                            $('.sideH3').remove()
                            displayDiv.prepend(sideH3);
                            $('.sideH3').addClass('thank-you');
                            $('.sideH3').text('Thank You For Using KOTAK ATM');
                            $(".add-card").addClass("hover-effect");
                            $('.add-card').removeAttr('disabled');
                            $('.input').remove();
                        }
                    });
                }
            }
        }
    });

    //clear pin,deposit,amount value
    $(document).on("click", ".clear", function () {
        pinVal = '';
        amountVal = '';
        depositAmount = '';
        notesDepo100 = '';
        notesDepo500 = '';
        $(".input").val('');
    });

    //cancel process
    $(document).on("click", ".cancel", function () {
        $('.operations').attr('disabled', true);
        $('.accNo').remove();
        $('.enter-pin').remove();
        $('.input').remove();
        $('.deposit').remove();
        notesDepo100 = "";
        notesDepo500 = ""; //remove deposit amount after cancel
        $('.withdraw').remove();
        $('.curr-sav').remove();
        $(".add-card").addClass("hover-effect");
        $('.add-card').removeAttr('disabled');
        $('.headingAcc').remove();
        //remove receipt data
        $('.receipt-inn').hide();
        removeReceipt();
        $('.sideH3').remove()
        displayDiv.prepend(sideH3);
        $('.sideH3').addClass('thank-you');
        $('.sideH3').text('Thank You For Using KOTAK ATM');
    });

    //withdraw click
    $(document).on("click", ".withdraw", function () {
        addRemoveClass($('.enter'), 'amount-process', 'acc-process');
        $('.operations').attr('disabled', true);
        $('.cancel').attr('disabled', false); //remove disable only from cancel 
        $('.acc-type').remove();
        if ($('.curr-sav').length == 0) {
            displayDiv.append('<button class="new-btn current curr-sav">CURRENT</button>');
            displayDiv.append('<button class="new-btn saving curr-sav">SAVINGS</button>');
        }
    });

    //deposit click
    $(document).on('click', ".deposit", function () {
        addRemoveClass($('.enter'), 'deposit-process', 'acc-process');
        $('.headingAcc').remove(); //remove heading of select any one
        $('.operations').removeAttr('disabled');
        $('.acc-type').remove();
        displayDiv.prepend(sideH3);
        $(".sideH3").text("Enter count of 100's Note");
        $(".form").append('<input type="text" class="text-end input notesDepo100 deposit-amount">');
        // $('<div class="notes-btn-div"><button id="100" class="buttons notes-btn">100</button> <button id="500" class="buttons notes-btn">500</button> <button class="buttons add-btn" id="add">Add</div>').insertAfter('.sideH3')
    });

    //current savings click
    $(document).on("click", ".curr-sav", function () {
        $('.operations').removeAttr('disabled');
        $('.headingAcc').remove(); //remove heading of select any one
        $('.curr-sav').remove(); //remove current-saving acc btns
        displayDiv.prepend(sideH3);
        $(".sideH3").text('Enter Amount');
        $(".form").append('<input type="text" class="text-end input amount">');
    });

    //receipt generate
    function receipt(dataArr) {
        $('.receipt-inn').show();
        let receiptAcc = dataArr['account'];
        let acc = receiptAcc.slice(0, 5) + "*****";
        $('.star-span').text('*************************');
        $('.receipt-acc').text('Acc No: ' + acc);
        $('.receipt-type').text('Amount: ' + dataArr['amount']);
        $('.receipt-500').text("500 notes: " + dataArr['notes_500']);
        $('.receipt-100').text("100 notes: " + dataArr['notes_100']);
        $('.receipt-prev-balance').text('Previous Balance: ' + dataArr['previousBalance']);
        $('.receipt-balance').text('New Aval Balance: ' + dataArr['totalBalance']);
        $('.receipt-date').text('Date: ' + dataArr['date']);
        $('.receipt-time').text('Time: ' + dataArr['time']);
        $('.receipt-msg').text('Thank You For Using KOTAK ATM');
    }

    function removeReceipt() {
        $('.star-span').text('');
        $('.receipt-acc').text('');
        $('.receipt-type').text('');
        $('.receipt-prev-balance').text('');
        $('.receipt-balance').text('');
        $('.receipt-date').text('');
        $('.receipt-time').text('');
        $('.receipt-msg').text('');
        $('.receipt-100').text('');
        $('.receipt-500').text('');
    }

    function addPerData(data) {
        $('.fname').text(data[0]['fname']);
        $('.lname').text(data[0]['lname']);
        $('.balance-data').text(data[0]['balance']);
        $('.account-number').text(data[0]['account_no']);
    }

    function removePerData() {
        $('.fname').text('');
        $('.lname').text('');
        $('.balance-data').text('');
        $('.account-number').text('');
    }
    
});