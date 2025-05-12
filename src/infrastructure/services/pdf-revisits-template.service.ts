import { TimeAdapterContract, TranslationAdapterContract } from '@domain/contracts/adapters';
import { DeviceImageServiceContract, PdfRevisitsTemplateServiceContract } from '@domain/contracts/services';

import { RevisitEntity } from '@domain/entities';

import { RevisitsTemplateOptions } from '@infrastructure/interfaces';

export class PdfRevisitsTemplateService implements PdfRevisitsTemplateServiceContract {
    constructor (
        private readonly deviceImageService: DeviceImageServiceContract,
        private readonly timeAdapter: TimeAdapterContract,
        private readonly translationAdapter: TranslationAdapterContract
    ) {}

    private getPdfTemplateStyle (): string {
        return `
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

                .revisits-container {
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
        `;
    }

    private generateRevisitCardString(revisit: RevisitEntity): string {
        const visitMadeLabel = this.translationAdapter.translate('pdf.lables.revisits.visitMade');
        const informationLabel = this.translationAdapter.translate('pdf.lables.revisits.information');
        const addressLabel = this.translationAdapter.translate('pdf.lables.revisits.address');
        const imageLabel = this.translationAdapter.translate('pdf.lables.revisits.image');
        const nextVisitLabel = this.translationAdapter.translate('pdf.lables.revisits.dateNextVisit');

        const altImage = this.translationAdapter.translate('pdf.alts.image', { name: revisit.personName });

        const yes = this.translationAdapter.translate('preaching.ministryParticipations.yes');
        const no = this.translationAdapter.translate('preaching.ministryParticipations.no');

        let card = `
            <div class="revisit-card">
                <h2 class="revisit-card__person-name">${ revisit.personName }</h2>
                <p class="revisit-card__done-text">${ visitMadeLabel }: <span>${ revisit.done ? yes : no }</span></p>

                <div class="revisit-card__section">
                    <p class="revisit-card__section-title">${ informationLabel }</p>
                    <p class="revisit-card__section-body">${ revisit.about }</p>
                </div>

                <div class="revisit-card__section">
                    <p class="revisit-card__section-title">${ addressLabel }</p>
                    <p class="revisit-card__section-body">${ revisit.about }</p>
                </div>
        `;

        if (revisit?.photo) {
            card += `
                <div class="revisit-card__section">
                    <p class="revisit-card__section-title">${ imageLabel }</p>
                    <img
                        alt="${ altImage }"
                        class="revisit-card__section-img"
                        src="${ revisit.photo }"
                    >
                </div>
            `;
        }

        card += `
                <div class="revisit-card__date">
                    <p>${ nextVisitLabel }</p>
                    <span>${ this.timeAdapter.format(revisit.nextVisit, this.timeAdapter.formats.DATE_ONLY) }</span>
                </div>
            </div>
        `;

        return card;
    }

    public async generate({ fullName, revisits }: RevisitsTemplateOptions): Promise<string> {
        const revisitsWithImageBase64Promise = revisits.map(async (revisit) => ({
            ...revisit,
            photo: revisit?.photo ? await this.deviceImageService.getBase64FromUri(revisit.photo) : undefined
        }));

        const revisitsWithImageBase64 = await Promise.all(revisitsWithImageBase64Promise);
        const pdfStyles = this.getPdfTemplateStyle();

        const title = this.translationAdapter.translate('pdf.titles.revisits', { name: fullName });

        let template = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${ title }</title>

                ${ pdfStyles }
            </head>
            <body>
                <main>
                    <h1 class="title">${ title }</h1>
                    <div class="revisits-container">
        `;

        revisitsWithImageBase64.forEach(revisit => {
            template += this.generateRevisitCardString(revisit);
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