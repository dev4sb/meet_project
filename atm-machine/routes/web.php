<?php

use App\Http\Controllers\getAmountController;
use App\Http\Controllers\getDataController;
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

Route::post('/getData/getSingle',[getDataController::class,'getData']);

Route::post('/getAmount',[getAmountController::class,'getAmount']);

Route::get('/getData/getAtmBalance',[getDataController::class,'getAtmData']);

Route::post('/getData/withdraw',[getDataController::class,'withdraw']);

Route::post('/getData/deposit',[getDataController::class,'deposit']);
