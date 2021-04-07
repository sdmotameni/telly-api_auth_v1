const Sentry = require("@sentry/node");

module.exports.init = function () {
  Sentry.init({
    dsn:
      "https://fe615842bbc2411b9b38ead6f38addf2@o481448.ingest.sentry.io/5706520",

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production

    tracesSampleRate: 1.0,
  });
  console.log("Sentry initialized.");
};

module.exports.log = function (e) {
  const transaction = Sentry.startTransaction({
    op: "telly-api",
    name: "telly-api",
  });
  Sentry.captureException(e);
  transaction.finish();
};
