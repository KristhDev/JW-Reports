import { useCallback, useMemo, useState } from 'react';

import { coursesService } from '@config/di';

import { coursesFilters } from '@application/constants/utils';

import { useCourses } from '@courses/hooks';
import { useNetwork } from '@shared/hooks';
import { useTranslation } from '@ui/hooks';

import { CourseFilter } from '@courses/interfaces';

const useCoursesList = () => {
    const coursesFiltersItems = coursesService.coursesFiltersItems;

    const [ searchTerm, setSearchTerm ] = useState<string>('');
    const [ isRefreshing, setIsRefreshing ] = useState<boolean>(false);

    const {
        state: {
            courseFilter,
            courses,
            hasMoreCourses,
            isCoursesLoading,
        },
        loadCourses,
        removeCourses,
        setCoursesPagination,
    } = useCourses();

    const [ filter, setFilter ] = useState<CourseFilter>(courseFilter);

    const { wifi } = useNetwork();
    const { translate } = useTranslation();

    const generateEmptyMsg = (filter: CourseFilter): string => {
        if (filter === coursesFilters.ALL) return translate('messages.courses.notAdded');
        if (filter === coursesFilters.ACTIVE) return translate('messages.courses.noActiveCourses');
        if (filter === coursesFilters.SUSPENDED) return translate('messages.courses.noSuspendedCourses');
        if (filter === coursesFilters.FINISHED) return translate('messages.courses.noFinishedCourses');

        return translate('messages.courses.notAdded');
    }

    const noFoundResultsMsg = translate('messages.noResults', {
        attribute: translate('entities.courses'),
        search: searchTerm.trim()
    });

    const emptyMessage = useMemo(() => generateEmptyMsg(filter), [ filter, translate ]);

    const emptyMsg = useMemo(
        () => (searchTerm.trim().length > 0) ? noFoundResultsMsg : emptyMessage,
        [ searchTerm, noFoundResultsMsg, emptyMessage ]
    );

    /**
     * When the user refreshes the page, the search term is reset, the pagination is reset, the courses
     * are removed, and the courses are loaded.
     *
     * @return {Promise<void>} This function does not return any value.
     */
    const onRefreshingCourses = useCallback(async (): Promise<void> => {
        if (isCoursesLoading) return;

        setIsRefreshing(true);
        setSearchTerm('');

        if (wifi.hasConnection) {
            setCoursesPagination({ from: 0, to: 9 });
            removeCourses();
            await loadCourses({ filter, refresh: true });
        }

        setIsRefreshing(false);
    }, [ isCoursesLoading, wifi.hasConnection, filter ]);

    /**
     * If the search string is empty and the courses array is empty, then set the courses pagination,
     * remove the courses, load the courses, and set the isRefreshing state to false.
     *
     * @param {string} search - string
     * @return {Promise<void>} This function does not return any value.
     */
    const onSearchCourses = useCallback(async (search: string): Promise<void> => {
        if (isCoursesLoading) return;
        setSearchTerm(search);

        if (wifi.hasConnection) {
            setCoursesPagination({ from: 0, to: 9 });
            removeCourses();
            await loadCourses({ filter, search, refresh: true });
        }
    }, [ isCoursesLoading, wifi.hasConnection, filter ]);

    /**
     * If there are no more courses to load, or if the courses are currently loading, then return.
     * Otherwise, load more courses.
     *
     * @return {Promise<void>} This function does not return any value.
     */
    const onEndReach = useCallback(async (): Promise<void> => {
        if (!hasMoreCourses || courses.length === 0 || isCoursesLoading || !wifi.hasConnection) return;
        loadCourses({ filter, search: searchTerm, loadMore: true });
    }, [  hasMoreCourses, courses.length, isCoursesLoading, wifi.hasConnection, filter, searchTerm ]);

    const onMountCourses = useCallback(async (): Promise<void> => {
        if (isCoursesLoading) return;

        removeCourses();
        loadCourses({ filter, search: searchTerm, refresh: true });
    }, [ filter, isCoursesLoading ]);

    return {
        emptyMsg,
        isRefreshing,
        isCoursesLoading,
        courses,
        coursesFiltersItems,
        searchTerm,

        filter,
        setFilter,

        onEndReach,
        onMountCourses,
        onRefreshingCourses,
        onSearchCourses
    }
}

export default useCoursesList;
