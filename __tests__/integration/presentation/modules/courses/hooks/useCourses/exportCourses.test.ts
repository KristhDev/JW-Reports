import { act } from '@testing-library/react-native';

/* Setups */
import { getMockStoreUseCourses, renderUseCourses } from '@setups';

/* Mocks */
import {
    authenticateStateMock,
    CoursesServiceSpy,
    coursesWithLessonsMock,
    FileSystemSpy,
    hasWifiConnectionMock,
    initialAuthStateMock,
    initialCoursesStateMock,
    initialLessonsStateMock,
    initialStatusStateMock,
    PdfCoursesTemplateSpy,
    PDFSpy,
    useNetworkSpy,
    wifiMock
} from '@mocks';

/* Constants */
import { authMessages, coursesMessages } from '@application/constants';

/* Errors */
import { FileSystemError, PDFError, RequestError } from '@domain/errors';

describe('Test in useCourses hook - exportCourses', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    let mockStore = {} as any;

    beforeEach(() => {
        jest.clearAllMocks();

        mockStore = getMockStoreUseCourses({
            auth: authenticateStateMock,
            courses: initialCoursesStateMock,
            lessons: initialLessonsStateMock,
            status: initialStatusStateMock
        });
    });

    it('should export courses in pdf file', async () => {
        const fileName = `Cursos_de_${ authenticateStateMock.user.name }_${ authenticateStateMock.user.surname }`;

        CoursesServiceSpy.getAllByUserId.mockResolvedValue(coursesWithLessonsMock);
        PdfCoursesTemplateSpy.generate.mockReturnValue('<h1>Pdf courses template</h1>');
        PDFSpy.writeFromHTML.mockResolvedValue(`/storage/emulated/0/com.kristhdev.jw-reports/Exports/${ fileName }.pdf`);
        FileSystemSpy.moveFile.mockResolvedValue(undefined);

        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useCourses.exportCourses();
        });

        expect(result.current.useCourses.state.isCoursesExporting).toBeFalsy();
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: coursesMessages.EXPORTED_SUCCESS
        });

        expect(CoursesServiceSpy.getAllByUserId).toHaveBeenCalledTimes(1);
        expect(CoursesServiceSpy.getAllByUserId).toHaveBeenCalledWith(authenticateStateMock.user.id);

        expect(PdfCoursesTemplateSpy.generate).toHaveBeenCalledTimes(1);
        expect(PdfCoursesTemplateSpy.generate).toHaveBeenCalledWith({
            courses: coursesWithLessonsMock,
            fullName: `${ authenticateStateMock.user.name } ${ authenticateStateMock.user.surname }`
        });

        expect(PDFSpy.writeFromHTML).toHaveBeenCalledTimes(1);
        expect(PDFSpy.writeFromHTML).toHaveBeenCalledWith({
            directory: 'Exports',
            fileName,
            html: '<h1>Pdf courses template</h1>'
        });

        expect(FileSystemSpy.moveFile).toHaveBeenCalledTimes(1);
        expect(FileSystemSpy.moveFile).toHaveBeenCalledWith({
            from: `/storage/emulated/0/com.kristhdev.jw-reports/Exports/${ fileName }.pdf`,
            to: `/storage/emulated/0/Download/${ fileName }.pdf`
        });
    });

    it('should faild if user isnt authenticated', async () => {
        const mockStore = getMockStoreUseCourses({
            auth: initialAuthStateMock,
            courses: initialCoursesStateMock,
            lessons: initialLessonsStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useCourses.exportCourses();
        });

        expect(result.current.useCourses.state.isCoursesExporting).toBeFalsy();

        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: authMessages.UNATHENTICATED
        });

        expect(CoursesServiceSpy.getAllByUserId).not.toHaveBeenCalled();
        expect(PdfCoursesTemplateSpy.generate).not.toHaveBeenCalled();
        expect(PDFSpy.writeFromHTML).not.toHaveBeenCalled();
        expect(FileSystemSpy.moveFile).not.toHaveBeenCalled();
    });

    it('should faild if user dont have wifi connection', async () => {
        hasWifiConnectionMock.mockReturnValueOnce(false);

        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useCourses.exportCourses();
        });

        expect(result.current.useCourses.state.isCoursesExporting).toBeFalsy();

        expect(CoursesServiceSpy.getAllByUserId).not.toHaveBeenCalled();
        expect(PdfCoursesTemplateSpy.generate).not.toHaveBeenCalled();
        expect(PDFSpy.writeFromHTML).not.toHaveBeenCalled();
        expect(FileSystemSpy.moveFile).not.toHaveBeenCalled();
    });

    it('should faild if get all courses throws an error', async () => {
        hasWifiConnectionMock.mockReturnValueOnce(true);
        CoursesServiceSpy.getAllByUserId.mockRejectedValueOnce(new RequestError('Courses not found', 404, 'courses_not_found'));

        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useCourses.exportCourses();
        });

        expect(result.current.useCourses.state.isCoursesExporting).toBeFalsy();

        expect(result.current.useStatus.state).toEqual({
            code: expect.any(Number),
            msg: expect.any(String)
        });

        expect(CoursesServiceSpy.getAllByUserId).toHaveBeenCalledTimes(1);
        expect(CoursesServiceSpy.getAllByUserId).toHaveBeenCalledWith(authenticateStateMock.user.id);

        expect(PdfCoursesTemplateSpy.generate).not.toHaveBeenCalled();
        expect(PDFSpy.writeFromHTML).not.toHaveBeenCalled();
        expect(FileSystemSpy.moveFile).not.toHaveBeenCalled();
    });

    it('should faild if write from html throws an error', async () => {
        const fileName = `Cursos_de_${ authenticateStateMock.user.name }_${ authenticateStateMock.user.surname }`;

        PdfCoursesTemplateSpy.generate.mockReturnValue('<h1>Pdf courses template</h1>');
        PDFSpy.writeFromHTML.mockRejectedValueOnce(new PDFError('Failed to write from html'));

        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useCourses.exportCourses();
        });

        expect(result.current.useCourses.state.isCoursesExporting).toBeFalsy();

        expect(result.current.useStatus.state).toEqual({
            code: expect.any(Number),
            msg: expect.any(String)
        });

        expect(CoursesServiceSpy.getAllByUserId).toHaveBeenCalledTimes(1);
        expect(CoursesServiceSpy.getAllByUserId).toHaveBeenCalledWith(authenticateStateMock.user.id);

        expect(PdfCoursesTemplateSpy.generate).toHaveBeenCalledTimes(1);
        expect(PdfCoursesTemplateSpy.generate).toHaveBeenCalledWith({
            courses: coursesWithLessonsMock,
            fullName: `${ authenticateStateMock.user.name } ${ authenticateStateMock.user.surname }`
        });

        expect(PDFSpy.writeFromHTML).toHaveBeenCalledTimes(1);
        expect(PDFSpy.writeFromHTML).toHaveBeenCalledWith({
            directory: 'Exports',
            fileName,
            html: '<h1>Pdf courses template</h1>'
        });

        expect(FileSystemSpy.moveFile).not.toHaveBeenCalled();
    });

    it('should faild if move file throws an error', async () => {
        const fileName = `Cursos_de_${ authenticateStateMock.user.name }_${ authenticateStateMock.user.surname }`;

        CoursesServiceSpy.getAllByUserId.mockResolvedValue(coursesWithLessonsMock);
        PdfCoursesTemplateSpy.generate.mockReturnValue('<h1>Pdf courses template</h1>');
        PDFSpy.writeFromHTML.mockResolvedValue(`/storage/emulated/0/com.kristhdev.jw-reports/Exports/${ fileName }.pdf`);
        FileSystemSpy.moveFile.mockRejectedValue(new FileSystemError('Failed to move file'));

        const { result } = renderUseCourses(mockStore);

        await act(async () => {
            await result.current.useCourses.exportCourses();
        });

        expect(result.current.useCourses.state.isCoursesExporting).toBeFalsy();
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'Failed to move file'
        });

        expect(CoursesServiceSpy.getAllByUserId).toHaveBeenCalledTimes(1);
        expect(CoursesServiceSpy.getAllByUserId).toHaveBeenCalledWith(authenticateStateMock.user.id);

        expect(PdfCoursesTemplateSpy.generate).toHaveBeenCalledTimes(1);
        expect(PdfCoursesTemplateSpy.generate).toHaveBeenCalledWith({
            courses: coursesWithLessonsMock,
            fullName: `${ authenticateStateMock.user.name } ${ authenticateStateMock.user.surname }`
        });

        expect(PDFSpy.writeFromHTML).toHaveBeenCalledTimes(1);
        expect(PDFSpy.writeFromHTML).toHaveBeenCalledWith({
            directory: 'Exports',
            fileName,
            html: '<h1>Pdf courses template</h1>'
        });

        expect(FileSystemSpy.moveFile).toHaveBeenCalledTimes(1);
        expect(FileSystemSpy.moveFile).toHaveBeenCalledWith({
            from: `/storage/emulated/0/com.kristhdev.jw-reports/Exports/${ fileName }.pdf`,
            to: `/storage/emulated/0/Download/${ fileName }.pdf`
        });
    });
});