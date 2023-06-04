function handleRegister(event) {
  // Ngăn chặn hành động mặc định của form khi submit
  event.preventDefault();

  // Lấy thông tin đăng ký từ các trường trong form
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirm-password").value;

  // Kiểm tra xem các trường có bị bỏ trống hay không
  if (!name || !email || !password || !confirmPassword) {
    let snackbar = document.getElementById("snackbar");
    snackbar.innerHTML = "Vui lòng nhập đầy đủ thông tin đăng ký!";
    snackbar.className = "show";
    setTimeout(function () { snackbar.className = ""; }, 3000);
    return;
  }

  // Kiểm tra định dạng email
  if (!isValidEmail(email)) {
    let snackbar = document.getElementById("snackbar");
    snackbar.innerHTML = "Vui lòng nhập địa chỉ email hợp lệ!";
    snackbar.className = "show";
    setTimeout(function () { snackbar.className = ""; }, 3000);
    return;
  }

  // Kiểm tra mật khẩu có đủ 6 ký tự hay không
  if (password.length < 6) {
    let snackbar = document.getElementById("snackbar");
    snackbar.innerHTML = "Vui lòng nhập mật khẩu có từ 6 ký tự trở lên!";
    snackbar.className = "show";
    setTimeout(function () { snackbar.className = ""; }, 3000);
    return;
  }

  // Kiểm tra mật khẩu và xác nhận mật khẩu có khớp hay không
  if (password !== confirmPassword) {
    let snackbar = document.getElementById("snackbar");
    snackbar.innerHTML = "Mật khẩu và xác nhận mật khẩu không khớp!";
    snackbar.className = "show";
    setTimeout(function () { snackbar.className = ""; }, 3000);
    return;
  }

  // Lấy danh sách người dùng từ LocalStorage
  let userList = JSON.parse(localStorage.getItem('userList')) || [];

  // Kiểm tra xem email đã tồn tại trong danh sách người dùng hay chưa
  const userExists = userList.some(user => user.email === email);
  if (userExists) {
    let snackbar = document.getElementById("snackbar");
    snackbar.innerHTML = "Email đã được sử dụng, vui lòng nhập một email khác.";
    snackbar.className = "show";
    setTimeout(function () { snackbar.className = ""; }, 3000);
    return;
  }

  // Tạo một đối tượng người dùng mới và thêm vào danh sách người dùng
  let newUser = {
    name: name,
    email: email,
    password: password
  };
  userList.push(newUser);

  // Lưu danh sách người dùng mới vào LocalStorage
  localStorage.setItem('userList', JSON.stringify(userList));

  // Hiển thị thông báo đăng ký thành công
  let snackbar = document.getElementById("snackbar");
  snackbar.innerHTML = "Đăng ký thành công!";
  snackbar.className = "show";
  setTimeout(function () { snackbar.className = ""; }, 3000);

  // Reset form
  document.getElementById("register-form").reset();

  // Nếu đăng ký thành công, chuyển hướng đến trang đăng nhập
  window.location.href = "../html/login.html";
}

function isValidEmail(email) {
  // Regex để kiểm tra định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}


// Gán hàm xử lý sự kiện cho form khi submit
document.getElementById("register-form").addEventListener("submit", handleRegister);