# Endpoints

- Get Profile by ID (GET: /profile/:id)
  \*\* returns user object (properties: phone, profileId, name, bio, links)

- User Login (POST: /login)
  \*\* returns only token via header

- Create User Account (POST: /register)
  \*\* returns only token via header

##user route has auth middleware

- Get Me (POST: /user/me)
  \*\* if authenticated & profile found, returns user object (properties: phone, profileId, name, bio, links, email)

- Update User Settings (POST: /user/settings)
  \*\* if authenticated & profile found, updates given keys and returns nothing

- Update User Links (POST: /user/links)
  \*\* if authenticated & profile found, replaces entire links object with the new one the client sends (meaning client needs to send old links as well), returns nothing
