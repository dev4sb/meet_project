<?php

namespace App\Http\Controllers;

use App\Models\AtmData;
use App\Models\Data;
use App\Models\TransactionHistory;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class getDataController extends Controller
{
    public function getData()
    {
        $data = request()->all();
        $accNo = $data['accNo'];
        $pin_num = $data['pinVal'];
        $select = DB::table('data')->join('pin', 'data.id', '=', 'pin.id')->select('*')->where('account_no', '=', $accNo)->where('pin_num', '=', $pin_num)->get();
        // if($select === 0){
        //     $msg = 0;
        //     return $msg;
        //     // session(['account_num'=>$accNo]);
        //     // $session = session('account_num');
        //     // return json_encode($session);
        // }else{
        //     return json_encode($select);   
        // }
        return ($select);
    }

    public function getAtmData()
    {
        $select = DB::table('atmdata')->select('*')->orderBy('id', 'desc')->limit(10)->get('*');
        return ($select);
    }

    public function withdraw()
    {
        $data = request()->all();
        $accNo = $data['accNo'];
        $accId = $data['accId'];
        $amount = $data['amountVal'];
        $transaction_type = $data['transaction'];
        $notes500InAtm = $data['notes500InAtm'];
        $notes100InAtm = $data['notes100InAtm'];
        $notes500 = $data['notes500'];
        $notes100 = $data['notes100'];
        $inAtm = $data['inAtm'];
        $inAcc = $data['inAcc'];
        $total500Notes = $notes500InAtm - $notes500;
        $total100Notes = $notes100InAtm - $notes100;
        $totalInAtm = $inAtm - $amount;
        $totalInAcc = $inAcc - $amount;
        if ($data) {
            // for bank acc
            $update_data = Data::find($accId);
            $update_data->balance = $totalInAcc;
            $update_data->save();
            if ($update_data->save()) {
                //for atm
                $atmdata = AtmData::create([
                    'transaction' => $transaction_type,
                    'notes_500' => $total500Notes,
                    'notes_100' => $total100Notes,
                    'amount' => $amount,
                    'total' => $totalInAtm
                ]);

                if ($atmdata) {
                    //transaction history
                    $transaction = TransactionHistory::create([
                        'account_no' => $accNo,
                        'notes_500' => $notes500,
                        'notes_100' => $notes100,
                        'transaction' => $transaction_type,
                        'amount' => $amount,
                        'total' => $totalInAcc
                    ]);
                    if ($transaction) {
                        date_default_timezone_set('Asia/Kolkata');
                        $getDate = time();
                        $date = date("d-m-Y", $getDate);
                        $time = date("h:i:sa");
                        $array = [
                            'account' => $accNo,
                            'amount' => $amount,
                            'notes_500' => $notes500,
                            'notes_100' => $notes100,
                            'previousBalance' => $inAcc,
                            'totalBalance' => $totalInAcc,
                            'date' => $date,
                            'time' => $time
                        ];
                        return $array;
                    } else {
                        return 0;
                    }
                } else {
                    return 0;
                }
            } else {
                $update_data->balance = $inAcc;
                $update_data->save();
                return 0;
            }
        }
    }

    public function deposit()
    {
        $data = request()->all();
        $accNo = $data['accNo'];
        $accId = $data['accId'];
        $amount = $data['totalDeposit'];
        $transaction_type = $data['transaction'];
        $notesDepo100 = $data['notesDepo100'];
        $notesDepo500 = $data['notesDepo500'];
        $notes500InAtm = $data['notes500InAtm'];
        $notes100InAtm = $data['notes100InAtm'];
        $inAtm = $data['inAtm'];
        $inAcc = $data['inAcc'];
        $total100Notes = $notes100InAtm + $notesDepo100;
        $total500Notes = $notes500InAtm + $notesDepo500;
        $totalInAtm = $inAtm + $amount;
        $totalInAcc = $inAcc + $amount;

        if ($data) {
            // for bank acc
            $update_data = Data::find($accId);
            $update_data->balance = $totalInAcc;
            $update_data->save();
            if ($update_data->save()) {
                //for atm
                $atmdata = AtmData::create([
                    'transaction' => $transaction_type,
                    'notes_500' => $total500Notes,
                    'notes_100' => $total100Notes,
                    'amount' => $amount,
                    'total' => $totalInAtm
                ]);

                if ($atmdata) {
                    //transaction history
                    $transaction = TransactionHistory::create([
                        'account_no' => $accNo,
                        'notes_500' => $notesDepo500,
                        'notes_100' => $notesDepo100,
                        'transaction' => $transaction_type,
                        'amount' => $amount,
                        'total' => $totalInAcc
                    ]);
                    if ($transaction) {
                        date_default_timezone_set('Asia/Kolkata');
                        $getDate = time();
                        $date = date("d-m-Y", $getDate);
                        $time = date("h:i:sa");
                        $array = [
                            'account' => $accNo,
                            'amount' => $amount,
                            'notes_500' => $notesDepo500,
                            'notes_100' => $notesDepo100,
                            'previousBalance' => $inAcc,
                            'totalBalance' => $totalInAcc,
                            'date' => $date,
                            'time' => $time
                        ];
                        return $array;
                    } else {
                        return 0;
                    }
                } else {
                    return 0;
                }
            } else {
                $update_data->balance = $inAcc;
                $update_data->save();
                return 0;
            }
        }
    }
}
