import { IonContent, IonPage, IonText, IonItem, IonLabel, IonInput, IonButton , IonCheckbox} from "@ionic/react";
import React from "react";
import { Controller, useForm } from 'react-hook-form';
import Input, { InputProps } from "../components/Input";

const addWorkoutForm: React.FC = () => {
    const { control, handleSubmit } = useForm();

    const formFields: InputProps[] = [
        {
            name: "workoutName",
            label: "Workout Name",
        },
        {
            name: "dayOfWeek",
            label: "Day of Week",
        },
        {
            name: "muscleGroup",
            label: "Muscle Group"
        },
    ];

    return (
        <IonPage>
            <IonContent>
                <div className="ion-padding">
                    <IonText><h2>Add a New Workout</h2></IonText>

                    <form onSubmit={handleSubmit()}>
                        {formFields.map((field,index) => (
                            <Input {...field} control={control} key={index}/>
                        ))}
                        <IonButton expand="block" type="submit" className="ion-margin-top">
                            Create
                        </IonButton>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    );
};
export default addWorkoutForm;