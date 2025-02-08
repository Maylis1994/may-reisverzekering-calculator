'use client'

type Result = {
    result: ApiResponse[];
};

const Result = ({ result }: Result) => {
    if (!result) {
        return <p> Geen resultaat! </p>
    }
    const tijdelijkeReisverzekering: ApiResponse = result[0];
    const doorlopendeReisverzekering: ApiResponse = result[1];
    return (
        <>
            <div className="result">
                <div >
                    <h2>{tijdelijkeReisverzekering.name}</h2>
                    <p> Kosten per 18+: {tijdelijkeReisverzekering.pricePerGrownup} euro </p>
                    <p> Kosten per kind: {tijdelijkeReisverzekering.pricePerChild} euro</p>
                    <p> Totaal: {tijdelijkeReisverzekering.totalPrice} euro</p>
                    {tijdelijkeReisverzekering.recommendedResult && <p>Onze aanbeveling!</p>}
                </div>

                <div>
                    <h2>{doorlopendeReisverzekering.name}</h2>
                    <p> Totaal: {doorlopendeReisverzekering.totalPrice} euro</p>

                    {doorlopendeReisverzekering.recommendedResult && <p>Onze aanbeveling!</p>}
                </div>
            </div>
        </>
    );

};

export default Result;
