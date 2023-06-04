
// Lấy phần tử form đăng ký
let registrationForm = document.getElementById('register-form');

// Thêm trình lắng nghe sự kiện cho việc gửi form
registrationForm.addEventListener('submit', handleRegistration);

function handleRegister(event) {
  console.log(event)
  // Ngăn chặn hành động mặc định của form khi submit
  event.preventDefault();


  // Lấy thông tin đăng ký từ các trường trong form
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirm-password").value;

  // Kiểm tra xem các trường có bị bỏ trống hay không
  if (!name || !email || !password || !confirmPassword) {
    alert("Vui lòng nhập đầy đủ thông tin đăng ký!");

  }

  // Kiểm tra định dạng email
  if (!isValidEmail(email)) {
    alert('Vui lòng nhập địa chỉ email hợp lệ!');
    return;
  }

  //Kiểm tra mật khẩu đủ 6 kí tự hay không
  if(password.length < 6) {
    alert('Vui lòng nhập mật khẩu có từ 6 kí tự!')
    return;
  }

  // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp hay không
  if (password !== confirmPassword) {
    alert("Mật khẩu và xác nhận mật khẩu không khớp!");
    return;
  }

  // Lấy danh sách người dùng từ LocalStorage
  let userList = JSON.parse(localStorage.getItem('userList')) || [];

  // Kiểm tra xem email đã tồn tại trong danh sách người dùng hay chưa
  const userExists = userList.some(user => user.email === email);
  if (userExists) {
    alert('Email đã được sử dụng, vui lòng nhập một email khác.');
    return;
  }

  // Regular expression để kiểm tra định dạng email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Thêm người dùng mới vào danh sách người dùng
  const newUser = { name, email, password };
  userList.push(newUser);

  // Lưu danh sách người dùng vào LocalStorage
  localStorage.setItem('userList', JSON.stringify(userList));

  // Nếu thông tin hợp lệ, chuyển hướng người dùng đến trang đăng nhập
  window.location.href = "../html/login.html";
}
document.getElementById("register-form").addEventListener("click", handleRegister);