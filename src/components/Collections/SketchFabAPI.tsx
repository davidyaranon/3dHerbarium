/**
 * @file SketchFabAPI.tsx
 * @fileoverview Client component which renders the 3D models and annotations.
 */

"use client";

import Sketchfab from '@sketchfab/viewer-api';
import { useEffect, useState } from 'react';
import AnnotationModal from '@/components/Collections/AnnotationModal';
import { setViewerWidth, annotationControl, setAnnotation, setAnnotationMobile } from './SketchfabDom';

type sfapiProps = {
  model: any;
  annotations?: any[];
  citations?: any[];
  gMatch: object;
  profile: object;
  softwares?: any,
  imageSet?: any
  commonNames: string[];
  summary?: any;
}


const SFAPI: React.FC<sfapiProps> = (props) => {

  const successObj = {
    success: function onSuccess(api: any) {
      api.start();
      api.addEventListener('viewerready', function () {
        const annotationSwitch = document.getElementById("annotationSwitch");
        const annotationSwitchMobile = document.getElementById("annotationSwitchMobileHidden");
        const annotationDiv = document.getElementById("annotationDiv");
        const modelViewer = document.getElementById("model-viewer");
        api.getAnnotationList(function (err: any, annotations: any) {
          if (!err) { }
          if (annotationSwitch) {
            annotationSwitch.addEventListener("change", (event: Event) => {
              setViewerWidth(modelViewer, annotationDiv, (event.target as HTMLInputElement).checked)
              annotationControl(api, annotations, (event.target as HTMLInputElement).checked)
            })
          }
          if (annotationSwitchMobile) {
            annotationSwitchMobile.addEventListener("change", (event: Event) => {
              setViewerWidth(modelViewer, annotationDiv, (event.target as HTMLInputElement).checked)
              annotationControl(api, annotations, (event.target as HTMLInputElement).checked)
            })
          }
        });
        api.addEventListener('annotationSelect', function (index: number) {
          const mediaQueryWidth = window.matchMedia('(max-width: 1023.5px)');
          const mediaQueryOrientation = window.matchMedia('(orientation: portrait)');
          if (index != -1) {
            const annotationDivVideo = document.getElementById("annotationDivVideo");
            const annotationDivMedia = document.getElementById("annotationDivMedia");
            const annotationDivText = document.getElementById("annotationDivText");
            const annotationDivCitation = document.getElementById("annotationDivCitation");
            setAnnotation(annotationDivVideo, annotationDivMedia, annotationDivText, annotationDivCitation, index, props.model, props.annotations, props.commonNames, props.citations, props.gMatch, props.profile, props.softwares, props.imageSet, props.summary)
          }
          if (index != -1 && mediaQueryWidth.matches || index != -1 && mediaQueryOrientation.matches) {
            document.getElementById("annotationButton")?.click();

            api.getAnnotation(index, function (err: any, information: any) {
              if (!err) {
                setAnnotationTitle(information.name);
                setTimeout(() => {
                  const modalVideo = document.getElementById("modalVideo");
                  const modalMedia = document.getElementById("modalMedia");
                  const modalText = document.getElementById("modalText");
                  const modalCitation = document.getElementById("modalCitation");
                  if (modalMedia && modalText && modalCitation) {
                    setAnnotationMobile(modalVideo, modalMedia, modalText, modalCitation, index, props.model, props.annotations, props.commonNames, props.citations, props.gMatch, props.profile, props.softwares, props.imageSet, props.summary)
                  }
                  else (window.console.log("Error - DOM didn't update"));
                }, 1)
              }
            });
          }
        });
      });
    },
    error: function onError() { },
    ui_stop: 0,
    ui_infos: 0,
    ui_inspector: 0,
    ui_settings: 0,
    ui_watermark: 0,
    ui_annotations: 0,
    ui_color: "004C46",
    ui_fadeout: 0
  }

  const successObjDesktop = { ...successObj };
  //@ts-ignore
  successObjDesktop.annotation = 1; successObjDesktop.ui_fadeout = 1;

  var [annotationTitle, setAnnotationTitle] = useState("");

  const handlePageLoad = () => {
    const sketchFabLink = props.model.uid;
    const iframe = document.getElementById('model-viewer') as HTMLIFrameElement;

    if (iframe) { iframe.src = sketchFabLink; }
    else return;

    const client = new Sketchfab(iframe);

    if (window.matchMedia('(max-width: 1023.5px)').matches
      || window.matchMedia('(orientation: portrait)').matches
    ) {
      client.init(sketchFabLink, successObj);
    }
    else {
      client.init(sketchFabLink, successObjDesktop);
    }
  };

  useEffect(() => {
    handlePageLoad();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      <AnnotationModal title={annotationTitle} />
      <div id="iframeDiv" className="flex bg-black m-auto min-h-[150px]" style={{ height: "100%", width: "100%" }}>
        <iframe src="" frameBorder="0" id="model-viewer" title={"Model Viewer for " + ''}
          allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking="true"
          execution-while-out-of-viewport="true" execution-while-not-rendered="true" web-share="true"
          allowFullScreen
          style={{ width: "60%", transition: "width 1.5s", zIndex: "2" }}
        />
        <div id="annotationDiv" style={{ width: "40%", backgroundColor: "black", transition: "width 1.5s", color: "#F5F3E7", zIndex: "1", overflowY: "auto", overflowX: "hidden" }}>
          <div className="w-full h-full" id="annotationDivVideo" style={{ display: "none" }}></div>
          <div className="w-full h-[65%]" id="annotationDivMedia" style={{ display: "block" }}></div>
          <div className="w-full h-[65%]" id="annotationDivModel" style={{ display: "none" }}></div>
          <div id="annotationDivText"></div>
          <div id="annotationDivCitation"></div>
        </div>
      </div>
    </>
  );
};

export default SFAPI;
