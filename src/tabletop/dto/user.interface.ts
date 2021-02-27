import { ITabletop } from "./tabletop.interface";

export interface IUsr {
  id: number;
  email: string;
  familyName: string;
  name: string;
  tables: ITabletop[];
}