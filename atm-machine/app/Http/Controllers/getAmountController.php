<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class getAmountController extends Controller
{
    public function getamount(){
        $data = request()->all();
        $acc_no = $data['accNo'];
        $amount = $data['amountVal'];
        $select = DB::table('data')->select('*')->where('account_no','=',$acc_no)->get('*');
        
        return json_encode($select);
    }
}
