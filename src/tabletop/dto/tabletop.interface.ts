import { gameSystem } from "../entity/game-system.enum";
import { IUsr } from "./user.interface";

export interface ITabletop {
  id: number;
  title: string;
  description: string;
  gameSystem: gameSystem;
  owner: IUsr;
  players: IUsr[];
}