const express=require('express')
const mongoose=require('mongoose')

const PhaseMessage=require('../models/phaseMessage')

const router = express.Router();

module.exports.getPhases = async (req, res) => { 
    try {
        const phaseMessages = await PhaseMessage.find();
                
        res.status(200).json(phaseMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


//  module.exports.getPhase = async (req, res) => { 
//     const { id } = req.params;

//     try {
//         const post = await PhaseMessage.findById(id);
        
//         res.status(200).json(post);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// } 
module.exports.getPhase = async (req, res) => { 
   
    
    try {
        
        const post = await PhaseMessage.find({projectId:req.params.id});
          
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports.createPhase = async (req, res) => {
    const { name, description, selectedFile, creator, tags , startDate , endDate,priority,projectId,memberid } = req.body;

    const newPhaseMessage = new PhaseMessage({ name, description, selectedFile, creator, tags , startDate , endDate, priority,projectId,memberid })

    try {
        await newPhaseMessage.save();

        res.status(201).json(newPhaseMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


module.exports.updatePhase = async (req, res) => {
    const { id } = req.params;
    const { name, description, selectedFile, creator, tags , startDate , endDate ,priority ,memberid} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No phase with id: ${id}`);

    const updatedPhase = { name, description, selectedFile, creator, tags , startDate , endDate , priority, _id: id ,memberid};

    await PhaseMessage.findByIdAndUpdate(id, updatedPhase, { new: true });

    res.json(updatedPhase);
}


module.exports.deletePhase = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No phase with id: ${id}`);

    await PhaseMessage.findByIdAndRemove(id);

    res.json({ message: "Phase deleted successfully." });
}


module.exports.likePhase = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No phase with id: ${id}`);
    
    const phase = await PhaseMessage.findById(id);

    const updatedPhase = await PhaseMessage.findByIdAndUpdate(id, { likeCount: phase.likeCount + 1 }, { new: true });
    
    res.json(updatedPhase);
}

