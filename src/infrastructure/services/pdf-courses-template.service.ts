import { TimeAdapterContract, TranslationAdapterContract } from '@domain/contracts/adapters';
import { PdfCoursesTemplateServiceContract } from '@domain/contracts/services';

import { CourseWithLessonsEntity, LessonEntity } from '@domain/entities';

import { CoursesTemplateOptions } from '@infrastructure/interfaces';

export class PdfCoursesTemplateService implements PdfCoursesTemplateServiceContract {
    constructor (
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
        `;
    }

    private generateLessonCardString(lesson: LessonEntity): string {
        const lessonLabel = this.translationAdapter.translate('pdf.lables.lessons.lesson');

        const lessonStatusText = (lesson.done) 
            ? this.translationAdapter.translate('pdf.status.taught')
            : this.translationAdapter.translate('pdf.status.pending');

        return `
            <div class="lesson-card">
                <div class="lesson-card__status">
                    <p class="lesson-card__status-text">${ lessonLabel }: <span>${ lessonStatusText }</span></p></p>
                    <span>${ this.timeAdapter.format(lesson.nextLesson, this.timeAdapter.formats.LOCALE_SHORT_DATE) }</span>
                </div>

                <p class="lesson-card__content-text">${ lesson.description }</p>
            </div>
        `;
    }

    private generateCourseCardString(course: CourseWithLessonsEntity): string {
        const courseStatus = (course.finished)
            ? this.translationAdapter.translate('cards.courses.status.finished')
            : (course.suspended)
                ? this.translationAdapter.translate('cards.courses.status.suspended')
                : this.translationAdapter.translate('cards.courses.status.inCourse');

        const statusLabel = this.translationAdapter.translate('pdf.lables.courses.status');
        const informationLabel = this.translationAdapter.translate('pdf.lables.courses.information');
        const addressLabel = this.translationAdapter.translate('pdf.lables.courses.address');
        const publicationLabel = this.translationAdapter.translate('pdf.lables.courses.publication');
        const lessonsLabel = this.translationAdapter.translate('pdf.lables.courses.lessons');

        let template = `
            <div class="course-card">
                <h2 class="course-card__person-name">${ course.personName }</h2>
                <p class="course-card__done-text">${ statusLabel }: <span>${ courseStatus }</span></p>

                <div class="course-card__section">
                    <p class="course-card__section-title">${ informationLabel }:</p>
                    <p class="course-card__section-body">${ course.personAbout }</p>
                </div>

                <div class="course-card__section">
                    <p class="course-card__section-title">${ addressLabel }:</p>
                    <p class="course-card__section-body">${ course.personAddress }</p>
                </div>

                <div class="course-card__section">
                    <p class="course-card__section-title">${ publicationLabel }:</p>
                    <p class="course-card__publication-text">${ course.publication }</p>
                </div>

                <p class="course-card__section-title">${ lessonsLabel }:</p>

                <div class="lessons-container">
        `;

        course.lessons.forEach(lesson => {
            template += this.generateLessonCardString(lesson);
        });

            template += `
                </div>
            </div>
        `;

        return template;
    }

    public generate({ courses, fullName }: CoursesTemplateOptions): string {
        const pdfStyles = this.getPdfTemplateStyle();

        const title = this.translationAdapter.translate('pdf.titles.courses', { name: fullName });

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

        courses.forEach(course => {
            template += this.generateCourseCardString(course);
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