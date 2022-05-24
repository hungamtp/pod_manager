import { MainLayout } from "@/components/layouts";
import * as React from "react";

export interface IHorizontalFormProps {}

export default function HorizontalForm(props: IHorizontalFormProps) {
  return (
    <>
      <div>
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">Forms/</span> Horizontal
            Layouts
          </h4>
          {/* Basic Layout & Basic with Icons */}
          <div className="row">
            {/* Basic Layout */}
            <div className="col-xxl">
              <div className="card mb-4">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h5 className="mb-0">Basic Layout</h5>
                  <small className="text-muted float-end">Default label</small>
                </div>
                <div className="card-body">
                  <form>
                    <div className="row mb-3">
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-default-name"
                      >
                        Name
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          id="basic-default-name"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-default-company"
                      >
                        Company
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          className="form-control"
                          id="basic-default-company"
                          placeholder="ACME Inc."
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-default-email"
                      >
                        Email
                      </label>
                      <div className="col-sm-10">
                        <div className="input-group input-group-merge">
                          <input
                            type="text"
                            id="basic-default-email"
                            className="form-control"
                            placeholder="john.doe"
                            aria-label="john.doe"
                            aria-describedby="basic-default-email2"
                          />
                          <span
                            className="input-group-text"
                            id="basic-default-email2"
                          >
                            @example.com
                          </span>
                        </div>
                        <div className="form-text">
                          You can use letters, numbers &amp; periods
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-default-phone"
                      >
                        Phone No
                      </label>
                      <div className="col-sm-10">
                        <input
                          type="text"
                          id="basic-default-phone"
                          className="form-control phone-mask"
                          placeholder="658 799 8941"
                          aria-label="658 799 8941"
                          aria-describedby="basic-default-phone"
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-default-message"
                      >
                        Message
                      </label>
                      <div className="col-sm-10">
                        <textarea
                          id="basic-default-message"
                          className="form-control"
                          placeholder="Hi, Do you have a moment to talk Joe?"
                          aria-label="Hi, Do you have a moment to talk Joe?"
                          aria-describedby="basic-icon-default-message2"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="row justify-content-end">
                      <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">
                          Send
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* Basic with Icons */}
            <div className="col-xxl">
              <div className="card mb-4">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h5 className="mb-0">Basic with Icons</h5>
                  <small className="text-muted float-end">
                    Merged input group
                  </small>
                </div>
                <div className="card-body">
                  <form>
                    <div className="row mb-3">
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-icon-default-fullname"
                      >
                        Name
                      </label>
                      <div className="col-sm-10">
                        <div className="input-group input-group-merge">
                          <span
                            id="basic-icon-default-fullname2"
                            className="input-group-text"
                          >
                            <i className="bx bx-user" />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            id="basic-icon-default-fullname"
                            placeholder="John Doe"
                            aria-label="John Doe"
                            aria-describedby="basic-icon-default-fullname2"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-icon-default-company"
                      >
                        Company
                      </label>
                      <div className="col-sm-10">
                        <div className="input-group input-group-merge">
                          <span
                            id="basic-icon-default-company2"
                            className="input-group-text"
                          >
                            <i className="bx bx-buildings" />
                          </span>
                          <input
                            type="text"
                            id="basic-icon-default-company"
                            className="form-control"
                            placeholder="ACME Inc."
                            aria-label="ACME Inc."
                            aria-describedby="basic-icon-default-company2"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        className="col-sm-2 col-form-label"
                        htmlFor="basic-icon-default-email"
                      >
                        Email
                      </label>
                      <div className="col-sm-10">
                        <div className="input-group input-group-merge">
                          <span className="input-group-text">
                            <i className="bx bx-envelope" />
                          </span>
                          <input
                            type="text"
                            id="basic-icon-default-email"
                            className="form-control"
                            placeholder="john.doe"
                            aria-label="john.doe"
                            aria-describedby="basic-icon-default-email2"
                          />
                          <span
                            id="basic-icon-default-email2"
                            className="input-group-text"
                          >
                            @example.com
                          </span>
                        </div>
                        <div className="form-text">
                          You can use letters, numbers &amp; periods
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        className="col-sm-2 form-label"
                        htmlFor="basic-icon-default-phone"
                      >
                        Phone No
                      </label>
                      <div className="col-sm-10">
                        <div className="input-group input-group-merge">
                          <span
                            id="basic-icon-default-phone2"
                            className="input-group-text"
                          >
                            <i className="bx bx-phone" />
                          </span>
                          <input
                            type="text"
                            id="basic-icon-default-phone"
                            className="form-control phone-mask"
                            placeholder="658 799 8941"
                            aria-label="658 799 8941"
                            aria-describedby="basic-icon-default-phone2"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        className="col-sm-2 form-label"
                        htmlFor="basic-icon-default-message"
                      >
                        Message
                      </label>
                      <div className="col-sm-10">
                        <div className="input-group input-group-merge">
                          <span
                            id="basic-icon-default-message2"
                            className="input-group-text"
                          >
                            <i className="bx bx-comment" />
                          </span>
                          <textarea
                            id="basic-icon-default-message"
                            className="form-control"
                            placeholder="Hi, Do you have a moment to talk Joe?"
                            aria-label="Hi, Do you have a moment to talk Joe?"
                            aria-describedby="basic-icon-default-message2"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-end">
                      <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">
                          Send
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* / Content */}
        {/* Footer */}
        <footer className="content-footer footer bg-footer-theme">
          <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
            <div className="mb-2 mb-md-0">
              © , made with ❤️ by
              <a
                href="https://themeselection.com"
                className="footer-link fw-bolder"
              >
                ThemeSelection
              </a>
            </div>
            <div>
              <a
                href="https://themeselection.com/license/"
                className="footer-link me-4"
              >
                License
              </a>
              <a
                href="https://themeselection.com/"
                className="footer-link me-4"
              >
                More Themes
              </a>
              <a
                href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/"
                className="footer-link me-4"
              >
                Documentation
              </a>
              <a
                href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
                className="footer-link me-4"
              >
                Support
              </a>
            </div>
          </div>
        </footer>
        {/* / Footer */}
        <div className="content-backdrop fade" />
      </div>
      {/* Content wrapper */}

      {/* Content wrapper */}
      {/* / Layout page */}
      {/* Overlay */}
      <div className="layout-overlay layout-menu-toggle" />
    </>
  );
}
HorizontalForm.Layout = MainLayout;
