import { useState, useEffect } from "react";
import { useCamera } from '@ionic/react-hooks/camera';
import { useFilesystem, base64FromPath } from '@ionic/react-hooks/filesystem';
import { useStorage } from '@ionic/react-hooks/storage';
import { isPlatform } from '@ionic/react';
import { CameraResultType, CameraSource, CameraPhoto, Capacitor, FilesystemDirectory, Camera } from "@capacitor/core";

export interface Photo {
    filepath: string;
    webviewPath?:string;
    base64?: string;
}

//constant variables
const PHOTO_STORAGE = "photos";

export function usePhotoGallery() {
    const {deleteFile, getUri, readFile, writeFile} = useFilesystem();
    const {get , set } = useStorage();
    const { getPhoto } = useCamera();

    const [photos, setPhotos] = useState<Photo[]>([]);
  
    //retrieve data when hook loads
    useEffect(() => {
        const loadSaved = async () => {
            const photosString = await get('photos');
            const photosInStorage = (photosString ? JSON.parse(photosString) : []) as Photo[];
            
            //check platform
            //if on web
            if (!isPlatform('hybrid')){
                for (let photo of photosInStorage){
                    const file = await readFile({
                        path: photo.filepath,
                        directory: FilesystemDirectory.Data
                    });
                    photo.base64 = `data:image/jpeg;base64,${file.data}`;
                }
            }
            setPhotos(photosInStorage);
        };
        loadSaved();
    }, [get, readFile]);

    const takePhoto = async () => {
      const cameraPhoto = await getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100
      });

      const fileName = new Date().getTime() + '.jpeg';
      const savedFileImage = await savePicture(cameraPhoto, fileName);
      const newPhotos = [savedFileImage,
            ...photos];
    
        setPhotos(newPhotos);

        //save gallery data
        set (PHOTO_STORAGE, 
            //check platform
            isPlatform('hybrid') ?
            JSON.stringify(newPhotos) :
            JSON.stringify(newPhotos.map(p => {
            const photoCopy = { ...p};
            delete photoCopy.base64;
            return photoCopy;
        })));
    };

    /*
    * this function was changed in this branch to implement platform-specific logic
    */
    const savePicture = async (photo: CameraPhoto, fileName: string): Promise<Photo> => {
        let base64Data: string;
        
        //"hybrid" detects Cordova or Capacitor
        if (isPlatform('hybrid')){
            const file = await readFile({
                path: photo.path!
            });
            base64Data = file.data;
        }
        else{
            base64Data = await base64FromPath(photo.webPath!);
        }

        const savedFile = await writeFile({
            path: fileName,
            data: base64Data,
            directory: FilesystemDirectory.Data
        });

        if (isPlatform('hybrid')){
            //display image by writing file path to HTTP
            return {
                filepath: savedFile.uri,
                webviewPath: Capacitor.convertFileSrc(savedFile.uri),
            };
        }
        else{
            //use webpath to display new image since it's loaded into memory
            return {
                filepath: fileName,
                webviewPath: photo.webPath
            };
        }

    };
    
    return {
      photos, takePhoto
    };
  }