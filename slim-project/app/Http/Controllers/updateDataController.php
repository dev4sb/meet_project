<?php

namespace App\Http\Controllers;

use App\Models\data;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class updateDataController extends Controller
{
    public function updateData($id){
        $data = request()->all();
        $img = request()->file('file');
        if($img){
            $model = data::find($id);
            $img_name = time() . "." . $img->getClientOriginalExtension();
            $img->move(public_path('/upload'),$img_name);
            $hobbyArr = $data['hobby'];
            $hobby = implode(",",$hobbyArr);
            $model->fname = $data['fname']; 
            $model->lname = $data['lname'];
            $model->email = $data['email'];
            $model->mobile = $data['number'];
            $model->image = $img_name;
            $model->std = $data['study'];
            $model->hobby = $hobby;
            $model->gender = $data['gender'];
            $model->save();
            return response()->json(['success'=>'Data updated']);
        }
    }
}
