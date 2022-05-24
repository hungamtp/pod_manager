import { MainLayout } from "@/components/layouts";
import * as React from "react";

export interface IBasicInputProps {}

export default function BasicInput(props: IBasicInputProps) {
  return (
    <>
      <div>
      <div className="container-xxl flex-grow-1 container-p-y">
  <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Forms /</span> Basic Inputs</h4>
  <div className="row">
    <div className="col-md-6">
      <div className="card mb-4">
        <h5 className="card-header">Default</h5>
        <div className="card-body">
          <div>
            <label htmlFor="defaultFormControlInput" className="form-label">Name</label>
            <input type="text" className="form-control" id="defaultFormControlInput" placeholder="John Doe" aria-describedby="defaultFormControlHelp" />
            <div id="defaultFormControlHelp" className="form-text">
              We will never share your details with anyone else.
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <div className="card mb-4">
        <h5 className="card-header">Float label</h5>
        <div className="card-body">
          <div className="form-floating">
            <input type="text" className="form-control" id="floatingInput" placeholder="John Doe" aria-describedby="floatingInputHelp" />
            <label htmlFor="floatingInput">Name</label>
            <div id="floatingInputHelp" className="form-text">
              We will never share your details with anyone else.
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Form controls */}
    <div className="col-md-6">
      <div className="card mb-4">
        <h5 className="card-header">Form Controls</h5>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlReadOnlyInput1" className="form-label">Read only</label>
            <input className="form-control" type="text" id="exampleFormControlReadOnlyInput1" placeholder="Readonly input here..." readOnly />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlReadOnlyInputPlain1" className="form-label">Read plain</label>
            <input type="text" readOnly className="form-control-plaintext" id="exampleFormControlReadOnlyInputPlain1" defaultValue="email@example.com" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlSelect1" className="form-label">Example select</label>
            <select className="form-select" id="exampleFormControlSelect1" aria-label="Default select example">
              <option selected>Open this select menu</option>
              <option value={1}>One</option>
              <option value={2}>Two</option>
              <option value={3}>Three</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleDataList" className="form-label">Datalist example</label>
            <input className="form-control" list="datalistOptions" id="exampleDataList" placeholder="Type to search..." />
            <datalist id="datalistOptions">
              <option value="San Francisco" />
              <option value="New York" />
              <option value="Seattle" />
              <option value="Los Angeles" />
              <option value="Chicago" />
            </datalist>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlSelect2" className="form-label">Example multiple select</label>
            <select multiple className="form-select" id="exampleFormControlSelect2" aria-label="Multiple select example">
              <option selected>Open this select menu</option>
              <option value={1}>One</option>
              <option value={2}>Two</option>
              <option value={3}>Three</option>
            </select>
          </div>
          <div>
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Example textarea</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
          </div>
        </div>
      </div>
    </div>
    {/* Input Sizing */}
    <div className="col-md-6">
      <div className="card mb-4">
        <h5 className="card-header">Input Sizing</h5>
        <div className="card-body">
          <small className="text-light fw-semibold">Input text</small>
          <div className="mt-2 mb-3">
            <label htmlFor="largeInput" className="form-label">Large input</label>
            <input id="largeInput" className="form-control form-control-lg" type="text" placeholder=".form-control-lg" />
          </div>
          <div className="mb-3">
            <label htmlFor="defaultInput" className="form-label">Default input</label>
            <input id="defaultInput" className="form-control" type="text" placeholder="Default input" />
          </div>
          <div>
            <label htmlFor="smallInput" className="form-label">Small input</label>
            <input id="smallInput" className="form-control form-control-sm" type="text" placeholder=".form-control-sm" />
          </div>
        </div>
        <hr className="m-0" />
        <div className="card-body">
          <small className="text-light fw-semibold">Input select</small>
          <div className="mt-2 mb-3">
            <label htmlFor="largeSelect" className="form-label">Large select</label>
            <select id="largeSelect" className="form-select form-select-lg">
              <option>Large select</option>
              <option value={1}>One</option>
              <option value={2}>Two</option>
              <option value={3}>Three</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="defaultSelect" className="form-label">Default select</label>
            <select id="defaultSelect" className="form-select">
              <option>Default select</option>
              <option value={1}>One</option>
              <option value={2}>Two</option>
              <option value={3}>Three</option>
            </select>
          </div>
          <div>
            <label htmlFor="smallSelect" className="form-label">Small select</label>
            <select id="smallSelect" className="form-select form-select-sm">
              <option>Small select</option>
              <option value={1}>One</option>
              <option value={2}>Two</option>
              <option value={3}>Three</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    {/* Default Checkboxes and radios & Default checkboxes and radios */}
    <div className="col-xl-6">
      <div className="card mb-4">
        <h5 className="card-header">Checkboxes and Radios</h5>
        {/* Checkboxes and Radios */}
        <div className="card-body">
          <div className="row gy-3">
            <div className="col-md">
              <small className="text-light fw-semibold">Checkboxes</small>
              <div className="form-check mt-3">
                <input className="form-check-input" type="checkbox"  id="defaultCheck1" />
                <label className="form-check-label" htmlFor="defaultCheck1"> Unchecked </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox"  id="defaultCheck2" defaultChecked />
                <label className="form-check-label" htmlFor="defaultCheck2"> Indeterminate </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox"  id="defaultCheck3" defaultChecked />
                <label className="form-check-label" htmlFor="defaultCheck3"> Checked </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox"  id="disabledCheck1" disabled />
                <label className="form-check-label" htmlFor="disabledCheck1"> Disabled Unchecked </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox"  id="disabledCheck2" disabled defaultChecked />
                <label className="form-check-label" htmlFor="disabledCheck2"> Disabled Checked </label>
              </div>
            </div>
            <div className="col-md">
              <small className="text-light fw-semibold">Radio</small>
              <div className="form-check mt-3">
                <input name="default-radio-1" className="form-check-input" type="radio"  id="defaultRadio1" />
                <label className="form-check-label" htmlFor="defaultRadio1"> Unchecked </label>
              </div>
              <div className="form-check">
                <input name="default-radio-1" className="form-check-input" type="radio"  id="defaultRadio2" defaultChecked />
                <label className="form-check-label" htmlFor="defaultRadio2"> Checked </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio"  id="disabledRadio1" disabled />
                <label className="form-check-label" htmlFor="disabledRadio1"> Disabled unchecked </label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio"  id="disabledRadio2" disabled defaultChecked />
                <label className="form-check-label" htmlFor="disabledRadio2"> Disabled checkbox </label>
              </div>
            </div>
          </div>
        </div>
        <hr className="m-0" />
        {/* Inline Checkboxes */}
        <div className="card-body">
          <div className="row gy-3">
            <div className="col-md">
              <small className="text-light fw-semibold d-block">Inline Checkboxes</small>
              <div className="form-check form-check-inline mt-3">
                <input className="form-check-input" type="checkbox" id="inlineCheckbox1" defaultValue="option1" />
                <label className="form-check-label" htmlFor="inlineCheckbox1">1</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="inlineCheckbox2" defaultValue="option2" />
                <label className="form-check-label" htmlFor="inlineCheckbox2">2</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="inlineCheckbox3" defaultValue="option3" disabled />
                <label className="form-check-label" htmlFor="inlineCheckbox3">3 (disabled)</label>
              </div>
            </div>
            <div className="col-md">
              <small className="text-light fw-semibold d-block">Inline Radio</small>
              <div className="form-check form-check-inline mt-3">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" defaultValue="option1" />
                <label className="form-check-label" htmlFor="inlineRadio1">1</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" defaultValue="option2" />
                <label className="form-check-label" htmlFor="inlineRadio2">2</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" defaultValue="option3" disabled />
                <label className="form-check-label" htmlFor="inlineRadio3">3 (disabled)</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Switches */}
      <div className="card mb-4">
        <h5 className="card-header">Switches</h5>
        <div className="card-body">
          <div className="form-check form-switch mb-2">
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Default switch checkbox input</label>
          </div>
          <div className="form-check form-switch mb-2">
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" defaultChecked />
            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Checked switch checkbox input</label>
          </div>
          <div className="form-check form-switch mb-2">
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDisabled" disabled />
            <label className="form-check-label" htmlFor="flexSwitchCheckDisabled">Disabled switch checkbox input</label>
          </div>
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="flexSwitchCheckCheckedDisabled" defaultChecked disabled />
            <label className="form-check-label" htmlFor="flexSwitchCheckCheckedDisabled">Disabled checked switch checkbox input</label>
          </div>
        </div>
      </div>
      {/* Range */}
      <div className="card mb-4 mb-xl-0">
        <h5 className="card-header">Range</h5>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="formRange1" className="form-label">Example range</label>
            <input type="range" className="form-range" id="formRange1" />
          </div>
          <div className="mb-3">
            <label htmlFor="disabledRange" className="form-label">Disabled range</label>
            <input type="range" className="form-range" id="disabledRange" disabled />
          </div>
          <div className="mb-3">
            <label htmlFor="formRange2" className="form-label">Min and max</label>
            <input type="range" className="form-range" min={0} max={5} id="formRange2" />
          </div>
          <div>
            <label htmlFor="formRange3" className="form-label">Steps</label>
            <input type="range" className="form-range" min={0} max={5} step="0.5" id="formRange3" />
          </div>
        </div>
      </div>
    </div>
    <div className="col-xl-6">
      {/* HTML5 Inputs */}
      <div className="card mb-4">
        <h5 className="card-header">HTML5 Inputs</h5>
        <div className="card-body">
          <div className="mb-3 row">
            <label htmlFor="html5-text-input" className="col-md-2 col-form-label">Text</label>
            <div className="col-md-10">
              <input className="form-control" type="text" defaultValue="Sneat" id="html5-text-input" />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="html5-search-input" className="col-md-2 col-form-label">Search</label>
            <div className="col-md-10">
              <input className="form-control" type="search" defaultValue="Search ..." id="html5-search-input" />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="html5-email-input" className="col-md-2 col-form-label">Email</label>
            <div className="col-md-10">
              <input className="form-control" type="email" defaultValue="john@example.com" id="html5-email-input" />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="html5-url-input" className="col-md-2 col-form-label">URL</label>
            <div className="col-md-10">
              <input className="form-control" type="url" defaultValue="https://themeselection.com" id="html5-url-input" />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="html5-tel-input" className="col-md-2 col-form-label">Phone</label>
            <div className="col-md-10">
              <input className="form-control" type="tel" defaultValue="90-(164)-188-556" id="html5-tel-input" />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="html5-password-input" className="col-md-2 col-form-label">Password</label>
            <div className="col-md-10">
              <input className="form-control" type="password" defaultValue="password" id="html5-password-input" />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="html5-number-input" className="col-md-2 col-form-label">Number</label>
            <div className="col-md-10">
              <input className="form-control" type="number" defaultValue={18} id="html5-number-input" />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="html5-datetime-local-input" className="col-md-2 col-form-label">Datetime</label>
            <div className="col-md-10">
              <input className="form-control" type="datetime-local" defaultValue="2021-06-18T12:30:00" id="html5-datetime-local-input" />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="html5-date-input" className="col-md-2 col-form-label">Date</label>
            <div className="col-md-10">
              <input className="form-control" type="date" defaultValue="2021-06-18" id="html5-date-input" />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="html5-month-input" className="col-md-2 col-form-label">Month</label>
            <div className="col-md-10">
              <input className="form-control" type="month" defaultValue="2021-06" id="html5-month-input" />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="html5-week-input" className="col-md-2 col-form-label">Week</label>
            <div className="col-md-10">
              <input className="form-control" type="week" defaultValue="2021-W25" id="html5-week-input" />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="html5-time-input" className="col-md-2 col-form-label">Time</label>
            <div className="col-md-10">
              <input className="form-control" type="time" defaultValue="12:30:00" id="html5-time-input" />
            </div>
          </div>
          <div className="mb-3 row">
            <label htmlFor="html5-color-input" className="col-md-2 col-form-label">Color</label>
            <div className="col-md-10">
              <input className="form-control" type="color" defaultValue="#666EE8" id="html5-color-input" />
            </div>
          </div>
          <div className="row">
            <label htmlFor="html5-range" className="col-md-2 col-form-label">Range</label>
            <div className="col-md-10">
              <input type="range" className="form-range mt-3" id="html5-range" />
            </div>
          </div>
        </div>
      </div>
      {/* File input */}
      <div className="card">
        <h5 className="card-header">File input</h5>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">Default file input example</label>
            <input className="form-control" type="file" id="formFile" />
          </div>
          <div className="mb-3">
            <label htmlFor="formFileMultiple" className="form-label">Multiple files input example</label>
            <input className="form-control" type="file" id="formFileMultiple" multiple />
          </div>
          <div>
            <label htmlFor="formFileDisabled" className="form-label">Disabled file input example</label>
            <input className="form-control" type="file" id="formFileDisabled" disabled />
          </div>
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
BasicInput.Layout = MainLayout;
