<!doctype html>
<html>
    <head>
        <!-- CSRF Token -->
        <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">

        <link rel="stylesheet" href="<?php echo e(asset('css/login.css')); ?>">
        <?php if(Route::is('login.admin')): ?>
        <title>Admin Login</title>
        <?php else: ?>
        <title>Student Login</title>
        <?php endif; ?>

    </head>
    <body>
        <div id="app">
            <main>
                <?php echo $__env->yieldContent('content'); ?>
            </main>
        </div>
    </body>
</html>
<?php /**PATH C:\Users\Jet Lye\Desktop\Deployment\ProjectFile\resources\views/layouts/app.blade.php ENDPATH**/ ?>