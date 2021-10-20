<!DOCTYPE html>
<html>
    <head>

    <link rel="stylesheet" href="{{asset('css/profile.css')}}">
    <link rel="stylesheet" href="{{asset('css/header.css')}}">
    <link rel="stylesheet" href="{{asset('css/megamenu.css')}}">
    @if(Auth::guard("admin")->check())
    <link rel="stylesheet" href="{{asset('css/modal.css')}}">
    @endif

    @if(Auth::guard("admin")->check())
    <title>Admin Profile</title>
    @else
    <title>Student Profile</title>
    @endif
    
    </head>

    <header>
        @include('layouts.banner')
    </header>
    
    @if(Auth::guard("admin")->check())
    <div id="adminpage" 
        authAdminID="{{Auth::guard('admin')->user()->adminID}}"></div>
    @else
    <div id="studentpage" 
        authUserID="{{Auth::guard('web')->user()->studentID}}"></div>
    @endif
    
    <body>
    </body>

    <script src="/js/app.js"></script>

</html>