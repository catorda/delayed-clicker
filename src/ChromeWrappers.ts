export function storageLocalGet(keys: string[]): Promise<any> {
    return new Promise((resolve) => {
        chrome.storage.local.get(['delayedclicker'], function(result) {
            resolve(result);
        })
    })
}

export function storageLocalSet(obj: any): Promise<any> {
    return new Promise<void>((resolve) => {
        chrome.storage.local.set(obj, function() {
            resolve();
        });
    })
}