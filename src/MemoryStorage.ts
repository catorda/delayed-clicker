let settings = {};

export function storageLocalGet(keys: string[]): Promise<any> {
    return new Promise((resolve) => {
        resolve(settings);
    })
}

export function storageLocalSet(obj: any): Promise<any> {
    return new Promise<void>((resolve) => {
        settings = obj;
        resolve();
    })
}