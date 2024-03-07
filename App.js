import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import axios from 'axios';
import { Provider as PaperProvider, Button, TextInput, Text, Snackbar, Appbar, Menu, Chip, DefaultTheme} from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import {expo} from './app.json'
export default function App() {

const [entrada, setEntrada] = useState('');
const [saida, setSaida] = useState('R$ 0,00');
const [dolar, setDolar] = useState(0);
const [euro, setEuro] = useState(0);
const [libra, setLibra] = useState(0);
const [iene, setIene] = useState(0);
const [dolarAustraliano, setDolarAustraliano] = useState(0);
const [francoSuico, setFrancoSuico] = useState(0);
const [dolarCanadense, setDolarCanadense] = useState(0);
const [yuan, setYuan] = useState(0);
const [pesoArgentino, setPesoArgentino] = useState(0);
const [liraTurca, setLiraTurca] = useState(0);
const [dolarHongKong, setDolarHongKong] = useState(0);
const [dolarNeozelandes, setDolarNeozelandes] = useState(0);
const [dolarSingapura, setDolarSingapura] = useState(0);
const [coroaNorueguesa, setCoroaNorueguesa] = useState(0);
const [pesoMexicano, setPesoMexicano] = useState(0);
const [rupiaIndiana, setRupiaIndiana] = useState(0);
const [rublo, setRublo] = useState(0);
const [dirham, setDirham] = useState(0); 
const [coroaSueca, setCoroaSueca] = useState(0);

const [updateInfo, setUpdateInfo] = useState(' ');
const [moeda, setMoeda] = useState("");
const [errorMessage, setErrorMessage] = useState('');

const [showErrorMessage, setShowErrorMessage] = useState(false);
const [showDropDown, setShowDropDown] = useState(false);
const [showAbout, setShowAbout] = useState(false);
const [showHome, setShowHome] = useState(true);
const [menuVisible, setMenuVisible] = useState(false);

const currencyList = [
  { label: "Dólar", value: "usd" },
  { label: "Euro", value: "eur" },
  { label: "Libra", value: "gbp" },
  { label: "Iene", value: "jpy" },
  { label: "Dólar Australiano", value: "aud" },
  { label: "Franco Suiço", value: "chf" },
  { label: "Dólar Canadense", value: "cad" },
  { label: "Yuan", value: "cny" },
  { label: "Peso Argentino", value: "ars" },
  { label: "Lira Turca", value: "try" },
  { label: "Dólar Hong Kong", value: "hkd" },
  { label: "Dólar Neozelandês", value: "nzd" },
  { label: "Dólar Singapura", value: "sgd" },
  { label: "Coroa Norueguesa", value: "nok" },
  { label: "Peso Mexicano", value: "mxn" },
  { label: "Rupia Indiana", value: "inr" },
  { label: "Rublo", value: "rub" },
  { label: "Dirham", value: "aed" },
  { label: "Coroa Sueca", value: "sek" },
];

const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  dark: false, 
  colors: {
    ...DefaultTheme.colors,
    primary: '#0059AD',
  },
};

const getMonetary = () => {
  axios.get('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL,JPY-BRL,AUD-BRL,CHF-BRL,CAD-BRL,CNY-BRL,ARS-BRL,TRY-BRL,HKD-BRL,NZD-BRL,SEK-BRL,NOK-BRL,BRL-KRW,SGD-BRL,MXN-BRL,INR-BRL,RUB-BRL,AED-BRL')
    .then(res => {
      handlerMonetary(res.data);
    }).catch(err => {
      console.log(err)
    });
}

useEffect(() => {
  getMonetary();
}, []);

const handlerMonetary = (data) => {
  setDolar(data.USDBRL);
  setEuro(data.EURBRL);
  setLibra(data.GBPBRL);
  setIene(data.JPYBRL);
  setDolarAustraliano(data.AUDBRL);
  setFrancoSuico(data.CHFBRL);
  setDolarCanadense(data.CADBRL);
  setYuan(data.CNYBRL);
  setPesoArgentino(data.ARSBRL);
  setLiraTurca(data.TRYBRL);
  setDolarHongKong(data.HKDBRL);
  setDolarNeozelandes(data.NZDBRL);
  setDolarSingapura(data.SGDBRL);
  setCoroaSueca(data.SEKBRL);
  setCoroaNorueguesa(data.NOKBRL);
  setPesoMexicano(data.MXNBRL);
  setRupiaIndiana(data.INRBRL);
  setRublo(data.RUBBRL);
  setDirham(data.AEDBRL);
}


const handlerUpdateInfo = (date) => {
const dt = date;
setUpdateInfo(`Atualizado em ${dt.substring(8, 10)}/${dt.substring(5, 7)}/${dt.substring(2, 4)} às ${dt.substring(11, 16)}`);
}

function calc(moedaEscolhida, simboloMoeda){
  setSaida(`${simboloMoeda}${entrada} = R$ ${(entrada * moedaEscolhida).toFixed(2).replace('.', ',')}`);
  setShowErrorMessage(false);
}


const handlerInputs = () => {
  
  if(entrada === '' && moeda === ''){
    setErrorMessage('Digite um valor e selecione uma moeda');
  }
  else if (entrada === '') {
    setShowErrorMessage(true);
    setErrorMessage('Digite um valor');
    return;
  }
  else if(moeda === ''){
    setErrorMessage('Selecione uma moeda');
    return;
  } 
  else if(entrada<1){
    setShowErrorMessage(true);
    setErrorMessage('Digite um valor maior que zero');
    return;
  }

  switch(moeda){
    case 'usd':  
      calc(dolar.bid, "$");
      handlerUpdateInfo(dolar.create_date);
      break;
    case 'eur':
      calc(euro.bid, "€");
      handlerUpdateInfo(euro.create_date);
      break;
    case 'gbp':
      calc(libra.bid, "£");
      handlerUpdateInfo(libra.create_date);
      break;
    case 'jpy':
      calc(iene.bid, "¥");
      handlerUpdateInfo(iene.create_date);
      break;
    case 'aud':
      calc(dolarAustraliano.bid, "A$");
      handlerUpdateInfo(dolarAustraliano.create_date);
      break;
    case 'chf':
      calc(francoSuico.bid, "₣");
      handlerUpdateInfo(francoSuico.create_date);
      break;
    case 'cad':
      calc(dolarCanadense.bid, "C$");
      handlerUpdateInfo(dolarCanadense.create_date);
      break;
    case 'cny':
      calc(yuan.bid, "¥");
      handlerUpdateInfo(yuan.create_date);
      break;
    case 'ars':
      calc(pesoArgentino.bid, "$");
      handlerUpdateInfo(pesoArgentino.create_date);
      break;
    case 'try':
      calc(liraTurca.bid, "₺");
      handlerUpdateInfo(liraTurca.create_date);
      break;
    case 'hkd':
      calc(dolarHongKong.bid, "HK$");
      handlerUpdateInfo(dolarHongKong.create_date);
      break;
    case 'nzd':
      calc(dolarNeozelandes.bid, "NZ$");
      handlerUpdateInfo(dolarNeozelandes.create_date);
      break;
    case 'sgd':
      calc(dolarSingapura.bid, "S$");
      handlerUpdateInfo(dolarSingapura.create_date);
      break;
    case 'sek':
      calc(coroaSueca.bid, "kr");
      handlerUpdateInfo(coroaSueca.create_date);
      break;
    case 'nok':
      calc(coroaNorueguesa.bid, "kr");
      handlerUpdateInfo(coroaNorueguesa.create_date);
      break;
    case 'mxn':
      calc(pesoMexicano.bid, "$");
      handlerUpdateInfo(pesoMexicano.create_date);
      break;
    case 'inr':
      calc(rupiaIndiana.bid, "₹");
      handlerUpdateInfo(rupiaIndiana.create_date);
      break;
    case 'rub':
      calc(rublo.bid, "₽");
      handlerUpdateInfo(rublo.create_date);
      break;
    case 'aed':
      calc(dirham.bid, "د.إ");
      handlerUpdateInfo(dirham.create_date);
      break;
    default:
      setSaida('R$ 0,00');
      setShowErrorMessage(true);
  }

}

  return (
    <PaperProvider theme={theme}>
    <Appbar.Header>
        <Appbar.Content title="Conversor de Moedas" />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={<Appbar.Action icon="menu" onPress={() => setMenuVisible(true)}/>}>
          <Menu.Item  title="Conversor" onPress={() => setShowHome(true) & setShowAbout(false)} icon={'calculator'} />
          <Menu.Item  title="Sobre"   onPress={() => setShowAbout(true) & setShowHome(false)} icon={'information-outline'}/>
          <Menu.Item  title="Avalie" onPress={() => Linking.openURL("market://details?id=com.rubenfilipe07.currency_converter") } icon={'star'}/>
        </Menu>
      </Appbar.Header>
     
        {showHome && (
           <View style={styles.container}>
 <TextInput onChangeText={setEntrada} style={styles.inputs} value={entrada.toString()}   keyboardType="numeric" label={"Valor"}></TextInput>
      
 <View style={styles.inputs}>
 <DropDown
         label={"Moeda"}
         visible={showDropDown}
         showDropDown={() => setShowDropDown(true)}
         onDismiss={() => setShowDropDown(false)}
         value={moeda}
         setValue={setMoeda}
         list={currencyList}
       />
 </View>

 <Text style={styles.saida}>{saida}</Text>
 <Text style={styles.update}>{updateInfo}</Text>
 <Button onPress={handlerInputs} mode="contained" style={styles.button}>CALCULAR</Button>
 <Text style={styles.footer}>Desenvolvido por Rúben Filipe</Text>
 </View>
        )}
        {showAbout && (
          <View style={styles.container}>
            <Text style={styles.aboutHeader}>Sobre o aplicativo</Text>
            <Text style={styles.aboutText}>Este aplicativo é um projeto open source e todo código fonte está contido no repositório do github abaixo. As informações da cotação utilizadas nos cálculos são providas pela AwesomeApi.com.br e são de sua responsabilidade.</Text>
            <Button onPress={() => Linking.openURL("https://github.com/ottosamuel01/Conversor_de_Moedas")} mode="contained" style={styles.button} color="#f5f5f5" icon={'github'}>Github Repo</Button>
            <Chip style={styles.reactNativeBadge} icon="react" mode="outlined" selectedColor="#15add6">Feito com React Native</Chip>
            <Text style={styles.footer}>Versão: {expo.version}</Text>
          </View>
        )}
   
        <Snackbar
          visible={showErrorMessage}
          onDismiss={() => setShowErrorMessage(false)}
          action={{
            label: 'Ok',
          }}>
          {errorMessage}
        </Snackbar>

      <StatusBar style="auto" />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  saida: {
    fontSize: 35,
    margin: 15,
  },
  inputs: {
    width: '90%',
    height: 64,
    marginBottom: 20,
  },
  button: {
    width: '90%',
    marginTop: 20, 
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    color: '#8c9494',
    left: 'auto',
    right: 'auto',
  },
  aboutHeader: {
    fontSize: 25,
  },
  update: {
    fontSize: 12,
    color: '#8c9494',
  },
  aboutText: {
    width: '90%',
    margin: 15,
  },
  reactNativeBadge: {
    position: 'absolute',
    bottom: 150,
    left: 'auto',
    right: 'auto',
  },

});