<!DOCTYPE html>
<html>
    <head>
    <link rel="stylesheet" href="{{asset('css/header.css')}}">
    <link rel="stylesheet" href="{{asset('css/list.css')}}">
    <link rel="stylesheet" href="{{asset('css/megamenu.css')}}">

    @if(Auth::guard("admin")->check())
    <link rel="stylesheet" href="{{asset('css/modal.css')}}">
    @endif
    
    <title>Topic List</title>
    </head>

    <header>
        @include('layouts.banner')
    </header>
    
    @if(Auth::guard("admin")->check())
    <div id="topicList" isAdminStr="true"
    ></div>
    @else
    <div id="topicList"
    ></div>
    @endif
    <body>
    </body>

    <script src="/js/app.js"></script>

</html>



