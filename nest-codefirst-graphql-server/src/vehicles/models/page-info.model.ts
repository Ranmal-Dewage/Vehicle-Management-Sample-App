import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PageInfo {

    @Field()
    hasNextPage: boolean;

    @Field()
    hasPreviousPage: boolean;

    @Field()
    endCursor: string;

    @Field()
    startCursor: string;

}