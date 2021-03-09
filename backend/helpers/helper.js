// Checks if given email corresponds to a user in a given database, returns true or false
const emailExists = (users, email) => {
    // fetch user gives user object if email exist
    if (fetchUser(users, email)) {
      return true;
    } else {
      return false;
    }
  };

// Return user with matching email IF exist - otherwise return null
const fetchUser = (users, email) => {
    for (const userkey in users ) {
      if (users[userkey].email === email) {
        return users[userkey];
      }
    }
    return null;
  };