const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active');
});

signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
});



const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const username = usernameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    if (response.status === 400) {
      const data = await response.json();
      console.log(data.message);
      if (data.message === 'Username already exists.') {
        // Perform actions for existing username
        swal("Username already exists", "Please choose a different username.", "error");
      } else if (data.message === 'Email already exists.') {
        // Perform actions for existing email
        swal("Email already exists", "Please choose a different email or go to Login.", "error");
      } else {
        // Handle any other error message
        swal("Error", data.message, "error");
      }
    } else if (response.status === 200) {
      const data = await response.json();
      console.log(data.message);
      // Perform actions for successful signup
      swal("Sign Up Successful!", "Please check your email for verification.", "success");
    } else {
      // Handle other response statuses
      swal("Error", "Failed to sign up.", "error");
    }

  } catch (error) {
    console.error('Error:', error);
    alert(error);
  }
});





// // Sign In Logic

//         let signInform = document.getElementById("signin-form")
//         let signedInName = document.getElementById("signedIn_Name")
//         let signupBtn = document.getElementById("signUpBtn")
//         let logout = document.getElementById("logOutBtn")
//         signInform.addEventListener("submit",(e)=>{
//             e.preventDefault()
//             let data = {
//                 email : signInform[0].value,
//                 password : signInform[1].value
//             }
//             fetchLogin(data)
//             // console.log(form[0].value,form[1].value);
//         })
//          function fetchLogin(data){
//             fetch("https://prickly-dove-knickers.cyclic.app/user/login", {
//             method: "post",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(data)
//         })
//             .then(response => response.json())
//             .then(result => {
//                 console.log("success", result)
//                 if(result.msg==='Login Successful'){
//                     console.log(result);
//                     // console.log(data.name);
//                     localStorage.setItem("LoggedName",result.name)
//                     localStorage.setItem("LoggedID",result.id)
//                     // swal("Login Successful!", "You can now access our services!", "success");
//                     swal({
//                         title: "Login Successful!",
//                         text: "You can now access our services!",
//                         icon: "success",
//                         button: "Yay!🎉",
//                       }).then((value) => {
//                         if (value) {
//                           window.location.href = "./dashboard.html";
//                         }
//                       });
                      
//                     // alert("Login Successfull")
//                     // window.location.href = "./dashboard.html"
//                 }
//                 else if(result.msg==='User not found'){
//                     // alert("User not found")
//                     swal("Failed! User Not Found ❌", "Go To Sign Up And Create New Account! 🥺🙏", "error");
//                 }
//                 else{
//                     swal("Failed! Wrong Password ❌", "Don't be in hurry! Type your Password Correctly 🙏", "error");
//                     // alert("Wrong Credentials")
//                 }
                
//             })
//             .catch(err => console.log(err))

// }
        
const signInForm = document.getElementById('signin-form');

signInForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const usernameInput = document.getElementById('loginusername')
  const passwordInput = document.getElementById('loginpassword')

  const username = usernameInput.value;
  const password = passwordInput.value;

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.status === 401) {
        const data = await response.json();
        console.log(data.message);
        if (data.message === 'User not found.') {
          // Perform actions for existing username
          swal("User not found.", "Please choose a different username.", "error");
        } else if (data.message === 'Email not verified.') {
          // Perform actions for existing email
          swal("Email not verified.", "Please choose a different email or go to Login.", "error");
        } else {
          // Handle any other error message
          swal("Error", data.message, "error");
        }
      } else if (response.status === 404) {
        swal("User Not Found!", "Please Signup first.", "error");
      }
       else if (response.status === 200) {
        const data = await response.json();
        console.log(data.message);
        // Perform actions for successful signup
        swal("Logged In Successfully!", "Enjoy Making New Friends.", "success");
      } else {
        // Handle other response statuses
        swal("Error", "Failed to sign up.", "error");
      }
    } catch (error) {
        console.error('Error:', error);
        alert(error);
      }
});
