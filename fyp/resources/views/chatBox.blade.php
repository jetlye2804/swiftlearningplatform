<!DOCTYPE html>
<html>
    <head>
    <link rel="stylesheet" href="{{asset('css/header.css')}}">
    <link rel="stylesheet" href="{{asset('css/megamenu.css')}}">
    <link rel="stylesheet" href="{{asset('css/chat.css')}}">

    <title>Chatbox</title>
    </head>

    <header>
        @include('layouts.banner')
    </header>
    
    @if(Auth::guard("admin")->check())
    <div id="adminchatpage" 
        authUserID="{{Auth::guard('admin')->user()->adminID}}"
        authUserName="{{Auth::guard('admin')->user()->adminName}}"></div>
    @else
    <div id="chatpage" 
        authUserID="{{Auth::guard('web')->user()->studentID}}"
        authUserName="{{Auth::guard('web')->user()->studentName}}"></div>
    @endif
    <body>
    </body>

    <script src="/js/app.js"></script>
</html>