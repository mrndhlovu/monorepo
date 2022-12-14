import mongoose, { Schema, Document, model, ObjectId } from 'mongoose';
import {
  AccountOptions,
  AccountStatus,
} from '@loxodonta/deal-apis/shared-utils';

const AccountSchema = new Schema<IAccountDocument>(
  {
    plan: {
      type: String,
      required: true,
      enum: Object.values(AccountOptions),
      default: AccountOptions.Free,
    },
    userId: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    expired: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      required: true,
      enum: Object.values(AccountStatus),
      default: AccountStatus.Created,
    },
    isTrial: {
      type: Boolean,
      required: true,
      default: false,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    customerId: {
      type: String,
    },
    email: {
      type: String,
    },
    powerUps: {
      type: [{ type: Schema.Types.ObjectId, ref: 'PowerUp' }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

AccountSchema.methods.toJSON = function () {
  const account = this.toObject({
    transform: function (_doc, ret, _options) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  });

  return account;
};

AccountSchema.pre('remove', async function (next) {
  next();
});

export interface IAccount {
  expired: boolean;
  expiresAt: Date;
  isTrial: boolean;
  plan: AccountOptions;
  status: AccountStatus;
  isVerified: boolean;
  customerId: string;
  email: string;
  powerUps: ObjectId[];
  userId: string;
}

export interface IAccountDocument extends Document, IAccount {
  createdAt: boolean | string | number;
  updatedAt: boolean | string | number;
}

const Account = model<IAccountDocument>('Account', AccountSchema);
export default Account;
