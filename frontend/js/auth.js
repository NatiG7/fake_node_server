// Nati G.

/**
 * pass_regex:
 * start -> scan atlst 1 letter
 * -> scan atlst 1 digit
 * -> char class: alpahnumeric
 * -> length min,max {3,8} -> end
 */
const PASS_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{3,8}$/

/**
 * user_regex:
 * start -> char class: characters
 * -> atleast 2 -> end
 */
const USER_REGEX = /^[a-zA-Z]{2,}$/

isRegisterMode = false;

// html elements
const form = document.getElementById('authForm');
const toggleLink = document.getElementById('toggleLink');
const nameGroup = document.getElementById('nameGroup');
const msgBox = document.getElementById('msgBox');
const submitBtn = document.getElementById('submitBtn');
const formTitle = document.getElementById('formTitle');
const username = document.getElementById('username');
const password = document.getElementById('password');
const fullName = document.getElementById('fullName');

// listeners

/**
 * Listener: Toggle Mode
 * Description: Switches the UI between Login and Register views without reloading.
 */
toggleLink.addEventListener('click', (e) => {
    e.preventDefault();
    isRegisterMode = !isRegisterMode;
    if (isRegisterMode) {
        nameGroup.style.display = 'block';
        formTitle.textContent = 'Register';
        submitBtn.textContent = 'Sign Up';
        toggleLink.textContent = 'Already have an account?';
    } else {
        nameGroup.style.display = 'none';
        formTitle.textContent = 'Login';
        submitBtn.textContent = 'Login';
        toggleLink.textContent = 'Dont have an account?';

    }
});

/**
 * Listener: Submit Form
 * Description: Validates input against Regex and sends POST request to server.
 * Requirement: Validate before sending, Handle server response[cite: 53, 55].
 */
submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!USER_REGEX.test(username.value)) {
        return msgBox.innerText = "Username must contain letters and be atleast 2 characters";
    }
    if (!PASS_REGEX.test(password.value)){
        return msgBox.innerText = "Password must contain atleast one letter and number, Min length 3, max length 8";
    }
    if (isRegisterMode) {
        if (fullName.value.trim().length < 2) return msgBox.innerText = "Please enter valid full name";
    }
    const endpoint = isRegisterMode ? "/api/auth/register" : "/api/auth/login";
    const data = {
        username: username.value,
        password: password.value
    }
    if (isRegisterMode) data.full_name = fullName.value;

    try {
        const res = await fetch(endpoint,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        const resData = await res.json();

        if (res.ok){
            if (isRegisterMode){
                toggleLink.click();
                msgBox.innerText = "Registration copmlete, you may login";
                msgBox.style.color = "green";
            } else {
                window.location.href = 'home.html'
            }
        } else {
            msgBox.innerText = resData.message || "Error occured";
            msgBox.style.color = "red";
        }
    } catch (err) {
        console.error(err);
        msgBox.innerText = "Server conn failed";
        msgBox.style.color = "red";
    }
})
