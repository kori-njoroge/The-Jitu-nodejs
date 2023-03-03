const userRouter = require('express').Router();

const { getAllUsers,
    addUser,
    deleteUser,
    getSingleUser,
    loginUser,
    updateUserInfo,
    validateTokenController,
    sendEmail
} = require('../controllers/usercontrollers');

userRouter.get('/',getAllUsers);
userRouter.post('/',addUser);
userRouter.post('/delete',deleteUser);
userRouter.post('/singleuser',getSingleUser);
userRouter.post('/login',loginUser);
userRouter.post('updateuser',updateUserInfo);
userRouter.get('/validate',validateTokenController);
userRouter.get('/sendmail',sendEmail);

module.exports = userRouter;
