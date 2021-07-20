import { Field, Int, ObjectType } from "@nestjs/graphql";
import { PageInfo } from "./page-info.model";
import { Vehicle } from "./vehicle.model";

@ObjectType()
export class VehicleConnection {

    @Field(type => [Vehicle])
    nodes: Vehicle[];

    @Field(type => PageInfo)
    pageInfo: PageInfo;

    @Field(type => Int)
    totalCount: number;

}