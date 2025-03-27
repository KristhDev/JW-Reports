import { PreachingEntity } from '@domain/entities';

import { GroupedPreachingsModel, PreachingReportModel } from '@domain/models';

import { PreachingReportOptions, ReamainingOfHoursRequirement, RemainingHoursOfWeeklyRequirement } from '@infrastructure/interfaces';

export abstract class PreachingReportServiceContract {
    public abstract generatePrechingReportString(options: PreachingReportOptions): string;
    public abstract generatePreachingReportForExport(options: GroupedPreachingsModel): PreachingReportModel;
    public abstract getHoursDoneByWeek(preachingsOfWeek: PreachingEntity[]): string;
    public abstract getHoursRequirementByWeek(hoursRequirement: number): string;
    public abstract getRemainingHoursOfWeeklyRequirement(hoursRequirementByWeek: string, hoursDoneByWeek: string): RemainingHoursOfWeeklyRequirement;
    public abstract getReamainingOfHoursRequirement(preachings: PreachingEntity[], hoursRequirement: number): ReamainingOfHoursRequirement;
    public abstract groupByMonthAndYear(preachings: PreachingEntity[]): GroupedPreachingsModel[];
}