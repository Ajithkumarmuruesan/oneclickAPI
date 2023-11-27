
const bcrypt = require('bcrypt');


// Function to hash a password and return a promise
async function hashPassword(password) {
    return new Promise((resolve, reject) => {
        // You can use a bcrypt library, like 'bcrypt' or 'bcryptjs', to hash the password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                reject(err);
            } else {
                resolve(hashedPassword);
            }
        });
    });
}

module.exports = hashPassword;