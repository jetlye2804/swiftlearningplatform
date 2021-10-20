<!DOCTYPE html>
<html>
    <head>
    <link rel="stylesheet" href="{{asset('css/firsttime.css')}}">
    <title>First Time Login</title>
    </head>
    
    <div id="onboard" 
        authUserID="{{Auth::guard('web')->user()->studentID}}"
    ></div>
    <body>
    <body>
    </body>

    <script src="/js/app.js"></script>

</html>