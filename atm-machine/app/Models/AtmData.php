<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AtmData extends Model
{
    use HasFactory;
    protected $table = 'atmdata';
    protected $fillable = ['transaction','notes_500','notes_100','amount','total'];
}
