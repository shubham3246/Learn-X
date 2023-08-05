document.addEventListener('DOMContentLoaded', function() {
    login_switch = document.querySelector('#switch-login');
    login_switch.addEventListener('click', switchLogin);
})
//#033745 #03131d //#dcc39a #a1774d
function switchLogin () {
    title = document.querySelector('.login-box h2');
    // url = document.querySelector(".login-box form");
    loginForm = document.querySelector('#login-form');
    registerForm = document.querySelector('#register-form');
    switch_login = document.querySelector('#switch-login');

    if(loginForm.style.display === 'none') {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        switch_login.innerText = 'Click to register';
        title.innerText = "Login"
    }
    else {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        switch_login.innerText = 'Click to login';
        title.innerText = "Register";
    }

}