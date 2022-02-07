import { UserService } from './user-serv';
import { JwtUtil } from '../utils/jwt-util';
import { GenericUtil } from '../utils/generic-util';
import { EncryptionUtil } from '../utils/encryption-util';

export class LoginService {
    private jwtUtil: JwtUtil;
    private genericUtil: GenericUtil;
    private encryptionUtil: EncryptionUtil;

    private userService: UserService;

    constructor() {
        this.userService = new UserService();

        this.jwtUtil = new JwtUtil();
        this.genericUtil = new GenericUtil();
        this.encryptionUtil = new EncryptionUtil();
    }

    public async login(params: any, headers: any) {
        let users: any = await this.userService.findByEmail(params.email);

        if (users && users[0]) {
            let user = users[0];

            if (this.encryptionUtil.verifyWithBcrypt(params.password, user.password)) {
                let payload = {
                    id: user.id
                };

                const jwtToken = this.jwtUtil.generateToken(payload);

                // Don't return password
                delete user.password;

                user.profile_image = this.genericUtil.getUserProfileImage(user.profile_image);

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
        } else {
            return {
                success: false,
                message: 'User not found'
            };
        }
    }
}