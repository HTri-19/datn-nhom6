<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product_images;
class Product extends Model
{
    use HasFactory;
<<<<<<< HEAD
    protected $table = 'product'; // tên bảng
=======
    protected $table = 'products'; // tên bảng
>>>>>>> 37a6b765b36580278b52e4f2d4a1ba3732d81850
    protected $fillable = ['name', 'category_id', 'description', 'status'];
       public function category()
    {
        return $this->belongsTo(Categories::class, 'category_id');
    }
    public function images()
    {
        return $this->hasMany(Product_images::class, 'product_id');
    }
    public function comments()
    {
        return $this->hasMany(Comment::class, 'product_id');
    }
}
