import 'reflect-metadata';
import { Container } from 'inversify';

import { DeviceInfoAdapterContract } from '@domain/contracts/adapters';

import { 
    AuthServiceContract,
    CloudServiceContract,
    CoursesServiceContract,
    DeviceImageServiceContract,
    EmailServiceContract,
    LessonsServiceContract,
    LoggerServiceContract,
    NotificationsServiceContract,
    PreachingReportServiceContract,
    PreachingServiceContract,
    RevisitsServiceContract
} from '@domain/contracts/services';

import { DeviceInfoAdapter } from '@infrastructure/adapters';

import { 
    AuthService,
    CloudService,
    CoursesService,
    DeviceImageService,
    EmailService,
    LessonsService,
    LoggerService,
    PreachingReportService,
    PreachingService,
    RevisitsService
} from '@infrastructure/services';
import { NotificationsService } from '@services';

export const DEPENDENCIES_TYPES = {
    AuthService: Symbol.for('AuthService'),
    CloudService: Symbol.for('CloudService'),
    CoursesService: Symbol.for('CoursesService'),
    DeviceImageService: Symbol.for('DeviceImageService'),
    EmailService: Symbol.for('EmailService'),
    LessonsService: Symbol.for('LessonsService'),
    LoggerService: Symbol.for('LoggerService'),
    NotificationsService: Symbol.for('NotificationsService'),
    PreachingReportService: Symbol.for('PreachingReportService'),
    PreachingService: Symbol.for('PreachingService'),
    RevisitsService: Symbol.for('RevisitsService'),

    DeviceInfoAdapter: Symbol.for('DeviceInfoAdapter')
}

const dependencies = new Container();

dependencies.bind<AuthServiceContract>(DEPENDENCIES_TYPES.AuthService).to(AuthService);
dependencies.bind<CloudServiceContract>(DEPENDENCIES_TYPES.CloudService).to(CloudService);
dependencies.bind<CoursesServiceContract>(DEPENDENCIES_TYPES.CoursesService).to(CoursesService)
dependencies.bind<DeviceImageServiceContract>(DEPENDENCIES_TYPES.DeviceImageService).to(DeviceImageService);
dependencies.bind<EmailServiceContract>(DEPENDENCIES_TYPES.EmailService).to(EmailService);
dependencies.bind<NotificationsServiceContract>(DEPENDENCIES_TYPES.NotificationsService).to(NotificationsService);
dependencies.bind<LessonsServiceContract>(DEPENDENCIES_TYPES.LessonsService).to(LessonsService);
dependencies.bind<LoggerServiceContract>(DEPENDENCIES_TYPES.LoggerService).to(LoggerService);
dependencies.bind<PreachingReportServiceContract>(DEPENDENCIES_TYPES.PreachingReportService).to(PreachingReportService);
dependencies.bind<PreachingServiceContract>(DEPENDENCIES_TYPES.PreachingService).to(PreachingService);
dependencies.bind<RevisitsServiceContract>(DEPENDENCIES_TYPES.RevisitsService).to(RevisitsService);

dependencies.bind<DeviceInfoAdapterContract>(DEPENDENCIES_TYPES.DeviceInfoAdapter).to(DeviceInfoAdapter);

export { dependencies }