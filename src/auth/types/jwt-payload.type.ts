export type JwtPayload = {
  email: string;
  sub: number;
  roles: Array<string>;
};
