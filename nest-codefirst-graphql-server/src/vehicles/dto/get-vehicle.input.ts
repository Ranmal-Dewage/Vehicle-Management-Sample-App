import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class GetVehicleInput {

    @Field(type => Int, { nullable: true })
    first: number;

    @Field({ nullable: true })
    after: string;

    @Field({ nullable: true })
    before: string;

    @Field(type => Int, { nullable: true })
    last: number;

    @Field({ nullable: true })
    search: string;

}