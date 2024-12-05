import { Injectable, HttpException, HttpStatus, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        private jwtService: JwtService,
    ) { }

    private prismaService = new PrismaClient();

    async changePassword(user_id, input_current_password, new_password) {
        let userData = await this.prismaService.users.findFirst({
            where: {
                user_id
            }
        });

        if (!userData) {
            throw new HttpException('NOT FOUND USER', HttpStatus.NOT_FOUND);
        };

        const currentPassword = userData.password;

        if (input_current_password !== currentPassword) {
            throw new HttpException('Incorrect password', HttpStatus.BAD_REQUEST);
        }

        const hashedPassword = await bcrypt.hash(new_password, 5);
        let data = await this.prismaService.users.update({
            where: {
                user_id
            },
            data: {
                password: hashedPassword
            }
        });

        return data != null;
    }

    async login(payload){
        const { email, input_password} = payload;
        let userData = await this.prismaService.users.findFirst({
            where: {
                email
            }
        });

        if (!userData) {
            throw new HttpException('NOT FOUND USER', HttpStatus.NOT_FOUND);
        };

        const checkPassword = await bcrypt.compare(input_password, userData.password);

        if(!checkPassword){
            throw new HttpException('Invalid Password', HttpStatus.BAD_REQUEST);
        }

        const {password, ...data} = userData;
        return {
            access_token: this.jwtService.sign(data)
        };
    }

    async createUser(email, input_password, name, date_of_birth){
        let checkUserExist = await this.prismaService.users.findFirst({
            where: {
                email
            }
        });

        if(checkUserExist){
            throw new BadRequestException('Email already used');
        }

        let hashedPassword = await bcrypt.hash(input_password, 5);
        date_of_birth = new Date(date_of_birth);
        let data = await this.prismaService.users.create({
            data: {
                email,
                password: hashedPassword,
                name,
                date_of_birth
            }
        });

        return data != null;    
    }

    async decodeToken(token: string){
        try {
            const decodedToken = this.jwtService.verify(token.replace('Bearer ', ''));
            return decodedToken;
        } catch (err) {
            throw new UnauthorizedException('Invalid Token');
        }   
    }
}
