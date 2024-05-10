export type Result<T> = 
    | { ok: true, value: T }
    | { ok: false, message: string }

export class Either<T> {
    item: Result<T>;

    constructor(item: Result<T>) {
        this.item = item;
    }

    map<B> (fn: (arg0: T) => Either<B>): Either<B | T> {
        return this.item.ok ? fn(this.item.value) : this;
    }

    mapOk (fn: (value: T) => void): Either<T> {
        if (this.item.ok)
            fn(this.item.value);
        return this;
    }

    mapErr<B> (fn: (message: string) => void): Either<T> {
        if (!this.item.ok)
            fn(this.item.message);
        return this
    }
}

export function left<T>(message: string): Either<T>{
    return new Either({ok: false, message});
}

export function right<T>(value: T){
    return new Either({ok: true, value});
}