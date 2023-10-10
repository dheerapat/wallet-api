const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config();

export function generateAccessToken(email: string): string {
    return jwt.sign({data: email}, process.env.TOKEN_SECRET, { expiresIn: '1h' });
}

export function veryifyAccessToken(_jwt: string): string {
    try {
        return jwt.verify(_jwt, process.env.TOKEN_SECRET).data
    } catch (e) {
        throw (e)
    }
}