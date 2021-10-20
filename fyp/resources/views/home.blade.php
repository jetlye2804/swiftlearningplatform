<!DOCTYPE html>
<html>
    <head>

    <link rel="stylesheet" href="{{asset('css/header.css')}}">
    <link rel="stylesheet" href="{{asset('css/megamenu.css')}}">
    <link rel="stylesheet" href="{{asset('css/home.css')}}">

    @if(Auth::guard("admin")->check())
    <title>Admin Home Page</title>
    @else
    <title>Home Page</title>
    @endif
    </head>

    <header>
        @include('layouts.banner')
    </header>

    @if(Auth::guard("admin")->check())
    <div id="homeadmin" 
        authAdminID="{{Auth::guard('admin')->user()->adminID}}"
        authAdminName="{{Auth::guard('admin')->user()->adminName}}"></div>
    @else
    <div id="homepage" 
        authUserName="{{Auth::guard('web')->user()->studentName}}"></div>
    @endif
    
    
    <body>
    </body>

    <script src="/js/app.js"></script>

</html>