<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});
//
//Route::get('list','UserController@list');

Route::post('user/login', 'UserController@login');
Route::post('user/register', 'UserController@register');
Route::group(['middleware' => 'auth:api'], function(){
    Route::get('user/details', 'UserController@details');
    Route::post('comment/add', 'CommentsController@save');
    Route::get('comment/chart', 'CommentsController@chart');
    Route::get('comment/view', 'CommentsController@view');
    Route::put('user/update', 'UserController@update');
    Route::put('user/addImage','UserController@addImage');
    Route::get('user/getImage','UserController@getImage');
    Route::put('user/setCity','UserController@setCityName');
    Route::get('user/getCity','UserController@getCityName');
    Route::post('field/add','FieldOfInterestController@add');
    Route::delete('field/remove','FieldOfInterestController@remove');
    Route::delete('comment/remove','CommentsController@remove');
    Route::get('field/view','FieldOfInterestController@view');
});
