/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-title-in-document-head */
import React, { ReactElement } from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentInitialProps,
  DocumentContext,
} from "next/document";

export default class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <meta content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />
          <meta name="description" content="" />

          <link
            rel="icon"
            type="image/x-icon"
            href="assets/img/favicon/favicon.ico"
          />

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
            rel="stylesheet"
          />

          <link rel="stylesheet" href="assets/vendor/fonts/boxicons.css" />

          <link
            rel="stylesheet"
            href="assets/vendor/css/core.css"
            className="template-customizer-core-css"
          />
          <link
            rel="stylesheet"
            href="assets/vendor/css/theme-default.css"
            className="template-customizer-theme-css"
          />
          <link rel="stylesheet" href="assets/css/demo.css" />

          <link
            rel="stylesheet"
            href="assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css"
          />

          <link
            rel="stylesheet"
            href="assets/vendor/libs/apex-charts/apex-charts.css"
          />

          <script src="assets/vendor/js/helpers.js"></script>

          <script src="assets/js/config.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="assets/vendor/libs/jquery/jquery.js"></script>
          <script src="assets/vendor/libs/popper/popper.js"></script>
          <script src="assets/vendor/js/bootstrap.js"></script>
          <script src="assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>

          <script src="assets/vendor/js/menu.js"></script>

          <script src="assets/vendor/libs/apex-charts/apexcharts.js"></script>

          <script src="assets/js/main.js"></script>

          <script src="assets/js/dashboards-analytics.js"></script>

          <script
            async
            defer
            src="https://buttons.github.io/buttons.js"
          ></script>
        </body>
      </Html>
    );
  }
}
