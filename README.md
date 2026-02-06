## Overview

This activity involved designing a simple and user-friendly homepage integrated with basic information security features. The website consists of a header with navigation links, a main content section containing a feedback form, and a footer.

The primary goal of this activity is to demonstrate how fundamental security principles can be applied to a basic web application using both front-end and back-end techniques, as required in the Information Assurance and Security course.

---

## Front-End Implementation and Security Measures

On the front end, HTML and CSS were used to create a clean, structured, and responsive homepage layout. JavaScript was implemented to perform client-side input validation.

The system checks whether all form fields are completed and validates the email format using a regular expression before allowing form submission. This client-side validation enhances user experience by preventing incomplete or incorrectly formatted inputs.

However, client-side validation alone is not sufficient for security, as it can be bypassed by attackers. For this reason, additional security controls were implemented on the server side.

---

## Back-End Security Measures

Node.js with Express was used as the server-side technology to securely handle form submissions. The server performs input re-validation to ensure that all required fields are provided and that the email format remains valid.

This approach prevents malicious users from bypassing front-end validation. To protect against Cross-Site Scripting (XSS) attacks, user inputs are sanitized before being processed or displayed.

Error handling is implemented using predefined HTML responses for both error and success cases. This prevents sensitive server information, such as file paths or stack traces, from being exposed to users.

---

## Testing and Security Verification

The system was tested using both valid and invalid inputs. Submissions containing empty fields, invalid email formats, and special characters were correctly rejected by the server.

Appropriate error messages were displayed without revealing internal system details. Successful submissions redirected users to a confirmation page, demonstrating secure and user-friendly handling of user feedback.
