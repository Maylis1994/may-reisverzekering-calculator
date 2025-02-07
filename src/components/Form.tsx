'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const dataFromFormValidator = z.object({
    dateOfBirth: z.coerce.date(),
    travelDays: z.number().min(0),
    amountOfGrownups: z.number().min(0),
    amountOfChildren: z.number().min(0),
    postalCode: z.string().regex(/^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/i),
    houseNumber: z.number().min(0),
})

type DataFromForm = z.infer<typeof dataFromFormValidator>;

const Form = () => {

    const handleFormSubmit = (data: DataFromForm) => {
        console.log(data);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DataFromForm>({
        resolver: zodResolver(dataFromFormValidator),
    });

    return <>
        <div>
            <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
                <label>
                    Geboortedatum
                </label>
                <input id="dateOfBirth"  {...register("dateOfBirth")} type="date">
                </input>
                {errors.dateOfBirth && (
                    <p className="error-msg">{errors.dateOfBirth.message}</p>
                )}

                <label>
                    Reisduur (aantal dagen)
                </label>
                <input id="travelDays" {...register("travelDays", { valueAsNumber: true })}>
                </input>
                {errors.travelDays && (
                    <p className="error-msg">{errors.travelDays.message}</p>
                )}

                <label>
                    Aantal personen boven de 18
                </label>
                <input id="amountOfGrownups" {...register("amountOfGrownups", { valueAsNumber: true })} >
                </input>
                {errors.amountOfGrownups && (
                    <p className="error-msg">{errors.amountOfGrownups.message}</p>
                )}

                <label>
                    Aantal personen onder de 18
                </label>
                <input id="amountOfChildren" {...register("amountOfChildren", { valueAsNumber: true })} >
                </input>
                {errors.amountOfChildren && (
                    <p className="error-msg">{errors.amountOfChildren.message}</p>
                )}

                <label> Postcode </label>
                <input id="postalCode" {...register("postalCode")} type="string"></input>
                {errors.postalCode && (
                    <p className="error-msg">{errors.postalCode.message}</p>
                )}

                <label> Huisnummer </label>
                <input id="houseNumber" {...register("houseNumber", { valueAsNumber: true })} ></input>
                {errors.houseNumber && (
                    <p className="error-msg">{errors.houseNumber.message}</p>
                )}

                <button type="submit">Bereken!</button>
            </form>
        </div>
    </>
}


export default Form
