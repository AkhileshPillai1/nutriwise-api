export interface IGenericResponse<T> {
    isSuccess: boolean;
    message: string | "";
    data?: T; // Optional field for additional data
    error?: string; // Optional field for error messages
}