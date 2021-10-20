<!DOCTYPE html>
<html>
    <head>
    <link rel="stylesheet" href="<?php echo e(asset('css/firsttime.css')); ?>">
    <title>First Time Login</title>
    </head>
    
    <div id="onboard" 
        authUserID="<?php echo e(Auth::guard('web')->user()->studentID); ?>"
    ></div>
    <body>
    <body>
    </body>

    <script src="/js/app.js"></script>

</html><?php /**PATH C:\Users\Jet Lye\Desktop\fyp\resources\views/firstTimeLogin.blade.php ENDPATH**/ ?>