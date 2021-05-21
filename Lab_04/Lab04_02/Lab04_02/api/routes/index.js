const express=require("express");
const router=express.Router();
const controllerStudents=require("../controllers/students.controller.js");
const controllerAddresses=require("../controllers/addresses.controller.js");

router.route("/students").get(controllerStudents.studentsGetAll)
router.route("/students/:studentId").get(controllerStudents.studentsGetOne);
router.route("/students/:studentId/addresses").get(controllerAddresses.addressesGet);

module.exports=router;