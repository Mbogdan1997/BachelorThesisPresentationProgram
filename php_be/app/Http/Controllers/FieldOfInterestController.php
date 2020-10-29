<?php


namespace App\Http\Controllers;
use App\FieldOfInterest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class FieldOfInterestController extends Controller
{
    public $successStatus = 200;

    public function add(Request $request){
        $field=new FieldOfInterest;
        $field->field_name=$request->field_name;
        $field->user_id=Auth::id();
       $ok=true;
       $fieldOfInterest=DB::table('field_of_interests')->where('user_id',Auth::id() )
           ->pluck('field_name');
               foreach ($fieldOfInterest as $fieldName) {
                  if($fieldName==$request->field_name)
                        $ok=false;
              }
                if($ok) {
                    $field->save();
                }
                $success["field"]=$field;
                return response()->json(['success'=>$success], $this-> successStatus);

    }

    public function view(){
        $fieldOfInterest=DB::table('field_of_interests')->where('user_id',Auth::id() )->pluck('field_name');
        $text='';
        foreach ($fieldOfInterest as $fieldName) {
            $text.="$fieldName,";
        }
        $success["fields"]=$text;
        return response()->json(['success' => $success], $this-> successStatus);
    }

    public function remove(Request $request){
        DB::table('field_of_interests')
            ->where([['user_id',Auth::id()],['field_name',$request->field_name] ])->delete();

    }


}
