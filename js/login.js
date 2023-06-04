// Lấy phần tử form đăng nhập
let loginForm = document.getElementById('login-form');

// Thêm trình lắng nghe sự kiện cho việc đăng nhập
loginForm.addEventListener('submit', handleLogin);

function handleLogin(event) {
  event.preventDefault(); // Ngăn chặn hành động mặc định của form khi submit

  // Lấy thông tin đăng nhập từ các trường trong form
  let email = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  // Tạo một tài khoản admin cố định
  const adminUser = {
    email: 'admin@example.com',
    password: 'admin',
    isAdmin: true
  };

  // Lưu tài khoản admin vào Local Storage
  localStorage.setItem('adminUser', JSON.stringify(adminUser));

  // Kiểm tra xem người dùng có phải là tài khoản admin cố định hay không
  if (email === adminUser.email && password === adminUser.password) {
    // Lưu thông tin người dùng vào Session Storage
    sessionStorage.setItem('currentUser', JSON.stringify(adminUser));

    // Chuyển hướng đến trang admin
    window.location.href = '../html/admin.html';
  } else {
    // Lấy danh sách người dùng từ Local Storage
    let userList = JSON.parse(localStorage.getItem('userList')) || [];

    // Tìm kiếm người dùng trong danh sách người dùng
    let user = userList.find(user => user.email === email && user.password === password);

    // Kiểm tra xem người dùng có tồn tại trong danh sách người dùng hay không
    if (user) {
      // Lưu thông tin người dùng vào Session Storage
      sessionStorage.setItem('currentUser', JSON.stringify(user));

      // Nếu người dùng là admin, chuyển hướng đến trang admin
      if (user.isAdmin) {
        window.location.href = '../html/admin.html';
      } else {
        // Nếu người dùng là thành viên bình thường, chuyển hướng đến trang chủ
        window.location.href = '../html/index.html';
      }
    } else {
      // Đăng nhập không thành công, hiển thị thông báo lỗi
      alert('Tên đăng nhập hoặc mật khẩu không đúng.');
      return;
    }
  }
}
// Lưu thông tin người dùng vào Session Storage
sessionStorage.setItem('currentUser', JSON.stringify(user));

// Hiển thị tên người dùng trên giao diện web
let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
if (currentUser) {
  let usernameElement = document.getElementById('username');
  usernameElement.textContent = currentUser.name;
}