<!DOCTYPE html>
<html>
    <head>

    <link rel="stylesheet" href="{{asset('css/header.css')}}">
    <link rel="stylesheet" href="{{asset('css/megamenu.css')}}">
    <link rel="stylesheet" href="{{asset('css/lesson.css')}}">

    @if(Auth::guard("admin")->check())
    <link rel="stylesheet" href="{{asset('css/modal.css')}}">
    @endif
    </head>

    <header>
        @include('layouts.banner')
    </header>

    @if(Auth::guard("admin")->check())
    <div id="topic" isAdminStr="true"></div>
    @else
    <div id="topic"></div>
    @endif
    <body></body>

    <script src="/js/app.js"></script>
</html>