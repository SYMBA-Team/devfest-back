class MyError extends Error {
    status: number;
    cause?: Error;
    constructor(message: string, options: MyErrorOptions) {
        super(message);
        this.status = options.status;
        this.cause = options.cause;
        this.name = options.name;
    }
}
