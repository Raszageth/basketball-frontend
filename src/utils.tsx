import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    exp?: number;
}

export const isTokenExpired = (token: string): boolean => {
    try {
        const decoded: DecodedToken = jwtDecode(token);
        if (typeof decoded.exp === 'number') {
            return decoded.exp < Date.now() / 1000;
        }
        return true;
    } catch (error) {
        console.error("Decoding failed:", error);
        return true;
    }
};