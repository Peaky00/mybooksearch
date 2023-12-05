// const router = require('express').Router();
// const {
//   createUser,
//   getSingleUser,
//   saveBook,
//   deleteBook,
//   login,
// } = require('../../controllers/user-controller');

// // import middleware
// const { authMiddleware } = require('../../utils/auth');

// // put authMiddleware anywhere we need to send a token for verification of user
// router.route('/').post(createUser).put(authMiddleware, saveBook);

// router.route('/login').post(login);

// router.route('/me').get(authMiddleware, getSingleUser);

// router.route('/books/:bookId').delete(authMiddleware, deleteBook);

// module.exports = router;

const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveBook,
  deleteBook,
  login,
} = require('../../controllers/user-controller');

// Import middleware
const { authMiddleware } = require('../../utils/auth');

// Route to create a new user (sign up)
router.route('/signup').post(createUser);

// Route to log in
router.route('/login').post(login);

// Route to get a single user (requires authentication)
router.route('/me').get(authMiddleware, getSingleUser);

// Route to save a book (requires authentication)
router.route('/books/:bookId').put(authMiddleware, saveBook);

// Route to delete a book (requires authentication)
router.route('/books/:bookId').delete(authMiddleware, deleteBook);

module.exports = router;
