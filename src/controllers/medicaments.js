const connectionDB  = require('../data/Connection');

let createMedicament = async(req, res) => {
    try {
        let { id, name, type, location, quantity, cost, date } = req.body;
        let {status, data} = connectionDB.readData();

        if (status === 200) {
            let medicament = {
                id,
                name,
                type,
                location,
                quantity,
                cost,
                date
            }

            data.medicaments.push(medicament);
            let {status: statusSaveData} = connectionDB.writeData(data);

            if (statusSaveData === 200) {
                var socket = req.app.get('io');
                socket.emit('notificacion', {type: 'C', alert:'Medicamento creado exitósamente.'});
                res.status(200).json({ medicament, message: "Medicamento creado exitósamente." });
            }else{
                res.status(500).json({ message: "Error del servidor." });
            }
        } else {
            res.status(500).json({ message: "Error del servidor." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error del servidor." });
    }
}

let getAllMedicaments = async(req, res) => {
    try {
        let {status, data} = connectionDB.readData();
        
        if (status === 200) {
            res.status(200).json(data);
        } else {
            res.status(500).json({ message: "Error del servidor." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error del servidor." });
    }
}

let getMedicamentById = async(req, res) => {
    try {
        //si el id no es un numero valido en el json, simplemente no encontrara nada.
        
        let { id } = req.params;
        let {status, data} = connectionDB.readData();
        if (status === 200) {
            let medicament = data.medicaments.find((m) => m.id === Number(id));
            if (medicament) {
                res.status(200).json({ medicament });
            }else{
                res.status(404).json({ message: "No se encontró información." });
            }
        } else {
            res.status(500).json({ message: "Error del servidor." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error del servidor." });
    }
}

let updateMedicament = async(req, res) => {
    try {
        let {name, type, location, quantity, cost, date } = req.body;
        let { id } = req.params;
        let {data} = connectionDB.readData();
        let index = data.medicaments.findIndex((m)=>m.id === Number(id));
        if (index > -1) {
            let medicament = data.medicaments[index];
            medicament.name = name;
            medicament.type = type;
            medicament.location = location; 
            medicament.quantity = quantity; 
            medicament.cost = cost;
            medicament.date = date;

            let {status: statusSaveData} = connectionDB.writeData(data);

            if (statusSaveData === 200) {
                res.status(200).json({ medicament: data.medicaments[index], message: "Medicamento actualizado exitósamente." });
            } else {
                res.status(500).json({ message: "Error del servidor." });
            }
        } else {
            res.status(404).json({ message: "No se encontró información." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error del servidor." });
    }
}

let deleteMedicament = async(req, res) => {
    try {
        let { id } = req.params;
        let {data} = connectionDB.readData();
        let index = data.medicaments.findIndex((m)=>m.id === Number(id));
        if (index > -1) {
            data.medicaments.splice(index, 1);
            let {status: statusSaveData} = connectionDB.writeData(data);
            
            if (statusSaveData === 200) {
                var socket = req.app.get('io');
                socket.emit('notificacion', {type: 'D', alert:'El medicamento fue eliminado exitósamente.'});
                res.status(200).json({ message: "El medicamento fue eliminado exitósamente." });
            } else {
                res.status(500).json({ message: "Error del servidor." });
            }
        } else {
            res.status(404).json({ message: "No se encontró información." });
        }
    } catch (error) {
        res.status(500).json({ message: "Error del servidor." });
    }
}

module.exports = {
    createMedicament,
    getAllMedicaments,
    getMedicamentById,
    updateMedicament,
    deleteMedicament
}