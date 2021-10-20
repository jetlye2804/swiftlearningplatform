<!DOCTYPE html>
<html>
    <head>

    <link rel="stylesheet" href="{{asset('css/header.css')}}">
    <link rel="stylesheet" href="{{asset('css/list.css')}}">
    <link rel="stylesheet" href="{{asset('css/megamenu.css')}}">
    <title>Quiz List</title>
    </head>

    <header>
        @include('layouts.banner')
    </header>
    
    @if(Auth::guard("admin")->check())
    <div id="quizList" isAdminStr="true"></div>
    @else
    <div id="quizList"></div>
    @endif
    <body></body>
    <script src="/js/app.js"></script>

</html>
