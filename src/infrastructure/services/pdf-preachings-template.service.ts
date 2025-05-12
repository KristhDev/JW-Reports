import { TranslationAdapterContract } from '@domain/contracts/adapters';
import { PdfPreachingsTemplateServiceContract } from '@domain/contracts/services';

import { PreachingReportModel } from '@domain/models';

import { PreachingsTemplateOptions } from '@infrastructure/interfaces';

export class PdfPreachingsTemplateService implements PdfPreachingsTemplateServiceContract {
    constructor (
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

                .preaching-table {
                    border-collapse: collapse;
                    width: 100%;
                }

                .preaching-table__header {
                    background-color: #3C3547;
                }

                .preaching-table__body {
                    background-color: #746C84;
                }

                .preaching-table__row th {
                    border: 1px solid #FFFFFF;
                    color: #FFFFFF;
                    font-weight: normal;
                    padding-bottom: 1rem;
                    padding-top: 1rem;
                }

                .preaching-table__row td {
                    border: 1px solid #FFFFFF;
                    color: #F1F1F1;
                    padding-top: 1rem;
                    padding-bottom: 1rem;
                    text-align: center;
                }
            </style>
        `;
    }

    private generateTableHeader(): string {
        const hoursCompleted = this.translationAdapter.translate('pdf.headers.hoursCompleted');
        const minutesRemaining = this.translationAdapter.translate('pdf.headers.minutesRemaining');
        const month = this.translationAdapter.translate('pdf.headers.month');
        const year = this.translationAdapter.translate('pdf.headers.year');

        return `
            <thead class="preaching-table__header">
                <tr class="preaching-table__row">
                    <th>N⁰</th>
                    <th>${ hoursCompleted }</th>
                    <th>${ minutesRemaining }</th>
                    <th>${ month }</th>
                    <th>${ year }</th>
                </tr>
            </thead>
        `;
    }

    private generateTableRow(nth: number, report: PreachingReportModel, ): string {
        return `
            <tr class="preaching-table__row">
                <td>${ nth }</td>
                <td>${ report.hours }</td>
                <td>${ report.restMins }</td>
                <td>${ report.month }</td>
                <td>${ report.year }</td>
            </tr>
        `;
    }

    public generate({ reports, fullName }: PreachingsTemplateOptions): string {
        const title = this.translationAdapter.translate('pdf.titles.preachings', { name: fullName });

        const pdfTemplateStyle = this.getPdfTemplateStyle();
        const tableHeader = this.generateTableHeader();

        let template = `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${ title }</title>

                    ${ pdfTemplateStyle }
                </head>
                <body>
                    <main>
                        <h1 class="title">${ title }</h1>

                        <table class="preaching-table">
                            ${ tableHeader }
                            <tbody class="preaching-table__body">
        `;

        reports.forEach((report, index) => {
            template += this.generateTableRow(index + 1, report);
        });

        template += `
                        </tbody>
                    </table>
                </main>
            </body>
            </html>
        `;

        return template;
    }
}