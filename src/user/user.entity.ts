import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
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
}