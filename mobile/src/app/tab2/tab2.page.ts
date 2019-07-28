import { Component } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';


@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    cameraPreviewOpts: CameraPreviewOptions = {
        x: 0,
        y: 0,
        width: window.screen.width,
        height: window.screen.height,
        camera: 'rear',
        tapPhoto: true,
        previewDrag: true,
        toBack: true,
        alpha: 1
    }
    constructor(private cameraPreview: CameraPreview) {
    }
    success;
    ngOnInit() {
        this.cameraPreview.startCamera(this.cameraPreviewOpts).then(
            (res) => {
                console.log(res)
            },
            (err) => {
                console.log(err)
            });
            let success;
            let int = setInterval(()=>{
                if(!this.success){
                    clearInterval(int);
                    this.cameraPreview.takePicture(this.pictureOpts).then(()=>{
                        this.success = true;
                        console.log("success ======================================================================================")
                    }).catch(err=>{
                        console.log("error ======================================================================================")
                    })
                }
            },1000)
    }

    picture;
    pictureOpts: CameraPreviewPictureOptions = {
        width: 1280,
        height: 1280,
        quality: 85
      }

    takeSnapshot(){
        this.cameraPreview.takePicture(this.pictureOpts).then((imageData) => {
            this.picture = 'data:image/jpeg;base64,' + imageData;
            console.log(this.picture);
          }, (err) => {
            console.log(err);
            this.picture = 'assets/img/test.jpg';
          });
    }


}
