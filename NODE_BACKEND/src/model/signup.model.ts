import mongoose,{Schema,Document} from "mongoose";
import Joi from 'joi';
import bcrypt from 'bcrypt';
export interface IUSER extends Document{
    name:string,
    number:number,
    email:string,
    password:string,
    refreshToken:string | null
}


export const userJoiValidation = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      "string.empty": "Name is required",
      "string.min": "Name must be at least 3 characters",
      "string.max": "Name must not exceed 50 characters",
    }),

  number: Joi.number()
    .required()
    .custom((value, helpers) => {
      
      const str = value.toString();
      if (!/^[0-9]{10}$/.test(str)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .messages({
      "any.required": "Mobile number is required",
      "any.invalid": "Mobile number must be exactly 10 digits",
    }),

  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/)
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.pattern.base": "Enter a valid email address",
    }),

  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.pattern.base":
        "Password must be minimum 8 characters, include uppercase, lowercase and a number",
    }),
});
const UserSchema: Schema<IUSER> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name must not exceed 50 characters"],
      trim: true,
    },

    number: {
      type: Number,
      required: [true, "Mobile number is required"],
      unique: true,
      validate: {
        validator: (value: number) => {
          return /^[0-9]{10}$/.test(value.toString());
        },
        message: "Mobile number must be exactly 10 digits",
      },
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string) => {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(value);
        },
        message: "Enter a valid email address",
      },
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (value: string) => {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
        },
        message:
          "Password must contain at least 8 characters, including uppercase, lowercase and a number",
      },
    },
    refreshToken: { type: String, default: null },
  },
  { timestamps: true }
);
UserSchema.pre('save',async function (next) {
   if (!this.isModified("password")) return next();
   const salt =await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
   next();
})
export const UserModel = mongoose.model<IUSER>("User", UserSchema,"users");