let userList = [];
let current_user = 0;
let user_id = 0;
let requestStack = [];


function seedAdmin(){
  const admin={
    id: user_id,
    name: "Admin",
    email: "admin@123.com",
    password: "admin@123",
    address: "Pune",
    mobile: "1234567890",
    permission: "write",
    role: "admin",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    profilePic:  'https://img.icons8.com/bubbles/100/000000/user.png', // Default profile pic if no upload
    status: "inactive"
    };
    user_id++;
    userList.push(admin);
}

// Function to render the login page
function renderLoginPage() {
  const root = document.getElementById("root");
  root.innerHTML = `
  <div class="welcome-container">
      <h1 class="welcome-heading text-warning">WELCOME</h1>
      <p class="welcome-subheading">Please Login to continue</p>
  </div>
   
  <div class="login-container">
      <div class="login-form">
          <h1>Login</h1>
          <form>
              <!-- Username/Email Input -->
              <div class="login-form-group">
                  <label for="email">Email</label>
                  <input type="email" id="login-id" name="email" placeholder="Enter your email" required>
              </div>

              <!-- Password Input -->
              <div class="login-form-group">
                  <label for="password">Password</label>
                  <input type="password" id="login-pass" name="password" placeholder="Enter your password" required>
              </div>

              <!-- Login Button -->
              <button type="submit" class="log_btn" onclick="authenticate_user(event)">Login</button>

              <!-- Forgot Password -->
              <div class="extra-links">
                  <a href="/forgot-password">Forgot Password?</a>
              </div>
            <h3><button class="btn mt-3" onclick="renderSignupPage(event)">Sign Up</button></h3>

          </form>
      </div>
  </div>
  `;
  seedAdmin();
}
// Function to render the signup page
function renderSignupPage(event) {
  event.preventDefault();
  const root = document.getElementById("root");
  root.innerHTML = `
    <div class="signup-container">
        <div class="signup-form">
            <h1>Sign Up</h1>
            <form id="signup-form">
                <!-- Name (Required) -->
                <div class="sign-form-group">
                    <label for="username">Name <span class="required">*</span></label>
                    <input type="text" id="name-id" name="username" placeholder="Enter your name" required>
                </div>

                <!-- Email (Required) -->
                <div class="sign-form-group">
                    <label for="email">Email <span class="required">*</span></label>
                    <input type="email" id="email-id" name="email" placeholder="Enter your email" required>
                </div>

                <!-- Role -->
                <div class="sign-form-group">
                    <label for="role">Role<span class="required">*</span></label>
                    <select id="type-id" name="role" required>
                        <option value="" disabled selected>Select Role</option>
                        <option value="User">User</option>
                    </select>
                </div>

                <!-- Password (Required) -->
                <div class="sign-form-group">
                    <label for="password">Password <span class="required">*</span></label>
                    <input type="password" id="pass-id" name="password" placeholder="Enter your password" required>
                </div>

                <!-- Address -->
                <div class="sign-form-group">
                    <label for="address">Address</label>
                    <input type="text" id="add-id" name="address" placeholder="Enter your address">
                </div>

                <!-- Mobile -->
                <div class="sign-form-group">
                    <label for="mobile">Mobile</label>
                    <input type="text" id="mobile-id" name="mobile" pattern="[0-9]{10}" placeholder="Enter your mobile number">
                </div>

                <!-- GitHub -->
                <div class="sign-form-group">
                    <label for="github">GitHub</label>
                    <input type="url" id="git-id" name="github" placeholder="Enter your GitHub link">
                </div>

                <!-- LinkedIn -->
                <div class="sign-form-group">
                    <label for="linkedin">LinkedIn</label>
                    <input type="url" id="link-id" name="linkedin" placeholder="Enter your LinkedIn link">
                </div>

                <!-- Profile Picture Upload -->
                <div class="sign-form-group">
                    <label for="profile-photo">Profile Photo</label>
                    <input type="file" id="profile-photo-id" name="profile-photo" accept="image/*">
                </div>

                <!-- Sign Up Button -->
                <button onclick="sign_up(event)" class="btn">Sign Up</button>
            </form>
        </div>
    </div>
    `;
}

// Function to handle user sign-up
function sign_up(event) {
  event.preventDefault();

  // Get input values
  const userName = document.getElementById("name-id").value;
  const userEmail = document.getElementById("email-id").value;
  const userPass = document.getElementById("pass-id").value;
  const userRole = document.getElementById("type-id").value;
  const userAdd = document.getElementById("add-id").value;
  const userMobile = document.getElementById("mobile-id").value;
  const userGithub = document.getElementById("git-id").value;
  const userLink = document.getElementById("link-id").value;
  const userPhoto = document.getElementById("profile-photo-id").files[0];  // Handle profile photo

  // Form validation
  if(userMobile && userMobile.length!=10){
     alert("Please enter 10 digit number");
     return;
  }

  if (!userName || (userEmail.indexOf("@")==-1) || !userPass || !userRole) {
    alert("Please fill in all required fields.");
    return; // Prevent further code execution if required fields are missing
  }

  // Dummy check to ensure the user doesn't exist
  const len = userList.length;
  for (let i = 0; i < len; i++) {
    if (userList[i].email === userEmail) {
      alert("User already exists");
      renderLoginPage(); // Redirect to login if user exists
      return;
    }
  }
  // Create new user object
  const new_user = {
    id: user_id,
    name: userName,
    email: userEmail,
    password: userPass,
    address: userAdd,
    mobile: userMobile,
    permission: "read",
    role: "User",
    github: userGithub,
    linkedin: userLink,
    profilePic: userPhoto ? URL.createObjectURL(userPhoto) : 'https://img.icons8.com/bubbles/100/000000/user.png', // Default profile pic if no upload
    status: "active"
  };
  if(userEmail!="admin@123.com")
  {
    userList.push(new_user);
    current_user = user_id;
  }
  
  
  // Increment user_id for the next user
  user_id++;
  // Redirect to the appropriate dashboard based on role
  if (userRole === "User") {
    render_dashboard(new_user.id);
  } else {
    render_admin_dashboard(new_user.id);
  }
}

// Function to render user dashboard
function render_dashboard(userindex) {
  const user = userList[userindex];
  const root = document.getElementById("root");

  root.innerHTML = `
  <div class="page-content">
    <div class="user-dashboard">
      <div class="profile-section">
        <div class="profile-card">
          <div class="profile-photo">
            <img id="profile-pic" 
                 src="${user.profilePic}" 
                 alt="User Profile Image" />
                 <br>
            <button class="btn-update-photo" onclick="document.getElementById('upload-photo').click()">Update Photo</button>
            <input type="file" id="upload-photo" accept="image/*" style="display: none;" onchange="uploadPhoto(${userindex})" />
            <p class="profession">${user.role || 'User'}</p>
          </div>
        </div>
      </div>
      <div class="user-info-section">
        <h3 class="section-title">User Information</h3>
        <div class="info-row">
          <label>Name:</label>
          <span>${user.name}</span>
        </div>
        <div class="info-row">
          <label>Email:</label>
          <span>${user.email}</span>
        </div>
        <div class="info-row">
          <label>Address:</label>
          <span>${user.address || 'N/A'}</span>
        </div>
        <div class="info-row">
          <label>Mobile:</label>
          <span>${user.mobile || 'N/A'}</span>
        </div>
        <div class="info-row">
          <label>GitHub:</label>
          <span><a href="${user.github || '#'}" target="_blank">${user.github || 'Not Available'}</a></span>
        </div>
        <div class="info-row">
          <label>LinkedIn:</label>
          <span><a href="${user.linkedin || '#'}" target="_blank">${user.linkedin || 'Not Available'}</a></span>
        </div>
        <div class = "row">
          <!-- Show request button if admin permission is not granted -->
        ${!user.adminPermission ? `<button class="col request-admin-btn" onclick="requestRoleChange(${userindex})">Request Admin to Switch Role</button>` : ''}
        ${user.permission == "read" ? `<button class="col request-admin-btn" onclick="requestPermissionChanges(${userindex})">Request Admin to Update Profile</button>` : ''}
        <!-- Allow editing if permission granted -->
        ${user.permission == "write" ? `<button class="col request-admin-btn" onclick="enableEditProfile(${userindex})">Edit Profile</button>` : ''}
        </div>
        
      </div>

      <!-- Logout Button -->
      <div class="logout-btn-container">
          <button onclick="logout(${userindex})">Logout</button>
      </div>
    </div>
  </div>`;
}

function requestRoleChange(user_index) {
  const obj = {
    user: user_index,
    request: "admin"
  }
  requestStack.push(obj);
  alert("Request Sent Successfully");
}

function requestPermissionChanges(user_index) {
  const obj = {
    user: user_index,
    request: "write"
  }
  requestStack.push(obj);
  alert("Request Sent Successfully");
}


// function to check whether user already sign-up or not
function authenticate_user(event) {
  event.preventDefault();
  const len = userList.length;
  const Id = document.getElementById("login-id");
  const pass = document.getElementById("login-pass");
  for (let i = 0; i < len; i++) {
    if (userList[i].email === Id.value) {
      if (userList[i].password === pass.value) {
        alert("Login Successful");
        userList[i].status = "active";
        current_user = i;
        if (userList[i].role === "User" ) {
          current_user = i;
          render_dashboard(i);
        }
        else {
          render_admin_dashboard(i);
        }
        return;
      } else {
        alert("Incorrect password");
      }
    }
  }
  alert("User not found. Please sign up.");
}

// Function to log out
function logout(userid) {
  userList[userid].status = "inactive";
  current_user = null; // Reset the current_user variable
  renderLoginPage(); // Render the login page again
}

// Function to enable profile editing
function enableEditProfile(userindex) {
  if (userList[userindex].permission == "write") {
    const user = userList[userindex];
    const root = document.getElementById("root");
    root.innerHTML = `
    <div class="mt-5 card edit-profile-container w-50 mx-auto border shadow rounded" style="width: 40%;">
      <h1>Edit Profile</h1>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <label for="edit-name">Name</label>
          <input type="text" id="edit-name" value="${user.name}">
        </li>
        <li class="list-group-item">
          <label for="edit-email">Email</label>
          <input type="email" id="edit-email" value="${user.email}">
        </li>
        <li class="list-group-item">
          <label for="edit-address">Address</label>
          <input type="text" id="edit-address" value="${user.address}">
        </li>
        <li class="list-group-item">
          <label for="edit-mobile">Mobile</label>
          <input type="text" id="edit-mobile" value="${user.mobile}">
        </li>
        <li class="list-group-item">
          <label for="edit-github">GitHub</label>
          <input type="text" id="edit-github" value="${user.github}">
        </li>
        <li class="list-group-item">
          <label for="edit-linkedin">LinkedIn</label>
          <input type="text" id="edit-linkedin" value="${user.linkedin}">
        </li>
      </ul>
      <div class="container-fluid d-flex justify-content-center align-items-center" style="height: 100vh;">
      <button class="btn btn-primary" onclick="saveProfileChanges(${userindex}, event)">Save Changes</button>
      </div>
    </div>`;
  } else {
    alert("You are not permitted to change profile");
  }

}

// Function to save profile changes
function saveProfileChanges(userindex, event) {
  event.preventDefault();
  const user = userList[userindex];
  const updatedName = document.getElementById('edit-name').value;
  const updatedEmail = document.getElementById('edit-email').value;
  const updatedAddress = document.getElementById('edit-address').value;
  const updatedMobile = document.getElementById('edit-mobile').value;
  const updatedGitHub = document.getElementById('edit-github').value;
  const updatedLinkedIn = document.getElementById('edit-linkedin').value;

  // Update the user object with the new values
  user.name = updatedName;
  user.email = updatedEmail;
  user.address = updatedAddress;
  user.mobile = updatedMobile;
  user.github = updatedGitHub;
  user.linkedin = updatedLinkedIn;

  // Return to the profile page with updated information
  render_dashboard(userindex);
}


// admin dashboard 
function render_admin_dashboard(user_index) {
  const root = document.getElementById("root");
  const adminUser = userList[user_index]; // Access the admin user directly

  // Calculate the stats
  const activeUsers = userList.filter(user => user.status === 'active').length;
  const totalAdmins = userList.filter(user => user.role === 'Admin').length;
  const totalUsers = userList.filter(user => user.role === 'User').length;
  const pendingRequests = requestStack.length;
  root.innerHTML = `
  <div class="container-fluid">
      <div class="row">
          <!-- Sidebar -->
          <div class="col-md-2 sidebar">
              <h5 class="mb-4">clever</h5>
              <a href="#" class="active">Dashboard</a>
              <!-- Logout button -->
              <div class="logout-section">
                  <button class="btn-lg btn-logout w-100 mx-auto " onclick="logout(${user_index})">Logout</button>
              </div>
              <hr>
          </div>

          <!-- Main Content -->
          <div class="col-md-10">
              <!-- Navbar -->
              <nav class="navbar navbar-expand-lg navbar-dark">
                 <div class="container-fluid d-flex justify-content-center align-items-center" style="height: 30px;">
                    <span class="navbar-text text-success fw-bold display-4">
                    Welcome, ${adminUser.name}
                    </span>
                </div>

              </nav>

              <!-- Dashboard Stats -->
              <div class="row mt-3">
                  <div class="col-md-3">
                      <div class="card text-black" style="background-color: #c5d7e8;">
                          <div class="card-body">
                              <h5>${activeUsers}</h5>
                              <small>Active Users</small>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-3">
                      <div class="card text-black" style="background-color: #b6d9b1;">
                          <div class="card-body">
                              <h5>${totalAdmins}</h5>
                              <small>Admins</small>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-3">
                      <div class="card text-black" style="background-color: #e1f4f3;">
                          <div class="card-body">
                              <h5>${totalUsers}</h5>
                              <small>Total Users</small>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-3">
                      <div class="card text-black" style="background-color: #f9e2b7;" id = "pending-request">
                         <div class="card-body">
                            <h5>${pendingRequests}</h5>
                           <small>Pending Requests</small>
                          </div>
                   </div>
                  </div>
               </div>

              <!-- User Management Table -->
              <div class="card mt-4">
                  <div class="card-body">
                      <h5 class="card-title">User Management</h5>
                      <table class="table table-hover">
                          <thead>
                              <tr>
                                  <th>Name</th>
                                  <th>Role</th>
                                  <th>Status</th>
                                  <th>Pending Request</th>
                                  <th>Actions</th>
                              </tr>
                          </thead>
                          <tbody id = "admin-user-list">
                              
                          </tbody>
                      </table> 
                  </div>
              </div>
          </div>
      </div>
  </div>`;
  document.getElementById("pending-request").addEventListener("click", pendingRequestsModal);
  
    renderUserList();
  
}


// check how many user send request to admin
function pendingRequestsModal() {
  const modalContainer = document.createElement("div");
  modalContainer.setAttribute("id", "req-modal");
  modalContainer.innerHTML = `<div class="card w-100" style="width: 18rem;">
    <table>
      <thead>
        <tr>
          <td>UserId</td>
          <td>Request Type</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody id = "admin-user-requests">
      </tbody>
    </table>
    <button class="btn btn-sm mx-auto mt-5" onclick = "closeUser('${"req-modal"}')">Close</button>
  </div>`;
  const root = document.getElementById("root");
  root.appendChild(modalContainer);
  const adminrequestspending = document.getElementById("admin-user-requests");
  requestStack.forEach((req, reqid) => {
    const reqRow = document.createElement("tr");
    reqRow.innerHTML = `
            <td>${req.user}</td>
            <td>${req.request}</td>
            <td><button class = "btn rounded btn-success btn-sm" onclick = "approveUserRequest(${reqid})">Approve</button><button class ="ms-2 btn  btn-danger rounded btn-sm" onclick = "rejectUserRequest(${reqid})">Reject</button></td>`
    adminrequestspending.appendChild(reqRow);
  });

  viewUser("req-modal");
}

//admin approve user request
function approveUserRequest(stackid) {
  const req = requestStack[stackid];
  const user = userList.find(u => u.id === req.user);
  if (user) {
    if (req.request == "write") {
      userList[req.user].permission = "write";
    } else {
      userList[req.user].role = "admin";
      userList[req.user].permission = "write";
      
    }
    requestStack = requestStack.filter((req, id) => id != stackid);
    closeUser("req-modal");
    pendingRequestsModal();
  }
}


//admin reject user request
function rejectUserRequest(stackid) {
  requestStack = requestStack.filter((req, id) => id != stackid);
  closeUser("req-modal");
  pendingRequestsModal();
}


function renderUserList() {
  const userTableBody = document.getElementById("admin-user-list");
  userTableBody.innerHTML = `
  ${userList.filter((user, id) => id != current_user && userList[id].email !="admin@123.com").map(user => `

    <tr>
        <td>${user.name}</td>
        <td>${user.role}</td>
        <td><span class="badge ${user.status === 'active' ? 'bg-success' : 'bg-danger'}">${user.status === 'active' ? 'Active' : 'Inactive'}</span></td>
        <td><span class="badge ${user.adminPermission === false ? 'bg-warning' : 'bg-secondary'}">${user.adminPermission === false ? 'Pending' : 'No Request'}</span></td>
        <td>
            <button class="btn btn-sm" style="background-color: #6bbf8b;" onclick="renderUserDetails(${user.id})">View</button>
            <button class="btn btn-sm" style="background-color: #ff6b6b;" onclick="deleteUser(${user.id})">Delete</button>
            <button class="btn btn-sm" style="background-color: #4caf50;" onclick="approveRequest(${user.id})" ${user.adminPermission ? 'disabled' : ''}>Approve</button>
        </td>
    </tr>
`).join('')}`;
}

function renderUserDetails(userId) {
  const user = userList.find(u => u.id === userId);
  if (user) {
    // Navigate to a separate page that will display the user details
    const userDetailsPage = `
          <div class="viewrs-container mt-5">
              <div class="viewrs-row justify-content-center">
                  <div class="viewrs-col-md-8">
                      <!-- Card with a clean and modern look -->
                      <div class="viewrs-card border-0 shadow-lg">
                          <div class="viewrs-card-body">
                              <div class="viewrs-row align-items-center">
                                  <!-- Profile Picture Section -->
                                  <div class="viewrs-col-md-4 text-center">
                                      <img src="${user.profilePic}" alt="Profile Picture" class="viewrs-img-fluid rounded-circle mb-4" style="max-width: 180px; border: 5px solid #f3f3f3;">
                                  </div>
                                  <!-- User Information Section -->
                                  <div class="viewrs-col-md-8">
                                      <h3 class="viewrs-text-primary font-weight-bold mb-3">${user.name}</h3>
                                      <p><strong>Email:</strong> <span class="viewrs-text-muted">${user.email}</span></p>
                                      <p><strong>Role:</strong> <span class="viewrs-badge viewrs-badge-${user.role === 'Admin' ? 'success' : 'primary'}">${user.role}</span></p>
                                      <p><strong>Address:</strong> <span class="viewrs-text-muted">${user.address || 'N/A'}</span></p>
                                      <p><strong>Mobile:</strong> <span class="viewrs-text-muted">${user.mobile || 'N/A'}</span></p>
                                      <p><strong>GitHub:</strong> <a href="${user.github}" target="_blank" class="viewrs-text-decoration-none viewrs-text-info">${user.github}</a></p>
                                      <p><strong>LinkedIn:</strong> <a href="${user.linkedin}" target="_blank" class="viewrs-text-decoration-none viewrs-text-info">${user.linkedin}</a></p>
                                      <p><strong>Status:</strong> <span class="viewrs-badge viewrs-badge-${user.status === 'active' ? 'success' : 'danger'}">${user.status}</span></p>
                                  </div>
                              </div>
                              <!-- Action Buttons -->
                              <div class="viewrs-mt-4 text-center">
                                  <!-- Approve Button (only if admin permission is not granted) -->
                                  ${user.adminPermission === false ?
                                 `<button class="viewrs-btn viewrs-btn-success viewrs-btn-lg shadow-sm hover-shadow" onclick="approveRequest(${user.id})">Approve as Admin</button>` :
                                `<button class="viewrs-btn viewrs-btn-secondary viewrs-btn-lg shadow-sm" disabled>Admin Approved</button>`
      }
                                  <!-- Delete Button -->
                                  <button class="viewrs-btn viewrs-btn-danger viewrs-btn-lg viewrs-ml-3 shadow-sm hover-shadow" onclick="deleteUser(${user.id})">Delete User</button>
                                  <button class="viewrs-btn viewrs-btn-info viewrs-btn-lg viewrs-ml-3 shadow-sm  close-user"  onclick="closeUser("user-details")">Close</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      `;

    const userDetails = document.createElement("div")
    userDetails.setAttribute("id", "user-details");
    userDetails.innerHTML = userDetailsPage;
    // Set the user details HTML as the content
    const root = document.getElementById('root');
    root.appendChild(userDetails);
  }
  viewUser("user-details");
}

//view modal
function viewUser(id) {
  var modal = document.getElementById(id);
  modal.style.display = "block";
}

//close modal 
function closeUser(id) {
  var modal = document.getElementById(id);
  document.getElementById("root").removeChild(modal)
  modal.style.display = "none";
}


// Delete user
function deleteUser(userId,) {
  userList = userList.filter(user => user.id !== userId);
  renderUserList();
}

renderLoginPage();
