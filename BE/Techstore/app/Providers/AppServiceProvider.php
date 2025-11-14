<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
<<<<<<< HEAD
            $this->app->singleton(\App\Services\ProductService::class, function($app) {
            return new \App\Services\ProductService();
        });
=======
        //
>>>>>>> 37a6b765b36580278b52e4f2d4a1ba3732d81850
    }
}
