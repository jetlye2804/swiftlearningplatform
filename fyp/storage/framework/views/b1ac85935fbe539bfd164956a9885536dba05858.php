<!DOCTYPE html>
<html>
    <head>

    <link rel="stylesheet" href="<?php echo e(asset('css/header.css')); ?>">
    <link rel="stylesheet" href="<?php echo e(asset('css/megamenu.css')); ?>">
    <link rel="stylesheet" href="<?php echo e(asset('css/home.css')); ?>">

    <title>Admin Home Page</title>
    </head>

    <header>
        <?php echo $__env->make('layouts.banner', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    </header>
    
    <div id="homeadmin" 
        authAdminID="<?php echo e(Auth::guard('admin')->user()->adminID); ?>"
        authAdminName="<?php echo e(Auth::guard('admin')->user()->adminName); ?>"></div>
    <body>
    </body>

    <script src="/js/app.js"></script>

</html><?php /**PATH C:\Users\Jet Lye\Desktop\FYP\resources\views/homeAdmin.blade.php ENDPATH**/ ?>