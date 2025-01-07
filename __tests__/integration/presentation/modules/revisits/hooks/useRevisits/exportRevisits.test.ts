import { act } from '@testing-library/react-native';

/* Setups */
import { getMockStoreUseRevisits, renderUseRevisits } from '@setups';

/* Mocks */
import {
    authenticateStateMock,
    FileSystemSpy,
    hasWifiConnectionMock,
    initialAuthStateMock,
    initialRevisitsStateMock,
    initialStatusStateMock,
    PdfRevisitsTemplateSpy,
    PDFSpy,
    revisitsMock,
    RevisitsServiceSpy,
    useNetworkSpy,
    wifiMock
} from '@mocks';

/* Constants */
import { authMessages, revisitsMessages } from '@application/constants';

/* Errors */
import { FileSystemError, PDFError, RequestError } from '@domain/errors';

describe('Test in useRevisits hook - exportRevisits', () => {
    useNetworkSpy.mockImplementation(() => ({
        hasWifiConnection: hasWifiConnectionMock,
        wifi: wifiMock
    }));

    let mockStore = {} as any;

    beforeEach(() => {
        jest.clearAllMocks();

        mockStore = getMockStoreUseRevisits({
            auth: authenticateStateMock,
            revisits: initialRevisitsStateMock,
            status: initialStatusStateMock
        });
    });

    it('should export revisits in pdf file', async () => {
        const fileName = `Revisitas_de_${ authenticateStateMock.user.name }_${ authenticateStateMock.user.surname }`;

        RevisitsServiceSpy.getAllByUserId.mockResolvedValue(revisitsMock);
        PdfRevisitsTemplateSpy.generate.mockResolvedValueOnce('<h1>Pdf revisits template</h1>');
        PDFSpy.writeFromHTML.mockResolvedValue(`/storage/emulated/0/com.kristhdev.jw-reports/Exports/${ fileName }.pdf`);
        FileSystemSpy.moveFile.mockResolvedValue(undefined);

        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useRevisits.exportRevisits();
        });

        expect(result.current.useRevisits.state.isRevisitsExporting).toBeFalsy();
        expect(result.current.useStatus.state).toEqual({
            code: 200,
            msg: revisitsMessages.EXPORTED_SUCCESS
        });

        expect(RevisitsServiceSpy.getAllByUserId).toHaveBeenCalledTimes(1);
        expect(RevisitsServiceSpy.getAllByUserId).toHaveBeenCalledWith(authenticateStateMock.user.id);

        expect(PdfRevisitsTemplateSpy.generate).toHaveBeenCalledTimes(1);
        expect(PdfRevisitsTemplateSpy.generate).toHaveBeenCalledWith({
            revisits: revisitsMock,
            fullName: `${ authenticateStateMock.user.name } ${ authenticateStateMock.user.surname }`
        });

        expect(PDFSpy.writeFromHTML).toHaveBeenCalledTimes(1);
        expect(PDFSpy.writeFromHTML).toHaveBeenCalledWith({
            directory: 'Exports',
            fileName,
            html: '<h1>Pdf revisits template</h1>'
        });

        expect(FileSystemSpy.moveFile).toHaveBeenCalledTimes(1);
        expect(FileSystemSpy.moveFile).toHaveBeenCalledWith({
            from: `/storage/emulated/0/com.kristhdev.jw-reports/Exports/${ fileName }.pdf`,
            to: `/storage/emulated/0/Download/${ fileName }.pdf`
        });
    });

    it('should faild if user isnt authenticated', async () => {
        const mockStore = getMockStoreUseRevisits({
            auth: initialAuthStateMock,
            revisits: initialRevisitsStateMock,
            status: initialStatusStateMock
        });

        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useRevisits.exportRevisits();
        });

        expect(result.current.useRevisits.state.isRevisitsExporting).toBeFalsy();

        expect(result.current.useStatus.state).toEqual({
            code: 401,
            msg: authMessages.UNATHENTICATED
        });

        expect(RevisitsServiceSpy.getAllByUserId).not.toHaveBeenCalled();
        expect(PdfRevisitsTemplateSpy.generate).not.toHaveBeenCalled();
        expect(PDFSpy.writeFromHTML).not.toHaveBeenCalled();
        expect(FileSystemSpy.moveFile).not.toHaveBeenCalled();
    });

    it('should faild if user dont have wifi connection', async () => {
        hasWifiConnectionMock.mockReturnValueOnce(false);

        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useRevisits.exportRevisits();
        });

        expect(result.current.useRevisits.state.isRevisitsExporting).toBeFalsy();

        expect(RevisitsServiceSpy.getAllByUserId).not.toHaveBeenCalled();
        expect(PdfRevisitsTemplateSpy.generate).not.toHaveBeenCalled();
        expect(PDFSpy.writeFromHTML).not.toHaveBeenCalled();
        expect(FileSystemSpy.moveFile).not.toHaveBeenCalled();
    });

    it('should faild if get all courses throws an error', async () => {
        hasWifiConnectionMock.mockReturnValueOnce(true);
        RevisitsServiceSpy.getAllByUserId.mockRejectedValueOnce(new RequestError('Revisits not found', 404, 'revisits_not_found'));

        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useRevisits.exportRevisits();
        });

        expect(result.current.useRevisits.state.isRevisitsExporting).toBeFalsy();

        expect(result.current.useStatus.state).toEqual({
            code: expect.any(Number),
            msg: expect.any(String)
        });

        expect(RevisitsServiceSpy.getAllByUserId).toHaveBeenCalledTimes(1);
        expect(RevisitsServiceSpy.getAllByUserId).toHaveBeenCalledWith(authenticateStateMock.user.id);

        expect(PdfRevisitsTemplateSpy.generate).not.toHaveBeenCalled();
        expect(PDFSpy.writeFromHTML).not.toHaveBeenCalled();
        expect(FileSystemSpy.moveFile).not.toHaveBeenCalled();
    });

    it('should faild if write from html throws an error', async () => {
        const fileName = `Revisitas_de_${ authenticateStateMock.user.name }_${ authenticateStateMock.user.surname }`;

        PdfRevisitsTemplateSpy.generate.mockResolvedValueOnce('<h1>Pdf revisits template</h1>');
        PDFSpy.writeFromHTML.mockRejectedValueOnce(new PDFError('Failed to write from html'));

        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useRevisits.exportRevisits();
        });

        expect(result.current.useRevisits.state.isRevisitsExporting).toBeFalsy();

        expect(result.current.useStatus.state).toEqual({
            code: expect.any(Number),
            msg: expect.any(String)
        });

        expect(RevisitsServiceSpy.getAllByUserId).toHaveBeenCalledTimes(1);
        expect(RevisitsServiceSpy.getAllByUserId).toHaveBeenCalledWith(authenticateStateMock.user.id);

        expect(PdfRevisitsTemplateSpy.generate).toHaveBeenCalledTimes(1);
        expect(PdfRevisitsTemplateSpy.generate).toHaveBeenCalledWith({
            revisits: revisitsMock,
            fullName: `${ authenticateStateMock.user.name } ${ authenticateStateMock.user.surname }`
        });

        expect(PDFSpy.writeFromHTML).toHaveBeenCalledTimes(1);
        expect(PDFSpy.writeFromHTML).toHaveBeenCalledWith({
            directory: 'Exports',
            fileName,
            html: '<h1>Pdf revisits template</h1>'
        });

        expect(FileSystemSpy.moveFile).not.toHaveBeenCalled();
    });

    it('should faild if move file throws an error', async () => {
        const fileName = `Revisitas_de_${ authenticateStateMock.user.name }_${ authenticateStateMock.user.surname }`;

        RevisitsServiceSpy.getAllByUserId.mockResolvedValue(revisitsMock);
        PdfRevisitsTemplateSpy.generate.mockResolvedValueOnce('<h1>Pdf revisits template</h1>');
        PDFSpy.writeFromHTML.mockResolvedValue(`/storage/emulated/0/com.kristhdev.jw-reports/Exports/${ fileName }.pdf`);
        FileSystemSpy.moveFile.mockRejectedValue(new FileSystemError('Failed to move file'));

        const { result } = renderUseRevisits(mockStore);

        await act(async () => {
            await result.current.useRevisits.exportRevisits();
        });

        expect(result.current.useRevisits.state.isRevisitsExporting).toBeFalsy();
        expect(result.current.useStatus.state).toEqual({
            code: 400,
            msg: 'Failed to move file'
        });

        expect(RevisitsServiceSpy.getAllByUserId).toHaveBeenCalledTimes(1);
        expect(RevisitsServiceSpy.getAllByUserId).toHaveBeenCalledWith(authenticateStateMock.user.id);

        expect(PdfRevisitsTemplateSpy.generate).toHaveBeenCalledTimes(1);
        expect(PdfRevisitsTemplateSpy.generate).toHaveBeenCalledWith({
            revisits: revisitsMock,
            fullName: `${ authenticateStateMock.user.name } ${ authenticateStateMock.user.surname }`
        });

        expect(PDFSpy.writeFromHTML).toHaveBeenCalledTimes(1);
        expect(PDFSpy.writeFromHTML).toHaveBeenCalledWith({
            directory: 'Exports',
            fileName,
            html: '<h1>Pdf revisits template</h1>'
        });

        expect(FileSystemSpy.moveFile).toHaveBeenCalledTimes(1);
        expect(FileSystemSpy.moveFile).toHaveBeenCalledWith({
            from: `/storage/emulated/0/com.kristhdev.jw-reports/Exports/${ fileName }.pdf`,
            to: `/storage/emulated/0/Download/${ fileName }.pdf`
        });
    });
});