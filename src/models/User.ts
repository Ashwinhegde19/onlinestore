import { time } from "console";
import mongoose from "mongoose";



export interface IUser {
    email: string;
    password: string;
    role: 'admin' | 'user';
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    }
},
    { timestamps: true });

    userSchema.pre('save', async function (next) {
        if (this.isModified('password')) {
            this.password =  await bcrypt.hash(this.password, 10);
        }
        next();
    })

const User = models?.User || model<IUser>('User', userSchema);

export default User;