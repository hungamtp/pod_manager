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

export default function UpdateBlueprint(props: IUpdateBlueprint) {
  const dispatch = useAppDispatch();

  const [canvas, setCanvas] = React.useState<fabric.Canvas>();

  const router = useRouter();

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
          console.log(obj.getObjectScaling().scaleX, "scale");
          console.log(
            obj.getScaledWidth() / obj.getObjectScaling().scaleX,
            "width"
          );
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
        borderColor: "rgba(255,255,255,1.0)",
        backgroundColor: "rgba(255,255,255,1.0)",
        centeredScaling: true,
        strokeDashArray: [5, 5],
        lockMovementX: true,
        strokeWidth: 4,
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
      console.log(rect.top, "rect.top");

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
            <h5 className="card-header">{blueprint.productName}</h5>
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
                        changeWidth={changeWidth}
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
UpdateBlueprint.Layout = MainLayout;
