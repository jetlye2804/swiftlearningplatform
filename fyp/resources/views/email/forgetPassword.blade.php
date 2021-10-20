<html>
    <head>
        <style>
            *
            {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            }
            .emailHeader, .emailFooter
            {
                background-color: cornflowerblue;
                color: white;
                padding: 10px;
            }
            .emailHeader h1, .verifycode, .emailFooter
            { 
                text-align: center;
            }
            .emailContent
            {
                line-height: 1.5;
                margin: 20px;
                background-color: white;
            }
            .emailtitle
            {
                margin-bottom: 30px;
            }
            .verifycode
            {
                margin: 50px;
                padding: 10px;
            }
            .verifycode p
            {
                font-size: 32px;
            }
            .regards
            {
                margin-top: 30px;
            }
        </style>
    </head>
    <body>
        <div class="emailHeader">
            <h1>Password Reset Email</h1>
        </div>

        <div class="emailContent">
            <div class="emailtitle">
                <h2>Hello!</h2>
            </div>

            <p>
                This is the email notification to reset your password, as you requested in a while.<br />

                Here's the six digit verification code.
                <div class="verifycode">
                    <p>{{$sixdigit}}</p>
                </div>

                Take note that this six digit code is only last for 30 minutes.<br />

                If you did not request a password reset, please contact to the administrator immediately.<br />
            </p>

            <div class="regards">
                <p>
                    Regards,<br />
                    Swift Learning Playground
                </p>
            </div>
        </div>
        <div class="emailFooter">
            Swift Learning Playground, all wrongs reserved.
        </div>
    </body>
<html>


