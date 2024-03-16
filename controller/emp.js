const Emp = require('../models/emp');

async function create(req, res, next) {
    try {
        let empName = req.body.empName;
        let empEmail = req.body.empEmail;
        let empMobile = req.body.empMobile;
        let emp = new Emp({
            empName,
            empEmail,
            empMobile
        });
        const data = await emp.save();
        res.send(data);
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).send('Internal server error');
    }
}

function view(req,res,next){
    Emp.find({}).then((data)=>{
        res.send(data);
    })
}

async function update(req, res, next) {
    try {
        const updatedEmp = await Emp.findByIdAndUpdate(req.params.id, req.body);
        if (!updatedEmp) {
            return res.status(404).send({ error: "Record not found" });
        }
        res.send({ success: "Updated Successfully" });
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).send({ error: "Problem with updating the record" });
    }
}

async function remove(req,res,next){
    try{
        const deletedEmp = await Emp.findByIdAndDelete(req.params.id, req.body);
        if(!deletedEmp){
            return res.status(404).send({ error: "Record not found" });
        }
        res.send({ success: "Deleted Successfully." })
    } catch(error){
        console.error("Error deleting record: ",error);
        res.status(500).send({ error: "Problem with deleting the record." })
    }
}

module.exports.remove = remove;
module.exports.update = update;
module.exports.view = view;
module.exports.create = create;