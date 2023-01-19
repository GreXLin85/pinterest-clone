import { verify, sign } from './JWTHelper';

describe('JWTHelper', () => {
    it('should verify a token', () => {
        const token = sign(1);
        const decoded = verify(token);
        expect(decoded.id).toBe(1);
    });
    it('should throw an error when the token is invalid', () => {
        expect(() => verify('invalid')).toThrow();
    });
});
