<!DOCTYPE html>
<html>
    <head>
    <link rel="stylesheet" href="{{asset('css/error.css')}}">
    <title>Uh-oh!</title>
    </head>
    <body>
    @if(Auth::guard("web")->check())
        @if(Auth::guard('web')->user()->isOnboard == false)
        <h1>Please change your password before using the platform.</h1>
        <p>403 - Unauthorized Action</p>
        @else
        <h1>Seems like you are not a new user...</h1>
        <p>403 - Unauthorized Action</p>
        @endif
    @elseif(Auth::guard("admin")->check())
        <h1>Only super admin can access this route.</h1>
        <p>403 - Unauthorized Action</p>
    @else
        <h1>You are not allowed to access this page.</h1>
        <p>403 - Unauthorized Action</p>
    @endif
    </body>

</html>