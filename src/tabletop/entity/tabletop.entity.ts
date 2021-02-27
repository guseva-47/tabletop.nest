import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { gameSystem } from "./game-system.enum";
import Usr from "./user.entity";

@Entity()
export class Tabletop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({enum: gameSystem})
  gameSystem: gameSystem;

  @ManyToOne(type => Usr, owner => owner.tables)
  owner: Usr;

  @ManyToMany(type => Usr, {
    cascade: true
  })
  @JoinTable()
  players: Usr[];
}