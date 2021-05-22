const express=require("express");
const router=express.Router();
const controllerStudents=require("../controllers/students.controller.js");
const controllerAddresses=require("../controllers/addresses.controller.js");

router.route("/students")
    .get(controllerStudents.studentsGetAll)
    .post(controllerStudents.studentsAddOne);

router.route("/students/:studentId")
    .get(controllerStudents.studentsGetOne)
    .put(controllerStudents.studentsFullUpdate)
    .delete(controllerStudents.studentsDeleteOne);

router.route("/students/:studentId/addresses")
    .get(controllerAddresses.addressesGet)
    .post(controllerAddresses.addressesAddOne)
    .put(controllerAddresses.addressesFullUpdate)
    .delete(controllerAddresses.addressesDeleteOne);

module.exports=router;