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
            .randomPassword
            {
                margin: 50px;
                padding: 10px;
            }
            .randomPassword p
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
            <h1>Welcome, New user</h1>
        </div>

        <div class="emailContent">
            <div class="emailtitle">
                <h2>Hello!</h2>
            </div>

            <p>
                You have been successfully registered into Swift Learning Playground by the administrator.<br />

                Here's the system generated password for you to login into the system.
                <div class="randomPassword">
                    <p><?php echo e($randomPassword); ?></p>
                </div>

                To access the system, please proceed to the link below:<br />
                (Link will provided when deploy to the web hosting service).<br />

                Take note that you are compulsory to change your password once you have logged into the system. Your new password should be have a minimum of 8 characters with combinations of letters and numeric characters. Capital letters are optional.<br />

                Should you have any concerns or questions, please contact to the administrator immediately.<br />
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


<?php /**PATH C:\Users\Jet Lye\Desktop\FYP\resources\views/email/addedUser.blade.php ENDPATH**/ ?>