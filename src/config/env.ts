if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRATION) {
    throw new Error('JWT_SECRET not found');
}

export const env = {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiration: process.env.JWT_EXPIRATION
};
