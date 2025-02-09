'use client'

type Result = {
    result: ApiResponse[];
};

const Result = ({ result }: Result) => {
    const kortlopendeReisverzekering: ApiResponse = result[0];
    const doorlopendeReisverzekering: ApiResponse = result[1];
    return (
        <>
            <div className="results">
                <div className={`${kortlopendeReisverzekering.recommendedResult ? 'recommendedResult result' : 'result'}`}>
                    <div className="result__text">
                        <h2>{kortlopendeReisverzekering.name}</h2>
                        <div>
                            <p> Totale kosten per dag: {kortlopendeReisverzekering.pricePerDayTotal} euro</p>
                            <p> Totale kosten boven de 18: {kortlopendeReisverzekering.pricePerGrownupTotal} euro </p>
                            <p> Totale kosten onder de 18: {kortlopendeReisverzekering.pricePerChildTotal} euro</p>
                        </div>
                        <p className="font-bold"> Totaal: {kortlopendeReisverzekering.totalPrice} euro</p>
                    </div>
                    {kortlopendeReisverzekering.recommendedResult && <p className="recommendedResultBanner">Onze aanbeveling!</p>}
                </div>

                <div className={`${doorlopendeReisverzekering.recommendedResult ? 'recommendedResultBanner result' : 'result'}`}>
                    <div className="result__text">
                        <h2>{doorlopendeReisverzekering.name}</h2>
                        <p> Ga je vaker op reis? Dan is een doorlopende reisverzekering het overwegen waard.</p>
                        <p className="font-bold"> Totaal: {doorlopendeReisverzekering.totalPrice} euro</p>
                    </div>
                    {doorlopendeReisverzekering.recommendedResult && <p className="recommendedResultBanner">Onze aanbeveling!</p>}
                </div>
            </div>
        </>
    );
};

export default Result;
