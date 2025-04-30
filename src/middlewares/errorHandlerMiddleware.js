export default function errorHandler(error, req, res, next){

    if(error.type === "conflictName"){
        return res.status(409).send(error.message);
    }
    
    if(error.type === "conflictCPF"){
        return res.status(409).send(error.message);
    }
    
    if(error.type === "notFound_Customer"){
        return res.status(404).send(error.message);
    }
    
    if(error.type === "notFound_Game"){
        return res.status(404).send(error.message);
    }
   
    if(error.type === "invalidRentalInfo"){
        return res.status(409).send(error.message);
    }
   
    if(error.type === "notAvaiable"){
        return res.status(422).send(error.message);
    }
   
    if(error.type === "unfinished"){
        return res.status(422).send(error.message);
    }
 
    if(error.type === "finished"){
        return res.status(422).send(error.message);
    }

    return res.status(500).send(error.message)

}
