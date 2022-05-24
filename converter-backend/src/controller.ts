import user from '../model/model';
import {Response, Request} from 'express';

export const handleCreateUser = (req: Request, res : Response) => {
    //validate request
    if(!req.body) {
        return res.status(400).json({
            message : "all fields can not be empty"
        })
    } 
    if(!req.body.algo_address || !req.body.eth_address) {
        return res.status(400).json({
            message : "fill all neccessary fields"
        })
    }
    if(req.body.amount < 1) {
        return res.status(400).json({
            message : "Minimum Amount to convert must not be less than 1"
        })
    }

    //Storing each user document
   const userDocument = new user({
       eth_address : req.body.eth_address,
       algo_address : req.body.algo_address,
       amount : req.body.amount,
       pending : req.body.pending
   })

   userDocument.save()
   .then((data) => {
    res.status(200).json({
        message : 'User Document details successfully stored for explorer use only',
        data : data
    })
   })
   .catch(err => {
    res.status(500).json({
        message: err.message || "error occurred while storing User Document details"
    })
 })


}


