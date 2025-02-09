'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const dataFormValidator = z.object({
    dateOfBirth: z
        .string()
        .min(1, { message: "Vul een datum in" })
        .refine((value) => {
            const inputDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return inputDate <= today;
        }, { message: "Datum is in de toekomst. Kies een andere datum" }),
    travelDays: z.number({ message: "Vul een nummer in" }).min(0, { message: "Nummer moet een positief getal zijn" }),
    amountOfGrownups: z.number({ message: "Vul een nummer in" }).min(0, { message: "Nummer moet een positief getal zijn" }),
    amountOfChildren: z.number({ message: "Vul een nummer in" }).min(0, { message: "Nummer moet een positief getal zijn" }),
    postalCode: z.string({ message: "Vul een correcte postcode in (bijv. 1234XX)" }).regex(/^[1-9][0-9]{3}\s?[a-zA-Z]{2}$/i),
    houseNumber: z.number({ message: "Vul een nummer in" }).min(0, { message: "Nummer moet een positief getal zijn" }),
})

type FormData = z.infer<typeof dataFormValidator>;

const Form = ({ setApiResponse, setLoading }: { setApiResponse: (value: ApiResponse[]) => void, setLoading: (value: boolean) => void }) => {


    const handleFormSubmit = async (data: FormData) => {
        setLoading(true)
        const axios = require("axios");
        const AxiosMockAdapter = require("axios-mock-adapter");
        const mock = new AxiosMockAdapter(axios, { delayResponse: 2000 });
        const mockedResponse: ApiResponse[] = [{
            name: "Tijdelijke reisverzekering",
            pricePerDayTotal: data.travelDays * 10,
            pricePerGrownupTotal: data.amountOfGrownups * 8,
            pricePerChildTotal: data.amountOfChildren * 5,
            totalPrice: (data.travelDays * 10) + (data.amountOfGrownups * 8) + (data.amountOfChildren * 5),
            recommendedResult: ((data.travelDays * 10) + (data.amountOfGrownups * 8) + (data.amountOfChildren * 5)) < 200 ? true : false
        },
        {
            name: "Doorlopende reisverzekering",
            totalPrice: 200,
            recommendedResult: ((data.travelDays * 10) + (data.amountOfGrownups * 8) + (data.amountOfChildren * 5)) >= 200 ? true : false
        }] as ApiResponse[];
        mock.onGet("/reisverzekeringresult").reply(200, mockedResponse);
        axios.get("/reisverzekeringresult")
        .then(function (response: any) {
            setLoading(false)
            setApiResponse(response.data)
        })
        .catch(function () { 
            setLoading(false)
        })
    }


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(dataFormValidator),
    });

    return <>
        <div>
            <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
                <div>
                    <label>
                        Geboortedatum
                    </label>
                    <input id="dateOfBirth"  {...register("dateOfBirth")} type="date">
                    </input>
                    {errors.dateOfBirth && (
                        <p className="error-msg">{errors.dateOfBirth.message}</p>
                    )}
                </div>

                <div>
                    <label>
                        Reisduur (aantal dagen)
                    </label>
                    <input id="travelDays" {...register("travelDays", { valueAsNumber: true })}>
                    </input>
                    {errors.travelDays && (
                        <p className="error-msg">{errors.travelDays.message}</p>
                    )}
                </div>

                <div>
                    <label>
                        Aantal personen boven de 18
                    </label>
                    <input id="amountOfGrownups" {...register("amountOfGrownups", { valueAsNumber: true })} >
                    </input>
                    {errors.amountOfGrownups && (
                        <p className="error-msg">{errors.amountOfGrownups.message}</p>
                    )}
                </div>

                <div>
                    <label>
                        Aantal personen onder de 18
                    </label>
                    <input id="amountOfChildren" {...register("amountOfChildren", { valueAsNumber: true })} >
                    </input>
                    {errors.amountOfChildren && (
                        <p className="error-msg"> {errors.amountOfChildren.message}</p>
                    )}
                </div>

                <div>
                    <label> Postcode </label>
                    <input id="postalCode" {...register("postalCode")} type="string"></input>
                    {errors.postalCode && (
                        <p className="error-msg">{errors.postalCode.message}</p>
                    )}
                </div>

                <div>
                    <label> Huisnummer </label>
                    <input id="houseNumber" {...register("houseNumber", { valueAsNumber: true })} ></input>
                    {errors.houseNumber && (
                        <p className="error-msg">{errors.houseNumber.message}</p>
                    )}
                </div>

                <button type="submit">Bereken!</button>
            </form>
        </div>
    </>
}

export default Form
