import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument, Schema as MSchema } from "mongoose";

@Schema()
export class ServiceModel extends Document {

  @Prop({
    type: MSchema.Types.String
  })
  slug: string;

  @Prop({
    type: MSchema.Types.String
  })
  name: string;

  @Prop({
    type: MSchema.Types.String
  })
  description: string;
}


export const ServiceSchema = SchemaFactory.createForClass(ServiceModel);
export type ServiceDocument = HydratedDocument<ServiceModel>;