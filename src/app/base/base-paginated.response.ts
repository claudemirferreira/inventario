export class BasePaginatedResponse<T> {
    public count: string;
    public next: number;
    public previous: number;
    public results: Array<T>;
}