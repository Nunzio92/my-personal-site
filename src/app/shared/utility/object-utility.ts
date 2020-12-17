import { Utility } from './utility';

export class ObjectUtility {

    public static clone<T>(source: T): T {
        return Object.assign(Array.isArray(source) ? [] : {}, source);
    }


    /**
     * Deep clone every level of the source object
     *
     * source input object to clone
     * {any} cloned object at every level
     */
    // public static deepClone(source: any): any {
    //     try {
    //     return JSON.parse(JSON.stringify(source));
    // } catch {
    //     console.error('deepClone failed return starting value =>', source);
    //     return source;
    // }
    // return this.deepCopy(source);
    // }

    /**
     * Deep clone function
     * source input object to copy/clone
     */
    public static deepClone<T = any>(source: T): T {
        if (source === null || source === undefined) {
            return source;
        }
        if (source instanceof Date) {
            return new Date(source.getTime()) as any;
        }
        if (Array.isArray(source)) {
            const cp = [] as any[];
            (source as any[]).forEach((v) => {
                cp.push(v);
            });
            return cp.map((n: any) => this.deepClone<any>(n)) as any;
        }
        if (Utility.isObject(source)) {
            const cp = {...(source as { [key: string]: any })} as { [key: string]: any };
            Object.keys(cp).forEach(k => {
                cp[k] = this.deepClone<any>(cp[k]);
            });
            return cp as T;
        }
        return source;
    }

    /**
     * Merge simple object without nested object
     * target
     * sources
     */
    public static merge = (target: any, ...sources: any[]) => Object.assign(target, ...sources);


    /**
     *
     * target
     * sources
     * {any}
     */
    public static mergeDeep(target: any, ...sources: any): any {
        if (!sources.length) {
            return target;
        }
        const source = sources.shift();

        if (Utility.isObject(target) && Utility.isObject(source)) {
            for (const key in source) {
                if (Utility.isObject(source[key])) {
                    if (source[key] instanceof Date) {
                        Object.assign(target, {[key]: new Date(+source[key])});
                    } else if (!target[key]) {
                        Object.assign(target, {[key]: {}});
                    }
                    this.mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(target, {[key]: source[key]});
                }
            }
        }

        return this.mergeDeep(target, ...sources);
    }

    public static resolve(path: string, obj: any): any {
        return path.split('.').reduce((prev, curr) => {
            return (prev ? prev[curr] : undefined);
        }, obj || self);
    }

    /**
     * Check if input is not undefined before using String(input)
     *  input
     * {string | undefined}
     */
    public static toStringAvoidUndefined(input: any): string | undefined {
        if (!!input) {
            return '' + input;
        } else {
            return undefined;
        }
    }

}
