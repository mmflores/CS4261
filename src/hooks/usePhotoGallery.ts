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
            const photosString = await get (PHOTO_STORAGE);
            const photos = (photosString ? JSON.parse(photosString) : []) as Photo[];
            for (let photo of photos){
                const file = await readFile({
                    path: photo.filepath,
                    directory: FilesystemDirectory.Data
                });
                photo.base64 = `data:image/jpeg;base64,${file.data}`;
            }
            setPhotos(photos);
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

        //ave gallery data
        set (PHOTO_STORAGE, JSON.stringify(newPhotos.map(p => {
            const photoCopy = { ...p};
            delete photoCopy.base64;
            return photoCopy;
        })));
    };

    const savePicture = async (photo: CameraPhoto, fileName: string): Promise<Photo> => {
        const base64Data = await base64FromPath(photo.webPath!);
        const savedFile = await writeFile({
            path: fileName,
            data: base64Data,
            directory: FilesystemDirectory.Data
        });

        return {
            filepath: fileName,
            webviewPath: photo.webPath
        };
    };
    
    return {
      photos, takePhoto
    };
  }