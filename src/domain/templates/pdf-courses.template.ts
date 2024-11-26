/* Adapters */
import { Time } from '@infrasturcture/adapters';

/* Interfaces */
import { CoursesTemplateOptions } from '@infrasturcture/interfaces';

export class PdfCoursesTemplate {

    /**
     * Generates a template for a PDF file that contains the list of courses.
     * The template is based on a HTML structure and uses CSS styles to make it look good.
     * The template includes the name of the person, the information, the address, the next visit date and an image.
     * @param {{ fullName: string, courses: CourseEntity[] }} options - The options for the template.
     * @returns {string} - The template as a string.
     */
    public static generate({ courses, fullName }: CoursesTemplateOptions): string {
        let template = `
            <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Cursos de ${ fullName }</title>

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

                        .courses-container {
                            display: grid;
                            gap: 1.5rem;
                        }

                        .course-card {
                            background-color: #F1F1F1;
                            padding: 1rem;
                        }

                        .course-card__person-name {
                            color: #000000;
                            font-size: 1.125rem;
                            margin-bottom: 0.5rem;
                        }

                        .course-card__done-text {
                            color: #4F4F4F;
                            font-size: 0.875rem;
                            margin-bottom: 1rem;
                        }

                        .course-card__done-text span, .course-card__publication-text {
                            color: #496DA7;
                            font-weight: bold;
                        }

                        .course-card__publication-text {
                            font-size: 1rem;
                        }

                        .course-card__section {
                            margin-bottom: 1rem;
                        }

                        .course-card__section-title {
                            color: #000000;
                            font-weight: bold;
                            font-size: 1rem;
                        }

                        .course-card__section-body {
                            color: #4F4F4F;
                            font-size: 1rem;
                        }

                        .course-card__section-img {
                            margin-top: 0.5rem;
                            width: 100%;
                        }

                        .lessons-container {
                            display: grid;
                            gap: 1rem;
                            margin-top: 1rem;
                        }

                        .course-card__date {
                            color: #000000;
                            display: flex;
                            font-size: 1rem;
                            font-weight: bold;
                            gap: 0.3rem;
                        }

                        .course-card__date span {
                            color: #496DA7;
                        }

                        .lesson-card {
                            background-color: #FFFFFF;
                            padding: 1rem;
                        }

                        .lesson-card__status {
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 0.5rem;
                        }

                        .lesson-card__status-text {
                            color: #4F4F4F;
                            font-size: 0.875rem;
                        }

                        .lesson-card__status-text span {
                            color: #496DA7;
                            font-weight: bold;
                        }

                        .lesson-card__content-text {
                            color: #4F4F4F;
                            font-size: 1rem;
                        }
                    </style>
                </head>
                <body>
                    <main>
                        <h1 class="title">Cursos de ${ fullName }</h1>

                        <div class="courses-container">`;

        courses.forEach(course => {
            const courseStatus = (course.finished)
                ? 'Terminado'
                : (course.suspended)
                    ? 'Suspendido'
                    : 'En Curso';


            template += `
                <div class="course-card">
                    <h2 class="course-card__person-name">${ course.personName }</h2>
                    <p class="course-card__done-text">Estado: <span>${ courseStatus }</span></p>

                    <div class="course-card__section">
                        <p class="course-card__section-title">Información:</p>
                        <p class="course-card__section-body">${ course.personAbout }</p>
                    </div>

                    <div class="course-card__section">
                        <p class="course-card__section-title">Dirección:</p>
                        <p class="course-card__section-body">${ course.personAddress }</p>
                    </div>

                    <div class="course-card__section">
                        <p class="course-card__section-title">Publicación:</p>
                        <p class="course-card__publication-text">${ course.publication }</p>
                    </div>

                    <p class="course-card__section-title">Lecciones:</p>

                    <div class="lessons-container">
            `;

            course.lessons.forEach(lesson => {
                template += `
                    <div class="lesson-card">
                        <div class="lesson-card__status">
                            <p class="lesson-card__status-text">Clase: <span>${ lesson.done ? 'Impartida' : 'Pendiente' }</span></p></p>
                            <span>${ Time.format(lesson.nextLesson, 'DD/MM/YYYY') }</span>
                        </div>

                        <p class="lesson-card__content-text">${ lesson.description }</p>
                    </div>
                `;
            });

            template += `
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