"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const common_2 = require("@nestjs/common");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    async createUser(userDto) {
        const { email, password, age } = userDto;
        if (!email || !password || !age) {
            throw new common_2.BadRequestException('Email, password, and age are required');
        }
        const user = new user_entity_1.UserEntity();
        user.email = email;
        await this.generatePassword(password, user);
        user.age = age;
        await this.userRepository.save(user);
        return user;
    }
    async getUser(userid) {
        return await this.userRepository.findOne({ where: { id: userid } });
    }
    async getAllUsers() {
        return await this.userRepository.find();
    }
    async generatePassword(password, user) {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(password, salt);
        return user;
    }
    async getUserByEmail(email) {
        return await this.userRepository.findOne({ where: { email } });
    }
    async comparePassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }
};
__decorate([
    (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity),
    __metadata("design:type", typeorm_2.Repository)
], UserService.prototype, "userRepository", void 0);
UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map