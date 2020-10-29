<?php


namespace App\Http\Controllers;
use App\User;
use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;


class UserController extends  Controller
{
    public $successStatus = 200;
    function list(){
        return User::all();
    }

    public function details()
    {
        $user = Auth::user();
        return response()->json(['success' => $user], $this-> successStatus);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $input = $request->all();
        $input['password'] = bcrypt($input['password']);
        $user = User::create($input);
        $success['token'] =  $user->createToken('MyApp')-> accessToken;
        $success['name'] =  $user->name;
        return response()->json(['success'=>$success], $this-> successStatus);
    }

    public function login(){
        if(Auth::attempt(['email' => request('email'), 'password' => request('password')])){
            $user = Auth::user();
            $success['token'] =  $user->createToken('MyApp')-> accessToken;
            return response()->json(['success' => $success], $this-> successStatus);
        }
        else{
            return response()->json(['error'=>'Unauthorised'], 401);
        }
    }

    public function update(Request $request){

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);
        }
        $input = $request->all();
        $user_from_db=User::find(Auth::id());
        $user_from_db->password=bcrypt($input['password']);
        $user_from_db->name=$input['name'];
        $user_from_db->email=$input['email'];
        $user_from_db->save();
        $success['token'] =  $user_from_db->createToken('MyApp')-> accessToken;
        $success['name'] = $user_from_db->name;
        return response()->json(['success'=>$success], $this-> successStatus);

    }

    public function addImage(Request $request){
        $user_from_db=User::find(Auth::id());
        $user_from_db->profile_image=$request->profile_image;
        $user_from_db->save();
        $success['image'] = $request->profile_image;
        return response()->json(['success'=>$success], $this-> successStatus);
    }

    public function getImage(){
        $user_from_db=User::find(Auth::id());
        $success['image']= $user_from_db->profile_image;
        return  response()->json(['success'=>$success], $this-> successStatus);
    }

    public function setCityName(Request $request){
        $user_from_db=User::find(Auth::id());
        $user_from_db->cityName=$request->cityName;
        $user_from_db->save();
        $success['cityName'] = $request->cityName;
        return response()->json(['success'=>$success], $this-> successStatus);
    }

    public function getCityName(Request $request){
        $user_from_db=User::find(Auth::id());
        $success['cityName'] =$user_from_db->cityName;
        return response()->json(['success'=>$success], $this-> successStatus);
    }
}
