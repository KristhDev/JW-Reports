import { env } from '@config';

describe('Test env config', () => {
    it('should have respective envs', () => {
        expect(env).toEqual({
            BUGFENDER_API_KEY: expect.any(String),
            EMAILJS_FEEDBACK_TEMPLATE_ID: expect.any(String),
            EMAILJS_PUBLIC_KEY: expect.any(String),
            EMAILJS_REPORT_ERROR_TEMPLATE_ID: expect.any(String),
            EMAILJS_SERVICE_ID: expect.any(String),
            ONESIGNAL_APP_ID: expect.any(String),
            REPOSITORY_URL: expect.any(String),
            SITE_URL: expect.any(String),
            SUPABASE_APY_KEY: expect.any(String),
            SUPABASE_BUCKET: expect.any(String),
            SUPABASE_ERRORS_FOLDER: expect.any(String),
            SUPABASE_REVISITS_FOLDER: expect.any(String),
            SUPABASE_URL: expect.any(String),
        });
    });
});