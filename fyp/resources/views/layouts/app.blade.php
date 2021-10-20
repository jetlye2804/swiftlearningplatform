<!doctype html>
<html>
    <head>
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <link rel="stylesheet" href="{{asset('css/login.css')}}">
        @if(Route::is('login.admin'))
        <title>Admin Login</title>
        @else
        <title>Student Login</title>
        @endif

    </head>
    <body>
        <div id="app">
            <main>
                @yield('content')
            </main>
        </div>
    </body>
</html>
