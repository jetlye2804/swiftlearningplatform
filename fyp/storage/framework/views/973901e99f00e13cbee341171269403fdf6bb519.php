<?php $__env->startSection('content'); ?>

<div>
    <div class="logintitle">
        <h1><?php echo e(isset($url) ? ucwords($url) : ""); ?> <?php echo e(__('Login')); ?></h1>
    </div>

    <div>
        <?php if(Session::has('message')): ?>
        <div>
            <p class="changesuccess"><?php echo e(Session::get('message')); ?></p>
        </div>
        <?php endif; ?>
        <div class="loginbox">
            <?php if(isset($url)): ?>
            <form method="POST" action='<?php echo e(url("login/$url")); ?>' arialabel="<?php echo e(__('Login')); ?>">
            <?php else: ?>
            <form method="POST" action="<?php echo e(route('login')); ?>" arialabel="<?php echo e(__('Login')); ?>">
            <?php endif; ?>
            <?php echo csrf_field(); ?>

            <?php if(Route::is('login.admin')): ?>
            <p for="adminID"><?php echo e(__('Admin ID')); ?></p>
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
            <?php else: ?>
            <p for="studentID"><?php echo e(__('Student ID')); ?></p>
            <input id="studentID" type="text" class="form-control <?php $__errorArgs = ['studentID'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?> is-invalid <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>" name="studentID" value="<?php echo e(old('studentID')); ?>" required autocomplete="off">
            <span style="color:red; text-align:center" class="errormessage"><?php $__errorArgs = ['studentID'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?><?php echo e($message); ?><?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?></span>
            <?php endif; ?>

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

            <?php if(!Route::is('login.admin')): ?>
            <div class="resetbtn">
                <a class="reset" href="/reset">
                    Reset Password
                </a>
            </div>
            <?php endif; ?>
            
            </form>
            
        </div>
        <a href="/">Back</a>
    </div>
</div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\Users\Jet Lye\Desktop\ProjectFile\resources\views/auth/login.blade.php ENDPATH**/ ?>