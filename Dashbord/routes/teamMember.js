const express = require('express');
const router = new express.Router;
const Team = require('../controllers/team');
const Member = require('../controllers/member');
router.get('/',(req,res)=>res.send('ok'));
// team routes
router.post('/team/create',Team.create);
router.get('/team/find',Team.find);
router.post('/team/find/member/:id', Team.membersByTeam);
router.delete('/team/delete/:id', Team.delete)
router.patch('/team/update/:id', Team.update)
// member routes
router.post('/member/create/:id', Member.create);
router.post('/member/find',Member.find);
router.post('/member/populate/:id',Member.teamByMember);
//router.delete('/member/delete/:id/:idm',Member.deleteMember)


module.exports = router;