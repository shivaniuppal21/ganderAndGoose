// Checks if given email corresponds to a user in a given database, returns true or false


const emailExists = (db, email) => {
    // fetch user gives user object if email exist
    return  fetchUser(db, email)
    .then ((res) => {  
      if (res)
      {
        return (true)
      }   
      else{
        return false
      }
    })
  }
      
  const fetchPassword = (db, email) => {
    // fetch user gives user object if email exist
    return  fetchUser(db, email)
    .then ((res) => {  
      console.log(res)
      if (res)
      {
        return (res.password)
      }
        return null
    })
  }

// Return user with matching email IF exist - otherwise return null
const fetchUser = (db, email) => {
  const query = `SELECT * FROM Users WHERE Users.email = '${email}'`;
  return new Promise((resolve,reject) => {
    db.query(query, (err, res) => {
    if (err) {
        reject(null)
    }
    else{
      if (res.rows.length === 0){
        console.log("rejecting")
        resolve(null)
      }
      else{
        console.log(res.rows[0])
        resolve(res.rows[0]);
      }
      
    }
  })
})
}
module.exports = {emailExists,fetchUser,fetchPassword};
