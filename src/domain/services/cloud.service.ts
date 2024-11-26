import { decode } from 'base64-arraybuffer';

/* Config */
import { supabase } from '@config';

/* Errors */
import { CloudError } from '@domain/errors';

/* Interfaces */
import { DeleteImageOptions, UploadImageOptions } from '@infrasturcture/interfaces';

export class CloudService {
    /**
     * Deletes an image from the given bucket and folder, specified by the URI
     * @param {DeleteImageOptions} options
     * @param {string} options.bucket - The bucket where the image is located
     * @param {string} options.folder - The folder where the image is located
     * @param {string} options.uri - The URI of the image to be deleted
     * @returns {Promise<void>} - This function returns nothing.
     */
    public static async deleteImage({ bucket, folder, uri }: DeleteImageOptions): Promise<void> {
        const imageId = uri.split('/')[uri.split('/').length - 1];

        const result = await supabase.storage
            .from(bucket)
            .remove([ `${ folder }/${ imageId }` ]);

        if (result.error) {
            throw new CloudError(
                result.error.message,
                ('statusCode' in (result.error as any)) ? +(result.error as any).statusCode : 500
            );
        }
    }

    /**
     * Uploads an image to the given bucket and folder, specified by the options
     * @param {UploadImageOptions} options
     * @param {string} options.bucket - The bucket where the image will be uploaded
     * @param {string} options.folder - The folder where the image will be uploaded
     * @param {Image} options.image - The image to be uploaded
     * @returns {Promise<string>} - The URL of the uploaded image if successful
     */
    public static async uploadImage({ bucket, folder, image }: UploadImageOptions): Promise<string> {
        const file = image.path.split('/')[image.path.split('/').length - 1];
        const [ fileName, fileExt ] = file.split('.');
        const id = Math.floor(Math.random()).toString(16);

        const result = await supabase.storage
            .from(bucket)
            .upload(`${ folder }/${ id }-${ fileName }.${ fileExt }`, decode(image.data!), {
                contentType: image.mime
            });

        if (result.error) {
            throw new CloudError(
                result.error.message,
                ('statusCode' in (result.error as any)) ? +(result.error as any).statusCode : 500
            );
        }

        const { data } = supabase.storage
            .from(bucket)
            .getPublicUrl(result.data.path);

        return data.publicUrl;
    }
}