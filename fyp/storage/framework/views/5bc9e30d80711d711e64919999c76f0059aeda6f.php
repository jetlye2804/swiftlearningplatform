
<?php $__env->startSection('content'); ?>

<div>
    <div class="resettitle">
        <h1>Reset Password</h1>
    </div>
    <div class="reminder">
        <p>Your password should have a minimum of 8 characters with combinations of letters and numeric characters. <br />
            Capital letters are optional.</p>
    </div>
    <div class="resetbox">
        <form action="<?php echo e(route('reset.password.post')); ?>" method="POST">
            <?php echo csrf_field(); ?>
            <div>
                <p for="email_address">E-Mail Address</p>
                <div>
                    <input type="text" id="email_address" class="form-control" name="email" required autocomplete="off">
                    <?php if($errors->has('email')): ?>
                    <div class="errormsg">
                        <p><?php echo e($errors->first('email')); ?><p>
                    <div>
                    <?php endif; ?>
                </div>
            </div>

            <div>
                <p for="password">Password</p>
                <div>
                    <input type="password" id="password" class="form-control" name="password" required autofocus onkeypress='validate(event)'>
                    <?php if($errors->has('password')): ?>
                    <div class="errormsg">
                        <p><?php echo e($errors->first('password')); ?><p>
                    <div>
                    <?php endif; ?>
                </div>
            </div>

            <div>
                <p for="password-confirm">Confirm Password</p>
                <div>
                    <input type="password" id="password-confirm" class="form-control" name="password_confirmation" required autofocus onkeypress='validate(event)'>
                    <?php if($errors->has('password_confirmation')): ?>
                    <div class="errormsg">
                        <p><?php echo e($errors->first('password_confirmation')); ?><p>
                    <div>
                    <?php endif; ?>
                </div>
            </div>

            <div class="sendlinkbtn">
                <button type="submit" class="sendlink">
                    Reset Password
                </button>
            </div>
        </form>
    </div>
    <?php if(Session::has('message')): ?>
        <div>
            <p class="errormsg"><?php echo e(Session::get('message')); ?></p>
        </div>
    <?php endif; ?>
</div>

<script>
    function validate(evt) {
    var theEvent = evt || window.event;

    // Handle paste
    if (theEvent.type === 'paste') {
        key = event.clipboardData.getData('text/plain');
    } else {
    // Handle key press
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode(key);
    }
    var regex = /[0-9a-zA-Z]|\./;
    if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
    }
</script>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\Users\Jet Lye\Desktop\fyp\resources\views/auth/passwords/forgetPasswordLink.blade.php ENDPATH**/ ?>