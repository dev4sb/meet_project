<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ShowDataController extends Controller
{
    public function showData(){
        $students = DB::table("data")->select("*")->limit(5)->get();
        return json_encode($students);
    }
    public function count(){
        $students = DB::table('data')->count('*');
        return json_encode($students);
    }
    public function paginate($offset){
        $students = DB::table('data')->select('*')->limit(5)->offset($offset)->get();
        return json_encode($students);
    }
    public function sortData($id,$sortType){
        $select = DB::table('data')->select('*')->orderBy($id,$sortType)->get();
        return json_encode($select);
    }
    public function searchData($val){
        $select = DB::table('data')->select('*')->where('fname','=',$val)->orWhere('lname','=',$val)->orWhere('email','=',$val)->get();
        return json_encode($select);
    }
    public function singleData($id){
        $select = DB::table("data")->where('id','=',$id)->get();
        return json_encode($select);
    }
}
