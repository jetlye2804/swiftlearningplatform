<nav>
    <ul class="nav__links">
        <?php if(Auth::guard('web')->check()): ?>
        <li><p>Lessons ▼</p>
            <div class="dropdown">
                <div class="dropdown_content">
                    <div class="megaTitle">
                        <h2>Lessons</h2>
                    </div>   
                    
                    <div class="row">
                        <div class="totalColumn">
                            <div class="column">
                                <a href="/topic/1">Topic 1 - Starts from Basics</a>
                                <a href="/topic/2">Topic 2 - String and Characters</a>
                                <a href="/topic/3">Topic 3 - Conditional Statements</a>
                                <a href="/topic/4">Topic 4 - Arrays and Loops</a>
                            </div>
                            <div class="column">
                                <a href="/topic/5">Topic 5 - Optionals and Error Handling</a>
                                <a href="/topic/6">Topic 6 - Enumerations and Functions</a>
                                <a href="/topic/7">Topic 7 - Dictionaries</a>
                                <a href="/topic/8">Topic 8 - Structures and Classes</a>
                            </div>
                            <div class="column">
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div> 
        </li>
        
        <li><p>Exercises ▼</p>
            <div class="dropdown">
                <div class="dropdown_content">
                    <div class="megaTitle">
                        <h2>Exercise</h2>
                    </div>   
                    
                    <div class="row">
                        <div class="totalColumn">
                            <div class="column">
                                <a href="/exercise/1">Exercise 1 - Starts from Basics</a>
                                <a href="/exercise/2">Exercise 2 - String and Characters</a>
                                <a href="/exercise/3">Exercise 3 - Conditional Statements</a>
                                <a href="/exercise/4">Exercise 4 - Arrays and Loops</a>
                            </div>
                            <div class="column">
                                <a href="/exercise/5">Exercise 5 - Optionals and Error Handling</a>
                                <a href="/exercise/6">Exercise 6 - Enumerations and Functions</a>
                                <a href="/exercise/7">Exercise 7 - Dictionaries</a>
                                <a href="/exercise/8">Exercise 8 - Structures and Classes</a>
                            </div>
                            <div class="column">
                        </div>
                        </div>
                    
                    </div>
                </div>
            </div> 
        </li>
        <li><p>Quizzes ▼</p>
            <div class="dropdown_content">
                <div class="megaTitle">
                    <h2>Graded Quizzes</h2>
                </div>   
                
                <div class="row">
                    <div class="totalColumn">
                        <div class="column">
                            <a href="/gradedquiz/1">Quiz 1 - Starts from Basics</a>
                            <a href="/gradedquiz/2">Quiz 2 - String and Characters</a>
                            <a href="/gradedquiz/3">Quiz 3 - Conditional Statements</a>
                            <a href="/gradedquiz/4">Quiz 4 - Arrays and Loops</a>
                        </div>
                        <div class="column">
                            <a href="/gradedquiz/5">Quiz 5 - Optionals and Error Handling</a>
                            <a href="/gradedquiz/6">Quiz 6 - Enumerations and Functions</a>
                            <a href="/gradedquiz/7">Quiz 7 - Dictionaries</a>
                            <a href="/gradedquiz/8">Quiz 8 - Structures and Classes</a>
                        </div>
                        <div class="column">
                        </div>
                    </div>
                
                </div>
            </div>
        </li>
        <li><p>Others ▼</p>
            <div class="dropdown">
                <div class="dropdown_content">
                    <div class="megaTitle">
                        <h2>Others</h2>
                    </div>   
                    
                    <div class="row">
                        <div class="totalColumn">
                            <div class="column">
                                <a href="/chatbox">Chatbox</a>
                                <a href="/playground">Code Playground</a>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div> 
        </li>
        <?php else: ?>
        <li><p>Matters ▼</p>
            <div class="dropdown">
                <div class="dropdown_content">
                    <div class="megaTitle">
                        <h2>Admin Matters</h2>
                    </div>   
                    
                    <div class="row">
                        <div class="totalColumn">
                            <div class="column">
                                <a href="/admin/topic">Modify Topic List</a>
                                <a href="/admin/exercise">Modify Exercises</a>
                                <a href="/admin/gradedquiz">Modify Graded Quizzes</a>
                            </div>
                            <div class="column">
                                <a href="/admin/registerStudent">Register a Student</a>
                                <a href="/admin/chatbox">Chat box</a>
                            </div>
                        </div>
                    
                    </div>
                </div>
            </div> 
        </li>
        <?php endif; ?>
    </ul>
</nav>	
<div class="buttons">
    <a class="cta" id="home" href="/home">Home</a>
    <?php if(Auth::guard('admin')->check()): ?>
    <a class="cta" id="profile" href="/admin/profile">Admin Profile</a>
    <?php else: ?>
    <a class="cta" id="profile" href="/profile/student">Profile</a>
    <?php endif; ?>
    <a class="cta" id="logout" href="<?php echo e(route('logout')); ?>" oncontextmenu="return false"><?php echo e(__('Logout')); ?></a>
</div><?php /**PATH C:\Users\Jet Lye\Desktop\Deployment\ProjectFile\resources\views/layouts/banner.blade.php ENDPATH**/ ?>