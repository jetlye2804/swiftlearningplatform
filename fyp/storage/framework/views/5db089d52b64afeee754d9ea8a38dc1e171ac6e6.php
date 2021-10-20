
<?php $__env->startSection('content'); ?>

<div>
    <div class="verifytitle">
        <h1>Six Digit Verification</h1>
        <p>An email reset with 6 digit verification code is sent. Please check your inbox.<p>
    </div>

    <div class="verifybox">
        <form action="<?php echo e(route('verify.password.post')); ?>" method="POST">
            <?php echo csrf_field(); ?>
            <div>
                <p for="sixdigit">6 digit code</p>
                <div>
                    <input type="text" id="sixdigit" class="form-control" name="sixdigit" onkeypress='validate(event)' maxlength="6" required autocomplete="off">
                </div>
            </div>
            <div class="sendlinkbtn">
                <button type="submit" class="sendlink">
                    Confirm Verification Code
                </button>
            </div>
            <?php if(Session::has('message')): ?>
                <p class="invaliddigit"><?php echo e(Session::get('message')); ?></p>
            <?php endif; ?>
        </form>
    </div>
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
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
    }
    }
</script>

<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\Users\Jet Lye\Desktop\FYP\resources\views/auth/passwords/sixDigitPassword.blade.php ENDPATH**/ ?>