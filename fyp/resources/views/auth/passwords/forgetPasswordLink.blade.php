@extends('layouts.app')
@section('content')

<div>
    <div class="resettitle">
        <h1>Reset Password</h1>
    </div>
    <div class="reminder">
        <p>Your password should have a minimum of 8 characters with combinations of letters and numeric characters. <br />
            Capital letters are optional.</p>
    </div>
    <div class="resetbox">
        <form action="{{ route('reset.password.post') }}" method="POST">
            @csrf
            <div>
                <p for="email_address">E-Mail Address</p>
                <div>
                    <input type="text" id="email_address" class="form-control" name="email" required autocomplete="off">
                    @if ($errors->has('email'))
                    <div class="errormsg">
                        <p>{{ $errors->first('email') }}<p>
                    <div>
                    @endif
                </div>
            </div>

            <div>
                <p for="password">Password</p>
                <div>
                    <input type="password" id="password" class="form-control" name="password" required autofocus onkeypress='validate(event)'>
                    @if ($errors->has('password'))
                    <div class="errormsg">
                        <p>{{ $errors->first('password') }}<p>
                    <div>
                    @endif
                </div>
            </div>

            <div>
                <p for="password-confirm">Confirm Password</p>
                <div>
                    <input type="password" id="password-confirm" class="form-control" name="password_confirmation" required autofocus onkeypress='validate(event)'>
                    @if ($errors->has('password_confirmation'))
                    <div class="errormsg">
                        <p>{{ $errors->first('password_confirmation') }}<p>
                    <div>
                    @endif
                </div>
            </div>

            <div class="sendlinkbtn">
                <button type="submit" class="sendlink">
                    Reset Password
                </button>
            </div>
        </form>
    </div>
    @if (Session::has('message'))
        <div>
            <p class="errormsg">{{ Session::get('message') }}</p>
        </div>
    @endif
</div>

<script>
    function validate(evt) {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
    // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9a-zA-Z]|\./;
    if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
    }
</script>
@endsection