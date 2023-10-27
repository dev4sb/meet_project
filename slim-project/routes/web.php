<?php

use App\Http\Controllers\deleteDataController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ShowDataController;
use App\Http\Controllers\updateDataController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::post('/insertData',[ImageController::class,'uploads']);

Route::get('/showData/singleData/{id}',[ShowDataController::class,'singleData']);

Route::get('/showData/all',[ShowDataController::class,'showData']);

Route::get('/showData/count',[ShowDataController::class,'count']);

Route::get('/showData/pagination/{offset}',[ShowDataController::class,'paginate']);

Route::get('/showData/searchData/{val}',[ShowDataController::class,'searchData']);

Route::get('/showData/sortData/{id}/{sortType}',[ShowDataController::class,'sortData']);

Route::delete('/deleteData/{id}',[deleteDataController::class,'deleteData']);

Route::post('/updateData/{id}',[updateDataController::class,'updateData']);
