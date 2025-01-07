import { act } from '@testing-library/react-native';

/* Setups */
import { getMockStoreUseExportData, renderUseExportData } from '@setups';

/* Mocks */
import {
    exportCoursesMock,
    exportPreachingsMock,
    exportRevisitsMock,
    initialCoursesStateMock,
    initialPreachingStateMock,
    initialRevisitsStateMock,
    initialStatusStateMock,
    initialUIStateMock,
    useCoursesSpy,
    usePreachingSpy,
    useRevisitsSpy
} from '@mocks';

/* Constants */
import { appMessages } from '@application/constants';

useCoursesSpy.mockImplementation(() => ({
    state: initialCoursesStateMock,
    exportCourses: exportCoursesMock
}) as any);

usePreachingSpy.mockImplementation(() => ({
    state: initialPreachingStateMock,
    exportPreachings: exportPreachingsMock
}) as any);

useRevisitsSpy.mockImplementation(() => ({
    state: initialRevisitsStateMock,
    exportRevisits: exportRevisitsMock
}) as any);

describe('Test in useExportData hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('should return respective properties and functions', () => {
        const mockStore = getMockStoreUseExportData({ status: initialStatusStateMock, ui: initialUIStateMock });
        const { result } = renderUseExportData(mockStore);

        expect(result.current.useExportData).toEqual({
            isCoursesExporting: false,
            isDataExporting: false,
            isPreachingsExporting: false,
            isRevisitsExporting: false,

            exportAllData: expect.any(Function),
            exportCourses: expect.any(Function),
            exportPreachings: expect.any(Function),
            exportRevisits: expect.any(Function)
        });
    });

    it('should export data of user to PDF files', async () => {
        const mockStore = getMockStoreUseExportData({ status: initialStatusStateMock, ui: initialUIStateMock });
        const { result } = renderUseExportData(mockStore);

        await act(async () => {
            await result.current.useExportData.exportAllData();
        });

        expect(exportPreachingsMock).toHaveBeenCalledTimes(1);
        expect(exportPreachingsMock).toHaveBeenCalledWith(false);
        expect(exportRevisitsMock).toHaveBeenCalledTimes(1);
        expect(exportRevisitsMock).toHaveBeenCalledWith(false);
        expect(exportCoursesMock).toHaveBeenCalledTimes(1);
        expect(exportCoursesMock).toHaveBeenCalledWith(false);

        expect(result.current.useExportData.isDataExporting).toBeFalsy();
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: appMessages.DATA_EXPORTED_SUCCESS
        });
    });

    it('should faild export data if throws an error', async () => {
        exportRevisitsMock.mockRejectedValueOnce(new Error('Export revisits error'));

        const mockStore = getMockStoreUseExportData({ status: initialStatusStateMock, ui: initialUIStateMock });
        const { result } = renderUseExportData(mockStore);

        await act(async () => {
            await result.current.useExportData.exportAllData();
        });

        expect(exportPreachingsMock).toHaveBeenCalledTimes(1);
        expect(exportPreachingsMock).toHaveBeenCalledWith(false);
        expect(exportRevisitsMock).toHaveBeenCalledTimes(1);
        expect(exportRevisitsMock).toHaveBeenCalledWith(false);
        expect(exportCoursesMock).not.toHaveBeenCalled();

        expect(result.current.useExportData.isDataExporting).toBeFalsy();
        expect(result.current.useStatus.state).toEqual(initialStatusStateMock);
    });
});