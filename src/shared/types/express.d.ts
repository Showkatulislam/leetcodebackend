import { AccessTokenPayload } from "../shared/utils/jwt.utils.js"; // Adjust path to your payload interface

declare global {
    namespace Express {
        interface Request {
            user?: AccessTokenPayload; // Or define inline: { id: string; role: string; }
        }
    }
}