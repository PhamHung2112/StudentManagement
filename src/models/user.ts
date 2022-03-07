export interface UserPayload {
  email?: string;
  username?: string;
  password: string;
  fullName?: string;
  identifier?: string;
}

export interface Role {
  id: number | string;
  name: string;
  description: string;
  type: string;
  created_by: any;
  updated_by: any;
}

export interface UserInfor {
  id: number | string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: any;
  role: Role;
}

export interface User {
  jwt: string;
  user: UserInfor;
  created_at: string;
  updated_at: string;
  created_by: any;
  updated_by: any;
  fullName: string;
}
