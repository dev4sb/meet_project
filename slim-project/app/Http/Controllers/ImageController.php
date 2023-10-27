<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\data;

class ImageController extends Controller
{
    public function uploads(Request $request){
        if($request->hasFile('file')){
            //form data
            $data = request()->all();
            $fname = $data['fname'];
            $lname = $data['lname'];
            $email = $data['email'];
            $number = $data['number'];
            $study = $data['study'];
            $hobbyArr = $data['hobby'];
            $hobby = implode(",",$hobbyArr);
            $gender = $data['gender'];
            //image upload
            $image = $request->file('file');
            $image_name = time() . ".". $image->getClientOriginalExtension();
            $image->move(public_path('upload/'),$image_name);
            if($image){
                $model = new data();
                $model->fname = $fname;
                $model->lname = $lname;
                $model->email = $email;
                $model->mobile = $number;
                $model->image = $image_name;
                $model->std = $study;
                $model->hobby = $hobby;
                $model->gender = $gender;

                $model->save();
                return response()->json(['success'=>'Data Uploaded']);
            }
        }else{
            return response()->json(['success'=>'image not Uploaded']);
        }
    }
}
