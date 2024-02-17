import mongoose from "mongoose";

export const DatabaseProvider = {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => 
    mongoose.connect('mongodb://mongodb:27017/nest')
}