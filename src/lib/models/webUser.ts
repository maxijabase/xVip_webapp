import type { Role } from "./role";

export interface WebUser {
  steamid: string;
  communityvisibilitystate: number;
  profilestate: number;
  personaname: string;
  commentpermission: number;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  avatarhash: string;
  lastlogoff: number;
  personastate: number;
  primaryclanid: string;
  timecreated: number;
  personastateflags: number;
  loccountrycode: string;
  role: Role;
}

