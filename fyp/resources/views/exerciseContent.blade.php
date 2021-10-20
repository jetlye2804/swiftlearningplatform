<!DOCTYPE html>
<html>
    <head>

    <link rel="stylesheet" href="{{asset('css/header.css')}}">
    <link rel="stylesheet" href="{{asset('css/megamenu.css')}}">
    <link rel="stylesheet" href="{{asset('css/exercise.css')}}">

    @if(Auth::guard("admin")->check())
    <link rel="stylesheet" href="{{asset('css/modal.css')}}">
    @endif
    </head>

    <header>
        @include('layouts.banner')
    </header>
    
    @if(Auth::guard("admin")->check())
    <div id="exercise" isAdminStr="true"></div>
    @else
    <div id="exercise"></div>
    @endif
    <body></body>

    <script src="/js/app.js"></script>
</html>
