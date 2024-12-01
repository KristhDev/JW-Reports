/* Constants */
import { appMessages } from '@application/constants';

/* Modules */
import { useCourses } from '@courses';
import { usePreaching } from '@preaching';
import { useRevisits } from '@revisits';
import useStatus from './useStatus';
import { useUI } from '@ui';

const useExportData = () => {
    const { state: { isCoursesExporting }, exportCourses } = useCourses();
    const { state: { isPreachingsExporting }, exportPreachings } = usePreaching();
    const { state: { isRevisitsExporting }, exportRevisits } = useRevisits();
    const { setStatus } = useStatus();
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

            setStatus({ code: 200, msg: appMessages.DATA_EXPORTED_SUCCESS });
        }
        catch (error) {
            console.log(error);
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