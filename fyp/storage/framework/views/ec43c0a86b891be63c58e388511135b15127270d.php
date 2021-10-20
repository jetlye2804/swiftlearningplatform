<?php $__env->startSection('content'); ?>

<div>
    <div class="resettitle">
        <h1>Reset Password</h1>
        <p>Enter your UTAR student email.</p>
    </div>
    <div class="resetbox">
        <form action="<?php echo e(route('forget.password.post')); ?>" method="POST">
            <?php echo csrf_field(); ?>
            <div class="form-group row">
                <p for="email_address">E-Mail Address</p>
                <div class="col-md-6">
                    <input type="text" id="email_address" class="form-control" name="email" required autofocus>
                    <?php if($errors->has('email')): ?>
                    <div class="emailnotfound">
                        <p><?php echo e($errors->first('email')); ?><p>
                    <div>
                    <?php endif; ?>
                </div>
            </div>
            <div class="sendlinkbtn">
                <button type="submit" class="sendlink">
                    Send Password Reset Email
                </button>
            </div>
        </form>
    </div>
</div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\Users\Jet Lye\Desktop\FYP\resources\views/auth/passwords/forgetPassword.blade.php ENDPATH**/ ?>