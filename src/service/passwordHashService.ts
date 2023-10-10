const bcrypt = require('bcrypt')

export async function hashPass(_password: string, _salt: number): Promise<string> {
    const hash = await bcrypt.hash(_password, _salt);
    return hash;
}

export async function decryptHashPass(_password: string, _hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(_password, _hash);
    return isValid;
}