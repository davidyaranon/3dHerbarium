"use client"
import { toUpperFirstLetter } from '@/utils/toUpperFirstLetter';
import Sketchfab from '@sketchfab/viewer-api';

export function setViewerWidth(modelViewer: any, annotationDiv: any, annotationsChecked: any) {
  if (annotationsChecked) {
    annotationDiv.style.setProperty("width", "40%");
    modelViewer.style.setProperty("width", "60%");
  }
  else {
    annotationDiv.style.setProperty("width", "0");
    modelViewer.style.setProperty("width", "100%");
    document.getElementById("model-viewer")?.click();
  }
}

export function annotationControl(api: any, annotations: any, annotationsChecked: any) {
  if (annotationsChecked) {
    for (let i = 0; i < annotations.length; i++) {
      api.showAnnotation(i, function (err: any, index: number) { })
    }
    api.showAnnotationTooltips(function (err: any) {
      if (!err) { }
    });
  }
  else {
    for (let i = 0; i < annotations.length; i++) {
      api.hideAnnotation(i, function (err: any, index: number) { })
    }
    api.hideAnnotationTooltips(function (err: any) { });
  }
}

export function setAnnotation(video: any, media: any, text: any, citation: any, realIndex: number, model: any, annotations: any, commonNames: string[], dbCitation?: any, gMatch?: any, gProfile?: any, softwares?: any, imageSet?: any, summary?: any) {

  let boolRinse = (bool: boolean) => {
    var rinsed = bool ? "Yes" : "No";
    return rinsed;
  }

  if (realIndex == 0) {
    const extinct = gProfile.extinct !== "" ? "<p>Extinct: " + boolRinse(gProfile.extinct) + "</p>" : "";
    const habitat = gProfile.habitat ? "<p>Habitat: " + toUpperFirstLetter(gProfile.habitat) + "</p>" : "";
    const freshwater = gProfile.freshwater !== "" ? "<p>Freshwater: " + boolRinse(gProfile.freshwater) + "</p>" : "";
    const marine = gProfile.marine !== "" ? "<p>Marine: " + boolRinse(gProfile.marine) + "</p>" : "";
    var vernacularNames = commonNames.length > 1 ? "<p>Common Names: " : "<p>Common Name: ";
    var annotator;

    for (let citation of dbCitation) {
      if (citation[0]) {
        annotator = citation[0].annotator;
      }
    }

    for (let name of commonNames) {
      vernacularNames += name + ", ";
    }
    vernacularNames = vernacularNames.slice(0, vernacularNames.length - 2);
    vernacularNames += "</p>";

    var softwareString = "<p>Created with: ";
    for (let software of softwares) {
      softwareString += software.software + ", ";
    }
    softwareString = softwareString.slice(0, softwareString.length - 2);
    softwareString += "</p>";

    video.style.setProperty("display", "none");
    media.style.setProperty("display", "block");
    media.innerHTML = "";
    media.innerHTML +=

      "<div class='fade' style='display:flex; width:99%; margin-top:25px;'>" +
      "<div class='annotationBorder' style='width:35%; display:flex; font-size:1.5rem; justify-content:center; align-items:center; padding-top:20px; padding-bottom:20px; border-right:solid;'>" +
      "<p> Classification </p>" +
      "</div>" +
      "<div style='width:65%; padding-top:20px; padding-bottom:20px; justify-content:center; align-items:center; text-align:center'>" +
      "<p>Species: <i><span style='color:#FFC72C;'>" + gMatch.data.species + "</span></i></p>" +
      "<p>Kingdom: " + gMatch.data.kingdom + "</p>" +
      "<p>Phylum: " + gMatch.data.phylum + "</p>" +
      "<p>Order: " + gMatch.data.order + "</p>" +
      "<p>Family: " + gMatch.data.family + "</p>" +
      "<p>Genus: <i>" + gMatch.data.genus + "</i></p>" +
      "</div>" +
      "</div>" +

      "<div class='fade' style='display:flex; width:99%; margin-top:25px;'>" +
      "<div class='annotationBorder' style='width:35%; display:flex; font-size:1.5rem; justify-content:center; align-items:center; padding-top:20px; padding-bottom:20px; border-right:solid;'>" +
      "<p> Profile </p>" +
      "</div>" +
      "<div style='width:65%; padding-top:20px; padding-bottom:20px; justify-content:center; align-items:center; text-align:center; padding-left:2%; padding-right:2%;'>" +
      vernacularNames + extinct + habitat + freshwater + marine +
      "</div>" +
      "</div>" +

      "<div class='fade' style='display:flex; width:99%; margin-top:25px;'>" +
      "<div class='annotationBorder' style='width:35%; display:flex; font-size:1.5rem; justify-content:center; align-items:center; padding-top:20px; padding-bottom:20px; border-right:solid;'>" +
      "<p> 3D Model </p>" +
      "</div>" +
      "<div style='width:65%; padding-top:20px; padding-bottom:20px; justify-content:center; align-items:center; text-align:center'>" +
      "<p>Build method: " + model.build_process + "</p>" +
      softwareString +
      "<p>Images: " + imageSet[0].no_of_images + "</p>" +
      "<p>Modeler: " + model.modeled_by + "</p>" +
      "<p>Annotator: " + annotator + "</p>" +
      "</div>" +
      "</div><br>";

    if (summary) {
      media.innerHTML +=
        "<br><h1 class='fade' style='text-align:center; font-size:1.5rem;'>Description</h1>" +
        "<p class='fade' style='text-align:center; padding-right:1.5%; padding-left:0.5%;'>" + summary.extract + "</p><br>" +
        "<p class='fade' style='text-align:center; font-size:0.9rem;'>from <a href=" + summary.content_urls.desktop.page + " target='_blank'><u>Wikipedia</u></a></p>";
    }


    text.innerHTML = "";
    citation.innerHTML = "";
  }
  else {
    if (annotations[realIndex - 1].annotation_type == "video") {
      media.innerHTML = "";
      media.style.setProperty("display", "none")
      text.innerHTML = "";
      citation.innerHTML = "";
      video.innerHTML = "";
      video.style.setProperty("display", "block");
      video.innerHTML += "<iframe align='left' style='width:calc(100% - 15px); height:100%; class='fade' src=" + annotations[realIndex - 1].url + "></iframe>";
    }
    else {

      if (annotations[realIndex - 1].annotation_type == "model") {
        video.innerHTML = "";
        video.style.setProperty("display", "none");
        media.style.setProperty("display", "block");
        media.innerHTML = "";
        media.innerHTML += "<iframe src='' height='100%' width='100%' id='api-frame' allow='autoplay; fullscreen; xr-spatial-tracking' xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share allowfullscreen mozallowfullscreen='true' webkitallowfullscreen='true'></iframe>";

        var iframe = document.getElementById('api-frame');
        var uid = '6915cff41ccf40fa95c860dc885cff0e';
        var client = new Sketchfab(iframe);

        client.init(uid, {
          success: function onSuccess(api: any) {
            api.start();
            api.addEventListener('viewerready', function () {
            });
          },
          error: function onError() {
            console.log('Viewer error');
          },
          ui_stop: 0,
          ui_infos: 0,
          ui_inspector: 0,
          ui_settings: 0,
          ui_watermark: 0,
          ui_annotations: 0,
          ui_color: "004C46"
        },);

        text.innerHTML = ""
        text.innerHTML += "<br><p style='margin:auto; padding-right:3%; padding-left:2%; text-align:center;' class='fade'>" + dbCitation[realIndex - 1][0].annotation + "</p>";
        citation.innerHTML = "";
        citation.innerHTML += "<br><p class='fade' style='text-align:center;width:95%'> Model by: David Yaranon </p>";
      }

      else {
        video.innerHTML = "";
        video.style.setProperty("display", "none");
        media.style.setProperty("display", "block");
        media.innerHTML = "";
        media.innerHTML += "<div style='width:100%; height:100%; text-align:center;' class='fade'><img class='center' style='width:98%; height:100%; padding-right:2%; padding-top:1%;' src=" + encodeURI(decodeURI(annotations[realIndex - 1].url)) + " alt='Image for annotation number " + annotations[realIndex - 1].annotation_no + "' ></div>";
        text.innerHTML = ""
        text.innerHTML += "<br><p style='margin:auto; padding-right:3%; padding-left:2%; text-align:center;' class='fade'>" + dbCitation[realIndex - 1][0].annotation + "</p>";
        citation.innerHTML = "";
        citation.innerHTML += "<br><p class='fade' style='text-align:center;width:95%'> Photo by: " + dbCitation[realIndex - 1][0].author + ", licensed under <a href='https://creativecommons.org/share-your-work/cclicenses/' target='_blank'>" + dbCitation[realIndex - 1][0].license + "</p>";
      }
    }
  }

}

export function setAnnotationMobile(video: any, media: any, text: any, citation: any, realIndex: number, model: any, annotations: any, commonNames: string[], dbCitation?: any, gMatch?: any, gProfile?: any, softwares?: any, imageSet?: any, summary?: any) {

  let boolRinse = (bool: boolean) => {
    var rinsed = bool ? "Yes" : "No";
    return rinsed;
  }

  if (realIndex == 0) {
    const extinct = gProfile.extinct !== "" ? "<p>Extinct: " + boolRinse(gProfile.extinct) + "</p>" : "";
    const habitat = gProfile.habitat ? "<p>Habitat: " + toUpperFirstLetter(gProfile.habitat) + "</p>" : "";
    const freshwater = gProfile.freshwater !== "" ? "<p>Freshwater: " + boolRinse(gProfile.freshwater) + "</p>" : "";
    const marine = gProfile.marine !== "" ? "<p>Marine: " + boolRinse(gProfile.marine) + "</p>" : "";
    var vernacularNames = commonNames.length > 1 ? "<p>Common Names: " : "<p>Common Name: ";
    var annotator;

    for (let citation of dbCitation) {
      if (citation[0]) {
        annotator = citation[0].annotator;
      }
    }

    for (let name of commonNames) {
      vernacularNames += name + ", ";
    }

    vernacularNames = vernacularNames.slice(0, vernacularNames.length - 2);
    vernacularNames += "</p>";

    var softwareString = "<p>Created with: ";

    for (let software of softwares) {
      softwareString += software.software + ", ";
    }

    softwareString = softwareString.slice(0, softwareString.length - 2);
    softwareString += "</p>";

    video.innerHTML = ""
    video.style.setProperty("display", "none")
    media.innerHTML = "";
    media.innerHTML +=

      "<div class='fade' style='width:100%; display:flex; justify-content:center; align-items:center; padding-top:20px; padding-bottom:20px; text-align:center; flex-direction: column;'>" +
      "<div style='font-size:1.25rem; border-bottom:solid; border-top: solid; border-color:#004C46; width: 100%'>" +
      "<p> Classification </p>" +
      "</div><br>" +
      "<p>Species: <i><span style='color:#FFC72C;'>" + gMatch.data.species + "</span></i></p>" +
      "<p>Kingdom: " + gMatch.data.kingdom + "</p>" +
      "<p>Phylum: " + gMatch.data.phylum + "</p>" +
      "<p>Order: " + gMatch.data.order + "</p>" +
      "<p>Family: " + gMatch.data.family + "</p>" +
      "<p>Genus: <i>" + gMatch.data.genus + "</i></p>" +
      "</div>" +

      "<div class='fade' style='display:flex; width:100%; justify-content:center; align-items:center; padding-top:20px; padding-bottom:20px; text-align:center; flex-direction: column;'>" +
      "<div style='font-size:1.25rem; border-bottom:solid; border-top: solid; border-color:#004C46; width: 100%''>" +
      "<p> Profile </p>" +
      "</div><br>" +
      vernacularNames + extinct + habitat + freshwater + marine +
      "</div>" +

      "<div class='fade' style='width:100%; display:flex; justify-content:center; align-items:center; padding-top:20px; padding-bottom:20px; text-align:center; flex-direction: column;'>" +
      "<div style='font-size:1.25rem; border-bottom:solid; border-top: solid; border-color:#004C46; width: 100%'>" +
      "<p> 3D Model </p>" +
      "</div><br>" +
      "<p>Build method: " + model.build_process + "</p>" +
      softwareString +
      "<p>Images: " + imageSet[0].no_of_images + "</p>" +
      "<p>Modeler: " + model.modeled_by + "</p>" +
      "<p>Annotator: " + annotator + "</p>" +
      "</div>" +

      "<div class='fade' style='width:100%; display:flex; justify-content:center; align-items:center; padding-top:20px; padding-bottom:20px; text-align:center; flex-direction: column;'>" +
      "<div style='font-size:1.25rem; border-bottom:solid; border-top: solid; border-color:#004C46; width: 100%''>" +
      "<h1>Description</h1>" +
      "</div><br>" +
      "<p>" + summary.extract + "</p><br>" +
      "<p style='font-size:0.9rem;'>from <a href=" + summary.content_urls.desktop.page + " target='_blank'><u>Wikipedia</u></a></p>"; +
        "</div>"

    text.innerHTML = "";
    citation.innerHTML = "";
  }
  else {
    if (annotations[realIndex - 1].annotation_type == "video") {
      media.innerHTML = "";
      text.innerHTML = ""
      citation.innerHTML = "";
      video.innerHTML = ""
      video.style.setProperty("display", "block");
      video.innerHTML += "<iframe style='width:100%; height:77.5vh; class='fade' src=" + annotations[realIndex - 1].url + "></iframe>";
    }
    else {
      video.innerHTML = ""
      video.style.setProperty("display", "none")
      media.innerHTML = "";
      media.innerHTML += "<div style='width:100%; height:100%; text-align:center;' class='fade'><img class='center' style='width:100%; height:50vh;' src=" + encodeURI(decodeURI(annotations[realIndex - 1].url)) + " alt='Annotation number " + annotations[realIndex - 1].annotation_no + " [--dev local image?]'></div>";
      text.innerHTML = ""
      text.innerHTML += "<br><p style='margin:auto; text-align:center;' class='fade'>" + dbCitation[realIndex - 1][0].annotation + "</p>";
      citation.innerHTML = "";
      citation.innerHTML += "<br><p class='fade' style='text-align:center;width:95%'> Photo by: " + dbCitation[realIndex - 1][0].author + ", licensed under <a href='https://creativecommons.org/share-your-work/cclicenses/' targe='_blank'>" + dbCitation[realIndex - 1][0].license + "</p>";
    }
  }

} 