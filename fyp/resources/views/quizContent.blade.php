<!DOCTYPE html>
<html>
    <head>

    <link rel="stylesheet" href="{{asset('css/header.css')}}">
    <link rel="stylesheet" href="{{asset('css/megamenu.css')}}">
    <link rel="stylesheet" href="{{asset('css/quiz.css')}}">
    </head>

    <header>
        @include('layouts.banner')
    </header>
    
    <div id="quiz" authUserID="{{Auth::guard('web')->user()->studentID}}"></div>
    <body>
    
    </body>

    <script src="/js/app.js"></script>

</html>