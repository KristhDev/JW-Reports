/* Infrasturcture */
import { PreachingsTemplateOptions } from '@infrasturcture/interfaces';

export class PdfPreachingsTemplate {
    /**
     * Generates a template for a PDF file that contains the list of preachings.
     * The template is based on a HTML structure and uses CSS styles to make it look good.
     * The template includes the name of the person, the hours, the remaining minutes, the month and the year.
     *
     * @param {{ fullName: string, reports: PreachingReportModel[] }} options - The options for the template.
     * @returns {string} - The template as a string.
     */
    public static generate({ reports, fullName }: PreachingsTemplateOptions): string {

        let template = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Informes de Predicación de ${ fullName }</title>

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
            </head>
            <body>
                <main>
                    <h1 class="title">Informes de Predicación de ${ fullName }</h1>

                    <table class="preaching-table">
                        <thead class="preaching-table__header">
                            <tr class="preaching-table__row">
                                <th>N⁰</th>
                                <th>Horas Completas</th>
                                <th>Minutos Sobrantes</th>
                                <th>Mes</th>
                                <th>Año</th>
                            </tr>
                        </thead>
                        <tbody class="preaching-table__body">
        `;

        reports.forEach((report, index) => {
            template += `
                <tr class="preaching-table__row">
                    <td>${ index + 1 }</td>
                    <td>${ report.hours }</td>
                    <td>${ report.restMins }</td>
                    <td>${ report.month }</td>
                    <td>${ report.year }</td>
                </tr>
            `;
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