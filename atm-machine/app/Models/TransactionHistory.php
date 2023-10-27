<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransactionHistory extends Model
{
    use HasFactory;
    protected $table = 'transaction_history';
    protected $fillable = ['account_no','notes_500','notes_100','transaction','amount','total'];
}
