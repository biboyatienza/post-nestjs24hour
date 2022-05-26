import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt"
import { JwtPayloadType } from "../types/jwt-payload.type";

export class TokenStrategy extends PassportStrategy(Strategy, 'jwt'){
  constructor(){
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.TOKEN_SECRET
    });
  }

  validate(payload: JwtPayloadType){
    return payload;
  }
}