import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavComponent } from '../../../nav/nav.component';
import { FooterComponent } from '../../../footer/footer.component';
import { IniciarEscenaService } from '../../../../services/iniciar-escena.service';
import { CargarlamparaService } from '../../../../services/cargarlampara.service';
import { LucesService } from '../../../../services/luces.service';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CdkAccordionModule, CdkAccordionItem } from '@angular/cdk/accordion';
//import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { GuestServiceService } from '../../../../services/guest-service.service';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-simular-lampara',
    imports: [NavComponent, FooterComponent, FormsModule, CdkAccordionItem, CommonModule,RouterModule],
    templateUrl: './simular-lampara.component.html',
    styleUrl: './simular-lampara.component.css',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SimularLamparaComponent implements AfterViewInit {

  public lamparaSeleccionada: undefined
  public escenarioSeleccionado: any
  public lampara: any



  public lamparas_2: Array<any> = [{
    "nombre": "Alumbrado Publico",
    "electrodomesticos": [
      {

        "potencia": 44,
        "uso_dia": 24,
        "categoria": "Alumbrado_Publico",

        "nombre": 'NSLZ_60',
        "path": '../Modelos/Z60/NuevosLed_z60.gltf',
        "lumens": 11000,
        "distancia": 10,
        "anguloApertura": 70,
        "color": 0xfff5e5,
        "penumbra": 1//de 0 a 1 
      },
      {

        "potencia": 44,
        "uso_dia": 24,
        "categoria": "Alumbrado_Publico",

        "nombre": 'NSLV_40',
        "path": '../Modelos/Z60/NuevosLed_z60.gltf',
        "lumens": 6800,
        "distancia": 10,
        "anguloApertura": 70,
        "color": 0xfff5e5,
        "penumbra": 1//de 0 a 1 
      },
      {

        "potencia": 44,
        "uso_dia": 24,
        "categoria": "Alumbrado_Publico",

        "nombre": 'NSLV_60W',
        "path": '../Modelos/NSLV/NSLV_60W_GLTF.gltf',
        "lumens": 11000,
        "distancia": 10,
        "anguloApertura": 70,
        "color": 0xfff5e5,
        "penumbra": 1//de 0 a 1 
      }
    ]
  },
  {
    "nombre": "Jardines Y Parques",
    "electrodomesticos": [
      {
        "nombre": "Secador de Cabello",
        "potencia": 700,
        "uso_dia": 2,
        "categoria": "Jardines_Y_Parques"
      }
    ]
  },
  {
    "nombre": "Decorativas",
    "electrodomesticos": [
      {
        "nombre": "Lavadora",
        "potencia": 70,
        "uso_dia": 4,
        "categoria": "Decorativas"
      }
    ]
  },
  {
    "nombre": "Reflectores",
    "electrodomesticos": [
      {

        "potencia": 44,
        "uso_dia": 24,
        "categoria": "Reflectores",

        "nombre": 'NSFL02-200W',
        "path": '../Modelos/SFL02_200W/SFL02_200W.gltf',
        "lumens": 11000,
        "distancia": 10,
        "anguloApertura": 70,
        "color": 0xfff5e5,
        "penumbra": 1//de 0 a 1 
      },
    ]
  }
  ]

  public lamparas0: Array<any> = [
    {
      nombre: 'NSLZ_60',
      path: '../Modelos/Z60/NuevosLed_z60.gltf',
      lumens: 11000,
      distancia: 10,
      anguloApertura: 70,
      color: 0xfff5e5,
      penumbra: 1//de 0 a 1  
    },
    {
      nombre: 'SFL02_200W',
      path: '../Modelos/SFL02_200W/SFL02_200W.gltf',
      lumens: 3500,
      distancia: 12,
      anguloApertura: 80,
      color: 0x07ec22,
      penumbra: 0.1//de 0 a 1
    },
    {
      nombre: 'NSL_06M',
      path: '../Modelos/NSL_06M/NSL_06M.gltf'
    },
    {
      nombre: 'NSWL_10',
      path: '../Modelos/LamparaSWL_10/Lampara_SWL_10_2.gltf'
    },
    {
      nombre: 'NSL_912',
      path: '../Modelos/NSL_912/NSL_912.gltf'
    },
    {
      nombre: 'NSL_98',
      path: '../Modelos/NSL_98/Blender_NSL_912dasdsfsdgsd.gltf'
    },

    {
      nombre: 'Solar_Tracker',
      path: '../Modelos/SolarTracker/SolarTracker.gltf'
    }
  ]

  public escenarios: Array<any> = [
    {
      nombre: 'parque',
      path: '../Modelos/parqueGLTF/parque.gltf'
    },
  ]

  public animando = true;
  public renderer = new THREE.WebGLRenderer;
  public scene = new THREE.Scene;
  public camera = new THREE.PerspectiveCamera
  public controls: any

  public spotLight: any
  public lightState = true


  public ledGroup: any
  public NombrelamparaActual = undefined

  public lamparas: Array<any> = [];
  public lamparas_const: Array<any> = [];
  public datosAgrupados: any = {};
  public data: any = [];


  constructor(
    private _iniciarEscenaService: IniciarEscenaService,
    private _cargarLampara: CargarlamparaService,
    private _luces: LucesService,
    private _guestService: GuestServiceService
  ) {

  }

  ngOnInit(): void {

    this._guestService.listar_lamparas_guest().subscribe(
      response => {

        this.lamparas_const = response.data;
        this.lamparas = this.lamparas_const;

        this.lamparas.forEach(lampara => {
          const categoriaNombre = lampara.categoria.nombre;

          // Verificar si la categoría ya existe en datosAgrupados
          if (categoriaNombre in this.datosAgrupados) {
            // Si la categoría ya existe, agregar el electrodoméstico al array correspondiente
            this.datosAgrupados[categoriaNombre].lamparas.push({
              nombre: lampara.nombre,
              potencia: lampara.potencia,
              categoria: categoriaNombre,
              path: lampara.path,
              lumens: lampara.lumens,
              distancia: lampara.distancia,
              anguloApertura: lampara.anguloApertura,
              anguloInclinacion:lampara.anguloInclinacion,
              color: lampara.temperaturaColor,
              penumbra: lampara.penumbra,
              enlaceAR: lampara.enlaceAR//Validar
            });
          } else {
            // Si la categoría no existe, crear un nuevo objeto con la categoría y el electrodoméstico
            this.datosAgrupados[categoriaNombre] = {
              nombre: categoriaNombre,
              lamparas: [{
                nombre: lampara.nombre,
                potencia: lampara.potencia,
                categoria: categoriaNombre,
                path: lampara.path,
                lumens: lampara.lumens,
                distancia: lampara.distancia,
                anguloApertura: lampara.anguloApertura,
                anguloInclinacion:lampara.anguloInclinacion,
                color: lampara.temperaturaColor,
                penumbra: lampara.penumbra,
                enlaceAR: lampara.enlaceAR//Validar
              }]
            };
          }
        });

        // Convertir el objeto a un array

        // Convertir el objeto a un array
        this.data = Object.values(this.datosAgrupados);
        console.log('Data Organizada', this.data)
        this.cargarLampara()


      },
      error => {
        console.log('error')
      }
    );


  }

  ngAfterViewInit(): void {
    const canvas = document.querySelector('#componente') as HTMLCanvasElement;

    if (canvas) {
      // Almacenar las referencias a la escena, cámara y renderizador
      const { scene, camera, renderer } = this._iniciarEscenaService.initScene(canvas);

      this.scene = scene;
      this.camera = camera;
      this.renderer = renderer;
      //Controles de orbita
      this.controls = new OrbitControls(camera, canvas);
      //const controls = new OrbitControls(camera, canvas);
      this.controls.target.set(0, 5, 0);
      this.controls.update();

      //this.cargarLampara()


    }
  }

  cargarLampara() {

    let lampara
    if (this.lamparaSeleccionada != undefined) {
      console.log('Lampara Seleccionada', this.lamparaSeleccionada)
      lampara = this.lamparas[this.lamparaSeleccionada]
      //this.NombrelamparaActual = this.lamparas[this.lamparaSeleccionada].nombre
    } else {
      lampara = this.lamparas[0]
      //this.NombrelamparaActual = this.lamparas[0].nombre
      //this._cargarLampara.loadModel(this.lamparas[this.lamparaSeleccionada], this.scene, this.NombrelamparaActual)
    }

    //this.NombrelamparaActual = this.lamparas[this.lamparaSeleccionada].nombre
    // this._cargarLampara.cargarLamparas(this.lamparas[this.lamparaSeleccionada], this.scene, this.NombrelamparaActual);


    ///////////////////////

    this._cargarLampara.loadModel(lampara, this.scene, this.NombrelamparaActual).then((modelo) => {//loadModel
      modelo.updateMatrixWorld(true)
      this.lampara = modelo


      //

      // Obtener los límites del modelo
      const box = new THREE.Box3().setFromObject(this.lampara);
      const boxSize = box.getSize(new THREE.Vector3());
      const boxCenter = box.getCenter(new THREE.Vector3());

      // Ajustar la posición del modelo centrado
      this.lampara.position.x += (this.lampara.position.x - boxCenter.x);
      this.lampara.position.y += (this.lampara.position.y - boxCenter.y);
      this.lampara.position.z += (this.lampara.position.z - boxCenter.z);

      // Posicionar la cámara a una distancia adecuada
      const maxDimension = Math.max(boxSize.x, boxSize.y, boxSize.z);
      const cameraDistance = maxDimension * 2;

      this.camera.position.set(boxCenter.x, boxCenter.y, cameraDistance);
      this.camera.lookAt(boxCenter);

      this.controls.maxDistance = cameraDistance * 3;
      this.controls.target.copy(boxCenter);
      this.controls.update();

      //this.controls.fitToBox(this.lampara, true);

      //

      this.NombrelamparaActual = this.lampara.name
      //Inicia Buscar la posicion d elos Led
      console.log('Lampara Cargada', this.lampara, 'Nombre', this.lampara.name, this.NombrelamparaActual)

      this.ledGroup = this.lampara.getObjectByName('placaLed');//Total_NSLZ_60 //leds
      const plasticoLedGroup = this.lampara.getObjectByName('plasticoLed');//Total_NSLZ_60 //leds
      const bateriaGroup = this.lampara.getObjectByName('Bateria');//Total_NSLZ_60 //leds


      //Añadir Hospot Y luz
      if (this.ledGroup) {
        //Determinar posicion de la luz
        const worldPosition = new THREE.Vector3();
        this.ledGroup.getWorldPosition(worldPosition);
        console.log('posicion d ela placa de leds:', worldPosition)
        //Añado la luz
        this.spotLight = this._luces.addLight(worldPosition, this.scene, lampara)
        //console.log(ledGroup.position,worldPosition)

        /*
                //Inici hostpots
                const geometry = new THREE.SphereGeometry(0.04, 32, 16);  // Tamaño del hotspot
                const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });  // Color rojo para el hotspot
                const hotspot = new THREE.Mesh(geometry, material);
        
                // Colocar el hotspot en la posición deseada del modelo
                hotspot.position.copy(worldPosition);  // Reemplaza con la posición donde quieres el hotspot
        
                // Añadir el hotspot a la escena o al modelo
                this.scene.add(hotspot);
                //Finaliza Hospots
                */
      }


      //Asignar Carcateristicas a placa de leds
      if (this.ledGroup) {
        const ledMaterial = new THREE.MeshStandardMaterial({
          //color: 0xF8F8FB, //0xffffff,  // Color base de los LEDs
          emissive: 0XF8F8FB,//0xffff00,  // Color de la luz emitida (puedes ajustarlo a lo que desees)
          emissiveIntensity: 1,  // Intensidad de la emisión de luz
        });
        this.ledGroup.traverse((child: any) => {
          if (child.isMesh) {
            child.material = ledMaterial;  // Asignar el material emisivo a los LEDs  antes   ledMaterial /glowMaterial
          }
        });

      }


      //Asignar material a PLastico de Leds
      if (plasticoLedGroup) {
        const plasticoMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,  // Color del plástico
          transparent: true,
          opacity: 0.5,  // Ajusta la opacidad para mayor transparencia
          transmission: 0.9,  // Permite que la luz pase a través del material
          roughness: 0.1,  // Controla el acabado del plástico (más bajo es más brillante)
          metalness: 0,    // No es un material metálico
          ior: 1.5,  // Índice de refracción (simula vidrio/plástico)
        });

        plasticoLedGroup.traverse((child: any) => {
          if (child.isMesh) {
            child.material = plasticoMaterial;  // Asignar el material emisivo a los LEDs  antes   ledMaterial /glowMaterial
          }
        });

      }


    });
    // Comenzar la animación
    this.animate();

    ///////////////////////////

  }

  cargarLampara2(indiceColeccion: any, indiceLampara: any) {
    let lampara
    if (indiceColeccion != undefined && indiceLampara != undefined) {
      lampara = this.data[indiceColeccion].lamparas[indiceLampara]

      //this.NombrelamparaActual = this.lamparas[this.lamparaSeleccionada].nombre
    } else {
      lampara = this.data[0].lamparas[0]
      //this.NombrelamparaActual = this.lamparas[0].nombre
      //this._cargarLampara.loadModel(this.lamparas[this.lamparaSeleccionada], this.scene, this.NombrelamparaActual)
    }

    //this.NombrelamparaActual = this.lamparas[this.lamparaSeleccionada].nombre
    // this._cargarLampara.cargarLamparas(this.lamparas[this.lamparaSeleccionada], this.scene, this.NombrelamparaActual);


    ///////////////////////

    this._cargarLampara.loadModel(lampara, this.scene, this.NombrelamparaActual).then((modelo) => {//loadModel
      modelo.updateMatrixWorld(true)
      this.lampara = modelo

      //

      // Obtener los límites del modelo
      const box = new THREE.Box3().setFromObject(this.lampara);
      const boxSize = box.getSize(new THREE.Vector3());
      const boxCenter = box.getCenter(new THREE.Vector3());

      // Ajustar la posición del modelo centrado
      this.lampara.position.x += (this.lampara.position.x - boxCenter.x);
      this.lampara.position.y += (this.lampara.position.y - boxCenter.y);
      this.lampara.position.z += (this.lampara.position.z - boxCenter.z);

      // Posicionar la cámara a una distancia adecuada
      const maxDimension = Math.max(boxSize.x, boxSize.y, boxSize.z);
      const cameraDistance = maxDimension * 2;

      this.camera.position.set(boxCenter.x, boxCenter.y, cameraDistance);
      this.camera.lookAt(boxCenter);

      this.controls.maxDistance = cameraDistance * 3;
      this.controls.target.copy(boxCenter);
      this.controls.update();

      //this.controls.fitToBox(this.lampara, true);

      //

      this.NombrelamparaActual = this.lampara.name
      //Inicia Buscar la posicion d elos Led
      console.log('Lampara Cargada', this.lampara, 'Nombre', this.lampara.name, this.NombrelamparaActual)

      this.ledGroup = this.lampara.getObjectByName('placaLed');//Total_NSLZ_60 //leds
      const plasticoLedGroup = this.lampara.getObjectByName('plasticoLed');//Total_NSLZ_60 //leds
      const bateriaGroup = this.lampara.getObjectByName('Bateria');//Total_NSLZ_60 //leds


      //Añadir Hospot Y luz
      if (this.ledGroup) {
        //Determinar posicion de la luz
        const worldPosition = new THREE.Vector3();
        this.ledGroup.getWorldPosition(worldPosition);
        console.log('posicion d ela placa de leds:', worldPosition)
        //Añado la luz
        this.spotLight = this._luces.addLight(worldPosition, this.scene, lampara)
        //console.log(ledGroup.position,worldPosition)

      }


      //Asignar Carcateristicas a placa de leds
      if (this.ledGroup) {
        const ledMaterial = new THREE.MeshStandardMaterial({
          //color: 0xF8F8FB, //0xffffff,  // Color base de los LEDs
          emissive: 0XF8F8FB,//0xffff00,  // Color de la luz emitida (puedes ajustarlo a lo que desees)
          emissiveIntensity: 1,  // Intensidad de la emisión de luz
        });
        this.ledGroup.traverse((child: any) => {
          if (child.isMesh) {
            child.material = ledMaterial;  // Asignar el material emisivo a los LEDs  antes   ledMaterial /glowMaterial
          }
        });

      }


      //Asignar material a PLastico de Leds
      if (plasticoLedGroup) {
        const plasticoMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,  // Color del plástico
          transparent: true,
          opacity: 0.5,  // Ajusta la opacidad para mayor transparencia
          transmission: 0.9,  // Permite que la luz pase a través del material
          roughness: 0.1,  // Controla el acabado del plástico (más bajo es más brillante)
          metalness: 0,    // No es un material metálico
          ior: 1.5,  // Índice de refracción (simula vidrio/plástico)
        });

        plasticoLedGroup.traverse((child: any) => {
          if (child.isMesh) {
            child.material = plasticoMaterial;  // Asignar el material emisivo a los LEDs  antes   ledMaterial /glowMaterial
          }
        });

      }
      /*
//Inicia pruebas lineas de covertura
const points = [];
  const segments = 64;
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * (120 * Math.PI) / 180;
    points.push(new THREE.Vector3(5 * Math.cos(theta), 0, 5 * Math.sin(theta)));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0xffa500 });
  const line = new THREE.Line(geometry, material);

  //line.position.copy(lightPosition);
 // const lightPosition = new THREE.Vector3();
  //this.ledGroup.getWorldPosition(lightPosition);
  const lightPosition = new THREE.Vector3(0, 1, 0); // Posición de la lámpara
  line.position.copy(lightPosition);


  //line.rotation.x = -Math.PI / 2;
  this.scene.add(line);

//Finaliz apruebas lineas de cobertura
const directions = [
  new THREE.Vector3(1, 0, 0),  // Eje X positivo
  new THREE.Vector3(-0.5, 0, 0), // Eje X negativo
  new THREE.Vector3(0, 0, 1),  // Eje Z positivo
  new THREE.Vector3(0, 0, -1), // Eje Z negativo
];

directions.forEach((dir) => {
  const arrow = new THREE.ArrowHelper(dir, lightPosition, 5, 0xff0000);
  this.scene.add(arrow);
});
//Finaliza la segunda
const geometry2 = new THREE.CircleGeometry(5, 64, 0, (120 * Math.PI) / 180);
const material2 = new THREE.MeshBasicMaterial({
  color: 0xffff00, // Amarillo para simular luz
  transparent: true,
  opacity: 0.2,
  side: THREE.DoubleSide,
});

const coverage = new THREE.Mesh(geometry2, material2);
coverage.position.set(lightPosition.x, lightPosition.y, lightPosition.z); // Posición de la lámpara
coverage.rotation.x = -Math.PI / 2; // Orientarlo horizontalmente
this.scene.add(coverage);
//Finaliza la tercera
function createTextLabel(text: string, width = 256, height = 128, color = '#ffffff', bgColor = '#000000') {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (context) {
    context.fillStyle = bgColor; // Fondo del texto
    context.fillRect(0, 0, width, height);
    context.fillStyle = color; // Color del texto
    context.font = '24px Arial'; // Fuente
    context.textAlign = 'center';
    context.fillText(text, width / 2, height / 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(width / 100, height / 100), material); // Escalar tamaño
  return plane;
}

// Ejemplo de uso
const textLabel1 = createTextLabel('10M Ancho');
textLabel1.position.set(5, 0, 0); // Posición en la escena
textLabel1.rotation.x= Math.PI/0.5
this.scene.add(textLabel1);

const textLabel2 = createTextLabel('10M Lado');
textLabel2.position.set(0, 5, 0);
this.scene.add(textLabel2);
//Finaliza la cuarta
*/

    });
    // Comenzar la animación
    this.animate();

    ///////////////////////////

  }


  animate = () => {
    if (this.animando) {
      requestAnimationFrame(this.animate);
    }

    if (this.resizeRendererToDisplaySize(this.renderer)) {
      const canvas = this.renderer.domElement;
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }

    // Renderizar la escena
    this.renderer.render(this.scene, this.camera);
  }

  resizeRendererToDisplaySize(renderer: any) {

    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);

    }
    return needResize;

  }



  onOff() {
    const infoBox = document.getElementById("info-box");
    if (infoBox) {
      infoBox.innerHTML = "Apagado automatico durante el Dia Y Encendido durante la noche";
      infoBox.style.display = 'block';
    }

    //To Do, Prender y apagar las luces
    this.lightState = !this.lightState
    // Alternar la intensidad de la luz
    const emissiveIntensity = this.lightState ? 1 : 0;  // 1 es el brillo normal, 0 es apagado

    console.log('Envio spot', this.spotLight)
    this._luces.toggleLight(this.lightState, this.spotLight)

    if (this.ledGroup) {
      this.ledGroup.traverse((child: any) => {
        if (child.isMesh) {
          child.material.emissiveIntensity = emissiveIntensity;
        }
      });
    }
    if (this.scene.fog instanceof THREE.FogExp2) {
      if (this.lightState) {
        // Noche: Luz encendida, niebla más densa y oscura
        this.scene.fog.color.set(0x111111);  // Niebla más oscura
        this.scene.fog.density = 0.02;      // Niebla más densa
      } else {
        // Día: Luz apagada, niebla menos densa y más clara
        this.scene.fog.color.set(0xcccccc);  // Niebla más clara
        this.scene.fog.density = 0.005;      // Niebla menos densa
      }
    }


  }

  moverCamara(objeto: any) {

    const objetivo = this.lampara.getObjectByName(objeto);
    console.log('Objetivo', objeto, objetivo)
    if (objetivo) {


      const worldPosition = new THREE.Vector3();
      objetivo.getWorldPosition(worldPosition);
      this._iniciarEscenaService.moveCameraToTarget(worldPosition, 1000, this.camera, this.controls)


      if (objetivo.material && objetivo.material.emissive) {
        const originalEmissive = objetivo.material.emissive.clone();
        objetivo.material.emissive.set(0xff0000); // Rojo brillante

        // Restaurar la emisividad original después del tiempo
        setTimeout(() => {
          objetivo.material.emissive.copy(originalEmissive);
          console.log('Emsiion Original')
        }, 10000);
      } else {
        console.log('Objeto no posee Material o material Emissive')
      }

      const infoBox = document.getElementById("info-box");
      if (infoBox) {
        switch (objeto) {
          case 'placaLed':
            infoBox.innerHTML = "Flujo luminoso: 11.000 lúmenes /n Número de LEDs: 144 piezas";
            break;
          case 'Bateria':
            infoBox.innerHTML = "Batería: LiFePO4 12,8V 42Ah /n Tiempo de carga solar: 6-8 horas con luz solar brillante";
            break;
          case 'specs':
            infoBox.innerHTML = "Panel solar: Monocristalino de 75W de gran tamaño.Modos de iluminación: Tres modos diferentes. Sensor de movimiento: Integrado.Batería: Litio de gran capacidad de 692.64WH/14.8V con indicador de carga.LED: OSRAM 3030/288 pcs 12.000 lúmenes y luz neutra de 4.000K.";
            break;
          case 'general':
            infoBox.innerHTML = "Vista general del modelo";
            break;
        }
        infoBox.style.display = 'block';
      }

    } else {
      console.log('La lampara No posee un componente con este nombre', objeto)
    }

  }



  removeModel(/*scene: THREE.Scene, modelName: string*/) {
    //const model = this.scene.getObjectByName('parque');
    if (this.NombrelamparaActual != undefined) {
      const model = this.scene.getObjectByName(this.NombrelamparaActual)
      if (model) {
        this._cargarLampara.removerModelo(model, this.scene)
        /*
            console.log('modelo Encontrado')
             this.scene.remove(model); // Remover el modelo de la escena
              model.traverse((child) => {
                  if (child instanceof THREE.Mesh) {
                      child.geometry.dispose();  // Liberar memoria de la geometría
                      child.material.dispose();  // Liberar memoria del material
                  }
              }); */
      } else {
        console.log(`No se encontró el modelo: ${model}`);
      }
    }

  }


  cargarEscenario() {
    const escenario = this.escenarios[this.escenarioSeleccionado] //This.escenarioSeleccionado es el indice del escenario en el arreglo escenarios
    this._cargarLampara.cargarEscenarios(escenario.path, this.scene, escenario.nombre);
  }




}
