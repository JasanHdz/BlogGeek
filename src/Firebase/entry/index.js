import {firebaseConfig} from '../Configuration/index';

// Inicializar Firebase nuevamente
firebase.initializeApp(firebaseConfig);

 // Adicionar el service worker
navigator.serviceWorker
    .register('notifications-sw.js')
    .then(registro => {
      console.log('Service worker registrado')
      firebase.messaging().useServiceWorker(registro) 
    }).catch(error => {
      console.error(`Error al registrar el service worker => ${error}`)
    })

    // Registrar credenciales web
    const messagin = firebase.messaging();

    messagin.usePublicVapidKey(
      'BKPBfD1K1Z4hOuWK4pY34-hxRJeuwuXR0KprfxJYhQuu3tnnbtfOrAr82EzMTFEhbm1udp0Mqa3g1BeWzMDRIdk'
    )

    // Solicitar permisos para las notificaciones
    messagin
    .requestPermission()
    .then(() => {
      console.log(`Permiso otorgado`)
      return messagin.getToken()
    })
    .then(token => {
      console.log("token", token)
      const db = firebase.firestore()
      db.settings({timestampsInSnapshots: true})
      db.collection('tokens')
      .doc(token)
      .set({
        token: token
      }).catch(error => {
        console.error(`Error al insertar el token en la BD => ${error}`)
      })
    })

    messagin.onTokenRefresh(() => {
      messagin.getToken()
      .then(token => {
        console.log('token se ha renovado');
        const db = firebase.firestore()
        db.settings({timestampsInSnapshots: true})
        db.collection('tokens')
        .doc(token)
        .set({
          token: token
        })
        .catch(error => {
          console.error(`Error al insertar el token en la BD => ${error}`)
        })
      })
    })

// Recibir las notificaciones cuando el usuario esta foreground
  // callNotificacionesForeground() {
    messagin.onMessage(payload => {
      alert(`Ya tenemos un nuevo post. Revisalo, se llamá ${payload.data.title}`)
    }) 
  // }

