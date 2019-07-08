import MasterPage from '../components/Master';
import fetch from 'isomorphic-unfetch';
import Precio from '../components/Precio';
import Noticias from '../components/Noticias';
import Eventos from '../components/Eventos';


const Index = (props) =>  (
    <MasterPage>
        <div className="row">
            
            <div className="col-12">
            <h2 className="my-4">Precio del Bitcoin</h2>
            <Precio 
                precio={props.precioBitcoin}
            />
            </div>

            <div className="col-md-8">
            <h2 className="my-4">Noticias sobre Bitcoin</h2>
            <Noticias 
                noticias={props.noticias}
            />
            </div>

            <div className="col-md-4">
            <h2 className="my-4">Proximos eventos</h2>
            <Eventos 
                eventos={props.eventos}
            /> 
            </div>
        </div>
    </MasterPage>
);

Index.getInitialProps = async () => {
    const precio = await fetch('https://api.coinmarketcap.com/v2/ticker/1/');
    const noticias = await fetch('https://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&apiKey=637a4824d18f44c4819e933b42275591&language=en');
    const eventos = await fetch('https://www.eventbriteapi.com/v3/events/search/?q=bitcoin&sort_by=date&location.address=mexico&token=HYJQYZ37LPC7PREHURBP');


    const resPrecio = await precio.json();
    const resNoticias = await noticias.json();
    const resEventos = await eventos.json();

    return {
        precioBitcoin: resPrecio.data.quotes.USD,
        noticias : resNoticias.articles,
        eventos: resEventos.events
    }

}

export default Index