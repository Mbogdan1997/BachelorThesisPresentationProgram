<?php


namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Comment;


class CommentsController extends  Controller {

    public $successStatus = 200;

    public function save(Request $request){
        $comment=new Comment;
        $comment->text=$request->text;
        $comment->date=$request->date;
        $comment->user_id=Auth::id();
        echo $comment->save();
        $success['comment']=$comment;
        return response()->json(['success' => $success], $this-> successStatus);

    }

    public function view(){
        $comments=DB::table('comments')->where('user_id',Auth::id() )->get();
//        foreach ($comments as $comment) {
//            echo $comment->text;
//       }
        $success['comments']=$comments;
        return response()->json(['success' => $success], $this-> successStatus);
    }

    public function remove(Request $request){
        DB::table('comments')->where("id",$request->id)->delete();
        $success["id"]=$request->id;
        return response()->json(['success' => $success], $this-> successStatus);
    }

    public function chart(){
        $chart=DB::table('comments')
            ->select(DB::raw('DATE(date) as x'), DB::raw('count(*) as y'))
            ->groupBy('x')
            ->get();
        $success["chart"]=$chart;
        return response()->json(['success' => $success], $this-> successStatus);
    }

}
