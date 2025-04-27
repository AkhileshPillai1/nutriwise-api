import { IGenericResponse } from "../models/IGenericResponse.js";

export class GenericResponse<T> implements IGenericResponse<T> {
    isSuccess: boolean;
    message: string;
    data?: T; // Optional field for additional data
    error?: string; // Optional field for error messages

    constructor(isSuccess: boolean, message: string, data?: T, error?: string) {
        this.isSuccess = isSuccess;
        this.message = message;
        this.data = data;
        this.error = error;
    }
}