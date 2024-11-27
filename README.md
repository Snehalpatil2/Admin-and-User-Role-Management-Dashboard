Admin and User Role Management Dashboard

Project Overview:

The User Role and Profile Management System is a web-based application that facilitates user registration, authentication, and profile management. This project allows different user roles (admin and regular user) with distinct permissions to manage and update their profiles. Users can request permission changes, and admins can approve or deny these requests. The application includes user authentication, dynamic role-based access control, and profile management features such as editing details and uploading a profile picture.
Features
1. User Authentication:

    Login: Users can log in using their registered email and password.
    Sign-Up: New users can sign up by providing necessary details like name, email, password, and optional information such as address, mobile number, GitHub, LinkedIn, and profile picture.

2. Role and Permission Management:

    Admin Role: Admin users have enhanced privileges, such as managing user roles and approving requests from regular users.
    Regular Users: Users can request admin roles or permission changes (e.g., write access to their profile).
    Role-Based Access: Users have specific permissions such as "read" or "write" that determine whether they can modify their profiles or not.

3. Profile Management:

    Edit Profile: Users can update their name, email, address, mobile number, GitHub, and LinkedIn links.
    Profile Picture: Users can upload or change their profile picture during registration or via their profile settings.

4. Admin Dashboard:

    Admin users have access to an admin dashboard where they can view user requests, approve or deny changes, and manage user profiles.

5. File Upload:

    Profile picture upload is supported. Users can select an image from their local system, which is displayed as their profile picture.

Technology Stack:

    Frontend:
        HTML: Structuring the web pages.
        CSS: Styling and layout for responsive design.
        JavaScript: Logic for user authentication, form validation, profile management, and role-based features.

Project Setup:
1. Clone or Download the Repository

To get started with the project:

    Clone the repository or download the project files.
    Extract the files into a directory on your local machine.

2. Opening the Project

    Open the index.html file in your browser to run the project.

User Flow:

    Login Page:
        Input Fields: Email and Password.
        Option to redirect to the sign-up page if the user does not have an account.

    Sign-Up Page:
        Input Fields: Name, Email, Password, Address, Mobile, GitHub, LinkedIn, Profile Picture.
        After submitting, users are added to the system and can log in.

    User Dashboard:
        Displays user details (name, email, etc.) with the ability to edit profile information if the user has write access.
        Users with read-only permissions can request permission upgrades.

    Admin Dashboard:
        Admins can view and approve or reject permission requests from regular users.
        Admins can update user profiles, including roles and permissions.


How to Use:
1. Open the Project

    Open the index.html file in your browser.

2. Login or Sign-Up

    Login: Use the pre-seeded admin credentials or sign up as a new user.
    Sign-Up: Provide the necessary details to register as a new user.

3. User Dashboard

    After logging in, you will be redirected to the dashboard where you can:
        Edit Profile: If you have write access, you can edit your details.
        Request Role or Permission Change: Users can request to become admins or request write permissions.

4. Admin Dashboard

    Admin users can:
        Approve or deny requests from regular users.
        Manage user profiles and permissions.

Future Enhancements:

    Password Encryption: Implement password encryption (e.g., bcrypt) for secure storage.
    Persistent Data Storage: Integrate a database (such as MongoDB or MySQL) to store user data and session information.
    Advanced Role Management: Add more user roles with different permissions, such as Moderator, Super Admin, etc.
    Request Workflow: Implement an approval system for role and permission change requests, with notifications for users and admins.

Contributors:

    Snehal Jitendra Patil – Project Creator and Developer


