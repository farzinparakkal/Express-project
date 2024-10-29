import { Router } from "express";

import * as rh from './requestHandler.js'
import Auth from "./middleware/Auth.js";

const router=Router();

router.route('/adduser').post(rh.adduser)
router.route('/login').post(rh.login)
router.route('/getUser').get(Auth,rh.getUser)
router.route('/getUserDetails/').get(Auth,rh.getUserDetails)
router.route('/addpost').post(Auth,rh.addPost)
router.route('/showPost/:id').get(rh.showPost)
router.route('/update/:id').put(Auth,rh.update)
router.route('/deleteUser/:id').delete(rh.deleteUser)
router.route('/deletePost/:id').delete(rh.deletePost)


export default router;

