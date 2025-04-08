import { 
    DeviceInfoAdapterContract,
    ExternalStorageAdapterContract,
    InternalStorageAdapterContract,
    LocalizationAdapterContract,
    PDFAdapterContract,
    TranslationAdapterContract,
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
    MessagesServiceContract,
    NotificationsServiceContract,
    PlaceholdersServiceContract,
    PreachingReportServiceContract,
    PreachingServiceContract,
    PublisherServiceContract,
    RevisitsServiceContract
} from '@domain/contracts/services';

import {
    DeviceInfoAdapter,
    ExternalStorageAdapter,
    InternalStorageAdapter,
    LocalizationAdapter,
    PDFAdapter,
    TranslationAdapter,
    VoiceRecorderAdapter
} from '@infrastructure/adapters';

import { 
    AuthService,
    CloudService,
    CoursesService,
    MessagesService,
    PublisherService,
    DeviceImageService,
    EmailService,
    LessonsService,
    LoggerService,
    PreachingReportService,
    PreachingService,
    RevisitsService,
    PlaceholdersService
} from '@infrastructure/services';
import { NotificationsService } from '@services';

export const internalStorageAdapter: InternalStorageAdapterContract = new InternalStorageAdapter();
export const deviceInfoAdapter: DeviceInfoAdapterContract = new DeviceInfoAdapter();
export const pdfAdapter: PDFAdapterContract = new PDFAdapter(internalStorageAdapter);
export const localizationAdapter: LocalizationAdapterContract = new LocalizationAdapter();
export const translationAdapter: TranslationAdapterContract = new TranslationAdapter();

export const authService: AuthServiceContract = new AuthService();
export const cloudService: CloudServiceContract = new CloudService();
export const coursesService: CoursesServiceContract = new CoursesService();
export const deviceImageService: DeviceImageServiceContract = new DeviceImageService();
export const emailService: EmailServiceContract = new EmailService();
export const lessonsService: LessonsServiceContract = new LessonsService();
export const loggerService: LoggerServiceContract = new LoggerService();
export const publisherService: PublisherServiceContract = new PublisherService(translationAdapter);
export const messagesService: MessagesServiceContract = new MessagesService(translationAdapter, publisherService);
export const notificationsService: NotificationsServiceContract = new NotificationsService();
export const placeholdersService: PlaceholdersServiceContract = new PlaceholdersService(translationAdapter);
export const preachingReportService: PreachingReportServiceContract = new PreachingReportService();
export const preachingService: PreachingServiceContract = new PreachingService();
export const revisitsService: RevisitsServiceContract = new RevisitsService();

export const externalStorageAdapter: ExternalStorageAdapterContract = new ExternalStorageAdapter(messagesService, internalStorageAdapter);
export const voiceRecorderAdapter: VoiceRecorderAdapterContract = new VoiceRecorderAdapter(messagesService);
