import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Vehicle {

    @Field(type => Int)
    id: number;

    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    email: string;

    @Field()
    carMake: string;

    @Field()
    carModel: string;

    @Field()
    vin: string;

    @Field()
    manufacturedDate: string;

    @Field()
    ageOfVehicle: string;

}