const userRouter = require('express').Router();

const { getAllUsers,
    addUser,
    deleteUser,
    getSingleUser,
    loginUser,
    updateUserInfo
} = require('../controllers/usercontrollers')

userRouter.get('/',getAllUsers);
userRouter.post('/',addUser);
userRouter.post('/delete',deleteUser);
userRouter.post('/singleuser',getSingleUser);
userRouter.post('/login',loginUser);
userRouter.post('updateuser',updateUserInfo);

module.exports = userRouter;
