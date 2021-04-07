# Endpoints

- Get Profile by ID (GET: /profile/:id)
  \*\* returns user object (properties: photoUrl, phone, profileId, name, bio, links)

- User Login (POST: /login)
  \*\* returns only token via header

- Create User Account (POST: /register)
  \*\* returns only token via header

### user route has auth middleware

- Get Me (POST: /user/me)
  \*\* if authenticated & profile found, returns user object (properties: photoUrl, phone, profileId, name, bio, links, email)

- Update User Settings (POST: /user/settings)
  \*\* if authenticated & profile found, updates given keys and returns nothing

- Update User Links (POST: /user/links)
  \*\* if authenticated & profile found, replaces entire links object with the new one the client sends (meaning client needs to send old links as well), returns nothing

- Update User Profile Picture (POST: /user/upload)
  \*\* if authenticated & profile found, uploads image, processes via mutler, and uploads to cloudinary and returns 200 OK, sets photoUrl key for user object

### admin route has auth middleware (only if req.user.email me@sepmotameni.com can access)

\*\* Get all users (GET: /admin)

\*\* Get user by ID (GET: /admin/:id)
