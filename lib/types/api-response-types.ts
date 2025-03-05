import { Errors } from "./form-types";

export type ApiResponse<T> = {
    success: boolean;
    message: string;
    data?: T;
    errors?: Errors;
};

export type PagedApiResponse<T> = {
    data: T[];
    success: boolean;
    message: string;
    errors: Errors;
    page: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
};
