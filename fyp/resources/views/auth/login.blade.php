@extends('layouts.app')
@section('content')

<div>
    <div class="logintitle">
        <h1>{{ isset($url) ? ucwords($url) : ""}} {{ __('Login') }}</h1>
    </div>

    <div>
        @if (Session::has('message'))
        <div>
            <p class="changesuccess">{{ Session::get('message') }}</p>
        </div>
        @endif
        <div class="loginbox">
            @isset($url)
            <form method="POST" action='{{ url("login/$url") }}' arialabel="{{ __('Login') }}">
            @else
            <form method="POST" action="{{ route('login') }}" arialabel="{{ __('Login') }}">
            @endisset
            @csrf

            @if(Route::is('login.admin'))
            <p for="adminID">{{ __('Admin ID') }}</p>
            <input id="adminID" type="text" class="form-control @error('adminID') is-invalid @enderror" name="adminID" value="{{ old('adminID') }}" required autocomplete="off">
            <span style="color:red; text-align:center" class="errormessage">@error('adminID'){{$message}}@enderror</span>
            @else
            <p for="studentID">{{ __('Student ID') }}</p>
            <input id="studentID" type="text" class="form-control @error('studentID') is-invalid @enderror" name="studentID" value="{{ old('studentID') }}" required autocomplete="off">
            <span style="color:red; text-align:center" class="errormessage">@error('studentID'){{$message}}@enderror</span>
            @endif

            <p for="password">{{ __('Password') }}</p>
            <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">
            <span style="color:red; text-align:center" class="errormessage">@error('password'){{$message}}@enderror</span>

            <div class="loginbtn">
                <button type="submit">
                    {{ __('Login') }}
                </button>
            </div>

            @if(!Route::is('login.admin'))
            <div class="resetbtn">
                <a class="reset" href="/reset">
                    Reset Password
                </a>
            </div>
            @endif
            
            </form>
            
        </div>
        <a href="/">Back</a>
    </div>
</div>
@endsection
