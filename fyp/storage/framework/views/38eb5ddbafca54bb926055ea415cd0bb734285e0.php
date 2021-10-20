<!DOCTYPE html>
<html>
    <head>

    <link rel="stylesheet" href="<?php echo e(asset('css/header.css')); ?>">
    <link rel="stylesheet" href="<?php echo e(asset('css/megamenu.css')); ?>">
    <link rel="stylesheet" href="<?php echo e(asset('css/lesson.css')); ?>">

    <?php if(Auth::guard("admin")->check()): ?>
    <link rel="stylesheet" href="<?php echo e(asset('css/modal.css')); ?>">
    <?php endif; ?>
    </head>

    <header>
        <?php echo $__env->make('layouts.banner', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    </header>

    <?php if(Auth::guard("admin")->check()): ?>
    <div id="topic" isAdminStr="true"></div>
    <?php else: ?>
    <div id="topic"></div>
    <?php endif; ?>
    <body></body>

    <script src="/js/app.js"></script>
</html><?php /**PATH C:\Users\Jet Lye\Desktop\fyp\resources\views/topicContent.blade.php ENDPATH**/ ?>