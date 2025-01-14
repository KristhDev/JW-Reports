import { NotificationsService } from '@services';

import {
    AuthService,
    CloudService,
    CoursesService,
    DeviceImageService,
    EmailService,
    LessonsService,
    PreachingService,
    RevisitsService,
} from '@domain/services';

export const AuthServiceSpy = {
    getSession: jest.spyOn(AuthService, 'getSession'),
    resetPassword: jest.spyOn(AuthService, 'resetPassword'),
    signIn: jest.spyOn(AuthService, 'signIn'),
    signOut: jest.spyOn(AuthService, 'signOut'),
    signUp: jest.spyOn(AuthService, 'signUp'),
    updateEmail: jest.spyOn(AuthService, 'updateEmail'),
    updatePassword: jest.spyOn(AuthService, 'updatePassword'),
    updateProfile: jest.spyOn(AuthService, 'updateProfile')
}

export const CloudServiceSpy = {
    deleteImage: jest.spyOn(CloudService, 'deleteImage'),
    uploadImage: jest.spyOn(CloudService, 'uploadImage'),
}

export const CoursesServiceSpy = {
    activeOrSuspend: jest.spyOn(CoursesService, 'activeOrSuspend'),
    create: jest.spyOn(CoursesService, 'create'),
    delete: jest.spyOn(CoursesService, 'delete'),
    finishOrStart: jest.spyOn(CoursesService, 'finishOrStart'),
    getAllByUserId: jest.spyOn(CoursesService, 'getAllByUserId'),
    getCourseIdsByUserId: jest.spyOn(CoursesService, 'getCourseIdsByUserId'),
    paginateByUserId: jest.spyOn(CoursesService, 'paginateByUserId'),
    update: jest.spyOn(CoursesService, 'update'),
}

export const DeviceImageServiceSpy = {
    getCameraPermission: jest.spyOn(DeviceImageService, 'getCameraPermission'),
    getMediaLibraryPermissionsAsync: jest.spyOn(DeviceImageService, 'getMediaLibraryPermission'),
    openCamera: jest.spyOn(DeviceImageService, 'openCamera'),
    openPicker: jest.spyOn(DeviceImageService, 'openPicker'),
    requestCameraPermission: jest.spyOn(DeviceImageService, 'requestCameraPermission'),
    requestMediaLibraryPermission: jest.spyOn(DeviceImageService, 'requestMediaLibraryPermission'),
}

export const EmailServiceSpy = {
    init: jest.spyOn(EmailService, 'init'),
    send: jest.spyOn(EmailService, 'send'),
}

export const LessonsServiceSpy = {
    create: jest.spyOn(LessonsService, 'create'),
    delete: jest.spyOn(LessonsService, 'delete'),
    deleteLessonsByCourseId: jest.spyOn(LessonsService, 'deleteLessonsByCourseId'),
    finishOrStart: jest.spyOn(LessonsService, 'finishOrStart'),
    getLastLessonByCoursesId: jest.spyOn(LessonsService, 'getLastLessonByCoursesId'),
    paginateByCourseId: jest.spyOn(LessonsService, 'paginateByCourseId'),
    update: jest.spyOn(LessonsService, 'update'),
}

export const RevisitsServiceSpy = {
    complete: jest.spyOn(RevisitsService, 'complete'),
    create: jest.spyOn(RevisitsService, 'create'),
    delete: jest.spyOn(RevisitsService, 'delete'),
    getAllByUserId: jest.spyOn(RevisitsService, 'getAllByUserId'),
    getLastByUserId: jest.spyOn(RevisitsService, 'getLastByUserId'),
    paginateByUserId: jest.spyOn(RevisitsService, 'paginateByUserId'),
    update: jest.spyOn(RevisitsService, 'update'),
}

export const PreachingServiceSpy = {
    create: jest.spyOn(PreachingService, 'create'),
    delete: jest.spyOn(PreachingService, 'delete'),
    getAllByUserId: jest.spyOn(PreachingService, 'getAllByUserId'),
    getByUserIdAndMonth: jest.spyOn(PreachingService, 'getByUserIdAndMonth'),
    update: jest.spyOn(PreachingService, 'update'),
}

export const NotificationsServiceSpy = {
    getNotificationsPermission: jest.spyOn(NotificationsService, 'getNotificationsPermission'),
    requestNotificationsPermission: jest.spyOn(NotificationsService, 'requestNotificationsPermission'),
}