import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Vehicle {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    firstName: string;

    @Column({ nullable: false })
    lastName: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    carMake: string;

    @Column({ nullable: false })
    carModel: string;

    @Column({ nullable: false })
    vin: string;

    @Column({ type: 'date', nullable: false })
    manufacturedDate: string;

    @Column({ nullable: false })
    ageOfVehicle: string;
}