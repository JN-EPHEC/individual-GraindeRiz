import User from '../models/User.js';
import type { CreateUserInput, UpdateUserInput } from '../types/user.js';

//SERVICE GET
export async function findAllUsers() {
    return User.findAll();
}

//SERVICE GET:ID
export async function findUserById(id: number) {
    return User.findByPk(id);
}
//SERVICE POST 
export async function createUser(data: CreateUserInput) {
    return User.create(data);
}

//SERVICE PUT
export async function updateUser(id: number, data: UpdateUserInput) {
    const user = await User.findByPk(id);

    if (!user) {
        return null;
    }

    user.set({
        firstName: data.firstName,
        lastName: data.lastName,
    });

    await user.save();

    return user;
}

//SERVICE DELETE
export async function deleteUser(id: number) {
    const user = await User.findByPk(id);

    if (!user) {
        return false;
    }

    await user.destroy();
    return true;
}