## Vulnerability

SQL Injection allows attacker to write SQL query directly to the web application's input fields and query or modify its database. In this case, it works because natas user input is not properly sanitized.

## Code explanation

1. Code ranges through all possible letters and numbers and adds it to password buffer;
2. For each iteration on password buffer, it sends request to natas homepage;
3. Request is made with specific auth header to access it;
4. When the query succeeds (the response contains specific text or specific time has passed since request), then we conclude that password is found.