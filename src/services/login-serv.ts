import { IUser } from "../models/user";
import { UserService } from "./user-serv";
import { JwtUtil } from "../utils/jwt-util";
import { EncryptionUtil } from "../utils/encryption-util";

export class LoginService {
    private jwtUtil: JwtUtil;
    private encryptionUtil: EncryptionUtil;

    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public async login(params: any) {
        let user: any = await this.userService.findByUsername(params.username);

        if (this.encryptionUtil.verifyWithBcrypt(params.password, user.password)) {
            let payload = {
                id: user.id
            };

            const jwtToken = this.jwtUtil.generateToken(payload);

            // Don't return password
            delete user.password;

            return {
                user: user,
                success: true,
                token: jwtToken
            };
        } else {
            return {
                success: false,
                message: 'Invalid login'
            };
        }
    }
}