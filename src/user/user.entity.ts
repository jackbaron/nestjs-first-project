import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BaseEntity } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column({
        length: 150,
        unique: true,
    })
    email: string

    @Column()
    password: string

    @Column()
    salt: string

    @Column({
        name: "full_name"
    })
    fullName: string

    async validatePassword(password: string) : Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt)

        return hash === password;
    }
}