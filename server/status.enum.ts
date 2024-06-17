export enum Status {
    Free = 'szabad',
    InUse = 'kikölcsönözve',
    Scrapped = 'selejtezett',
}

export namespace Status {
    export function values() {
        return Object.keys(Status).filter(
            type => isNaN(<any>type) && type !== 'values'
        );
    }
}
