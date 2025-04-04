import { compare, genSalt, hash } from 'bcryptjs';

export const comparePassword = async (password, hashedPassword) => {
    return await compare(password, hashedPassword);
}

export const createHash = async (password) => {
    const salt = await genSalt();

    const hashedPassword = await hash(password, salt);
    return hashedPassword;
}