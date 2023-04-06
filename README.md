## INSTRUCCIONES PARA CORRER LA APLICACION WEB DE KASSANDRA

Este repositorio cuenta con dos paquetes, un servicio web en flask y una aplicacion web en react

## Installation

### Levantando el servidor de Flask ( GPT4 y Flask )
*la descarga e instalacion del modelo es bastante larga ten paciencia en este paso*

```bash
sudo apt-get install ffmpeg
cd ./web-api
pip install -r requeriments.txt
flask run
```

### Levantando la aplicacion web
*debes tener instalado node y yarn en tu pc*
```bash
cd ./web-app
yarn
yarn start
```
Open http://localhost:3000 to view it in the browser.


La version original de esta aplicacion web es de este repositorio: https://github.com/jleonardo007/voice-recorder-ts-version
Yo realice la adaptacion para que funcionara con Kassandra 

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)