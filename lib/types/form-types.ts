export type FormState = {
    errors?: Errors;
    success?: boolean;
    message?: string;
};

export type Errors = {
    [key: string]: string[];
};

export type ServerAction = (
    currentState: FormState,
    formData: FormData
) => Promise<FormState>;

export type CustomServerAction<T> = (
    currentState: T,
    formData: FormData
) => Promise<T>;
