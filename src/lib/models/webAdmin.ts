import type { Role } from "./role";

export interface WebAdmin {
  id: bigint;
  steamid: string;
  name: string;
  roleid: Role;
  timestamp: Date;
}
