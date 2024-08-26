// Modelo TOTP
export function createTOTP(secret, email) {
    return {
      email,
      secret,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
}
