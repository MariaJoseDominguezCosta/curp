import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import "../assets/css/curp.css";

function Curp() {
  const [validation, setValidation] = useState("");
  const [randomCode, setRandomCode] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setPrimerApellido] = useState("");
  const [apellidoMaterno, setSegundoApellido] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [sexo, setSexo] = useState("");
  const [entidadNacimiento, setEntidadNacimiento] = useState("");
  const [curp, setCurpGenerada] = useState("");

  const comunes = [
    "MARIA DEL ",
    "Maria Del ",
    "Maria del ",
    "Maria de los ",
    "Maria De Los ",
    "MARIA DE LOS ",
    "Maria ",
    "María ",
    "MARIA ",
    "Jose De ",
    "Jose de ",
    "JOSE DE ",
    "José ",
    "Jose  ",
    "JOSE ",
    "MA. ",
    "Ma. ",
    "MA ",
    "Ma ",
    "M. ",
    "J. ",
    "J ",
    "M ",
  ];

  const malasPalabras = {
    BACA: "BXCA",
    BAKA: "BXKA",
    BUEI: "BXEI",
    BUEY: "BXEY",
    CACA: "CXCA",
    CACO: "CXCO",
    CAGA: "CXGA",
    CAGO: "CXGO",
    CAKA: "CXKA",
    CAKO: "CXKO",
    COGE: "CXGE",
    COGI: "CXGI",
    COJA: "CXJA",
    COJE: "CXJE",
    COJI: "CXJI",
    COJO: "CXJO",
    COLA: "CXLA",
    CULO: "CXLO",
    FALO: "FXLO",
    FETO: "FXTO",
    GETA: "GXTA",
    GUEI: "GXEI",
    GUEY: "GXEY",
    JETA: "JXTA",
    JOTO: "JXTO",
    KACA: "KXCA",
    KACO: "KXCO",
    KAGA: "KXGA",
    KAGO: "KXGO",
    KAKA: "KXKA",
    KAKO: "KXKO",
    KOGE: "KXGE",
    KOGI: "KXGI",
    KOJA: "KXJA",
    KOJE: "KXJE",
    KOJI: "KXJI",
    KOJO: "KXJO",
    KOLA: "KXLA",
    KULO: "KXLO",
    LILO: "LXLO",
    LOCA: "LXCA",
    LOCO: "LXCO",
    LOKA: "LXKA",
    LOKO: "LXKO",
    MAME: "MXME",
    MAMO: "MXMO",
    MEAR: "MXAR",
    MEAS: "MXAS",
    MEON: "MXON",
    MIAR: "MXAR",
    MION: "MXON",
    MOCO: "MXCO",
    MOKO: "MXKO",
    MULA: "MXLA",
    MULO: "MXLO",
    NACA: "NXCA",
    NACO: "NXCO",
    PEDA: "PXDA",
    PEDO: "PXDO",
    PENE: "PXNE",
    PIPI: "PXPI",
    PITO: "PXTO",
    POPO: "PXPO",
    PUTA: "PXTA",
    PUTO: "PXTO",
    QULO: "QXLO",
    RATA: "RXTA",
    ROBA: "RXBA",
    ROBE: "RXBE",
    ROBO: "RXBO",
    RUIN: "RXIN",
    SENO: "SXNO",
    TETA: "TXTA",
    VACA: "VXCA",
    VAGA: "VXGA",
    VAGO: "VXGO",
    VAKA: "VXKA",
    VUEI: "VXEI",
    VUEY: "VXEY",
    WUEI: "WXEI",
    WUEY: "WXEY",
  };

  function generateRandomCode() {
    return Math.floor(10 + Math.random() * 90);
  }

  const handleRandomCodeGeneration = () => {
    const code = generateRandomCode();
    setRandomCode(code);
    sessionStorage.setItem("randomCode", code);
  };

  useEffect(() => {
    const storedCode = sessionStorage.getItem("randomCode");
    if (storedCode) {
      setRandomCode(storedCode);
    } else {
      handleRandomCodeGeneration();
    }
  }, []);

  const handleFechaChange = (e) => {
    const value = e.target.value;
    setFechaNacimiento(value);
  };

  function generar() {
    let curpGenerada = "";
    const pad = zeropad.bind(null, 2);

    nombre == ajustaCompuesto(normalizaString(nombre.toUpperCase())).trim();

    apellidoPaterno ==
      ajustaCompuesto(normalizaString(apellidoPaterno.toUpperCase())).trim();

    apellidoMaterno == apellidoMaterno || "";
    apellidoMaterno ==
      ajustaCompuesto(normalizaString(apellidoMaterno.toUpperCase())).trim();

    const nombreUsar = obtenerNombreUsar(nombre);
    const inicialNombre = nombreUsar.substring(0, 1);

    let vocalApellido = apellidoPaterno
      .substring(1)
      .replace(/[BCDFGHJKLMNÑPQRSTVWXYZ]/g, "")
      .substring(0, 1)
      .trim();
    vocalApellido = vocalApellido === "" ? "X" : vocalApellido;

    let primeraLetraPaterno = apellidoPaterno.substring(0, 1);
    primeraLetraPaterno =
      primeraLetraPaterno === "Ñ" ? "X" : primeraLetraPaterno;

    let primeraLetraMaterno = "";
    if (!apellidoMaterno || apellidoMaterno === "") {
      primeraLetraMaterno = "X";
    } else {
      primeraLetraMaterno = apellidoMaterno.substring(0, 1);
      primeraLetraMaterno =
        primeraLetraMaterno === "Ñ" ? "X" : primeraLetraMaterno;
    }

    let posicionUnoCuatro = [
      primeraLetraPaterno,
      vocalApellido,
      primeraLetraMaterno,
      inicialNombre,
    ].join("");

    posicionUnoCuatro = removerMalasPalabras(
      filtraCaracteres(posicionUnoCuatro)
    );
    const posicionCatorceDieciseis = [
      primerConsonante(apellidoPaterno),
      primerConsonante(apellidoMaterno),
      primerConsonante(nombreUsar),
    ].join("");

    fechaNacimiento == fechaNacimiento.split("-");

    curpGenerada = [
      posicionUnoCuatro,
      pad(fechaNacimiento.slice(2, 4)),
      pad(fechaNacimiento.slice(5, 7)),
      pad(fechaNacimiento.slice(8, 10)),
      sexo,
      entidadNacimiento,
      filtraCaracteres(posicionCatorceDieciseis),
    ].join("");

    curpGenerada += getSpecialChar(fechaNacimiento[2]);
    curpGenerada += agregaDigitoVerificador(curpGenerada);

    return curpGenerada;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validation !== randomCode.toString()) {
      alert("Código de verificación incorrecto.");
      return;
    }
    if (!nombre) throw new Error("Nombre es requerido");
    if (!apellidoPaterno) throw new Error("Apellido Paterno es requerido");
    if (!apellidoMaterno) throw new Error("Apellido Materno es requerido");
    if (!fechaNacimiento) throw new Error("Fecha de nacimiento es requerido");
    if (!sexo) throw new Error("Genero es requerido");
    if (!entidadNacimiento) throw new Error("Estado es requerido");

    const curp = generar();
    setCurpGenerada(curp);
  };

  function primerConsonante(str) {
    str = str
      .substring(1)
      .replace(/[AEIOU]/gi, "")
      .substring(0, 1)
      .trim();
    return str === "" || str === "Ñ" ? "X" : str;
  }
  function descargarArchivo(curp) {
    const elemento = document.createElement("a");
    const archivo = new Blob([curp], { type: "text/plain" });
    elemento.href = URL.createObjectURL(archivo);
    elemento.download = "curp.txt";
    document.body.appendChild(elemento);
    elemento.click();
    document.body.removeChild(elemento);
  }

  function zeropad(ancho, num) {
    const pad = Array.apply(0, Array.call(0, ancho))
      .map(() => 0)
      .join("");

    return (pad + num).replace(new RegExp("^.*([0-9]{" + ancho + "})$"), "$1");
  }

  function ajustaCompuesto(str) {
    const compuestos = [
      /\bDA\b/,
      /\bDAS\b/,
      /\bDE\b/,
      /\bDEL\b/,
      /\bDER\b/,
      /\bDI\b/,
      /\bDIE\b/,
      /\bDD\b/,
      /\bEL\b/,
      /\bLA\b/,
      /\bLOS\b/,
      /\bLAS\b/,
      /\bLE\b/,
      /\bLES\b/,
      /\bMAC\b/,
      /\bMC\b/,
      /\bVAN\b/,
      /\bVON\b/,
      /\bY\b/,
    ];

    compuestos.forEach((compuesto) => {
      if (compuesto.test(str)) {
        str = str.replace(compuesto, "");
      }
    });

    return str;
  }

  function normalizaString(str) {
    var origen, destino, salida;
    origen = [
      "Ã",
      "À",
      "Á",
      "Ä",
      "Â",
      "È",
      "É",
      "Ë",
      "Ê",
      "Ì",
      "Í",
      "Ï",
      "Î",
      "Ò",
      "Ó",
      "Ö",
      "Ô",
      "Ù",
      "Ú",
      "Ü",
      "Û",
      "ã",
      "à",
      "á",
      "ä",
      "â",
      "è",
      "é",
      "ë",
      "ê",
      "ì",
      "í",
      "ï",
      "î",
      "ò",
      "ó",
      "ö",
      "ô",
      "ù",
      "ú",
      "ü",
      "û",
      "Ç",
      "ç",
    ];
    destino = [
      "A",
      "A",
      "A",
      "A",
      "A",
      "E",
      "E",
      "E",
      "E",
      "I",
      "I",
      "I",
      "I",
      "O",
      "O",
      "O",
      "O",
      "U",
      "U",
      "U",
      "U",
      "a",
      "a",
      "a",
      "a",
      "a",
      "e",
      "e",
      "e",
      "e",
      "i",
      "i",
      "i",
      "i",
      "o",
      "o",
      "o",
      "o",
      "u",
      "u",
      "u",
      "u",
      "c",
      "c",
    ];
    str = str.split("");
    salida = str.map(function (char) {
      var pos = origen.indexOf(char);
      return pos > -1 ? destino[pos] : char;
    });

    return salida.join("");
  }

  function obtenerNombreUsar(nombreP) {
    const nombres = nombreP.trim().split(/\s+/);
    if (nombres.length === 1) return nombres[0];
    console.log(nombres);
    const esNombreComun = comunes.some(
      (nombreComun) => nombre.indexOf(nombreComun) === 0
    );

    if (esNombreComun) {
      return nombres[1];
    }
    return nombres[0];
  }

  function removerMalasPalabras(palabra) {
    if (malasPalabras[palabra]) {
      return malasPalabras[palabra];
    }

    return palabra;
  }

  function filtraCaracteres(str) {
    return str.toUpperCase().replace(/[\d_\-./\\,]/g, "X");
  }

  function agregaDigitoVerificador(incompleteCurp) {
    const dictionary = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
    let lnSum = 0.0;
    let lnDigt = 0.0;
    for (let i = 0; i < 17; i++) {
      lnSum += dictionary.indexOf(incompleteCurp.charAt(i)) * (18 - i);
    }

    lnDigt = 10 - (lnSum % 10);
    if (lnDigt === 10) return 0;
    return lnDigt;
  }

  function getSpecialChar(bornYear) {
    if (bornYear[0] === "1") {
      return "0";
    }

    return "A";
  }

  // function generar() {
  //   let curpGenerada = "";
  //   const pad = zeropad.bind(null, 2);

  //   const nombre = ajustaCompuesto(
  //     normalizaString(nombre.toUpperCase())
  //   ).trim();

  //   const apellidoPaterno = ajustaCompuesto(
  //     normalizaString(apellidoPaterno.toUpperCase())
  //   ).trim();

  //   let apellidoMaterno = apellidoMaterno || "";
  //   apellidoMaterno = ajustaCompuesto(
  //     normalizaString(apellidoMaterno.toUpperCase())
  //   ).trim();

  //   const nombreUsar = obtenerNombreUsar(nombre);
  //   const inicialNombre = nombreUsar.substring(0, 1);

  //   let vocalApellido = apellidoPaterno
  //     .substring(1)
  //     .replace(/[BCDFGHJKLMNÑPQRSTVWXYZ]/g, "")
  //     .substring(0, 1)
  //     .trim();
  //   vocalApellido = vocalApellido === "" ? "X" : vocalApellido;

  //   let primeraLetraPaterno = apellidoPaterno.substring(0, 1);
  //   primeraLetraPaterno =
  //     primeraLetraPaterno === "Ñ" ? "X" : primeraLetraPaterno;

  //   let primeraLetraMaterno = "";
  //   if (!apellidoMaterno || apellidoMaterno === "") {
  //     primeraLetraMaterno = "X";
  //   } else {
  //     primeraLetraMaterno = apellidoMaterno.substring(0, 1);
  //     primeraLetraMaterno =
  //       primeraLetraMaterno === "Ñ" ? "X" : primeraLetraMaterno;
  //   }

  //   let posicionUnoCuatro = [
  //     primeraLetraPaterno,
  //     vocalApellido,
  //     primeraLetraMaterno,
  //     inicialNombre,
  //   ].join("");

  //   posicionUnoCuatro = removerMalasPalabras(
  //     filtraCaracteres(posicionUnoCuatro)
  //   );
  //   const posicionCatorceDieciseis = [
  //     primerConsonante(apellidoPaterno),
  //     primerConsonante(apellidoMaterno),
  //     primerConsonante(nombreUsar),
  //   ].join("");

  //   const fechaNacimiento = fechaNacimiento.split("/");

  //   curpGenerada = [
  //     posicionUnoCuatro,
  //     pad(fechaNacimiento[2] - 1900),
  //     pad(fechaNacimiento[1]),
  //     pad(fechaNacimiento[0]),
  //     sexo,
  //     entidadNacimiento,
  //     filtraCaracteres(posicionCatorceDieciseis),
  //   ].join("");

  //   curpGenerada += getSpecialChar(fechaNacimiento[2]);
  //   curpGenerada += agregaDigitoVerificador(curpGenerada);

  //   return setCurpGenerada(curpGenerada);
  // }

  return (
    <>
      <div className="container">
        <div className="containerform">
          <form className="form" onSubmit={handleSubmit}>
            <div>
              <p className="title">Ingresa tus datos</p>
            </div>
            <div>
              <label>
                <input
                  className="input"
                  type="text"
                  placeholder="Nombre(s)"
                  required=""
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                <input
                  className="input"
                  type="text"
                  placeholder="Primer Apellido"
                  required=""
                  value={apellidoPaterno}
                  onChange={(e) => setPrimerApellido(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                <input
                  className="input"
                  type="text"
                  placeholder="Segundo Apellido"
                  required=""
                  value={apellidoMaterno}
                  onChange={(e) => setSegundoApellido(e.target.value)}
                />
              </label>
            </div>
            <div className="flexdate">
              <div>
                <label>
                  <input
                    className="input"
                    type="date"
                    placeholder="fecha de nacimiento"
                    required=""
                    value={fechaNacimiento}
                    onChange={handleFechaChange}
                  />
                </label>
              </div>
            </div>
            <label>
              <select
                className="input"
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
              >
                <option value="">Género</option>
                <option value="H">Hombre</option>
                <option value="M">Mujer</option>
              </select>
            </label>
            <label>
              <select
                className="input"
                value={entidadNacimiento}
                onChange={(e) => setEntidadNacimiento(e.target.value)}
              >
                <option value="">Selecciona tu entidad de nacimiento</option>
                <option value="CS">Chiapas</option>
              </select>
            </label>
            <div className="flex">
              <div>
                <button
                  className="generationcode"
                  type="button"
                  onClick={handleRandomCodeGeneration}
                >
                  {" "}
                  Generar código
                </button>
                <span>{randomCode}</span>
              </div>
              <div>
                <input
                  className="input"
                  type="text"
                  placeholder="Código de verificación"
                  value={validation}
                  onChange={(e) => setValidation(e.target.value)}
                />
              </div>
            </div>
            <button className="generation" type="submit">
              Generar CURP
            </button>
          </form>
        </div>
        <div className="info">
          {curp && (
            <div className="curp">
              <p>Datos del solicitante de la curp:</p>
              <p>Nombre(s): {nombre}</p>
              <p>Primer apellido: {apellidoPaterno}</p>
              <p>Segundo apellido: {apellidoMaterno}</p>
              <p>Sexo: {sexo}</p>
              <p>Fecha de nacimiento: {fechaNacimiento}</p>
              <p>Entidad de nacimiento: {entidadNacimiento}</p>
              <p>CURP: {curp}</p>
              <QRCode value={curp} size={90} />
              <div>
                <button
                  className="generationQR"
                  onClick={() => descargarArchivo(curp)}
                >
                  Descargar CURP
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Curp;
