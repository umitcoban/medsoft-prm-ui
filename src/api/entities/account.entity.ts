import Department from "./department.entity";
import Role from "./role.entity";

export default interface Account {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    password?: string;
    birthDate: Date;
    age: number;
    weight: number;
    height: number;
    roles: Role[];
    photo: string;
    departments: Department[];
    createdAt: Date;
    updatedAt: Date;
}

interface Pageable {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
    sort: Sort;
}


enum Direction {
    ASC,
    DESC
}

interface Sort {
    direction: Direction;
    property: string;
    ignoreCase: boolean;
    nullHandling: string;
    ascending: boolean;
    descending: boolean;
}

export interface PageableAccount {
    content: Account[]
    pageable: Pageable;
    sort: Sort;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}