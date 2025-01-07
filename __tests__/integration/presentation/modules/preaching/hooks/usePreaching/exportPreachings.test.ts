import { act } from '@testing-library/react-native';

/* Setup */
import { getMockStoreUsePreaching, renderUsePreaching } from '@setups';

/* Mocks */
import {
    authenticateStateMock,
    FileSystemSpy,
    hasWifiConnectionMock,
    initialAuthStateMock,
    initialPreachingStateMock,
    initialStatusStateMock,
    PdfPreachingsTemplateSpy,
    PDFSpy,
    PreachingServiceSpy,
    preachingsMock,
    useNetworkSpy,
    wifiMock
} from '@mocks';

/* Constants */
import { authMessages, preachingMessages } from '@application/constants';

/* Services */
import { PreachingReportService } from '@domain/services';
import { FileSystemError, PDFError, RequestError } from '@domain/errors';

describe('Test in usePreaching hook - exportPreachings', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    let mockStore = {} as any;

    beforeEach(() => {
        jest.clearAllMocks();

        mockStore = getMockStoreUsePreaching({
            auth: authenticateStateMock,
            preaching: initialPreachingStateMock,
            status: initialStatusStateMock
        });
    });

    it('should export preachings in pdf file', async () => {
        const fileName = `Informes_de_Predicación_de_${ authenticateStateMock.user.name }_${ authenticateStateMock.user.surname }`;

        PreachingServiceSpy.getAllByUserId.mockResolvedValue(preachingsMock);
        PdfPreachingsTemplateSpy.generate.mockReturnValue('<h1>Pdf preachings template</h1>');
        PDFSpy.writeFromHTML.mockResolvedValue(`/storage/emulated/0/com.kristhdev.jw-reports/Exports/${ fileName }.pdf`);
        FileSystemSpy.moveFile.mockResolvedValue(undefined);

        const preachingsGrouped = PreachingReportService.groupByMonthAndYear(preachingsMock);
        const reports = preachingsGrouped.map(PreachingReportService.generatePreachingReportForExport);

        const { result } = renderUsePreaching(mockStore);

        await act(async () => {
            await result.current.usePreaching.exportPreachings();
        });

        expect(result.current.usePreaching.state.isPreachingsExporting).toBeFalsy();
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: preachingMessages.EXPORTED_SUCCESS
        });

        expect(PreachingServiceSpy.getAllByUserId).toHaveBeenCalledTimes(1);
        expect(PreachingServiceSpy.getAllByUserId).toHaveBeenCalledWith(authenticateStateMock.user.id);

        expect(PdfPreachingsTemplateSpy.generate).toHaveBeenCalledTimes(1);
        expect(PdfPreachingsTemplateSpy.generate).toHaveBeenCalledWith({
            reports,
            fullName: `${ authenticateStateMock.user.name } ${ authenticateStateMock.user.surname }`
        });

        expect(PDFSpy.writeFromHTML).toHaveBeenCalledTimes(1);
        expect(PDFSpy.writeFromHTML).toHaveBeenCalledWith({
            directory: 'Exports',
            fileName,
            html: '<h1>Pdf preachings template</h1>'
        });

        expect(FileSystemSpy.moveFile).toHaveBeenCalledTimes(1);
        expect(FileSystemSpy.moveFile).toHaveBeenCalledWith({
            from: `/storage/emulated/0/com.kristhdev.jw-reports/Exports/${ fileName }.pdf`,
            to: `/storage/emulated/0/Download/${ fileName }.pdf`
        });
    });

    it('should faild if user isnt authenticated', async () => {
        const mockStore = getMockStoreUsePreaching({
            auth: initialAuthStateMock,
            preaching: initialPreachingStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUsePreaching(mockStore);

        await act(async () => {
            await result.current.usePreaching.exportPreachings();
        });

        expect(result.current.usePreaching.state.isPreachingsExporting).toBeFalsy();

        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: authMessages.UNATHENTICATED
        });

        expect(PreachingServiceSpy.getAllByUserId).not.toHaveBeenCalled();
        expect(PdfPreachingsTemplateSpy.generate).not.toHaveBeenCalled();
        expect(PDFSpy.writeFromHTML).not.toHaveBeenCalled();
        expect(FileSystemSpy.moveFile).not.toHaveBeenCalled();
    });

    it('should faild if user dont have wifi connection', async () => {
        hasWifiConnectionMock.mockReturnValueOnce(false);

        const { result } = renderUsePreaching(mockStore);

        await act(async () => {
            await result.current.usePreaching.exportPreachings();
        });

        expect(result.current.usePreaching.state.isPreachingsExporting).toBeFalsy();

        expect(PreachingServiceSpy.getAllByUserId).not.toHaveBeenCalled();
        expect(PdfPreachingsTemplateSpy.generate).not.toHaveBeenCalled();
        expect(PDFSpy.writeFromHTML).not.toHaveBeenCalled();
        expect(FileSystemSpy.moveFile).not.toHaveBeenCalled();
    });

    it('should faild if get all preachings throws an error', async () => {
        hasWifiConnectionMock.mockReturnValueOnce(true);
        PreachingServiceSpy.getAllByUserId.mockRejectedValueOnce(new RequestError('Preachings not found', 404, 'preachings_not_found'));

        const { result } = renderUsePreaching(mockStore);

        await act(async () => {
            await result.current.usePreaching.exportPreachings();
        });

        expect(result.current.usePreaching.state.isPreachingsExporting).toBeFalsy();

        expect(result.current.useStatus.state).toEqual({
            code: expect.any(Number),
            msg: expect.any(String)
        });

        expect(PreachingServiceSpy.getAllByUserId).toHaveBeenCalledTimes(1);
        expect(PreachingServiceSpy.getAllByUserId).toHaveBeenCalledWith(authenticateStateMock.user.id);

        expect(PdfPreachingsTemplateSpy.generate).not.toHaveBeenCalled();
        expect(PDFSpy.writeFromHTML).not.toHaveBeenCalled();
        expect(FileSystemSpy.moveFile).not.toHaveBeenCalled();
    });

    it('should faild if write from html throws an error', async () => {
        const fileName = `Informes_de_Predicación_de_${ authenticateStateMock.user.name }_${ authenticateStateMock.user.surname }`;

        PdfPreachingsTemplateSpy.generate.mockReturnValue('<h1>Pdf prechings template</h1>');
        PDFSpy.writeFromHTML.mockRejectedValueOnce(new PDFError('Failed to write from html'));

        const preachingsGrouped = PreachingReportService.groupByMonthAndYear(preachingsMock);
        const reports = preachingsGrouped.map(PreachingReportService.generatePreachingReportForExport);

        const { result } = renderUsePreaching(mockStore);

        await act(async () => {
            await result.current.usePreaching.exportPreachings();
        });

        expect(result.current.usePreaching.state.isPreachingsExporting).toBeFalsy();

        expect(result.current.useStatus.state).toEqual({
            code: expect.any(Number),
            msg: expect.any(String)
        });

        expect(PreachingServiceSpy.getAllByUserId).toHaveBeenCalledTimes(1);
        expect(PreachingServiceSpy.getAllByUserId).toHaveBeenCalledWith(authenticateStateMock.user.id);

        expect(PdfPreachingsTemplateSpy.generate).toHaveBeenCalledTimes(1);
        expect(PdfPreachingsTemplateSpy.generate).toHaveBeenCalledWith({
            reports,
            fullName: `${ authenticateStateMock.user.name } ${ authenticateStateMock.user.surname }`
        });

        expect(PDFSpy.writeFromHTML).toHaveBeenCalledTimes(1);
        expect(PDFSpy.writeFromHTML).toHaveBeenCalledWith({
            directory: 'Exports',
            fileName,
            html: '<h1>Pdf prechings template</h1>'
        });

        expect(FileSystemSpy.moveFile).not.toHaveBeenCalled();
    });

    it('should faild if move file throws an error', async () => {
        const fileName = `Informes_de_Predicación_de_${ authenticateStateMock.user.name }_${ authenticateStateMock.user.surname }`;

        PreachingServiceSpy.getAllByUserId.mockResolvedValue(preachingsMock);
        PdfPreachingsTemplateSpy.generate.mockReturnValue('<h1>Pdf preachings template</h1>');
        PDFSpy.writeFromHTML.mockResolvedValue(`/storage/emulated/0/com.kristhdev.jw-reports/Exports/${ fileName }.pdf`);
        FileSystemSpy.moveFile.mockRejectedValue(new FileSystemError('Failed to move file'));

        const preachingsGrouped = PreachingReportService.groupByMonthAndYear(preachingsMock);
        const reports = preachingsGrouped.map(PreachingReportService.generatePreachingReportForExport);

        const { result } = renderUsePreaching(mockStore);

        await act(async () => {
            await result.current.usePreaching.exportPreachings();
        });

        expect(result.current.usePreaching.state.isPreachingsExporting).toBeFalsy();
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'Failed to move file'
        });

        expect(PreachingServiceSpy.getAllByUserId).toHaveBeenCalledTimes(1);
        expect(PreachingServiceSpy.getAllByUserId).toHaveBeenCalledWith(authenticateStateMock.user.id);

        expect(PdfPreachingsTemplateSpy.generate).toHaveBeenCalledTimes(1);
        expect(PdfPreachingsTemplateSpy.generate).toHaveBeenCalledWith({
            reports,
            fullName: `${ authenticateStateMock.user.name } ${ authenticateStateMock.user.surname }`
        });

        expect(PDFSpy.writeFromHTML).toHaveBeenCalledTimes(1);
        expect(PDFSpy.writeFromHTML).toHaveBeenCalledWith({
            directory: 'Exports',
            fileName,
            html: '<h1>Pdf preachings template</h1>'
        });

        expect(FileSystemSpy.moveFile).toHaveBeenCalledTimes(1);
        expect(FileSystemSpy.moveFile).toHaveBeenCalledWith({
            from: `/storage/emulated/0/com.kristhdev.jw-reports/Exports/${ fileName }.pdf`,
            to: `/storage/emulated/0/Download/${ fileName }.pdf`
        });
    });
});