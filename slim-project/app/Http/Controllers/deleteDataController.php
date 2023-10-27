<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class deleteDataController extends Controller
{
    public function deleteData($id){
        $delete = DB::table('data')->where('id','=',$id)->delete();
        return json_encode($delete);
    }
}
