import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as MSchema, Types } from 'mongoose';

@Schema()
export class SeoTaskModel extends Document {
  @Prop({
    type: MSchema.Types.ObjectId,
    ref: 'seoparser',
  })
  parser: Types.ObjectId;

  @Prop({
    type: MSchema.Types.String,
  })
  resource: string;

  @Prop({
    type: MSchema.Types.Date,
  })
  start: Date;

  @Prop({
    type: MSchema.Types.Date,
  })
  finish: Date;

  @Prop({
    type: MSchema.Types.Number,
  })
  count: number;

  @Prop({
    type: MSchema.Types.String,
  })
  file: string;
}


export const SeoTaskSchema = SchemaFactory.createForClass(SeoTaskModel);
export type SeoTaskDocument = HydratedDocument<SeoTaskModel>;