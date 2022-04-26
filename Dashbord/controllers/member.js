const Member = require('../models/member');
const Team = require('../models/team');

module.exports = {
    create : async (req, res) => {

        console.log(req.params);
        team = req.params;
        id = team.id;
        const { name,email} = req.body;
        const member = await Member.create({
            name,
            email,
            team:id
        });
        await member.save();

        const teamById = await Team.findById(id);

        teamById.members.push(member);
        await teamById.save();

        return res.send(teamById);
    },
    find : async (req, res) => {
        const member = await Member.find()
        return res.send(member)
    },
    teamByMember : async (req,res)=>{
        const { id } = req.params;
        const teamByMember = await Member.findById(id).populate('team');
        res.send(teamByMember);
    },
    deleteMember : async (req,res)=> {
        
        const { id } = req.params;
        const { idm } = req.params;
        console.log(id,idm);

        
        // const member = await Member.findById(idm);
        // await member.save();
        const teamById = await Team.findById(id);
        teamById.members.splice(Member.findById(idm));
        await teamById.save();
        

        
        
        return res.send(teamById);
    //     // console.log(req.params);
    //     // id = req.params.id;
    //     // idm = req.params.idm;

    //     // const team = await Team.findById(id);
        
    //     // const member = await Member.findByIdAndRemove(team.members[idm]);

    //     // res.send(member);
        
    //     //const member = await Member.findById(idm);
    //     //await member.save();
    //    //q const teamById = await Team.findById(id);
    //    //   Member.deleteOne(teamById.members[member]);
    //    // await teamById.save();
     }
    
    
}