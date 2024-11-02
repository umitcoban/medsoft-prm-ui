export default interface ApiResponse<T> {
    time: number;
    data: T;
    status: number
}