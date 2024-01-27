'use client';
import Sketchfab from '@sketchfab/viewer-api';
import { useEffect } from 'react';

export default function HomeModel() {

  const homeModel = () => {
    var iframe = document.getElementById('homeModel');
    var uid = '611560e2f07e436ca7eef747b77968ce';
    var client = new Sketchfab(iframe);

    client.init(uid, {
      success: function onSuccess(api: any) {
        api.start();
        api.addEventListener('viewerready', function () {
          api.getMaterialList(function (err: any, materials: any) {
            const xylem = materials[0]
            const phloem = materials[3]
            const bark = materials[1]
            const needles = materials[4]

            var sliderDiv = document.getElementById('sliderDiv');

            var setOpacity = function setOpacity(opacity: any, material: any) {
              material.channels.Opacity.enable = true;
              material.channels.Opacity.type = 'alphaBlend';
              material.channels.Opacity.factor = opacity;
              api.setMaterial(material, function () {
              });
            }

            if (sliderDiv) {
              sliderDiv.innerHTML = "";
              sliderDiv.innerHTML +=
                "<p style='font-size: 1.25rem; line-height: 1.75rem; padding-bottom:2rem;'>Welcome to the <span style='color: #FFC72C;'>3D</span> Digital Herbarium</p>" +
                "<p style='border-bottom: solid 1px; padding-bottom: 2.5%;'>Check out our 3D Models on the Collections page, see user uploads on iNaturalist or identify an unknown specimen with Plant.id. You can also see interior components of a pine tree below with our newest, experimental feature!</p><br>" +
                "<div class='fade' style='display:grid; height: 50%; grid-template-columns: repeat(1, minmax(0, 1fr)); grid-template-rows: repeat(3, minmax(0, 1fr))'>" +
                "<div id='barkSection' style='height: 15%; width: 100%;'>" +
                "<p style='font-size: 1.25rem; line-height: 1.75rem'><i>Pinus</i> (Pine)</p>" +
                "Pinus is a genus of gymnosperms in the family Pinaceae. There are many living representatives of this genus in California and throughout the world." +
                "</div>" +
                "<div id='phloemSection' style='height: 15%; width: 100%; opacity: 0'>" +
                "<p style='font-size: 1.25rem; line-height: 1.75rem'>Phloem (100x magnified)</p>" +
                "In Pinus wood, we also have phloem cells that make up a portion of the vascular tissue that is located outside of the xylem." +
                "</div>" +
                "<div id='xylemSection' style='height: 15%; width: 100%; opacity: 0'>" +
                "<p style='font-size: 1.25rem; line-height: 1.75rem'>Xylem (40x magnified)</p>" +
                "In Pinus wood, there are specialized cells known as xylem which are responsible for transporting water and minerals throughout the plant body." +
                "</div>" +
                "</div>" +

                "<div class='fade' style='width: 100%; padding-top:5%; text-align:center'>" +
                "<input id='opacitySlider' type='range' min='0' max='300' step='1' value='300'></input><div><br><br>" +
                "<p>Annotated by: Heather Davis</p>" +
                "<p>Model by: AJ Bealum</p>";

              var barkSection = document.getElementById('barkSection');
              var phloemSection = document.getElementById('phloemSection');
              var xylemSection = document.getElementById('xylemSection');

              sliderDiv.addEventListener("input", (event) => {
                //@ts-ignore
                const val = event.target.value;

                                if(val > 200 && barkSection && phloemSection && xylemSection){
                                    const opacity = (val - 200) / 100;
                                    setOpacity(1, xylem);
                                    setOpacity(1, phloem);
                                    setOpacity(opacity, bark);
                                    setOpacity(opacity, needles);
                                    barkSection.style.opacity = "" + opacity;
                                    phloemSection.style.opacity = "" + (1 - opacity);
                                    xylemSection.style.opacity = "0"
                                }
                                else if(val == 200 && barkSection && phloemSection && xylemSection){
                                    setOpacity(1, xylem);
                                    setOpacity(1, phloem);
                                    setOpacity(0, bark);
                                    setOpacity(0, needles);
                                    barkSection.style.opacity = "0";
                                    phloemSection.style.opacity = "1";
                                    xylemSection.style.opacity = "0";
                                }
                                else if(val < 200 && val > 100 && barkSection && phloemSection && xylemSection){
                                    const opacity = (val - 100) / 100;
                                    setOpacity(1, xylem);
                                    setOpacity(opacity, phloem);
                                    setOpacity(0, bark);
                                    setOpacity(0, needles);
                                    barkSection.style.opacity = "0";
                                    phloemSection.style.opacity = "" + opacity;
                                    xylemSection.style.opacity = "" + (1 - opacity);
                                }
                                else if(val == 100 && barkSection && phloemSection && xylemSection){
                                    setOpacity(1, xylem);
                                    setOpacity(0, phloem);
                                    setOpacity(0, bark);
                                    setOpacity(0, needles);
                                    barkSection.style.opacity = "0";
                                    phloemSection.style.opacity = "0";
                                    xylemSection.style.opacity = "1"
                                }
                                else{
                                    if(barkSection && phloemSection && xylemSection){
                                        const opacity = val / 100;
                                        setOpacity(opacity, xylem);
                                        setOpacity(0, phloem);
                                        setOpacity(0, bark);
                                        setOpacity(0, needles);
                                        barkSection.style.opacity = "0";
                                        phloemSection.style.opacity = "0";
                                        xylemSection.style.opacity = "" + opacity;
                                    }
                                }
                            })
                        }
                    });
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
            ui_color: "004C46",
            ui_fadeout: 0
        })
    };

  useEffect(() => {
    homeModel()
  }, []);

  return (
    <>
      <iframe src="" frameBorder="0" id="homeModel" title={"Model Viewer for " + ''}
        allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking="true"
        execution-while-out-of-viewport="true" execution-while-not-rendered="true" web-share="true"
        allowFullScreen
        style={{ transition: "width 1.5s", zIndex: "2" }}
        className='h-full w-full lg:w-3/5'
      />
    </>
  )
}