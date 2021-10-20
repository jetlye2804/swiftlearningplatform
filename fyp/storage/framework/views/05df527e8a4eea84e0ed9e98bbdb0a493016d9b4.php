<!DOCTYPE html>
<html>
    <head>
    <link rel="stylesheet" href="<?php echo e(asset('css/header.css')); ?>">
    <link rel="stylesheet" href="<?php echo e(asset('css/megamenu.css')); ?>">
    <link rel="stylesheet" href="<?php echo e(asset('css/playground.css')); ?>">

    <title>Code Playground</title>
    </head>

    <header>
        <?php echo $__env->make('layouts.banner', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
    </header>
    
    <div id="playgroundpage"></div>
    <body>
    </body>

    <script src="/js/app.js"></script>

</html><?php /**PATH C:\Users\Jet Lye\Desktop\FYP\resources\views/playground.blade.php ENDPATH**/ ?>