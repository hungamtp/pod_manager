/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import { useAppDispatch, useAppSelector } from "@/components/hooks/reduxHook";
import { MainLayout } from "@/components/layouts";
import PlaceHolderInfoMemo from "@/components/manage-blueprint/place-holder-info";
import {
  resetDesigns,
  setKey,
  setValue,
  updateImgSrc,
} from "@/redux/slices/blueprints";
import { Backdrop, CircularProgress } from "@mui/material";
import { fabric } from "fabric";
import _ from "lodash";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import * as React from "react";
export interface IUpdateBlueprint {}

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

const span = 20;
let outlineColor = "#252626";

let options = {
  distance: 72.1,
  width: 0,
  height: 0,
  param: {
    stroke: "#d4e6f7",
    opacity: 0.3,
    strokeWidth: 1,
    selectable: false,
  },
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

export default function UpdateBlueprint(props: IUpdateBlueprint) {
  const dispatch = useAppDispatch();

  const [canvas, setCanvas] = React.useState<fabric.Canvas>();

  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    const rerenderLoop = setInterval(() => {
      const defaultWidth = document.getElementById("outer")?.clientWidth;
      const defaultHeight = document.getElementById("outer")?.clientHeight;
      if (defaultWidth && defaultHeight) {
        setCanvas(initCanvas(defaultWidth, defaultHeight, "canvas"));
        clearInterval(rerenderLoop);
      }
    }, 200);

    const handleRouteChange = (url: string) => {
      if (!url.includes("update-blueprint")) dispatch(resetDesigns());
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      clearInterval(rerenderLoop);
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, []);

  const blueprint = useAppSelector((state) => state.blueprint);

  React.useEffect(() => {
    if (blueprint.blueprintId) {
      uploadBackgroundImage(blueprint.src, blueprint.tmpSrc);
    }
  }, [canvas]);

  const [backGroundImage, setBackgroundImage] = React.useState<fabric.Image>();

  React.useEffect(() => {
    if (canvas && backGroundImage) {
      canvas.on("object:modified", function (options) {
        const obj = options.target;
        if (obj) {
          const tmpDesignData = calculateRate(
            obj.top || 200,
            obj.getScaledHeight(),
            obj.getScaledWidth()
          );

          dispatch(setValue({ ...tmpDesignData }));
        }
      });
      canvas.on("object:moving", function (options) {
        const obj = options.target;
        if (obj) {
          if (obj.top) {
            const top = obj.top;
            const bottom = top + obj.getScaledHeight();
            const bottomBound = backGroundImage.getScaledHeight();

            if (top <= 0) {
              obj.lockMovementY = true;
              obj.set("top", top + 5);
              canvas.renderAll();
            }
            if (bottom >= bottomBound) {
              obj.lockMovementY = true;
              obj.set("top", top - 5);
              canvas.renderAll();
            }

            const tmpDesignData = calculateRate(
              obj.top || 200,
              obj.getScaledHeight(),
              obj.getScaledWidth()
            );

            dispatch(setValue({ ...tmpDesignData }));
          }
          canvas.on("mouse:down", function (options) {
            const obj = options.target;
            if (obj) {
              obj.lockMovementY = false;

              canvas.renderAll();
            }
          });
          const tmpDesignData = calculateRate(
            obj.top || 200,
            obj.getScaledHeight(),
            obj.getScaledWidth()
          );

          dispatch(setValue({ ...tmpDesignData }));
        }
      });
      addNewRect();
    }
  }, [backGroundImage]);

  const changeWidth = (widthRate: number) => {
    if (blueprint.heightRate && canvas && backGroundImage) {
      const object = _.find(canvas._objects, function (o) {
        return o.name === blueprint.key;
      });
      const width = (widthRate / 100) * backGroundImage.getScaledHeight();
      const height = (width * blueprint.height) / blueprint.width;

      if (object) {
        const scale = object.getObjectScaling();
        object.set("width", width / scale.scaleX);
        object.set("height", height / scale.scaleY);
        object.setCoords();

        const tmpDesignData = calculateRate(
          object.top || 200,
          object.getScaledHeight(),
          object.getScaledWidth()
        );
        dispatch(setValue(tmpDesignData));
        canvas.centerObject(object);
        console.log(object, "object");

        canvas.renderAll();
      }
    }
  };

  const calculateRate = (top: number, height: number, width: number) => {
    if (backGroundImage) {
      const newTop = (top / backGroundImage.getScaledHeight()) * 100;
      const newHeight = (height / backGroundImage.getScaledHeight()) * 100;
      const newWidth = (width / backGroundImage.getScaledHeight()) * 100;
      return {
        topRate: newTop,
        widthRate: newWidth,
        heightRate: newHeight,
      };
    }
  };

  const addNewRect = () => {
    if (canvas && backGroundImage) {
      const newName = nanoid();

      const width = blueprint.widthRate
        ? (blueprint.widthRate / 100) * backGroundImage.getScaledHeight()
        : 150;
      const height = blueprint.heightRate
        ? (blueprint.heightRate / 100) * backGroundImage.getScaledHeight()
        : 150;
      const rect = new fabric.Rect({
        borderColor: "#e7e7e7",
        backgroundColor: "#e7e7e7",
        centeredScaling: true,
        strokeDashArray: [5, 5],
        lockMovementX: true,
        strokeWidth: 5,
        opacity: 0.1,
        width: width,
        height: height,
        top: blueprint.blueprintId
          ? (blueprint.topRate / 100) * backGroundImage.getScaledHeight()
          : backGroundImage.getScaledHeight() / 2,
      });

      rect.set("name", newName);

      rect.set("noScaleCache", true);
      rect.transparentCorners = true;

      rect.setControlsVisibility({
        mt: false,
        mb: false,
        ml: false,
        mr: false,
        bl: false,
        br: false,
        tl: false,
        tr: false,
        mtr: false,
      });
      const maxScaleY = backGroundImage.getScaledHeight() / (height * 2);

      const maxScaleX = maxScaleY;

      rect.on("scaling", function () {
        if (rect.scaleX && rect.scaleY) {
          if (rect.scaleX > maxScaleX) {
            rect.scaleX = maxScaleX;
            canvas.centerObject(rect);
          }
          if (rect.scaleY > maxScaleY) {
            canvas.centerObject(rect);
            rect.scaleY = maxScaleY;
          }
        }
      });

      canvas.add(rect);
      canvas.centerObjectH(rect);

      const tmpDesignData = calculateRate(
        rect.top || 200,
        rect.getScaledHeight(),
        rect.getScaledWidth()
      );

      dispatch(setValue({ ...tmpDesignData }));
      dispatch(setKey(newName));
    }
  };

  const uploadBackgroundImage = React.useCallback(
    (imgUrl: string, tmpSrc: string) => {
      if (canvas) {
        canvas.clear();
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

  const drawGrid = (
    canvasWidth: number,
    canvasHeight: number,
    canvas: fabric.Canvas,
    image: fabric.Image
  ) => {
    const horizontalRealWidth = blueprint.maxWidth * 2;
    const lengthOfunit = (image.getScaledWidth() / horizontalRealWidth) * span;

    for (
      let index = 0;
      index < Math.floor(horizontalRealWidth / span);
      index++
    ) {
      const xHorizontalLineStart =
        (canvasWidth - image.getScaledWidth()) / 2 +
        image.getScaledWidth() * 0.007;
      const yHorizontalLineStart =
        image.getScaledHeight() -
        lengthOfunit * index -
        image.getScaledHeight() * 0.08;

      const xHorizontalLineEnd = canvasWidth - xHorizontalLineStart;
      const yHorizontalLineEnd = yHorizontalLineStart;
      let horizontalLine = new fabric.Line(
        [
          xHorizontalLineStart,
          yHorizontalLineStart,
          xHorizontalLineEnd,
          yHorizontalLineEnd,
        ],
        {
          strokeWidth: 1,
          stroke: outlineColor,
          opacity: 0.3,
          selectable: false,
        }
      );
      const horizontalContent = index * span + "";
      const textHorizontalLeft = image.getScaledWidth() * 0.2;
      const textHorizontalTop =
        image.getScaledHeight() - lengthOfunit * index - 60;
      const newHorizontialText = new fabric.Text(horizontalContent, {
        fontFamily: "Roboto",
        left: textHorizontalLeft,
        top: textHorizontalTop,
        centeredScaling: true,
        transparentCorners: true,
        fill: "black",
        selectable: false,
      }).scaleToHeight(30);

      const xVerticalLineStart =
        lengthOfunit * index +
        (canvasWidth - image.getScaledWidth()) * 0.5 +
        image.getScaledWidth() * 0.007;

      const yVerticalLineStart = canvasHeight * 0.08;

      const xVerticalLineEnd = xVerticalLineStart;

      const yVerticalLineEnd = canvasHeight - yVerticalLineStart;

      const verticalLine = new fabric.Line(
        [
          xVerticalLineStart,
          yVerticalLineStart,
          xVerticalLineEnd,
          yVerticalLineEnd,
        ],
        {
          strokeWidth: 1,
          stroke: outlineColor,
          selectable: false,
          opacity: 0.3,
        }
      );
      const widthContent = index === 0 ? "0 cm" : index * span + "";
      const textLeft =
        index === 0
          ? (canvasWidth - image.getScaledWidth()) / 3.75
          : lengthOfunit * index + (canvasWidth - image.getScaledWidth()) * 0.5;
      const textTop = image.getScaledHeight() - image.getScaledHeight() * 0.05;

      const newVerticalText = new fabric.Text(widthContent, {
        fontFamily: "Roboto",
        left: textLeft,
        top: textTop,
        centeredScaling: true,
        transparentCorners: true,
        fill: "black",
        selectable: false,
      }).scaleToHeight(newHorizontialText.getScaledHeight());

      canvas.add(horizontalLine);
      if (index !== 0) canvas.add(newHorizontialText);
      canvas.add(newVerticalText);
      canvas.add(verticalLine);
    }
    canvas.renderAll();
  };

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
          const colorFilter = new fabric.Image.filters.BlendColor({
            color: "#252626",
            mode: "add",
            alpha: 0.8,
          });
          image.scaleToHeight(sizeObj.height);
          image.set("top", sizeObj.y);
          image.set({ left: sizeObj.x });
          image.filters?.push(colorFilter);
          image.applyFilters();
          setBackgroundImage(image);
          canvas.setBackgroundImage(image, canvas.renderAll.bind(canvas));
          if (canvas.width && canvas.height) {
            drawGrid(canvas.width, canvas.height, canvas, image);
          }

          handleClose();
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
          <hr className="my-4" />
          <br />
          {/* Basic Bootstrap Table */}
          <div className="card">
            <div className="d-flex card-header">
              <button
                className="btn btn-light me-2"
                onClick={() => router.back()}
              >
                Trở về
              </button>
              <h5 className="my-auto text-start">
                Bản thiết kế cho áo: <u>{blueprint.productName}</u>
              </h5>
            </div>
            <div className="card-body">
              <div className="row ">
                <div className="col-lg-9 col-12 px-0 d-flex flex-column ">
                  <div className="outer position-relative" id="outer">
                    <canvas id="canvas" className="center-block"></canvas>
                  </div>
                </div>

                <div className="col-lg-3 d-md-none d-lg-block  px-0 overflow-y-scroll h-full">
                  <div className=" d-flex flex-column">
                    <div className="">
                      <Backdrop
                        sx={{
                          color: "#fff",
                          zIndex: (theme) => theme.zIndex.drawer + 1,
                        }}
                        open={open}
                        onClick={handleClose}
                      >
                        <CircularProgress color="inherit" />
                      </Backdrop>
                      <PlaceHolderInfoMemo
                        uploadBackgroundImage={uploadBackgroundImage}
                        changeWidth={changeWidth}
                        handleToggle={handleToggle}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-backdrop fade" />
      </div>
      <div className="layout-overlay layout-menu-toggle" />
    </>
  );
}
UpdateBlueprint.Layout = MainLayout;
