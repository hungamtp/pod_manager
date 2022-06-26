/* eslint-disable @next/next/no-img-element */
import { useAppSelector } from "@/components/hooks/reduxHook";
import { MainLayout } from "@/components/layouts";
import useGetAccountById from "hooks/accounts/use-get-accounts-by-id";
import * as React from "react";

export interface IAccountSettingProps {}

export default function AccountSetting(props: IAccountSettingProps) {
  const credentialId = useAppSelector((state) => state.auth.userId);
  const { data: responseAccount, isLoading: isLoadingAccount } =
    useGetAccountById(Number(credentialId));
  return (
    <>
      <div>
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">Account Settings /</span>{" "}
            Account
          </h4>
          <div className="row">
            <div className="col-md-12">
              <div className="card mb-4">
                <h5 className="card-header">Profile Details</h5>
                {/* Account */}
                <div className="card-body">
                  {!isLoadingAccount && responseAccount && (
                    <form id="formAccountSettings" method="POST">
                      <div className="d-flex align-items-start align-items-sm-center gap-4">
                        <img
                          src="../assets/img/avatars/1.png"
                          alt="user-avatar"
                          className="d-block rounded"
                          height={100}
                          width={100}
                          id="uploadedAvatar"
                        />
                        <div className="button-wrapper">
                          <label
                            htmlFor="upload"
                            className="btn btn-primary me-2 mb-4"
                            tabIndex={0}
                          >
                            <span className="d-none d-sm-block">
                              Upload new photo
                            </span>
                            <i className="bx bx-upload d-block d-sm-none" />
                            <input
                              type="file"
                              id="upload"
                              className="account-file-input"
                              hidden
                              accept="image/png, image/jpeg"
                            />
                          </label>
                          <button
                            type="button"
                            className="btn btn-outline-secondary account-image-reset mb-4"
                          >
                            <i className="bx bx-reset d-block d-sm-none" />
                            <span className="d-none d-sm-block">Reset</span>
                          </button>
                          <p className="text-muted mb-0">
                            Allowed JPG, GIF or PNG. Max size of 800K
                          </p>
                        </div>
                      </div>
                      <hr className="my-0 mt-3 mb-3" />
                      <div className="row">
                        <div className="mb-3 col-md-6">
                          <label htmlFor="firstName" className="form-label">
                            First Name
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="firstName"
                            defaultValue={responseAccount.data.userFirstName}
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="lastName" className="form-label">
                            Last Name
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="lastName"
                            id="lastName"
                            value={responseAccount.data.userLastName}
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="email" className="form-label">
                            E-mail
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="email"
                            name="email"
                            defaultValue={responseAccount.data.email}
                            disabled
                          />
                        </div>

                        <div className="mb-3 col-md-6">
                          <label className="form-label" htmlFor="phoneNumber">
                            Phone Number
                          </label>
                          <div className="input-group input-group-merge">
                            <input
                              type="text"
                              id="phoneNumber"
                              name="phoneNumber"
                              className="form-control"
                              defaultValue={responseAccount.data.phone}
                            />
                          </div>
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="address" className="form-label">
                            Address
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="address"
                            name="address"
                            placeholder="Address"
                            defaultValue={responseAccount.data.address}
                          />
                        </div>
                        <div className="mb-3 col-md-6">
                          <label htmlFor="state" className="form-label">
                            Role Name
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            id="state"
                            defaultValue={responseAccount.data.roleName}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="mt-2">
                        <button type="submit" className="btn btn-primary me-2">
                          Save changes
                        </button>
                        <button
                          type="reset"
                          className="btn btn-outline-secondary"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
                {/* /Account */}
              </div>
            </div>
          </div>
        </div>

        {/* / Content */}
        {/* Footer */}

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
AccountSetting.Layout = MainLayout;
