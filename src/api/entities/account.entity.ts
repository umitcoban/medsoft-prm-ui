import Role from "./role.entity";

export default interface Account {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    birthDate: Date;
    age: number;
    weight: number;
    height: number;
    roles: Role[];
    createdAt: Date;
    updatedAt: Date;
}