<!DOCTYPE html>
<html>
    <head>
    <link rel="stylesheet" href="<?php echo e(asset('css/error.css')); ?>">
    <title>Uh-oh!</title>
    </head>
    <body>
    <?php if(Auth::guard("web")->check()): ?>
        <?php if(Auth::guard('web')->user()->isOnboard == false): ?>
        <h1>Please change your password before using the platform.</h1>
        <p>403 - Unauthorized Action</p>
        <?php else: ?>
        <h1>Seems like you are not a new user...</h1>
        <p>403 - Unauthorized Action</p>
        <?php endif; ?>
    <?php elseif(Auth::guard("admin")->check()): ?>
        <h1>Only super admin can access this route.</h1>
        <p>403 - Unauthorized Action</p>
    <?php else: ?>
        <h1>You are not allowed to access this page.</h1>
        <p>403 - Unauthorized Action</p>
    <?php endif; ?>
    </body>

</html><?php /**PATH C:\Users\Jet Lye\Desktop\FYP\resources\views/errors/403.blade.php ENDPATH**/ ?>