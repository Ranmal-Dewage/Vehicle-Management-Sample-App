import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PageInfo {

    @Field()
    hasNextPage: boolean;

    @Field()
    hasPreviousPage: boolean;

    @Field({ nullable: true })
    endCursor: string;

    @Field({ nullable: true })
    startCursor: string;

}