const bcrypt = require('bcrypt')

export async function hashPass(_password: string, _salt: number): Promise<string> {
    const hash = await bcrypt.hash(_password, _salt);
    return hash;
}