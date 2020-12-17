import { Observable } from 'rxjs';

export class FileUtility {

    /**
     * Download file with defined filename with payload equal to base64 file
     * @param filename name of the file to download
     * @param data blob data to download
     */
    public static downloadFileFromBlob(filename: string, data: Blob): void {

        if (/*@cc_on!@*/false || !!(document as any).documentMode) {
            // if IE:=> use msSaveBlob
            navigator.msSaveBlob(data, filename);
        } else {
            const element = document.createElement('a');
            element.setAttribute('download', filename);
            element.setAttribute('href', URL.createObjectURL(data));
            element.setAttribute('target', '_blank');
            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        }

    }

    /**
     * Utility method that allow to transform base64 string to blob giving the correct content type
     * @param b64Data base64 data string
     * @param contentType content type of the resulted file (DEFAULT='application/pdf')
     * @param sliceSize slice size of the resulted Uint8Array (DEFAULT=512)
     * @returns resulted blob if all succeed
     */
    public static b64ToBlob(b64Data: string, contentType = 'application/pdf', sliceSize = 512): Blob {
        if (b64Data.indexOf(',') >= 0) {
            b64Data = b64Data.split(',')[1];
        }
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        return this.byteArrayToBlob(byteArrays, contentType);
    }

    /**
     * Convert Uint8Array binary buffer to Blob in order to save it
     * @param byteArray byte array
     * @param contentType desired content type to set into Blob (default=application/pdf)
     * @returns Blob ready to save
     */
    public static byteArrayToBlob(byteArray: Uint8Array[], contentType = 'application/pdf'): Blob {
        return new Blob(byteArray, {type: contentType});
    }

    /**
     * Covert base64 to binary Uint8Array in order to read byte stream
     * @param b64Data input base64 data
     * @returns Binary stream array
     */
    public static base64ToUint8(b64Data: string): Uint8Array {
        if (b64Data.indexOf(',') >= 0) {
            b64Data = b64Data.split(',')[1];
        }
        const byteCharacters = atob(b64Data);
        const byteArrays = new Uint8Array(new ArrayBuffer(byteCharacters.length));
        for (let i = 0; i < byteCharacters.length; i++) {
            byteArrays[i] = byteCharacters.charCodeAt(i);
        }
        return byteArrays;
    }

    /**
     * Convert Blob to File in order to send it to infocert upload document
     * @param theBlob the file Blob
     * @param fileName name of the file (DEFAULT='mergeDoc.pdf')
     * @returns resulted file contained the input blob
     */
    public static blobToFile(theBlob: Blob, fileName = 'mergeDoc.pdf'): File {
        const b: any = theBlob;
        // A Blob() is almost a File() - it's just missing the two properties below which we will add
        b.lastModifiedDate = new Date();
        b.name = fileName;

        // Cast to a File() type
        return theBlob as File;
    }

    /**
     * Read a file and return the resulted data in base64 via Observable
     * @param file to read and trasform in base64
     * @param base64 if true read file as base64, otherwise read as ArrayBuffer (DEFAULT=true)
     * @returns resulted read file as base64
     */
    public static readFileAs(file: Blob | File, base64 = true): Observable<string | Uint8Array> {
        const fileReader = new FileReader();
        // init read
        if (base64) {
            fileReader.readAsDataURL(file);
        } else {
            fileReader.readAsArrayBuffer(file);
        }


        return new Observable(observer => {
            // if success
            fileReader.onload = ev => {
                observer.next(base64 ? (ev.target as any).result : new Uint8Array((ev.target as any).result));
                observer.complete();
            };

            // if failed
            fileReader.onerror = error => {
                observer.next(null);
                observer.complete();
            };
        });
    }
}
