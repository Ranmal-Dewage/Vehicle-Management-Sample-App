import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class VehiclePatch {

    @Field({ nullable: true })
    firstName: string;

    @Field({ nullable: true })
    lastName: string;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    carMake: string;

    @Field({ nullable: true })
    carModel: string;

    @Field({ nullable: true })
    vin: string;

    @Field({ nullable: true })
    manufacturedDate: string;

    @Field({ nullable: true })
    ageOfVehicle: string;

}