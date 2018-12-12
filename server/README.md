This application demonstrates 3 authentication flows:

1. Sign up -> user sending email and passport -> verifying user email is not in use -> return token to the user -> the user is authenticated

2. Sign in -> user sending email and passport -> verifying email and password are correct using local strategy -> return token to the user

3. Authorized request -> already registered user making an authenticating request -> verify token using JWT strategy and give user an access to whatever the resource user requested


Saving a password

1. Generating salt and use it to hash or encrypt the password

SALT + PLAIN PASSWORD = SALT + HASHED PASSWORD


Comparing a password(sign in)

1. retrieve SALT which is saved record in the data base
2. use retrieved salt to encrypt the SUBMITTED PASSWORD from the request === HASHED PASSWORD
2. Compare the stored HASHED PASSWORD and new HASHED PASSWORD
