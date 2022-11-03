import { useEffect, useState } from "react";
import CadastradorParametros from "../../shared/services/Cadastrar/cadastradorParametros";
import {
  Botao,
  Resultado,
  Selecionar,
  InserirNumero,
  BotaoVoltar,
  Text,
  SelecionarComRetorno,
} from "../../shared/components";
import "./calculo.css";
import ResgatarResultado from "../../shared/services/Resgatar/resgateResultado";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ListarAeronaves from "../../shared/services/Resgatar/listarAeronaves";

export const Calculo = () => {
  const [result, setresult] = useState<number>(0);
  const [aircraftModel, setaircraftModel] = useState<number>(0);
  const [wind, setwind] = useState<number>(0);
  const [windDirection, setwindDirection] = useState<number>(0);
  const [motor, setmotor] = useState<number>(0);
  const [temp, settemp] = useState<number>(0);
  const [slope, setslope] = useState<number>(0);
  const [slopeDirection, setslopeDirection] = useState<number>(0);
  const [weight, setweight] = useState<number>(0);
  const [certification, setcertification] = useState<number>(0);
  const [airportAltitude, setairportAltitude] = useState<number>(0);
  const [overspeed, setoverspeed] = useState<number>(0);
  const [reverser, setreverser] = useState<number>(0);
  const [airstripCondition, setairstripCondition] = useState<number>(0);
  const [iceBuildup, seticeBuildup] = useState<number>(0);
  const [landingFlap, setlandingFlap] = useState<number>(0);

  const [aeronavesNome, setaeronavesNome] = useState();
  const [aeronavesMotor, setaeronavesMotor] = useState();

  // history para volta ao menu
  const history = useNavigate();

  var params = {
    aircraftModel: aircraftModel,
    wind: wind,
    windDirection: windDirection,
    motor: motor,
    temp: temp,
    slope: slope,
    slopeDirection: slopeDirection,
    weight: weight,
    certification: certification,
    airportAltitude: airportAltitude,
    overspeed: overspeed,
    reverser: reverser,
    airstripCondition: airstripCondition,
    iceBuildup: iceBuildup,
    landingFlap: landingFlap,
  };

  // let opcoes: Array<Object>;
  // let modelos = [{ nome: "Default airplane", valor: 1 }];
  let motors = [{ nome: "Default motor", valor: 0 }];
  let winds = [
    { nome: "Head Wind", valor: 0 },
    { nome: "Tail Wind", valor: 1 },
  ];
  let slopeAngles = [
    { nome: "Uphill", valor: 0 },
    { nome: "Downhill", valor: 1 },
  ];
  let reversers = [
    { nome: "All operating", valor: 0 },
    { nome: "One inoperating", valor: 1 },
    { nome: "All inoperating", valor: 2 },
  ];
  let airstripConditions = [
    { nome: "Dry", valor: 6 },
    { nome: "Wet", valor: 5 },
    { nome: "Compact Snow", valor: 4 },
    { nome: "Loose Snow", valor: 3 },
    { nome: "Standing Water", valor: 2 },
    { nome: "Ice", valor: 1 },
  ];
  let iceOptions = [
    { nome: "Without Ice", valor: 0 },
    { nome: "With Ice", valor: 1 },
  ];
  let flapOptions = [
    { nome: "Flap 220", valor: 0 },
    { nome: "Flap 450", valor: 1 },
  ];
  let certifications = [{ nome: "Default Certification", valor: 0 }];

  //voltar para o menu!!!!

  const handleVoltar = () => {
    history("/menu");
  };

  const getAeronaves = () => {
    let listarAeronaves = new ListarAeronaves();
    let retorno = listarAeronaves.resgatar();

    retorno.then((elementos) => {
      setaeronavesNome(
        elementos.map((aviao) => (
          <option key={aviao.idcadastro} value={aviao.name}>
            {aviao.name}
          </option>
        ))
      );
      setaeronavesMotor(
        elementos.map((aviao) => (
          <option key={aviao.idcadastro}>{aviao.motor}</option>
        ))
      );
    });
  };

  const submeterCalculo = (e) => {
    e.preventDefault();
    // enviar parametros
    let resgatarResultado = new ResgatarResultado();
    let cadastrar = new CadastradorParametros();
    const retorno = resgatarResultado.resgatar();
    retorno.then((resultado) => setresult(resultado["result"]));

    cadastrar.cadastrar(params);
  };

  useEffect(getAeronaves, []);
  return (
    <>
      <BotaoVoltar
        tipo="button"
        className="aircraftBackButton"
        onClick={handleVoltar}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </BotaoVoltar>

      <Text tipo="aircraftTitle">Landing Distance Calculator</Text>

      <div className="calculadora">
        <form onSubmit={submeterCalculo}>
          <div className="insercao">

            <SelecionarComRetorno
              set={aeronavesNome}
              id="aircraftModels"
              children="Aircraft Models"
            />

            <SelecionarComRetorno
              set={aeronavesMotor}
              id="motor"
              children="Motor"
            />

            <Selecionar
              label="Landing Flap"
              id="landingFlap"
              onChange={setlandingFlap}
              opcoes={flapOptions}
            />

            <Selecionar
              label="Certification"
              id="certification"
              onChange={setcertification}
              opcoes={certifications}
            />

            <Selecionar
              label="Ice Build Up"
              id="iceBuildup"
              onChange={seticeBuildup}
              opcoes={iceOptions}
            />

            <Selecionar
              label="Reverser"
              id="reverser"
              onChange={setreverser}
              opcoes={reversers}
            />

            <Selecionar
              label="Airstrip Condition"
              id="airstripCondition"
              onChange={setairstripCondition}
              opcoes={airstripConditions}
            />

            <Selecionar
              label="Slope Angle"
              id="slopeAngle"
              onChange={setslopeDirection}
              opcoes={slopeAngles}
            />

            <Selecionar
              label="Wind Direction"
              id="windDirection"
              opcoes={winds}
              onChange={setwindDirection}
            />

            <InserirNumero
              Children="Airplane Weight (Kg)"
              min={10000}
              max={100000}
              intervalo={1000}
              id="weight"
              onChange={setweight}
            />

            <InserirNumero
              Children="Airport Altitude (ft)"
              id="airportAltitude"
              min={0}
              max={16000}
              intervalo={1000}
              onChange={setairportAltitude}
            />

            <InserirNumero
              Children="Overspeed (kt)"
              id="overspeed"
              min={0}
              max={60}
              intervalo={5}
              onChange={setoverspeed}
            />

            <InserirNumero
              Children="Slope (%)"
              min={0}
              max={10}
              intervalo={0.1}
              id="slope"
              onChange={setslope}
            />

            <InserirNumero
              Children="Wind (kt)"
              min={0}
              max={40}
              intervalo={5}
              id="wind"
              onChange={setwind}
            />
          </div>
          <div className="calcBotoes">
            <Botao tipo="submit" texto="Calculate" />
            <Botao tipo="reset" texto="Reset" />
          </div>
        </form>
        <Resultado result={result} />
      </div>
    </>
  );
};
