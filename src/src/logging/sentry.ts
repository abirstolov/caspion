import * as Sentry from '@sentry/electron';

type Init = typeof Sentry.init

// https://docs.sentry.io/platforms/javascript/guides/electron/#webpack-configuration
const { init }: { init: Init } = process.type === 'browser'
  ? require('@sentry/electron/dist/main')
  : require('@sentry/electron/dist/renderer');

const reporterConfiguration = {
  dsn: SENTRY_DSN,
  defaultIntegrations: false,
  environment: process.env.NODE_ENV,
  enableJavaScript: true,
  enableNative: false,
  enableUnresponsive: false,
} as Sentry.ElectronOptions;

const initializeReporter = () => init(reporterConfiguration);

const userReportProblem = (title: string, body: string, logs: string, email: string, extra: Record<string, any>) => {
  return Sentry.captureMessage(title, {
    user: {
      email,
    },
    extra: {
      body,
      logs,
      ...extra,
    },
  });
};

export default {
  initializeReporter,
  userReportProblem
};
