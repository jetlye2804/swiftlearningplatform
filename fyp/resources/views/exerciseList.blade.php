<!DOCTYPE html>
<html>
    <head>

    <link rel="stylesheet" href="{{asset('css/header.css')}}">
    <link rel="stylesheet" href="{{asset('css/list.css')}}">
    <link rel="stylesheet" href="{{asset('css/megamenu.css')}}">
    

    <title>Exercise List</title>
    </head>

    <header>
        @include('layouts.banner')
    </header>

    @if(Auth::guard("admin")->check())
    <div id="exerciseList" isAdminStr="true"
    ></div>
    @else
    <div id="exerciseList"
    ></div>
    @endif
    <body></body>

    <script src="/js/app.js"></script>

</html>
