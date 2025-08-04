import { 
    DeviceInfoAdapterContract,
    ExternalStorageAdapterContract,
    InternalStorageAdapterContract,
    LocalizationAdapterContract,
    PDFAdapterContract,
    StorageAdapterContract,
    TimeAdapterContract,
    ToasterAdapterContract,
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
    PdfCoursesTemplateServiceContract,
    PdfPreachingsTemplateServiceContract,
    PdfRevisitsTemplateServiceContract,
    PlaceholdersServiceContract,
    PreachingReportServiceContract,
    PreachingServiceContract,
    PublisherServiceContract,
    RevisitsServiceContract,
    ThemeServiceContract
} from '@domain/contracts/services';

import {
    DeviceInfoAdapter,
    ExternalStorageAdapter,
    InternalStorageAdapter,
    LocalizationAdapter,
    PDFAdapter,
    StorageAdapter,
    TimeAdapter,
    ToasterAdapter,
    TranslationAdapter,
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
    MessagesService,
    PdfCoursesTemplateService,
    PdfPreachingsTemplateService,
    PdfRevisitsTemplateService,
    PlaceholdersService,
    PreachingReportService,
    PreachingService,
    PublisherService,
    RevisitsService
} from '@infrastructure/services';

import { NotificationsService, ThemeService } from '@services';

export const deviceInfoAdapter: DeviceInfoAdapterContract = new DeviceInfoAdapter();
export const internalStorageAdapter: InternalStorageAdapterContract = new InternalStorageAdapter();
export const localizationAdapter: LocalizationAdapterContract = new LocalizationAdapter();
export const pdfAdapter: PDFAdapterContract = new PDFAdapter(internalStorageAdapter);
export const storageAdapter: StorageAdapterContract = new StorageAdapter();
export const timeAdapter: TimeAdapterContract = new TimeAdapter();
export const translationAdapter: TranslationAdapterContract = new TranslationAdapter();

export const authService: AuthServiceContract = new AuthService();
export const cloudService: CloudServiceContract = new CloudService();
export const coursesService: CoursesServiceContract = new CoursesService(translationAdapter);
export const deviceImageService: DeviceImageServiceContract = new DeviceImageService();
export const emailService: EmailServiceContract = new EmailService();
export const lessonsService: LessonsServiceContract = new LessonsService();
export const loggerService: LoggerServiceContract = new LoggerService();
export const notificationsService: NotificationsServiceContract = new NotificationsService();
export const pdfCoursesTemplateService: PdfCoursesTemplateServiceContract = new PdfCoursesTemplateService(timeAdapter, translationAdapter);
export const pdfPreachingsTemplateService: PdfPreachingsTemplateServiceContract = new PdfPreachingsTemplateService(translationAdapter);
export const pdfRevisitsTemplateService: PdfRevisitsTemplateServiceContract = new PdfRevisitsTemplateService(deviceImageService, timeAdapter, translationAdapter);
export const placeholdersService: PlaceholdersServiceContract = new PlaceholdersService(translationAdapter);
export const preachingReportService: PreachingReportServiceContract = new PreachingReportService(timeAdapter, translationAdapter);
export const preachingService: PreachingServiceContract = new PreachingService(timeAdapter);
export const publisherService: PublisherServiceContract = new PublisherService(translationAdapter);
export const messagesService: MessagesServiceContract = new MessagesService(translationAdapter, publisherService);
export const revisitsService: RevisitsServiceContract = new RevisitsService(translationAdapter);
export const themeService: ThemeServiceContract = new ThemeService(translationAdapter);

export const externalStorageAdapter: ExternalStorageAdapterContract = new ExternalStorageAdapter(messagesService, internalStorageAdapter);
export const toasterAdapter: ToasterAdapterContract = new ToasterAdapter(translationAdapter, loggerService, messagesService);
export const voiceRecorderAdapter: VoiceRecorderAdapterContract = new VoiceRecorderAdapter(messagesService);
