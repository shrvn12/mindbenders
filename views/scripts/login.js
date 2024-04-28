const register = document.getElementById('register');
const login = document.getElementById('login');
const message = document.getElementById('message');
const loader = document.getElementById('loader');

register.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('reg_email').value;
    const name = document.getElementById('reg_name').value;
    const password = document.getElementById('reg_pass').value;
    
    const payload = {
        name, email, password
    };
    loader.style.display = 'inline-block';
    registerUser(payload, '/api/users/register').then(() => {
        loader.style.display = 'none';
    }).catch(() => {
        loader.style.display = 'none'
    });
})

login.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = document.getElementById('login_email').value;
    const password = document.getElementById('login_pass').value;
    
    const payload = {
        email, password
    };
    loader.style.display = 'inline-block';
    loginUser(payload, '/api/users/login').then(() => {
        loader.style.display = 'none';
    }).catch(() => {
        loader.style.display = 'none'
    });
})


async function loginUser(payload, url){
    try {
        let res = await fetch(url, {
            method: "POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(payload)
        });
        const status = res.status;
        res = await res.json();
        console.log(res);
        message.innerText = res.message;
        if (status == 200) {
            window.location.href = "/";
        }
    } catch (error) {
        console.log(error);
    }
    
}

async function registerUser(payload, url) {
    try {
        let res = await fetch(url, {
            method: "POST",
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(payload)
        });
        const status = res.status;
        res = await res.json();
        console.log(res);
        message.innerText = res.message;
        console.log(status);
        if (status == 200 || status == 201) {
            loginUser(payload, '/api/users/login')
        }
    } catch (error) {
        console.log(error);
    }
}
