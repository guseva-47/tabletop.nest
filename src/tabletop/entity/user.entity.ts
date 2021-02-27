import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tabletop } from "./tabletop.entity";

@Entity()
class Usr {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public email: string;

  @Column()
  public familyName: string;

  @Column()
  public name: string;

  @OneToMany(type => Tabletop, table => table.owner)
  tables: Tabletop[];
}
export default Usr;