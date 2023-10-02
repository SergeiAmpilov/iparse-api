import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument, Schema as MSchema } from 'mongoose';

@Schema({
  timestamps: true,
})
export class UserModel extends Document {
  @Prop({ type: MSchema.Types.String })
  name: string;

  @Prop({
    type: MSchema.Types.String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({ type: MSchema.Types.String })
  passwordHash: string;

  @Prop({
    type: MSchema.Types.Boolean,
    default: false,
  })
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);

export type UserDocument = HydratedDocument<UserModel>;
