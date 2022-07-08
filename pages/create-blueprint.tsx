/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { useAppDispatch } from "@/components/hooks/reduxHook";
import { MainLayout } from "@/components/layouts";
import PlaceHolderInfoMemo from "@/components/manage-blueprint/place-holder-info";
import { setValue, updateImgSrc } from "@/redux/slices/blueprints";
import { setChoosenKey } from "@/redux/slices/choosenKey";
import { fabric } from "fabric";
import _ from "lodash";
import { nanoid } from "nanoid";
import * as React from "react";
import { Blueprint } from "../models";
export interface ICreateBlueprint {}
const hightRate = 1.2337;
const placeHolderAndOuterRate = 1.5;
const DPI = 300;

const resizer = (
  canvasSize: { width: number; height: number },
  imageSize: { width: number; height: number }
) => {
  const imageAspectRatio = imageSize.width / imageSize.height;
  let canvasAspectRatio = canvasSize.width / canvasSize.height;
  let renderableHeight, renderableWidth, xStart, yStart;

  // If image's aspect ratio is less than canvasSize's we fit on height
  // and place the image centrally along width
  if (imageAspectRatio < canvasAspectRatio) {
    renderableHeight = canvasSize.height;
    renderableWidth = imageSize.width * (renderableHeight / imageSize.height);
    xStart = (canvasSize.width - renderableWidth) / 2;
    yStart = 0;
  }

  // If image's aspect ratio is greater than canvas's we fit on width
  // and place the image centrally along height
  else if (imageAspectRatio > canvasAspectRatio) {
    renderableWidth = canvasSize.width;
    renderableHeight = imageSize.height * (renderableWidth / imageSize.width);
    xStart = 0;
    yStart = (canvasSize.height - renderableHeight) / 2;
  }

  // Happy path - keep aspect ratio
  else {
    renderableHeight = canvasSize.height;
    renderableWidth = canvasSize.width;
    xStart = 0;
    yStart = 0;
  }
  return {
    x: xStart,
    y: yStart,
    width: renderableWidth,
    height: renderableHeight,
  };
};

const getBase64FromUrl = async (url: string): Promise<string> => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result + "" || url;
      resolve(base64data);
    };
  });
};

const initCanvas = (
  defaultWidth: number,
  defaultHeight: number,
  id: string
): fabric.Canvas => {
  const tmpCanvas = new fabric.Canvas(id, {
    height: defaultHeight,
    width: defaultWidth,
  });
  return tmpCanvas;
};

export default function CreateBlueprint(props: ICreateBlueprint) {
  const pageHeight = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );

  const dispatch = useAppDispatch();

  const [canvas, setCanvas] = React.useState<fabric.Canvas>();
  const [JSONdata, setJSONdata] = React.useState<string>();
  const [aspectRatio, setAspectRatio] = React.useState<number>(1);
  React.useEffect(() => {
    const rerenderLoop = setInterval(() => {
      const defaultWidth = document.getElementById("outer")?.clientWidth;
      const defaultHeight = document.getElementById("outer")?.clientHeight;
      if (defaultWidth && defaultHeight) {
        setCanvas(initCanvas(defaultWidth, defaultHeight, "canvas"));
        clearInterval(rerenderLoop);
      }
      console.log(defaultHeight, "defaultHeight");
    }, 200);

    return () => {
      clearInterval(rerenderLoop);
    };
  }, []);

  const [backGroundImage, setBackgroundImage] = React.useState<fabric.Image>();

  React.useEffect(() => {
    if (canvas) {
      canvas.on("object:modified", function (options) {
        const obj = options.target;
        if (obj) {
          const tmpDesignData = calculateRate(
            obj.top || 200,
            obj.getScaledWidth(),
            obj.getScaledHeight()
          );

          dispatch(setValue({ ...tmpDesignData }));
        }
      });

      canvas.on("mouse:down", function (options) {
        const obj = options.target;
        if (obj) {
          obj.lockMovementY = false;

          canvas.renderAll();
        }
      });
    }
  }, [canvas]);

  React.useEffect(() => {
    if (canvas && backGroundImage) {
      console.log(backGroundImage.getScaledHeight(), "ccc");
      canvas.on("object:moving", function (options) {
        const obj = options.target;
        if (obj) {
          if (
            obj.height &&
            obj.width &&
            obj.left &&
            obj.top &&
            backGroundImage.top
          ) {
            const top = obj.top;
            const bottom = top + obj.getScaledHeight();
            const left = obj.left;
            const right = left + obj.getScaledWidth();
            const topBound = backGroundImage.top;
            const bottomBound =
              backGroundImage.top + backGroundImage.getScaledHeight();

            if (top <= topBound) {
              obj.lockMovementY = true;
              obj.set("top", top + 5);
              canvas.renderAll();
            }
            if (bottom >= bottomBound) {
              obj.lockMovementY = true;
              obj.set("top", top - 5);
              canvas.renderAll();
            }
          }
          const tmpDesignData = calculateRate(
            obj.top || 200,
            obj.getScaledWidth(),
            obj.getScaledHeight()
          );

          dispatch(setValue({ ...tmpDesignData }));
        }
      });
      addNewRect(backGroundImage);
    }
  }, [backGroundImage]);

  // const reverseDesigns = (blueprint: Blueprint) => {
  //   if (canvas && placeHolder) {
  //     const designInfos = blueprint.designInfos;
  //     if (designInfos) {
  //       designInfos.forEach((design) => {
  //         addRect(design);
  //       });
  //     }
  //   }
  // };

  const calculateRate = (top: number, width: number, height: number) => {
    if (backGroundImage) {
      const newTop = (top / backGroundImage.getScaledHeight()) * 100;
      const newWidth = (width / backGroundImage.getScaledWidth()) * 100;
      const newHeight = (height / backGroundImage.getScaledHeight()) * 100;
      return {
        topRate: newTop,
        widthRate: newWidth,
        heightRate: newHeight,
      };
    }
  };

  const reverseData = (key: string, value: number) => {
    let data = 0;
    if (backGroundImage) {
      if (key === "top" || key === "height")
        data = (value / 100) * backGroundImage.getScaledHeight();

      if (key === "width")
        data = (value / 100) * backGroundImage.getScaledWidth();

      return data;
    }
  };

  const addNewRect = (backGroundImage: fabric.Image) => {
    console.log(backGroundImage, "backGroundImage");
    if (canvas) {
      const newName = nanoid();

      const rect = new fabric.Rect({
        borderColor: "rgba(255,255,255,1.0)",
        backgroundColor: "rgba(255,255,255,1.0)",
        strokeDashArray: [5, 5],
        lockMovementX: true,
        strokeWidth: 0.2,
        width: 10,
        height: 10,
        opacity: 0.4,
      });

      rect.set("name", newName);

      rect.set("noScaleCache", true);
      rect.transparentCorners = true;
      rect.centeredScaling = true;

      rect.scaleToWidth(150);
      rect.scaleToHeight(100);
      const imageLeft = (canvas.getWidth() - rect.getScaledWidth()) / 2;
      const imageTop =
        (backGroundImage.getScaledHeight() - rect.getScaledHeight()) / 2;
      rect.set("left", imageLeft);
      rect.set("top", imageTop);

      rect.setControlsVisibility({
        mtr: false,
      });

      canvas.add(rect);

      const tmpDesignData = calculateRate(
        rect.top || 200,
        rect.getScaledWidth(),
        rect.getScaledHeight()
      );

      dispatch(setValue({ ...tmpDesignData }));
    }
  };

  const uploadBackgroundImage = React.useCallback(
    (imgUrl: string, tmpSrc: string) => {
      if (canvas) {
        if (canvas.width && canvas.height) {
          const outerSize = {
            outerWidth: canvas.width,
            outerHeight: canvas.height,
          };
          setBackgroundFromDataUrl(tmpSrc, outerSize);
        }
        dispatch(updateImgSrc({ src: imgUrl, tmpSrc: tmpSrc }));
      }
    },
    [canvas]
  );

  const setBackgroundFromDataUrl = (
    dataUrl: string,
    outerSize: { outerWidth: number; outerHeight: number }
  ) => {
    if (!dataUrl && !outerSize) {
      return true;
    }
    const { outerWidth, outerHeight } = outerSize;

    if (canvas) {
      fabric.Image.fromURL(
        dataUrl,
        (image: fabric.Image) => {
          canvas.setWidth(outerWidth);
          canvas.setHeight(outerHeight);

          canvas.renderAll();
          const sizeObj = resizer(
            { width: outerWidth, height: outerHeight },
            { width: image.width || 100, height: image.height || 150 }
          );
          image.scaleToHeight(sizeObj.height);
          image.set("top", sizeObj.y);
          image.set({ left: sizeObj.x });
          setBackgroundImage(image);
          canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas));
        },
        { crossOrigin: "anonymous" }
      );
    }
  };

  return (
    <>
      <div>
        {/* Layout wrapper */}

        {/* Content */}
        <div className="container-xxl w-80p flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4"></h4>
          <hr className="my-4" />
          <br />
          {/* Basic Bootstrap Table */}
          <div className="card">
            <h5 className="card-header">Quản lý Nhà Máy</h5>
            <>
              <div className="row ">
                <div className="col-lg-9 col-12 px-0 d-flex flex-column ">
                  <div className="outer position-relative" id="outer">
                    <canvas id="canvas" className="center-block"></canvas>
                  </div>
                </div>

                <div className="col-lg-3 d-md-none d-lg-block  px-0 overflow-y-scroll h-full">
                  <div className=" d-flex flex-column">
                    <div className="p-3">
                      <PlaceHolderInfoMemo
                        uploadBackgroundImage={uploadBackgroundImage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
        <div className="content-backdrop fade" />
      </div>
      <div className="layout-overlay layout-menu-toggle" />
    </>
  );
}
CreateBlueprint.Layout = MainLayout;
