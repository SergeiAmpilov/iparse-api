import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as MSchema, Types } from 'mongoose';

@Schema()
export class SeoParserModel extends Document {
  @Prop({
    type: MSchema.Types.String,
  })
  resource: string;

  @Prop({
    type: MSchema.Types.ObjectId,
    ref: 'user',
  })
  owner: Types.ObjectId;

  @Prop({
    type: MSchema.Types.Boolean,
    default: true,
  })
  isActive: boolean;
}

export const SeoParserSchema = SchemaFactory.createForClass(SeoParserModel);
export type SeoParserDocument = HydratedDocument<SeoParserModel>;
