import { 
    DeviceInfoAdapterContract,
    ExternalStorageAdapterContract,
    InternalStorageAdapterContract,
    PDFAdapterContract,
    VoiceRecorderAdapterContract
} from '@domain/contracts/adapters';

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

import {
    DeviceInfoAdapter,
    ExternalStorageAdapter,
    InternalStorageAdapter,
    PDFAdapter,
    VoiceRecorderAdapter
} from '@infrastructure/adapters';

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

export const internalStorageAdapter: InternalStorageAdapterContract = new InternalStorageAdapter();
export const externalStorageAdapter: ExternalStorageAdapterContract = new ExternalStorageAdapter(internalStorageAdapter);
export const pdfAdapter: PDFAdapterContract = new PDFAdapter(internalStorageAdapter);
export const deviceInfoAdapter: DeviceInfoAdapterContract = new DeviceInfoAdapter();
export const voiceRecorderAdapter: VoiceRecorderAdapterContract = new VoiceRecorderAdapter();

export const authService: AuthServiceContract = new AuthService();
export const cloudService: CloudServiceContract = new CloudService();
export const coursesService: CoursesServiceContract = new CoursesService();
export const deviceImageService: DeviceImageServiceContract = new DeviceImageService();
export const emailService: EmailServiceContract = new EmailService();
export const lessonsService: LessonsServiceContract = new LessonsService();
export const loggerService: LoggerServiceContract = new LoggerService();
export const notificationsService: NotificationsServiceContract = new NotificationsService();
export const preachingReportService: PreachingReportServiceContract = new PreachingReportService();
export const preachingService: PreachingServiceContract = new PreachingService();
export const revisitsService: RevisitsServiceContract = new RevisitsService();