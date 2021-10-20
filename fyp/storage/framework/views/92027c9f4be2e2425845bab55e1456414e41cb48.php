
<?php $__env->startSection('content'); ?>

<div>
    <div class="logintitle">
        <h1>Admin Login</h1>
    </div>

    <div>
        <div class="loginbox">
            <form method="POST" action='<?php echo e(url("login/$url")); ?>' arialabel="<?php echo e(__('Admin Login')); ?>">
            <?php echo csrf_field(); ?>

            <p for="adminID">Admin ID</p>
            <input id="adminID" type="text" class="form-control <?php $__errorArgs = ['adminID'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?> is-invalid <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>" name="adminID" value="<?php echo e(old('adminID')); ?>" required autocomplete="off">
            <span style="color:red; text-align:center" class="errormessage"><?php $__errorArgs = ['adminID'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?><?php echo e($message); ?><?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?></span>

            <p for="password"><?php echo e(__('Password')); ?></p>
            <input id="password" type="password" class="form-control <?php $__errorArgs = ['password'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?> is-invalid <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>" name="password" required autocomplete="new-password">
            <span style="color:red; text-align:center" class="errormessage"><?php $__errorArgs = ['password'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?><?php echo e($message); ?><?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?></span>

            <div class="loginbtn">
                <button type="submit">
                    <?php echo e(__('Login')); ?>

                </button>
            </div>
            
            </form>
            
        </div>
        <a href="/">Back</a>
    </div>
</div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\Users\Jet Lye\Desktop\FYP\resources\views/auth/adminLogin.blade.php ENDPATH**/ ?>