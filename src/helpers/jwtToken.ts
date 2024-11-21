import jwt from "jsonwebtoken"

class Jwttoken{
   static createJwt(Data:any, sicretKey:string , options:object):string{
        const jwttoken = jwt.sign(Data, sicretKey , options);
        return jwttoken
    }

   /*  static verifyJwt(jwt:any,sicretKey:string){
        const Data = jwt.verify(jwt, sicretKey);
        return Data.id
    } */
}

export default Jwttoken