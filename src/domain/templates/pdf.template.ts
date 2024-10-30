/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Interfaces */
import { RevisitsTemplateOptions } from '@infrasturcture/interfaces';

/* Services */
import { DeviceImageService } from '../services';

export class PdfTemplates {
    /**
     * Generates a template for a PDF file that contains the list of revisits.
     * The template is based on a HTML structure and uses CSS styles to make it look good.
     * The template includes the name of the person, the information, the address, the next visit date and an image.
     * @param {{ fullName: string, revisits: RevisitEntity[] }} options - The options for the template.
     * @returns {Promise<string>} - The template as a string.
     */
    public static async generateRevisitsTemplate({ fullName, revisits }: RevisitsTemplateOptions): Promise<string> {
        const revisitsWithImageBase64Promise = revisits.map(async (revisit) => ({
            ...revisit,
            photo: revisit?.photo ? await DeviceImageService.getBase64FromUri(revisit.photo) : undefined
        }));

        const revisitsWithImageBase64 = await Promise.all(revisitsWithImageBase64Promise);

        let template = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Revisitas de ${ fullName }</title>

                <style>
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-family: Helvetica, Arial, sans-serif;
                    }

                    body {
                        padding: 1.5rem;
                    }

                    .title {
                        color: #292929;
                        font-size: 1.5rem;
                        font-weight: bold;
                        margin-bottom: 2.5rem;
                    }

                    .revisits-cotainer {
                        display: grid;
                        gap: 1.5rem;
                    }

                    .revisit-card {
                        background-color: #F1F1F1;
                        padding: 1rem;
                    }

                    .revisit-card__person-name {
                        color: #000000;
                        font-size: 1.125rem;
                        margin-bottom: 0.5rem;
                    }

                    .revisit-card__done-text {
                        color: #4F4F4F;
                        font-size: 0.875rem;
                        margin-bottom: 1rem;
                    }

                    .revisit-card__done-text span {
                        color: #496DA7;
                        font-weight: bold;
                    }

                    .revisit-card__section {
                        margin-bottom: 1rem;
                    }

                    .revisit-card__section-title {
                        color: #000000;
                        font-weight: bold;
                        font-size: 1rem;
                    }

                    .revisit-card__section-body {
                        color: #4F4F4F;
                        font-size: 1rem;
                    }

                    .revisit-card__section-img {
                        margin-top: 0.5rem;
                        width: 100%;
                    }

                    .revisit-card__date {
                        color: #000000;
                        display: flex;
                        font-size: 1rem;
                        font-weight: bold;
                        gap: 0.3rem;
                    }

                    .revisit-card__date span {
                        color: #496DA7;
                    }
                </style>
            </head>
            <body>
                <main>
                    <h1 class="title">Revisitas de ${ fullName }</h1>
                    <div class="revisits-cotainer">
        `;

        revisitsWithImageBase64.forEach(revisit => {
            template += `
                <div class="revisit-card">
                    <h2 class="revisit-card__person-name">${ revisit.personName }</h2>
                    <p class="revisit-card__done-text">Visita realizada: <span>${ revisit.done ? 'Si' : 'No' }</span></p>

                    <div class="revisit-card__section">
                        <p class="revisit-card__section-title">Información:</p>
                        <p class="revisit-card__section-body">${ revisit.about }</p>
                    </div>

                    <div class="revisit-card__section">
                        <p class="revisit-card__section-title">Dirección:</p>
                        <p class="revisit-card__section-body">${ revisit.about }</p>
                    </div>
            `;

            if (revisit?.photo) {
                template += `
                    <div class="revisit-card__section">
                        <p class="revisit-card__section-title">Imagen:</p>
                        <img
                            alt="Imagen que aporta más información de ${ revisit.personName }"
                            class="revisit-card__section-img"
                            src="https://placehold.co/600x400"
                        >
                    </div>
                `;
            }

            template += `

                    <div class="revisit-card__date">
                        <p>Fecha de próxima visita:</p>
                        <span>${ Time.format(revisit.nextVisit, 'DD/MM/YYYY') }</spanm>
                    </div>
                </div>
            `;
        });

        template += `
                    </div>
                </main>
            </body>
            </html>
        `;

        return template;
    }
}