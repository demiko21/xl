const EmployeeModel = require('../models/employee');

module.exports = {
    getAll: (req, res) => {
        EmployeeModel.find({})
            .then(data => {
                res.json(data);
            })
            .catch(error => {
                res.status(500).json(error);
            })
    },
    add: async (req, res) => {
        try {
            const savedItem = await new EmployeeModel(req.body).save();
            res.json(savedItem);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getOne: async (req, res) => {
        try {
            const item = await EmployeeModel.findById(req.params.id);
            res.json(item);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    delete: async (req, res) => {
        try {
            await EmployeeModel.deleteOne({ _id: req.params.id });
            res.json({ success: true });
        } catch (error) {
            res.status(500).json(error);
        }
    },
    update: async (req, res) => {
        try {
            const item = await EmployeeModel.findByIdAndUpdate(req.params.id,
                { $set: req.body },
                {
                    new: true
                }
            );
            res.json(item);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    search: async (req, res) => {
        const { page = 1, limit = 10, searchText } = req.query;
        const query = searchText ? { 
            $or: [{ firstName: new RegExp(searchText, 'i') }, { lastName: new RegExp(searchText, 'i') }, { pid: new RegExp(searchText, 'i') }]
        } : {};

        try {
            const employees = await EmployeeModel.find(query)
                .limit(Number(limit))
                .skip((page - 1) * Number(limit))
                .exec();

            const count = await EmployeeModel.countDocuments(query);

            res.json({
                employees,
                totalPages: Math.ceil(count / limit),
                currentPage: Number(page)
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }
}