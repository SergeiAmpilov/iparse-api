import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as MSchema, Types } from 'mongoose';
import { ParserTypes } from '../parser.types';

@Schema()
export class ParserModel extends Document {
  @Prop({
    type: MSchema.Types.String,
  })
  resource: string;

  @Prop({
    type: MSchema.Types.String,
    enum: ParserTypes,
  })
  type: ParserTypes;

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

export const SeoParserSchema = SchemaFactory.createForClass(ParserModel);
export type SeoParserDocument = HydratedDocument<ParserModel>;
