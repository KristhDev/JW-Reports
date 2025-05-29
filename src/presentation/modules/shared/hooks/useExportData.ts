/* Config */
import { messagesService, toasterAdapter } from '@config/di';

/* Hooks */
import { useCourses } from '@courses/hooks';
import { usePreaching } from '@preaching/hooks';
import { useRevisits } from '@revisits/hooks';
import { useUI } from '@ui/hooks';

const useExportData = () => {
    const appMessages = messagesService.appMessages;

    const { state: { isCoursesExporting }, exportCourses } = useCourses();
    const { state: { isPreachingsExporting }, exportPreachings } = usePreaching();
    const { state: { isRevisitsExporting }, exportRevisits } = useRevisits();
    const { state: { isDataExporting }, setIsDataExporting } = useUI();

    /**
     * Export all the data of the user to PDF files and save them to the device's downloads folder.
     *
     * @return {Promise<void>} This function does not return anything.
     */
    const exportAllData = async (): Promise<void> => {
        setIsDataExporting(true);

        try {
            await exportPreachings(false);
            await exportRevisits(false);
            await exportCourses(false);

            toasterAdapter.showToast(appMessages.DATA_EXPORTED_SUCCESS);
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setIsDataExporting(false);
        }
    }

    return {
        isCoursesExporting,
        isDataExporting,
        isPreachingsExporting,
        isRevisitsExporting,

        exportAllData,
        exportCourses,
        exportPreachings,
        exportRevisits
    }
}

export default useExportData;