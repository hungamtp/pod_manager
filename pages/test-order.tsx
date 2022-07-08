import { MainLayout } from "@/components/layouts";
import * as React from "react";

export interface ITestOrdersProps {}

export default function TestOrders(props: ITestOrdersProps) {
  return (
    <div>
      <div className="container">
        <article className="card">
          <header className="card-header"> My Orders / Tracking </header>
          <div className="card-body">
            <h6>Order ID: OD45345345435</h6>
            <article className="card">
              <div className="card-body row">
                <div className="col">
                  {" "}
                  <strong>Estimated Delivery time:</strong> <br />
                  29 nov 2019{" "}
                </div>
                <div className="col">
                  {" "}
                  <strong>Shipping BY:</strong> <br /> BLUEDART, |{" "}
                  <i className="fa fa-phone" /> +1598675986{" "}
                </div>
                <div className="col">
                  {" "}
                  <strong>Status:</strong> <br /> Picked by the courier{" "}
                </div>
                <div className="col">
                  {" "}
                  <strong>Tracking #:</strong> <br /> BD045903594059{" "}
                </div>
              </div>
            </article>
            <div className="track">
              <div className="step active">
                {" "}
                <span className="icon">
                  {" "}
                  <i className="fa fa-check" />{" "}
                </span>{" "}
                <span className="text">Order confirmed</span>{" "}
              </div>
              <div className="step active">
                {" "}
                <span className="icon">
                  {" "}
                  <i className="fa fa-user" />{" "}
                </span>{" "}
                <span className="text"> Picked by courier</span>{" "}
              </div>
              <div className="step">
                {" "}
                <span className="icon">
                  {" "}
                  <i className="fa fa-truck" />{" "}
                </span>{" "}
                <span className="text"> On the way </span>{" "}
              </div>
              <div className="step">
                {" "}
                <span className="icon">
                  {" "}
                  <i className="fa fa-box" />{" "}
                </span>{" "}
                <span className="text">Ready for pickup</span>{" "}
              </div>
            </div>
            <hr />

            <hr />
            <a href="#" className="btn btn-warning" data-abc="true">
              {" "}
              <i className="fa fa-chevron-left" /> Back to orders
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}

TestOrders.Layout = MainLayout;
