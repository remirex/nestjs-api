import { RolesBuilder } from 'nest-access-control';
import { Role } from '../enums';

export const RBAC_POLICY: RolesBuilder = new RolesBuilder();

// prettier-ignore
RBAC_POLICY
  // USER
  .grant(Role.USER)
    .read('profile')
    .updateOwn(['profile','refreshToken'])
  // ADMIN  
  .grant(Role.ADMIN)
    .extend(Role.USER)
    .read('users')
    .create('users')
    .update('users')
    .delete('users')
