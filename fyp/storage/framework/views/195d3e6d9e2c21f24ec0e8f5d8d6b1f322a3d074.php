<!DOCTYPE html>
<html>
    <head>

    <link rel="stylesheet" href="<?php echo e(asset('css/profile.css')); ?>">
    <link rel="stylesheet" href="<?php echo e(asset('css/header.css')); ?>">
    <link rel="stylesheet" href="<?php echo e(asset('css/megamenu.css')); ?>">
    <?php if(Auth::guard("admin")->check()): ?>
    <link rel="stylesheet" href="<?php echo e(asset('css/modal.css')); ?>">
    <?php endif; ?>

    <?php if(Auth::guard("admin")->check()): ?>
    <title>Admin Profile</title>
    <?php else: ?>
    <title>Student Profile</title>
    <?php endif; ?>
    
    </head>

    <header>
        <?php echo $__env->make('layouts.banner', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    </header>
    
    <?php if(Auth::guard("admin")->check()): ?>
    <div id="adminpage" 
        authAdminID="<?php echo e(Auth::guard('admin')->user()->adminID); ?>"></div>
    <?php else: ?>
    <div id="studentpage" 
        authUserID="<?php echo e(Auth::guard('web')->user()->studentID); ?>"></div>
    <?php endif; ?>
    
    <body>
    </body>

    <script src="/js/app.js"></script>

</html><?php /**PATH C:\Users\Jet Lye\Desktop\Deployment\ProjectFile\resources\views/profile.blade.php ENDPATH**/ ?>