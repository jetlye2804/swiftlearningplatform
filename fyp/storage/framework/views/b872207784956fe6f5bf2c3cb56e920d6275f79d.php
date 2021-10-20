<!DOCTYPE html>
<html>
    <head>

    <link rel="stylesheet" href="<?php echo e(asset('css/header.css')); ?>">
    <link rel="stylesheet" href="<?php echo e(asset('css/megamenu.css')); ?>">
    <link rel="stylesheet" href="<?php echo e(asset('css/home.css')); ?>">

    <?php if(Auth::guard("admin")->check()): ?>
    <title>Admin Home Page</title>
    <?php else: ?>
    <title>Home Page</title>
    <?php endif; ?>
    </head>

    <header>
        <?php echo $__env->make('layouts.banner', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    </header>

    <?php if(Auth::guard("admin")->check()): ?>
    <div id="homeadmin" 
        authAdminID="<?php echo e(Auth::guard('admin')->user()->adminID); ?>"
        authAdminName="<?php echo e(Auth::guard('admin')->user()->adminName); ?>"></div>
    <?php else: ?>
    <div id="homepage" 
        authUserName="<?php echo e(Auth::guard('web')->user()->studentName); ?>"></div>
    <?php endif; ?>
    
    
    <body>
    </body>

    <script src="/js/app.js"></script>

</html><?php /**PATH C:\Users\Jet Lye\Desktop\ProjectFile\resources\views/home.blade.php ENDPATH**/ ?>