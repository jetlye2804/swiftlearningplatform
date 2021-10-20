<!DOCTYPE html>
<html>
    <head>
    <link rel="stylesheet" href="<?php echo e(asset('css/header.css')); ?>">
    <link rel="stylesheet" href="<?php echo e(asset('css/megamenu.css')); ?>">
    <link rel="stylesheet" href="<?php echo e(asset('css/chat.css')); ?>">

    <title>Chatbox</title>
    </head>

    <header>
        <?php echo $__env->make('layouts.banner', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    </header>
    
    <?php if(Auth::guard("admin")->check()): ?>
    <div id="adminchatpage" 
        authUserID="<?php echo e(Auth::guard('admin')->user()->adminID); ?>"
        authUserName="<?php echo e(Auth::guard('admin')->user()->adminName); ?>"></div>
    <?php else: ?>
    <div id="chatpage" 
        authUserID="<?php echo e(Auth::guard('web')->user()->studentID); ?>"
        authUserName="<?php echo e(Auth::guard('web')->user()->studentName); ?>"></div>
    <?php endif; ?>
    <body>
    </body>

    <script src="/js/app.js"></script>
</html><?php /**PATH C:\Users\Jet Lye\Desktop\FYP\resources\views/chatBox.blade.php ENDPATH**/ ?>