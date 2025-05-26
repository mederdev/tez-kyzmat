import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema({ timestamps: true })
export class Service {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  ownerName: string;

  @Prop({ required: true })
  contact: string;

  @Prop({ required: true })
  whatsapp: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  locationName: string;

  @Prop()
  district?: string;

  @Prop()
  districtName?: string;

  @Prop({ required: true })
  price: string;

  @Prop({ default: true })
  available: boolean;

  @Prop({ type: [String], default: [] })
  images: string[];
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
