export interface JwtPayload {
  email: string;
  id: number;
  role: string;
  expiration?: Date;
}
